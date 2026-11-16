# R02 — Experiência: prova da seção piloto

11/11/2026 · issue #65 · branch `codex/refine-pilot` · base `7bd40e8`.

A faixa aprovada agora compõe a borda inferior da seção real de Experiência. Curva à esquerda e terreno baixo preservam a referência 06; título e introdução conduzem a leitura antes da trajetória. Conteúdo factual e ordem semântica intactos. Títulos das empresas passam de máximo 2.8rem para 2.5rem (−10.7%) e marcadores de 16px para 14px; texto, períodos e controles não foram reduzidos. Em até 900px a leitura segue uma coluna e a curva recebe recorte próprio. Sem terraços, medalhas, nova animação ou mudança global.

## Verificação

- Produção local Next 15.5.23, Chromium 156 headless no Windows; 390/768/1440/1920 × PT/EN × claro/escuro. Todos os 16 estados carregaram a arte e mantiveram a linha do tempo acima dela, sem rolagem horizontal. Valores observados em `matrix.json`.
- Capturas representativas anexas: 390 EN escuro, 768 EN escuro, 1440 PT claro e 1920 EN escuro. Inspeção visual: leitura livre, paisagem contínua na borda, sem retângulo branco no tema escuro ou franja colorida evidente no tamanho entregue. A máscara apenas suaviza a borda alpha da fonte; a pedra continua intencionalmente clara nos dois temas.
- Corpo: contraste 6.81:1 claro / 10.57:1 escuro. Violeta dos cargos: 6.72:1 / 7.43:1. Valores calculados pelos tokens computados sobre a superfície sem imagem sob o texto.
- Falha das duas imagens simulada por abort de requests: empresas, funções, períodos e contribuições continuam disponíveis; nenhum overflow em 390px. Fonte raiz a 200% em EN/390px também sem overflow. Não equivale a prova em dispositivo físico ou todos os mecanismos de zoom.
- Decoração fora da árvore acessível (`aria-hidden`, alt vazio), sem interação ou foco. Nenhuma animação adicionada; matrix executada com movimento reduzido. Ordem DOM/visual preservada.
- `npm test -- --reporter=dot`: 11 arquivos, 49 testes passaram.
- `npm run build`: compilação, tipos e geração estática passaram.
- Detector Impeccable sobre componente e módulo CSS: `[]`.

Os testes existentes cobrem comportamento; não foram criados testes de coordenadas de CSS. Capturas e medidas são evidência desta revisão, não autorização de publicação nem aprovação estética automática. Integração com a abertura refinada e jornada completa cabe à revisão conjunta posterior. Nenhum push ou fechamento de issue nesta fatia.
