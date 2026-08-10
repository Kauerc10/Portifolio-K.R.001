import { KAUE_PROFILE_KNOWLEDGE } from './rag-knowledge';
import { AEVO_TOOLS } from './tools-definitions';

export interface AevoGenerateParams {
  messages: Array<{ role: string; content: string }>;
}

export class AevoProviderFactory {
  /**
   * Gera uma resposta agnóstica do Agente ÆVO utilizando a ordem de prioridade dos provedores:
   * Gemini 2.5 Flash -> OpenAI GPT-4o-mini -> Groq Llama 3 -> Local Knowledge Fallback Engine.
   */
  static async generateResponse(params: AevoGenerateParams) {
    const userMessage = params.messages[params.messages.length - 1]?.content || '';
    const lowerMsg = userMessage.toLowerCase();

    // Tentar provedores via Vercel AI SDK se chaves de API estiverem presentes
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const { generateText } = await import('ai');
        const { google } = await import('@ai-sdk/google');
        
        const result = await generateText({
          model: google('gemini-1.5-flash'),
          system: this.buildSystemPrompt(),
          messages: params.messages as any,
          temperature: 0.7,
        });

        return {
          text: result.text,
          providerUsed: 'Gemini 1.5 Flash (Google)',
          toolCalls: this.detectClientTools(lowerMsg),
        };
      } catch (err) {
        console.warn('[ÆVO Factory] Gemini falhou, tentando fallback...', err);
      }
    }

    if (openaiKey) {
      try {
        const { generateText } = await import('ai');
        const { openai } = await import('@ai-sdk/openai');

        const result = await generateText({
          model: openai('gpt-4o-mini'),
          system: this.buildSystemPrompt(),
          messages: params.messages as any,
          temperature: 0.7,
        });

        return {
          text: result.text,
          providerUsed: 'GPT-4o-mini (OpenAI)',
          toolCalls: this.detectClientTools(lowerMsg),
        };
      } catch (err) {
        console.warn('[ÆVO Factory] OpenAI falhou, ativando Engine Local RAG...', err);
      }
    }

    // Fallback Inteligente RAG Engine em memória (garante resposta 100% resiliente sem API Key)
    return {
      text: this.generateLocalFallback(lowerMsg),
      providerUsed: 'ÆVO RAG Engine (Local Fallback Resiliente)',
      toolCalls: this.detectClientTools(lowerMsg),
    };
  }

  private static buildSystemPrompt(): string {
    return `Você é **ÆVO**, o Agente Inteligente Oficial do portfólio de Kauê Ruon Cardoso.
Seu objetivo é apresentar o Kauê de forma técnica, elegante, direta e com tom de especialista em IA.

Use a base de conhecimento abaixo para responder perguntas de recrutadores e visitantes:

${KAUE_PROFILE_KNOWLEDGE}

Diretrizes de resposta:
- Responda sempre em Português do Brasil com linguagem profissional e concisa.
- Destaque que Kauê constrói software guiando IA generativa com rigor e tolerância zero a erros (visão notarial).
- Se perguntado sobre ferramentas, projetos ou contato, ofereça informações claras.`;
  }

  private static detectClientTools(msg: string) {
    const tools = [];

    if (msg.includes('projeto') || msg.includes('docfacil') || msg.includes('ckf') || msg.includes('foli')) {
      if (msg.includes('docfacil')) tools.push({ name: 'highlight_project', args: { projectSlug: 'docfacil' } });
      if (msg.includes('ckf')) tools.push({ name: 'highlight_project', args: { projectSlug: 'ckf' } });
      if (msg.includes('foli')) tools.push({ name: 'highlight_project', args: { projectSlug: 'foli' } });
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'projetos' } });
    } else if (msg.includes('curriculo') || msg.includes('cv') || msg.includes('baixar')) {
      tools.push({ name: 'open_resume', args: {} });
    } else if (msg.includes('sobre') || msg.includes('história') || msg.includes('cartorio') || msg.includes('gaya')) {
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'sobre' } });
    } else if (msg.includes('obmep') || msg.includes('matematica') || msg.includes('medalha')) {
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'obmep' } });
    } else if (msg.includes('contato') || msg.includes('email') || msg.includes('falar')) {
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'contato' } });
    } else if (msg.includes('glitch') || msg.includes('efeito') || msg.includes('3d')) {
      tools.push({ name: 'trigger_glitch_mode', args: {} });
    } else if (msg.includes('konami') || msg.includes('cyberdeck') || msg.includes('breach')) {
      tools.push({ name: 'trigger_konami_protocol', args: {} });
    }

    return tools;
  }

  private static generateLocalFallback(msg: string): string {
    if (msg.includes('projeto') || msg.includes('docfacil') || msg.includes('foli') || msg.includes('ckf')) {
      return `**ÆVO Agent:** Kauê desenvolveu diversos projetos de destaque guiando IA e engenharia de software:\n\n` +
             `- **DocFácil:** Gerador de documentos legais com IA generativa agnóstica (Next.js 16/Prisma).\n` +
             `- **Foli:** Engine open-source de geração de PDF em TypeScript com zero-overflow.\n` +
             `- **CKF Manutenção:** Sistema de orçamentos e relatórios em produção (React/Supabase).\n` +
             `- **Atlas Notarial:** Automação de procurações no Cartório Gaya integrando API do Detran.\n\n` +
             `Rolei a tela para a seção de projetos para você conferir!`;
    }

    if (msg.includes('curriculo') || msg.includes('cv') || msg.includes('download')) {
      return `**ÆVO Agent:** Você pode baixar o currículo oficial em PDF do Kauê clicando no botão no topo ou usando o link direto disponibilizado no site.`;
    }

    if (msg.includes('obmep') || msg.includes('matematica')) {
      return `**ÆVO Agent:** Kauê tem base sólida em raciocínio lógico forjada na OBMEP (IMPA), onde conquistou Medalha de Prata Regional, Bronze Nacional e duas Menções Honrosas.`;
    }

    return `**ÆVO Agent:** Olá! Sou o assistente oficial de Kauê Ruon Cardoso (AI Engineer · Blumenau/SC). ` +
           `Ele constrói software guiando IA generativa com rigor técnico e mentalidade notarial de tolerância zero a erros. ` +
           `Como posso te ajudar a conhecer o trabalho dele hoje?`;
  }
}
