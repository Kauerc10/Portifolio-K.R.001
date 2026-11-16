# Prova de movimento — folha contínua

## Escolha de Kauê

[B — folha contínua](imagens/b-folha-continua.png) é a direção experimental. [A — editorial](imagens/a-editorial.png) é a alternativa caso a animação da folha não convença. Não é autorização para substituir toda a vitrine por uma implementação ainda não validada.

## Fatia proposta para avaliação

Uma prova isolada e acessível no navegador com DocFácil e VECOM, mantendo a vitrine publicada atual. Essa passagem testa dois materiais diferentes: papel curvo e pasta azul. Usar a corujinha existente e as capturas reais já preparadas, sem gerar novos sistemas ou alterar páginas dedicadas.

1. **Entrada DocFácil:** a folha se desenrola e sobe para formar o documento; a pergunta encontra sua posição, a corujinha acompanha a dobra e repousa. Título, explicação e CTA ficam estáveis e legíveis ao final.
2. **Troca para VECOM:** no sentido da seta, a folha se recolhe e reorganiza em fichas; a pasta azul recebe as fichas e revela as telas. Luz e acentos mudam dentro da moldura comum. Não sugerir integração funcional entre produtos.
3. **Volta para DocFácil:** movimento correspondente no sentido oposto, com recomposição da folha. Não reproduzir um filme invertido com texto ou interface de trás para frente.
4. **Novo comando durante a troca:** responder partindo do estado visual atual, sem salto, duplicação de conteúdo, fila de animações ou bloqueio prolongado do controle.
5. **Repouso:** sem loop, troca automática ou movimento que distraia a leitura. Scroll vertical livre. Somente setas visíveis; no celular, também deslize lateral.

## O que precisa convencer

- A curvatura muda ao longo da superfície; a impressão não pode ser de uma imagem inteira inclinada ou deslizada.
- Borda, espessura aparente e sombra acompanham a forma, sem rasgos, achatamento súbito ou recortes de conteúdo.
- Mascote se relaciona com a superfície e não parece escorregar ou flutuar desconectado.
- Texto e captura permanecem nítidos; não deformar texto corrido para simular papel.
- A moldura não salta de tamanho entre projetos. Movimento tem começo, transformação e desaceleração perceptíveis, sem fazer o visitante esperar para navegar.
- Desktop e celular sustentam a composição. Movimento reduzido usa uma troca simples e legível; teclado e CTA continuam utilizáveis.
- A prova fica em repouso fora da viewport e com aba oculta. Fluidez é avaliada no navegador/dispositivo, não inferida da ferramenta ou do build.

## Limites técnicos e decisão

Avaliar deformação geométrica para a folha e camadas HTML para texto/ações. Camadas 2.5D ou vídeo podem apoiar detalhes, mas um vídeo sozinho não resolve a exigência de redirecionar um movimento em andamento. A escolha técnica precisa demonstrar essa interação na prova; não está fechada pela imagem.

Se B atingir os critérios, detalhar as demais passagens e a especificação revisada. Se não atingir, manter o palco com setas e as decisões do grill, adotando A como composição: documento, apoio mineral e mascote com coreografia em camadas. A alternativa troca a solução visual, não os requisitos de navegação ou conteúdo.

**Estado:** direção escolhida condicionalmente; prova local implementada abaixo, aguardando validação de Kauê.

## Prova local implementada

Rota: `http://localhost:3064/pt-BR/experimentos/vitrine` (também em `en-US`). Não substitui a home, não aparece no sitemap e recebe `noindex`.

- Folha em malha Three.js deformada por vértices; texto, ações e mascote permanecem em camadas HTML/imagem. Nenhuma dependência nova instalada.
- Um estado contínuo com velocidade preservada conduz a folha, fichas, pasta e dispositivos; novo comando muda o destino, sem reiniciar o estado visual.
- Entrada seguida de repouso, suspensão fora da viewport/aba, descarte do renderer ao desmontar e resolução de render limitada.
- Setas, teclado e deslize horizontal; versão mobile com áreas de texto/cena separadas e moldura de altura comum.
- Capturas VECOM e mascote DocFácil reutilizados dos assets aprovados. As interfaces são amostras visuais, sem operações reais.
- TypeScript passou. Teste `scripts/qa/stage-proof.cjs` verifica desktop/celular, reversão sem salto no comando, navegação por teclado, gesto, repouso, tamanho estável da moldura e fallbacks em inglês.
- Evidências: `docs/redesign-ruon/evidence/stage-proof/`, incluindo gravações de desktop/celular e `results.json`. WebGL foi exercitado no Chromium com renderização de software; isso não comprova fluidez em todos os dispositivos físicos.

**Estado atual:** prova local pronta para avaliação de Kauê. A composição é aproximada e o encontro geométrico entre os materiais ainda é parte da avaliação experimental. Nenhum build remoto ou alteração da vitrine publicada foi feito nesta rodada. A escolha B continua condicionada ao aceite do movimento; A continua disponível como alternativa.


## Revisão após avaliação — 14/11/2026

O usuário considerou a folha contínua pouco fluida e distante da referência, autorizando refinar ou aproximar da alternativa original. A prova atual adota **A — editorial**, com documento inclinado, apoio mineral e corujinha existente. A malha experimental permanece em `paper-surface.ts` como histórico, mas não é carregada nesta versão.

A troca é direcional: próxima entra pela direita e anterior pela esquerda. Texto sai em cerca de 240 ms; cenário sai em 620 ms; entrada desacelera entre 950 e 1350 ms, com pequenos deslocamentos relativos entre documento, base e mascote. Saída de texto precede sua entrada para evitar sobreposição. A região visual contém a passagem dos objetos, preservando a leitura. Não existe reprodução automática ou trabalho de animação em repouso.

Web Animations API anima transform/opacity; em novo comando captura a pose renderizada antes de cancelar o movimento anterior. Isso preserva posição e opacidade na interrupção, embora não seja uma simulação física com conservação de velocidade. Movimento reduzido troca imediatamente. Animações pausam quando a seção/aba fica oculta e são canceladas ao desmontar.

Validação desta revisão: `scripts/qa/stage-proof-editorial.cjs`, evidências em `docs/redesign-ruon/evidence/stage-proof/editorial/`. O script antigo `stage-proof.cjs` documenta a prova WebGL anterior e não representa mais o contrato da rota atual. Testar ambos os sentidos, inversão em andamento, sete cliques rápidos, teclado, gesto mobile, tamanho estável, repouso, inglês, movimento reduzido e conteúdo sem JavaScript. A avaliação estética permanece com Kauê; não foi alterada a home nem publicado o experimento.

## Segunda revisão — cenas de chegada e saída até a borda

Após aprovar a direção editorial, Kauê pediu que os objetos saiam até o limite do card e que cada projeto tenha uma apresentação própria depois da entrada. O recorte intermediário de texto/cena foi removido: somente a moldura externa recorta a passagem. Saídas percorrem mais que a largura inteira do card, sem reduzir a opacidade; textos e objetos saem em aproximadamente 820–900 ms.

Depois da troca, uma sequência finita apresenta o produto:

- DocFácil: a resposta é revelada, a confirmação aparece, as linhas do documento se completam e o selo de PDF fica visível. A corujinha existente inclina o corpo e faz um salto curto, com acomodação ao pousar. É animação 2.5D do asset completo; não há rig independente de olhos/asas nem vídeo novo.
- VECOM: celular reage ao envio; uma ficha ilustrativa percorre um arco até o computador; laptop/pasta respondem, e uma confirmação de recebimento permanece. As interfaces continuam sendo as capturas reais preparadas. A ficha/confirmacão são representação visual, não envio funcional nem dados de cliente.

As histórias duram cerca de 2,7–2,85 segundos e acontecem uma vez por chegada, inclusive no primeiro DocFácil. Novo comando continua disponível durante a história: sua pose é pausada enquanto o cenário sai; a apresentação do destino começa depois da troca. Pausa fora de viewport/aba, descarte ao desmontar e movimento reduzido continuam aplicáveis. Não há loop em repouso. Nenhuma dependência ou asset gerado adicional.

Implementação das sequências em `stage-entrance.ts`. QA editorial ampliado verifica opacidade integral na saída, ausência de máscara intermediária, ficha em movimento/tamanho contido e reação da corujinha após chegada, além da navegação e fallbacks já existentes. Rota experimental local; home e deploy preservados.

Correção de continuidade: a sequência interna agora é criada e pausada no instante zero antes da entrada do destino. Ao encaixar, a mesma sequência retoma; não recriar os detalhes já visíveis no fim da transição. Isso evita o flash de documento completo seguido de retorno ao estado inicial.
