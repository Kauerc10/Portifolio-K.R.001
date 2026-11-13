'use client';
import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { docFacilCase } from './case-model';
import { docFacilCopy } from './docfacil-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick, restoreCaseReturnPosition } from './case-return-position';
import DocFacilComposition from './DocFacilComposition';
import styles from './DocFacil.module.css';

export default function DocFacilPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = docFacilCopy(locale);
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
      element.style.setProperty('--docfacil-progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const restore = () => requestAnimationFrame(() => {
      if (location.hash && location.hash !== '#project-docfacil') return;
      restoreCaseReturnPosition({ locale, caseSlug: docFacilCase.slug, homePath: docFacilCase.homePath(locale) }, { scrollTo: position => scrollTo(position), focus: () => element.querySelector<HTMLElement>('#docfacil-preview-title')?.focus({ preventScroll: true }) });
      update();
    });
    update(); restore(); addEventListener('pageshow', restore); addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); reduced?.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('pageshow', restore); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced?.removeEventListener('change', schedule); };
  }, [locale]);
  return <article ref={root} id="project-docfacil" className={styles.preview} aria-labelledby="docfacil-preview-title">
    <div className={styles.sticky}>
      <div className={styles.composition}>
        <div className={styles.copy}>

          <p className={styles.kicker}>{copy.kind}</p>
          <h3 id="docfacil-preview-title" tabIndex={-1}>DocFácil</h3>
          <p className={styles.tagline}>{copy.title}</p>
          <p className={styles.description}>{copy.description}</p>
          <a className={styles.button} href={docFacilCase.links.case[locale]} onClick={event => {
            if (isPlainPrimaryClick(event)) captureCaseReturnPosition({ locale, caseSlug: docFacilCase.slug, homePath: docFacilCase.homePath(locale) });
          }}>{copy.open} ↗</a>
        </div>
        <DocFacilComposition locale={locale} label={locale === 'pt-BR' ? 'Corujinha azul orienta uma pergunta enquanto um documento de exemplo ganha forma' : 'A blue owl guides a question as an example document takes shape'} />
      </div>
      <div className={styles.progress} aria-hidden="true"><span>{copy.steps[0]}</span><i /><span>{copy.steps[1]}</span><span>{copy.steps[2]}</span></div>
    </div>
  </article>;
}
