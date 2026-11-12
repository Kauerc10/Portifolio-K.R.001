'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import VioDocument from './VioDocument';
import { vioCopy } from './viodigital-copy';
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
      try {
        const record = JSON.parse(sessionStorage.getItem('vio-return-position') || 'null');
        if (record?.path === location.pathname && Date.now() - record.time < 30 * 60 * 1000) {
          sessionStorage.removeItem('vio-return-position');
          requestAnimationFrame(() => { scrollTo({ top: record.y, behavior: 'instant' }); update(); });
        }
      } catch { /* Native history and anchor navigation remain available. */ }
    };
    update();
    restore();
    addEventListener('pageshow', restore);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    media?.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('pageshow', restore); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); media?.removeEventListener('change', schedule); };
  }, []);
  return <article ref={root} id="project-viodigital" className={styles.preview} aria-labelledby="vio-preview-title">
    <div className={styles.sticky}>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{copy.kind}</p>
          <h3 id="vio-preview-title">VioDigital</h3>
          <p className={styles.tagline}>{copy.title}</p>
          <p className={styles.description}>{copy.description}</p>
          <a className={styles.button} href={`/${locale}/projetos/viodigital`} onClick={event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            try { sessionStorage.setItem('vio-return-position', JSON.stringify({ path: location.pathname, y: scrollY, time: Date.now() })); } catch { /* Normal navigation still works. */ }
          }}>{copy.open} <span aria-hidden="true">↗</span></a>
        </div>
        <VioDocument example={copy.example} />
      </div>
      <div className={styles.progress} aria-hidden="true"><span>{copy.scroll} ↓</span><ol>{copy.steps.map((step, i) => <li key={step} data-step={i}>{step}</li>)}</ol><div><i /></div></div>
    </div>
  </article>;
}
