import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kaueruon.dev';
  const now = new Date();

  const languageAlternates = {
    'pt-BR': `${baseUrl}/pt-BR`,
    'en-US': `${baseUrl}/en-US`,
  };

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: locale === 'pt-BR' ? 1.0 : 0.9,
    alternates: {
      languages: languageAlternates,
    },
  }));
}
