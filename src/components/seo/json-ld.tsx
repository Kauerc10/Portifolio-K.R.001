import type { Locale } from '@/i18n/config';

export default function JsonLd({ locale }: { locale?: Locale }) {
  const currentLocale = locale || 'pt-BR';
  const isEnglish = currentLocale === 'en-US';
  const baseUrl = 'https://www.kaueruon.dev';
  const localizedUrl = `${baseUrl}/${currentLocale}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${localizedUrl}#person`,
    name: 'Kauê Ruon Cardoso',
    givenName: 'Kauê',
    familyName: 'Ruon Cardoso',
    description: isEnglish
      ? 'I build applications, automate workflows, and help people use technology.'
      : 'Crio aplicações, automatizo rotinas e ajudo pessoas a usar tecnologia.',
    url: localizedUrl,
    image: 'https://github.com/Kauerc10.png',
    email: 'mailto:kaue@ruon.dev',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Blumenau',
      addressRegion: 'SC',
      addressCountry: 'BR',
    },
    sameAs: [
      'https://github.com/Kauerc10',
      'https://www.linkedin.com/in/kauerc/',
      'https://docfacil-indol.vercel.app',
      'https://ckf-manutencao-orcamentos.vercel.app',
    ],
    knowsAbout: [
      'Next.js 15 App Router',
      'TypeScript',
      'Applied AI and process automation',
      'Gemini 1.5 Flash / OpenAI GPT-4o-mini',
      'Prisma ORM & PostgreSQL',
      'Notarial Automation & LegalTech',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${localizedUrl}#website`,
    url: localizedUrl,
    name: isEnglish
      ? 'Kauê Ruon Cardoso — Software Development | Applied AI | Automation'
      : 'Kauê Ruon Cardoso — Desenvolvimento de Software | IA Aplicada | Automação',
    description: isEnglish
      ? 'Software development, applied AI and process automation projects by Kauê Ruon Cardoso.'
      : 'Projetos de desenvolvimento de software, IA aplicada e automação de processos de Kauê Ruon Cardoso.',
    publisher: {
      '@id': `${localizedUrl}#person`,
    },
    inLanguage: currentLocale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
