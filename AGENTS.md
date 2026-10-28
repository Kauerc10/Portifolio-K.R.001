# Agent instructions

## Agent skills

### Issue tracker

Issues e especificações ficam no GitHub de `Kauerc10/Portifolio-K.R.001`. Consulte `docs/agents/issue-tracker.md` para operações e dependências entre tarefas.

### Triage labels

Usar os cinco papéis padrão de triagem: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human` e `wontfix`. Consulte `docs/agents/triage-labels.md`.

### Domain docs

Single-context: vocabulário em `GLOSSARY.md` na raiz e decisões em `docs/adr/`, criados quando necessários. Consulte `docs/agents/domain.md` antes de explorar a área relevante.

## Design transition

A referência visual aprovada e a especificação atual estão em `docs/design-transition/README.md` e `docs/design-transition/specification.md`. O plano de implementação está em `docs/superpowers/plans/2026-10-27-interactive-portfolio.md`.

Consulte esses documentos antes de alterar a interface. A proposta preliminar em `docs/superpowers/specs/2026-10-27-portfolio-design.md` foi superada. Aprovação de design ou planejamento não autoriza publicação.

Para localizar os elementos da imagem, leia `docs/design-transition/reference-map.md` junto com a referência original. O diagrama usa IDs U01–U16 para HTML e W01–W11 para cena/arte; `reference-map.json` contém coordenadas 2D aproximadas, não medidas CSS ou geometria 3D. O traçado laranja acompanha apenas as faixas roxas visíveis; o trecho oculto não está desenhado e não deve ser tratado como geometria comprovada.

Os tickets T01–T11 foram aprovados e publicados como issues #36–#46. Consulte `docs/design-transition/ticket-breakdown.md`, `ticket-proposal.json` e `ticket-numbers.json` para os vínculos. Os arquivos em `ticket-drafts/` são cópias locais de consulta, não autorização para recriar issues. Antes de iniciar, conferir estado, responsáveis e bloqueios nativos no GitHub; `ready-for-agent` não significa ausência de bloqueios.
