# C03 — decisão de mídia do VioDigital

## Escolha

Para esta fatia, o VioDigital permanece em uma composição 2.5D determinística: documento EXEMPLO, QR ilustrativo, placa posterior, faixas de leitura e módulos são camadas HTML/CSS/SVG. O scroll conduz a transformação e pode ser revertido; com `prefers-reduced-motion`, a mesma composição aparece em repouso.

Essa escolha atende melhor à prova aprovada porque mantém texto e CTA nítidos, permite que o mesmo documento seja reconhecido entre a prévia e o case e não depende de decoder, upload ou serviço externo. O QR é decorativo e não deve ser interpretado como documento ou validação real.

## Vídeo e reversibilidade

Nenhum vídeo foi produzido ou reivindicado nesta entrega. Um vídeo silencioso pode complementar futuramente uma apresentação mais longa, desde que tenha poster, pausa, controles, legenda quando houver fala e fallback textual. Não é requisito para a jornada atual e não substitui as capturas reais preparadas.

## Evidências e falhas

As capturas `interface-desktop.png` e `interface-mobile.png` são evidências preparadas da aplicação pública, com legendas e sem dados pessoais. Se uma imagem falhar, a galeria informa o visitante e oferece a captura original; em JavaScript desativado, links `<noscript>` mantêm acesso direto ao arquivo. A composição ilustrativa continua separada dessas telas reais.
