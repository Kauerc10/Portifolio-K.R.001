'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';
import styles from './PortfolioIntro.module.css';

const sessionKey = 'portfolio-intro-complete';
const motionPreference = '(prefers-reduced-motion: reduce)';
const revealTiming = { first: 300, second: 1100, support: 2150, button: 2800, ready: 3350, wordStagger: 65 } as const;
const revealPhases = ['first', 'second', 'support', 'button', 'ready'] as const;
const revealStyles = {
  '--intro-support-delay': `${revealTiming.support}ms`,
  '--intro-button-delay': `${revealTiming.button}ms`,
} as CSSProperties;
const docking = { duration: 1900, easing: 'cubic-bezier(.65,0,.22,1)', fill: 'forwards' } as const;
const sweepStart = 'polygon(-30% 0, -20% 0, -40% 100%, -50% 100%)';
const sweepMiddle = 'polygon(-30% 0, 130% 0, 110% 100%, -50% 100%)';
const sweepEnd = 'polygon(150% 0, 160% 0, 140% 100%, 130% 100%)';

function alreadyVisited() {
  try {
    return sessionStorage.getItem(sessionKey) === 'true';
  } catch {
    return false;
  }
}

export default function PortfolioIntro({ dict }: { dict: Dictionary['hero'] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const animations = useRef<Animation[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [moving, setMoving] = useState(false);
  const [phase, setPhase] = useState('white');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function finish() {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;

    const heading = dialog.closest('#hero')?.querySelector<HTMLElement>('h1');
    dialog.closest('#hero')?.querySelectorAll<HTMLElement>('[data-intro-target]').forEach(node => { node.style.removeProperty('visibility'); });
    dialog.close();
    animations.current.splice(0).forEach(animation => animation.cancel());
    delete document.documentElement.dataset.introDocking;
    delete document.documentElement.dataset.introPending;
    timers.current.splice(0).forEach(clearTimeout);
    try {
      sessionStorage.setItem(sessionKey, 'true');
    } catch {
      // The current page can still finish when browser storage is unavailable.
    }
    setEnabled(false);
    heading?.focus({ preventScroll: true });
  }

  useEffect(() => {
    const media = window.matchMedia?.(motionPreference);
    if (!media || media.matches || window.location.hash || alreadyVisited() || document.documentElement.dataset.introPending === 'expired') {
      delete document.documentElement.dataset.introPending;
      return;
    }
    if (typeof HTMLDialogElement.prototype.showModal === 'function') setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    try { dialog.showModal(); } catch { delete document.documentElement.dataset.introPending; setEnabled(false); return; }
    delete document.documentElement.dataset.introPending;
    timers.current = revealPhases.map(next => setTimeout(() => setPhase(next), revealTiming[next]));
    dialog.querySelector<HTMLElement>('#portfolio-intro-heading')?.focus();
    const media = window.matchMedia(motionPreference);
    const stopForPreference = () => { if (media.matches) finish(); };
    const stopForResize = () => { if (animations.current.length) finish(); };
    const stopForHash = () => { if (window.location.hash) finish(); };
    media.addEventListener('change', stopForPreference);
    window.addEventListener('resize', stopForResize);
    window.addEventListener('hashchange', stopForHash);
    return () => {
      media.removeEventListener('change', stopForPreference);
      window.removeEventListener('resize', stopForResize);
      window.removeEventListener('hashchange', stopForHash);
      timers.current.splice(0).forEach(clearTimeout);
      if (dialog.open) dialog.close();
      animations.current.splice(0).forEach(animation => animation.cancel());
      delete document.documentElement.dataset.introDocking;
    };
  }, [enabled]);

  function continueIntoHero() {
    const dialog = dialogRef.current;
    if (!dialog?.open || animations.current.length || moving || phase !== 'ready') return;
    const hero = dialog.closest('#hero');
    if (!hero || typeof dialog.animate !== 'function') return finish();

    const pairs = [...dialog.querySelectorAll<HTMLElement>('[data-intro-source]')].flatMap(source => {
      const destination = hero.querySelector<HTMLElement>(`[data-intro-target="${source.dataset.introSource}"]`);
      return destination ? [{ source, destination }] : [];
    });
    if (pairs.length !== 3) return finish();

    const initial = pairs.map(({ source }) => source.getBoundingClientRect());
    window.scrollTo({ top: 0, behavior: 'instant' });
    const final = pairs.map(({ destination }) => destination.getBoundingClientRect());
    if (initial.some(rect => !rect.width) || final.some(rect => !rect.width)) return finish();

    setMoving(true);
    document.documentElement.dataset.introDocking = 'true';
    const incoming: Animation[] = [];
    for (const detail of hero.querySelectorAll<HTMLElement>('.portal-areas, .portal-primary-links')) {
      incoming.push(detail.animate([
        { opacity: 0 },
        { opacity: 0, offset: .85 },
        { opacity: 1 },
      ], docking));
    }
    const contrastWindow = dialog.querySelector<HTMLElement>('[data-intro-contrast]');
    animations.current = pairs.map(({ source, destination }, index) => {
      const from = initial[index];
      const to = final[index];
      const targetStyle = getComputedStyle(destination);
      const scale = source.dataset.introSource === 'support'
        ? parseFloat(targetStyle.fontSize) / parseFloat(getComputedStyle(source).fontSize)
        : to.width / from.width;
      const support = source.dataset.introSource === 'support';
      if (support) {
        destination.style.visibility = 'visible';
        incoming.push(destination.animate([{ opacity: 0, offset: 0 }, { opacity: 0, offset: .82 }, { opacity: 1, offset: 1 }], docking));
      }
      const motion = [
        { transform: 'none', opacity: 1 },
        { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})`, opacity: support ? 0 : 1 },
      ];
      if (contrastWindow) {
        // A decorative light copy follows the violet mask, keeping contrast at its edge.
        const copy = source.cloneNode(true) as HTMLElement;
        const computed = getComputedStyle(source);
        copy.removeAttribute('data-intro-source');
        Object.assign(copy.style, {
          position: 'fixed', left: `${from.left}px`, top: `${from.top}px`,
          width: `${from.width}px`, margin: '0', color: '#fff',
          fontFamily: computed.fontFamily, fontSize: computed.fontSize,
          fontWeight: computed.fontWeight, lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing, textAlign: computed.textAlign,
          transformOrigin: 'top left',
        });
        const accent = copy.querySelector('em');
        if (accent) accent.style.color = '#e0caff';
        contrastWindow.append(copy);
        incoming.push(copy.animate(motion, docking));
      }
      return source.animate([
        motion[0], { ...motion[1], color: targetStyle.color },
      ], docking);
    });

    animations.current.push(...incoming);
    const cover = dialog.querySelector<HTMLElement>('[data-intro-cover]');
    if (cover) animations.current.push(cover.animate([
      { opacity: 1 },
      { opacity: 1, offset: .35 },
      { opacity: 0, offset: .55 },
      { opacity: 0 },
    ], docking));
    for (const sheet of dialog.querySelectorAll<HTMLElement>('[data-intro-sheet]')) {
      const isEdge = sheet.dataset.introSheet === 'edge';
      animations.current.push(sheet.animate([
        { clipPath: sweepStart },
        { clipPath: sweepMiddle, offset: isEdge ? .36 : .4 },
        { clipPath: sweepEnd },
      ], docking));
    }
    if (contrastWindow) animations.current.push(contrastWindow.animate([
      { clipPath: sweepStart },
      { clipPath: sweepMiddle, offset: .4 },
      { clipPath: sweepEnd },
    ], docking));
    void Promise.allSettled(animations.current.map(animation => animation.finished)).then(finish);
  }

  if (!enabled) return null;
  const [highlight, ...remainingWords] = dict.greetingH1Line2.split(' ');

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      style={revealStyles}
      aria-labelledby="portfolio-intro-heading"
      data-phase={phase}
      onCancel={(event) => { event.preventDefault(); finish(); }}
    >
      <div className={styles.cover} data-intro-cover aria-hidden="true" />
      <div className={styles.sweepEdge} data-intro-sheet="edge" aria-hidden="true" />
      <div className={styles.sweep} data-intro-sheet="violet" aria-hidden="true" />
      <div className={styles.contrastWindow} data-intro-contrast aria-hidden="true" />
      <div className={styles.copy} data-moving={moving || undefined}>
        <p id="portfolio-intro-heading" className={styles.heading} tabIndex={-1}>
          <span className={styles.line} data-intro-source="first"><span>{dict.greetingH1Line1.split(' ').map((word, index) => <span className={styles.word} style={{ animationDelay: `${revealTiming.first + index * revealTiming.wordStagger}ms` }} key={index}>{word}{' '}</span>)}</span></span>
          {' '}
          <span className={styles.line} data-intro-source="second"><span>{[highlight, ...remainingWords].map((word, index) => <span className={styles.word} style={{ animationDelay: `${revealTiming.second + index * revealTiming.wordStagger}ms` }} key={index}>{index === 0 ? <em>{word}</em> : word}{' '}</span>)}</span></span>
        </p>
        <p className={styles.support} data-intro-source="support">{dict.introPresentation}</p>
        <button type="button" disabled={moving || phase !== 'ready'} onClick={continueIntoHero}>
          {dict.introContinue}<ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
