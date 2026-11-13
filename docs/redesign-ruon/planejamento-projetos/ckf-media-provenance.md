# CKF — provenance de mídia C07

Data da coleta: 2026-11-13. Escopo: mídia somente; nenhum repositório de produto foi alterado.

## Referência de direção

- [`v1/imagens/05-ckf.png`](v1/imagens/05-ckf.png) foi visualizada antes da preparação. Ela orienta o case em duas frentes: site institucional e sistema de orçamentos, com paleta carvão/branco/amarelo no produto CKF e acento violeta no contêiner do portfólio.
- A referência é direção de composição, não uma captura factual do produto.

## Capturas públicas

Todas as capturas abaixo foram feitas com Playwright em página pública, sem login, formulário, envio ou acesso a backend. O diálogo de cookies opcionais foi rejeitado localmente antes da captura.

| Arquivo | Dimensão | Fonte | Limite de uso |
| --- | ---: | --- | --- |
| `public/assets/projects/ckf/site-desktop.png` | 1440×1000 | [ckf-home.vercel.app](https://ckf-home.vercel.app/) | Captura pública da home/hero; conteúdo pode mudar no deploy. |
| `public/assets/projects/ckf/site-mobile.png` | 390×844 | [ckf-home.vercel.app](https://ckf-home.vercel.app/) | Captura pública mobile; não representa todos os breakpoints. |
| `public/assets/projects/ckf/site-services.png` | 1440×1000 | [ckf-home.vercel.app](https://ckf-home.vercel.app/) | Trecho público de serviços após rolagem; não é uma página independente. |
| `public/assets/projects/ckf/site-contact.png` | 1440×1000 | [ckf-home.vercel.app](https://ckf-home.vercel.app/) | Unidade/CTA comercial público e rodapé; números/endereço são conteúdo público da página no momento da coleta. |

## Assets públicos originais

- `public/assets/projects/ckf/logo.webp` — cópia direta do asset público [`logo-ckf-ui.webp`](https://ckfmanutencao.com.br/assets/logo-ckf-ui.webp), sem edição.
- `public/assets/projects/ckf/industrial-welding.webp` — cópia direta do asset público [`solda-ckf.webp`](https://ckfmanutencao.com.br/assets/solda-ckf.webp), sem edição; usar apenas como referência visual autorizada/publicada, não como prova de contribuição específica.

## Sistema — interface real em demonstração local

Em revisão solicitada por Kauê em 13/11/2026, a ilustração conceitual anterior foi substituída por capturas da interface real do repositório `Kauerc10/ckf-manutencao-orcamentos`, SHA `f1797812433928c55d0cb3d600788258c504b1ca`. O código e o CSS dos componentes originais foram executados sem redesenho ou alteração do produto.

- `system-preview.png` — dashboard real, 1440×1000.
- `system-mobile.png` — dashboard real no celular, 390×844.
- `system-editor.png` — formulário original de novo orçamento e prévia, 1440×1000, sem salvar.
- `system-document.png` — consulta de orçamento e documento comercial originais, 1440×1000.

As capturas usam exclusivamente o modo local já existente no produto, com `DEMO_PROFILE`, `DEMO_CLIENTES` e orçamentos demonstrativos de `src/lib/demo-data.ts`. Os nomes, documentos pessoais, valores, datas e status mostrados são fixtures do projeto, não registros de clientes. A sessão demonstrativa utiliza configurações padrão do código; não comprova configurações atuais da empresa em produção.

O harness de captura fica ignorado em `.scratch-vecom/ckf-real`, no workspace do portfólio. Ele usa o `src/main.tsx`, os componentes, CSS e assets públicos originais; isola as configurações de PostCSS/React dos dois projetos e define as variáveis públicas de Supabase como vazias. Nenhum `.env`, sessão existente ou credencial real foi lido. A coleta registrou zero requisições externas; a consulta de orçamento usou bloqueio adicional de rede externa. Não houve salvamento de orçamento, alteração do produto ou acesso ao backend de clientes.

Uma tentativa somente leitura em `https://ckf-manutencao-orcamentos.vercel.app/` chegou à tela de login. O uso da interface real local com dados fictícios foi escolhido explicitamente por Kauê. Portanto, as imagens comprovam o visual da interface em execução local, não o funcionamento autenticado do deploy.

## Limites e próximos usos

- As capturas do site podem ser usadas como evidência visual da entrega pública da CKF no portfólio; preservar a indicação de fonte/estado temporal.
- As capturas do sistema devem manter a legenda “interface real em demonstração local / dados fictícios”. A ilustração conceitual anterior permanece apenas no histórico do Git e não é mais o asset atual.
- Não reutilizar os assets como prova de contrato, pagamento, autoria exclusiva ou acesso aos dados internos.
