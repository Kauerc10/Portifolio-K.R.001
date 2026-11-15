# Entrevista — evolução criativa do portfólio

12/11/2026. Método: grill-with-docs, combinando grilling e domain-modeling. Estado: entrevista em andamento; direção da primeira rodada aprovada, plano completo ainda em definição.

## Base já estabelecida

- Identidade violeta e mineral e composição da home aprovadas anteriormente.
- Abertura manual com encaixe no hero e transição PT/EN aprovadas.
- A rodada atual conecta ornamentos ao progresso do scroll, com pausa e retorno; ainda não fixa seções no viewport.
- Nova solicitação: elaborar coreografias e transições mais fluidas, avaliar seções fixadas durante a passagem, produzir assets e atualizar os projetos em destaque e as integrações.

## Árvore de decisões

1. Experiência de rolagem — decidido: fixação temporária em trechos estratégicos, especialmente Projetos; scroll conduz a apresentação e libera a página ao concluir o percurso. Sem espera obrigatória por tempo.
   - Depois: quais seções recebem essa coreografia, duração em distância de scroll, retorno e comportamento em celular/movimento reduzido.
2. Objetivo principal — decidido: recrutadores primeiro, clientes secundariamente.
   - Perfil decidido: desenvolvimento de produtos web e automação com visão de produto. Depois: profundidade dos cases, contribuição autoral, resultados e chamadas.
3. Significado de integrações — decidido: demonstrações dos projetos como diferencial criativo, acompanhadas de recursos úteis do portfólio; cada integração precisa evidenciar o trabalho.
   - Depois: interfaces, dados, autenticação, ambientes demonstrativos e validação.
4. Inventário factual de projetos — leitura local e consulta autenticada ao GitHub concluídas; seleção aprovada na rodada 2.
   - Depois: classificação e ordem dos destaques; conteúdo e evidências necessárias.
5. Depois de 1–4: direção de arte por seção, assets a produzir, prova de uma coreografia completa e sequência de implementação.

## Registro das rodadas

Rodada 1 aprovada: fixação temporária estratégica, prioridade a recrutadores, demos como diferencial. Ordem aprovada: objetivo e destaques → narrativa → prova de uma cena completa → assets → expansão para demais seções.

Rodada 2: definir perfil profissional prioritário, selecionar destaques e escolher adaptação da fixação para celular.

Rodada 2 aprovada: posicionamento em desenvolvimento de produtos web e automação com visão de produto; fixação em desktop e celular, com percursos curtos e mudança perceptível a cada gesto no celular. Seleção: VioDigital, VECOM, Atlas Notarial, DocFácil, sistema de orçamentos CKF e site institucional CKF. Ainda definir se as duas entregas CKF formam um case ou apresentações separadas.

VioDigital é o nome planejado informado por Kauê para VioWeb. O nome e o repositório existentes não foram renomeados nesta entrevista. A natureza de cada trabalho (produto próprio, trabalho interno, software sob demanda) e a contribuição pessoal devem aparecer claramente; a classificação factual de cada um está pendente.

Rodada 3 concluída parcialmente:

- Q7 adiada pelo usuário: classificação de origem e natureza de cada trabalho. Manter pendente sem inferir contratos, propriedade ou contribuição; isso não bloqueia planejamento visual e provas com conteúdo provisório. A redação pública dessas classificações depende da resposta posterior.
- Q8 aprovada: um case CKF com duas frentes, sistema de orçamentos e site institucional, cada uma com telas, contribuição e demonstração próprias.
- Q9 aprovada: narrativa por scroll em três momentos — problema, solução em uso, resultado — seguida de controle para experimentar manualmente uma demonstração.

Inventário factual de fluxos demonstráveis concluído: VioDigital tem entrada de documento e saída de validação/dados; VECOM tem formulário guiado e operação de solicitações; Atlas tem qualificação de veículos e bancada operacional; DocFácil tem preenchimento guiado e prévia; CKF tem criação de orçamento/PDF e apresentação institucional. As funcionalidades foram identificadas na documentação/código; integrações externas e saúde de produção não foram revalidadas. As provas poderão usar cenários demonstrativos, sem depender de dados operacionais.

Rodada 4 aprovada integralmente:

- Um palco fixo com índice visível dos cinco cases; a rolagem conduz os três momentos do case selecionado e depois libera a página.
- VioDigital como primeiro protótipo completo, para provar assets, movimento, leitura e fixação em desktop/celular.
- Estrutura consistente entre cases com personalidade visual própria: branco mineral/violeta no portfólio, cores dos produtos nas interfaces e assets/coreografias ligados às funções de cada produto.

Rodada 5: roteiro concreto do primeiro protótipo, comportamento ao trocar de case e acesso direto ao conteúdo. Viabilidade da demonstração funcional VioDigital em pesquisa; não confundir a apresentação encenada com execução real de verificação.

Rodada 5 — revisão da direção pelo usuário:

- Cada um dos cinco cases terá página dedicada com história, informações, dinâmicas, assets e prints. CKF mantém uma página com as duas frentes já aprovadas.
- A home deve apresentar os projetos de maneira compreensível por si só, com animações, detalhes e identidade própria. A abertura da página dedicada é opcional por clique.
- A apresentação longa e a demonstração aprofundada passam para a página do case. A proposta anterior de percorrer os três atos completos de cada case dentro do palco da home foi superada.
- Direções explícitas: DocFácil com a coruja e animações em azul; VioDigital com QR codes e verde/vermelho. VECOM recebe linguagem própria a definir em storyboard. Estados de cor também terão identificação textual/visual compreensível.
- Não aplicar automaticamente a recomendação anterior de reiniciar a história no mesmo palco ao trocar de case; agora há navegação para página própria. A organização da vitrine na home (blocos verticais ou palco selecionável) será decidida nesta rodada.

Arquitetura home + páginas de case registrada em `docs/adr/0001-home-e-paginas-de-case.md`. A classificação Q7 continua adiada.

Rodada 6 aprovada integralmente:

- Q15: home com cinco blocos verticais, cada um com prévia animada compreensível e personalidade própria; fixação curta somente nos momentos que valorizam a cena. Isso substitui o palco único selecionável da rodada 4.
- Q16: a prévia se expande e seu elemento principal mantém continuidade visual com a abertura da página do case. Ao voltar, restaurar a posição da home. A animação de navegação terá alternativa imediata para movimento reduzido e navegação convencional para acesso direto.

Rodada 7 concluída: Q17 esclarecida pelo usuário. As demonstrações podem ser animações bem produzidas, fotos/prints e vídeos. Não é requisito executar funções reais dos produtos dentro do portfólio. Isso substitui a proposta anterior de botão para experimentar uma demonstração funcional; os controles passam a servir à exploração da apresentação visual.

Planejamento atual consolidado em `plano-consolidado-criativo.md`, pronto para confirmação final de entendimento. A classificação Q7 permanece adiada e não impede storyboards ou a prova visual.

Após a confirmação geral do planejamento, Kauê retomou Q7 e solicitou pesquisa no GitHub, priorizando branches atualizadas, README, AGENTS e histórico. Pesquisa concluída em seis repositórios; classificação sustentada e perguntas específicas em `pesquisa-repos/sintese-q7.md`. As nove imagens fornecidas foram guardadas como referências de estilo em `referencias-estilo-projetos/`, com procedência e hashes; os originais ficam locais.

Q7 encerrada por confirmação direta de Kauê em 12/11/2026: Atlas nasceu da necessidade percebida no cartório, começou como Formatador de Veículos, evoluiu para conjunto de ferramentas e tornou-se produto próprio; VECOM e as duas entregas CKF são projetos sob demanda após oferta de serviço aceita pelas empresas. RUON é a marca própria criada para padronizar sua atuação freelancer e apresentar/comercializar esses serviços. Classificações e narrativa atuais estão no plano consolidado; as pendências anteriores deste diário são históricas.

### Viabilidade da demonstração VioDigital

Pesquisa somente leitura no repositório público VioWeb: aplicação standalone com HTML/JavaScript e worker, licença MIT; usa ZXing WASM, Pyodide e núcleo de verificação. Não oferece componente React pronto para integrar. A documentação relata carregamento inicial de aproximadamente 19 MB; a árvore consultada não inclui todos os assets gerados necessários para comprovar uma integração real pronta no portfólio.

Testes incluem geradores de documentos/QRs sintéticos e pipeline de verificação. Isso é base para preparar exemplos sem dados operacionais, mas não comprova a integração executando dentro do portfólio. Testes de segurança da aplicação declaram X-Frame-Options DENY; isso não foi tratado como inspeção de cabeçalhos do deploy público. Evitar assumir viabilidade de iframe externo.

Conclusão após Q17: usar esse levantamento para representar corretamente o fluxo em imagens/animações/vídeos, sem incorporar o motor funcional ao portfólio. Integração de Pyodide, ZXing, câmera, clipboard, upload e validação real fica fora da entrega planejada. O eventual link externo para o produto é independente da demonstração visual.

### Proposta de primeira cena — VioDigital (história aprofundada na página dedicada)

1. Problema: documento demonstrativo com informação ainda dispersa; título e contexto do trabalho legíveis. A entrada do documento e o enquadramento apresentam a tarefa de conferir e organizar informações.
2. Solução em uso: camadas visuais conectam documento, leitura/verificação e campos organizados. O scroll controla as transformações e cada etapa alcança um quadro legível antes da próxima.
3. Resultado: documento e dados se reorganizam para uma composição estável com contribuição, evidências e apresentação visual em detalhe. Rótulos de origem aguardam Q7; números e afirmações de desempenho dependem de evidências.

Assets propostos: documento de exemplo identificado, recortes da interface real, conjunto de campos/dados demonstrativos, elementos de conexão e estados de verificação coerentes com o produto. A narrativa visual pode representar um processamento; somente uma interação funcional verificada pode ser apresentada como execução real.

### Sequência de trabalho proposta

1. Concluir a organização da vitrine na home e os contratos de navegação para páginas de case, retorno e exploração da primeira cena.
2. Roteirizar e preparar quadros de referência da cena VioDigital.
3. Provar fixação/progresso e controles em desktop e celular com assets provisórios.
4. Produzir os assets finais e integrar as animações, imagens e vídeos da demonstração visual; comparar com as referências aprovadas.
5. Aplicar o padrão validado a VECOM, Atlas, DocFácil e às duas frentes CKF, com coreografia própria.
6. Elaborar transições de entrada/saída e o movimento das demais seções, preservando o protagonismo dos projetos.
7. Completar classificações Q7, textos de contribuição, evidências e links antes de publicar esses dados; executar QA integrado.

Inventário confirmado por documentação local e metadados do GitHub: VioWeb (verificador/decodificador de documentos veiculares), Atlas Notarial (escopo atual ampliado), Fluxo Atlas (personalizações baseadas no Vikunja), Atlas ITCMD, VECOM Ficha Fácil, DocFácil, CKF Manutenção, CKF Site Institucional, Foli, RUON Website e Staloch Media Page. Existência de código, data de atualização e URL de demo não confirmam saúde de produção ou prioridade editorial.

`docfacil-24` aponta para o mesmo remoto `Kauerc10/docfacil`; tratá-lo como versão local desse produto, não como outro case. Atlas Notarial e Fluxo Atlas têm repositórios distintos; a decisão de agrupá-los editorialmente está em aberto. A exposição pública, as evidências e a contribuição autoral serão delimitadas para os projetos selecionados antes da produção de demos.

Vocabulário definido em `GLOSSARY.md`. A decisão de separar home e páginas de case possui ADR por alterar rotas, conteúdo e navegação e permitir acesso direto/compartilhamento dos projetos.

## Referências de contexto

- Spec principal: #52; movimentos: #68; implementação em revisão: PR #74.
- Comportamento atual: `scroll-motion.md`.
- Referências aprovadas: `imagens-selecionadas/`.

O planejamento consolidado depende das respostas e da confirmação de entendimento ao final da entrevista.
