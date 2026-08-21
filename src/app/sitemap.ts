import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { getProjects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kaueruon.dev';
  const now = new Date();
  const projects = getProjects('pt-BR');

  const routes: MetadataRoute.Sitemap = [];

  // 1. Home routes
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === 'pt-BR' ? 1.0 : 0.9,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt-BR`,
          'en-US': `${baseUrl}/en-US`,
        },
      },
    });
  });

  // 2. Core section pages (/servicos, /carreira, /projetos)
  const corePages = ['servicos', 'carreira', 'projetos'];
  corePages.forEach((page) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            'pt-BR': `${baseUrl}/pt-BR/${page}`,
            'en-US': `${baseUrl}/en-US/${page}`,
          },
        },
      });
    });
  });

  // 3. Project detail case study pages
  projects.forEach((project) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/projetos/${project.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            'pt-BR': `${baseUrl}/pt-BR/projetos/${project.slug}`,
            'en-US': `${baseUrl}/en-US/projetos/${project.slug}`,
          },
        },
      });
    });
  });

  return routes;
}
