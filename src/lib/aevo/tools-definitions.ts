import { tool } from 'ai';
import { z } from 'zod';

/**
 * Fonte única de verdade das ações de UI que o modelo pode solicitar.
 * Elas não possuem `execute`: o servidor valida e encaminha as chamadas ao browser.
 */
export const AEVO_TOOLS = {
  scroll_to_section: tool({
    description: 'Navega até uma seção específica do portfólio.',
    parameters: z.object({
      sectionId: z.enum(['hero', 'sobre', 'projetos', 'experiencia', 'skills', 'conquistas', 'formacao', 'contato']),
    }),
  }),
  highlight_project: tool({
    description: 'Destaca visualmente o card de um projeto e o apresenta ao visitante.',
    parameters: z.object({ projectSlug: z.enum(['docfacil', 'ckf', 'foli', 'atlas']) }),
  }),
  open_resume: tool({
    description: 'Abre o currículo oficial em PDF em uma nova aba.',
    parameters: z.object({}),
  }),
  copy_contact_email: tool({
    description: 'Copia o endereço de e-mail profissional para a área de transferência.',
    parameters: z.object({}),
  }),
  fill_petition_form: tool({
    description: 'Preenche o assunto do formulário de contato para iniciar uma proposta.',
    parameters: z.object({ assunto: z.string().max(120).optional() }),
  }),
  filter_skills: tool({
    description: 'Destaca as habilidades técnicas no painel do portfólio.',
    parameters: z.object({}),
  }),
  trigger_glitch_mode: tool({
    description: 'Aciona um pulso visual de glitch na cena 3D.',
    parameters: z.object({}),
  }),
  trigger_konami_protocol: tool({
    description: 'Abre a experiência interativa Cyberdeck Breach Protocol.',
    parameters: z.object({}),
  }),
} as const;

export type AevoToolName = keyof typeof AEVO_TOOLS;
