import { describe, it, expect } from 'vitest';
import { AevoProviderFactory } from '@/lib/aevo/provider-factory';

describe('AevoProviderFactory (Agente de IA ÆVO)', () => {
  it('deve retornar resposta resiliente do RAG Engine Local quando chaves de API não estão configuradas', async () => {
    const res = await AevoProviderFactory.generateResponse({
      messages: [{ role: 'user', content: 'Quais os projetos do Kauê?' }],
    });

    expect(res.text).toContain('DocFácil');
    expect(res.text).toContain('CKF Manutenção');
    expect(res.text).toContain('Foli');
    expect(res.providerUsed).toBe('Engine Local RAG ÆVO');
  });

  it('deve respeitar a ordem configurável de providers e ignorar valores inválidos', () => {
    expect(AevoProviderFactory.getProviderOrder({
      NODE_ENV: 'test',
      AEVO_PROVIDER_ORDER: 'groq, openai,invalid,groq,gemini',
    })).toEqual(['groq', 'openai', 'gemini']);
  });

  it('deve detectar tool call scroll_to_section quando usuário pergunta por projetos', async () => {
    const res = await AevoProviderFactory.generateResponse({
      messages: [{ role: 'user', content: 'Me mostre os projetos' }],
    });

    expect(res.toolCalls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'scroll_to_section', args: { sectionId: 'projetos' } }),
      ])
    );
  });

  it('deve responder sobre a OBMEP e conquistas em matemática', async () => {
    const res = await AevoProviderFactory.generateResponse({
      messages: [{ role: 'user', content: 'Fale sobre a OBMEP' }],
    });

    expect(res.text).toContain('OBMEP');
    expect(res.text).toContain('Bronze Nacional');
  });
});
