import { describe, it, expect } from 'vitest';
import ptBR from '@/i18n/locales/pt-BR.json';
import enUS from '@/i18n/locales/en-US.json';
import { isValidLocale, locales } from '@/i18n/config';
import { AevoProviderFactory } from '@/lib/aevo/provider-factory';

describe('Suíte de Testes da Arquitetura i18n (Next.js 15 Nativo)', () => {
  it('deve ter correspondência de chaves 1:1 entre pt-BR.json e en-US.json sem omissões', () => {
    function getKeys(obj: any, prefix = ''): string[] {
      return Object.keys(obj).reduce((acc: string[], key: string) => {
        const pre = prefix ? `${prefix}.` : '';
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          acc.push(...getKeys(obj[key], pre + key));
        } else {
          acc.push(pre + key);
        }
        return acc;
      }, []);
    }

    const ptKeys = getKeys(ptBR).sort();
    const enKeys = getKeys(enUS).sort();

    expect(enKeys).toEqual(ptKeys);
  });

  it('não deve conter valores vazios ou nulos em en-US.json', () => {
    function checkNonEmpty(obj: any, path = '') {
      for (const key in obj) {
        const currentPath = path ? `${path}.${key}` : key;
        const val = obj[key];
        if (typeof val === 'string') {
          expect(val.trim().length, `Chave em en-US.json vazia: ${currentPath}`).toBeGreaterThan(0);
        } else if (typeof val === 'object' && val !== null) {
          checkNonEmpty(val, currentPath);
        }
      }
    }
    checkNonEmpty(enUS);
  });

  it('preserva todas as medalhas e formações do design original nos dois idiomas', () => {
    for (const dictionary of [ptBR, enUS]) {
      expect(dictionary.conquistas.medals).toHaveLength(4);
      expect(dictionary.formacao.items).toHaveLength(5);
      expect(dictionary.conquistas.medals.every((medal) => medal.cursorLabel.length > 0)).toBe(true);
      expect(dictionary.conquistas.medals.every((medal) => medal.editionLabel.length > 0)).toBe(true);
    }
    expect(ptBR.conquistas.medals[0].editionLabel).toBe('18ª');
    expect(enUS.conquistas.medals[0].editionLabel).toBe('18th');
  });

  it('preserva o conteúdo factual do portfólio original nos dois idiomas', () => {
    expect(ptBR.sobre.bioP1).toContain('manutenção de placas de iPhone');
    expect(ptBR.experiencia.roles).toHaveLength(3);
    expect(ptBR.experiencia.roles[0].title).toBe('Founder & Builder — DocFácil');
    expect(ptBR.experiencia.roles[1].company).toBe('Cartório Gaya');
    expect(ptBR.skills.groups).toHaveLength(4);
    expect(ptBR.projetos.items.atlas.solution).toContain('5 minutos para 20 segundos');
    expect(enUS.experiencia.roles[2].title).toBe('Apple Repair Technician');
    expect(enUS.projetos.items.folilib.title).toContain('PDF Layout Engine');
  });

  it('mantém o typewriter e o currículo localizados no hero', () => {
    expect(enUS.hero.roles.every((role) => !/[áàâãéêíóôõúç]/i.test(role))).toBe(true);
    expect(enUS.hero.ctaResume).toBe('RESUME.PDF');
    expect(ptBR.hero.ctaResume).toBe('CURRÍCULO.PDF');
  });

  it('deve validar locais suportados com isValidLocale', () => {
    expect(isValidLocale('pt-BR')).toBe(true);
    expect(isValidLocale('en-US')).toBe(true);
    expect(isValidLocale('es-ES')).toBe(false);
    expect(isValidLocale('invalid')).toBe(false);
  });

  it('deve gerar respostas do Agente ÆVO no idioma correto (PT e EN)', async () => {
    const resPt = await AevoProviderFactory.generateResponse({
      messages: [{ role: 'user', content: 'Olá, quais são os projetos do Kauê?' }],
      locale: 'pt-BR',
    });
    expect(resPt.text).toContain('DocFácil');
    expect(resPt.text).toContain('projetos');

    const resEn = await AevoProviderFactory.generateResponse({
      messages: [{ role: 'user', content: 'Hello, what are Kaue projects?' }],
      locale: 'en-US',
    });
    expect(resEn.text).toContain('DocFácil');
    expect(resEn.text).toContain('scrolled the screen to the projects section');
  });

  it('deve reconhecer palavras-chave de tool calling tanto em PT quanto em EN', async () => {
    const resEnTools = await AevoProviderFactory.generateResponse({
      messages: [{ role: 'user', content: 'Show me projects and resume' }],
      locale: 'en-US',
    });

    expect(resEnTools.toolCalls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'scroll_to_section', args: { sectionId: 'projetos' } }),
      ])
    );
  });
});
