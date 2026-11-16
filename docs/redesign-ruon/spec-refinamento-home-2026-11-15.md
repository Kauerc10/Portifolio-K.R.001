# Spec — Continuidade editorial e refinamento da home

Publicada como [issue #88](https://github.com/Kauerc10/Portifolio-K.R.001/issues/88), com `ready-for-agent`.

## Problem Statement

Os cases e a vitrine em palco chegaram a um acabamento aprovado, mas o restante do portfólio ainda não comunica o mesmo cuidado de forma contínua. Depois dos projetos há intervalos extensos, títulos com pesos semelhantes e repetição entre apresentação e competências. Um defeito de grid separa textos e tecnologias em Competências. O rodapé da home diverge do fechamento dos cases, e nomes acessíveis em inglês ainda aparecem em português.

Também existe uma divergência de conteúdo público: metadados e dados estruturados mantêm cargos, organização e afirmações da direção antiga. O visitante e quem recebe um link compartilhado precisam encontrar a mesma apresentação profissional, factual e acolhedora.

Para Kauê, o objetivo é deixar todo o portfólio na estética já aprovada: branco mineral, violeta RUON, personalidade, clareza e animações criativas que ajudam a compreender. Para o público principal — recrutadores — a página precisa facilitar uma avaliação rápida; clientes são o público secundário. Esta entrega é refinamento da experiência existente, não uma nova identidade.

## Solution

Refinar Sobre, Experiência, Competências, Formação, Conquistas, Contato e Rodapé como uma sequência coerente, usando os cases atuais como referência de clareza e acabamento. Corrigir os defeitos de estrutura antes de acrescentar efeitos. Manter as composições, artes e decisões aprovadas da introdução, hero e vitrine; testar esses trechos como regressão.

Equilibrar a escala dos títulos por função, encurtar intervalos sem amontoar conteúdo, conectar competências a evidências e tornar a formação escalável. Harmonizar fechamento, navegação, estados e microinterações entre home e cases. A apresentação deve soar como Kauê: humana, direta e específica, com explicação antes de frases de efeito.

A implementação será dividida em quatro fatias lógicas. Cada uma termina com evidência integrada e preview para Kauê testar antes de avançar à seguinte.

## User Stories

1. Como recrutador, quero entender rapidamente a atuação de Kauê, para avaliar sua adequação à oportunidade.
2. Como recrutador, quero passar dos projetos à trajetória sem atravessar grandes intervalos vazios, para manter o contexto da avaliação.
3. Como visitante, quero reconhecer a mesma identidade entre home e páginas de case, para perceber uma experiência contínua.
4. Como visitante, quero distinguir títulos de abertura, títulos de leitura e informações auxiliares, para escanear a página com facilidade.
5. Como visitante, quero ler textos concretos e humanos, para compreender o trabalho sem decifrar slogans.
6. Como visitante, quero conhecer uma apresentação pessoal curta, para entender quem está por trás dos projetos.
7. Como visitante, quero reconhecer Desenvolvimento, Automações e Suporte, para compreender as áreas de atuação já apresentadas.
8. Como recrutador, quero encontrar funções, empresas, períodos e localização de forma clara, para entender a trajetória profissional.
9. Como recrutador, quero distinguir emprego, iniciativa própria e desenvolvimento sob demanda, para interpretar corretamente a experiência.
10. Como recrutador, quero que resultados numéricos mantenham contexto e origem, para não confundir exemplo com garantia.
11. Como visitante, quero ver competência, aplicação e ferramentas relacionadas no mesmo bloco, para compreender sua conexão.
12. Como recrutador, quero acessar um exemplo de projeto a partir das competências, para verificar o que foi apresentado.
13. Como visitante no celular, quero encontrar competências numa ordem previsível, para não perder a relação entre explicação e tecnologias.
14. Como visitante, quero consultar as ferramentas com peso visual secundário, para não confundi-las com a principal evidência profissional.
15. Como visitante, quero acessar o currículo existente, para aprofundar a avaliação sem procurar um novo caminho.
16. Como visitante, quero encontrar formação agrupada por tipo e instituição, para compreender o percurso acadêmico e complementar.
17. Como visitante, quero consultar muitos cursos sem recortes ou alturas fixas, para acessar uma formação que cresce.
18. Como visitante de teclado, quero expandir e recolher cursos sem perder o foco, para continuar a leitura pelo mesmo controle.
19. Como visitante, quero consultar a formação mesmo sem JavaScript, para não depender da animação para obter a informação.
20. Como visitante, quero diferenciar medalhas, menções e ilustrações decorativas, para entender o reconhecimento real.
21. Como visitante, quero que o nome de um link de comprovação descreva seu destino, para saber se abrirei certificado, premiação ou perfil.
22. Como visitante, quero descobrir as seções da trajetória sem um menu extenso, para chegar diretamente ao assunto relevante.
23. Como visitante, quero que menu, âncoras e retorno de case mantenham orientação e foco, para retomar de onde estava.
24. Como visitante no celular, quero acionar links de evidência com conforto, para não depender de toques muito precisos.
25. Como visitante, quero reconhecer os mesmos padrões de marca, links e estados no rodapé da home e dos cases, para concluir a visita com continuidade.
26. Como potencial cliente, quero encontrar os canais diretos e o formulário, para iniciar uma conversa do modo que preferir.
27. Como visitante preenchendo o contato, quero identificar campo ativo, erros e andamento, para enviar com segurança.
28. Como visitante, quero manter o texto ao receber uma falha recuperável, para corrigir ou tentar novamente sem recomeçar.
29. Como visitante, quero receber confirmação de sucesso somente após resposta do serviço, para confiar no resultado.
30. Como visitante de teclado, quero foco visível e ordem de leitura coerente, para usar a página sem mouse.
31. Como visitante em inglês, quero textos visíveis e nomes acessíveis no mesmo idioma, para entender todos os controles.
32. Como visitante, quero trocar idioma e tema sem efeitos concorrentes, para continuar no contexto escolhido.
33. Como visitante com movimento reduzido, quero conteúdo e estados completos sem deslocamentos decorativos, para navegar confortavelmente.
34. Como visitante, quero que as animações acompanhem a leitura e terminem em repouso, para não esperar nem disputar atenção com elas.
35. Como visitante, quero interromper uma interação ou sair da seção sem deixar efeitos pendentes, para manter o controle da navegação.
36. Como visitante, quero que as artes preservem proporção e espaço reservado, para não encontrar conteúdo recortado ou sobreposto.
37. Como pessoa que recebe um link compartilhado, quero encontrar título e descrição coerentes com a página, para compreender a atuação real de Kauê.
38. Como responsável pelo portfólio, quero que os dados estruturados representem somente fatos confirmados, para não sugerir cargos, vínculos ou formação inexistentes.
39. Como responsável pelo portfólio, quero acrescentar cursos e instituições pelos dados, para não precisar ajustar o layout ou a animação a cada inclusão.
40. Como responsável pelo portfólio, quero revisar cada fatia no preview com evidências desktop e celular, para aprovar a evolução antes de continuar.
41. Como responsável pelo portfólio, quero preservar a introdução, hero, vitrine e cases aprovados, para que o refinamento não desfaça o trabalho anterior.

## Implementation Decisions

### Autoridade visual, escopo e conteúdo

- A direção vigente é a composição editorial aprovada: branco mineral, texto escuro, violeta RUON e acentos secundários discretos já presentes nas referências. As imagens selecionadas de cada seção e os cases refinados são a autoridade visual; não substituir a estética por recomendações genéricas do detector.
- **O agente implementador deve abrir e visualizar as imagens aprovadas antes de codar**, incluindo a referência da seção trabalhada e capturas dos cases atuais. Nomes, descrições e prompts não substituem essa inspeção. Comparar o resultado integrado com essas referências, registrando adaptações intencionais de celular. Se uma referência indispensável estiver indisponível, registrar a falta e obter acesso antes de redesenhar a seção.
- Preservar introdução sobre branco, botão Continuar, transferência do texto ao hero, portais e arte de fundo atual. Preservar a transição PT↔EN aprovada.
- Preservar vitrine em palco editorial, cinco projetos na ordem VioDigital → VECOM → Atlas Notarial → DocFácil → CKF, setas, ciclo, gesto lateral, repouso e acesso opcional ao case. Sem contador, índice de nomes ou troca automática na vitrine.
- Preservar as páginas de case refinadas; nelas, alterar somente o necessário para compartilhar padrões de rodapé/estados ou corrigir regressões introduzidas pelo refinamento.
- Redação em primeira pessoa quando apropriado, frases claras, fatos e contexto. Evitar superlativos de competência, garantias de resultado, nova frase-ponte sem informação ou criação de cargos para melhorar o posicionamento.
- RUON é marca própria; VECOM e CKF são desenvolvimento sob demanda. Atlas é produto próprio que nasceu de uma necessidade do cartório. Premiação não deve ser modelada como formação numa instituição.
- A auditoria é evidência de partida, não uma lista de 45 defeitos: sinais automáticos precisam de confirmação por contexto, visibilidade e fundo renderizado antes de virarem correção.

### Base visual e ritmo

- Aproveitar a estrutura de seções e os componentes existentes. Consolidar papéis equivalentes de cor, texto secundário, divisória, espaçamento, foco e rodapé; manter variantes de escala quando home e case cumprem funções diferentes.
- Não executar migração global de CSS ou de fontes como condição para o refinamento. Resolver os trechos tocados sem depender de sobrescritas genéricas que alterem hero ou palco.
- Manter título expressivo na abertura das seções, com hierarquia menor para registros, grupos, cursos e explicações. Não aplicar a escala de um hero a todos os títulos, nem reduzir toda a página ao mesmo tamanho de texto.
- Encurtar a cadência depois da vitrine: remover somas de padding, margem e área de arte que produzam lacunas sem função. Espaço reservado a uma arte deve acompanhar sua dimensão real. A altura total da página não é, sozinha, critério de defeito nem há meta arbitrária de redução percentual.
- Alinhar as bordas das seções à grade compartilhada e usar largura de leitura limitada nos parágrafos. Evitar linhas muito longas, viúvas prejudiciais, títulos colidindo com imagens e texto comprimido por colunas vazias.
- Artes devem manter proporção e não interceptar interação ou semântica acessível. Reservar dimensão antes do carregamento e manter fallback legível.

### Sobre e Experiência

- Sobre apresenta quem é Kauê e como sua atuação se conecta às rotinas reais. Usar uma apresentação pessoal curta a partir dos fatos aprovados; não expor automaticamente todo texto antigo dos dicionários.
- Preservar as três áreas de atuação e a arte escolhida. Reduzir repetição do hero e das competências por meio da informação, não por trocar palavras por slogans equivalentes.
- Experiência mantém a timeline, as empresas e as contribuições já confirmadas. Períodos e localização ficam associados ao registro, com contraste e escala secundária legíveis.
- Distinguir a função no cartório da iniciativa de desenvolver ferramentas. Resultados específicos, quando confirmados na base atual, mantêm escopo e contexto; não generalizar um tempo de uma etapa para todo o produto.
- O filete e os marcos acompanham a altura real de cada registro em ambos os idiomas. Não usar espaço fixo que dependa de textos curtos ou de uma única largura.

### Competências

- Corrigir primeiro o defeito de composição: a linha de movimento é decorativa e não ocupa uma célula destinada ao conteúdo. Texto e tecnologias terão relação deliberada em duas colunas no desktop e uma sequência coerente no celular.
- Preservar os grupos Desenvolvimento, Automação e IA aplicada, com ferramentas em contexto e links reais de evidência. A relação com projeto deve preceder visualmente a lista secundária de tecnologias.
- Não remover informações de competência apenas para caber nem introduzir acordeão adicional por padrão. Após corrigir o grid, ajustar agrupamento e peso dos chips conforme a evidência visual.
- Preservar acesso ao currículo existente. Não substituir o PDF ou cadastrar nova versão nesta entrega.
- Links para prévias devem selecionar o projeto correto e continuar utilizáveis com teclado, toque e retorno do case. Preferir destinos canônicos existentes e preservar compatibilidade de links anteriores.

### Formação e Conquistas

- Formação mantém Ensino superior, Cursos e certificações e Educação básica, com instituições e metadados orientados pelos dados.
- Manter resumo inicial de até seis cursos complementares e expansão nativa quando houver mais. Agrupar corretamente instituições no resumo e na continuação, sem duplicação desnecessária ou perda de contexto.
- Títulos longos e ausência de horas, data, instituição ou evidência não criam lacunas artificiais nem texto presumido. Novo curso não exige nova coreografia ou altura fixa.
- Foco permanece no controle de expansão; abrir, recolher e reabrir preserva ordem e leitura. Sem JavaScript, o comportamento nativo permite consultar a lista completa.
- Conquistas preserva prata regional, bronze nacional e menções honrosas, com medalhas decorativas e destinos oficiais existentes. Não gerar certificados ou provas fictícias.
- Conferir a correspondência entre rótulo e destino: listagem de premiados deve ser apresentada como premiação/resultado; perfil deve ser identificado como perfil. Só usar certificado/credencial direta quando o destino realmente corresponder. A falta de link específico do Scrum não bloqueia o restante do refinamento nem autoriza inventá-lo.
- Equilibrar proporção da mídia e textos; ampliar conforto das ações isoladas, sem tornar todos os links botões grandes.

### Navegação, idioma, contato e rodapé

- Manter as entradas principais Projetos, Trajetória e Contato. Trajetória passa a oferecer acesso compacto às seções Sobre, Experiência, Competências, Formação e Conquistas, em um agrupamento acessível por clique, toque e teclado. Evitar cinco novos links permanentes na barra.
- Agrupamento informa estado aberto/fechado, fecha por Escape e devolve foco ao acionador; selecionar um destino fecha o agrupamento e posiciona a seção. Não depender de hover. Preservar alternativas de âncora e leitura se a camada interativa falhar.
- Não adicionar numeração editorial ou índice na vitrine. A navegação da trajetória e a seleção de projetos são responsabilidades diferentes.
- Localizar nomes acessíveis e titles do tema, landmarks e menu com o dicionário ativo, além dos textos visíveis. Preservar contexto e preferência ao trocar idioma/tema.
- Contato mantém canais diretos, formulário e feedback existentes. No celular, canais e explicação antecedem o formulário. Não aumentar o volume de texto para preencher espaço.
- Manter labels, autocomplete, erros junto aos campos, foco no primeiro erro, estado ocupado, preservação de valores em falha recuperável e proteção contra envio concorrente. Sucesso só após confirmação do serviço.
- Harmonizar marca, divisória, links e estados dos rodapés da home e dos cases por uma base compartilhada. Permitir conteúdo próprio: home com canais e copyright; case com retorno à prévia de origem e próximo case. Não eliminar acessos públicos existentes para tornar os rodapés idênticos.
- Retorno ao topo não repete a introdução. Finalizado um retorno iniciado pelo visitante, foco vai ao título; se o visitante interromper o deslocamento, não roubar foco posteriormente. Movimento reduzido resolve o retorno diretamente.
- Alvos isolados usam área de toque confortável, com meta de 44 px quando adequada. Validar o mínimo aplicável e o espaçamento; links inline admitem tratamento próprio. Não declarar falha WCAG apenas porque um link mede menos de 44 px.

### Microinterações e ciclo de vida

- Aproveitar os escopos locais e a stack de movimento existente. Não há necessidade demonstrada de nova dependência, vídeo ou motor 3D.
- Texto e controles essenciais estão disponíveis no HTML e não ficam ocultos aguardando animação. Movimento organiza a atenção e termina em composição estável.
- Sobre: revelação da arte e acentos existentes coordenados com a leitura; sem deslocar o texto para fora de sua região.
- Experiência: filete e marcos respondem à rolagem; datas recebem ênfase breve, sem reiniciar continuamente ao entrar e sair.
- Competências: foco/hover realça o grupo associado à evidência; toque navega no primeiro acionamento, sem etapa preparatória. Decoração não altera a grade.
- Formação: expansão acompanha a altura intrínseca; sinal de continuação acompanha a lista, sem fila de animações por curso.
- Conquistas: realce breve nas medalhas, depois repouso; foco/hover dos links tem resposta equivalente.
- Contato/rodapé: acompanhar foco e estado com microinteração discreta. O efeito não atrasa uma resposta de rede nem simula sucesso.
- Sem captura da rolagem, nova fixação temporária em todos os trechos, paralaxe de mouse ou ciclos decorativos permanentes. A vitrine e os cases mantêm seus contratos próprios de movimento.
- Interrupção, redimensionamento, troca de idioma, aba oculta ou mudança de preferência não deixam máscara, transformação, fila ou indicador de estado antigo. Suspender trabalho fora da área visível; limpar recursos ao desmontar.
- Movimento reduzido entrega conteúdo e estados finais imediatamente, sem eliminar foco, feedback e hierarquia. Tratar a mudança dessa preferência durante a sequência, não apenas no carregamento.

### Conteúdo público e dados estruturados

- Reconciliar título, descrição, compartilhamento e dados estruturados em PT/EN com a apresentação factual aprovada. Usar a atuação confirmada em desenvolvimento, automações e suporte como base; não criar um novo cargo formal.
- Remover garantias como “tolerância zero a erros” e vínculos/cargos não sustentados pelas informações atuais. Não usar K-HUB como publisher/empregador por herança de conteúdo antigo; representar Kauê e RUON conforme sua natureza confirmada.
- Premiações OBMEP são reconhecimentos, não relação de ex-aluno com IMPA/OBMEP. Campos de formação só recebem instituição efetivamente confirmada, sem inferência a partir de medalha.
- Manter canonical, idiomas alternativos, identidade, contatos e destinos válidos. Modelar apenas o que o vocabulário e o tipo de dado suportam; preferir omitir campo incerto a inventar seu valor.
- Nenhuma mudança de schema de banco, contrato de e-mail ou API de produto faz parte da entrega. Atualizar os dados estruturados públicos é uma correção editorial, não migração de banco.

### Ordem de execução e aceite das fatias

1. **Fundação e defeitos concretos:** corrigir grid, metadados/dados estruturados e nomes acessíveis. Aceite: competências relacionadas corretamente; apresentação pública coerente; EN sem labels PT nos controles tocados; sem regressão de home/cases.
2. **Sobre + Experiência:** apresentação mais pessoal, cadência de leitura, períodos e evidência contextual. Aceite: comparação com referências, nenhuma repetição sem função, artes sem recorte, timeline íntegra em ambos os idiomas.
3. **Competências + Formação + Conquistas:** evidência prioritária, listas escaláveis, comprovações bem nomeadas e toque confortável. Aceite: links corretos, fixture extensa sem recortes, expansão e foco preservados, hierarquia legível.
4. **Contato + Rodapé + continuidade:** compartilhar família visual dos encerramentos, concluir agrupamento de Trajetória e coordenar microinterações. Aceite: jornada integrada, estados do contato simulados, navegação e retorno consistentes em todas as páginas afetadas.

Cada fatia deve incluir a microinteração pertinente e seus fallbacks; não deixar toda a acessibilidade ou todo o movimento para uma revisão final. Na criação futura de tickets, definir responsáveis e dependências por esses limites e não recriar entregas antigas já implementadas. `ready-for-agent` da spec não elimina a conferência do estado dos tickets relacionados.

## Testing Decisions

- **Ponto principal de validação, confirmado por Kauê nesta conversa:** jornada real no navegador, percorrendo a home, abrindo um case e voltando, usando menu, expansão dos cursos e contato em desktop/celular, PT/EN, ambos os temas e movimento reduzido, sem envio real de e-mail.
- Preferir essa única fronteira de comportamento público às novas interfaces de teste em cada componente. Teste bom verifica conteúdo, agrupamento, destino, foco, estado e leitura final; não se prende a classe CSS, número de nós decorativos ou duração exata de quadros.
- Reutilizar a cobertura existente de jornada do redesign, shell/navegação, interação do hero, internacionalização, formação, refinamentos, contato e escopos de movimento. Reutilizar verificações de mídia, galerias e retorno da vitrine aos cases para regressão. Adicionar cobertura somente para contratos novos ou defeitos que esses testes não alcancem.
- A aparência exige comparação visual com as imagens aprovadas: abrir as referências, capturar a mesma região na página completa e conferir composição/repouso. Um detector limpo, teste unitário ou HTTP 200 não comprova acabamento.
- Matriz principal: 390 px e 1440 px, PT/EN, claro/escuro. Amostrar 360, 768 e 1920 px para quebras de layout; texto ampliado/zoom de 200%, nomes longos e navegação por teclado. Registrar viewport, navegador e condições. Não declarar prova em celular físico quando foi emulação.
- Competências: em desktop, texto e ferramentas correspondentes permanecem relacionados; no celular, ordem é título/explicação/evidência/ferramentas, sem célula vazia criada pela decoração. Testar sem a camada de movimento.
- Navegação: abrir/fechar agrupamento, Escape, foco, primeiro toque, seleção de destino e menu mobile. Abrir case, usar voltar do navegador e retorno explícito; preservar a prévia de origem, sem reabrir a introdução.
- Formação: lista real e fixture com mais de seis cursos, múltiplas instituições, nomes longos e campos opcionais ausentes. Abrir/fechar/reabrir, redimensionar e verificar foco/ordem; repetir a expansão nativa sem JavaScript.
- Contato: transporte simulado na fronteira existente da requisição. Cobrir validação, latência, clique repetido, falha recuperável e sucesso confirmado, verificando valores preservados, um envio por vez e anúncio de estado. Não enviar mensagem real para comprovar layout.
- Idioma/tema/movimento: trocar enquanto há menu aberto, expansão ou animação; mudar reduced motion em andamento; ocultar e retomar a aba e sair/voltar à seção. Nenhuma sobra visual, repetição contínua ou foco inesperado.
- Contraste: medir conteúdo efetivamente visível sobre o fundo renderizado, incluindo gradientes, temas e estados. Verificar AA aplicável para texto e controles; separar diagnóstico de ilustrações e conteúdo inativo. Não contar alertas automáticos como violações sem confirmar.
- Metadados: conferir título/descrição e JSON-LD na resposta renderizada, nos dois idiomas. Verificar fatos, canonical e alternates; uma string antiga escondida num dicionário não equivale a campo público incorreto, e o teste deve distinguir isso.
- Desempenho: comparar antes/depois no mesmo cenário, conteúdo e viewport; observar deslocamentos de layout, resposta de interações e tarefas longas. Fazer amostra com CPU reduzida como aproximação, identificando o limite; se houver perda perceptível, reduzir custo do efeito antes do aceite. Não prometer ganho sem medição.
- Por fatia: implementação completa, uma inspeção visual agrupada desktop/mobile, uma correção dos achados e no máximo uma confirmação. Evitar loop aberto de microajustes.
- Executar TypeScript, testes pertinentes e build ao integrar. No preview, confirmar SHA, conclusão do deploy e funcionamento das rotas afetadas; manter separados validação local, build remoto, evidência visual e aceite de Kauê.

## Out of Scope

- Implementar código, gerar tickets filhos, fazer merge ou publicar nova versão da aplicação nesta etapa de especificação. Publicar esta issue é o resultado autorizado do to-spec.
- Redesenhar a introdução, remover Continuar, substituir hero/fundo/portais, reconstruir paisagem 3D ou reabrir a direção do palco editorial.
- Redesenhar os cinco cases ou suas animações aprovadas além do compartilhamento de padrões de rodapé e correção de regressões desta integração.
- Criar novos projetos, cursos, fatos profissionais, certificados, estatísticas ou currículo. Novas informações dependem de dados fornecidos/confirmados.
- Reativar o ÆVO, incluir chatbot ou modificar seu backend.
- Produzir agora novos assets por imagegen, vídeos, mascotes ou novas artes de medalhas. Reutilizar os aprovados; registrar necessidade concreta antes de produzir substitutos.
- Alterar contratos de API, autenticação de outros produtos, banco de dados ou integração de envio de e-mail.
- Reescrever toda a arquitetura CSS, migrar bibliotecas ou fontes, fazer limpeza ampla de legado ou trocar a paleta em resposta a regra genérica do detector.
- Certificação integral WCAG, garantia de métricas Core Web Vitals ou homologação de todos os navegadores e dispositivos. A entrega exige a matriz e os limites documentados acima.

## Further Notes

- Origem: auditoria local da home de 15/11/2026, baseada em `23908bf`, com oito achados confirmados (dois P1, cinco P2 e um P3), revisão visual independente e amostragem técnica PT/EN desktop/mobile.
- A confirmação de Kauê para o formato de validação foi recebida nesta rodada do to-spec.
- Relaciona-se às specs [#52](https://github.com/Kauerc10/Portifolio-K.R.001/issues/52) e [#68](https://github.com/Kauerc10/Portifolio-K.R.001/issues/68). A decisão posterior de vitrine em palco e os refinamentos aprovados prevalecem sobre trechos históricos que descrevem índice ou prévias empilhadas. Preservar os ADRs vigentes de home/cases e palco editorial.
- A revisão mais recente de layout e encerramento dos cases está na [PR #87](https://github.com/Kauerc10/Portifolio-K.R.001/pull/87). Conferir seu estado e usar o código refinado como base de integração antes de implementar esta spec; não presumir que foi integrado à branch principal.
- A busca no tracker ainda apresenta issues antigas da jornada e de animações abertas. Não fechá-las, recriá-las ou anunciar conclusão por causa desta publicação; conferir escopo, responsáveis e dependências ao preparar os tickets.
- As referências visuais e evidências da auditoria existem no workspace local. Antes de delegar implementação para outro ambiente, garantir acesso real às imagens; não assumir que uma issue transfere arquivos locais.
- Documentos antigos de produto/design ainda descrevem outra identidade. A implementação deve seguir as decisões posteriores do usuário e esta spec; eventual reconciliação documental deve preservar histórico e não alterar o posicionamento por inferência.
- Esta issue fica pronta para decomposição/execução, mas o fluxo continua por fatias e com teste de Kauê entre elas. Aprovação da spec não equivale a aprovação visual do que ainda não foi implementado nem autoriza deploy em produção.
