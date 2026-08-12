import { describe, it, expect } from 'vitest';
import { AevoProviderFactory } from '@/lib/aevo/provider-factory';
import { retrieveRelevantKnowledge } from '@/lib/aevo/rag-knowledge';

describe('AevoProviderFactory (Agente de IA ÆVO)', () => {
  it('deve retornar resposta resiliente da base local quando chaves de API não estão configuradas', async () => {
    const res = await AevoProviderFactory.generateResponse({
      messages: [{ role: 'user', content: 'Quais os projetos do Kauê?' }],
    });

    expect(res.text).toContain('DocFácil');
    expect(res.text).toContain('CKF Manutenção');
    expect(res.text).toContain('Foli');
    expect(res.providerUsed).toBe('Base Local ÆVO');
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

  it('deve recuperar somente os trechos relevantes da base para reduzir ruído no prompt', () => {
    const context = retrieveRelevantKnowledge('Como o Atlas automatiza o Detran?');

    expect(context).toContain('[fonte:atlas]');
    expect(context).toContain('vinte segundos');
    expect(context).not.toContain('[fonte:obmep]');
  });

  it('deve usar ações locais específicas para habilidades, formulário e cópia do e-mail', async () => {
    const skills = await AevoProviderFactory.generateResponse({ messages: [{ role: 'user', content: 'Mostre as habilidades' }] });
    const petition = await AevoProviderFactory.generateResponse({ messages: [{ role: 'user', content: 'Preencha a petição' }] });
    const email = await AevoProviderFactory.generateResponse({ messages: [{ role: 'user', content: 'Copie o email' }] });

    expect(skills.toolCalls).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'filter_skills' }),
      expect.objectContaining({ name: 'scroll_to_section', args: { sectionId: 'skills' } }),
    ]));
    expect(petition.toolCalls).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'fill_petition_form' })]));
    expect(email.toolCalls).toEqual([expect.objectContaining({ name: 'copy_contact_email' })]);
  });

  it('deve demonstrar RAG e efeitos cinematográficos apenas quando solicitados', async () => {
    const rag = await AevoProviderFactory.generateResponse({ messages: [{ role: 'user', content: 'Demonstre seu RAG' }] });
    const gravity = await AevoProviderFactory.generateResponse({ messages: [{ role: 'user', content: 'Ative gravidade zero' }] });
    const explosion = await AevoProviderFactory.generateResponse({ messages: [{ role: 'user', content: 'Faça o núcleo explodir' }] });

    expect(rag.toolCalls).toEqual([expect.objectContaining({ name: 'demonstrate_rag' })]);
    expect(gravity.toolCalls).toEqual([expect.objectContaining({ name: 'activate_zero_gravity' })]);
    expect(explosion.toolCalls).toEqual([expect.objectContaining({ name: 'explode_visual_core' })]);
  });
});
