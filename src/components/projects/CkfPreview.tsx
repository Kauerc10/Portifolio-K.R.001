'use client';
import { useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { ckfCase } from './case-model';
import { ckfCopy } from './ckf-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick } from './case-return-position';
import CkfComposition from './CkfComposition';
import { useProjectPreview } from './useProjectPreview';
import styles from './Ckf.module.css';

export default function CkfPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = ckfCopy(locale);
  useProjectPreview(root, locale, ckfCase, '--ckf-progress', 'ckf-preview-title');
  return <article ref={root} id="project-ckf" className={styles.preview} data-project-preview aria-labelledby="ckf-preview-title">
    <div className={styles.sticky} data-project-sticky>
      <div className={styles.composition}>
        <div className={styles.copy}>

          <p className={styles.kicker}>{copy.kind}</p>
          <h3 id="ckf-preview-title" tabIndex={-1}>CKF Manutenção</h3>
          <p className={styles.tagline}>{copy.title}</p>
          <p className={styles.description}>{copy.homeDescription}</p>
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
