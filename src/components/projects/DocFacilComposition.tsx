'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Check, FileText } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import styles from './DocFacil.module.css';

export function DocFacilOwl({ className, pose = 'guide' }: { className: string; pose?: 'guide' | 'success' }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { if (ref.current?.complete && !ref.current.naturalWidth) setFailed(true); }, []);
  return failed ? null : <img ref={ref} className={className} src={`/assets/projects/docfacil/owl-${pose}.webp`} width={400} height={400} loading="lazy" decoding="async" alt="" onError={() => setFailed(true)} />;
}

export default function DocFacilComposition({ locale, progress, label }: { locale: Locale; progress?: number; label: string }) {
  const en = locale === 'en-US';
  const style = progress === undefined ? undefined : { '--docfacil-progress': progress } as CSSProperties;
  return <div className={styles.art} role="img" aria-label={label} data-docfacil-art style={style}>
    <div className={styles.plinth} />
    <div className={styles.backPaper} aria-hidden="true" />
    <div className={styles.document} data-docfacil-layer="document" aria-hidden="true">
      <strong className={styles.paperBrand}>DocFácil</strong><span className={styles.example}>{en ? 'EXAMPLE' : 'EXEMPLO'}</span>
      <i className={styles.paperLine} /><i className={styles.paperLine} />
      <div className={styles.question}><FileText size={17} /><strong>{en ? 'Who is the landlord?' : 'Quem é o locador do imóvel?'}</strong><span>{en ? 'Example person' : 'Pessoa de exemplo'}<Check size={15} /></span></div>
      <ol className={styles.paperChecklist}><li><Check size={17} /><i /></li><li><span /><i /></li><li><span /><i /></li></ol>
    </div>
    <DocFacilOwl className={styles.owl} />
    <span className={styles.successMark} aria-hidden="true"><Check size={22} /></span>
  </div>;
}

