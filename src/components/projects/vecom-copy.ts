import type { Locale } from '@/i18n/config';

export function vecomCopy(locale: Locale) {
  return locale === 'en-US' ? {
    kind: 'On-demand development', title: 'From intake to an organized service.',
    description: 'I built a clearer path between the person filling a form and the team taking care of it.', open: 'See the project', back: 'Back to projects', scroll: 'Scroll to explore',
    steps: ['Intake', 'Review', 'Follow-up'], challenge: 'A form should not disappear into a queue.',
    context: 'VECOM needed a calmer way to receive and follow requests. I proposed the idea, the company accepted it, and I developed the solution around the team’s real routine.',
    contextMore: 'The important part was making the journey visible: a public form for the requester, then a private workspace where the team can review, assign and move each request forward.',
    solution: 'One journey, two perspectives.', solutionText: 'The public side keeps the next step clear. The internal side gives the team a shared place to see what arrived and what still needs attention.',
    gallery: 'The system in its own context.', galleryText: 'Prepared interface captures use synthetic records. They show the visual language and the distinction between the public form and the team queue.',
    desktopCaption: 'Prepared internal view · synthetic records · queue and status overview.', mobileCaption: 'Prepared public view · synthetic record · a shorter path on mobile.', enlarge: 'Enlarge image', close: 'Close image', naming: 'Prepared interface · VECOM Ficha Fácil', mediaUnavailable: 'This prepared capture is unavailable right now.', openOriginal: 'Open capture',
    choices: [{ title: 'Start with the person', text: 'The public form explains what is needed without turning the first step into a technical obstacle.' }, { title: 'Give the team a shared view', text: 'The internal queue makes status and responsibility easier to understand at a glance.' }, { title: 'Make the next step visible', text: 'Clear states help the team see what is pending, what is being reviewed and what can move forward.' }],
    contribution: 'My contribution', contributionText: 'This was a service project developed on demand for VECOM. I proposed the direction, shaped the flow and built the experience around the company’s operation.', result: 'A more visible path through the work.', resultText: 'The project brings the request and the team closer together, with enough structure to make the next step easier to find.', visit: 'Open VECOM', presentation: 'See the story', invitation: 'The idea behind the interface', chapterNav: ['Context', 'Journey', 'Screens', 'Choices']
  } : {
    kind: 'Desenvolvimento sob demanda', title: 'Do cadastro à organização do atendimento.',
    description: 'Eu criei um caminho mais claro entre quem preenche uma ficha e a equipe que vai cuidar dela.', open: 'Conhecer o projeto', back: 'Voltar aos projetos', scroll: 'Role para explorar',
    steps: ['Cadastro', 'Conferência', 'Acompanhamento'], challenge: 'Uma ficha não deveria desaparecer numa fila.',
    context: 'A VECOM precisava de um jeito mais tranquilo de receber e acompanhar as solicitações. Eu apresentei a ideia, a empresa gostou e desenvolvi a solução pensando na rotina da equipe.',
    contextMore: 'A parte mais importante era deixar o caminho visível: um cadastro público para quem solicita e, depois, um espaço interno para a equipe conferir, organizar e dar andamento a cada ficha.',
    solution: 'Uma jornada, dois pontos de vista.', solutionText: 'O lado público deixa o próximo passo claro. O lado interno reúne o que chegou e ajuda a equipe a entender o que ainda precisa de atenção.',
    gallery: 'O sistema no seu próprio contexto.', galleryText: 'As capturas preparadas usam registros sintéticos. Elas mostram a linguagem visual e a diferença entre o cadastro público e a fila da equipe.',
    desktopCaption: 'Visão interna preparada · registros sintéticos · fila e estados do atendimento.', mobileCaption: 'Visão pública preparada · registro sintético · percurso mais curto no celular.', enlarge: 'Ampliar imagem', close: 'Fechar imagem', naming: 'Interface preparada · VECOM Ficha Fácil', mediaUnavailable: 'Esta captura preparada não está disponível agora.', openOriginal: 'Abrir captura',
    choices: [{ title: 'Começar por quem solicita', text: 'O cadastro público explica o que é necessário sem transformar o primeiro passo numa barreira técnica.' }, { title: 'Dar uma visão comum à equipe', text: 'A fila interna ajuda a enxergar estados e responsabilidades de relance.' }, { title: 'Deixar o próximo passo visível', text: 'Estados claros ajudam a equipe a perceber o que está pendente, em conferência ou pronto para avançar.' }],
    contribution: 'Minha contribuição', contributionText: 'Este foi um projeto sob demanda para a VECOM. Eu apresentei a direção, desenhei o fluxo e desenvolvi a experiência a partir da operação da empresa.', result: 'Um caminho mais visível para o trabalho.', resultText: 'O projeto aproxima o pedido da equipe e organiza o próximo passo com mais clareza.', visit: 'Abrir a VECOM', presentation: 'Ver a história', invitation: 'A ideia por trás da interface', chapterNav: ['Contexto', 'Jornada', 'Telas', 'Escolhas']
  };
}
