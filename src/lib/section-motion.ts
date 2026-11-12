/** Local decoration only: cancelling always restores the readable CSS resting state. */
export function createMotionScope(root: HTMLElement) {
  const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  const cancellations = new Set<() => void>();
  const entries = new Map<Element, { run: () => void; visible: boolean; seen: boolean }>();
  const scrollEffects = new Set<{
    element: Element; anchor: Element; frames: Keyframe[]; from: number; to: number; animation: Animation | null;
  }>();
  let scrollFrame = 0;
  let disposed = false;
  let visible = true;
  const covered = () => Boolean(document.documentElement.dataset.languagePhase
    || document.documentElement.dataset.introPending
    || document.querySelector('dialog[open]'));
  const canAnimate = () => !disposed && visible && !document.hidden && !media?.matches && !covered();

  function cancel() {
    animations.forEach(animation => animation.cancel());
    animations.clear();
    scrollEffects.forEach(effect => { effect.animation?.cancel(); effect.animation = null; });
    cancellations.forEach(callback => callback());
  }

  function flush() {
    if (disposed || document.hidden || covered()) return;
    entries.forEach(entry => {
      if (!entry.visible || entry.seen) return;
      entry.seen = true;
      entry.run();
    });
    updateScroll();
  }

  function updateScroll() {
    scrollFrame = 0;
    if (!canAnimate()) return;
    scrollEffects.forEach(effect => {
      // A full viewport of travel gives the reader control instead of a timer.
      const progress = Math.max(0, Math.min(1, (window.innerHeight - effect.anchor.getBoundingClientRect().top) / (window.innerHeight * .7)));
      const local = Math.max(0, Math.min(1, (progress - effect.from) / (effect.to - effect.from)));
      if (local >= 1) {
        effect.animation?.cancel(); effect.animation = null;
        return;
      }
      if (!effect.animation && typeof effect.element.animate === 'function') {
        effect.animation = effect.element.animate(effect.frames, { duration: 1000, fill: 'both', easing: 'linear' });
        effect.animation.pause();
        // A cancelled paused effect rejects finished just like a timed one.
        void effect.animation.finished.catch(() => {});
      }
      if (effect.animation) effect.animation.currentTime = local * 1000;
    });
  }
  function scheduleScroll() {
    if (!scrollFrame && scrollEffects.size) scrollFrame = requestAnimationFrame(updateScroll);
  }
  function onResize() { cancel(); scheduleScroll(); }

  const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(records => {
    records.forEach(record => {
      if (record.target === root) {
        visible = record.isIntersecting;
        if (!visible) cancel();
      }
      const entry = entries.get(record.target);
      if (entry) {
        entry.visible = record.isIntersecting;
        if (!record.isIntersecting && entry.seen) cancel();
      }
    });
    flush();
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
  observer?.observe(root);

  function onVisibility() {
    if (document.hidden) cancel();
    else flush();
  }
  function onPreference() { cancel(); flush(); }
  const coverObserver = new MutationObserver(() => {
    if (covered()) cancel();
    else flush();
  });
  coverObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-language-phase', 'data-intro-pending'] });
  // The intro is a native dialog inside the hero; only its open attribute is relevant.
  const hero = document.getElementById('hero');
  if (hero) coverObserver.observe(hero, { subtree: true, childList: true, attributes: true, attributeFilter: ['open'] });
  media?.addEventListener('change', onPreference);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('pagehide', cancel);

  return {
    canAnimate,
    cancel,
    scrub(element: Element | null, frames: Keyframe[], options: { anchor?: Element; from?: number; to?: number } = {}) {
      if (!element) return () => {};
      const effect = { element, anchor: options.anchor ?? element, frames, from: options.from ?? 0, to: options.to ?? 1, animation: null as Animation | null };
      scrollEffects.add(effect);
      scheduleScroll();
      return () => { effect.animation?.cancel(); scrollEffects.delete(effect); };
    },
    animate(element: Element | null, keyframes: Keyframe[], options: KeyframeAnimationOptions): Animation | null {
      if (!element || !canAnimate() || typeof element.animate !== 'function') return null;
      const animation = element.animate(keyframes, { easing: 'cubic-bezier(.22,1,.36,1)', ...options, fill: 'none' });
      animations.add(animation);
      // Remove completed effects as well as cancelled ones; never persist transient inline styles.
      void animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
      return animation;
    },
    onEnter(element: Element, run: () => void) {
      entries.set(element, { run, seen: false, visible: !observer });
      observer?.observe(element);
      flush();
      return () => { entries.delete(element); if (element !== root) observer?.unobserve(element); };
    },
    onCancel(callback: () => void) {
      cancellations.add(callback);
      return () => { cancellations.delete(callback); };
    },
    dispose() {
      disposed = true;
      cancel();
      cancelAnimationFrame(scrollFrame);
      scrollEffects.clear();
      observer?.disconnect();
      coverObserver.disconnect();
      entries.clear();
      cancellations.clear();
      media?.removeEventListener('change', onPreference);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', scheduleScroll);
      window.removeEventListener('pagehide', cancel);
    },
  };
}

export type MotionScope = ReturnType<typeof createMotionScope>;
