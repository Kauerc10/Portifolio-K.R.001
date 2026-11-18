import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
const base = 'https://www.kaueruon.dev';
export function getCkfMetadata(locale: Locale): Metadata {
  const pt = locale === 'pt-BR';
  const title = pt
    ? 'CKF Manutenção — Site e sistema de orçamentos | Kauê Ruon'
    : 'CKF Maintenance — Website and quoting system | Kauê Ruon';
  const description = pt
    ? 'Veja como o site da CKF apresenta os serviços de manutenção industrial e como o sistema interno ajuda a preparar e acompanhar orçamentos.'
    : 'See how the CKF website showcases industrial maintenance services and how its internal system helps the team prepare and track quotes.';
  const url = `${base}/${locale}/projetos/ckf`;
  return { title, description, alternates: { canonical: url, languages: { 'pt-BR': `${base}/pt-BR/projetos/ckf`, 'en-US': `${base}/en-US/projetos/ckf` } }, openGraph: { title, description, url, type: 'article' } };
}
