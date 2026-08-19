import { tool } from 'ai';
import { z } from 'zod';

/**
 * Fonte única de verdade das ações de UI que o modelo pode solicitar.
 * Elas não possuem `execute`: o servidor valida e encaminha as chamadas ao browser.
 */
export const AEVO_TOOLS = {
  navigate_to_route: tool({
    description: 'Navega para uma rota ou página principal do portfólio (/servicos, /carreira, /projetos ou case específico).',
    parameters: z.object({
      route: z.enum(['home', 'services', 'career', 'projects', 'docfacil', 'ckf', 'atlas', 'foli']),
    }),
  }),
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
  spotlight_skill: tool({
    description: 'Coloca uma competência específica sob um spotlight cinematográfico e navega até ela.',
    parameters: z.object({ skill: z.string().min(1).max(60) }),
  }),
  open_social_profile: tool({
    description: 'Abre um perfil social oficial e verificado de Kauê.',
    parameters: z.object({ platform: z.enum(['linkedin', 'github']) }),
  }),
  open_project_destination: tool({
    description: 'Abre a demo ou repositório público verificado de um projeto.',
    parameters: z.object({ project: z.enum(['docfacil', 'ckf', 'foli']), destination: z.enum(['demo', 'repository']) }),
  }),
  explode_visual_core: tool({
    description: 'Explode e reconstrói automaticamente a forma central do fundo 3D. Use apenas quando o visitante pedir um efeito ou demonstração visual.',
    parameters: z.object({ intensity: z.enum(['controlled', 'maximum']).default('controlled') }),
  }),
  activate_gravity_well: tool({
    description: 'Ativa temporariamente um campo gravitacional visual que retorna ao normal sozinho.',
    parameters: z.object({}),
  }),
  activate_zero_gravity: tool({
    description: 'Faz clones decorativos das habilidades flutuarem e depois voltarem com segurança.',
    parameters: z.object({}),
  }),
  trigger_screen_breach: tool({
    description: 'Executa um breve override com glitch cinematográfico e restaura toda a interface.',
    parameters: z.object({}),
  }),
  authenticate_evidence: tool({
    description: 'Aplica um selo notarial temporário a uma seção ou projeto.',
    parameters: z.object({ target: z.enum(['projetos', 'skills', 'docfacil', 'atlas', 'ckf', 'foli']) }),
  }),
  run_visual_audit: tool({
    description: 'Dispara uma onda de autenticação visual pelo portfólio e retorna ao estado normal.',
    parameters: z.object({}),
  }),
  run_system_diagnostics: tool({
    description: 'Demonstra o estado do ÆVO, RAG, tool use e evidências com uma sequência visual curta.',
    parameters: z.object({}),
  }),
  demonstrate_rag: tool({
    description: 'Demonstra o RAG usando o próprio ÆVO e destaca essa competência no portfólio.',
    parameters: z.object({}),
  }),
  trace_skill_evidence: tool({
    description: 'Liga visualmente uma competência às evidências de projetos em que ela aparece.',
    parameters: z.object({ skill: z.string().min(1).max(60), projects: z.array(z.enum(['docfacil', 'atlas', 'ckf', 'foli'])).min(1).max(4) }),
  }),
  activate_medal_resonance: tool({
    description: 'Apresenta as conquistas da OBMEP com uma ressonância visual temporária.',
    parameters: z.object({}),
  }),
} as const;

export type AevoToolName = keyof typeof AEVO_TOOLS;
