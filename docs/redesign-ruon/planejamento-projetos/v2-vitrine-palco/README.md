# Referências — vitrine em palco

Quatro imagens conceituais geradas com **imagegen integrado**, usando a corujinha azul original e a composição DocFácil aprovada como referências. Mesmo conteúdo, mesmo projeto e somente setas laterais. Não são telas implementadas nem provas de animação.

| Opção | Composição | Movimento proposto |
|---|---|---|
| [A — Editorial](imagens/a-editorial.png) | Texto à esquerda, documento amplo à direita, corujinha no apoio mineral. Próxima da identidade atual. | O apoio permanece como referência espacial; papel inclina e abre, texto se recompõe e o mascote entra antes de repousar. Na troca, o documento cede lugar ao material do próximo projeto. |
| [B — Folha contínua](imagens/b-folha-continua.png) | Uma folha curva atravessa o palco e sobe para formar o documento. Corujinha integrada à dobra. | A dobra percorre o palco no sentido da seta: a folha pode virar documento Atlas, revelar o interior da pasta VECOM ou se reorganizar na dupla de telas CKF. É uma ligação visual proposta, sem sugerir integração entre os produtos. |
| [C — Camadas suspensas](imagens/c-camadas-suspensas.png) | Papéis em profundidades diferentes, criando um percurso visual da pergunta ao documento. | As camadas se separam, giram de forma coordenada e voltam a se reunir no novo objeto. A corujinha acompanha o primeiro plano e repousa; texto troca sem competir com o movimento. |
| [D — Documento como palco](imagens/d-documento-palco.png) | Título central e documento como superfície panorâmica na base do card. | A superfície se desenrola, recebe a pergunta e se estabiliza. Na saída, sua borda sobe e conduz a revelação do próximo cenário, preservando a moldura externa. |

**Escolha vigente aprovada por Kauê:** A — editorial, com troca lateral e animações próprias dos cinco projetos, já integrada à home e validada localmente. B foi a experiência inicial e ficou preservada como histórico. [Evolução da prova](prova-de-movimento.md) · [Entrega integrada C10](../c10-handoff.md).

## Limites para a próxima etapa

- Toda entrada termina em repouso. Sem troca automática, contador, pontos, miniaturas ou índice de nomes.
- Cinco cases em ciclo: VioDigital, VECOM, Atlas, DocFácil e CKF; duas entregas continuam dentro da CKF.
- Responder a novos comandos durante o movimento, sem fila de animações. Não deformar texto ou manter dois projetos legíveis concorrendo.
- Conteúdo explica problema e solução; CTA abre a página dedicada.
- A versão mobile será recomposta a partir da direção escolhida, não apenas reduzida. Setas + gesto horizontal; scroll vertical livre.
- Movimento reduzido, teclado, leitor de tela, mídia indisponível e navegação nativa entram na especificação. Técnicas e duração final dependem da prova de movimento.
- A implementação atual está integrada à home local; publicação remota continua sendo uma etapa separada.

[Decisões do grill](brief.md) · [Prompts completos](prompts.md)


## Estado atual — aprovação editorial e cinco projetos

Kauê aprovou a composição editorial e a coreografia DocFácil/VECOM, incluindo a correção do flash entre chegada e apresentação. A direção B permanece apenas como experimento histórico. Após autorização para continuar, a rota experimental foi ampliada para cinco projetos com as mesmas regras: setas, ciclo contínuo, gesto horizontal, saída até a borda, apresentação finita e repouso.

Para facilitar a comparação com a prova aprovada, o experimento inicia em DocFácil; a sequência local é DocFácil → VECOM → VioDigital → Atlas → CKF. A ordem editorial final da home continua prevista em VioDigital → VECOM → Atlas → DocFácil → CKF e será aplicada na integração.

- VioDigital: leitura ilustrativa do QR, informações reveladas em sequência e confirmação. Asset nativo anterior reutilizado; QR decorativo.
- Atlas: documento de veículo e sequência Formatar → Conferir → Organizar, com confirmação. Mantém documentos e conector da referência selecionada.
- CKF: site e sistema real em camadas, seguidos de PDF ilustrativo. Capturas do sistema usam dados fictícios; duas entregas para um cliente de Itajaí.

Validação: TypeScript, ciclo e retorno, comandos interrompidos, teclado/links nativos disponíveis, tamanho comum, repouso sem animações, desktop 1440 × 1000, celular 390 × 844 e inglês com movimento reduzido. Script `scripts/qa/stage-five.cjs`, capturas e resultado em `docs/redesign-ruon/evidence/stage-five/`. O teste editorial de dois projetos documenta o contrato anterior e precisa ser usado somente na versão histórica correspondente. A rota atual é validada pelo teste de cinco projetos.

Aguardando avaliação visual das três novas apresentações. A home ainda usa sua vitrine anterior; não houve push ou deploy desta prova. Tentativa de consultar issue #84 via gh retornou HTTP 401 nesta rodada; estado remoto não foi presumido nem modificado.

## Integração local na home — 14/11/2026

Após aprovação dos cinco projetos e autorização para continuar, a home passou a montar o palco na ordem VioDigital → VECOM → Atlas → DocFácil → CKF. Removidos índice de nomes e controle de leitura rápida da vitrine empilhada, conforme decisões do grill. Somente setas permanecem como controles visíveis; gesto horizontal e teclado também funcionam.

O componente compartilha o movimento aprovado com a rota experimental. Na home, não exibe título de experimento ou instruções técnicas. Cada link de case registra a posição de retorno; hashes canônicos e aliases antigos selecionam o projeto correspondente. Os títulos e links dos cases são nativos; sem JavaScript há links para os cinco cases. Sessão guarda a seleção, respeitando hash explícito. A apresentação pausa fora da viewport e com a aba oculta. Falta de WAAPI usa troca estática.

Validação: TypeScript; 74 testes em 19 arquivos; 15 percursos home/case/retorno no navegador (5 em desktop PT, 5 em mobile PT, 5 em desktop EN), aliases, overflow e ausência de erros. Smoke com movimento normal, captura de tema escuro e links sem JS. Evidências em `docs/redesign-ruon/evidence/stage-home/`; scripts `stage-home.cjs` e `stage-home-smoke.cjs`. Testes antigos de pilha/leitura rápida atualizados para o comportamento aprovado. Não foi feito build de produção ou publicação nesta integração local. Aguarda avaliação na home real.

Ajuste aprovado: link público da CKF fica somente na página dedicada, no botão 'Abrir o site da CKF' da abertura. Removido do card da vitrine. Navegação home → case → retorno, destino e abertura em nova aba conferidos no navegador; TypeScript passou.

Revisão integrada e build local concluídos após os últimos aceites: [entrega C10](../c10-handoff.md). Build para revisão em http://localhost:3067/pt-BR#projetos. O histórico acompanha a seleção e movimento reduzido elimina snapshots entre páginas. Sem publicação remota.

## Ajuste desktop após preview

Título e card passam a compartilhar o enquadramento da tela: cabeçalho em uma linha quando há largura, espaçamento vertical menor e altura do palco vinculada à altura útil do viewport. Tipografia e escala das artes são proporcionais; a grade interna permite centralizar a arte sem conservar uma linha mínima de 530 px em cards menores. A distância de saída considera a escala da cena para preservar a saída completa pela borda. Regras restritas à home a partir de 1000 px de largura.

Verificação em 1920 × 1080, 1440 × 900, 1366 × 768 e 1280 × 600, com os cinco projetos: título visível, card inteiro acima do limite inferior da tela, CTA e área da arte contidos e sem overflow horizontal. Script `stage-viewport.cjs`, capturas e resultados em `docs/redesign-ruon/evidence/stage-viewport/`. TypeScript e smoke de navegação com movimento normal também verificados.

15/11/2026: ampliado o palco nas laterais removendo o recuo interno adicional de 1,9 rem na home desktop. As bordas esquerda e direita do card agora coincidem com as do cabeçalho. Conferência em 1920 × 1080, 1440 × 900 e 1366 × 768: diferença de 0 px nas duas bordas, altura anterior preservada e sem overflow. Evidências: stage-viewport/alignment.json e alignment-1440.png.
