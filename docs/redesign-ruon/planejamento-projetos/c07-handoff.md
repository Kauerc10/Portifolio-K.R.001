# C07 — CKF: site institucional

Ticket #82 da spec #75. [Roteiro](roteiros/05-ckf.md) e [referência aprovada](v1/imagens/05-ckf.png). Primeira fatia do case único CKF; o detalhamento do sistema pertence a C08 e aguarda o aceite desta entrega.

## Direção e conteúdo

Desenvolvimento sob demanda: Kauê ofereceu o serviço, a CKF aceitou a proposta e ele elaborou as entregas. A home apresenta site institucional e sistema de orçamentos como frentes distintas para o mesmo cliente. A página própria detalha presença digital, serviços e contato, com contribuição e galeria; o sistema recebe resumo e imagem preparada sem dados operacionais.

Carvão e amarelo sobre base mineral, dois displays com moldura metálica e ligação gráfica amarela. A ligação organiza a narrativa e não demonstra troca de dados ou integração automática. As capturas públicas do site permanecem distintas da imagem demonstrativa do sistema.

## Escolha de movimento

Nesta prova foi adotada composição nativa 2.5D: a separação espacial das telas acompanha o scroll, a entrada mantém o conjunto inteiro e o capítulo institucional percorre apresentação → serviços → contato em um trilho amarelo. A composição favorece leitura, pausa e reversão sem espera por tempo. Vídeo de fundo não foi produzido nesta fatia; fica como possibilidade posterior, sem necessidade para demonstrar o site.

O percurso mobile é menor. Movimento reduzido, ausência de JavaScript e tela baixa exibem as capturas em sequência estática. Títulos, links e retorno permanecem HTML nativo, com histórico/nova aba e namespace de retorno próprio. O catálogo antigo permanece até C09, com ID CKF separado do novo destaque.

## Validação e aceite

Resultados e capturas serão registrados em `docs/redesign-ruon/evidence/c07-ckf`. Scripts: `scripts/qa/ckf-case.cjs` e `scripts/qa/ckf-story.cjs`.

Teste de Kauê: entrar pela home em `#project-ckf`, abrir `/pt-BR/projetos/ckf`, percorrer o site, ampliar as mídias e voltar. C07 permanece aberto até o aceite; C08 não será iniciado antes dele. Preview no branch da PR rascunho #86, sem merge de produção.

## Evidência técnica local

TypeScript e 74 testes em 18 arquivos passaram após integrar C07. A sequência institucional passou em desktop 1440×1000 e celular 390×844: três etapas, deslocamento perceptível das telas, pausa/reversão e ausência de overflow. As três capturas ficam disponíveis no layout estático em movimento reduzido, sem JavaScript e tela baixa. Na revisão foram corrigidos o contraste da legenda no fundo carvão, a extensão da copy da home no celular e a posição do capítulo institucional (separado do resumo do sistema).

A jornada completa no navegador passou em desktop/celular: retorno por link e histórico, nova aba, foco na galeria, PT/EN e canonical/hreflang, claro/escuro, mídia indisponível, storage bloqueado, sem JavaScript e tela baixa. A confirmação visual final inclui o link público do site CKF. Build de produção aprovado no checkout isolado, com cache webpack desativado apenas na prova; a configuração entregue permanece intacta. [Resultados](../evidence/c07-ckf/results.json), [story](../evidence/c07-ckf/story/results.json) e [procedência](ckf-media-provenance.md).

## Revisão de conteúdo e evidência — 13/11/2026

Kauê pediu menos frases de efeito e mais explicação e conexão entre empresa, problema e entregas. A revisão identifica CKF MANUTENCAO LTDA (razão social confirmada no rodapé público de https://ckf-home.vercel.app/), descreve serviços e público, registra a oferta aceita do projeto e explica separadamente o site e o fluxo interno de clientes, serviços, valores, histórico e PDF. As listas descrevem tarefas reais em vez de slogans.

A prévia conceitual do sistema foi substituída por captura da interface original do projeto em seu modo local de demonstração, escolha confirmada por Kauê. A galeria inclui dashboard, celular e consulta de documento. As legendas distinguem interface real e dados fictícios. A versão publicada pediu login; nenhum acesso autenticado de produção foi alegado. Ver [procedência atualizada](ckf-media-provenance.md).

A mesma revisão editorial alcança VioDigital, VECOM, Atlas e DocFácil em PT/EN: descrição do produto, usuários, entrada/processamento/saída e contribuição, preservando histórias confirmadas e animações aprovadas.

Validação da revisão: TypeScript e 74 testes aprovados. A jornada CKF foi repetida com cinco imagens na galeria e passou em desktop/celular, teclado, retorno, histórico, nova aba, idiomas/metadata, claro/escuro, falhas de mídia, storage bloqueado, sem JS e tela baixa. Os cinco cases tiveram revisão de heading/layout e ausência de overflow em desktop e celular; inglês também conferido no celular. Resultados em `evidence/c07-ckf-clarity/journey/results.json` e `evidence/case-content-clarity/results.json`. A revisão de fonte não encontrou claims sem suporte ou bugs bloqueantes. As capturas locais do sistema estão identificadas em `evidence/c07-ckf-clarity/system-capture.json`.

Build de produção da revisão aprovado no checkout isolado `content-proof`, sem alteração da configuração entregue. As páginas PT/EN dos cinco cases foram geradas com sucesso.

## Ajuste de localização, largura e proporção — 13/11/2026

Kauê confirmou CKF em Itajaí/SC e VECOM em Blumenau/SC. A localização agora aparece no contexto e na abertura das duas entregas, em PT/EN. As capturas VECOM existentes já eram da interface original em execução local com fixtures; as legendas foram esclarecidas, sem gerar interfaces substitutas.

As páginas dos cinco cases usam abertura de até 1760px e seções de até 1680px em telas largas, com gutters proporcionais e medidas de leitura preservadas. A CKF usa apresentação em duas colunas no capítulo animado: explicação à esquerda e captura completa à direita. Foi removido o recorte por `object-fit: cover` das molduras CKF e VECOM.

A galeria compartilhada classifica cada captura por suas dimensões reais. Paisagens e retratos não dependem mais da posição na lista; thumbnails são limitados a 440px/480px de altura, preservam proporção e não são esticados. Isso corrige especialmente o terceiro print vertical da CKF. O modal mantém a captura inteira e oferece link nativo ao arquivo original para consulta em resolução completa.

Validação desta correção: TypeScript e 74 testes passaram. O roteiro `scripts/qa/case-media-layout.cjs` verificou os cinco cases em 1920×1000, 1440×1000 e 390×844: largura aproveitada, ausência de overflow, dimensões limitadas de retratos/paisagens, captura completa com proporção preservada, link ao arquivo original e retorno de foco após Escape. A abertura mede 1760px na tela de 1920px e cerca de 1325px na tela de 1440px. O capítulo CKF passou novamente em etapas, pausa/reversão, movimento reduzido, sem JS e tela baixa. Evidências em `evidence/case-media-layout/`.

A jornada completa de CKF e VECOM foi repetida após as mudanças e passou em desktop/celular, teclado/foco, retorno por link/histórico, nova aba, metadados PT/EN, claro/escuro, falha de mídia, storage bloqueado, sem JavaScript e tela baixa. Build de produção aprovado no checkout isolado; houve uma falha inicial no carregamento externo de fonte Google e a repetição concluiu sem alteração no código entregue.
