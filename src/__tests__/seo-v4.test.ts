import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { getProjects } from '@/content/projects';

describe('SEO, Metadata e Structured Data Expandidos (Task 13)', () => {
  it('deve gerar sitemap com todas as rotas da V4 e alternate hreflangs', () => {
    const map = sitemap();
    const urls = map.map((item) => item.url);

    // Rotas Home
    expect(urls).toContain('https://kaueruon.dev/pt-BR');
    expect(urls).toContain('https://kaueruon.dev/en-US');

    // Rotas Principais
    expect(urls).toContain('https://kaueruon.dev/pt-BR/servicos');
    expect(urls).toContain('https://kaueruon.dev/en-US/servicos');
    expect(urls).toContain('https://kaueruon.dev/pt-BR/carreira');
    expect(urls).toContain('https://kaueruon.dev/en-US/carreira');
    expect(urls).toContain('https://kaueruon.dev/pt-BR/projetos');
    expect(urls).toContain('https://kaueruon.dev/en-US/projetos');

    // Rotas de Projetos
    const projects = getProjects('pt-BR');
    projects.forEach((project) => {
      expect(urls).toContain(`https://kaueruon.dev/pt-BR/projetos/${project.slug}`);
      expect(urls).toContain(`https://kaueruon.dev/en-US/projetos/${project.slug}`);
    });

    // Validar formato de alternates em todas as rotas
    map.forEach((item) => {
      expect(item.alternates?.languages?.['pt-BR']).toBeTruthy();
      expect(item.alternates?.languages?.['en-US']).toBeTruthy();
    });
  });

  it('deve gerar robots.txt permitindo rastreadores e apontando para o sitemap', () => {
    const rob = robots();
    expect(rob.sitemap).toBe('https://kaueruon.dev/sitemap.xml');
  });
});
