# VioDigital / VioWeb — evidência pública do repositório

Snapshot pesquisado em 12/11/2026. Fonte: repositório público [Kauerc10/VioWeb](https://github.com/Kauerc10/VioWeb).

## Snapshot escolhido

- Branch: `main`.
- SHA: `002e0c8f7f2cfeac997997def7100407f985177d`.
- Commit: merge do PR #26, em 2026-11-12 12:53:24Z ([snapshot](https://github.com/Kauerc10/VioWeb/commit/002e0c8f7f2cfeac997997def7100407f985177d)).
- Motivo: é o default branch e está à frente da branch `feat/spec-0003-browser-wasm-privacy` (SHA `ee1aa6e`, 12:51:20Z), que foi incorporada; `feat/vioweb-core-implementation` é anterior (11/11). Não há branch funcional pública mais nova que `main`.
- Metadata: descrição oficial “Verificador e decodificador offline...”; licença declarada MIT no metadata e em [`LICENSE`](https://github.com/Kauerc10/VioWeb/blob/002e0c8f7f2cfeac997997def7100407f985177d/LICENSE).

## O que o produto é

O README define o VioWeb como “100% gratuito e Open Source” e destinado a computadores de cartórios, despachantes, empresas e cidadãos ([README](https://github.com/Kauerc10/VioWeb/blob/002e0c8f7f2cfeac997997def7100407f985177d/README.md)). A motivação declarada é “De um Cartório para a Comunidade”: resolver a conferência de documentos VIO no computador com PDF, colagem `Ctrl+V` e webcam, sem depender de celular ou serviço pago.

O repositório documenta:

- validação criptográfica offline de QR/envelopes VIO e CIN;
- 161 templates, handlers por documento, máscaras e cópia rápida para sistemas notariais;
- interface web, scanner de webcam, PWA/offline e catálogo SEO;
- desde o ADR 0003, processamento público local em Pyodide/WebAssembly, Web Worker e `connect-src 'self'` ([ADR 0003](https://github.com/Kauerc10/VioWeb/blob/002e0c8f7f2cfeac997997def7100407f985177d/docs/adr/0003-browser-wasm-pyodide-validation.md)).

## Governança consultada

O `AGENTS.md` existe no snapshot e orienta leitura de `CONTEXT.md`, engenharia reversa VIO e ADRs ([AGENTS.md](https://github.com/Kauerc10/VioWeb/blob/002e0c8f7f2cfeac997997def7100407f985177d/AGENTS.md)). Foi usado aqui como evidência de contexto do próprio projeto, não como instrução para alterar este portfólio.

## Origem e classificação para o portfólio

Classificação suportada: **projeto open source público, nascido de uma necessidade prática de cartório e expandido para a comunidade**. O README e `CONTRIBUTING.md` afirmam essa finalidade e dão crédito explícito à biblioteca `digital-document-checker` de Helvio Junior como ponto de partida ([CONTRIBUTING](https://github.com/Kauerc10/VioWeb/blob/002e0c8f7f2cfeac997997def7100407f985177d/CONTRIBUTING.md)).

Isso não prova, por si só, contrato, exclusividade ou autoria legal individual. Para a copy do case, usar “projeto open source independente / construção e expansão do Kauê a partir de uma base comunitária”, evitando “feito do zero” ou “produto de cliente”. Q7 continua sem fatos sobre eventual vínculo comercial; perguntar ao usuário somente se quiser registrar esse vínculo.

## Evolução recente

Os ~30 commits mais recentes mostram uma sequência coerente de produto: núcleo offline, segurança/CI, leitura PDF e webcam, Pyodide no navegador, PWA, CSP, páginas dedicadas, mobile e refinamento visual. Exemplos fixados:

- [PR #7 — VioWeb Core](https://github.com/Kauerc10/VioWeb/pull/7), merge `28dcb25`, 11/11;
- [PR #26 — validação 100% no navegador, transparência legal e base open source](https://github.com/Kauerc10/VioWeb/pull/26), merge `002e0c8`, 12/11;
- [commit mobile](https://github.com/Kauerc10/VioWeb/commit/cf8e1764389c5ae993e7ab71edfd5b9e2d8f9a79), [scanner/webcam](https://github.com/Kauerc10/VioWeb/commit/c565f569998b6ba588c1b2a296d6ec34978db1f7), [Pyodide](https://github.com/Kauerc10/VioWeb/commit/bac5de6c194122940615d7f75bb14927695e6e99).

O primeiro commit público encontrado na história consultada é `649914c`, de 10/11/2026 ([commit](https://github.com/Kauerc10/VioWeb/commit/649914c6c536d3c0fdb84fa87ec6679d46975bb6)); portanto o repositório atual tem histórico curto e recente.

## Direção visual para o case

Usar a referência visual enviada pelo usuário apenas como **referência de estilo**, não como prova de estado do GitHub. A narrativa mais forte é: problema notarial real → privacidade/offline → motor técnico → interface acessível e comunitária. O case pode mostrar QR/scan, selo de validação, fluxo local e contribuição open source sem expor documentos reais.

