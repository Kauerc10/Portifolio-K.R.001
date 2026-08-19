import React from 'react';
import type { Locale } from '@/i18n/config';

interface JsonLdProps {
  locale?: Locale;
  pageType?: 'home' | 'services' | 'career' | 'project';
  projectData?: {
    name: string;
    description: string;
    url: string;
  };
}

export default function JsonLd({ locale, pageType = 'home', projectData }: JsonLdProps) {
  const currentLocale = locale || 'pt-BR';
  const isEnglish = currentLocale === 'en-US';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `https://kaueruon.dev/${currentLocale}#person`,
    name: 'Kauê Ruon Cardoso',
    givenName: 'Kauê',
    familyName: 'Ruon Cardoso',
    jobTitle: isEnglish
      ? 'Software Architect & Full-Stack Engineer'
      : 'Arquiteto de Software & Engenheiro Full-Stack',
    description: isEnglish
      ? 'Software Architect and AI Engineer specializing in Next.js 15, TypeScript, Generative AI (RAG), and zero-tolerance notarial automation.'
      : 'Engenheiro de Software e Arquiteto de IA especializado em Next.js 15, TypeScript, IA Generativa (RAG) e automação notarial de tolerância zero a erros.',
    url: `https://kaueruon.dev/${currentLocale}`,
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
        name: 'Cartório Gaya',
        jobTitle: isEnglish ? 'Notary Officer & Automation Engineer' : 'Cartorário & Engenharia de Automações',
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
      'Prisma ORM & PostgreSQL',
      'Notarial Automation & LegalTech',
      'Competitive Mathematics (OBMEP)',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `https://kaueruon.dev/${currentLocale}#website`,
    url: `https://kaueruon.dev/${currentLocale}`,
    name: isEnglish
      ? 'Kauê Ruon Cardoso — Software Architect & AI Systems Engineer'
      : 'Kauê Ruon Cardoso — Arquiteto de Software & Engenheiro de IA',
    description: isEnglish
      ? 'Software Engineering Portfolio, Generative AI Systems & Production Case Studies by Kauê Ruon Cardoso.'
      : 'Portfólio de Engenharia de Software, Arquitetura de IA Generativa e projetos em produção de Kauê Ruon Cardoso.',
    publisher: {
      '@id': `https://kaueruon.dev/${currentLocale}#person`,
    },
    inLanguage: currentLocale,
  };

  const serviceSchema = pageType === 'services' ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: isEnglish ? 'Custom Software Development & Automation' : 'Desenvolvimento de Software Sob Medida e Automação',
    provider: {
      '@id': `https://kaueruon.dev/${currentLocale}#person`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brazil',
    },
    description: isEnglish
      ? 'Custom websites, web systems, and AI automation workflows for companies.'
      : 'Sites sob medida, sistemas web e automações de processos com IA para empresas.',
  } : null;

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
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
    </>
  );
}
