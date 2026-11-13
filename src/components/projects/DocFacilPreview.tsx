'use client';
import { useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { docFacilCase } from './case-model';
import { docFacilCopy } from './docfacil-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick } from './case-return-position';
import DocFacilComposition from './DocFacilComposition';
import { useProjectPreview } from './useProjectPreview';
import styles from './DocFacil.module.css';

export default function DocFacilPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = docFacilCopy(locale);
  useProjectPreview(root, locale, docFacilCase, '--docfacil-progress', 'docfacil-preview-title');
  return <article ref={root} id="project-docfacil" className={styles.preview} data-project-preview aria-labelledby="docfacil-preview-title">
    <div className={styles.sticky} data-project-sticky>
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
