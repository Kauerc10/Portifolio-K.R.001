# Plano executável — hero dos três portais

03/11/2026. Complementa `portals-image-integration.md`. Referência única: `assets/ribbon-portals/model-reference.png` (1672×941). Planejamento, ainda sem implementação. Escopo: hero, transição imediata para o conteúdo e preservação dos destinos existentes.

## 1. Composição e responsividade

Separar o contêiner de texto, com largura máxima e margens fluidas, da arte, que ocupa a largura do viewport. Evitar altura fixa de tela: a altura deve acomodar texto traduzido, controles e cena. O cabeçalho não deve disputar espaço com a saudação.

| Faixa inicial | Composição | Arte e controles |
|---|---|---|
| ≥1280 px | Saudação à esquerda, apresentação à direita, sobre o céu | Cena completa até as bordas; indicadores próximos dos portais; prévia abaixo da área arquitetônica |
| 768–1279 px | Texto em fluxo, duas colunas somente quando couber | Reduzir céu excedente; preservar os três portais; controles em faixa própria se indicadores colidirem |
| 320–767 px | Saudação, apresentação/CTA, cena, seletores e prévia | Panorama completo com recorte vertical do céu, sem cortar lateralmente os portais; controles HTML externos de pelo menos 44×44 px |

Breakpoints são hipóteses de layout, ajustados por colisão real. No celular a cena pode ser um panorama baixo: não tornar os pequenos portais os únicos alvos de toque. Se ficar visualmente pequena demais, avaliar composição mobile derivada como mudança de arte explícita, com mapa próprio; não aplicar `cover` central que elimine destinos.

Uma função de enquadramento define retângulo de origem e escala. Imagem, SVG e âncoras compartilham essa transformação. Coordenadas originais em pixels, nunca percentuais CSS independentes. Para cada enquadramento registrar `sourceRect`, âncoras visíveis e posição dos controles. Validar redimensionamento e troca de orientação sem recarregar.

## 2. Preparação da arte

Preservar original imutável. Preparar variantes de entrega em AVIF/WebP e fallback, escolhidas por `picture`/`srcset` e `sizes` real. Registrar dimensão, bytes e procedência. Reservar proporção antes do download; imagem principal com prioridade apropriada, sem lazy loading do elemento LCP.

Amostras das bordas do céu orientam o fundo CSS. Fazer transição apenas no céu vazio e, se necessário, na extremidade inferior do terreno; não apagar detalhes com máscara ampla. Conferir ausência de moldura em telas largas. Não esticar a imagem: em ultrawide manter a arquitetura proporcional e usar extensão de céu/terreno apenas se produzida e revisada.

Avaliar candidato de resolução maior separadamente em recortes 1:1 dos arcos, encontro da fita e pedra. Ampliação comum não adiciona detalhe. Não substituir o original se houver deformação ou textura inventada evidente.

## 3. Máscaras, rotas e oclusão

Criar SVG com `viewBox="0 0 1672 941"` e manifesto legível. Assets previstos: máscara da superfície violeta, três máscaras de intradorso, oclusores da arquitetura, três trajetórias de luz e âncoras dos indicadores. Traçados feitos sobre a referência, conferidos com overlay colorido ampliado.

Separar a superfície visível da fita de sua linha de percurso. A trajetória guia o efeito; a máscara limita os pixels iluminados. A arquitetura interrompe o efeito onde encobre a fita. Trechos ocultos não ganham conexão visível inventada. Ramo compartilhado deve receber um único brilho, sem duplicação na bifurcação.

Ordem de composição: imagem → brilho da fita recortado → realce dos interiores recortado → indicadores/controles HTML. Usar efeitos com área limitada, feather pequeno e sem halo na pedra. Caso blur seja necessário, ampliar somente o limite do filtro local e recortar novamente pelo destino. IDs SVG únicos por instância.

Manter a imagem inteira como base evita emendas de recortes móveis. Essas camadas criam iluminação espacial; não simulam deslocamento de câmera ou geometria oculta.

## 4. Interação e acessibilidade

Estado único `activeDestination` com origem de entrada e preferência de movimento. IDs estáveis: desenvolvimento, automacao, suporte. Destinos reais conferidos no código antes de ligar CTAs; não assumir URLs nem alterar fatos dos projetos.

- Mouse: hover seleciona após breve intenção (~100 ms); foco de teclado tem precedência. Sair da área mantém a última seleção, permitindo alcançar a prévia.
- Teclado: Tab alcança controles em ordem visual; foco visível; Enter/Espaço selecionam o botão; CTA é um link real. Usar botões com `aria-pressed`, evitando semântica de abas sem implementar seu contrato completo.
- Toque: um toque seleciona e mostra a prévia; link explícito navega. Não exigir hover, duplo toque ou precisão no desenho do portal.
- Seleção: brilho percorre a fita em aproximadamente 700–1000 ms, interior responde em 180–250 ms, prévia entra em até 200 ms. Navegação não espera a animação. Seleções rápidas cancelam a anterior, sem filas.
- Repouso: nenhum loop contínuo. Selecionar novamente não dispara repetidamente efeitos desnecessários. Cursor nativo e rolagem normal.
- Movimento reduzido: realce estático imediato; sem percurso luminoso. Fora da tela ou aba oculta: cancelar animação, preservando seleção.

Prévia HTML fora do desenho, com altura mínima compatível com o maior conteúdo para evitar saltos. Nome, descrição curta e CTA; imagens adicionais só quando necessárias. Não anunciar hover continuamente por live region. Indicadores decorativos sem capturar ponteiro. Sem JS, a arte e links de todos os destinos continuam disponíveis.

## 5. Arquitetura e desempenho

Usar React/Next existentes para estrutura e estado, CSS para apresentação e Web Animations API para percurso/transições quando necessário. SVG para máscaras e registro. Não adicionar motor gráfico ou biblioteca de animação ao bundle do hero sem necessidade comprovada; GSAP/Framer já instalados não precisam ser importados para isso.

Separar: `HeroSection` (conteúdo/layout), `PortalArtwork` (imagem/enquadramento/SVG), `PortalDestinations` (controles/prévia) e manifesto de coordenadas. Helpers puros para transformação e resolução dos destinos. Isolar o renderer Three legado do caminho ativo, preservando fontes históricas; remoção de dependência somente após conferir outros consumidores.

Metas iniciais, a medir: nenhum RAF em repouso, CLS do hero próximo de zero (página ≤0,1), LCP ≤2,5 s e INP ≤200 ms em condições documentadas. Orçamento inicial de imagem transferida: até 350 KB mobile e 900 KB desktop; ajustar explicitamente se comprometer textura. Animação deve permanecer fluida no aparelho de teste; registrar dispositivo, viewport, DPR e throttling. Laboratório não comprova métricas de campo.

## 6. Entregas e critérios de passagem

1. **Base estática:** enquadramento, texto, fundo e controles. Capturas 320, 390, 768, 1024, 1440 e 1920 px; zoom 200% e texto PT/EN. Passa quando não há sobreposição, corte de destino, overflow horizontal ou moldura da imagem.
2. **Mapa da cena:** SVG/manifesto e modo de depuração. Conferir cada máscara ampliada e em todos os enquadramentos. Passa quando a luz nunca cobre pedra, céu ou rotas desconectadas.
3. **Um destino completo:** entrada por mouse, foco e toque, cancelamento, prévia/CTA e redução de movimento. Prova no navegador antes de expandir.
4. **Três destinos:** conteúdo real, estado persistente, oclusões e pausa. Validar navegação, ausência de JS e falha de imagem (apresentação e links continuam legíveis).
5. **Qualidade e entrega:** comparar resolução/compressão, testar build e interações, medir custo e capturar página final. Commits/push por marco; publicação de produção separada.

Testes automatizados para comportamento: seleção, foco, CTA, cancelamento e movimento reduzido. Teste visual no navegador para alinhamento e acabamento; não criar testes que congelem coordenadas artísticas como verdade universal. Rever em Chrome, Firefox e Safari quando disponíveis; declarar os não testados.

## Riscos a resolver na prova

- Panorama muito baixo no celular: controles externos e recorte do céu primeiro; composição mobile específica somente se necessário.
- Nitidez insuficiente em monitores densos: comparar fontes antes de aumentar transferência.
- Brilho com aparência de linha sobreposta: máscara de superfície, largura variável e oclusão; reduzir intensidade antes de adicionar efeitos.
- Arte com borda visível: corrigir cor/enquadramento na base estática antes de animar.
- Fita aparentemente conectada atrás de um portal: animar apenas os trechos visíveis comprovados.

Referências técnicas e justificativa de escolha em `portals-image-integration.md`.
