import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

const baseUrl = 'https://www.kaueruon.dev';

export function getDocFacilMetadata(locale: Locale): Metadata {
  const pt = locale === 'pt-BR';
  const title = pt
    ? 'DocFácil — Criação guiada de documentos | Kauê Ruon'
    : 'DocFácil — Guided document creation | Kauê Ruon';
  const description = pt
    ? 'Veja como o DocFácil ajuda a escolher um modelo, responder perguntas com orientação, revisar os dados e gerar o documento em PDF.'
    : 'See how DocFácil guides users through choosing a template, answering questions, reviewing their details and generating a PDF document.';
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
