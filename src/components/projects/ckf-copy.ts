import type { Locale } from '@/i18n/config';

const pt = {
  kind: 'Desenvolvimento sob demanda',
  title: 'Presença digital e operação conectadas.',
  description: 'A CKF precisava se apresentar melhor e organizar uma rotina que já acontecia todos os dias. Eu tratei as duas frentes com linguagens próprias: um site para explicar a empresa e um sistema para dar forma aos orçamentos.',
  open: 'Conhecer o projeto', back: 'Voltar aos projetos', visit: 'Abrir o site da CKF', presentation: 'Ver a história', steps: ['Site', 'Sistema', 'Duas frentes'],
  chapters: ['Site institucional', 'Sistema de orçamentos', 'Duas frentes'],
  siteTitle: 'Uma presença que explica o trabalho.',
  siteText: 'O site organiza serviços, estrutura, forma de trabalho e canais de contato para que a CKF seja compreendida antes do primeiro pedido de orçamento.',
  siteMore: 'A contribuição foi estruturar a presença digital e traduzir a operação industrial em uma comunicação direta, com a linguagem carvão e amarelo da marca.',
  systemTitle: 'A rotina operacional ganha forma.',
  systemText: 'O sistema interno reúne itens, clientes e orçamentos em um fluxo próprio para a equipe da CKF, com documento em PDF como saída demonstrativa.',
  systemMore: 'Aqui a história é outra: a equipe precisava organizar os orçamentos com mais clareza. A apresentação mantém essa frente separada do site institucional, porque cada uma atende a uma necessidade diferente da CKF.',
  closing: 'Duas entregas para o mesmo cliente.',
  closingText: 'Uma frente apresenta a empresa para o mundo. A outra ajuda a equipe a organizar o trabalho do dia a dia. Ambas nasceram de uma necessidade real da CKF.',
  contribution: 'Minha contribuição', contributionText: 'Eu ofereci o serviço, a CKF gostou da proposta e elaborei as duas entregas sob medida, cuidando da estrutura, da experiência e da forma como cada frente seria apresentada.',
  gallery: 'Interfaces das duas frentes.', galleryText: 'As imagens identificam qual entrega está sendo mostrada. As capturas são referências públicas e materiais preparados para apresentar o trabalho; o sistema interno não é operado por esta página.',
  siteDesktopCaption: 'Site institucional CKF · desktop · presença pública, serviços e contato.',
  siteMobileCaption: 'Site institucional CKF · mobile · navegação e frentes de serviço.',
  systemCaption: 'Sistema de orçamentos CKF · prévia conceitual com registros fictícios.',
  enlarge: 'Ampliar imagem', close: 'Fechar imagem', naming: 'CKF Manutenção · case de desenvolvimento sob demanda', openOriginal: 'Abrir imagem', mediaUnavailable: 'Esta imagem não carregou agora.',
  result: 'Cada frente resolve uma parte da rotina.', resultText: 'O site dá clareza para quem chega. O sistema dá organização para quem trabalha. A apresentação mantém as duas entregas distintas, com a mesma história de origem.',
};

const en: typeof pt = {
  kind: 'On-demand development', title: 'Digital presence and connected operations.',
  description: 'CKF needed a clearer presence and a better-organized daily routine. I treated the two fronts with their own language: a site to explain the company and a system to shape quotes.',
  open: 'See the project', back: 'Back to projects', visit: 'Open CKF website', presentation: 'See the story', steps: ['Website', 'System', 'Two fronts'],
  chapters: ['Institutional website', 'Quotes system', 'Two fronts'], siteTitle: 'A presence that explains the work.',
  siteText: 'The website organizes services, structure, way of working and contact channels so CKF can be understood before the first quote request.',
  siteMore: 'My contribution was to structure the digital presence and translate the industrial operation into direct communication, using the brand’s charcoal and yellow language.',
  systemTitle: 'The operational routine takes shape.', systemText: 'The internal system brings items, clients and quotes into a flow for the CKF team, with a PDF document as the illustrated output.',
  systemMore: 'This is a different story: the team needed clearer organization for quotes. The presentation keeps this front separate from the institutional website because each one responds to a different CKF need.',
  closing: 'Two deliveries for the same client.', closingText: 'One front presents the company to the world. The other helps the team organize daily work. Both came from a real CKF need.',
  contribution: 'My contribution', contributionText: 'I offered the service, CKF liked the proposal and I shaped both deliveries, caring for their structure, experience and presentation.',
  gallery: 'Interfaces from both fronts.', galleryText: 'Each image identifies the delivery being shown. The captures are public references and prepared presentation material; this page does not operate the internal system.',
  siteDesktopCaption: 'CKF institutional website · desktop · public presence, services and contact.', siteMobileCaption: 'CKF institutional website · mobile · navigation and service fronts.', systemCaption: 'CKF quotes system · conceptual preview with fictional records.', enlarge: 'Enlarge image', close: 'Close image', naming: 'CKF Maintenance · on-demand development case', openOriginal: 'Open image', mediaUnavailable: 'This image did not load.', result: 'Each front solves part of the routine.', resultText: 'The site brings clarity to visitors. The system brings organization to the team. The presentation keeps both deliveries distinct, with the same origin story.',
};
export function ckfCopy(locale: Locale) { return locale === 'en-US' ? en : pt; }
