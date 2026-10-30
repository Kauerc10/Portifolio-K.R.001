> Atualização de 30/10/2026: a decisão posterior do usuário remove paralaxe de ponteiro e zoom de rolagem. A arte permanece estável, com realce dos caminhos por hover/foco. Cursor nativo visível. Abaixo de 1280px, apresentação, paisagem com altura própria e destinos HTML seguem o fluxo, sem sobreposição. Esta decisão substitui os requisitos de movimento abaixo; publicação permanece fora do escopo.

# Plano — hero 2.5D integrado e imagem de alta qualidade

Data: 29/10/2026. Escopo solicitado: planejar integração da profundidade, animação e interação no hero e melhorar sua imagem. As seções abaixo ficam para outra etapa. A escolha2.5D aprovada substitui a exigência anterior de geometria3D para esta paisagem. Preservar composição atual e indicadores24px mais altos.

## Decisão técnica
Usar Next/React para HTML acessível e carregamento; Three.js já instalado para um único plano com shader de profundidade, três texturas (cor, profundidade, identificação dos caminhos), um draw call e dois triângulos. Importação dinâmica do renderer. Não acrescentar React Three Fiber, GSAP ou WebGPU para esse efeito. WebGL puro poderia reduzir bundle, mas reescrever infraestrutura existente aumenta manutenção; só considerar após medir bundle incremental real acima do orçamento.

CSS sozinho não produz deslocamento por profundidade da imagem; mantê-lo para UI e fallback. 2.5D não permite revelar faces ocultas: limitar movimento antes que apareçam rasgos/alongamentos. Camadas extras com áreas reconstruídas somente se a prova limitada demonstrar necessidade.

## Estado observado
Hero público usa JPG estático1024×768 de144703bytes e links; protótipo interativo está separado em design/scene-proof/landscape2d5.ts. A resolução limita o detalhe em desktop. A cadeia de duas recompressões foi removida. Protótipo contém dimensões fixas, fundo branco no shader, escala UV incompatível com cover nas proporções extremas, amortecimento por frame e pulsação permanente no realce. Seus benchmarks isolados não validam o produto integrado.

## 1 — Arte e qualidade antes de animar
1. Preservar master e registrar procedência/hash. Procurar original maior; arquivo maior por interpolação não equivale a detalhe recuperado.
2. Na ausência de master maior, produzir candidato de aprimoramento conservador com imagegen usando arte limpa como referência. Meta de master aproximadamente2880px de largura ou superior se a ferramenta realmente entregar. Conferir dimensões reais; não prometer resolução de saída nem usar geração como prova de fidelidade. Reconstrução pode inventar detalhes: comparar arcos, curvas, móveis e silhuetas antes da substituição.
3. Manter texto e indicadores fora da arte. Criar candidatos separados; não sobrescrever a fonte aprovada. Validar o fundo#F7F7FA e continuidade nas bordas mediante cor e máscara discreta de transição que não lave os prédios.
4. Produzir derivados desktop1440/2160 e mobile768/1080 conforme detalhe efetivamente disponível. Escolher WebP/AVIF/JPG por comparação visual e decode; uma compressão a partir do master. Não recomprimir no Next um derivado já calibrado. Medir inclusive memória decodificada.
5. Revalidar mapas de profundidade e caminhos na composição final. Depth é dado linear; máscaras são dados, preferir lossless para evitar contaminação dos canais. Não ampliar todas as máscaras para4K sem necessidade.
6. Revisão do candidato de arte lado a lado em escala100%, desktop e mobile. Se houver mudança de composição, manter original até decisão do usuário.

## 2 — Integração progressiva
Criar HeroLandscape client e controlador local independente de React por frame. Manter poster inicial e todos os links no HTML. Canvas absoluto dentro da mesma área, com dimensões reservadas. Carregar renderer apenas após conteúdo inicial e quando visível/permitido. Trocar poster por canvas somente após texturas válidas e primeiro frame; sem salto de enquadramento/cor.

Estados: poster, loading, ready, paused, fallback. Movimento reduzido ou Save-Data mantém poster. Preferência alterada durante loading invalida callbacks antigos. Fora da viewport ou aba oculta pausa; desmontagem libera texturas, geometria, materiais, renderer, observadores e listeners. Perda de contexto volta ao poster, sem retry infinito. Fallback útil mesmo se imagem falhar: texto e links permanecem.

Uma função compartilhada resolve cover/crop e coordenadas da imagem, usada pelo shader e pelos indicadores. Ler dimensões reais do asset. Corrigir escala UV do protótipo e verificar extremos de proporção. Preservar fidelidade de cor com pipeline explicitamente definido; validar imagem HTML e canvas lado a lado para evitar dupla conversão sRGB.

## 3 — Interação útil
- Mouse: paralaxe discreta por profundidade; ponto de partida4–8CSSpx de deslocamento visual máximo, ajustar por prova de rasgos, não vender como ângulo3D real.
- Scroll: pequeno avanço, inicialmente1–2% de zoom; rolagem nativa, sem pinning. Não ampliar imagem além do limite útil só para esconder bordas.
- Hover/foco: realce breve e contido no caminho correspondente, sem pulsação infinita. Interromper intenção anterior.
- Clique/Enter/toque: links desenvolvimento→#projetos, automação→#project-atlas, suporte→#experiencia. Cadastro único; canvas decorativo, sem foco. Acesso não depende de detectar clique no pixel da arte.
- Se acrescentar seleção direta sobre pavilhão, usar hotspot HTML com o mesmo destino, sem interceptar arraste vertical. Touch não depende de hover nem de giroscópio.
- Indicadores acompanham transformação visual ou deslocamento é limitado para manter ancoragem. Manter elevação24px solicitada; em mobile colocar destinos no fluxo quando colidirem com apresentação.
- Teclado, foco visível e alvos44px; movimento reduzido mantém realce estático. Tema/idioma não reativam motor legado.

## 4 — Desempenho
Render sob demanda: RAF apenas enquanto há interpolação/realce/resize; em repouso zero loop. Amortecimento por delta de tempo. DPR inicial limitado1,5desktop/1mobile, possibilidade2 somente com resolução-fonte e medição que sustentem. Limitar pixels totais e MAX_TEXTURE_SIZE, não só DPR. Sem sombras/pós-processamento.

Metas propostas, não medidas: poster inicial≤250KBdesktop/150KBmobile; asset de cor detalhado adiado≤800KBdesktop/350KBmobile; mapas juntos≤150KB; runtime incremental≤220KBgzip. Estimar GPU separadamente: RGBA2880×2160 já ocupa~24MiB antes de mipmaps/canvas. Selecionar variante por área real; não baixar todos os tamanhos. Se poster e canvas usam variantes distintas, registrar custo total e evitar downloads duplicados desnecessários.

Manter orçamento original salvo revisão explícita se qualidade exigir mais. Medir build de produção: bytes de rede,10s de interação, mediana/p95, long tasks e pausas. Objetivos60fpsdesktop/30mobile; emulação não comprova aparelho físico. CWV de laboratório não comprova p75 em campo.

## 5 — Verificação e ordem de entrega
A. Arte candidata e mapas alinhados, comparação de nitidez e bordas.
B. Poster+canvas coincidentes, estados de falha e cleanup testados antes de habilitar animação.
C. Paralaxe/realce/destinos com mouse, teclado e toque; verificar que o novo canvas está realmente montado na página pública.
D. Medição e ajustes de qualidade; capturas1440,1920,390e320px, inglês/português, zoom200%, movimento reduzido em boot/runtime e contextoWebGL perdido.
E. Revisão guiada do hero completo e evidências. Restante do site e publicação fora deste escopo.

Testar comportamento no wrapper/controlador público: links antes de ready, falha preserva poster/links, resultado tardio não monta GPU, pausa fora de vista, descarte idempotente, preferência reduzida interrompe movimento. E2E de destinos/hash e swipe. Não testar coordenadas artísticas como constantes; comparação visual controla enquadramento/fidelidade.

## Fontes primárias consultadas
- https://threejs.org/manual/pages/rendering-on-demand.html
- https://threejs.org/manual/pages/responsive.html
- https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
- https://nextjs.org/docs/pages/api-reference/components/image

Este plano não declara o protótipo integrado, nem cria/fecha tickets automaticamente. Revisar vínculo com#37–#39 antes de executar para evitar duplicação e manter o grafo existente coerente com a decisão2.5D.
