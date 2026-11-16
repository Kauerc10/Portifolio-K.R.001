# Direção por seção — 16/11/2026

O usuário escolheu a proposta B isolada de Competências como referência de linguagem: branco com camadas lilás discretas, escala equilibrada, divisórias finas, ícones pequenos e grupos legíveis. Uma imagem por seção, derivada da captura atual da aplicação na branch home-editorial-88, não das referências antigas. Demais imagens são propostas aguardando escolha, não implementação aprovada.

## Movimento planejado

Um plano de fundo visualmente vivo não exige animação contínua. Ondas são planos decorativos suaves, de baixo contraste e separados do conteúdo; sua forma pode se revelar/recompor uma vez durante entrada da seção e depois repousar. Nada segue o mouse ou distorce texto. Aproveitar a infraestrutura de escopos, pausa e interrupção da vitrine, com intensidade menor nas áreas de leitura. Não importar o palco nem fixar cada seção durante scroll.

| Seção | Coreografia proposta | Resposta à ação |
|---|---|---|
| Sobre | Curva lilás abre a composição, título e apresentação se assentam em dois tempos curtos | Links e áreas ganham acento local por foco/hover |
| Experiência | Filete cresce até o marco visível; empresa/data recebem ênfase breve e param | Projetos citados usam setas/sublinhado, sem animar cada bullet |
| Competências | Três grupos se organizam em cascata curta; divisórias desenham a relação entre aplicação e ferramentas | Evidência ligada a projeto real recebe realce, chips discretos não saltam |
| Formação | Linha e grupos entram respeitando a leitura; dados continuam disponíveis desde HTML | Ver todos expande no fluxo, conteúdo reacomoda suavemente sem cortar foco |
| Conquistas | Medalhas decorativas se assentam com pequena translação e luz suave única | Link de premiação e foco respondem; sem giro/tilt/loop de medalhas |
| Contato | Superfície do formulário e curva de fundo aparecem juntas | Foco/validação/envio/sucesso têm continuidade e feedback real |
| Rodapé | Divisória e onda concluem a composição em repouso | Voltar ao topo respeita interrupção e reposiciona foco somente quando concluído |

Entradas de 350–650ms com intervalos locais de 60–100ms, respostas de 140–220ms, são hipóteses para prova no navegador. Não repetir um fade idêntico em toda a página; não animar cada texto. A tipografia permanece nítida e estável. Redução de movimento aplica composição final imediata; pausa fora da viewport/aba e cancelamento em troca rápida são obrigatórios. Não criar loops RAF em repouso. Em mobile simplificar camadas e deslocamentos, preservando personalidade e toque.

As imagens representam somente um estado final da direção, não comprovam qualidade de animação. Validar movimento por vídeo da página real, com teclado/toque e dispositivo de teste. Preservar intro, hero e vitrine atuais; não implementar neste lote nem presumir aceite das propostas ainda não escolhidas.

Geração pelo imagegen integrado. Fontes visuais: captura da seção atual e imagem de Competências escolhida pelo usuário. Texto em bitmap é indicativo: fatos, links e rótulos finais devem continuar vindo dos dados atuais; erros de geração não alteram conteúdo autorizado.
