'use client';

import { useRef } from 'react';
import type { Locale } from '@/i18n/config';
import VioDocument from './VioDocument';
import { vioCopy } from './viodigital-copy';
import { captureCaseReturnPosition, isPlainPrimaryClick } from './case-return-position';
import { vioDigitalCase } from './case-model';
import { useProjectPreview } from './useProjectPreview';
import styles from './VioDigital.module.css';

export default function VioPreview({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = vioCopy(locale);
  useProjectPreview(root, locale, vioDigitalCase, '--vio-progress', 'vio-preview-title');
  return <article ref={root} id="project-viodigital" className={styles.preview} data-project-preview aria-labelledby="vio-preview-title">
    <div className={styles.sticky} data-project-sticky>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{copy.kind}</p>
          <h3 id="vio-preview-title" tabIndex={-1}>VioDigital</h3>
          <p className={styles.tagline}>{copy.title}</p>
          <p className={styles.description}>{copy.description}</p>
          <a className={styles.button} href={vioDigitalCase.links.case[locale]} onClick={event => {
            if (!isPlainPrimaryClick(event)) return;
            captureCaseReturnPosition({ locale, caseSlug: vioDigitalCase.slug, homePath: vioDigitalCase.homePath(locale) });
          }}>{copy.open} <span aria-hidden="true">↗</span></a>
        </div>
        <VioDocument example={copy.example} />
      </div>
      <div className={styles.progress} data-project-progress aria-hidden="true"><span>{copy.scroll} ↓</span><ol>{copy.steps.map((step, i) => <li key={step} data-step={i}>{step}</li>)}</ol><div><i /></div></div>
    </div>
  </article>;
}
