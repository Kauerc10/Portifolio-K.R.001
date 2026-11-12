# Evidências — coreografia das seções (#68)

## Escopo e método

Implementação em `codex/section-motion-68`, PR #74, sobre a base `e948c7e` da PR #63. As onze referências de `imagens-selecionadas` foram visualizadas antes da implementação. A home continua usando sua arte e composição; as novas passagens ocupam ornamentos e margens das seções.

Scripts nesta pasta executam a jornada contra um servidor Next em build de produção. O transporte do contato é interceptado no navegador: nenhuma mensagem real é enviada. Os scripts aceitam URL e destino como argumentos; `PLAYWRIGHT_MODULE` permite apontar para uma instalação local do Playwright.

- `journey.cjs`: quatro larguras (390/768/1440/1920), dois idiomas, dois temas e duas preferências de movimento: 32 combinações; acrescenta duas jornadas sem JavaScript. Verifica seleção rápida, hash/histórico, foco, validação, erro de envio, dados preservados, cancelamento e retorno ao hero. Grava passagens e repouso nas larguras 390 e 1440.
- `lifecycle.cjs`: Chrome e Edge, 390/1440; abertura manual e encaixe, redimensionamento, preferência dinâmica, troca de idioma, zoom de 200% e retorno interrompido. O menu móvel é aberto para alcançar o seletor de idioma.
- `measure.cjs`: três percursos em 390 e três em 1440, mesma máquina e navegador, fontes prontas, espera de 950 ms entre seções. Registra CLS durante o percurso, tarefas longas e percentil 95 do intervalo entre frames.

O baseline `before.json` foi obtido antes de integrar os movimentos, com build de produção da base de trabalho `ecd46fd`. As medidas começam depois de carregar a página; não medem o carregamento inicial nem constituem um benchmark de dispositivos móveis reais.

## Resultado da rodada final

Código validado: `bb58a60` (os commits seguintes acrescentam documentação/evidências). Build de produção e TypeScript passaram. Vitest: **68 testes em 16 arquivos**, sem avisos de atualização fora de `act`.

| Verificação | Resultado |
|---|---|
| Matriz integrada Chrome | 32/32 combinações; sem overflow ou erros de execução |
| Sem JavaScript | 2/2 idiomas; todas as seções e quatro projetos acessíveis |
| Ciclo de vida Chrome/Edge | 4/4; abertura manual, encaixe, resize, idioma, zoom 200%, interrupção e movimento reduzido |
| Cancelamento do filete | Estilo computado em repouso: `transform: none` após preferência dinâmica |
| Baseline: seis percursos | CLS 0; zero tarefas longas; intervalo entre frames P95 de 16,8 ms |
| Final: seis percursos | CLS 0; zero tarefas longas; intervalo entre frames P95 de 16,8–16,9 ms |
| Bundle informado pelo Next | First Load JS da página: 118 kB → 120 kB |

A diferença de 0,1 ms no intervalo entre frames fica dentro da variação destas execuções. Não foi observado custo relevante neste percurso; isso não comprova desempenho em todos os dispositivos. Dados completos em [antes](before.json), [depois](after.json), [jornada](journey.json) e [ciclo de vida](lifecycle.json).

Capturas de repouso e passagem foram inspecionadas e comparadas às referências aprovadas. Exemplos: [Projetos em desktop](desktop-projects-rest.png), [fita de Sobre durante a passagem](desktop-about-passage.png), [Conquistas em repouso](desktop-achievements-rest.png) e [Contato em celular](mobile-contact-rest.png). Gravações: [desktop](desktop.webm) e [celular](mobile.webm). O conjunto completo de quadros está na pasta local de visualizações da sessão, em `section-motion-final`.

## Revisão em dois eixos

**Standards:** nenhuma violação documentada encontrada. Corrigidos código morto no acompanhamento do retorno e `will-change` permanente no marcador. O acompanhamento possui limite de duração e é cancelado por interação, navegação e preferência. A observação de que reativar movimento deveria repetir uma entrada já resolvida foi rejeitada: a spec exige uma entrada por montagem, inclusive quando resolvida imediatamente com movimento reduzido.

**Spec:** preservados títulos, dados, links oficiais e expansão nativa. A suspeita de que cancelar a linha de Experiência ou o filete de Competências os deixaria em escala zero não corresponde ao CSS de repouso: ambos têm transformação normal fora da animação. O teste de ciclo de vida verifica também o estilo computado após interrupção. O repouso da luz nas medalhas é fora do asset, por intenção. Ajustados sequência filete → nó → período, máscara da fita e recorte da passagem de luz ao próprio SVG. A continuidade Hero → Projetos é um detalhe diagonal de margem inspirado na fita; não cria geometria nova na paisagem.

## Limites

Chrome e Edge são dois navegadores do mesmo motor Chromium. Não foi feita validação em Safari ou Firefox, nem em telefone físico. Toque e larguras de celular são emulados. Certificados, cursos e projetos novos não foram cadastrados; a lista extensa é coberta com fixtures de instituições e metadados variados. O backend real de contato e seus provedores não fazem parte desta validação de movimento.

A PR é empilhada sobre a PR #63. Marcar a PR de movimento como pronta não faz merge nem publica a aplicação em produção. QA anterior #67 e spec geral #52 conservam seus próprios critérios e estados.
