'use client';
import { useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { atlasCase } from './case-model';
import { atlasCopy } from './atlas-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick } from './case-return-position';
import AtlasComposition from './AtlasComposition';
import { useProjectPreview } from './useProjectPreview';
import styles from './Atlas.module.css';

export default function AtlasPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = atlasCopy(locale);
  useProjectPreview(root, locale, atlasCase, '--atlas-progress', 'atlas-preview-title');
  return <article ref={root} id="project-atlas-notarial" className={styles.preview} data-project-preview aria-labelledby="atlas-preview-title">
    <div className={styles.sticky} data-project-sticky>
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
