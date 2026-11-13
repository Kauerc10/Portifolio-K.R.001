# Pesquisa — CKF Sistema de Orçamentos

Data da consulta: 2026-11-12. Pesquisa somente leitura em `Kauerc10/ckf-manutencao-orcamentos`.

## Versão usada

- Branch funcional mais atual: `feat/catalogo-tabelas-leads`.
- SHA fixado: [`f1797812433928c55d0cb3d600788258c504b1ca`](https://github.com/Kauerc10/ckf-manutencao-orcamentos/tree/f1797812433928c55d0cb3d600788258c504b1ca), commit de 2026-09-30 13:17:10Z.
- Motivo: é mais recente que `main` (29/09) e contém a sequência funcional de catálogo/tabelas por empresa; dependabot e branches de verificação não foram tratados como versão de produto.
- A ponta mais recente do repositório é a branch Dependabot `dependabot/npm_and_yarn/production-dependencies-ac33e65d2a`, SHA [`b4fc5a0a30f4776845c603e5842ea2b8b63ed6b5`](https://github.com/Kauerc10/ckf-manutencao-orcamentos/tree/b4fc5a0a30f4776845c603e5842ea2b8b63ed6b5), em 2026-10-01 07:32:30Z. Ela está 1 commit à frente de `main`, mas altera apenas `package.json` e `package-lock.json`; não foi usada como estado de produto. A lista completa e as comparações estão em `branches.json`.
- `main` no momento da consulta: [`b35c8eb42a6bd20059ac4b76dfa4fdb3fa55afb2`](https://github.com/Kauerc10/ckf-manutencao-orcamentos/tree/b35c8eb42a6bd20059ac4b76dfa4fdb3fa55afb2).

## O que o repositório comprova

- O README descreve um “sistema interno para criar, consultar e emitir orçamentos da CKF Manutenção” e lista login/controle de acesso, clientes, orçamentos, PDF, CSV/XLSX, histórico, configurações e exclusão auditada ([README fixado](https://github.com/Kauerc10/ckf-manutencao-orcamentos/blob/f1797812433928c55d0cb3d600788258c504b1ca/README.md)).
- `PRODUCT.md` define explicitamente o propósito como sistema interno da CKF, substituindo Word/planilhas, com funcionários da CKF como usuários primários ([PRODUCT.md](https://github.com/Kauerc10/ckf-manutencao-orcamentos/blob/f1797812433928c55d0cb3d600788258c504b1ca/PRODUCT.md)).
- O guia técnico confirma a aplicação React/TypeScript integrada ao Supabase, com páginas de login, dashboard, clientes, orçamentos, configurações, PDFs/exportações e Edge Function de exclusão ([REPOSITORY_GUIDE.md](https://github.com/Kauerc10/ckf-manutencao-orcamentos/blob/f1797812433928c55d0cb3d600788258c504b1ca/docs/REPOSITORY_GUIDE.md)).
- `DESIGN.md` descreve shell carbono, superfícies neutras, acento âmbar e documento branco/print-like ([DESIGN.md](https://github.com/Kauerc10/ckf-manutencao-orcamentos/blob/f1797812433928c55d0cb3d600788258c504b1ca/DESIGN.md)).

## Evolução observada

O [AGENTS.md do snapshot](https://github.com/Kauerc10/ckf-manutencao-orcamentos/blob/f1797812433928c55d0cb3d600788258c504b1ca/AGENTS.md) foi consultado como evidência: registra separação entre catálogo principal e tabelas por empresa, preços negociados, códigos de serviços e assinatura RUON em Configurações. Suas instruções de execução pertencem ao repositório CKF e não foram aplicadas a este workspace. A branch funcional está seis commits à frente de `main`, sem commits atrás.

Os commits recentes mostram evolução do cadastro de cliente e snapshot no orçamento, pipeline/segurança, captura de solicitações do site e, em 29–30/09, catálogo, tabelas comerciais por empresa, PDF próprio, dados/assinatura e imagens do catálogo. Exemplos: [`f7c0338209`](https://github.com/Kauerc10/ckf-manutencao-orcamentos/commit/f7c0338209), [`bef6e39260`](https://github.com/Kauerc10/ckf-manutencao-orcamentos/commit/bef6e39260), [`f179781243`](https://github.com/Kauerc10/ckf-manutencao-orcamentos/commit/f179781243).

## Classificação para o portfólio

- **Rótulo recomendado:** “Solução sob medida para a operação interna da CKF Manutenção”.
- **Base factual:** finalidade interna, usuários funcionários CKF e dados/documentos oficiais da CKF estão explícitos nos docs.
- **Não afirmar:** que houve contrato/pagamento, que foi exclusivamente autoria individual, ou que é produto próprio independente. Esses pontos não são comprovados pelos documentos consultados.
- **Confiança:** alta para “software interno/sob medida para CKF”; baixa para modelo comercial e composição da equipe.

## Pergunta pendente (Q7)

Nenhuma pergunta é necessária para o rótulo factual acima. Se o usuário quiser distinguir “feito individualmente” de “feito em equipe”, será necessário fornecer essa informação; o histórico público não basta para provar isso.

## Complemento — confirmação direta de Kauê

Kauê confirmou em 12/11/2026 que ofereceu o serviço à CKF, a empresa aceitou e ele elaborou o projeto. Classificação atual: desenvolvimento sob demanda para cliente, no case CKF com duas entregas. Valores e modalidade contratual não foram detalhados.
