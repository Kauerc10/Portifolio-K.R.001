import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import manifest from '@/app/manifest';

describe('Arquitetura de SEO & GEO (Search + AI Readiness)', () => {
  it('deve gerar sitemap.xml dinâmico com a URL canônica https://kaueruon.dev', () => {
    const sitemapData = sitemap();
    expect(sitemapData.length).toBeGreaterThanOrEqual(2);
    expect(sitemapData[0].url).toBe('https://kaueruon.dev/pt-BR');
    expect(sitemapData[1].url).toBe('https://kaueruon.dev/en-US');
    expect(sitemapData[0].priority).toBe(1.0);
  });

  it('deve gerar robots.txt com permissões para crawlers de IA (GPTBot, ClaudeBot, PerplexityBot)', () => {
    const robotsData = robots();
    expect(robotsData.sitemap).toBe('https://kaueruon.dev/sitemap.xml');
    
    const rulesList = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
    const aiRules = rulesList.find((r: any) => Array.isArray(r.userAgent) && r.userAgent.includes('GPTBot'));
    expect(aiRules).toBeDefined();
    expect(aiRules?.allow).toBe('/');
  });

  it('deve gerar manifest.webmanifest com nome e descrições oficiais', () => {
    const manifestData = manifest();
    expect(manifestData.name).toContain('Kauê Ruon Cardoso');
    expect(manifestData.theme_color).toBe('#d4a017');
    expect(manifestData.background_color).toBe('#0b1120');
  });
});
