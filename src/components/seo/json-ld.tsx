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
    jobTitle: isEnglish
      ? 'Software Architect & AI Systems Engineer'
      : 'Arquiteto de Software & Engenheiro de IA',
    description: isEnglish
      ? 'Software Architect and AI Engineer specializing in Next.js 15, TypeScript, Generative AI (RAG), and zero-tolerance notarial automation.'
      : 'Engenheiro de Software e Arquiteto de IA especializado em Next.js 15, TypeScript, IA Generativa (RAG) e automação notarial de tolerância zero a erros.',
    url: localizedUrl,
    image: 'https://github.com/Kauerc10.png',
    email: 'mailto:kaue.ruon@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Blumenau',
      addressRegion: 'SC',
      addressCountry: 'BR',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'IMPA — Olimpíada Brasileira de Matemática das Escolas Públicas (OBMEP)',
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Serviços Notariais e Registrais / LegalTech',
        jobTitle: isEnglish ? 'Software Architect & Notarial Innovation' : 'Engenheiro de Software & Inovação Notarial',
      },
      {
        '@type': 'Organization',
        name: 'K-HUB Soluções',
        jobTitle: 'Founder & Software Architect',
      },
    ],
    sameAs: [
      'https://github.com/Kauerc10',
      'https://www.linkedin.com/in/kauerc/',
      'https://docfacil-indol.vercel.app',
      'https://ckf-manutencao-orcamentos.vercel.app',
    ],
    knowsAbout: [
      'Next.js 15 App Router',
      'TypeScript',
      'Generative AI & RAG Architecture',
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
      ? 'Kauê Ruon Cardoso — Software Architect & AI Systems Engineer'
      : 'Kauê Ruon Cardoso — Arquiteto de Software & Engenheiro de IA',
    description: isEnglish
      ? 'Software Engineering Portfolio, Generative AI Systems & Production Case Studies by Kauê Ruon Cardoso.'
      : 'Portfólio de Engenharia de Software, Arquitetura de IA Generativa e projetos em produção de Kauê Ruon Cardoso.',
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
