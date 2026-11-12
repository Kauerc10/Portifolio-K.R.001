# Faixa mineral — candidato v1

Gerado em 11/11/2026 com imagegen integrado, transparência solicitada e canal alpha preservado. Candidato de detalhe decorativo, ainda não integrado ou validado nos dois temas. Referência de estilo: imagem aprovada de Experiência. Fonte: `mineral-ribbon-v1.png`.

Prompt final: “Use case: stylized-concept. Asset type: transparent decorative landscape footer for existing premium portfolio. Reference image supplies ONLY material/style: warm ivory limestone and satin violet ribbon from lower left. Generate ONE isolated continuous wide low foreground vignette, no typography or UI. A sculptural curved satin violet pathway enters from left edge, bends gently toward lower foreground and exits bottom edge, with thin ivory limestone sides, nestled into small softly lit ivory mineral terrain along bottom. Keep upper 75 percent genuinely transparent with soft irregular natural silhouette, low profile scene occupies bottom quarter. Palette violet #6534D8, warm offwhite mineral, neutral soft light. Elegant fine porous limestone texture, believable occlusion, premium architectural render. No buildings, no arches, no icons, no text, no logo, no checkerboard, no background sky or rectangular backdrop. Match reference restrained sweeping path, not abstract neon streak. Wide landscape composition suitable for section edges, preserve alpha.”

Inspeção inicial: curva e material compatíveis, terreno baixo com ampla região vazia; verificar franja clara na silhueta em fundo escuro antes da integração. Não equivale à animação futura de caminhos pelo scroll.

## Derivados de entrega — Experiência / R02 (#65)

11/11/2026. A fonte `mineral-ribbon-v1.png` permanece intacta (2172 × 724, RGBA). Sem nova geração. Os derivados WebP preservam alpha verdadeiro e usam Sharp 0.34.5, qualidade 86 / alphaQuality 100:

- `experience-ribbon-desktop.webp`: recorte x0/y420/w2172/h304; redução proporcional para 1600 × 224; 43.508 bytes.
- `experience-ribbon-mobile.webp`: recorte x0/y450/w1100/h274, preservando a curva esquerda; redução proporcional para 800 × 199; 22.680 bytes.

A seção usa `<picture>` com fonte mobile até 900px. Uma máscara vertical suaviza a silhueta superior, incluindo franjas residuais do candidato, sobre a superfície real dos dois temas. Não há blend-mode, fundo branco substituto ou edição da cor da arte. A borda inferior permanece recortada pelo limite da seção, em vez de uma imagem em banner entre textos. Área reservada em fluxo mantém conteúdo PT/EN livre da decoração. Imagem decorativa com alt vazio e aria-hidden; falha de carregamento mantém texto e linha do tempo.

## Correção de integração — Sobre e Experiência

11/11/2026. A entrega de Experiência foi refeita diretamente da fonte, com Sharp 0.34.5, WebP qualidade 92 e alphaQuality 100, sem ampliação: desktop x0/y420/2172×304; mobile x0/y420/800×304. A máscara agora suaviza também os últimos 48–88px inferiores. O arquivo desktop mantém os 2172px originais para a grade de até 1920px; o mobile preserva a curva esquerda e usa área própria em fluxo.

Sobre usa arte raster real em lugar da faixa CSS. `about-ribbon-v2.png` é o original RGBA 2172×724 gerado pelo imagegen integrado nesta conversa, em 11/11/2026. Prompt resumido: uma faixa muito larga e rasa de cetim violeta #6534D8, curva ascendente suave, verso marfim, fundo transparente, sem chão, acabamento fosco estilizado e sem granulação grosseira. Os WebP `about-ribbon-1100.webp` e `about-ribbon-2172.webp` recortam somente o espaço transparente (x0/y225/2172×300) e reduzem proporcionalmente quando necessário, qualidade 92 / alphaQuality 100. O PNG original permanece intacto. A faixa ocupa a largura da seção e mantém distância dos pilares.

Verificação integrada: Chromium, PT-BR, 390/1440/1920px, claro e escuro, movimento reduzido. Capturas incluem a transição Experiência → Competências. Sem overflow horizontal ou texto sobre a arte. Evidência local não versionada em `qa-assets/`. Detector Impeccable: somente aviso de fonte Instrument Sans já existente, mantida pela direção aprovada. Build local bloqueado no loader Google de Syne (`next/font`, resposta externa inesperada); testes iniciados, mas o processo Node sofreu falta de memória, inclusive com um worker. Não registrar esses checks como aprovados.
