export const KAUE_PROFILE_KNOWLEDGE = `
# PERFIL DE KAUÊ RUON CARDOSO — AI ENGINEER

## Resumo Profissional
Kauê Ruon Cardoso é AI Engineer e Cartorário radicado em Blumenau/SC. 
Seu lema de engenharia: "Construo software guiando IA generativa — de protótipos com LLM a back-end e front-end."
Não escreve código do zero linha por linha como um desenvolvedor tradicional; ele decompõe problemas complexos, estrutura instruções técnicas rígidas e guia LLMs até o fluxo inteiro rodar em produção com tolerância zero a erros.

## Trajetória & Experiência
1. **Cartório Gaya (2023 → Atual):** Cartorário no Departamento de Procurações, Inventários e documentos jurídicos em Blumenau/SC. Ambiente de tolerância zero a erros que moldou sua visão de processos e automação.
2. **K-HUB Soluções (Jul 2026 → Atual):** Founder & Builder do DocFácil.
3. **iPhoneria (Nov 2021 → Mar 2023):** Técnico em Manutenção Apple.

## Conquistas Acadêmicas & Raciocínio Lógico
* Medalha de Prata Regional e Bronze Nacional na OBMEP (Olimpíada Brasileira de Matemática das Escolas Públicas / IMPA), além de duas Menções Honrosas.

## Projetos em Destaque
1. **DocFácil — IA Generativa Aplicada a Documentos Legais:**
   - Stack: Next.js 16, TypeScript, Prisma, IA Generativa.
   - Destaque: Camada de IA agnóstica com interface AIProvider, streaming e tratamento tipado de erros.
   - Live Demo: https://docfacil-indol.vercel.app | Repo: https://github.com/khub-solucoes/docfacil

2. **CKF Manutenção — Sistema de Orçamentos:**
   - Stack: React, TypeScript, Supabase, TailwindCSS.
   - Sistema interno em produção com exportação PDF/XLSX e testes unitários.
   - Live Demo: https://ckf-manutencao-orcamentos.vercel.app | Repo: https://github.com/Kauerc10/ckf-manutencao-orcamentos

3. **Atlas Notarial — Automação de Procurações:**
   - Stack: Node.js, REST APIs, Automação Detran-RS.
   - Em produção no Cartório Gaya. Reduziu minutos de processo manual para poucos cliques.

4. **Foli — Engine de PDF em TypeScript:**
   - Stack: TypeScript, Layout Engine com garantia de zero-overflow e suporte Unicode pt-BR.
   - Repo: https://github.com/Kauerc10/foli

## Competências Técnicas
- **IA Generativa:** Integração de LLMs, arquitetura de providers agnósticos (OpenAI/Anthropic/Gemini/Groq), RAG, Prompt Engineering, Function Calling / Tool Use.
- **Desenvolvimento:** TypeScript, JavaScript, React, Next.js 16, Node.js, Supabase, Prisma, REST APIs, Tailwind CSS.
- **Outros:** Git, Vercel Deploy, Testes Unitários, Inglês Intermediário.

## Contato Direto
- Email: kaue.ruon@gmail.com
- LinkedIn: https://www.linkedin.com/in/kauerc/
- GitHub: https://github.com/Kauerc10
- Domínio Oficial: https://kaueruon.dev
`;

type KnowledgeChunk = {
  id: string;
  keywords: string[];
  content: string;
};

const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'perfil',
    keywords: ['kauê', 'kaue', 'perfil', 'sobre', 'about', 'engenheiro', 'engineer', 'blumenau', 'khub', 'k-hub'],
    content: 'Kauê Ruon Cardoso é Software Architect, AI Engineer e Founder da K-HUB Soluções, baseado em Blumenau/SC. Combina engenharia de IA generativa e arquitetura de software com rigor notarial de tolerância a erros.',
  },
  {
    id: 'experiencia',
    keywords: ['experiência', 'experiencia', 'experience', 'cartório', 'cartorio', 'gaya', 'iphoneria', 'trabalho', 'work'],
    content: 'Experiência: Cartório Gaya (2023–atual), no Departamento de Procurações, Inventários e documentos jurídicos; K-HUB Soluções, como Founder & Builder do DocFácil; iPhoneria (nov/2021–mar/2023), como Técnico em Manutenção Apple.',
  },
  {
    id: 'obmep',
    keywords: ['obmep', 'matemática', 'matematica', 'math', 'medalha', 'medal', 'prêmio', 'award', 'conquista'],
    content: 'Na OBMEP/IMPA, Kauê conquistou Medalha de Prata Regional, Medalha de Bronze Nacional e duas Menções Honrosas.',
  },
  {
    id: 'docfacil',
    keywords: ['docfácil', 'docfacil', 'documento', 'legal', 'prisma', 'generativa'],
    content: 'DocFácil: SaaS público de geração de documentos com IA generativa, construído com Next.js, TypeScript e Prisma. Possui camada de providers de IA, streaming e erros tipados. Demo: https://docfacil-indol.vercel.app. Repositório: https://github.com/Kauerc10/docfacil.',
  },
  {
    id: 'atlas',
    keywords: ['atlas', 'notarial', 'procuração', 'procuracao', 'detran', 'automação', 'automation'],
    content: 'Atlas Notarial: automação interna e privada integrada à API do Detran-RS, em uso no Cartório Gaya. Reduziu um processo de aproximadamente cinco minutos para cerca de vinte segundos.',
  },
  {
    id: 'ckf',
    keywords: ['ckf', 'manutenção', 'manutencao', 'orçamento', 'orcamento', 'supabase', 'xlsx'],
    content: 'CKF Manutenção: sistema corporativo público de orçamentos e relatórios, com React, TypeScript, Supabase, testes Vitest e exportação XLSX. Demo: https://ckf-manutencao-orcamentos.vercel.app. Repositório: https://github.com/Kauerc10/ckf-manutencao-orcamentos.',
  },
  {
    id: 'foli',
    keywords: ['foli', 'pdf', 'overflow', 'unicode', 'layout'],
    content: 'Foli Lib: engine TypeScript open source para composição de PDFs, com controle de overflow e suporte a Unicode pt-BR. Repositório: https://github.com/Kauerc10/foli.',
  },
  {
    id: 'skills',
    keywords: ['habilidade', 'habilidades', 'skill', 'skills', 'stack', 'tecnologia', 'tool', 'ferramenta', 'rag'],
    content: 'Competências: integração de LLMs, providers agnósticos, RAG, prompt engineering, function calling/tool use, TypeScript, JavaScript, React, Next.js, Node.js, Supabase, Prisma, APIs REST, Tailwind CSS, Git, Vercel e testes unitários.',
  },
  {
    id: 'contato',
    keywords: ['contato', 'contact', 'email', 'e-mail', 'linkedin', 'github', 'currículo', 'curriculo', 'resume', 'cv'],
    content: 'Contato: kaue.ruon@gmail.com; LinkedIn: https://www.linkedin.com/in/kauerc/; GitHub: https://github.com/Kauerc10; site: https://kaueruon.dev. O currículo oficial está disponível em /curriculo_kaue.pdf.',
  },
];

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/** Recuperação lexical pequena e determinística para não enviar todo o perfil a cada turno. */
export function retrieveRelevantKnowledge(query: string, limit = 4): string {
  const normalizedQuery = normalize(query);
  const queryTokens = new Set(normalizedQuery.split(/[^a-z0-9]+/).filter(token => token.length > 2));

  const ranked = KNOWLEDGE_CHUNKS.map(chunk => {
    const searchable = normalize(`${chunk.id} ${chunk.keywords.join(' ')} ${chunk.content}`);
    const score = [...queryTokens].reduce((total, token) => total + (searchable.includes(token) ? 1 : 0), 0)
      + chunk.keywords.reduce((total, keyword) => total + (normalizedQuery.includes(normalize(keyword)) ? 3 : 0), 0);
    return { ...chunk, score };
  }).sort((a, b) => b.score - a.score);

  const selected = ranked.filter(chunk => chunk.score > 0).slice(0, limit);
  const chunks = selected.length > 0 ? selected : KNOWLEDGE_CHUNKS.filter(chunk => ['perfil', 'skills', 'contato'].includes(chunk.id));

  return chunks.map(chunk => `[fonte:${chunk.id}] ${chunk.content}`).join('\n');
}
