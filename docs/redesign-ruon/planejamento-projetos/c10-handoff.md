# C10 — Entrega integrada para revisão local

14/11/2026. Escopo: home com palco de cinco projetos e páginas dedicadas. A referência é a composição editorial aprovada, com entradas próprias, troca pelas setas e repouso. A aprovação da interface não foi tratada como autorização de publicação.

## Correções desta revisão

1. Ao trocar um projeto na home, o hash acompanha a seleção por `history.replaceState`, sem criar passos extras no histórico ou deslocar a rolagem. Corrige o retorno pelo botão Voltar do navegador quando a visita começou pelo link direto de outro projeto. Teste de regressão em `projects-motion.test.tsx` e `scripts/qa/c10-history.cjs`.
2. Movimento reduzido desativa também as transições entre documentos e as animações dos snapshots. Evita a sobreposição momentânea da página anterior que apareceu na primeira revisão visual das capturas. A transição normal permanece disponível.
3. O link comercial público da CKF permanece na página dedicada, fora do card, conforme último aceite.

## Resultado local

| Verificação | Evidência / resultado |
|---|---|
| TypeScript | Sem erros; build final também executou validação de tipos |
| Testes | 74 passaram em 19 arquivos; `node node_modules/vitest/vitest.mjs run --exclude '.next/**'` |
| Build de produção | Next 15.5.23, saída 0, 23 páginas estáticas; ID `wTZuxVVCHObriqe0YPecA` |
| Home e cinco cases | PT desktop 1440 × 1000 e EN celular emulado 390 × 844; refresh, metadata, galeria, Escape e foco, volta à home, nova aba e histórico passaram |
| Fallbacks | Storage bloqueado, mídia indisponível, sem WAAPI, viewport 1280 × 600, movimento reduzido e tema escuro passaram |
| Movimento normal | Entrada, teclado, retorno ao repouso e pausa fora da viewport passaram; gravação disponível |
| Regressão do histórico | Selecionar VECOM a partir de hash VioDigital, abrir case, voltar e atualizar mantém VECOM |
| Sem JavaScript | Links para os cinco cases continuam disponíveis |
| Links externos | Sete destinos responderam HTTP 200, incluindo o site público da CKF |

Matriz final executada sobre o build local em **http://localhost:3067**. O servidor de desenvolvimento em 3064 permanece disponível. Instâncias intermediárias de produção em 3065 e 3066 foram encerradas.

Build isolado em `.next/qa-production-build`, com cópia de src/css/config, public e node_modules compartilhados por junction, cache de webpack desativado apenas nessa cópia. A primeira tentativa não tinha css na cópia; corrigido o preparo. O carregador Google Fonts apresentou respostas incompatíveis em duas tentativas; builds posteriores concluíram. O preload de diagnóstico usado nas tentativas finais apenas registra URLs incompatíveis e devolve a resposta original, sem substituir fontes ou bytes. Não houve alteração de dependências para o build.

## Evidências

- `docs/redesign-ruon/evidence/c10-integrated/results.json`: matriz final e versão exata do Chromium.
- `final-regression.json`: histórico, refresh e fallback sem JS no build final.
- `public-links.json`: URLs externas e respostas.
- Capturas PT/EN por case, tema escuro e fallbacks; `normal-motion.webm`.
- Scripts reproduzíveis: `scripts/qa/c10-integrated.cjs`, `c10-history.cjs` e `c10-links.cjs`.

## Conteúdo e procedência

Revisados os rótulos de natureza: VioDigital próprio/open source; Atlas próprio com origem na demanda do cartório; VECOM sob demanda de Blumenau; DocFácil próprio/RUON; CKF sob demanda de Itajaí com duas entregas. A história de origem Vio e a evolução do Formatador/API Detran para o Atlas seguem o relato do autor. Interfaces VECOM e CKF são as capturas preparadas anteriormente com registros de demonstração; ficha/PDF/QR no palco são ilustrações, sem processamento real. Nenhuma nova captura de operação autenticada, dado de cliente ou promessa numérica de resultado foi acrescentada.

## Limites e estado

- Testes executados em Chromium headless no Windows, incluindo emulação de celular. Safari, Firefox e aparelhos físicos não foram certificados.
- Amostra atual de um segundo da troca: 36 frames, maior intervalo de 50 ms e nenhum intervalo acima de 50 ms. É uma amostra desta máquina compartilhada, não promessa de 60 fps ou comparação antes/depois. Não existe medição histórica equivalente da pilha anterior para demonstrar ganho quantitativo; essa comparação permanece não comprovada.
- HTTP 200 confirma disponibilidade do destino, não funcionamento das operações autenticadas de VECOM ou de serviços externos. Esses sistemas não foram exercitados nesta revisão do portfólio.
- Não há vídeo novo nesta fatia; a evidência em vídeo é gravação de QA das animações nativas.
- GitHub #85 foi consultada em leitura. Estado/bloqueios remotos não foram alterados; não foi presumida publicação ou encerramento das issues.
- Sem commit/push, merge, deploy ou certificação de produção remota nesta entrega. Pronto para revisão de Kauê no build local; aceite e publicação são etapas distintas.
