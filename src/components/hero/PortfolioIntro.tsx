'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';
import styles from './PortfolioIntro.module.css';

const sessionKey = 'portfolio-intro-complete';
const motionPreference = '(prefers-reduced-motion: reduce)';
const docking = { duration: 950, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' } as const;

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
    timers.current = ([['first', 180], ['second', 650], ['support', 1250], ['button', 1600], ['ready', 1850]] as const).map(([next, delay]) => setTimeout(() => setPhase(next), delay));
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
        incoming.push(destination.animate([{ opacity: 0, offset: 0 }, { opacity: 0, offset: .6 }, { opacity: 1, offset: 1 }], docking));
      }
      return source.animate([
        { transform: 'none', opacity: 1 },
        { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})`, color: targetStyle.color, opacity: support ? 0 : 1 },
      ], docking);
    });

    animations.current.push(...incoming);
    const cover = dialog.querySelector<HTMLElement>('[data-intro-cover]');
    if (cover) animations.current.push(cover.animate([{ opacity: 1 }, { opacity: 0 }], docking));
    void Promise.allSettled(animations.current.map(animation => animation.finished)).then(finish);
  }

  if (!enabled) return null;
  const [highlight, ...remainingWords] = dict.greetingH1Line2.split(' ');

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="portfolio-intro-heading"
      data-phase={phase}
      onCancel={(event) => { event.preventDefault(); finish(); }}
    >
      <div className={styles.cover} data-intro-cover aria-hidden="true" />
      <div className={styles.copy} data-moving={moving || undefined}>
        <p id="portfolio-intro-heading" className={styles.heading} tabIndex={-1}>
          <span className={styles.line} data-intro-source="first"><span>{dict.greetingH1Line1.split(' ').map((word, index) => <span className={styles.word} style={{ animationDelay: `${180 + index * 40}ms` }} key={index}>{word}{' '}</span>)}</span></span>
          {' '}
          <span className={styles.line} data-intro-source="second"><span>{[highlight, ...remainingWords].map((word, index) => <span className={styles.word} style={{ animationDelay: `${650 + index * 40}ms` }} key={index}>{index === 0 ? <em>{word}</em> : word}{' '}</span>)}</span></span>
        </p>
        <p className={styles.support} data-intro-source="support">{dict.introPresentation}</p>
        <button type="button" disabled={moving || phase !== 'ready'} onClick={continueIntoHero}>
          {dict.introContinue}<ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
