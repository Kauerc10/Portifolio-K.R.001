import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import JsonLd from '@/components/seo/json-ld';
import manifest from '@/app/manifest';
import { AevoProviderFactory } from '@/lib/aevo/provider-factory';
import { retrieveRelevantKnowledge } from '@/lib/aevo/rag-knowledge';

describe('Factual professional presentation', () => {
  it.each(['pt-BR', 'en-US'] as const)('publishes a factual identity in %s structured data', locale => {
    const markup = renderToStaticMarkup(<JsonLd locale={locale} />);
    const doc = new DOMParser().parseFromString(markup, 'text/html');
    const schemas = [...doc.querySelectorAll('script')].map(script => JSON.parse(script.textContent || '{}'));
    const person = schemas.find(schema => schema['@type'] === 'Person');
    const site = schemas.find(schema => schema['@type'] === 'WebSite');
    expect(person.name).toBe('Kauê Ruon Cardoso');
    expect(site.name).toContain(locale === 'pt-BR' ? 'IA Aplicada' : 'Applied AI');
    expect(JSON.stringify(schemas)).not.toMatch(/Software Architect|AI Engineer|RAG Architecture|K-HUB|100%/i);
  });

  it('uses the same positioning for the installed application', () => {
    expect(manifest().name).toContain('Desenvolvimento de Software | IA Aplicada | Automação');
  });

  it('keeps retrieved context and local replies free of inflated roles and guarantees', async () => {
    const context = retrieveRelevantKnowledge('perfil experiência Kauê cartório');
    expect(context).toContain('responsabilidade');
    expect(context).not.toMatch(/Software Architect|AI Engineer|K-HUB|tolerância zero/i);
    const reply = await AevoProviderFactory.generateResponse({ messages: [{ role: 'user', content: 'Quem é o Kauê?' }] });
    expect(reply.text).toContain('decisões técnicas');
    expect(reply.text).not.toMatch(/Software Architect|AI Engineer|tolerância zero|zero.tolerance/i);
  });
});
