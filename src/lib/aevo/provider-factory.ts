import { retrieveRelevantKnowledge } from './rag-knowledge';
import { AEVO_TOOLS } from './tools-definitions';
import type { CoreMessage } from 'ai';

export interface AevoGenerateParams {
  messages: Array<{ role: string; content: string }>;
  locale?: string;
}

export class AevoProviderFactory {
  /**
   * Gera uma resposta agnóstica do Agente ÆVO utilizando a ordem de prioridade dos provedores:
   * Ordem configurável: Gemini, Groq, OpenAI e, por último, a base local determinística.
   */
  static async generateResponse(params: AevoGenerateParams) {
    const userMessage = params.messages[params.messages.length - 1]?.content || '';
    const lowerMsg = userMessage.toLowerCase();
    const locale = params.locale || 'pt-BR';
    const isEnglish = locale === 'en-US';
    const retrievedKnowledge = retrieveRelevantKnowledge(userMessage);

    for (const provider of this.getProviderOrder()) {
      try {
        if (provider === 'gemini') {
          const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
          if (!apiKey) continue;

          const { generateText } = await import('ai');
          const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
          const model = process.env.AEVO_GEMINI_MODEL || 'gemini-3.6-flash';
          const google = createGoogleGenerativeAI({ apiKey });
          const result = await generateText({
            model: google(model),
            system: this.buildSystemPrompt(locale, retrievedKnowledge),
            messages: params.messages as CoreMessage[],
            tools: AEVO_TOOLS,
            toolChoice: 'auto',
          });

          const toolCalls = this.collectToolCalls(result);
          return { text: result.text || this.toolConfirmation(toolCalls, locale), providerUsed: `${model} (Google)`, toolCalls };
        }

        if (provider === 'openai') {
          const apiKey = process.env.OPENAI_API_KEY;
          if (!apiKey) continue;

          const { generateText } = await import('ai');
          const { createOpenAI } = await import('@ai-sdk/openai');
          const model = process.env.AEVO_OPENAI_MODEL || 'gpt-4.1-mini';
          const openai = createOpenAI({ apiKey });
          const result = await generateText({
            model: openai(model),
            system: this.buildSystemPrompt(locale, retrievedKnowledge),
            messages: params.messages as CoreMessage[],
            tools: AEVO_TOOLS,
            toolChoice: 'auto',
          });

          const toolCalls = this.collectToolCalls(result);
          return { text: result.text || this.toolConfirmation(toolCalls, locale), providerUsed: `${model} (OpenAI)`, toolCalls };
        }

        if (provider === 'groq') {
          const apiKey = process.env.GROQ_API_KEY;
          if (!apiKey) continue;

          const { generateText } = await import('ai');
          const { createOpenAI } = await import('@ai-sdk/openai');
          const model = process.env.AEVO_GROQ_MODEL || 'openai/gpt-oss-120b';
          const groq = createOpenAI({
            apiKey,
            baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
          });
          const result = await generateText({
            model: groq(model),
            system: this.buildSystemPrompt(locale, retrievedKnowledge),
            messages: params.messages as CoreMessage[],
            tools: AEVO_TOOLS,
            toolChoice: 'auto',
          });

          const toolCalls = this.collectToolCalls(result);
          return { text: result.text || this.toolConfirmation(toolCalls, locale), providerUsed: `${model} (Groq)`, toolCalls };
        }
      } catch (error) {
        console.warn(`[ÆVO Factory] ${provider} falhou; tentando o próximo fallback.`, error);
      }
    }

    return {
      text: this.generateLocalFallback(lowerMsg, locale),
      providerUsed: isEnglish ? 'ÆVO Local Knowledge Fallback' : 'Base Local ÆVO',
      toolCalls: this.detectLocalClientActions(lowerMsg),
    };
  }

  static getProviderOrder(env: NodeJS.ProcessEnv = process.env): Array<'gemini' | 'openai' | 'groq'> {
    const allowed = new Set(['gemini', 'openai', 'groq']);
    const configured = (env.AEVO_PROVIDER_ORDER || 'gemini,groq')
      .split(',')
      .map((provider) => provider.trim().toLowerCase())
      .filter((provider) => allowed.has(provider));

    return [...new Set(configured)] as Array<'gemini' | 'openai' | 'groq'>;
  }

  private static toClientToolCalls(toolCalls: Array<{ toolName: string; args: unknown }>) {
    return toolCalls.map(({ toolName, args }) => ({ name: toolName, args }));
  }

  private static collectToolCalls(result: { toolCalls: Array<{ toolName: string; args: unknown }>; steps?: Array<{ toolCalls: Array<{ toolName: string; args: unknown }> }> }) {
    const calls = result.steps?.flatMap(step => step.toolCalls) ?? result.toolCalls;
    const unique = calls.filter((call, index) => calls.findIndex(candidate => candidate.toolName === call.toolName && JSON.stringify(candidate.args) === JSON.stringify(call.args)) === index);
    return this.toClientToolCalls(unique);
  }

  private static toolConfirmation(toolCalls: Array<{ name: string }>, locale: string) {
    if (toolCalls.length === 0) return locale === 'en-US' ? 'I could not complete that answer. Please try rephrasing your question.' : 'Não consegui concluir essa resposta. Tente reformular a pergunta.';
    return locale === 'en-US' ? 'Done — I completed the requested action on the portfolio.' : 'Pronto — concluí a ação solicitada no portfólio.';
  }

  private static buildSystemPrompt(locale: string, knowledge: string): string {
    const isEnglish = locale === 'en-US';

    if (isEnglish) {
      return `You are ÆVO, the official Notarial AI Assistant for Kauê Ruon Cardoso (Software Architect & AI Engineer based in Blumenau/SC, Brazil).
You speak on behalf of Kauê's portfolio.

Retrieved portfolio context (the only factual source for this answer):
${knowledge}

Response Guidelines:
- Respond natively in English with professional, concise, and high-craft legal-tech tone.
- Emphasize that Kauê builds software by guiding generative AI with zero-tolerance notarial rigor.
- Never invent facts. If the retrieved context does not answer the question, say so.
- Use native tools only when an interface action directly helps the request. Do not call a tool merely because its subject is mentioned.
- When the visitor explicitly asks to show, open, copy, fill, highlight, navigate or activate something, call the matching tool.
- After choosing a tool, also give a brief natural-language confirmation. Do not expose tool names or implementation details.`;
    }

    return `Você é o ÆVO, o Assistente de IA Notarial oficial do portfólio de Kauê Ruon Cardoso (Engenheiro de Software & Arquiteto de IA em Blumenau/SC).
Você responde em nome do portfólio do Kauê.

Contexto recuperado do portfólio (única fonte factual desta resposta):
${knowledge}

Diretrizes de resposta:
- Responda sempre em Português do Brasil com linguagem profissional e concisa.
- Destaque que Kauê constrói software guiando IA generativa com rigor e tolerância zero a erros (visão notarial).
- Nunca invente fatos. Se o contexto recuperado não responder à pergunta, informe isso.
- Use as ferramentas nativas somente quando uma ação de interface ajudar diretamente o pedido. Não chame ferramenta apenas porque o assunto foi citado.
- Quando o visitante pedir explicitamente para mostrar, abrir, copiar, preencher, destacar, navegar ou ativar algo, chame a ferramenta correspondente.
- Ao escolher uma ferramenta, também dê uma confirmação breve em linguagem natural. Não exponha nomes de ferramentas nem detalhes de implementação.`;
  }

  private static detectLocalClientActions(msg: string) {
    const tools = [];

    if (
      msg.includes('projeto') ||
      msg.includes('project') ||
      msg.includes('docfacil') ||
      msg.includes('ckf') ||
      msg.includes('foli')
    ) {
      if (msg.includes('docfacil')) tools.push({ name: 'highlight_project', args: { projectSlug: 'docfacil' } });
      if (msg.includes('ckf')) tools.push({ name: 'highlight_project', args: { projectSlug: 'ckf' } });
      if (msg.includes('foli')) tools.push({ name: 'highlight_project', args: { projectSlug: 'foli' } });
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'projetos' } });
    } else if (
      msg.includes('curriculo') ||
      msg.includes('resume') ||
      msg.includes('cv') ||
      msg.includes('download')
    ) {
      tools.push({ name: 'open_resume', args: {} });
    } else if (msg.includes('sobre') || msg.includes('about') || msg.includes('história') || msg.includes('gaya')) {
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'sobre' } });
    } else if (
      msg.includes('obmep') ||
      msg.includes('matematica') ||
      msg.includes('math') ||
      msg.includes('award') ||
      msg.includes('medalha')
    ) {
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'conquistas' } });
    } else if (msg.includes('preench') || msg.includes('fill') || msg.includes('petição') || msg.includes('petition')) {
      tools.push({ name: 'fill_petition_form', args: {} });
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'contato' } });
    } else if (msg.includes('contato') || msg.includes('contact') || msg.includes('email')) {
      if (msg.includes('cop') || msg.includes('copy')) {
        tools.push({ name: 'copy_contact_email', args: {} });
      } else {
        tools.push({ name: 'scroll_to_section', args: { sectionId: 'contato' } });
      }
    } else if (msg.includes('habilidade') || msg.includes('skill') || msg.includes('stack')) {
      tools.push({ name: 'filter_skills', args: {} });
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'skills' } });
    } else if (msg.includes('glitch') || msg.includes('efeito') || msg.includes('3d')) {
      tools.push({ name: 'trigger_glitch_mode', args: {} });
    } else if (msg.includes('konami') || msg.includes('cyberdeck') || msg.includes('breach')) {
      tools.push({ name: 'trigger_konami_protocol', args: {} });
    }

    return tools;
  }

  private static generateLocalFallback(msg: string, locale: string = 'pt-BR'): string {
    const isEnglish = locale === 'en-US';

    if (
      msg.includes('projeto') ||
      msg.includes('project') ||
      msg.includes('docfacil') ||
      msg.includes('foli') ||
      msg.includes('ckf')
    ) {
      if (isEnglish) {
        return (
          `**ÆVO Agent:** Kauê has built several high-impact featured projects:\n\n` +
          `- **DocFácil:** Provider-agnostic AI legal document generator (Next.js 15 / Prisma).\n` +
          `- **Foli:** Open-source TypeScript PDF layout engine with zero-overflow guarantee.\n` +
          `- **CKF Maintenance:** Production maintenance budget & reporting system (React / Supabase).\n` +
          `- **Atlas Notarial:** Vehicle deed automation engine in active notary production.\n\n` +
          `I scrolled the screen to the projects section for you to inspect!`
        );
      }
      return (
        `**ÆVO Agent:** Kauê desenvolveu diversos projetos de destaque guiando IA e engenharia de software:\n\n` +
        `- **DocFácil:** Gerador de documentos legais com IA generativa agnóstica (Next.js 15/Prisma).\n` +
        `- **Foli:** Engine open-source de geração de PDF em TypeScript com zero-overflow.\n` +
        `- **CKF Manutenção:** Sistema de orçamentos e relatórios em produção (React/Supabase).\n` +
        `- **Atlas Notarial:** Automação de procurações no Cartório Gaya integrando API do Detran.\n\n` +
        `Rolei a tela para a seção de projetos para você conferir!`
      );
    }

    if (msg.includes('curriculo') || msg.includes('resume') || msg.includes('cv') || msg.includes('download')) {
      if (isEnglish) {
        return `**ÆVO Agent:** You can download Kauê's official PDF resume by clicking the button in the hero section or using the direct download link on the site.`;
      }
      return `**ÆVO Agent:** Você pode baixar o currículo oficial em PDF do Kauê clicando no botão no topo ou usando o link direto disponibilizado no site.`;
    }

    if (msg.includes('obmep') || msg.includes('math') || msg.includes('matematica')) {
      if (isEnglish) {
        return `**ÆVO Agent:** Kauê has a solid logical foundation built through the IMPA Mathematics Olympiad (OBMEP), winning a Regional Silver Medal, National Bronze Medal, and two Honors.`;
      }
      return `**ÆVO Agent:** Kauê tem base sólida em raciocínio lógico forjada na OBMEP (IMPA), onde conquistou Medalha de Prata Regional, Bronze Nacional e duas Menções Honrosas.`;
    }

    if (isEnglish) {
      return (
        `**ÆVO Agent:** Hello! I am the official AI Assistant for Kauê Ruon Cardoso (Software Architect & AI Engineer based in Blumenau/SC, Brazil). ` +
        `He builds high-performance software by guiding generative AI with zero-tolerance notarial rigor. ` +
        `How can I assist you in exploring his work today?`
      );
    }

    return (
      `**ÆVO Agent:** Olá! Sou o assistente oficial de Kauê Ruon Cardoso (AI Engineer · Blumenau/SC). ` +
      `Ele constrói software guiando IA generativa com rigor técnico e mentalidade notarial de tolerância zero a erros. ` +
      `Como posso te ajudar a conhecer o trabalho dele hoje?`
    );
  }
}
