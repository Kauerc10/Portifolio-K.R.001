import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { getProjects } from '@/content/projects';

const canonicalHost = 'https://www.kaueruon.dev';

describe('SEO, Metadata e Structured Data Expandidos (Task 13)', () => {
  it('deve gerar sitemap com todas as rotas da V4 e alternate hreflangs', () => {
    const map = sitemap();
    const urls = map.map((item) => item.url);

    // Rotas Home
    expect(urls).toContain(`${canonicalHost}/pt-BR`);
    expect(urls).toContain(`${canonicalHost}/en-US`);

    // Rotas Principais
    expect(urls).toContain(`${canonicalHost}/pt-BR/servicos`);
    expect(urls).toContain(`${canonicalHost}/en-US/servicos`);
    expect(urls).toContain(`${canonicalHost}/pt-BR/carreira`);
    expect(urls).toContain(`${canonicalHost}/en-US/carreira`);
    expect(urls).toContain(`${canonicalHost}/pt-BR/projetos`);
    expect(urls).toContain(`${canonicalHost}/en-US/projetos`);

    // Rotas de Projetos
    const projects = getProjects('pt-BR');
    projects.forEach((project) => {
      expect(urls).toContain(`${canonicalHost}/pt-BR/projetos/${project.slug}`);
      expect(urls).toContain(`${canonicalHost}/en-US/projetos/${project.slug}`);
    });

    // Validar formato e host dos alternates em todas as rotas
    map.forEach((item) => {
      expect(item.alternates?.languages?.['pt-BR']).toMatch(/^https:\/\/www\.kaueruon\.dev\/pt-BR/);
      expect(item.alternates?.languages?.['en-US']).toMatch(/^https:\/\/www\.kaueruon\.dev\/en-US/);
    });
  });

  it('deve gerar robots.txt permitindo rastreadores e apontando para o host canônico', () => {
    const rob = robots();
    expect(rob.host).toBe(canonicalHost);
    expect(rob.sitemap).toBe(`${canonicalHost}/sitemap.xml`);
  });
});
