import type { Locale } from '@/i18n/config';
import styles from './VioDigital.module.css';

export default function CaseHeader({ homeHref, backLabel }: { homeHref: string; backLabel: string }) {
  return <header className={styles.header}>
    <a href={homeHref}>kauê<span>ruon</span></a>
    <a href={homeHref}>← {backLabel}</a>
  </header>;
}
