import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kaueruon.dev';
  const now = new Date();

  const languageAlternates = {
    'pt-BR': `${baseUrl}/pt-BR`,
    'en-US': `${baseUrl}/en-US`,
  };

  const homeEntries = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: locale === 'pt-BR' ? 1.0 : 0.9,
    alternates: {
      languages: languageAlternates,
    },
  }));
  const caseEntries = locales.flatMap((locale) => [
    { url: `${baseUrl}/${locale}/projetos/viodigital`, lastModified: now, changeFrequency: 'monthly' as const, priority: locale === 'pt-BR' ? 0.8 : 0.7, alternates: { languages: { 'pt-BR': `${baseUrl}/pt-BR/projetos/viodigital`, 'en-US': `${baseUrl}/en-US/projetos/viodigital` } } },
    { url: `${baseUrl}/${locale}/projetos/vecom`, lastModified: now, changeFrequency: 'monthly' as const, priority: locale === 'pt-BR' ? 0.8 : 0.7, alternates: { languages: { 'pt-BR': `${baseUrl}/pt-BR/projetos/vecom`, 'en-US': `${baseUrl}/en-US/projetos/vecom` } } },
    { url: `${baseUrl}/${locale}/projetos/atlas-notarial`, lastModified: now, changeFrequency: 'monthly' as const, priority: locale === 'pt-BR' ? 0.8 : 0.7, alternates: { languages: { 'pt-BR': `${baseUrl}/pt-BR/projetos/atlas-notarial`, 'en-US': `${baseUrl}/en-US/projetos/atlas-notarial` } } },
    { url: `${baseUrl}/${locale}/projetos/docfacil`, lastModified: now, changeFrequency: 'monthly' as const, priority: locale === 'pt-BR' ? 0.8 : 0.7, alternates: { languages: { 'pt-BR': `${baseUrl}/pt-BR/projetos/docfacil`, 'en-US': `${baseUrl}/en-US/projetos/docfacil` } } },
    { url: `${baseUrl}/${locale}/projetos/ckf`, lastModified: now, changeFrequency: 'monthly' as const, priority: locale === 'pt-BR' ? 0.8 : 0.7, alternates: { languages: { 'pt-BR': `${baseUrl}/pt-BR/projetos/ckf`, 'en-US': `${baseUrl}/en-US/projetos/ckf` } } },
  ]);
  return [...homeEntries, ...caseEntries];
}
