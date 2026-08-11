import { KAUE_PROFILE_KNOWLEDGE } from './rag-knowledge';

export interface AevoGenerateParams {
  messages: Array<{ role: string; content: string }>;
  locale?: string;
}

export class AevoProviderFactory {
  /**
   * Gera uma resposta agnóstica do Agente ÆVO utilizando a ordem de prioridade dos provedores:
   * Gemini 1.5 Flash -> OpenAI GPT-4o-mini -> Local Knowledge Fallback Engine Bilingue.
   */
  static async generateResponse(params: AevoGenerateParams) {
    const userMessage = params.messages[params.messages.length - 1]?.content || '';
    const lowerMsg = userMessage.toLowerCase();
    const locale = params.locale || 'pt-BR';
    const isEnglish = locale === 'en-US';

    // Tentar provedores via Vercel AI SDK se chaves de API estiverem presentes
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const { generateText } = await import('ai');
        const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
        const googleProvider = createGoogleGenerativeAI({ apiKey: geminiKey });

        const result = await generateText({
          model: googleProvider('gemini-1.5-flash'),
          system: this.buildSystemPrompt(locale),
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
          system: this.buildSystemPrompt(locale),
          messages: params.messages as any,
          temperature: 0.7,
        });

        return {
          text: result.text,
          providerUsed: 'GPT-4o-mini (OpenAI)',
          toolCalls: this.detectClientTools(lowerMsg),
        };
      } catch (err) {
        console.warn('[ÆVO Factory] OpenAI falhou, tentando fallback...', err);
      }
    }

    // Engine de Fallback Local Bilingue Resiliente (Zero dependência de APIs externas)
    return {
      text: this.generateLocalFallback(lowerMsg, locale),
      providerUsed: isEnglish ? 'ÆVO Local RAG Engine (Bilingual)' : 'Engine Local RAG ÆVO',
      toolCalls: this.detectClientTools(lowerMsg),
    };
  }

  private static buildSystemPrompt(locale: string = 'pt-BR'): string {
    const isEnglish = locale === 'en-US';

    if (isEnglish) {
      return `You are ÆVO, the official Notarial AI Assistant for Kauê Ruon Cardoso (Software Architect & AI Engineer based in Blumenau/SC, Brazil).
You speak on behalf of Kauê's portfolio.

Background Knowledge:
${KAUE_PROFILE_KNOWLEDGE}

Response Guidelines:
- Respond natively in English with professional, concise, and high-craft legal-tech tone.
- Emphasize that Kauê builds software by guiding generative AI with zero-tolerance notarial rigor.
- If asked about projects, experience, education, math awards (OBMEP), or contact details, provide clear answers.`;
    }

    return `Você é o ÆVO, o Assistente de IA Notarial oficial do portfólio de Kauê Ruon Cardoso (Engenheiro de Software & Arquiteto de IA em Blumenau/SC).
Você responde em nome do portfólio do Kauê.

Base de Conhecimento RAG:
${KAUE_PROFILE_KNOWLEDGE}

Diretrizes de resposta:
- Responda sempre em Português do Brasil com linguagem profissional e concisa.
- Destaque que Kauê constrói software guiando IA generativa com rigor e tolerância zero a erros (visão notarial).
- Se perguntado sobre ferramentas, projetos ou contato, ofereça informações claras.`;
  }

  private static detectClientTools(msg: string) {
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
    } else if (msg.includes('contato') || msg.includes('contact') || msg.includes('email')) {
      tools.push({ name: 'scroll_to_section', args: { sectionId: 'contato' } });
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
