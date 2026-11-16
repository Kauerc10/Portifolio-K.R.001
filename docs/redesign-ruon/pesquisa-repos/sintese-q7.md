# Síntese Q7 — classificação e evidências dos projetos

Consulta GitHub em 12/11/2026, sem alterar os repositórios de origem. Foram enumeradas branches e consultados README, AGENTS quando existente, documentos de produto/design e uma amostra dirigida do histórico. Relatórios individuais contêm fontes permanentes fixadas em SHA.

## Confirmação de Kauê — Q7 encerrada

Em 12/11/2026, Kauê esclareceu diretamente os pontos que os repositórios não comprovavam. Esta confirmação pessoal complementa a pesquisa abaixo; não deve ser atribuída ao histórico GitHub.

| Case/entrega | Classificação para o portfólio | Origem e contexto confirmados |
|---|---|---|
| Atlas Notarial | **Produto próprio, originado de uma necessidade do trabalho** | Kauê identificou erros e retrabalho em procurações, além do tempo de conferência e redação de dados. A primeira solução foi o Formatador de Veículos; ela evoluiu para um conjunto de ferramentas cartorárias, e Kauê decidiu transformá-lo em produto próprio. |
| VECOM Ficha Fácil | **Desenvolvimento sob demanda para cliente** | Kauê ofereceu o serviço, a VECOM gostou da proposta e ele elaborou o projeto para atender à empresa. |
| CKF — sistema de orçamentos | **Desenvolvimento sob demanda para cliente** | Kauê ofereceu o serviço à CKF; a empresa aceitou a proposta e ele elaborou o projeto. |
| CKF — site institucional | **Desenvolvimento sob demanda para cliente** | Mesmo contexto de prestação de serviço à CKF, com entrega distinta do sistema de orçamentos. |
| DocFácil | **Produto próprio da RUON** | Vínculo documental identificado na pesquisa; RUON é a marca própria de Kauê, conforme confirmação direta. |
| VioDigital | **Projeto open source de origem notarial/comunitária** | Classificação sustentada pela documentação e mantida no planejamento, com crédito à base comunitária. A confirmação atual não acrescentou outros termos comerciais para este projeto. |

**RUON:** marca própria de Kauê para padronizar sua atuação freelancer e a apresentação/comercialização de projetos. Seu site tem função comercial para esses serviços. Não afirmar constituição societária, contratação de equipe ou registro de marca a partir dessa declaração.

Para Atlas, preservar as duas dimensões: a origem em uma dor real do cartório e a evolução para produto próprio. Para VECOM e CKF, apresentar a prestação de serviço e a solução criada para o cliente. Esta distinção fecha Q7; não é necessário reabrir as perguntas abaixo, mantidas como histórico da pesquisa.

## Versões consultadas

| Entrega | Referência funcional | SHA | Comparação com outras branches |
|---|---|---|---|
| VioDigital / VioWeb | `main` | `002e0c8f7f2cfeac997997def7100407f985177d` | Mais recente, com merge da evolução de validação no navegador. |
| VECOM | `main` + `docs/hospedagem-producao-vecom` | `f1c8e288fd1ec69a63c61d0d978c4bff50e9300a` / `d98d2388b085ca532b93b5218afdc273e201c4be` | A branch documental mais nova está um commit à frente, sem commits atrás. Ambas lidas; a documentação mais nova registra pendências de produção. |
| Atlas Notarial | `main` | `2091d644ca65a98eb76c1ce13bb4e3c0e6e014f3` | Ponteiro mais recente geral é Dependabot; a referência funcional e editorial continua na main. |
| DocFácil | `feat/abacatepay-real-billing` + `main` | `06bff176f97093a78bdb8ef6cd17fd3013d4cf59` / `e350ff740f3eb04923a956024e3bcae3738b11e0` | Branch mais nova divergiu: 110 commits à frente e 12 atrás da main. Documentação, stack e identidade diferem; foram preservadas as duas leituras. |
| CKF — sistema | `feat/catalogo-tabelas-leads` | `f1797812433928c55d0cb3d600788258c504b1ca` | Seis commits à frente da main, sem commits atrás. Branch posterior de Dependabot altera apenas dependências. |
| CKF — site | `main` | `5a30ffa1aac38d36bf8282704a72a6de196d528a` | Branch posterior de Dependabot altera apenas dependências. |

Datas, demais branches e motivos completos estão nos JSONs de cada entrega. Mais recente no relógio não implica conter todo o histórico das demais linhas.

## Rótulos sustentados pelas fontes

| Case/entrega | Descrição já sustentada | O que continua sem comprovação |
|---|---|---|
| VioDigital | Projeto open source público, originado de uma necessidade de cartório e expandido para a comunidade. | Eventual vínculo comercial e exclusividade de autoria. Creditar a base comunitária `digital-document-checker`, citada pelo próprio projeto; não apresentar como construção integral do zero. |
| DocFácil | Produto digital da RUON, voltado a criação guiada de documentos. | Composição exata da contribuição individual e estado de integrações externas. Piloto de IA não deve ser descrito como função liberada na main. |
| VECOM | Sistema sob medida para coleta cadastral e operação da VECOM, com jornada mobile e dashboard. | Se nasceu por encomenda da empresa ou como iniciativa própria aplicada à operação. Não presumir que um repositório público implica produto próprio independente. |
| Atlas Notarial | Plataforma para operação cartorária, nascida em contexto real e evoluída para múltiplas serventias. | Se a história deve ser produto próprio/RUON, demanda interna de cartório/cliente ou evolução híbrida entre esses contextos. |
| CKF — sistema | Solução sob medida para a operação interna da CKF Manutenção. | Contrato, pagamento e divisão exata de autoria não estão estabelecidos pela pesquisa. A finalidade customizada está documentada. |
| CKF — site | Site institucional sob medida para presença digital e captação da CKF. | Contrato, pagamento e divisão exata de autoria não estão estabelecidos pela pesquisa. |

Estas descrições permitem trabalhar o contexto dos cases sem inventar propriedade, contrato ou colaboração. A distinção comercial final deve respeitar a confirmação de Kauê quando as fontes não forem explícitas.

## Questões levantadas pela pesquisa — respondidas acima

1. **Atlas:** produto próprio que nasceu de uma necessidade do cartório, trabalho solicitado pelo cartório/cliente, ou combinação que evoluiu de um para outro?
2. **VECOM:** a empresa solicitou a solução ou foi uma iniciativa própria que depois passou a atender a operação?
3. Se o portfólio precisar usar literalmente o selo **“sob demanda para cliente”**, confirmar se as duas entregas CKF vieram de solicitação da empresa. Até lá, “sob medida para CKF” descreve a finalidade sem afirmar contratação.

Não é necessário perguntar novamente pela identidade visual do DocFácil ou pelo agrupamento CKF: Corujinha/azul e um case CKF com duas frentes já foram aprovados. Contribuições individuais podem ser detalhadas no texto de cada case sem declarar autoria exclusiva enquanto ela não for confirmada.

## Relação com as imagens e a produção

[As nove imagens de referência](../referencias-estilo-projetos/README.md) foram copiadas integralmente e verificadas por hash; há oito imagens únicas, pois duas capturas da home DocFácil são idênticas. Os originais com registros operacionais permanecem locais e ignorados pelo Git. Servem para estilo e composição; as apresentações públicas usarão materiais próprios e dados demonstrativos.

A pesquisa não executou as aplicações nem validou produção. Em particular, a documentação recente VECOM registra pendências de prontidão e não autoriza descrevê-lo como produção geral aprovada. Isso não impede um case que exponha honestamente o produto e seu estágio.

## Relatórios e fontes

- [VioDigital](viodigital/evidencia-github.md)
- [VECOM](vecom/evidencia-github.md)
- [Atlas Notarial](atlas-notarial/relatorio.md)
- [DocFácil](docfacil/relatorio.md)
- [CKF sistema](ckf-sistema/relatorio.md)
- [CKF site](ckf-site/relatorio.md)
