import type { Locale } from '@/i18n/config';
import { BASE_PROJECTS, type ProjectAudience, type ProjectKind, type ProjectMetric, type ProjectLink } from './data';
import { PROJECTS_PT_BR } from './pt-BR';
import { PROJECTS_EN_US } from './en-US';

export type { ProjectAudience, ProjectKind, ProjectMetric, ProjectLink };

export interface PortfolioProject {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  audience: ProjectAudience;
  kind: ProjectKind;
  status: string;
  client?: string;
  stack: string[];
  capabilities: string[];
  metrics: ProjectMetric[];
  screenshots: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  links: ProjectLink[];
  featured: boolean;
  order: number;
}

export function getProjects(locale: Locale = 'pt-BR'): PortfolioProject[] {
  const localizedMap = locale === 'en-US' ? PROJECTS_EN_US : PROJECTS_PT_BR;

  return BASE_PROJECTS.map((base) => {
    const loc = localizedMap[base.slug] || PROJECTS_PT_BR[base.slug];

    const links: ProjectLink[] = base.linkDefs.map((def) => {
      const localizedLink = loc?.links.find((l) => l.key === def.key);
      return {
        label: localizedLink?.label || def.key.toUpperCase(),
        href: def.href,
        type: def.type,
      };
    });

    return {
      slug: base.slug,
      title: loc?.title || base.slug,
      shortTitle: loc?.shortTitle || base.slug,
      summary: loc?.summary || '',
      problem: loc?.problem || '',
      solution: loc?.solution || '',
      role: loc?.role || '',
      audience: base.audience,
      kind: base.kind,
      status: loc?.status || '',
      client: loc?.client,
      stack: base.stack,
      capabilities: loc?.capabilities || [],
      metrics: loc?.metrics || [],
      screenshots: base.screenshots,
      links,
      featured: base.featured,
      order: base.order,
    };
  }).sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(locale: Locale = 'pt-BR', slug: string): PortfolioProject | undefined {
  const allProjects = getProjects(locale);
  return allProjects.find((p) => p.slug === slug);
}
