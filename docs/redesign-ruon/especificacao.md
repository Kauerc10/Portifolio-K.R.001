# Especificação · Introdução, seções e microinterações do portfólio

## Problem Statement

A home atual já expressa a identidade do portfólio com tipografia forte e uma paisagem de portais violetas. As seções abaixo dela precisam apresentar trabalhos, experiência e formação com a mesma linguagem. A entrada deve ter personalidade e levar o visitante até a home em um movimento contínuo. A formação hoje tem posições fixas para cada cartão, o que exige mexer na interface para acrescentar cursos.

## Solution

Usar a seleção visual aprovada como direção das seções, incluindo a opção C para Formação. Apresentar a saudação sobre branco e, após o acionamento de um botão discreto, deslocar o texto para a grade da home enquanto a paisagem atual aparece. Organizar cursos em uma lista que cresça com os dados e aplicar microinterações que indiquem seleção, navegação e retorno das ações.

## User Stories

1. Como visitante de primeira vez, quero ler a saudação sobre fundo branco, para conhecer a identidade do portfólio.
2. Como visitante, quero ver a apresentação entrar depois da saudação, para ler as duas frases com calma.
3. Como visitante, quero escolher quando continuar, para avançar no meu ritmo.
4. Como visitante, quero acompanhar a saudação enquanto ela se encaixa no hero, para perceber continuidade na entrada.
5. Como visitante recorrente, quero abrir a home diretamente depois de completar a abertura na sessão, para retomar a navegação.
6. Como visitante com movimento reduzido, quero ir direto ao conteúdo, para navegar sem a sequência animada.
7. Como visitante com um link de seção ou projeto, quero chegar ao destino, para abrir o conteúdo compartilhado.
8. Como visitante em celular, quero ler a abertura e usar os destinos da home, para navegar sem colisões ou rolagem horizontal.
9. Como visitante que usa teclado, quero acionar a abertura, ver o foco e retomar a navegação no hero, para usar a página inteira.
10. Como visitante com script indisponível, quero acessar conteúdo e links renderizados, para consultar o portfólio.
11. Como recrutador, quero consultar projetos, currículo e trajetória rapidamente, para avaliar o trabalho de Kauê.
12. Como cliente, quero alternar entre projetos e reconhecer o item ativo, para comparar trabalhos relevantes.
13. Como cliente, quero entender problema, contribuição e solução, para avaliar a experiência a partir de evidências.
14. Como visitante, quero conhecer Desenvolvimento, Automações e Suporte em Sobre, para entender a atuação de Kauê.
15. Como recrutador, quero ler a experiência em ordem clara, para distinguir funções e contribuições.
16. Como recrutador, quero relacionar competências a aplicações reais, para verificar seu contexto.
17. Como visitante, quero distinguir ensino superior, cursos complementares e educação básica, para entender a formação.
18. Como visitante, quero ver instituição, carga horária e ano quando disponíveis, para interpretar cada curso.
19. Como mantenedor, quero acrescentar cursos e instituições pelos dados, para ampliar a seção sem criar componentes por item.
20. Como visitante, quero consultar todos os cursos mesmo quando a lista crescer, para encontrar uma formação específica.
21. Como visitante, quero acessar certificados reais de medalhas e menções, para verificar as conquistas.
22. Como visitante, quero escolher formulário ou canal direto, para entrar em contato da forma mais prática.
23. Como visitante, quero distinguir envio, sucesso e erro, para saber se minha mensagem foi recebida e poder tentar novamente.
24. Como visitante, quero retornar ao topo pelo rodapé, para reencontrar a navegação sem repetir a abertura.
25. Como visitante, quero trocar idioma e tema com a estrutura preservada, para ler na configuração que prefiro.

## Implementation Decisions

### Abertura e hero

- Sequência proposta: saudação em dois tempos, apresentação, espera pelo botão **Continuar**, encaixe e home. Usar um único título acessível. A palavra “você” começa em violeta. Animar os grupos de palavras com máscaras e deslocamento curto. Após o clique, o título reduz de escala e se alinha ao hero enquanto a apresentação acompanha o movimento para o bloco de apoio. Revelar a paisagem existente durante o encaixe. Validar a copy final para evitar repetição.
- Medir origem e destino no layout real em cada largura. O movimento principal depende de transformações e opacidade sempre que possível. Preparar o destino antes do clique para reduzir saltos, sem atrelar o acesso à home ao carregamento da arte. Clique repetido, redimensionamento ou interrupção devem terminar em estado utilizável.
- Botão real acionável por clique, toque e teclado. Ao concluir, transferir o foco de forma previsível para o início do conteúdo e liberar a navegação. A abertura aparece na primeira visita da sessão e deixa de reaparecer após a conclusão. Âncoras, movimento reduzido e ausência de JavaScript abrem diretamente o conteúdo. Preservar destinos, navegação, currículo, arte e composição da home atual.

### Seções e Formação

- Depois do hero, apresentar Projetos, Sobre, Experiência, Competências, Formação, Conquistas, Contato e Rodapé. Preservar âncoras existentes, IDs dos projetos, currículo, idioma e tema. Usar a seleção de imagens como referência de composição, com texto e controles reais.
- Projetos usa índice lateral e painel de detalhe, com Atlas como estado inicial quando não houver destino direto. Preservar links profundos dos projetos. Sobre combina a apresentação em duas colunas e a faixa das três áreas. Experiência organiza Cartório Gaya e iPhoneria em linha de trajetória. Competências agrupa ferramentas por aplicação verificável.
- Formação segue a opção C. Título lateral em desktop, seguido por três grupos ligados pelo filete violeta: Ensino superior, Cursos complementares e Educação básica. O filete indica categorias. Em celular, o título vem antes dos grupos e os metadados podem quebrar abaixo do curso.
- Substituir os cartões por posição fixa por dados tipados com identificador estável, grupo, título e metadados opcionais de instituição, situação, carga horária, ano e comprovante. Separar valores compartilhados dos textos localizados. Agrupar cursos por instituição quando identificada e manter ordenação editorial estável. Campos ausentes não geram separadores vazios, status presumidos ou links sem destino.
- Começar com os quatro cursos já conhecidos. Proposta de escalabilidade: ao ultrapassar seis cursos, mostrar seis no resumo e oferecer “Ver todos os cursos (N)”. A expansão preserva ordem e instituições. Manter o foco no controle e disponibilizar a lista completa sem JavaScript. Confirmar a situação de ADS e os dados dos novos cursos antes de publicá-los.
- Conquistas dá destaque a prata regional e bronze nacional e mantém menções honrosas numa faixa própria. Preparar ilustrações separadas durante a implementação e ligar os itens aos certificados reais. Criar ou reutilizar ícones de projetos, competências e contato. Manter textura mineral e fita como elementos pontuais.
- Contato mantém formulário e canais diretos, com validação, envio e recuperação. Rodapé contém assinatura, links e volta ao topo. Pausar a apresentação pública do ÆVO e seus efeitos globais. Verificar consumidores antes de alterar a API do agente.

### Direção visual das 11 referências selecionadas

**Etapa obrigatória antes de codar.** Abrir e inspecionar visualmente os 11 PNGs da pasta `docs/redesign-ruon/imagens-selecionadas/`, usando uma ferramenta de visualização de imagens. As descrições abaixo servem como índice. Para a abertura, comparar os dois quadros com a home atual. Para cada seção, conferir a composição, a hierarquia tipográfica, a paleta, os detalhes e os assets na imagem correspondente. Se algum PNG estiver indisponível, solicitar acesso ao arquivo antes de implementar a seção que depende dele.

A home existente é a referência de proporção e identidade. Usar Instrument Sans, texto escuro, títulos de peso alto, violeta como acento principal e fundo mineral claro. Filetes, textura e fita conectam alguns blocos. Reservar verde-sálvia, bronze e azul frio para detalhes pontuais. A leitura vem primeiro, com espaçamento, contraste e hierarquia consistentes. As imagens servem de referência para compor cada seção com conteúdo real.

| Referência | Composição a implementar | Aceite visual e funcional |
|---|---|---|
| 01 · Introdução em branco | Saudação em duas linhas centralizadas. “Você” em violeta. Apresentação menor abaixo e botão discreto depois da entrada do texto. | O branco ocupa toda a tela inicial. O texto surge em grupos de palavras, permanece legível e aguarda o clique. |
| 02 · Encaixe no hero | A saudação se desloca até o alinhamento esquerdo da home. A apresentação segue para o bloco de apoio. A paisagem e as ações aparecem durante o encaixe. | A posição final corresponde à grade real. O título continua reconhecível durante o percurso. A paisagem original e os destinos continuam disponíveis. |
| 03 · Projetos | Título “Projetos selecionados” à esquerda e descrição separada por filete. Índice com Atlas Notarial, CKF Manutenção, DocFácil e Foli. Painel de Atlas com Consulta → Dados do veículo → Procuração e realce verde no resultado. | Selecionar pelo índice atualiza nome, contexto, contribuição e evidências. Em celular, o índice antecede o painel. Links diretos abrem o projeto correto. |
| 04 · Sobre, apresentação | Frase em grande escala à esquerda. Nome e apresentação pessoal à direita, separados por filete com toque quente. | A apresentação aparece uma vez e continua legível sem elementos decorativos. |
| 05 · Sobre, três áreas | Desenvolvimento, Automações e Suporte em três colunas abaixo da apresentação. Fita violeta como possível separador, com verde discreto em Suporte. | Em celular, as três áreas empilham em ordem de leitura. Os textos explicam o trabalho sem repetir o cabeçalho. |
| 06 · Experiência | Introdução à esquerda e linha de trajetória à direita. Cartório Gaya e iPhoneria são os marcos, com empresa, função e contribuição. Um nó pode ter bronze suave. | A linha acompanha a altura do conteúdo e permanece decorativa. Conferir períodos, títulos e contribuições. |
| 07 · Competências | Título “Como eu construo” e acesso ao currículo à esquerda. Desenvolvimento, Automação e IA aplicada em linhas à direita, com descrições e tecnologias. | Cada grupo apresenta ferramentas em contexto e aponta para evidências quando houver. Nome e ícone acompanham cada tecnologia selecionada. |
| 08 · Conquistas | Prata regional e bronze nacional em dois destaques com ilustrações independentes. Menções honrosas em faixa própria com louros. | Cada reconhecimento oferece o comprovante real quando disponível. As ilustrações têm função decorativa e a seção empilha em celular. |
| 09 · Contato | “Vamos conversar?” e canais diretos à esquerda. Formulário com Nome, E-mail, Assunto e Mensagem à direita. | Os canais precedem o formulário em celular. Foco, erro, envio e confirmação são distinguíveis. |
| 10 · Rodapé | Assinatura kauêruon, links de E-mail, LinkedIn e GitHub e botão “Voltar ao topo”. Filete azul frio opcional. | Links têm nomes acessíveis, funcionam com teclado e acomodam quebra de linha. Voltar ao topo reposiciona o foco e não reinicia a abertura. |
| 11 · Formação, opção C | Título lateral e trilha violeta de três grupos. ADS ganha destaque, os cursos ficam agrupados por instituição e o ensino médio encerra a trilha. | A trilha aceita novas instituições e cursos. Linhas preservam título e metadados em telas estreitas. |

### Conteúdo, evidências e assets

- Na abertura, partir de “Olá, que bom ter você por aqui.” e “Eu sou o Kauê. Aqui está um pouco do que eu construo.” Manter a saudação como título acessível ao longo da transição. Conferir a composição da frase de apoio com a copy atual da home.
- Projetos mostram problema, papel de Kauê, solução, tecnologias relevantes, situação e acesso verificável. Atlas é um caso interno. Usar diagrama ou captura autorizada e anonimizada. Conferir estado e destinos dos demais projetos. A inclusão de VECOM depende de material autorizado. Só usar métricas com fonte.
- Formação parte de Gestão Administrativa (156 h, 2020), Operador de Tecnologia (92 h, 2017), Programador de Games (40 h, 2017) e 3ds Max (32 h, 2018), todos listados como VisualMídia, e do ensino médio na EEB Cel. Pedro Christiano Feddersen. Confirmar dados de ADS e dos novos cursos antes de exibi-los.
- Na implementação, preparar os ícones do fluxo Atlas, os ícones de competências e contato, as ilustrações de prata e bronze e os louros de menções como peças separadas. Conferir licenças dos ícones de marca, tamanhos responsivos e peso dos arquivos. A evidência de um projeto ou de uma conquista vem de links e documentos reais.
- A navegação da home, currículo, formulário, i18n e tema continuam parte da jornada. O widget e os efeitos públicos do ÆVO saem da composição nesta rodada. A exposição da API depende da verificação dos consumidores.

### Entregas em sequência

1. Implementar a estrutura das seções e o sistema visual comum. Conferir âncoras e conteúdo dos dois idiomas.
2. Integrar Formação escalável, navegação dos projetos, comprovantes, formulário e estados de interação.
3. Preparar os assets em separado e revisar as seções completas em desktop e celular.
4. Prototipar e integrar a abertura acionada pelo visitante, verificando a continuidade do texto e o foco final.
5. Revisar a jornada integrada com as referências selecionadas, registrar resultados e resolver os pontos de conteúdo pendentes.

### Microinterações

| Área | Gatilho e resposta |
|---|---|
| Abertura | A ação Continuar ganha foco visível e feedback curto de pressão. Um acionamento inicia o encaixe. |
| Navegação e hero | Realçar link e indicador por foco e hover. Toque aciona o destino sem depender de hover. |
| Projetos | Mover o indicador do item ativo e trocar o painel com transição curta. O foco permanece no controle selecionado. |
| Sobre e Experiência | A linha de trajetória pode se revelar uma vez. O conteúdo fica legível desde o primeiro render. |
| Competências | Links reais ganham sublinhado e indicação de destino por foco ou hover. |
| Formação | “Ver todos” expõe o estado expandido e mantém o foco. A lista abre no fluxo da página, sem altura fixa. |
| Conquistas | Dar feedback visual aos links de comprovantes. Elementos decorativos ficam fora da navegação por teclado. |
| Contato | Indicar foco, erro junto ao campo, envio em andamento e resposta. Evitar reenvio concorrente e manter o texto em falhas recuperáveis. |
| Rodapé | “Voltar ao topo” leva ao início e reposiciona o foco. Usar deslocamento suave apenas quando apropriado. |

Transições locais partem de 120–240 ms como faixa para prototipagem. A abertura tem ritmo próprio. Usar foco visível, estados distinguíveis sem depender da cor e resposta equivalente em teclado e toque. Com movimento reduzido, preservar a resposta funcional com mudança imediata de estado.

## Testing Decisions

- Usar a página pública localizada como ponto principal de validação. Testar o que o visitante vê e faz. Reaproveitar os testes existentes de shell, navegação, hero e i18n para comportamento renderizado. Reservar testes de navegador para transições reais, foco, tamanhos de tela e links profundos.
- Verificar branco inicial, texto e botão, ausência de avanço automático, clique e teclado, foco final, paisagem e destinos, retorno ao topo, reload e persistência na sessão, hash direto, redução de movimento e falha de script. Revisar a continuidade quadro a quadro em desktop e celular.
- Exercitar Formação na página com a lista atual e uma lista extensa em múltiplas instituições. Cobrir metadados parciais, títulos longos, dois idiomas, expansão, acesso sem JavaScript e ausência de overflow em 360 e 390 px.
- Validar seleção e links profundos de projetos, currículo, certificados, contatos, formulário com transporte simulado, estados de erro e envio, rodapé, tema e foco. Verificar a ausência do widget e de chamadas públicas iniciadas pela interface do ÆVO.
- Comparar prévias em 360, 390, 768, 1280 e 1440 px. Fazer revisão por teclado, toque, contraste e zoom. Comparar as capturas da implementação com os PNGs selecionados, em desktop e na adaptação para celular. Registrar diferenças intencionais de composição e os resultados de build, suíte e desempenho em relação à branch de partida.

## Out of Scope

- Redesenhar ou reconstruir a paisagem, criar novo efeito de fundo ou estender o caminho dos portais pela rolagem.
- Lançar nova versão do ÆVO, criar CMS para cursos ou inserir credenciais sem fonte confirmada.
- Publicar ou implantar o site. A issue registra o plano.

## Further Notes

Ordem de trabalho proposta: estrutura e dados das seções → Formação escalável e demais interações → assets auxiliares → protótipo e integração da abertura → revisão completa. A direção de Formação é a opção C. “Continuar”, o limite de seis cursos e o tratamento final da segunda frase são escolhas de planejamento a validar na prévia. Os tickets anteriores #36–#49 registram a transição anterior. Verificar sobreposição, responsáveis e bloqueios antes de iniciar qualquer tarefa.


