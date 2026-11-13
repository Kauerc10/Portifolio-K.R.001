import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

const baseUrl = 'https://www.kaueruon.dev';

export function getAtlasMetadata(locale: Locale): Metadata {
  const pt = locale === 'pt-BR';
  const title = 'Atlas Notarial — Kauê Ruon';
  const description = pt
    ? 'Da rotina do cartório a ferramentas úteis.'
    : 'From registry routine to useful tools.';
  const path = `/${locale}/projetos/atlas-notarial`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR/projetos/atlas-notarial`,
        'en-US': `${baseUrl}/en-US/projetos/atlas-notarial`,
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
