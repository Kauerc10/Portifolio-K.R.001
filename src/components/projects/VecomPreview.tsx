'use client';
import { useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { vecomCase } from './case-model';
import { vecomCopy } from './vecom-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick } from './case-return-position';
import VecomComposition, { VecomBrand } from './VecomComposition';
import { useProjectPreview } from './useProjectPreview';
import styles from './Vecom.module.css';

export default function VecomPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = vecomCopy(locale);
  useProjectPreview(root, locale, vecomCase, '--vecom-progress', 'vecom-preview-title');
  return <article ref={root} id="project-vecom" className={styles.preview} data-project-preview aria-labelledby="vecom-preview-title">
    <div className={styles.sticky} data-project-sticky>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <VecomBrand />
          <p className={styles.kicker}>{copy.kind}</p>
          <h3 id="vecom-preview-title" tabIndex={-1}>VECOM <span>Ficha Fácil</span></h3>
          <p className={styles.tagline}>{copy.title}</p>
          <p className={styles.description}>{copy.description}</p>
          <a className={styles.button} href={vecomCase.links.case[locale]} onClick={event => {
            if (isPlainPrimaryClick(event)) captureCaseReturnPosition({ locale, caseSlug: vecomCase.slug, homePath: vecomCase.homePath(locale) });
          }}>{copy.open} ↗</a>
        </div>
        <VecomComposition label={locale === 'pt-BR' ? 'Pasta azul, notebook e celular com capturas preparadas da VECOM' : 'Blue folder, laptop and phone with prepared VECOM screens'} />
      </div>
      <div className={styles.progress} aria-hidden="true"><span>{copy.steps[0]}</span><i /><span>{copy.steps[1]}</span><span>{copy.steps[2]}</span></div>
    </div>
  </article>;
}
