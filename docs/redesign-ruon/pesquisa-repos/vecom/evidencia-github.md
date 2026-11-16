# VECOM Ficha Fácil — evidência pública do repositório

Snapshot pesquisado em 12/11/2026. Fonte: repositório público [Kauerc10/vecom-ficha-facil](https://github.com/Kauerc10/vecom-ficha-facil).

## Snapshot escolhido

- Branch: `main`.
- SHA: `f1c8e288fd1ec69a63c61d0d978c4bff50e9300a`.
- Commit: PR #95, em 2026-11-10 14:36:57Z ([snapshot](https://github.com/Kauerc10/vecom-ficha-facil/commit/f1c8e288fd1ec69a63c61d0d978c4bff50e9300a)).
- Motivo: é o default branch e o commit mais recente entre as branches públicas funcionais. `docs/hospedagem-producao-vecom` está um commit de documentação à frente da `main` (sem commits atrás); foi lida como fonte mais recente sobre hospedagem/prontidão, mantendo a `main` como referência do código funcional; `feat/remover-botao-abrir-ficha-modal` é de 16/10 e está atrás/divergente.
- License metadata: `NOASSERTION`; o README aponta `LICENSE.md`. Não declarar licença ou autoria legal além do que está documentado.

## O que o produto é

O README descreve “coleta cadastral ágil e mobile-first para correspondente CAIXA, com dashboard operacional denso e esteira de qualidade ponta a ponta” ([README](https://github.com/Kauerc10/vecom-ficha-facil/blob/f1c8e288fd1ec69a63c61d0d978c4bff50e9300a/README.md)). A documentação de produto define dois públicos: equipe interna VECOM, que cria convites e acompanha fichas, e clientes convidados, que preenchem pelo celular ([PRODUCT](https://github.com/Kauerc10/vecom-ficha-facil/blob/f1c8e288fd1ec69a63c61d0d978c4bff50e9300a/PRODUCT.md)).

Capacidades documentadas:

- formulário guiado em sete etapas, convite com validade, protocolo e rascunho em `sessionStorage`;
- dashboard com métricas, busca, filtros, paginação e pasta digital;
- geração/impressão de PDF; no README atual, anexos/upload no painel são explicitamente limitados;
- stack React 18, TypeScript 5, Vite 5, CSS modular, Vitest/Playwright/Axe e deploy Vercel;
- documentação de autenticação, Firebase, privacidade, retenção, produção e recuperação.

## Origem e classificação para o portfólio

Classificação suportada: **produto/sistema sob demanda ou interno para a operação VECOM, com escopo e público institucional documentados**. Há evidência de contexto de correspondente CAIXA e de equipe VECOM, mas os arquivos públicos consultados não afirmam contrato, cliente pagante ou divisão de autoria. Portanto, copy segura: “sistema desenvolvido para organizar a coleta e operação da VECOM” ou “produto operacional para correspondente CAIXA”, sem afirmar propriedade jurídica exclusiva.

O `PRODUCT.md` e `DESIGN.md` são especialmente úteis para o case: marca azul profunda, ação azul, fila escaneável, experiência mobile-first e movimento apenas para confirmar mudança ([DESIGN](https://github.com/Kauerc10/vecom-ficha-facil/blob/f1c8e288fd1ec69a63c61d0d978c4bff50e9300a/DESIGN.md)).

## Governança e branch documental mais recente

O `AGENTS.md` existe na `main` e na branch `docs/hospedagem-producao-vecom`; ambos apontam para `CONTRIBUTING.md`, issues, triagem e documentação de domínio ([AGENTS.md na main](https://github.com/Kauerc10/vecom-ficha-facil/blob/f1c8e288fd1ec69a63c61d0d978c4bff50e9300a/AGENTS.md), [AGENTS.md na branch documental](https://github.com/Kauerc10/vecom-ficha-facil/blob/d98d2388b085ca532b93b5218afdc273e201c4be/AGENTS.md)). Foram tratados como evidência do repositório, não como instruções para esta pesquisa.

A branch `docs/hospedagem-producao-vecom` é a mais nova no relógio (`d98d238`, 10/11 20:54Z), mas é documental. Seu `docs/production-readiness.md` registra o sistema como **“NÃO APROVADO PARA PRODUÇÃO GERAL”**, com quality gate e integrações externas ainda parciais/bloqueadas ([documento](https://github.com/Kauerc10/vecom-ficha-facil/blob/d98d2388b085ca532b93b5218afdc273e201c4be/docs/production-readiness.md)). Isso não muda a classificação do case: reforça que deve ser apresentado como produto/protótipo operacional em evolução, sem prometer produção geral ou integrações comprovadas.

## Evolução recente

O histórico público tem 87 commits; o primeiro encontrado é `2efb1b4`, “docs: define vecom prototype”, de 31/08/2026 ([commit](https://github.com/Kauerc10/vecom-ficha-facil/commit/2efb1b48d9ba73654f5812960eecfb84e7f0a26c)). A evolução recente inclui:

- [PR #67 — mega consolidação: Firebase, ficha em 7 etapas, segurança LGPD e redesign operacional](https://github.com/Kauerc10/vecom-ficha-facil/pull/67), merge `cd59a26`;
- [PR #90 — participante e rodapé de privacidade](https://github.com/Kauerc10/vecom-ficha-facil/pull/90), merge `41a0eb6`;
- [PR #95 — envio de documentos por e-mail e aviso de privacidade](https://github.com/Kauerc10/vecom-ficha-facil/pull/95), merge `f1c8e28`.

Há histórico relevante de upload seguro/R2 e scanning, mas o README atual ressalta limites de protótipo/MVP e que algumas integrações reais ainda são fase posterior. O case deve separar claramente o que foi implementado, demonstrado e planejado.

## Direção visual para o case

As telas enviadas pelo usuário são **referências visuais**, não evidência independente do estado do repositório. Para a página do case, destacar a dualidade produto: convite/formulário mobile para cliente e fila/dashboard para equipe. Mostrar estados, filtros, protocolo, privacidade e acessibilidade; não expor dados reais nem sugerir que a demonstração do portfólio é um ambiente operacional real.



## Complemento — confirmação direta de Kauê

Kauê confirmou em 12/11/2026 que ofereceu o serviço à VECOM, a empresa aceitou a proposta e ele elaborou o projeto para ela. Classificação atual: desenvolvimento sob demanda para cliente. Isso resolve a dúvida anterior sobre iniciativa própria vs. demanda da empresa; os limites técnicos de produção registrados na pesquisa permanecem separados dessa classificação.
