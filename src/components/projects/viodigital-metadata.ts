import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

const baseUrl = 'https://www.kaueruon.dev';

export function getVioMetadata(locale: Locale): Metadata {
  const isEnglish = locale === 'en-US';
  const title = isEnglish ? 'VioDigital — From document to information' : 'VioDigital — Do documento à informação';
  const description = isEnglish
    ? 'An open-source project by Kauê Ruon Cardoso that makes document checking easier in the browser.'
    : 'Um projeto open source de Kauê Ruon Cardoso para facilitar a conferência de documentos no navegador.';
  const path = `/${locale}/projetos/viodigital`;
  return { title, description, alternates: { canonical: `${baseUrl}${path}`, languages: { 'pt-BR': `${baseUrl}/pt-BR/projetos/viodigital`, 'en-US': `${baseUrl}/en-US/projetos/viodigital` } }, openGraph: { title, description, url: `${baseUrl}${path}`, siteName: 'Kauê Ruon Cardoso', type: 'article' } };
}
