import { AevoToolDefinition } from '@/types/aevo';

export const AEVO_TOOLS: AevoToolDefinition[] = [
  {
    name: 'scroll_to_section',
    description: 'Navega e rola a página suavemente até uma seção específica do portfólio.',
    parameters: {
      type: 'object',
      properties: {
        sectionId: {
          type: 'string',
          description: 'Identificador da seção para rolar.',
          enum: ['hero', 'sobre', 'projetos', 'experiencia', 'obmep', 'contato'],
        },
      },
      required: ['sectionId'],
    },
  },
  {
    name: 'highlight_project',
    description: 'Aplica um destaque visual animado no card do projeto solicitado.',
    parameters: {
      type: 'object',
      properties: {
        projectSlug: {
          type: 'string',
          description: 'Nome simplificado do projeto.',
          enum: ['docfacil', 'ckf', 'foli', 'atlas'],
        },
      },
      required: ['projectSlug'],
    },
  },
  {
    name: 'open_resume',
    description: 'Abre ou dispara o download do currículo oficial em PDF do Kauê.',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'trigger_glitch_mode',
    description: 'Aciona um pulso de aberração cromática intensa na cena 3D WebGL.',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'trigger_konami_protocol',
    description: 'Abre o modal interativo Cyberdeck Breach Protocol (Konami Mode).',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
];
