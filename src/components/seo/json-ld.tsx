export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://kaueruon.dev/#person',
    name: 'Kauê Ruon Cardoso',
    givenName: 'Kauê',
    familyName: 'Ruon Cardoso',
    jobTitle: 'Software Architect & SaaS Developer',
    description:
      'AI Engineer e Cartorário especializado em arquitetura Next.js 16, TypeScript, IA Generativa agnóstica e automação de processos notariais.',
    url: 'https://kaueruon.dev',
    image: 'https://github.com/Kauerc10.png',
    email: 'mailto:kaue.ruon@gmail.com',
    telephone: '+5547999999999',
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
        name: 'Cartório Gaya',
        jobTitle: 'Cartorário & Engenheiro de Automações',
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
      'Next.js 16 App Router',
      'TypeScript',
      'Generative AI & RAG Architecture',
      'OpenAI / Anthropic / Gemini API Integrations',
      'Prisma ORM & PostgreSQL',
      'Automação Notarial & Regtech',
      'Layout Engines & PDF Generators (Foli)',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://kaueruon.dev/#website',
    url: 'https://kaueruon.dev',
    name: 'Kauê Ruon Cardoso — Software Architect & SaaS Developer',
    description:
      'Portfólio de Engenharia de Software, Arquitetura de IA Generativa e projetos em produção de Kauê Ruon Cardoso.',
    publisher: {
      '@id': 'https://kaueruon.dev/#person',
    },
    inLanguage: 'pt-BR',
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://kaueruon.dev/#profilepage',
    url: 'https://kaueruon.dev',
    name: 'Perfil Profissional e Portfólio de Kauê Ruon Cardoso',
    mainEntity: {
      '@id': 'https://kaueruon.dev/#person',
    },
    dateCreated: '2026-01-01T00:00:00+00:00',
    dateModified: new Date().toISOString(),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
