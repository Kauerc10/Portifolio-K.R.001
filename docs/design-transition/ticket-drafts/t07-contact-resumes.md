# RASCUNHO T07 — Concluir contato e acesso aos currículos com estados reais

**Estado: proposto, ainda não publicado.** Os IDs Txx não são números de issue.

## What to build

Permitir abrir os currículos atualizados, copiar ou usar o e-mail e enviar uma mensagem com confirmação real, preservando o texto em caso de falha.

Contexto: portfólio existente de Kauê Ruon Cardoso; preservar a referência aprovada, navegação HTML e os contratos públicos. Esta tarefa não autoriza publicação.

## Acceptance criteria

- [ ] PDF geral é o padrão e mantém a URL histórica; versões Desenvolvimento/Automação e Suporte são identificadas por foco.
- [ ] Formulário tem labels associados, estados idle/submitting/success/error e prevenção de envio duplicado.
- [ ] Erros de rede, resposta inválida, serviço indisponível e 429 preservam os campos e mostram recuperação/e-mail.
- [ ] Manter payload, proteção antispam e chave no servidor; testes mockam o transporte e não enviam mensagem real.
- [ ] Clipboard informa sucesso apenas após concluir a cópia; em recusa oferece e-mail visível/selecionável e mailto.
- [ ] Preenchimento por assistente tem integração controlada, sem desalinhar estado React; formulário funciona sem loaderDone e e-mail funciona sem JS.

## Blocked by

T02

## Regiões de referência

U03/U09; seção Contato e Footer; ver o mapa e a imagem juntos.

## Referências de execução

- [Especificação canônica](https://github.com/Kauerc10/Portifolio-K.R.001/blob/docs/portfolio-design-transition/docs/design-transition/specification.md)
- [Plano técnico](https://github.com/Kauerc10/Portifolio-K.R.001/blob/docs/portfolio-design-transition/docs/superpowers/plans/2026-10-27-interactive-portfolio.md)
- [Referência visual aprovada](https://github.com/Kauerc10/Portifolio-K.R.001/blob/docs/portfolio-design-transition/docs/design-transition/assets/approved-desktop.png)
- [Diagrama e instruções por elemento](https://github.com/Kauerc10/Portifolio-K.R.001/blob/docs/portfolio-design-transition/docs/design-transition/reference-map.md)

