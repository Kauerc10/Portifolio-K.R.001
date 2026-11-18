export const KAUE_PROFILE_KNOWLEDGE = `
# KAUÊ RUON CARDOSO — DESENVOLVIMENTO DE SOFTWARE | IA APLICADA | AUTOMAÇÃO

Kauê atua em Blumenau/SC, com experiência no Cartório Gaya e em manutenção Apple na iPhoneria. RUON é sua marca própria para projetos de desenvolvimento.
Constrói software a partir de especificações, com apoio de agentes de IA, revisão do código gerado e testes. Mantém responsabilidade pelas decisões técnicas e validação das entregas. Usar IA para construir um produto não significa que esse produto contenha modelos ou funcionalidades de IA.

VioDigital é uma solução própria compartilhada para conferência de documentos no navegador. Atlas Notarial nasceu no cartório com o Formatador de Veículos integrado à API do Detran e evoluiu para produto próprio com ferramentas de rotina. DocFácil apresenta criação guiada de documentos, revisão e PDF. VECOM Ficha Fácil foi desenvolvido sob demanda para uma empresa de Blumenau. CKF reúne site institucional e sistema interno de orçamentos para uma empresa de Itajaí.

Cursa Análise e Desenvolvimento de Sistemas e possui Scrum Fundamentals Certified (SFC). Tem prata regional, bronze nacional e menções honrosas na OBMEP.

Este assistente seleciona trechos locais por palavras-chave para compor contexto. Esse mecanismo não demonstra embeddings ou banco vetorial. O widget público está pausado. Não prometer precisão jurídica ou ausência de erros.
Contato: kaue@ruon.dev · https://www.kaueruon.dev · https://github.com/Kauerc10 · https://www.linkedin.com/in/kauerc/
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
    content: 'Kauê Ruon Cardoso atua com desenvolvimento de software, IA aplicada e automação em Blumenau/SC. Trabalha a partir de especificações, com agentes de IA, revisão de código e testes, mantendo responsabilidade pelas decisões técnicas. RUON é sua marca própria.',
  },
  {
    id: 'experiencia',
    keywords: ['experiência', 'experiencia', 'experience', 'cartório', 'cartorio', 'gaya', 'iphoneria', 'trabalho', 'work'],
    content: 'Experiência: Cartório Gaya (2023–atual), com procurações, atendimento e organização de demandas; RUON como marca própria para projetos; iPhoneria (nov/2021–mar/2023), como Técnico em Manutenção Apple.',
  },
  {
    id: 'obmep',
    keywords: ['obmep', 'matemática', 'matematica', 'math', 'medalha', 'medal', 'prêmio', 'award', 'conquista'],
    content: 'Na OBMEP/IMPA, Kauê conquistou Medalha de Prata Regional, Medalha de Bronze Nacional e duas Menções Honrosas.',
  },
  {
    id: 'docfacil',
    keywords: ['docfácil', 'docfacil', 'documento', 'legal', 'prisma', 'generativa'],
    content: 'DocFácil: produto próprio da RUON com criação guiada de documentos por perguntas, revisão e saída em PDF. O case usa materiais de demonstração e não executa a geração real no portfólio. Site: https://docfacil-indol.vercel.app.',
  },
  {
    id: 'atlas',
    keywords: ['atlas', 'notarial', 'procuração', 'procuracao', 'detran', 'automação', 'automation'],
    content: 'Atlas Notarial: produto próprio que nasceu no Cartório Gaya. O Formatador de Veículos consulta a API do Detran e prepara dados para procurações. A redução relatada de aproximadamente cinco minutos para cerca de vinte segundos refere-se a essa etapa, não ao atendimento completo. Evoluiu com declarações, promissórias e chat; a revisão humana permanece necessária.',
  },
  {
    id: 'ckf',
    keywords: ['ckf', 'manutenção', 'manutencao', 'orçamento', 'orcamento', 'supabase', 'xlsx'],
    content: 'CKF MANUTENCAO LTDA, de Itajaí: site institucional público e sistema interno de orçamentos desenvolvidos sob demanda. O case usa interface real e dados fictícios; o sistema pode exigir autenticação. Site: https://ckf-home.vercel.app/.',
  },
  {
    id: 'foli',
    keywords: ['foli', 'pdf', 'overflow', 'unicode', 'layout'],
    content: 'Foli Lib: engine TypeScript open source para composição de PDFs, com controle de overflow e suporte a Unicode pt-BR. Repositório: https://github.com/Kauerc10/foli.',
  },
  {
    id: 'skills',
    keywords: ['habilidade', 'habilidades', 'skill', 'skills', 'stack', 'tecnologia', 'tool', 'ferramenta', 'rag'],
    content: 'Competências: integração de LLMs, providers agnósticos, seleção lexical de contexto local no assistente, prompt engineering, function calling/tool use, TypeScript, JavaScript, React, Next.js, Node.js, Supabase, Prisma, APIs REST, Tailwind CSS, Git, Vercel e testes unitários.',
  },
  {
    id: 'contato',
    keywords: ['contato', 'contact', 'email', 'e-mail', 'linkedin', 'github', 'currículo', 'curriculo', 'resume', 'cv'],
    content: 'Contato: kaue@ruon.dev; LinkedIn: https://www.linkedin.com/in/kauerc/; GitHub: https://github.com/Kauerc10; site: https://kaueruon.dev. O currículo oficial está disponível em /curriculo_kaue.pdf.',
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
