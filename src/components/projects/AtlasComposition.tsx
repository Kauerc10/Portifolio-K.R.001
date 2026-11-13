'use client';
import type { CSSProperties } from 'react';
import styles from './Atlas.module.css';
export default function AtlasComposition({ progress = 1, label }: { progress?: number; label?: string }) {
  return <div className={styles.art} data-atlas-art role="img" aria-label={label}>
    <div className={styles.document} data-atlas-layer="document"><span>PROCURAÇÃO</span><b>Dados do veículo</b><i /><i /><i /></div>
    <div className={`${styles.layer} ${styles.format}`} data-atlas-layer="format">Formatar</div><div className={`${styles.layer} ${styles.check}`} data-atlas-layer="check">Conferir</div><div className={`${styles.layer} ${styles.organize}`} data-atlas-layer="organize">Organizar</div><div className={styles.connector} aria-hidden="true" /><span className={styles.hotDot} style={{ '--atlas-progress': progress } as CSSProperties} aria-hidden="true" />
  </div>;
}
