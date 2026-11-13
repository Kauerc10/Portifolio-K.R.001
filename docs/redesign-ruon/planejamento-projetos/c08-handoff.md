# C08 — CKF: sistema de orçamentos

Ticket #83 da spec #75. Expande o mesmo case CKF após o aceite de C07. [Roteiro](roteiros/05-ckf.md), [composição aprovada](v1/imagens/05-ckf.png) e [procedência da mídia](ckf-media-provenance.md).

## Entrega

Uma página CKF, com duas entregas sob demanda para a CKF MANUTENCAO LTDA, de Itajaí/SC. O site continua acessível, com narrativa, animação e galeria próprias. O sistema ganha explicação do percurso cliente → serviços/quantidades/valores → revisão → PDF, decisões, contribuição e galeria separadas. O CTA do hero permite ir diretamente ao sistema sem percorrer a apresentação institucional.

Na home, a rolagem muda a ênfase entre site e sistema, com movimento das molduras, identificação das duas entregas e retorno para a posição anterior. A ligação amarela é narrativa; não representa integração automática entre os produtos.

## Demonstração visual

A composição 2.5D nativa foi escolhida para associar os itens ao documento sem carregar um vídeo ou executar operações do produto no portfólio. A captura real do editor permanece inteira; fichas de serviço e total percorrem um arco até a folha, que se aproxima e assume o foco conforme o scroll. A sequência tem três estados — itens, revisão e PDF — com amortecimento curto, pausa/reversão e fim da fixação. O percurso é menor no celular.

Em movimento reduzido, sem JavaScript e em telas baixas, editor e documento ficam em repouso, com as três explicações e link ao PDF disponíveis. No celular estático, as duas mídias são empilhadas. Não há espera por tempo, autoplay com som, formulário operacional ou backend de cliente.

As capturas e o PDF vêm da interface/código original em modo local de demonstração, com fixtures do próprio projeto. O arquivo de exemplo não é um orçamento comercial em produção. Galerias separadas: `#telas` para o site e `#telas-sistema` para o sistema; a proporção e os limites de escala aprovados em C07 permanecem.

## Validação

- TypeScript e 74 testes em 18 arquivos passaram.
- Roteiro `scripts/qa/ckf-quotes.cjs`: desktop 1440×1000 e celular 390×844; passagem de ênfase na home, acesso direto ao sistema, três etapas, movimento perceptível dos dados, pausa/reversão, capturas sem recorte, PDF com assinatura `%PDF-`, separação das galerias, teclado/foco e ausência de overflow/erros de página.
- Movimento reduzido, ausência de JavaScript, tela baixa, tema escuro, falha das imagens e inglês mantiveram a narrativa acessível.
- A mídia foi comparada à referência e à interface real. O material de prova está em [evidence/c08-ckf](../evidence/c08-ckf/results.json).

## Teste de Kauê

Home `#project-ckf` → abrir CKF → “Ver o sistema de orçamentos” → conduzir a sequência pelo scroll → abrir PDF de exemplo → ampliar telas → voltar. Testar também pelo celular.

C08 permanece aberto até o aceite. C09 não é iniciado nesta fatia. Publicação somente no branch da PR rascunho #86 para Vercel Preview; sem merge ou deploy de produção.

Confirmação final C08: galeria operacional com quatro mídias atuais (dashboard, editor, celular e PDF), editor/PDF em demonstração `ITAJAÍ / SC`, arquivos acessíveis e proporções preservadas. O roteiro foi repetido com gravações de passagem em desktop/celular e passou nos oito cenários. Build de produção aprovado no checkout isolado, mantendo a configuração entregue intacta. Revisão de integração sem bloqueios; preservados a mesma rota, o cliente único e as duas entregas distintas.
