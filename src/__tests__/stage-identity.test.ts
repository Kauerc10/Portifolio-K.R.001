import { describe, expect, it } from 'vitest';
import { homeProjects, stageProjectBySlug, stageProjects, type StageProjectSlug } from '@/components/projects/stage-proof/stage-projects';

describe('stage project identity', () => {
  it('keeps the approved home order independent from the experiment order', () => {
    expect(homeProjects.map(project => project.slug)).toEqual(['viodigital', 'vecom', 'atlas-notarial', 'docfacil', 'ckf']);
    expect(stageProjects.map(project => project.slug)).toEqual(['docfacil', 'vecom', 'viodigital', 'atlas-notarial', 'ckf']);
  });

  it('keeps story and art attached to the slug when presentation order changes', () => {
    const reordered = [...stageProjects].reverse();
    for (const project of reordered) {
      const identity = stageProjectBySlug[project.slug as StageProjectSlug];
      expect(identity.story).toBe(project.slug);
      expect(identity.art).toBe(project.slug);
    }
  });
});
