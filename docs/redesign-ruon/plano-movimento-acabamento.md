# Movimento e acabamento — proposta de refinamento

11/11/2026. Pesquisa e planejamento solicitados após correção da grade. Tickets #49 e #52–#62 continuam abertos. Este documento não representa implementação aprovada ou validação concluída.

## Direção

Preservar a linguagem editorial e o espaço conquistado. Acrescentar ritmo, materialidade mineral e respostas às ações. A abertura é o momento principal; o restante usa gestos menores e coerentes. Reduzir escala dos elementos secundários que competem com títulos, sem encolher a leitura no celular. As referências aprovadas continuam a autoridade visual.

## Evidência no código

A introdução começa desabilitada, não renderiza diálogo no primeiro HTML e só abre após efeitos React. Isso permite que o hero seja pintado antes da cobertura branca: causa provável da piscada, a confirmar por gravação de carregamento frio. O atraso da segunda linha depende de seletor de irmãos, mas existe um espaço JSX entre spans; a sequência deve ter fases explícitas, não depender desse detalhe estrutural. Os tempos atuais se sobrepõem cedo e o botão surge antes de uma pausa de leitura clara.

## Abertura proposta

| Tempo inicial indicativo | Evento | Tratamento |
|---|---|---|
| 0–180 ms | Branco sozinho | Cobertura pronta na primeira pintura elegível, sem hero ou botão visível |
| 180–760 ms | Primeira linha | Revelação por máscara de linha, subida curta com desaceleração pronunciada; grupos de palavras separados por 35–50 ms, sem efeito de digitação |
| 650–1280 ms | Segunda linha | Mesmo vocabulário com leve deslocamento de fase; violeta permanece pigmento, sem brilho neon |
| 1250–1600 ms | Apresentação de apoio | Entrada curta e discreta, após as duas linhas terem se estabelecido |
| 1600–1850 ms | Continuar | Surge por último; seta e sublinhado respondem ao hover/foco, sem pulsação permanente |
| Após ação | Encaixe no hero | Transformação medida no layout real, 800–1000 ms, cobertura branca recua enquanto a paisagem aparece; finalizar sem duplicação ou salto do texto |

Tempos são ponto de partida para protótipo, não bloqueios rígidos. Não prolongar o branco por carregamento de imagem; fonte e layout devem estar prontos ou usar saída estável. No estado de espera não há avanço automático. Nenhum botão invisível deve receber foco ou capturar clique antes da fase apropriada.

## Eliminar a piscada sem bloquear a página

Resolver elegibilidade antes da primeira pintura: sessão, hash direto e movimento reduzido. Preferir uma cobertura de aprimoramento progressivo ativada por bootstrap mínimo pré-pintura, com estado equivalente ao componente e limpeza centralizada. Não esconder o documento inteiro até uma promessa de imagem ou fonte se resolver. Sem JS, página disponível; falha de inicialização deve liberar cobertura por saída de segurança. Não usar apenas useLayoutEffect como garantia universal contra flash antes de hidratação.

Uma máquina de fases explícita: ignorar → branco → linha1 → linha2 → apoio → pronta → encaixe → concluída. Cancelar animações ao desmontar; armazenar conclusão apenas quando realmente finalizada. Resize durante encaixe resolve para estado final válido. Escape, redução de movimento e hash direto têm saída funcional. Manter foco contido durante diálogo e devolvê-lo ao título no fim. Um título semântico principal, duplicatas visuais fora da leitura assistiva.

## Microinterações por área

- Navegação: sublinhado acompanha o item, seta desloca 2–3 px no hover/foco; nenhum salto de layout.
- Projetos: indicador ativo desliza no eixo da lista; painel troca com sobreposição breve de opacidade e deslocamento de 8–12 px, mantendo altura e foco. Seleções rápidas cancelam a anterior.
- Sobre: composição estável; faixa mineral como detalhe de borda, sem ocupar área do texto ou parecer banner.
- Experiência/Formação: ponto e linha da etapa podem revelar-se uma vez ao entrar; texto já disponível. Expansão dos cursos acompanha conteúdo real com altura automática e foco preservado.
- Competências: resposta de cor/borda e ícone discreto, sem chips pulando individualmente ou animação aleatória.
- Conquistas: medalhas com acabamento material; resposta curta no cartão e seta de certificado, sem rotação em loop ou tilt por mouse.
- Contato: feedback de foco, pressão, envio, sucesso e erro com continuidade; retorno ao topo mantém foco correto.
- Hero: preservar imagem estável e futura interação de máscaras da #49 como entrega distinta. Não simular a animação de caminhos por scroll nesta rodada.

Faixa de respostas locais: 140–220 ms, percursos maiores 300–450 ms. Uma curva de desaceleração compartilhada para movimento, ease-out simples para opacidade. Não aplicar o mesmo reveal em todos os parágrafos. Respeitar movimento reduzido em toda a cadeia, inclusive animações CSS e bootstrap.

## Escala e materialidade

Revisar títulos secundários, medalhas, chips e padding de cartões em comparação com os PNGs e viewport real. Redução inicial de 8–15% somente onde comprovadamente dominam a hierarquia; manter controles de toque com pelo menos 44 px. Não reduzir todos os elementos por uma transformação global.

Gerar com imagegen faixas de caminho violeta e terreno mineral baixo, com alpha verdadeiro. Arte decorativa nas bordas inferiores, atrás do conteúdo; miolo de leitura livre. Preparar derivados desktop/mobile mantendo proporção, sem ampliar textura em excesso. Não repetir a mesma faixa idêntica em todas as seções. Não converter imagem com fundo branco em transparência por blend-mode, especialmente no tema escuro.

Cada asset deve ter fonte, prompt, referência de estilo, dimensão, alpha e peso registrados. Fonte PNG preservada; derivados de entrega dimensionados para uso real. Inspecionar sobre fundo claro e escuro antes de integrar. Falha do asset não afeta texto ou ações.

## Ordem de execução futura

1. Corrigir primeira pintura e fases da abertura; gravar carregamento frio antes/depois.
2. Prototipar o ritmo e encaixe com texto real em desktop/mobile; revisar um ciclo completo.
3. Calibrar escala dos componentes secundários, integrar assets em uma seção piloto e conferir contraste.
4. Aplicar microinterações por função, reutilizando contratos existentes e cancelamento.
5. Validar página completa, registrar diferenças intencionais e atualizar evidências nos tickets, sem fechá-los antes de conclusão real.

## Validação

Gravar vídeo/filmstrip desde primeira pintura em nova sessão, sessão recorrente, hash direto, cache frio e carregamento lento. Conferir ausência de frame do hero antes do branco, ordem das linhas, botão por último e encaixe sem duplicação. Testar armazenamento indisponível, JS ausente, falha de fonte/imagem, resize e preferência de movimento alterada durante animação.

Revisão visual em 390, 768, 1440 e 1920 px, PT/EN e temas disponíveis; teclado, toque e zoom200%. Uma rodada conjunta de inspeção, correções em lote e uma confirmação. Testes automatizados de estados e navegação, sem congelar coordenadas artísticas ou depender de sleeps arbitrários. Medir CLS, custo das animações e ausência de loops em repouso. Não anunciar aprovação estética apenas por build/testes.

## Referências pesquisadas e limites

- GSAP, Avoiding FOUC: https://gsap.com/resources/fouc/ — estado inicial em CSS e fallback sem JS; sustenta tratar primeira pintura, não só o tween.
- Codrops, Typography: https://tympanus.net/codrops/tag/typography/ — repertório de máscaras, ritmo e revelação tipográfica; usar princípios, não copiar efeitos inteiros.
- Codrops, Playground: https://tympanus.net/codrops/category/playground/ — exploração de transições; não justifica acrescentar WebGL à abertura textual.
- Awwwards, Animation: https://www.awwwards.com/websites/animation/ — tentativa de consulta retornou timeout; não houve inspeção de interações ao vivo nem avaliação de sites individuais nesta pesquisa.

Animation Maker não expôs ferramentas nesta sessão. Direção apoiada em Impeccable, Designly, Design Partner e contexto de jornada do Design Arc/Product Design; geração raster pelo imagegen integrado. Nenhuma instalação, compra ou mudança de stack necessária para este plano.
