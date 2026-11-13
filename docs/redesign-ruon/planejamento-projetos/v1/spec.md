# Spec — Projetos: planejamento visual completo, prévias e páginas de case

Data: 12/11/2026. Síntese do planejamento e das decisões confirmadas por Kauê. A validação principal foi confirmada nesta conversa: comparação visual das imagens e jornada integrada home → case → retorno, em desktop/celular, incluindo scroll, PT/EN e movimento reduzido.

## Problem Statement

O portfólio precisa apresentar os projetos atuais com personalidade, contexto e visão de produto. O catálogo anterior concentra projetos em um índice selecionável, não conta as histórias novas e não diferencia adequadamente produtos próprios e trabalhos sob demanda. Avançar diretamente do primeiro storyboard para código deixou os outros cases sem o mesmo nível de planejamento e dificultou avaliar o conjunto.

Kauê quer primeiro planejar visualmente toda a área de projetos, incluindo prévias, páginas próprias, narrativa, mídia, transições e celular. O VioDigital possui estética aprovada e uma prova local parcial; ainda não tem assets finais, vídeo, galeria e conteúdo completo. Essa prova não representa conclusão do projeto nem autorização para continuar implementando os outros sem revisão visual.

## Solution

Planejar cinco prévias verticais compreensíveis na home e cinco páginas dedicadas: VioDigital, VECOM Ficha Fácil, Atlas Notarial, DocFácil e CKF Manutenção. CKF reúne duas entregas identificadas — site institucional e sistema de orçamentos — dentro do mesmo case. Recrutadores são o público principal, clientes o secundário.

Usar a estética pessoal branca/mineral/violeta como continuidade, preservando as identidades dos produtos. Cada prévia comunica nome, natureza do trabalho, proposta, amostra visual e acesso opcional ao case. Cada página aprofunda contexto → solução em uso → resultado/evidências, com contribuição de Kauê, decisões, telas e links confirmados.

As imagens orientam a composição; storyboards descrevem os movimentos. Aprovar o conjunto visual antes de retomar implementação. Vídeos e camadas podem coexistir: texto e ações permanecem HTML, o elemento compartilhado conecta as páginas e a mídia sustenta a apresentação.

### Direção de cada case

| Case e natureza | Prévia e continuidade | Página dedicada | Movimento e mídia |
|---|---|---|---|
| VioDigital — projeto open source de origem notarial/comunitária | Documento de exemplo e QR, verde/vermelho, papel e placa posterior; título estável. O mesmo documento se expande até o hero do case. | Contexto de conferência documental, apresentação da leitura/organização, interface real preparada, contribuição e créditos da base comunitária. | Scroll conduz documento → leitura → dados. Vídeo curto pode aprofundar o fluxo. Não executar o motor real no portfólio. |
| VECOM — desenvolvimento sob demanda | Fichas entram numa pasta azul translúcida, com detalhe laranja da identidade. A pasta abre e enquadra a apresentação do sistema. | Jornada entre preenchimento cadastral e operação da equipe; telas públicas e internas claramente identificadas; contribuição e escolhas de fluxo. | Fichas soltas → conferência → fila organizada. Realçar uma etapa por gesto; sem sugerir dados sincronizados ao vivo. |
| Atlas Notarial — produto próprio, originado no trabalho | Documento de veículo conecta-se à bancada em moldura escura; violeta funcional e pequeno realce quente. A bancada amplia até a mídia principal do case. | Erros/retrabalho em procurações e demora para conferir/redigir dados → Formatador de Veículos → conjunto de ferramentas → produto próprio. Galeria de ferramentas e decisões de evolução. | Dados se alinham, documento ganha estrutura, bancada reúne ferramentas. Usar recortes/filme da interface, sem inventar resultados ou métricas. |
| DocFácil — produto próprio da RUON | Corujinha azul existente acompanha perguntas e composição do documento. Papel/preview amplia até a página, mascote reposiciona-se sem cobrir conteúdo. | Escolha do documento, orientação por perguntas, revisão e PDF; contexto, contribuição e decisões de clareza. | Uma pergunta entra, resposta exemplificada compõe o documento, mascote aponta para a próxima etapa e repousa. Vídeo pode mostrar o fluxo guiado. |
| CKF — desenvolvimento sob demanda, duas entregas | Par de mídias com site e sistema; carvão/amarelo, material industrial e conexão mineral discreta. O par se abre no hero do case. | Abertura comum e dois capítulos completos: site com serviços/presença/contato; sistema com itens/orçamento/PDF. Cada frente tem telas, contribuição, decisões e evidências próprias. | Ênfase passa do site ao sistema; documento de orçamento fecha a sequência. A linha entre as frentes é recurso gráfico, não afirma integração real entre produtos. |

As frases das imagens são propostas editoriais. Representações de interface geradas orientam enquadramento e não comprovam funcionalidades, resultados, conformidade ou estado de produção.

## User Stories

1. Como recrutador, quero reconhecer os projetos atuais rapidamente, para avaliar a experiência de Kauê.
2. Como recrutador, quero entender cada proposta na home, para decidir quais cases aprofundar.
3. Como visitante, quero acessar todos os cases sem alternar um palco obrigatório, para explorar na minha ordem.
4. Como cliente, quero distinguir produto próprio e trabalho sob demanda, para compreender o tipo de atuação.
5. Como visitante, quero identificar a contribuição de Kauê, para separar seu trabalho do contexto geral do produto.
6. Como visitante, quero ver identidade própria em cada projeto, para reconhecê-lo e lembrar dele.
7. Como visitante, quero perceber continuidade com a marca pessoal, para reconhecer uma experiência coesa.
8. Como visitante, quero títulos, resumo e link disponíveis durante o movimento, para ler sem esperar.
9. Como visitante, quero controlar o avanço pelo scroll, para conduzir a apresentação.
10. Como visitante, quero que o movimento pause ao parar de rolar, para observar os detalhes.
11. Como visitante, quero reverter a sequência ao subir, para rever uma etapa.
12. Como visitante, quero que a fixação termine após o percurso, para continuar a página.
13. Como visitante no celular, quero sequências curtas, para perceber avanço em cada gesto.
14. Como visitante em tela baixa, quero fluxo normal quando a composição não couber, para não perder conteúdo.
15. Como visitante com movimento reduzido, quero composição estável, para acessar as mesmas informações confortavelmente.
16. Como visitante por teclado, quero foco visível e controles sem armadilhas, para navegar por todas as apresentações.
17. Como visitante, quero abrir o case por um link real, para compartilhar ou usar nova aba.
18. Como visitante, quero uma transição coerente do elemento principal, para acompanhar a mudança de página.
19. Como visitante, quero voltar à posição anterior, para continuar explorando os projetos.
20. Como visitante, quero acessar um case diretamente, para ler sem passar pela introdução.
21. Como visitante, quero que a introdução não reapareça no retorno, para preservar meu contexto.
22. Como visitante, quero compreender problema, solução e resultado, para avaliar decisões de produto.
23. Como visitante, quero galeria e mídia com legendas, para entender o que cada tela representa.
24. Como visitante, quero distinguir ilustração de interface real, para interpretar corretamente as evidências.
25. Como visitante, quero controlar vídeos com áudio e narrativa longa, para escolher como assistir.
26. Como visitante com mídia indisponível, quero poster e resumo textual, para compreender o projeto.
27. Como visitante em inglês, quero conteúdo e controles traduzidos, para explorar a mesma jornada.
28. Como visitante em tema escuro, quero contraste preservado, para continuar lendo a apresentação.
29. Como visitante do VioDigital, quero ver a relação entre documento, QR e informações, para entender sua finalidade.
30. Como visitante do VioDigital, quero encontrar os créditos de origem, para reconhecer a base comunitária.
31. Como visitante da VECOM, quero compreender a passagem entre cadastro e trabalho interno, para entender a solução para a empresa.
32. Como visitante do Atlas, quero conhecer a origem no cartório e a primeira ferramenta, para perceber a identificação de uma necessidade real.
33. Como visitante do Atlas, quero acompanhar sua evolução para produto próprio, para avaliar visão de produto.
34. Como visitante do DocFácil, quero ver a corujinha orientar uma etapa concreta, para compreender sua função além da decoração.
35. Como visitante do DocFácil, quero entender a formação do documento, para reconhecer o valor da experiência guiada.
36. Como visitante da CKF, quero distinguir site e sistema no mesmo case, para perceber a amplitude das entregas.
37. Como visitante da CKF, quero telas e contribuição de cada frente, para avaliar cada solução separadamente.
38. Como Kauê, quero revisar imagens de todos os projetos antes do código, para decidir o conjunto visual com segurança.
39. Como Kauê, quero materiais organizados com versões e legendas, para comparar propostas e recuperar decisões.
40. Como implementador, quero consultar as imagens efetivamente abertas, para preservar composição, materiais e hierarquia.
41. Como implementador, quero um roteiro de estados por projeto, para construir movimentos coerentes.
42. Como implementador, quero separar mídia de conteúdo, para atualizar dados sem refazer filmes.
43. Como mantenedor, quero adicionar projetos por uma estrutura consistente, para evoluir o portfólio sem duplicar a jornada.
44. Como responsável pelos materiais, quero usar exemplos preparados e fontes registradas, para não publicar dados operacionais.
45. Como Kauê, quero entregas incrementais revisáveis, para avaliar cada case antes de expandir a implementação.

## Implementation Decisions

### Estado, limites e precedência

- Esta spec consolida o planejamento da área de projetos. Substitui a direção de índice lateral/painel selecionável dos tickets antigos somente nessa área. Hero, introdução e demais seções mantêm suas decisões aprovadas.
- Preservar a prova local do Vio como experimento e evidência; não apagar trabalho nem considerá-lo acabamento final. Pausar novas alterações de interface até a revisão visual do conjunto.
- A ordem inicial de apresentação é VioDigital, VECOM, Atlas Notarial, DocFácil e CKF. A ordem pode ser revisada editorialmente sem alterar o modelo de cases.
- Preservar destinos antigos úteis e redirecionar/compatibilizar links existentes ao substituir o catálogo. Foli deixa de ser destaque; não criar uma sexta prévia por consequência de conteúdo legado.
- RUON é a marca própria de Kauê, não empregador externo. Não presumir equipe, contrato, autoria exclusiva ou métricas.

### Pacote visual antes da implementação

- VioDigital tem quatro pranchas anteriores: home/scroll, continuidade para case, celular e capítulos. Estética aprovada; vídeo, assets finais e conteúdo seguem pendentes.
- Quatro novas pranchas conceituais cobrem VECOM, Atlas, DocFácil e CKF, cada uma com três enquadramentos legendados: prévia, página dedicada e capítulos/celular. São propostas aguardando revisão, não escolhas já aprovadas.
- Registrar por imagem: case, versão, prompt, referências utilizadas, ferramenta, arquivo de origem, hash e estado de revisão. Não sobrescrever originais.
- Antes de codar cada fatia, o agente deve abrir e visualizar as referências aprovadas e o storyboard correspondente. Se faltar acesso, resolver o acesso antes de implementar por aproximação textual.
- Detalhar cada storyboard aprovado em chegada → transformação → repouso, transição por clique e retorno. Propostas com composição insuficiente recebem nova rodada visual antes do código.
- Fazer leitura contínua das cinco prévias como conjunto para evitar repetição excessiva de papel/plinto, competição entre paletas e cinco experiências longas de fixação.

### Conteúdo e organização

- Um cadastro editorial por case deve reunir identidade, natureza do trabalho, proposta, contribuição confirmada, contexto, solução, decisões, evidências, entregas, mídias, links, legendas e textos nos dois idiomas.
- Modelar múltiplas entregas dentro do case para CKF. Outros cases podem usar a mesma capacidade sem serem artificialmente divididos.
- Layout compartilhado fornece navegação, leitura, galerias e acessibilidade. O conteúdo e a coreografia de cada case permanecem próprios; não construir cinco cópias rígidas.
- A home mostra só o necessário para compreender e escolher. A página própria contém história aprofundada, telas e decisões; nunca exigir o case para entender a prévia.
- Não inventar estágio de produção. A pesquisa dos repositórios é um snapshot; links, funcionalidades e disponibilidade serão revalidados antes de publicar.

### Movimento, vídeo e microinterações

- Scroll nativo conduz acontecimentos; fixação temporária somente onde houver transformação útil. Sem capturar roda/toque, impor tempo mínimo, criar espera ou ocultar título/CTA.
- Cada prévia mantém um elemento principal reconhecível na home e no hero do case. O clique pode conduzir expansão/reorganização; navegar imediatamente com passagem discreta se a técnica não estiver disponível.
- Proporção do percurso vem do conteúdo e da viewport; evitar valores fixos extensos compartilhados por todos os projetos. Celular reduz passos secundários; viewport baixo usa fluxo normal.
- Vídeo é uma possibilidade de acabamento, especialmente ambiente e apresentação aprofundada, não uma obrigação para todo fundo. Decidir após prova de qualidade, peso e controle de cada sequência.
- Usar camadas independentes quando nitidez, reversão e continuidade entre páginas forem necessárias. Não rasterizar título, resumo, links ou controles dentro do filme.
- Um filme ligado ao scroll precisa buscar quadros de maneira responsiva e coerente ao avançar/reverter. Se não atender na prova, usar camadas ou sequência de imagens, preservando o storyboard.
- Mídia ambiente curta pode ser silenciosa, sem dominar a leitura, com pausa disponível. Vídeo narrativo recebe controles; fala/som relevante exige legendas. Posters e resumo substituem mídia com falha, reprodução bloqueada ou movimento reduzido.
- Microinterações: foco e hover destacam ação; setas reforçam destino; legendas indicam estado; galeria abre por clique/teclado e fecha devolvendo o foco; seleção de mídia não desloca título e texto.
- A corujinha realiza gesto contextual e repousa; não acompanha o mouse nem invade o texto. Estados verde/vermelho usam texto ou ícone, sem depender apenas da cor.
- Retorno pelo histórico e pelo link recupera contexto, sem repetir introdução. Links diretos e nova aba funcionam sem transição. Tema e idioma mantêm navegação coerente.

### Assets e evidências

- Vio: documento EXEMPLO, QR ilustrativo único, placa posterior, módulos, realce e faixas de dados.
- VECOM: pasta azul, fichas sintéticas, cartões de etapas e recortes públicos/internos preparados.
- Atlas: documento de veículo demonstrativo, composição formatada, ferramentas/bancada e recortes da evolução.
- DocFácil: coruja original em poses aprovadas, pergunta demonstrativa, documento em formação e PDF ilustrativo.
- CKF: marca, mídia industrial autorizada, telas do site, telas do sistema, orçamento/PDF demonstrativos e duas frentes identificadas.
- Usar mídias reais preparadas na galeria final. Arte gerada com interface simulada não prova comportamento real. Nomes, valores, indicadores e selos nos mockups não são conteúdo aprovado.
- Não publicar as capturas operacionais originais. Produzir cópias adequadas com dados sintéticos e registrar procedência.
- Imagens completas guiam composição; extrair/produzir camadas finais separadamente após aprovação. Não tentar animar uma prancha inteira com texto incorporado.
- Carregar poster primeiro; mídia pesada apenas quando próxima da viewport ou solicitada. Não baixar cinco vídeos grandes na entrada do site. Pausar processamento fora de tela e ao ocultar a aba.

### Sequência de entregas e critérios de avanço

| Etapa | Entrega | Critério para avançar |
|---|---|---|
| A — Planejamento conjunto | Esta spec, cinco identidades, imagens legendadas e inventário de mídia. | Kauê revisa as propostas dos cinco projetos e os ajustes ficam registrados. |
| B — Storyboards detalhados | Estados, repouso, passagem e retorno de cada direção escolhida; desktop e celular. | Nenhuma decisão importante de composição fica entregue ao improviso no código. |
| C — Quebra lógica | Tickets de fundação, mídia, cada case e QA, com dependências e critérios de aceite. | Backlog revisado antes de execução; sem recriar tickets antigos automaticamente. |
| D — Fundação e primeiro case | Navegação/conteúdo compartilhados e Vio completo usando a prova existente como aprendizado. | Jornada integrada aprovada e mídia final comparada às referências. |
| E — Demais cases | VECOM, Atlas, DocFácil e CKF em fatias completas. | Cada fatia entrega prévia + case + retorno + celular antes de iniciar a seguinte. |
| F — Conjunto e publicação | Revisão factual, visual, desempenho, idioma, tema e links. | Evidências integradas e autorização de publicação específica. |

A fase atual entrega A e inicia o material visual de B. Não autoriza executar D/E automaticamente nem publicar o site. A produção final de vídeos não deve anteceder a escolha da composição e do roteiro.

## Testing Decisions

- Ponto principal confirmado pelo usuário: jornada integrada no navegador, prévia na home → página de case → retorno. Avaliar comportamento observável e comparação às imagens; não testar classes CSS ou detalhes internos como resultado de produto.
- Validação de planejamento: todos os cinco cases têm nome, natureza, proposta, elemento principal, roteiro, enquadramento desktop/mobile, mídia e estado de revisão. CKF cobre separadamente as duas entregas.
- Testar nessa mesma jornada: scroll avança/pausa/reverte, fixação termina, texto/CTA permanecem legíveis, toque funciona e nenhum efeito impede pular para outro conteúdo.
- Validar retorno por link e histórico, URL direta, refresh, nova aba, foco visível e ausência de repetição da introdução. Ensaiar também storage bloqueado e navegador sem transição compartilhada.
- Verificar desktop, celular e tela baixa, PT/EN, tema claro/escuro, movimento reduzido, JavaScript desativado e poster/mídia com falha.
- Galeria e vídeo: teclado, foco ao fechar, pausa, legendas relevantes e ausência de autoplay com som. Não enviar dados reais nem acionar produtos externos para demonstrar o portfólio.
- Prior art: testes existentes da jornada do redesign, escopo local de movimento e roteiro de navegador da prova Vio, que já observou progresso, pausa e retorno. Reaproveitar esses pontos, parametrizando os cases quando existirem.
- Registrar capturas de chegada/meio/repouso e gravação de passagem em cada viewport. Testes automatizados não substituem a revisão visual do material e do ritmo.
- Medir layout, tarefas longas, carregamento e resposta no mesmo cenário antes/depois. Ajustar a mídia se gerar travamento, atraso perceptível de busca por quadros ou regressão do scroll; números de baseline devem ser registrados, não inventados nesta spec.
- Ao implementar, executar TypeScript, testes pertinentes e build. Não executar testes de código novamente como suposta validação de uma spec ou imagem estática.

## Out of Scope

- Continuar a implementação nesta rodada de planejamento, fazer merge, deploy ou publicar a aplicação.
- Redesenhar hero/introdução já aprovados, refazer portais em 3D ou reconstruir a paisagem.
- Reativar ÆVO ou redesenhar outras seções fora da área de projetos.
- Executar verificadores, coletar arquivos, abrir câmera, integrar autenticação/pagamento ou operar aplicações de clientes a partir do portfólio.
- Alterar os produtos originais, renomear repositório VioWeb ou substituir marcas de clientes.
- Gerar todos os assets finais e vídeos antes de aprovar o conjunto e seus roteiros.
- Inventar resultados, autoria exclusiva, depoimentos, credenciais ou indicadores.

## Further Notes

- Aprovação posterior de Kauê: VECOM e Atlas v3 aprovados, completando a aprovação visual dos cinco cases. A escolha técnica de animação permanece aberta para avaliação posterior: vídeo, 2.5D ou combinação por projeto, preservando as composições aprovadas. Próximo trabalho é detalhar roteiros e tickets; não iniciar implementação automaticamente.

- Escolha posterior de recortes: VECOM volta à composição notebook + celular + pasta azul da primeira proposta, integrando captura oficial preparada do produto como mídia final; a recriação gerada apenas orienta o enquadramento. Atlas segue documento de veículo + camadas Formatar/Conferir/Organizar + evolução documental, com fundo mineral claro e sans-serif. A alternativa de arquivo antigo/latão/serifas e a curva contínua VECOM da v2 não foram escolhidas. Novas pranchas v3 aguardam revisão da composição completa.

- Revisão posterior do usuário: VioDigital, DocFácil e CKF aprovados visualmente. VECOM pede melhor integração da prévia na home. Atlas mantém documentos/Formatador e deve reinventar o ambiente com linguagem cartorária, sem tomar o acabamento inicial do site comercial como referência obrigatória. Novas propostas v2 foram produzidas e aguardam avaliação; bancada/tablet escuro deixa de ser direção mandatória.

- Relaciona-se às specs #52 e #68 e redefine a apresentação antiga de projetos da #54. Não fecha esses tickets nem presume seus bloqueios resolvidos.
- A decisão de home com prévias e páginas próprias já está registrada em ADR. A pesquisa Q7 e os esclarecimentos de Kauê sustentam a classificação dos trabalhos.
- As imagens novas ficam pendentes de aprovação. O aceite da estética do Vio não se estende automaticamente aos outros projetos.
- O índice visual local acompanha esta spec com legendas, referências e prompts. Os originais operacionais não serão anexados à issue. Antes de execução em outro ambiente, garantir acesso aos materiais aprovados; descrições não bastam.
- Esta spec foi publicada pelo fluxo to-spec, com ready-for-agent para o trabalho de planejamento. O rótulo não remove as etapas de revisão visual e backlog antes da implementação.
