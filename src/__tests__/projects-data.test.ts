import { describe, it, expect } from 'vitest';
import { getProjects, getProjectBySlug } from '@/content/projects';
import { locales } from '@/i18n/config';

describe('Centralização de Dados dos Projetos (src/content/projects)', () => {
  it('deve retornar a lista completa de projetos ordenados para pt-BR e en-US', () => {
    const projectsPt = getProjects('pt-BR');
    const projectsEn = getProjects('en-US');

    expect(projectsPt.length).toBeGreaterThanOrEqual(4);
    expect(projectsEn.length).toBe(projectsPt.length);

    // Deve estar ordenado pela propriedade order
    for (let i = 1; i < projectsPt.length; i++) {
      expect(projectsPt[i].order).toBeGreaterThanOrEqual(projectsPt[i - 1].order);
    }
  });

  it('deve possuir slugs únicos e sem caracteres inválidos em todas as línguas', () => {
    locales.forEach((locale) => {
      const projects = getProjects(locale);
      const slugs = projects.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);

      expect(uniqueSlugs.size).toBe(slugs.length);

      slugs.forEach((slug) => {
        expect(slug).toMatch(/^[a-z0-9-]+$/);
      });
    });
  });

  it('deve ter paridade estrutural e de campos entre pt-BR e en-US para cada slug', () => {
    const projectsPt = getProjects('pt-BR');

    projectsPt.forEach((projectPt) => {
      const projectEn = getProjectBySlug('en-US', projectPt.slug);
      expect(projectEn).toBeDefined();

      if (projectEn) {
        expect(projectEn.slug).toBe(projectPt.slug);
        expect(projectEn.audience).toBe(projectPt.audience);
        expect(projectEn.kind).toBe(projectPt.kind);
        expect(projectEn.stack).toEqual(projectPt.stack);
        expect(projectEn.title.trim().length).toBeGreaterThan(0);
        expect(projectEn.summary.trim().length).toBeGreaterThan(0);
        expect(projectEn.problem.trim().length).toBeGreaterThan(0);
        expect(projectEn.solution.trim().length).toBeGreaterThan(0);
        expect(projectEn.capabilities.length).toBe(projectPt.capabilities.length);
        expect(projectEn.links.length).toBe(projectPt.links.length);
      }
    });
  });

  it('deve retornar undefined ao buscar por slug inexistente', () => {
    expect(getProjectBySlug('pt-BR', 'projeto-que-nao-existe')).toBeUndefined();
    expect(getProjectBySlug('en-US', 'non-existent-project')).toBeUndefined();
  });

  it('todos os links externos devem ser HTTPS seguros ou âncoras válidas', () => {
    locales.forEach((locale) => {
      const projects = getProjects(locale);
      projects.forEach((project) => {
        project.links.forEach((link) => {
          expect(link.href).toMatch(/^(https:\/\/|#|\/)/);
        });
      });
    });
  });
});
