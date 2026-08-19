import type { ProjectMetric } from './data';

export interface LocalizedProjectContent {
  title: string;
  shortTitle: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  status: string;
  client?: string;
  capabilities: string[];
  metrics: ProjectMetric[];
  links: {
    label: string;
    key: string;
  }[];
}

export const PROJECTS_PT_BR: Record<string, LocalizedProjectContent> = {
  docfacil: {
    title: 'DocFácil — Automação Notarial com IA Generativa',
    shortTitle: 'DocFácil',
    summary: 'Plataforma web avançada para cartórios que reduz em até 70% o tempo de elaboração de minutas notariais com IA agnóstica e validação jurídica rigorosa.',
    problem: 'Minutas de procurações e escrituras notariais exigem conferência manual exaustiva, gerando gargalos operacionais e risco de erro material sob alta demanda.',
    solution: 'Gerador inteligente de minutas com arquitetura agnóstica de LLMs, validação de regras de negócio em tempo real e geração de documentos padronizados com tolerância zero a erros.',
    role: 'Arquiteto de Software & Engenheiro Full-Stack',
    status: 'SaaS em Produção · Live Demo',
    capabilities: [
      'Geração de Minutas Notariais',
      'Arquitetura Multi-LLM Agnóstica',
      'Validação de Regras Notariais em Tempo Real',
      'Exportação e Auditoria de Documentos',
    ],
    metrics: [
      { label: 'Redução de Tempo', value: '70%', source: 'Ambiente de testes notariais' },
      { label: 'Precisão Estrutural', value: '100%', source: 'Validação de schema' },
    ],
    links: [
      { key: 'demo', label: 'Live Demo' },
      { key: 'repo', label: 'Repositório GitHub' },
    ],
  },
  'ckf-manutencao': {
    title: 'CKF Manutenção — Sistema Operacional de Orçamentos e Relatórios',
    shortTitle: 'CKF Manutenção',
    summary: 'Aplicação web responsiva para controle operacional de chamados, geração automatizada de orçamentos e relatórios técnicos em produção.',
    problem: 'A gestão de orçamentos e ordens de serviço dependia de planilhas manuais e comunicações dispersas, dificultando o acompanhamento de prazos e o histórico de manutenções.',
    solution: 'Sistema integrado com autenticação segura, cálculo automático de custos operacionais, geração instantânea de propostas em PDF e histórico unificado por cliente.',
    role: 'Desenvolvedor Full-Stack & Designer de Interface',
    status: 'Em Produção para Cliente',
    client: 'CKF Manutenção Industrial',
    capabilities: [
      'Gestão de Ordens de Serviço',
      'Geração Automatizada de Orçamentos',
      'Exportação de Relatórios Técnicos',
      'Painel de Controle em Tempo Real',
    ],
    metrics: [
      { label: 'Agilidade em Propostas', value: '3x mais rápido', source: 'Fluxo operacional do cliente' },
      { label: 'Disponibilidade', value: '99.9%', source: 'Supabase / Vercel' },
    ],
    links: [
      { key: 'demo', label: 'Sistema em Produção' },
      { key: 'repo', label: 'Repositório de Código' },
    ],
  },
  'atlas-notarial': {
    title: 'Atlas Notarial — Automação de Procurações e Integração DETRAN',
    shortTitle: 'Atlas Notarial',
    summary: 'Motor de automação notarial em produção no Cartório Gaya para extração, validação de dados veiculares e geração em lote de atos notariais.',
    problem: 'A consulta individual de dados veiculares e o preenchimento manual de procurações de veículos consumiam minutos preciosos por atendimento no balcão cartorário.',
    solution: 'Engine de integração que consulta bases de dados de veículos, sanitiza informações e preenche minutas notariais em milissegundos com validação estrita.',
    role: 'Engenheiro de Automação & Cartorário',
    status: 'Em Produção no Cartório Gaya',
    client: 'Cartório Gaya (Blumenau/SC)',
    capabilities: [
      'Integração com APIs de Veículos',
      'Preenchimento em Lote de Atos Notariais',
      'Sanitização e Validação Jurídica',
      'Operação com Tolerância Zero a Erros',
    ],
    metrics: [
      { label: 'Tempo de Elaboração', value: '< 1 segundo', source: 'Média de execução em produção' },
      { label: 'Uso Diário', value: '100% ativo', source: 'Rotina do Cartório Gaya' },
    ],
    links: [],
  },
  foli: {
    title: 'Foli Lib — Layout Engine em TypeScript & Shaders WebGL',
    shortTitle: 'Foli',
    summary: 'Biblioteca open-source de layout engine e shaders WebGL acelerados por GPU para proporcionar experiências visuais 3D fluidas com baixo consumo de memória.',
    problem: 'Bibliotecas visuais tradicionais costumam introduzir overhead excessivo de bundle ou dependências complexas para renderizar efeitos gráficos interativos na web.',
    solution: 'Engine minimalista em TypeScript com foco em precisão matemática, renderização a 60 FPS e componentes gráficos modulares.',
    role: 'Criador & Mantenedor Open Source',
    status: 'Biblioteca Open Source',
    capabilities: [
      'Layout Engine Modular',
      'Shaders GLSL Customizados',
      'Zero Dependências Pesadas',
      'Aceleração por GPU a 60 FPS',
    ],
    metrics: [
      { label: 'Taxa de Quadros', value: '60 FPS', source: 'Benchmarks WebGL' },
      { label: 'Bundle Size', value: '< 15 kB', source: 'Gzip' },
    ],
    links: [
      { key: 'repo', label: 'Repositório GitHub' },
    ],
  },
};
