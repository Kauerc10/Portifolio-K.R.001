# C05 — Atlas Notarial

Ticket #80 da spec #75. [Roteiro](roteiros/03-atlas.md) e [prancha aprovada v3](v3/imagens/atlas.png).

## Direção

Documento demonstrativo de veículo, camadas Formatar / Conferir / Organizar, conexões violeta e detalhe âmbar sobre base mineral clara. A composição é ilustrativa; a galeria usa material oficial público: a imagem da bancada e sua apresentação no celular, com procedência e sem registros operacionais. A captura mobile não é uma sessão autenticada da ferramenta.

A narrativa apresenta a percepção de erros, retrabalho e demora para conferir/redigir procurações no cartório. O Formatador de Veículos foi a primeira ferramenta. O conjunto cresceu e Kauê decidiu desenvolvê-lo como produto próprio. Não há alegação de economia percentual, eliminação de erros, quantidade de usuários ou prontidão comercial.

## Fatia

Prévia na home → página dedicada → retorno. A entrada compartilha a composição inteira para preservar profundidade e coerência. A história usa camadas 2.5D conduzidas pelo scroll, com percurso menor no celular e alternativa estática em movimento reduzido/tela baixa. Escolhida a composição nativa 2.5D por permitir alinhar papéis, percorrer camadas e reverter a evolução pelo scroll. Nenhum vídeo final foi produzido ou comparado nesta fatia; as gravações anexadas documentam a implementação.

Implementação integrada na PR rascunho #86 (merge a8ddb49, acabamento 06408a1 e fallback 16431f2). #80 permanece aberto até a revisão de Kauê. Sem deploy ou avanço ao DocFácil antes do aceite.

URLs locais previstas:

- http://localhost:3064/pt-BR#project-atlas-notarial
- http://localhost:3064/pt-BR/projetos/atlas-notarial

## Validação

- 74 testes em 18 arquivos, TypeScript e build de produção passaram. O build foi executado isoladamente, com cache webpack desativado apenas nesse checkout para poupar disco; a configuração entregue da aplicação não mudou.
- Navegador em desktop 1440×1000 e celular 390×844: prévia → case → retorno por link/histórico, nova aba, galeria por teclado com foco restaurado, PT/EN e metadados próprios, claro/escuro, falhas de mídia, ausência de JavaScript, storage bloqueado e tela baixa.
- Prévia: transformação visível do documento acompanha o scroll, permanece quando a rolagem para e reverte. Título e CTA ficam disponíveis, e a fixação termina.
- Evolução: rotina → Formatador → Atlas; três etapas, pausa/reversão e ausência de overflow verificadas nos dois viewports. No celular há percurso curto, com cada papel recebendo seu momento de leitura.
- Revisão de fallback detectou que os dois primeiros papéis ficavam fora da tela no estado estático mobile. Corrigido para sequência empilhada, com os três acessíveis sem JS, em movimento reduzido e tela baixa. A correção recebeu prova específica de geometria e capturas.
- Mantido o catálogo legado até C09. Seu antigo ID Atlas foi preservado para não colidir com o novo destaque nem quebrar os testes de seleção existentes.
- Revisão visual Impeccable comparou desktop/celular à prancha aprovada; composição mineral clara, documento EXEMPLO, camada de saída, três camadas com ícones e conectores permanecem distintos da mídia de evidência.

Resultados, capturas e gravações: [evidence/c05-atlas](../evidence/c05-atlas/results.json) e [evolução](../evidence/c05-atlas/story/results.json). [Procedência da mídia](atlas-media-provenance.md).

Limite da galeria: utiliza somente o material oficial já público. Não foi validada uma sessão autenticada do Formatador nem foram acessadas APIs ou registros do cartório. A ilustração explica a proposta, sem alegar execução real ou resultado medido.

Teste sugerido: entrar pela home, percorrer Evolução no case, ampliar as imagens e voltar para a posição anterior. Aguardar aceite de Kauê antes de encerrar #80 e iniciar C06.
