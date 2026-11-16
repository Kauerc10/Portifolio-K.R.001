import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

const baseUrl = 'https://www.kaueruon.dev';

export function getDocFacilMetadata(locale: Locale): Metadata {
  const pt = locale === 'pt-BR';
  const title = 'DocFácil — Kauê Ruon';
  const description = pt
    ? 'Perguntas simples para documentos tomando forma.'
    : 'Simple questions for documents taking shape.';
  const path = `/${locale}/projetos/docfacil`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR/projetos/docfacil`,
        'en-US': `${baseUrl}/en-US/projetos/docfacil`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'Kauê Ruon Cardoso',
      type: 'article',
    },
  };
}
