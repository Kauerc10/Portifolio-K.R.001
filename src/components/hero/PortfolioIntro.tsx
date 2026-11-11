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

  function finish() {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;

    const heading = dialog.closest('#hero')?.querySelector<HTMLElement>('h1');
    dialog.close();
    animations.current.splice(0).forEach(animation => animation.cancel());
    delete document.documentElement.dataset.introDocking;
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
    if (!media || media.matches || window.location.hash || alreadyVisited()) return;
    if (typeof HTMLDialogElement.prototype.showModal === 'function') setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
    dialog.querySelector('h2')?.focus();
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
      if (dialog.open) dialog.close();
      animations.current.splice(0).forEach(animation => animation.cancel());
      delete document.documentElement.dataset.introDocking;
    };
  }, [enabled]);

  function continueIntoHero() {
    const dialog = dialogRef.current;
    if (!dialog?.open || animations.current.length || moving) return;
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
    animations.current = pairs.map(({ source, destination }, index) => {
      const from = initial[index];
      const to = final[index];
      const targetStyle = getComputedStyle(destination);
      const scale = source.dataset.introSource === 'support'
        ? parseFloat(targetStyle.fontSize) / parseFloat(getComputedStyle(source).fontSize)
        : to.width / from.width;
      return source.animate([
        { transform: 'none', opacity: 1 },
        { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})`, color: targetStyle.color, opacity: 1 },
      ], docking);
    });

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
      onCancel={(event) => { event.preventDefault(); finish(); }}
    >
      <div className={styles.cover} data-intro-cover aria-hidden="true" />
      <div className={styles.copy} data-moving={moving || undefined}>
        <h2 id="portfolio-intro-heading" tabIndex={-1}>
          <span className={styles.line} data-intro-source="first"><span>{dict.greetingH1Line1}</span></span>
          {' '}
          <span className={styles.line} data-intro-source="second"><span><em>{highlight}</em>{' '}{remainingWords.join(' ')}</span></span>
        </h2>
        <p data-intro-source="support">{dict.introPresentation}</p>
        <button type="button" disabled={moving} onClick={continueIntoHero}>
          {dict.introContinue}<ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
