# Portais: integração da imagem em 2.5D

Decisão do usuário em 03/11/2026: interromper reconstrução do primeiro plano em 3D e trabalhar a imagem aprovada dos três portais e fita violeta. Alvo: `assets/ribbon-portals/model-reference.png`. Esta decisão supera a direção de reconstrução 3D descrita anteriormente. Documento de proposta técnica; a implementação desta nova integração ainda não foi realizada.

## Recomendação

Imagem responsiva como base visual, SVG registrado nas mesmas coordenadas da imagem para máscaras/rotas e HTML para conteúdo e navegação. CSS e Web Animations API para transições curtas acionadas pela seleção. Não incluir Three.js/PixiJS no novo hero apenas para mostrar a imagem. Não chamar essa composição de profundidade geométrica: o efeito espacial vem da perspectiva já presente e de iluminação localizada em camadas.

O usuário já rejeitou movimento da cena seguindo o mouse. Manter câmera/composição estáveis, cursor nativo e rolagem normal. Profundidade por displacement não é requisito. Deslocar pixels nas bordas pode deformar arcos e revelar regiões que a imagem não contém. Separar camadas com movimento exigiria recortes e reconstrução das regiões ocultas; não presumir que isso existe.

## Experiência proposta

- Hero até as bordas do viewport; limite de largura aplicado ao texto, não à arte. Céu e fundo do site com transição de cor discreta, sem retângulo visível ou degradê que apague as construções.
- Ao focar, passar o mouse ou tocar num destino, um brilho curto percorre a superfície violeta até o portal, recortado por uma máscara correspondente à fita. O intradorso recebe realce suave e surge uma prévia HTML com chamada para ação real. Não desenhar uma nova linha arbitrária sobre a arte.
- Máscaras distintas para fita, interior dos portais e oclusões: iluminação não deve atravessar pedra ou aparecer sobre fachadas. SVG e imagem usam a mesma transformação de enquadramento.
- Seleção visual persistente, navegação imediata sem esperar animação; teclado e toque equivalentes ao mouse. Movimento reduzido mantém apenas realce estático.
- Celular com texto, cena e três destinos em fluxo. Não reduzir o desktop inteiro até tudo ficar minúsculo. Validar um enquadramento próprio que preserve os três portais; se necessário, produzir composição mobile específica mantendo a arte aprovada.

## Qualidade e custo

O original tem 1672×941. Comprimir ou aumentar a dimensão não recupera detalhe real. Comparar original e candidato de ampliação em recortes 1:1 antes de substituir: preservar arcos, bordas da fita e textura sem detalhes inventados. Servir AVIF/WebP em tamanhos adequados por `picture`/`srcset`, com dimensões explícitas; escolher orçamento de bytes após inspeção visual, sem prometer nitidez 4K do original.

Imagem visível antes do JavaScript, animação somente durante interação e pausa fora da tela. Nenhum loop contínuo necessário. Medir carregamento e custo de composição em celular; filtros extensos de blur também podem ser caros mesmo sem WebGL.

## Sequência de entrega

1. Prova estática fullbleed com a imagem atual: desktop largo, notebook, tablet e celular; aprovar encaixe e legibilidade antes dos efeitos.
2. Mapear máscaras/rotas na referência, conferir overlay no mesmo enquadramento e implementar um destino completo.
3. Completar os três destinos, foco/toque, prévias e movimento reduzido.
4. Avaliar melhoria de resolução separadamente e validar página real, sem alterar demais seções ou publicar produção.

Critério: acabamento visual integrado e interações úteis. Não voltar a modelagem nem adicionar efeitos para compensar enquadramento ruim.

## Fontes consultadas

- [MDN: imagens responsivas](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images): seleção de resolução e direção de arte.
- [MDN: SVG viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/viewBox): sistema comum de coordenadas.
- [MDN: mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image): recorte por máscara.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion): preferência de movimento.
- [PixiJS: DisplacementFilter](https://pixijs.download/v8.22.0/docs/filters.DisplacementFilter.html): deslocamento de pixels, distorção e custos adicionais de filtragem. Alternativa examinada; não selecionada para esta proposta.

A recomendação de arquitetura acima é uma decisão de projeto baseada nessas capacidades e no feedback do usuário, não um benchmark comparativo já executado.
