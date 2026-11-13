import { Car, Check, Layers3, Type } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Locale } from '@/i18n/config';
import styles from './Atlas.module.css';

export default function AtlasComposition({ locale, progress, label }: { locale: Locale; progress?: number; label: string }) {
  const en = locale === 'en-US';
  const style = progress === undefined ? undefined : { '--atlas-progress': progress } as CSSProperties;
  const layers = [{ key: 'format', icon: Type, text: en ? 'Format' : 'Formatar' }, { key: 'check', icon: Check, text: en ? 'Review' : 'Conferir' }, { key: 'organize', icon: Layers3, text: en ? 'Organize' : 'Organizar' }];
  return <div className={styles.art} data-atlas-art role="img" aria-label={label} style={style}>
    <div className={styles.plinth} />
    <div className={styles.outputPaper} aria-hidden="true"><span /><i /><i /><i /><i /><i /></div>
    <div className={styles.document} data-atlas-layer="document" aria-hidden="true">
      <span className={styles.example}>{en ? 'EXAMPLE' : 'EXEMPLO'}</span>
      <Car size={42} strokeWidth={1.35} />
      <strong>{en ? 'Vehicle document' : 'Documento de veículo'}</strong>
      <div className={styles.paperLines}><i /><i /><i /><i /><i /></div>
      <small>{en ? 'Fictional details' : 'Dados de exemplo'}</small>
    </div>
    <svg className={styles.connector} viewBox="0 0 100 240" fill="none" aria-hidden="true"><path d="M80 18H50Q20 18 20 48V192Q20 222 50 222H80M20 120H80" stroke="currentColor" strokeWidth="1.5"/><circle cx="80" cy="18" r="4" fill="currentColor"/><circle cx="80" cy="222" r="4" fill="currentColor"/></svg>
    <span className={styles.hotDot} aria-hidden="true" />
    {layers.map(({ key, icon: Icon, text }) => <div key={key} className={`${styles.layer} ${styles[key]}`} aria-hidden="true"><Icon size={26} strokeWidth={1.5} /><span>{text}</span></div>)}
  </div>;
}
