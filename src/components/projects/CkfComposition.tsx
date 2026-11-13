'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Locale } from '@/i18n/config';
import styles from './Ckf.module.css';

export function CkfImage({ src, alt, className, width = 1440, height = 1000 }: { src: string; alt: string; className?: string; width?: number; height?: number }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { if (ref.current?.complete && !ref.current.naturalWidth) setFailed(true); }, []);
  return failed ? <span className={styles.imageFallback}>{alt}</span> : <img ref={ref} className={className} src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

export default function CkfComposition({ locale, progress, label }: { locale: Locale; progress?: number; label: string }) {
  const en = locale === 'en-US';
  return <div className={styles.art} role="img" aria-label={label} data-ckf-art style={progress === undefined ? undefined : { '--ckf-progress': progress } as CSSProperties}>
    <div className={styles.plinth} aria-hidden="true" />
    <svg className={styles.connector} viewBox="0 0 700 450" preserveAspectRatio="none" aria-hidden="true"><path d="M200 125 V55 Q200 35 220 35 H520 Q540 35 540 55 V100" /><circle cx="200" cy="125" r="4" /><circle cx="540" cy="100" r="4" /></svg>
    <div className={styles.systemFrame} aria-hidden="true"><div className={styles.browserBar}><i /><i /><i /><span>{en ? 'Internal operations' : 'Rotina interna'}</span></div><CkfImage src="/assets/projects/ckf/system-preview.png" alt={en ? 'Actual quote system running locally with fictional records' : 'Sistema de orçamentos real em demonstração local com dados fictícios'} /><strong className={styles.frameCaption}>{en ? 'Quote system' : 'Sistema de orçamentos'}</strong></div>
    <div className={styles.siteFrame} data-ckf-layer="site" aria-hidden="true"><div className={styles.browserBar}><i /><i /><i /><span>CKF Manutenção</span></div><CkfImage src="/assets/projects/ckf/site-desktop.png" alt={en ? 'CKF official institutional site' : 'Site institucional oficial da CKF'} /><strong className={styles.frameCaption}>{en ? 'Institutional website' : 'Site institucional'}</strong></div>
    <span className={styles.artNote}>{en ? 'Two deliveries. One client.' : 'Duas entregas. Um cliente.'}</span>
  </div>;
}
