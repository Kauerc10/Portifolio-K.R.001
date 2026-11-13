'use client';
import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { vecomCase } from './case-model';
import { vecomCopy } from './vecom-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick, restoreCaseReturnPosition } from './case-return-position';
import VecomComposition from './VecomComposition';
import styles from './Vecom.module.css';

export default function VecomPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = vecomCopy(locale);
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
      element.style.setProperty('--vecom-progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const restore = () => requestAnimationFrame(() => {
      if (location.hash && location.hash !== '#project-vecom') return;
      restoreCaseReturnPosition({ locale, caseSlug: vecomCase.slug, homePath: vecomCase.homePath(locale) }, { scrollTo: position => scrollTo(position), focus: () => element.querySelector<HTMLElement>('#vecom-preview-title')?.focus({ preventScroll: true }) });
      update();
    });
    update(); restore(); addEventListener('pageshow', restore); addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); reduced?.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('pageshow', restore); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced?.removeEventListener('change', schedule); };
  }, [locale]);
  return <article ref={root} id="project-vecom" className={styles.preview} aria-labelledby="vecom-preview-title"><div className={styles.sticky}><div className={styles.composition}><div className={styles.copy}><p className={styles.kicker}>{copy.kind}</p><h2 id="vecom-preview-title" tabIndex={-1}>VECOM <span>Ficha Fácil</span></h2><p className={styles.tagline}>{copy.title}</p><p className={styles.description}>{copy.description}</p><a className={styles.button} href={vecomCase.links.case[locale]} onClick={event => { if (isPlainPrimaryClick(event)) captureCaseReturnPosition({ locale, caseSlug: vecomCase.slug, homePath: vecomCase.homePath(locale) }); }}>{copy.open} ↗</a></div><VecomComposition label={locale === 'pt-BR' ? 'Composição ilustrada com pasta azul, notebook e celular' : 'Illustrated composition with a blue folder, laptop and phone'} /><div className={styles.progress}><span>{copy.steps[0]}</span><i /><span>{copy.steps[1]}</span><span>{copy.steps[2]}</span></div></div></div></article>;
}
