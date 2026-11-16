# C06 — DocFácil

Ticket #81 da spec #75. Entrega isolada para aceite de Kauê antes de iniciar C07.

## Experiência

Prévia na home e página própria em PT/EN, com fundo mineral quente, azul DocFácil, acentos verdes e corujinha original. A ilustração combina pergunta, resposta e documento; as capturas da galeria são materiais públicos autênticos do produto, com limites descritos na [procedência](docfacil-media-provenance.md).

A sequência Escolher → Responder → Revisar → Documento/PDF acompanha a rolagem. A resposta percorre um arco até o documento, o painel de orientação se recolhe e o documento assume o foco. Há amortecimento curto, pausa e reversão; a página continua ao concluir o percurso. A corujinha se move discretamente com a sequência e repousa, sem loop. No celular, o percurso é menor. Sem JavaScript, em movimento reduzido e em telas baixas, o conteúdo permanece em composição estática legível.

O produto é apresentado como próprio da RUON, sem métricas inventadas, piloto de IA ou demonstração de cobrança. A animação é ilustrativa: o portfólio não gera documentos. A galeria identifica o material público de apresentação e oferece ampliação por teclado, Escape e restauração de foco.

## Validação local

- TypeScript aprovado. Suíte de 74 testes: 72 passaram na rodada completa; os dois testes do catálogo legado foram atualizados para seu novo ID e os 13 testes dos respectivos arquivos passaram na repetição.
- Navegador: desktop 1440×1000 e celular 390×844; home → case → retorno, histórico, nova aba, metadados PT/EN, claro/escuro, mídia indisponível, storage bloqueado, sem JavaScript e tela baixa.
- Story: quatro etapas, deslocamento perceptível da resposta, pausa, reversão, ausência de overflow e corujinha carregada. Fallback estático verificado em movimento reduzido, sem JS e tela baixa.
- Revisão visual das capturas detectou sobreposição translúcida no momento da revisão; o painel agora desaparece por completo. Verificação da story repetida após o ajuste.
- Revisão de integração não encontrou bloqueios na rota, metadados, navegação ou fallback. O ID do catálogo antigo é `project-docfacil-legacy`; o destaque usa `project-docfacil`.

Resultados: [jornada](../evidence/c06-docfacil/results.json) e [story](../evidence/c06-docfacil/story/results.json). Scripts reproduzíveis em `scripts/qa/docfacil-case.cjs` e `scripts/qa/docfacil-story.cjs`.

## Teste de Kauê

- http://localhost:3064/pt-BR#project-docfacil
- http://localhost:3064/pt-BR/projetos/docfacil

Percorrer a prévia, abrir o case, conduzir a história com scroll, ampliar as telas e voltar. A issue permanece aberta até o aceite. A publicação autorizada é somente no branch da PR rascunho #86 para Vercel Preview; sem merge ou produção.

Build de produção aprovado no checkout isolado C06: páginas PT/EN geradas e compilação/tipos concluídos. A configuração entregue de Next.js não foi alterada.
