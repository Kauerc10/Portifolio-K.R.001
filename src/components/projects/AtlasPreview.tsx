'use client';
import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { atlasCase } from './case-model';
import { atlasCopy } from './atlas-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick, restoreCaseReturnPosition } from './case-return-position';
import AtlasComposition from './AtlasComposition';
import styles from './Atlas.module.css';

export default function AtlasPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = atlasCopy(locale);
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
      element.style.setProperty('--atlas-progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const restore = () => requestAnimationFrame(() => {
      if (location.hash && location.hash !== '#project-atlas-notarial') return;
      restoreCaseReturnPosition({ locale, caseSlug: atlasCase.slug, homePath: atlasCase.homePath(locale) }, { scrollTo: position => scrollTo(position), focus: () => element.querySelector<HTMLElement>('#atlas-preview-title')?.focus({ preventScroll: true }) });
      update();
    });
    update(); restore(); addEventListener('pageshow', restore); addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); reduced?.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('pageshow', restore); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced?.removeEventListener('change', schedule); };
  }, [locale]);
  return <article ref={root} id="project-atlas-notarial" className={styles.preview} aria-labelledby="atlas-preview-title">
    <div className={styles.sticky}>
      <div className={styles.composition}>
        <div className={styles.copy}>

          <p className={styles.kicker}>{copy.kind}</p>
          <h3 id="atlas-preview-title" tabIndex={-1}>Atlas <span>Notarial</span></h3>
          <p className={styles.tagline}>{copy.title}</p>
          <p className={styles.description}>{copy.description}</p>
          <a className={styles.button} href={atlasCase.links.case[locale]} onClick={event => {
            if (isPlainPrimaryClick(event)) captureCaseReturnPosition({ locale, caseSlug: atlasCase.slug, homePath: atlasCase.homePath(locale) });
          }}>{copy.open} ↗</a>
        </div>
        <AtlasComposition locale={locale} label={locale === 'pt-BR' ? 'Documento de veículo de exemplo e camadas Formatar, Conferir e Organizar' : 'Example vehicle document and Format, Review and Organize layers'} />
      </div>
      <div className={styles.progress} aria-hidden="true"><span>{copy.steps[0]}</span><i /><span>{copy.steps[1]}</span><span>{copy.steps[2]}</span></div>
    </div>
  </article>;
}
