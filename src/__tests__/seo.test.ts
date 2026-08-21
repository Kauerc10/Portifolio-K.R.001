import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import manifest from '@/app/manifest';

const canonicalHost = 'https://www.kaueruon.dev';

describe('Arquitetura de SEO & GEO (Search + AI Readiness)', () => {
  it('deve gerar sitemap.xml com o hostname canônico que responde em produção', () => {
    const sitemapData = sitemap();

    expect(sitemapData.length).toBeGreaterThanOrEqual(2);
    expect(sitemapData[0].url).toBe(`${canonicalHost}/pt-BR`);
    expect(sitemapData[1].url).toBe(`${canonicalHost}/en-US`);
    expect(sitemapData[0].alternates?.languages?.['pt-BR']).toBe(`${canonicalHost}/pt-BR`);
    expect(sitemapData[0].alternates?.languages?.['en-US']).toBe(`${canonicalHost}/en-US`);
    expect(sitemapData[0].priority).toBe(1.0);
  });

  it('deve gerar robots.txt com o mesmo host canônico e liberar os crawlers esperados', () => {
    const robotsData = robots();

    expect(robotsData.host).toBe(canonicalHost);
    expect(robotsData.sitemap).toBe(`${canonicalHost}/sitemap.xml`);

    const rulesList = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
    const aiRules = rulesList.find((r: any) => Array.isArray(r.userAgent) && r.userAgent.includes('GPTBot'));
    expect(aiRules).toBeDefined();
    expect(aiRules?.allow).toBe('/');
  });

  it('deve anunciar ícones KRC locais de alta resolução no manifest', () => {
    const manifestData = manifest();
    const icons = manifestData.icons ?? [];

    expect(manifestData.name).toContain('Kauê Ruon Cardoso');
    expect(manifestData.theme_color).toBe('#d4a017');
    expect(manifestData.background_color).toBe('#0b1120');
    expect(icons).toEqual(expect.arrayContaining([
      expect.objectContaining({
        src: '/assets/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      }),
      expect.objectContaining({
        src: '/assets/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }),
    ]));
    expect(icons.every((icon) => typeof icon.src === 'string' && icon.src.startsWith('/'))).toBe(true);
  });

  it('deve publicar um favicon de busca >= 48px e usar o host canônico nos metadados localizados', () => {
    const layoutSource = readFileSync(
      path.join(process.cwd(), 'src/app/[locale]/layout.tsx'),
      'utf8',
    );

    expect(layoutSource).toContain(`const baseUrl = '${canonicalHost}';`);
    expect(layoutSource).toContain("url: '/assets/favicon-96x96.png'");
    expect(layoutSource).toContain("sizes: '96x96'");
  });

  it('deve manter /favicon.ico disponível na raiz para clientes que usam a convenção histórica', () => {
    expect(existsSync(path.join(process.cwd(), 'public/favicon.ico'))).toBe(true);
  });
});
