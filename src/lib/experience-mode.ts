import type { ProjectAudience } from '@/content/projects/data';

export type ExperienceMode = 'hybrid' | 'commercial' | 'career';

export const routeExperienceMode = {
  home: 'hybrid',
  services: 'commercial',
  career: 'career',
} as const;

export function experienceModeForRoute(
  route: 'home' | 'services' | 'career',
): ExperienceMode {
  return routeExperienceMode[route] || 'hybrid';
}

export function experienceModeForProject(
  audience: ProjectAudience,
): ExperienceMode {
  if (audience === 'business') return 'commercial';
  if (audience === 'engineering') return 'career';
  return 'hybrid';
}
