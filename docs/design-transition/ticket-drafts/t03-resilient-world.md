# RASCUNHO T03 — Carregar a paisagem interativa com pausa e recuperação

**Estado: proposto, ainda não publicado.** Os IDs Txx não são números de issue.

## What to build

Carregar a paisagem no hero sem bloquear conteúdo e preservar a navegação quando GPU, rede ou carregamento falharem.

Contexto: portfólio existente de Kauê Ruon Cardoso; preservar a referência aprovada, navegação HTML e os contratos públicos. Esta tarefa não autoriza publicação.

## Acceptance criteria

- [ ] Manter o poster até o primeiro frame correto; usar um único runtime Three e um único loop local.
- [ ] Cobrir poster, loading, ready, paused e fallback sem spinner ou reinício infinito.
- [ ] Suspender fora da viewport/aba oculta; descartar recursos, callbacks e listeners ao desmontar, inclusive no Strict Mode.
- [ ] Preferência reduzida e Save-Data oferecem modo estático; mudança de preferência durante loading invalida resultados antigos.
- [ ] Sair do hero durante loading não inicia GPU/RAF fora de vista; reativação permitida espera visibilidade.
- [ ] Aplicar qualidade/DPR e degradação única da especificação; registrar medições e fallback sem esconder links.
- [ ] Documentar contratos de âncoras, picking e ativação antes de integrar os caminhos.

## Blocked by

T02

## Regiões de referência

W01–W11; base de U10–U12; ver o mapa e a imagem juntos.

## Referências de execução

- [Especificação canônica](https://github.com/Kauerc10/Portifolio-K.R.001/blob/docs/portfolio-design-transition/docs/design-transition/specification.md)
- [Plano técnico](https://github.com/Kauerc10/Portifolio-K.R.001/blob/docs/portfolio-design-transition/docs/superpowers/plans/2026-10-27-interactive-portfolio.md)
- [Referência visual aprovada](https://github.com/Kauerc10/Portifolio-K.R.001/blob/docs/portfolio-design-transition/docs/design-transition/assets/approved-desktop.png)
- [Diagrama e instruções por elemento](https://github.com/Kauerc10/Portifolio-K.R.001/blob/docs/portfolio-design-transition/docs/design-transition/reference-map.md)

