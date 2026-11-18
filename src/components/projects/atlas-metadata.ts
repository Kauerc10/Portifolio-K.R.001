import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

const baseUrl = 'https://www.kaueruon.dev';

export function getAtlasMetadata(locale: Locale): Metadata {
  const pt = locale === 'pt-BR';
  const title = pt
    ? 'Atlas Notarial — Automação para cartórios | Kauê Ruon'
    : 'Atlas Notarial — Automation for notary offices | Kauê Ruon';
  const description = pt
    ? 'Conheça o Atlas Notarial, uma bancada de ferramentas para cartórios que nasceu da automação de consultas de veículos e da preparação de textos para procurações.'
    : 'Explore Atlas Notarial, a workspace for Brazilian notary offices that grew out of automated vehicle lookups and text preparation for powers of attorney.';
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
