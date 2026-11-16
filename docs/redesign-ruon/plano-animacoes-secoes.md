# Plano de movimento ao longo do portfólio

11/11/2026. Direção escolhida após a aprovação da troca PT↔EN. A linguagem conecta camadas violetas, uma borda mineral clara e movimentos que terminam no alinhamento do conteúdo.

## Abertura implementada nesta rodada

A saudação entra por grupos de palavras. A primeira linha começa em 300 ms, a segunda em 1,1 s e a apresentação em 2,15 s. O botão chega por último e fica disponível em cerca de 3,35 s. O visitante decide quando continuar.

Após o clique, duas superfícies diagonais passam atrás da tipografia enquanto o texto percorre a distância até o hero. A borda clara antecede a superfície violeta. O contraste da tipografia acompanha a passagem da superfície. O encaixe dura aproximadamente 1,9 s. Os pontos de origem e chegada vêm das posições reais em cada largura. Movimento reduzido, acesso direto por âncora, retorno na sessão e cancelamento seguem o contrato já implementado.

Os tempos são parâmetros da coreografia. O teste visual decide se existe pausa suficiente e se o texto fica legível durante a passagem.

## Próximas fatias propostas

| Trecho | Movimento proposto | Como avaliar |
|---|---|---|
| Hero → Projetos | A fita já presente na paisagem orienta uma máscara diagonal curta na margem da primeira seção. O título permanece como ponto de leitura. | A revelação acompanha a chegada à seção, preserva rolagem natural e nunca cobre o conteúdo em repouso. |
| Projetos | O marcador desliza entre opções e uma borda violeta atravessa o painel na mesma direção da seleção. No Atlas, os três nós do fluxo recebem ênfase sequencial uma única vez. | Trocas rápidas cancelam a anterior e mostram sempre o projeto selecionado. Teclado, hash e botão voltar continuam coerentes. |
| Sobre | A arte da fita entra por uma máscara curva, abrindo espaço visual entre a apresentação e as três áreas. O acento de cor acompanha o alinhamento da fita. | Texto e links ficam disponíveis desde o primeiro render; a arte termina na mesma posição do layout aprovado. |
| Experiência | O filete se desenha até o marco que chega à área de leitura. O nó ganha cor e o período recebe um realce breve, mantendo títulos imóveis. | Os dois registros permanecem completos em celular, tema escuro e movimento reduzido. |
| Competências | O foco num link de projeto acende o filete do grupo correspondente. Uma faixa clara se desloca sob a tecnologia relacionada. | O efeito explica qual aplicação será aberta e oferece resposta equivalente por foco, toque e hover. |
| Formação | Ao expandir os cursos, o filete cresce junto com a lista e uma borda violeta acompanha o início dos novos itens. | Novos cursos e instituições entram sem cortes; o foco permanece no controle e a expansão nativa funciona sem JavaScript. |
| Conquistas | Uma passagem de luz muito suave percorre o contorno das medalhas na primeira exposição. O link do resultado oficial recebe um sublinhado desenhado ao foco. | A iluminação acaba em repouso, preserva legibilidade e diferencia decoração de evidência. |
| Contato | O foco desloca um realce lateral até o campo ativo. O envio usa um percurso curto da seta, e o retorno ocupa uma região reservada. | Erro mantém o texto e aponta o campo. Sucesso só aparece após confirmação do backend. Sem mudança inesperada de altura. |
| Rodapé → Hero | O retorno ao topo é acompanhado por um detalhe violeta no controle e encerra no título com foco visível. | A abertura não reaparece e a navegação respeita movimento reduzido. |

## Ritmo e implementação

1. Provar a passagem Hero → Projetos e a troca de projeto como uma fatia completa.
2. Provar o filete de Experiência e a expansão de Formação com dados extensos.
3. Integrar Sobre, Competências e Conquistas à mesma linguagem de cor e máscaras.
4. Refinar Contato e Rodapé, depois revisar a página inteira para dosar os movimentos.

Reservar o movimento de tela inteira para a abertura e a mudança de idioma. As transições entre seções usam partes da composição e o conteúdo como âncora. Respostas locais ficam em torno de 160–320 ms. Entradas de arte e filetes podem levar 450–900 ms. Executar as entradas uma vez por visita e cancelar movimentos anteriores ao receber nova interação. Pausar efeitos fora da área visível.

A implementação pode usar CSS para estados e máscaras simples e a Web Animations API para coordenar/cancelar sequências. A stack atual cobre essas propostas. Uma eventual animação de expansão precisa acompanhar a altura real da lista e a mudança de tamanho da janela.

## Aceite e evidências

- Conferir a página integrada em 390, 768, 1440 e 1920 px, PT/EN e ambos os temas.
- Verificar teclado, toque, hash, histórico, zoom, preferência dinâmica por movimento reduzido e falha de script.
- Gravar as passagens em desktop e celular. Capturar começo, passagem e repouso.
- Medir o custo com o mesmo cenário antes/depois. Somente relatar fluidez e desempenho que tenham sido observados.
- Todo conteúdo permanece disponível quando as animações estão desativadas.

## Prova da abertura

A sequência foi verificada em Chromium nas larguras de 390 e 1440 px. Botão com acionamento manual, encaixe, foco final no título e retorno na sessão passaram. As capturas da passagem foram usadas para ajustar o contraste e adiar o subtítulo e as ações do hero até a aproximação final do título. Os elementos claros acompanham a máscara violeta e ficam fora da árvore acessível.

TypeScript e a suíte de 52 testes passaram na primeira rodada. Após os ajustes de contraste e sobreposição, a rodada focada de Hero e Jornada passou com 11 testes. Vídeos e quadros estão na pasta de visualizações da sessão, em intro-layers-shipped.
