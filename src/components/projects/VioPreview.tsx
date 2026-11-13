'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import VioDocument from './VioDocument';
import { vioCopy } from './viodigital-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick, restoreCaseReturnPosition } from './case-return-position';
import { vioDigitalCase } from './case-model';
import styles from './VioDigital.module.css';

export default function VioPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = vioCopy(locale);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const travel = element.offsetHeight - innerHeight + 80;
      const progress = media?.matches || innerHeight <= 700 || travel <= 0 ? 1 : Math.max(0, Math.min(1, (80 - rect.top) / travel));
      element.style.setProperty('--vio-progress', String(progress));
      element.dataset.vioStage = progress < .25 ? 'document' : progress < .65 ? 'reading' : 'data';
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const restore = () => {
      requestAnimationFrame(() => {
        restoreCaseReturnPosition({ locale, caseSlug: vioDigitalCase.slug, homePath: vioDigitalCase.homePath(locale) }, {
          scrollTo: (position) => scrollTo(position),
          focus: () => element.focus({ preventScroll: true }),
        });
        update();
      });
    };
    update();
    restore();
    addEventListener('pageshow', restore);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    media?.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('pageshow', restore); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); media?.removeEventListener('change', schedule); };
  }, []);
  return <article ref={root} tabIndex={-1} id="project-viodigital" className={styles.preview} aria-labelledby="vio-preview-title">
    <div className={styles.sticky}>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{copy.kind}</p>
          <h3 id="vio-preview-title">VioDigital</h3>
          <p className={styles.tagline}>{copy.title}</p>
          <p className={styles.description}>{copy.description}</p>
          <a className={styles.button} href={vioDigitalCase.links.case[locale]} onClick={event => {
            if (!isPlainPrimaryClick(event)) return;
            captureCaseReturnPosition({ locale, caseSlug: vioDigitalCase.slug, homePath: vioDigitalCase.homePath(locale) });
          }}>{copy.open} <span aria-hidden="true">↗</span></a>
        </div>
        <VioDocument example={copy.example} />
      </div>
      <div className={styles.progress} aria-hidden="true"><span>{copy.scroll} ↓</span><ol>{copy.steps.map((step, i) => <li key={step} data-step={i}>{step}</li>)}</ol><div><i /></div></div>
    </div>
  </article>;
}
