# Pesquisa de repositório — DocFácil

Data da consulta: 2026-11-12. Consulta somente leitura, com `gh` autenticado.

## Branch e proveniência

- Repositório: [`Kauerc10/docfacil`](https://github.com/Kauerc10/docfacil) (público; README informa copyright © 2026 RUON e licença própria; não tratar isso como prova isolada de autoria).
- Branch padrão: `main`.
- Último ponteiro funcional observado: `feat/abacatepay-real-billing`, SHA `06bff176f97093a78bdb8ef6cd17fd3013d4cf59`, 2026-10-20. Selecionado como branch mais atualizada com entrega de produto (billing), embora a descrição pública de referência esteja na `main`.
- Estado integrado de referência: `main`, SHA `e350ff740f3eb04923a956024e3bcae3738b11e0`, 2026-09-25.

## O que o repositório comprova

- [README na main](https://github.com/Kauerc10/docfacil/blob/e350ff740f3eb04923a956024e3bcae3738b11e0/README.md) descreve catálogo de contratos, declarações e procurações em português, preenchimento guiado, prévia e PDF; identifica o produto como “um produto da RUON”.
- O fluxo disponível usa nove modelos versionados, conta Firebase, gestão de documentos e compra avulsa/assinatura Pro; backend controla autorização, geração e armazenamento privado.
- O README explicita que o piloto de criação documental por IA está em branch separada e **não faz parte da main nem está liberado**.
- [PRODUCT.md](https://github.com/Kauerc10/docfacil/blob/e350ff740f3eb04923a956024e3bcae3738b11e0/PRODUCT.md) define público de pessoas físicas no Brasil, propósito de converter situações cotidianas em PDFs formais por perguntas simples, posicionamento “Documento difícil? Nunca mais.”, mascote Corujinha azul e princípios de transparência, privacidade e mobile-first.
- Não há `AGENTS.md` na árvore da `main` consultada.
- A documentação da branch selecionada [feat/abacatepay-real-billing/README.md](https://github.com/Kauerc10/docfacil/blob/06bff176f97093a78bdb8ef6cd17fd3013d4cf59/README.md) retém uma identidade diferente da integrada na main: chama o produto de K-HUB Soluções Digitais e descreve a direção “Concierge Digital + Ateliê de Documentos”, stack Next 16/Prisma/NextAuth e GSAP ScrollTrigger. Não há `AGENTS.md` nessa branch e não há `PRODUCT.md` nela. Portanto, a branch de billing é evidência de evolução técnica de cobrança, mas não substitui a identidade editorial integrada da `main`.

## Histórico observado

Na `main`, os marcos recentes incluem apresentação do piloto de IA (#42, 25/09), migração de marca/contatos para RUON (#40), selo RUON (#39), correções de autenticação/backend (#38), billing Mercado Pago (#33–35) e landing comercial com a Corujinha e design system (#32). A branch mais nova `feat/abacatepay-real-billing` concentra endurecimento de cobrança e não deve ser confundida com a experiência pública já integrada na `main`.

## Classificação Q7 para o portfólio

- Classificação sustentada: **produto próprio da RUON / produto digital comercial em evolução**, com escopo, marca e decisões de produto documentados no próprio repositório.
- Contribuição que pode ser apresentada: produto, UX/landing, motor de documentos, PDF server-side, autenticação, privacidade, billing e evolução técnica; IA deve aparecer apenas como piloto não liberado se for mencionada.
- Confiança: **alta** para vínculo do produto à RUON e escopo; média para atribuir cada contribuição individual exclusivamente ao Kaue, pois o histórico não é prova de autoria única.
- A Corujinha e a direção visual azul já foram aprovadas no planejamento. O vínculo do produto à RUON é explícito na documentação integrada; a classificação acima se apoia nessa evidência, sem transformar a leitura dos commits em prova de autoria individual exclusiva.

## Comparação entre as linhas de trabalho

A API de comparação confirma que a branch `feat/abacatepay-real-billing` divergiu da `main`: 110 commits à frente e 12 atrás. Portanto, não é apenas uma atualização de cobrança aplicada sobre a versão integrada; contém uma linha técnica distinta, com stack e documentação próprias. Foram consultadas ambas, preservando a identidade das imagens fornecidas e sem afirmar que o deploy público corresponde à branch de billing. A presença de configurações de pagamento não comprova a integração externa funcionando.

Não foram copiados segredos, `.env`, dados pessoais ou documentos de usuários.


## Complemento — confirmação direta de Kauê

Kauê confirmou em 12/11/2026 que RUON é sua marca própria, criada para organizar a atuação freelancer e comercializar esses projetos. Essa informação complementa a documentação que identifica DocFácil como produto da RUON. A Corujinha e a direção visual azul seguem aprovadas.
