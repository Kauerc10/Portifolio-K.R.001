'use client';
import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { ckfCase } from './case-model';
import { ckfCopy } from './ckf-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick, restoreCaseReturnPosition } from './case-return-position';
import CkfComposition from './CkfComposition';
import styles from './Ckf.module.css';

export default function CkfPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = ckfCopy(locale);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    const reduced = matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const travel = element.offsetHeight - innerHeight + 80;
      const progress = reduced?.matches || innerHeight <= 700 || travel <= 0 ? 1 : Math.max(0, Math.min(1, (80 - rect.top) / travel));
      element.style.setProperty('--ckf-progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const restore = () => requestAnimationFrame(() => {
      if (location.hash && location.hash !== '#project-ckf') return;
      restoreCaseReturnPosition({ locale, caseSlug: ckfCase.slug, homePath: ckfCase.homePath(locale) }, { scrollTo: position => scrollTo(position), focus: () => element.querySelector<HTMLElement>('#ckf-preview-title')?.focus({ preventScroll: true }) });
      update();
    });
    update(); restore(); addEventListener('pageshow', restore); addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); reduced?.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('pageshow', restore); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced?.removeEventListener('change', schedule); };
  }, [locale]);
  return <article ref={root} id="project-ckf" className={styles.preview} aria-labelledby="ckf-preview-title">
    <div className={styles.sticky}>
      <div className={styles.composition}>
        <div className={styles.copy}>

          <p className={styles.kicker}>{copy.kind}</p>
          <h3 id="ckf-preview-title" tabIndex={-1}>CKF Manutenção</h3>
          <p className={styles.tagline}>{copy.title}</p>
          <p className={styles.description}>{locale === 'pt-BR' ? 'Um site para apresentar a empresa. Um sistema para organizar os orçamentos. Duas soluções sob medida para o dia a dia da CKF.' : 'A website to present the company. A system to organize quotes. Two solutions shaped around CKF’s everyday work.'}</p>
          <a className={styles.button} href={ckfCase.links.case[locale]} onClick={event => {
            if (isPlainPrimaryClick(event)) captureCaseReturnPosition({ locale, caseSlug: ckfCase.slug, homePath: ckfCase.homePath(locale) });
          }}>{copy.open} ↗</a>
        </div>
        <CkfComposition locale={locale} label={locale === 'pt-BR' ? 'Site institucional e sistema de orçamentos da CKF, duas entregas distintas' : 'CKF institutional website and quote system, two distinct deliveries'} />
      </div>
      <div className={styles.progress} aria-hidden="true"><span>{copy.steps[0]}</span><i /><span>{copy.steps[1]}</span><span>{copy.steps[2]}</span></div>
    </div>
  </article>;
}
