import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
const base = 'https://www.kaueruon.dev';
export function getCkfMetadata(locale: Locale): Metadata {
  const title = locale === 'en-US' ? 'CKF Maintenance — Kauê Ruon' : 'CKF Manutenção — Kauê Ruon';
  const description = locale === 'en-US' ? 'An on-demand development case with an institutional website and a separate quotes system.' : 'Um case de desenvolvimento sob demanda com site institucional e sistema de orçamentos separado.';
  const url = `${base}/${locale}/projetos/ckf`;
  return { title, description, alternates: { canonical: url, languages: { 'pt-BR': `${base}/pt-BR/projetos/ckf`, 'en-US': `${base}/en-US/projetos/ckf` } }, openGraph: { title, description, url, type: 'article' } };
}
