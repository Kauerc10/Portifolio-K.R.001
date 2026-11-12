# Spec — Coreografia e microinterações entre as seções

Atualização após revisão de Kauê: entradas e ornamentos devem acompanhar o scroll, pausar com a rolagem e recuar ao rolar para cima. Esta decisão substitui o gatilho temporizado e a execução única das entradas descritos abaixo. Detalhes em `scroll-motion.md`; abertura, troca de idioma e respostas a ações mantêm seus próprios contratos.

Data: 11/11/2026. Complementa a spec #52 e o plano de movimento aprovado. Status: planejamento; os movimentos novos descritos aqui aguardam implementação. A abertura e a transição PT↔EN já aprovadas são referências de linguagem e entram como regressões.

## Problem Statement

O portfólio precisa sustentar, durante toda a navegação, o cuidado visual percebido na abertura e na troca de idioma. Hoje há microinterações implementadas, mas falta uma coreografia integrada para a chegada às seções, a seleção de projetos, a expansão da formação e os estados do contato. O visitante deve perceber continuidade, personalidade e qualidade sem perder o fio da leitura ou esperar para usar a página.

## Solution

Criar movimentos próprios para cada seção usando a identidade aprovada: branco mineral, tipografia escura, violeta, filetes e curvas da fita. O movimento conduz o olhar e termina no layout escolhido nas imagens. A composição permanece utilizável durante a animação, e os efeitos respondem de maneira equivalente ao teclado, ao toque e ao mouse.

A validação principal será na página completa, conforme o critério já definido para o portfólio. Imagens aprovadas orientam composição e materialidade; gravações da página demonstram ritmo, continuidade e interrupções.

## User Stories

1. Como visitante, quero reconhecer a linguagem da abertura ao explorar as seções, para perceber uma identidade contínua.
2. Como visitante, quero ler os títulos durante as transições, para continuar entendendo onde estou.
3. Como visitante, quero rolar livremente durante os efeitos, para controlar minha navegação.
4. Como visitante, quero que a chegada a Projetos se conecte visualmente à fita do hero, para perceber a passagem entre os conteúdos.
5. Como visitante, quero reconhecer imediatamente o projeto selecionado, para relacionar a opção ao conteúdo exibido.
6. Como visitante, quero trocar rapidamente de projeto sem conteúdo atrasado, para explorar sem confusão.
7. Como visitante, quero acessar um projeto por endereço direto e pelo histórico, para compartilhar e retomar a seleção.
8. Como visitante, quero perceber a sequência do fluxo do Atlas, para entender sua proposta prática.
9. Como visitante, quero que a fita de Sobre ajude a organizar a apresentação e as três áreas de atuação, para compreender o perfil.
10. Como visitante, quero acompanhar os marcos de Experiência sem deslocar os títulos, para ler a trajetória com estabilidade.
11. Como visitante, quero perceber qual grupo de competências está associado a um link, para compreender a relação com o trabalho apresentado.
12. Como visitante, quero receber respostas equivalentes por foco e por hover, para usar o dispositivo de minha preferência.
13. Como visitante, quero expandir cursos com continuidade visual, para entender que a lista cresceu.
14. Como visitante, quero encontrar muitos cursos e instituições sem recortes, para consultar uma formação que evolui.
15. Como visitante, quero manter o foco no controle de expansão, para continuar navegando pelo teclado.
16. Como visitante, quero consultar cursos mesmo sem a camada de animação, para acessar o conteúdo em condições limitadas.
17. Como visitante, quero uma ênfase discreta nas medalhas, para reconhecer as conquistas sem distração repetitiva.
18. Como visitante, quero distinguir ilustração e resultado oficial, para consultar a evidência correta.
19. Como visitante, quero identificar o campo ativo no contato, para preencher com segurança.
20. Como visitante, quero perceber que o envio está em andamento, para evitar acionamentos repetidos.
21. Como visitante, quero preservar o texto diante de um erro, para poder corrigir e tentar novamente.
22. Como visitante, quero receber sucesso somente após confirmação do serviço, para confiar no retorno.
23. Como visitante, quero voltar ao hero com orientação visual e foco adequado, para retomar a navegação.
24. Como visitante, quero trocar de idioma durante a exploração sem efeitos sobrepostos, para continuar no contexto correto.
25. Como visitante com movimento reduzido, quero estados claros sem deslocamentos decorativos, para navegar confortavelmente.
26. Como visitante no celular, quero a mesma clareza sem depender de hover, para usar todos os recursos por toque.
27. Como visitante, quero ler em ambos os temas e com zoom, para adaptar a apresentação às minhas necessidades.
28. Como visitante, quero que a página continue funcionando após redimensionar ou retornar de outra aba, para não encontrar estados incompletos.
29. Como responsável pelo portfólio, quero acrescentar cursos sem ajustar a animação item a item, para manter a seção escalável.
30. Como responsável pelo portfólio, quero revisar capturas e vídeos de cada etapa, para avaliar o resultado real antes de publicar a interface.

## Implementation Decisions

### Contrato visual e ritmo

- Preservar a home e a composição das referências selecionadas. Abrir e visualizar as 11 imagens aprovadas antes de codar; revisar especialmente a referência da seção trabalhada e comparar com capturas da página integrada. Ler descrições ou nomes de arquivos não substitui visualizar as imagens.
- Aproveitar componentes, seleção de projetos, expansão nativa, validação e microinterações existentes. Fazer uma análise do comportamento atual antes de alterar; esta entrega complementa os refinamentos anteriores.
- Reservar passagens de tela inteira à abertura e à troca de idioma. Nas seções, animar margens, arte, contornos, indicadores e filetes. Manter títulos e texto como âncoras estáveis.
- Usar violeta como cor principal do movimento. Menta e dourado suave podem pontuar os detalhes já presentes nas referências, sem competir com a hierarquia. Conferir contraste durante toda a passagem, inclusive no tema escuro.
- Respostas locais: aproximadamente 160–320 ms. Arte e filetes: aproximadamente 450–900 ms, com pequenas defasagens quando houver sequência. São parâmetros iniciais de direção, sujeitos à revisão visual; não impor esperas à leitura ou à interação.
- Entradas decorativas ocorrem uma vez por montagem da página. Sair e voltar à mesma seção não reinicia a entrada. Estados de interação continuam respondendo a cada uso. Sem ciclos decorativos permanentes.

### Coreografia por trecho

| Trecho | Gatilho e sequência | Repouso e interação |
|---|---|---|
| Hero → Projetos | Na primeira chegada à área de leitura de Projetos, uma máscara diagonal curta revela um detalhe violeta na margem, orientado pela fita existente. | Título permanece legível; detalhe termina na composição aprovada. A passagem funciona também ao entrar por âncora. Não expande caminhos da paisagem. |
| Projetos | Ao selecionar uma opção, o marcador desliza até ela e uma borda violeta percorre a margem do painel na direção da seleção. O conteúdo selecionado responde imediatamente. No Atlas, os nós Consulta → Dados do veículo → Procuração recebem ênfase única quando o painel fica visível. | Marcador indica a opção real. Hash e histórico mantêm o contrato atual. Nova seleção cancela a anterior, inclusive a sequência do Atlas. Indicadores não alteram o tamanho do painel. |
| Sobre | Na primeira exposição, a arte da fita é revelada por uma máscara curva, conectando apresentação e três áreas. Um acento discreto acompanha o fim do percurso. | Arte fica na posição aprovada; texto, currículo e demais links estão disponíveis desde o início. |
| Experiência | O filete se revela até cada marco quando o registro entra na área de leitura. O nó ganha cor e o período recebe um realce breve, nessa ordem. | Registros permanecem completos e títulos imóveis. A linha acompanha a altura real dos textos em PT/EN e no celular. |
| Competências | Foco ou hover em um link realça o filete do grupo associado e uma faixa clara sob a tecnologia quando essa relação existir nos dados. | Ao sair do grupo, o realce retorna ao repouso. Não inventar relações entre tecnologias e projetos. Toque permite navegação no primeiro acionamento; nenhum efeito exige um toque preparatório. |
| Formação | Ao abrir a lista complementar, o filete acompanha a altura revelada; uma borda violeta marca o início dos novos itens, sem animar cada curso em uma fila longa. Ao fechar, acompanha a redução. | Foco continua no controle. Instituições, horas, datas e nomes longos mantêm agrupamento e leitura. A expansão nativa continua disponível sem JavaScript. |
| Conquistas | Na primeira exposição, uma luz suave percorre uma vez o contorno das medalhas. Os links oficiais desenham o sublinhado ao foco/hover. | Medalhas voltam ao repouso. Ilustrações são decorativas; links identificam o resultado oficial. Evitar brilho pulsante, flashes e novos comprovantes fictícios. |
| Contato | Um realce lateral acompanha o campo focado. Ao enviar, a seta faz um percurso curto e o estado ocupado recebe indicação textual. O resultado aparece em uma região reservada. | Preservar validação, foco do erro, valores e proteção contra envio duplicado. Sucesso depende da confirmação do backend. A animação não prolonga nem simula o tempo da requisição. |
| Rodapé → Hero | Foco/hover realça o controle. Ao ativar, um detalhe violeta acompanha a resposta e o retorno ao topo termina com foco no título. | A abertura não reaparece. Se o visitante interromper a rolagem, encerrar o acompanhamento e evitar roubar o foco ao fim de um movimento abandonado. |

### Ciclo de vida e acessibilidade

- Usar CSS para estados simples e Web Animations API para sequências canceláveis, aproveitando a stack atual. Nenhuma dependência nova é necessária para esta proposta.
- A camada de movimento observa elementos após montagem; o conteúdo renderizado pelo servidor já nasce legível. Evitar deixar texto oculto aguardando um observador ou um script.
- Estados de entrada: disponível, executando e concluído. Mudança de preferência, redimensionamento incompatível ou navegação interrompe a sequência e resolve para o estado visual correspondente ao conteúdo atual. Não manter máscaras intermediárias ou estilos transitórios após cancelamento.
- Entradas fora da tela ficam suspensas; ao voltar, resolver para repouso se já iniciadas. Não acumular repetições. Desconectar observadores, listeners e animações ao desmontar.
- Preferência por movimento reduzido, inclusive alterada durante uma sequência: cancelar deslocamentos, luzes e revelações; aplicar indicadores e conteúdo final imediatamente. Rolagem de retorno deve ser instantânea nessa preferência.
- Troca PT↔EN cancela movimentos locais antes da navegação. O documento de destino respeita a transição de idioma existente e só inicia entradas locais quando ela terminar. As novas entradas não encobrem nem disputam a abertura.
- Sem captura da rolagem, cursor personalizado ou efeito de paralaxe do mouse. Arte não intercepta ponteiro e não entra na árvore acessível. Foco, semântica de controles e anúncios de estado permanecem funcionais.
- Expansão de Formação mede conteúdo real quando necessário. Recalcular para mudança de largura, fonte e idioma; nunca assumir quantidade fixa de cursos, instituição única ou altura fixa. Sem JavaScript, conservar o comportamento nativo da lista.
- Priorizar transformações e opacidade; limitar máscaras e efeitos à área necessária. Evitar filtros pesados e leituras de layout por quadro. Expansões que mudam a altura precisam ser medidas e avaliadas na página real.

### Ordem de implementação

1. Passagem Hero → Projetos e seleção de projeto, incluindo interrupções, hash e histórico.
2. Filete de Experiência e expansão de Formação com listas extensas e várias instituições.
3. Sobre, Competências e Conquistas, dosando a frequência e a combinação dos movimentos.
4. Contato e retorno ao topo; revisão integral para coerência com abertura e idioma.

Cada fatia termina com evidência integrada e regressões pertinentes antes de avançar. A divisão em tickets será uma etapa posterior; não recriar as issues dos refinamentos já concluídos.

## Testing Decisions

- Ponto principal: jornada na página completa, conforme o aceite já estabelecido. Um bom teste observa seleção, conteúdo, foco, navegação, preservação de dados e término dos efeitos; não depende de nomes internos de classes ou da contagem de quadros.
- Reutilizar os testes de jornada do redesign, refinamentos, formação, hero e idioma. Testes de componente cobrem somente transições difíceis de reproduzir e dados extensos; capturas isoladas não comprovam integração.
- Executar a jornada em 390, 768, 1440 e 1920 px, PT/EN e ambos os temas. Conferir teclado, toque emulado, zoom de 200%, nomes longos e alteração de largura durante animação. Registrar separadamente qualquer validação feita em dispositivo físico.
- Projetos: clicar rapidamente em várias opções; entrar por hash; usar voltar/avançar; sair do Atlas durante a ênfase dos nós. O painel final e o marcador devem representar sempre a última seleção válida.
- Formação: usar fixture com mais de seis cursos, várias instituições, nomes longos e metadados opcionais. Abrir, fechar e reabrir rapidamente; redimensionar durante expansão; validar foco e ausência de recortes. Conferir também a expansão nativa sem JavaScript.
- Ciclo de vida: sair da área visível, retornar, navegar de idioma e alterar movimento reduzido durante os efeitos. Verificar ausência de sobreposição residual, repetição decorativa e conteúdo inacessível.
- Contato: simular serviço lento, erro de validação, falha recuperável e sucesso confirmado. Conferir dados preservados, foco, região de status e envio único. Utilizar transporte simulado; os testes não enviam mensagens reais.
- Regressões: abertura continua manual e encaixa o texto no hero; retorno ao topo não a reabre; transição PT↔EN mantém contexto. Sem JavaScript, verificar a leitura das seções, navegação disponível e formulários conforme o fallback atual, sem prometer envio que ele não suporte.
- Gravar passagem completa em desktop e celular; capturar início, meio e repouso dos efeitos. Comparar repouso às imagens aprovadas e registrar desvios justificados.
- Medir antes/depois no mesmo cenário, hardware, viewport e conteúdo: deslocamentos de layout, tarefas longas e resposta das interações. Não atribuir fluidez ou ganho de desempenho apenas ao build ou aos testes automatizados. Investigar regressões e reduzir efeitos quando necessário.
- Rodar TypeScript, suíte pertinente e build ao integrar. Cobertura anterior e preview aprovado não constituem prova destes novos movimentos. Registrar navegador, cenário e limitações; verificar navegadores adicionais disponíveis para máscaras, expansão e cancelamento.

## Out of Scope

- Implementar animações nesta etapa de especificação, publicar a aplicação ou fazer merge da PR.
- Reconstruir o fundo, criar cena 3D, expandir os caminhos do hero ao longo da rolagem ou mudar a composição da home.
- Redesenhar a abertura e a troca de idioma já aprovadas; entram como linguagem de referência e regressões.
- Atualizar o catálogo de projetos, cadastrar novos cursos ou alterar dados profissionais nesta entrega.
- Reativar o ÆVO ou modificar contratos de backend para produzir efeitos visuais.
- Gerar agora medalhas, ícones e demais assets separados. A produção futura deve seguir as referências, identificar decoração e preservar a procedência dos comprovantes.

## Further Notes

- Especificação principal: https://github.com/Kauerc10/Portifolio-K.R.001/issues/52
- Integração atual: https://github.com/Kauerc10/Portifolio-K.R.001/pull/63
- Refinamentos anteriores: #64, #65 e #66 concluídos; QA integrado #67 ainda aberto. Esta spec descreve a próxima camada de movimento e não encerra a validação pendente.
- Plano de origem: `docs/redesign-ruon/plano-animacoes-secoes.md`.
- Referências visuais aprovadas: `docs/redesign-ruon/imagens-selecionadas/`. A referência de Formação selecionada pelo usuário faz parte da direção; preservar a estrutura escalável ao ampliar os dados.
- Antes de implementar cada fatia, consultar o estado, responsáveis e bloqueios nativos dos tickets relacionados. O rótulo `ready-for-agent` organiza a spec e não demonstra ausência de dependências.
