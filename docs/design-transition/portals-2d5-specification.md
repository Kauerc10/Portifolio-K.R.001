# Especificação — Hero 2.5D dos três portais

Data: 03/11/2026. Validação pelo hero completo na página real confirmada pelo usuário. Status: especificação para implementação; não representa recurso entregue.

## Problem Statement

O portfólio precisa apresentar desenvolvimento, automação e suporte com personalidade, clareza e acabamento profissional. As tentativas de reconstruir a referência em 3D alteraram proporções, curvas, iluminação e materiais. Integrações anteriores também produziram bordas visíveis, baixa nitidez, sobreposição em telas menores e movimentos que prejudicaram o conforto.

O usuário escolheu preservar a imagem aprovada dos três portais retangulares com aberturas arqueadas e fita violeta. Quer que a cena pareça parte do site, ocupe suas bordas e responda à exploração de maneira elegante. A prioridade é concluir esse hero 2.5D. A expansão dos caminhos pelas demais seções durante a rolagem é uma possibilidade futura e não deve atrasar nem ampliar esta entrega.

## Solution

Construir o hero com a imagem aprovada como base visual, camadas de iluminação recortadas com precisão, indicadores e conteúdo HTML acessíveis. A seleção de uma área revela um brilho curto sobre a fita visível, realça o interior do portal correspondente e apresenta uma prévia com acesso direto ao conteúdo real.

A composição permanece estável, com cursor nativo e rolagem natural. Desktop e celular recebem enquadramentos adequados, sem cortar destinos importantes ou sobrepor texto às construções. A imagem continua visível quando os efeitos não estão disponíveis. A profundidade percebida vem da perspectiva da arte e das camadas de luz; não se promete movimento de câmera ou geometria reconstruída.

## User Stories

1. Como visitante, quero identificar rapidamente o profissional e suas três áreas, para entender a proposta do portfólio.
2. Como recrutador, quero ler a apresentação antes de explorar efeitos, para avaliar o perfil sem esforço.
3. Como cliente, quero acessar trabalhos relacionados à minha necessidade, para verificar experiência relevante.
4. Como visitante, quero ver a imagem aprovada preservada, para perceber uma identidade visual consistente.
5. Como visitante em desktop, quero que a paisagem alcance as bordas, para sentir a cena integrada à página.
6. Como visitante, quero que céu e fundo do site se encontrem suavemente, para não perceber um retângulo de imagem colado ao layout.
7. Como visitante, quero texto com margens e contraste confortáveis, para ler mesmo com uma arte marcante.
8. Como visitante em notebook, quero que apresentação, indicadores e cena caibam sem colisões, para explorar o hero com facilidade.
9. Como visitante em tablet, quero uma composição adaptada à largura disponível, para manter a hierarquia visual.
10. Como visitante em celular, quero ver os três destinos e controles grandes, para escolher sem precisar tocar em detalhes pequenos.
11. Como visitante em celular, quero conteúdo em fluxo, para não encontrar sobreposição ou rolagem horizontal.
12. Como visitante que gira o aparelho, quero que imagem e efeitos permaneçam alinhados, para continuar a exploração.
13. Como visitante com zoom, quero acessar todo o texto e os controles, para usar a página com ampliação.
14. Como visitante em tela de alta densidade, quero detalhes nítidos, para perceber qualidade na arte.
15. Como visitante com conexão limitada, quero receber uma imagem adequada à minha tela, para evitar transferência desnecessária.
16. Como visitante, quero que a apresentação apareça antes da inicialização dos efeitos, para começar a navegação imediatamente.
17. Como usuário de mouse, quero selecionar uma área pelo seu indicador, para descobrir o trabalho correspondente.
18. Como usuário de teclado, quero foco visível e ordem lógica, para explorar os três destinos sem mouse.
19. Como usuário de toque, quero selecionar uma área e depois usar um link explícito, para decidir com segurança antes de navegar.
20. Como visitante, quero que a luz acompanhe a fita existente, para perceber a conexão com o portal selecionado.
21. Como visitante, quero que fachadas e paredes ocultem corretamente os efeitos, para manter a coerência espacial.
22. Como visitante, quero um realce suave no interior do portal ativo, para reconhecer minha seleção.
23. Como visitante, quero uma prévia com descrição curta e CTA real, para transformar a exploração visual em navegação útil.
24. Como visitante, quero que a prévia permaneça disponível ao mover o ponteiro até ela, para conseguir clicar no CTA.
25. Como visitante que muda rapidamente de área, quero que a última seleção prevaleça, para não esperar uma fila de animações.
26. Como visitante, quero navegar imediatamente ao ativar um link, para não depender da duração de um efeito.
27. Como usuário de teclado e mouse simultaneamente, quero que o foco tenha precedência, para não perder a área em exploração.
28. Como pessoa sensível a movimento, quero realces estáticos quando solicito movimento reduzido, para usar o site confortavelmente.
29. Como visitante, quero cursor normal e câmera estável, para saber onde clico e manter o controle da navegação.
30. Como visitante que muda de aba, quero que os efeitos parem, para evitar processamento desnecessário.
31. Como visitante que retorna ao hero, quero recuperar minha seleção sem reprodução inesperada, para manter continuidade.
32. Como visitante sem JavaScript, quero apresentação e links utilizáveis, para acessar os conteúdos essenciais.
33. Como visitante cuja imagem falha, quero texto e navegação legíveis, para continuar usando o portfólio.
34. Como visitante cujo navegador não executa um efeito, quero a imagem estática preservada, para manter uma experiência completa.
35. Como usuário de leitor de tela, quero nomes claros para áreas e links, para navegar sem depender da paisagem.
36. Como visitante em português ou inglês, quero textos corretos e layout estável, para compreender o conteúdo no meu idioma.
37. Como visitante que usa tema alternativo, quero contraste e controles coerentes, para não perder legibilidade.
38. Como proprietário, quero preservar destinos e informações reais, para não apresentar evidências ou projetos inventados.
39. Como mantenedor, quero arte, máscaras e enquadramento com contrato documentado, para ajustar a cena sem desalinhamento.
40. Como mantenedor, quero validar o resultado no hero completo, para detectar problemas que testes isolados não mostram.
41. Como proprietário, quero conservar a possibilidade de prolongar a fita futuramente, para expandir a narrativa sem implementar essa animação agora.
42. Como proprietário, quero uma entrega revisável com evidências e limitações claras, para avaliar o acabamento antes de publicar.

## Implementation Decisions

### Referência e identidade

- A referência canônica é a imagem única dos três portais e fita violeta, com dimensão original de 1672×941. A paisagem antiga das casinhas e as colagens são histórico, não alvos desta implementação.
- Preservar original, proporções, posição dos portais, continuidade aparente da fita, paleta mineral clara e violeta da marca. Não substituir por reconstrução 3D ou nova ilustração sem decisão explícita.
- Preservar a saudação aprovada, apresentação pessoal, áreas de atuação, navegação, currículo e conteúdos confirmados. A imagem é decorativa no sentido semântico: as informações e ações existem em HTML.
- Usar ícones vetoriais consistentes com a interface existente, sem setas em emoji ou controles de estilos desconexos.

### Composição e enquadramento

- Separar a largura máxima do conteúdo da camada visual fullbleed. Nenhum ancestral deve restringir a arte à coluna de texto.
- Evitar uma altura rígida de viewport. A composição deve acomodar traduções, zoom e cabeçalho, sem cortar controles ou exigir telas excepcionalmente altas.
- Desktop amplo: saudação e introdução sobre área livre do céu; construções e indicadores abaixo; prévia fora da arquitetura. Faixa inicial de avaliação: a partir de 1280 px.
- Tablet e notebook compacto: texto em fluxo, com duas colunas apenas enquanto houver espaço real. Diminuir céu excedente e deslocar controles para uma faixa própria quando necessário.
- Celular: apresentação, cena, seleção e prévia em fluxo vertical. Preservar os três portais por recorte predominantemente vertical do céu. A cena pode ser panorâmica e baixa; os controles externos garantem acessibilidade e precisão.
- Breakpoints são hipóteses de implementação, não critérios visuais absolutos. Ajustar por colisões reais. Não usar corte central que elimine os portais laterais.
- Se o panorama móvel ficar inadequado, registrar a limitação e apresentar composição derivada própria como alteração de arte revisável. Essa alternativa exige seu próprio mapa; não reutilizar coordenadas incorretas.
- Um contrato de enquadramento define retângulo de origem, escala, deslocamento e âncoras. Imagem, SVG, máscaras e indicadores usam a mesma transformação, inclusive após redimensionamento.
- O céu deve encontrar o fundo CSS sem borda visível. Gradientes de integração ficam em regiões livres e não apagam os portais. Não esticar a arquitetura para preencher ultrawide.
- A região inferior deve terminar de forma acabada na página atual. A possível continuação futura da fita não justifica uma borda cortada ou conexão provisória visível.

### Arte e qualidade de imagem

- Entregar formatos e resoluções responsivos com dimensões explícitas, proporção reservada e prioridade de carregamento adequada ao hero. A imagem principal não depende do carregamento do JavaScript.
- Escolher compressão por comparação visual dos arcos, textura mineral e encontro em Y, além do peso. Registrar dimensões, tamanho transferido e procedência dos derivados.
- A fonte de 1672×941 limita o detalhe disponível. Aumento de dimensão não constitui melhoria comprovada. Um candidato ampliado deve ser comparado em recortes 1:1 e rejeitado se alterar silhuetas ou inventar textura evidente.
- Manter base estática integral. Não deslocar recortes de construções sobre regiões de fundo inexistentes. Não usar displacement para simular câmera ou ondular arquitetura.
- Tema alternativo preserva a identidade da arte, sem inversão automática de cores. Ajustar superfícies e contraste do entorno e verificar a transição visual.

### Máscaras e oclusões

- Autorizar camadas SVG no sistema de coordenadas original: superfície violeta visível, interior de cada portal, oclusores de arquitetura, trajetórias e âncoras nomeadas.
- A máscara define onde a luz pode aparecer; a trajetória define seu deslocamento. Uma linha central isolada não substitui a máscara da superfície.
- Traçar curvas sobre a referência e conferir com overlay. Preservar largura aparente variável e perspectiva. O encontro em Y recebe um único realce, sem acúmulo de brilho por ramos sobrepostos.
- Interromper o efeito onde a arquitetura oculta a fita. Não inferir conexões visíveis para trechos escondidos.
- Ordem visual: arte base, brilho recortado da fita, luz recortada dos interiores e controles HTML. A aplicação de blur deve permanecer local e novamente limitada à máscara apropriada.
- IDs de máscaras e filtros são únicos por instância. Elementos decorativos não capturam ponteiro nem criam focos extras.
- O manifesto registra referência, dimensão, versões das máscaras, identificação de destinos, âncoras e convenções de enquadramento. Mudanças na arte exigem revisão desse registro.

### Estado e interação

- Um estado de seleção governa realce, indicador e prévia. Os identificadores de destino permanecem estáveis mesmo com mudança de idioma.
- Desenvolvimento conduz a projetos, automação ao projeto Atlas e suporte à experiência. Conferir os alvos reais já existentes; não criar URLs ou informações presumidas.
- Mouse seleciona por hover com tolerância curta contra passagem acidental. Teclado tem precedência enquanto o foco estiver em um controle de destino.
- Toque usa botão de seleção e CTA de navegação explícito. Não depender de hover, duplo toque ou toque preciso no pequeno arco da imagem.
- Botões de seleção expõem estado pressionado e nome acessível. Links de navegação continuam links nativos. Não misturar navegação automática com a primeira seleção de toque.
- Manter a última prévia ao sair do indicador, permitindo mover ponteiro ou foco até o CTA. Seleções repetidas não precisam reiniciar animação.
- Mudança rápida cancela a animação anterior e aplica o destino mais recente, sem fila, callbacks obsoletos ou mistura de estados.
- Parâmetros iniciais de acabamento: percurso de luz entre 700 e 1000 ms; realce de interior entre 180 e 250 ms; prévia em até 200 ms. São limites de intenção, ajustáveis visualmente, não testes de temporização exata.
- Navegação acontece imediatamente, sem esperar o percurso luminoso. Nenhuma animação obriga o usuário a acompanhar uma sequência.
- Prévia apresenta título, descrição breve e CTA com informação real. Reservar espaço suficiente para reduzir saltos entre conteúdos e idiomas. Em mobile ela não cobre a cena nem flutua sobre texto.
- A primeira renderização não dispara viagem de luz automaticamente. Apresentar os destinos e uma orientação curta; seleção pode começar neutra, com espaço de prévia estável.
- Usar cursor nativo, câmera estável e rolagem normal. Sem órbita, parallax de mouse ou loops decorativos contínuos.

### Acessibilidade, fallback e ciclo de vida

- Todos os destinos funcionam com teclado, toque e mouse; foco visível, ordem de leitura coerente e alvos de pelo menos 44×44 px nos seletores.
- Verificar contraste de texto e foco no fundo real. A cor não é o único sinal de seleção; estado, texto e contorno complementam o realce.
- Movimento reduzido resulta em realce estático imediato. Alterar a preferência durante uma animação cancela o movimento e conserva seleção.
- Sair do viewport ou ocultar a aba cancela animações. Retorno não recomeça uma viagem inesperada. Desmontagem remove observadores, eventos e animações pendentes.
- Falha da camada de efeitos mantém imagem e links; falha da imagem mantém apresentação e navegação legíveis. Sem JavaScript, os destinos essenciais já estão disponíveis no HTML.
- Não anunciar repetidamente hover por regiões vivas. O conteúdo da prévia precisa ser encontrável e relacionado ao controle sem ruído assistivo.
- Preservar idioma e tema disponíveis. Validar com zoom de 200%, textos maiores e mudança de orientação.

### Arquitetura e orçamento

- Aproveitar a estrutura React/Next e a interface do hero existentes. Separar responsabilidades de composição/conteúdo, arte/enquadramento/máscaras e controles/prévia, mantendo estado de seleção compartilhado.
- Implementar os efeitos com SVG, CSS e Web Animations API quando necessário. Não carregar um renderer 3D para exibir a imagem nem acrescentar uma biblioteca gráfica sem requisito comprovado.
- Reutilizar contratos comportamentais existentes de foco, seleção persistente, destinos, pausa e fallback. Substituir a dependência ativa do modelo e manifesto 3D por um manifesto da arte; não reaproveitar âncoras antigas sem calibração.
- Preservar experimentos como histórico. Só remover dependências após conferir consumidores fora do hero. Não alterar serviços de IA, conteúdo de outras seções ou contratos de backend.
- Objetivos iniciais de entrega: nenhuma animação contínua em repouso, nenhuma mudança de layout provocada pelo carregamento da arte, imagem mobile até 350 KB e desktop até 900 KB quando visualmente viável. Qualquer exceção deve apresentar evidência, não piorar silenciosamente a textura.
- Medir LCP com meta de até 2,5 s, CLS da página até 0,1 e INP até 200 ms em condições documentadas. Resultados de laboratório são evidência local, não garantia de métricas de campo.

## Testing Decisions

- O ponto principal de validação é o hero completo na página pública local, confirmado pelo usuário. Exercitar a experiência pelo DOM, entradas reais e resultado renderizado. Não exigir testes de coordenadas artísticas, estrutura interna de SVG ou número de vértices.
- Usar os testes existentes do hero como precedentes: prioridade do foco sobre hover, seleção por toque antes da navegação, manutenção da prévia até o CTA, fallback, preferência de movimento reduzido e pausa por visibilidade. Há infraestrutura Vitest e Testing Library; adaptar contratos que ainda verificam canvas/renderer para o comportamento novo.
- Testar os módulos de composição, controles e arte pela integração do hero. Testes unitários adicionais só são justificados por comportamento difícil de reproduzir na superfície, não para duplicar a implementação.
- Cenários funcionais obrigatórios: selecionar cada destino; navegar ao alvo correto; mudar rapidamente de seleção; sair do indicador e alcançar CTA; navegar por Tab/Enter/Espaço; manter foco diante de hover concorrente; alternar idioma; respeitar mudança de movimento reduzido; pausar/retomar sem movimento inesperado; desmontar sem efeitos residuais.
- Cenários de resiliência: JavaScript indisponível, falha da imagem, falha do efeito, carregamento lento, retorno de aba oculta e alteração de viewport. A navegação essencial permanece disponível.
- Revisão visual em 320, 390, 768, 1024, 1440 e 1920 px, orientação retrato/paisagem aplicável, PT/EN, tema disponível e zoom de 200%. Conferir bordas, recorte, hierarquia, legibilidade, indicador/portal, oclusão e estabilidade das prévias.
- Conferir máscaras ampliadas em overlay e depois na página final: nenhum brilho no céu, na pedra ou sobre fachadas que deveriam ocultá-lo; nenhum halo retangular, emenda ou faixa desconectada.
- Comparar fonte e derivados em tamanho real. Avaliar nitidez e compressão em partes pequenas, além da captura completa. Não usar uma pontuação global de similaridade como substituta da inspeção.
- Medir rede, animação e layout no navegador com viewport, DPR, dispositivo e throttling registrados. Verificar repouso sem loop e estabilidade durante mudanças rápidas. Rodar build e testes relevantes; não inventar passagem em navegador ou aparelho indisponível.
- Revisar Chrome, Firefox e Safari quando disponíveis, explicitando qualquer cobertura ausente. Publicar evidências de screenshots e comportamento em conjunto com a entrega revisável.
- Ordem dos marcos: composição estática → máscaras alinhadas → um destino completo → três destinos → qualidade, acessibilidade e desempenho. A aprovação funcional não equivale à aprovação estética.

## Out of Scope

- Animação dos caminhos descendo, expandindo ou ramificando conforme o scroll pelas demais seções.
- Construção de uma narrativa de rolagem entre projetos, trajetória e contato; pinning, scroll hijacking e transições entre seções.
- Remodelagem da paisagem ou dos portais em Blender, exportação de GLB, câmera 3D, reconstrução de regiões ocultas e efeitos de displacement na arquitetura.
- Paralaxe seguindo mouse, cursor customizado ocultando o cursor nativo e loops visuais permanentes.
- Redesign completo das seções abaixo do hero, mudanças no ÆVO, novas informações profissionais ou criação de projetos fictícios.
- Publicação de produção, compra de serviços de geração e garantia de desempenho de campo sem medição.

## Further Notes

A extensão futura da fita deve começar na saída visual do hero e evoluir para um traçado gráfico ao longo da página. Nesta entrega, apenas documentar uma âncora de saída, direção tangente, largura aparente e token de cor no mesmo contrato da arte, quando a geometria visível permitir. Não adicionar listeners de scroll, SVG longo oculto ou infraestrutura especulativa para essa fase.

A continuidade futura precisará de especificação própria após definição das seções seguintes, incluindo desenho mobile e movimento reduzido. A saída atual deve funcionar visualmente sozinha.

Esta especificação supera as decisões de reconstrução 3D do primeiro plano. As issues anteriores não devem ser fechadas automaticamente nem interpretadas como bloqueios deste novo escopo sem revisão explícita de suas dependências. Commit e push por marcos continuam autorizados; publicação do site permanece separada.

O critério de conclusão combina fidelidade à referência, composição responsiva, interação utilizável e evidências reais de validação. A imagem original limita a nitidez disponível; qualquer melhoria de arte precisa ser identificada e comparada, não apresentada como recuperação exata de detalhes inexistentes.
