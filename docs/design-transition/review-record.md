# Registro de decisões e limites de validação

27/10/2026 — projeto local `PORT`, portfólio de Kauê Ruon Cardoso.

## Setup e autoridade

- Design Arc explicitamente solicitado. Evidência escolhida: **Guidelines only**, apresentada em português como documentação oficial + referência aprovada. Proveniência: resposta do usuário nesta conversa.
- Aprovação escolhida: **Guided**. Proveniência: segunda resposta do usuário nesta conversa.
- Valores de preferência permanente: não gravados; nenhuma configuração global, home, tarefa nova, Stitch ou Mobbin foi criada. Não há alegação de benchmark de produto.
- Escopo autorizado nesta rodada: escrever o planejamento de transição. Implementação e publicação são etapas separadas.
- Writing Plans foi usado para o plano técnico; o roteiro Ask Matt orientou a separação entre incerteza que exige experimento e trabalho executável. Não foi executado o fluxo completo de tracker que exige onboarding próprio.

## Objetivo e direção

Objetivo confirmado: portfólio leve e profissional com equilíbrio entre desenvolvimento, automação e suporte; abertura ousada, interativa e memorável para recrutadores/clientes. Base visual confirmada pelo usuário com “PERFEITO, vamos usar esse como base”.

Direção escolhida: a referência fornecida nesta rodada, com cumprimento, apresentação curta e violeta RUON. Propostas anteriores ficam descartadas como alvos de implementação. Não reabrir o torneio visual nem trocar por uma composição editorial sem paisagem.

## Jornada atual e evidência

- Superfície: página Next.js com pt-BR/en-US; navegação por oito seções, currículo, formulário e ÆVO.
- Evidência atual: código, lockfile, dicionários, testes e materiais do repositório inspecionados. Dependência de `loaderDone` para menu/formulário e mistura de script CDN/React identificadas em fonte.
- Limite: não foi iniciado servidor ou executado baseline. Não chamar essa inspeção de auditoria de runtime.
- Entrada proposta: conteúdo imediato → exploração opcional → projetos/experiência → currículo/contato. O mapa e estados estão na especificação.
- Fricção a resolver: atraso antes da interação útil; efeitos globais que competem com leitura; narrativa profissional desatualizada; acesso dependente da cena ou de hover seria uma regressão.

## Gatilhos e provas de movimento

Toda duração, easing, ângulo de câmera e limite de deslocamento no plano é **proposta de projeto**, não valor extraído da imagem nem precedente observado em outra aplicação. A implementação fonte será o módulo local de Three.js e CSS, ainda não escrito. Não foi instalado Motion/Motion+ nem outro fornecedor.

A referência estática não prova transição, interrupção, teclado, redução de movimento ou desempenho. Essas provas são previstas em P0/P2/P3/P7 e continuam abertas.

## Matriz de conformidade nesta etapa

| Requisito | Evidência | Classificação | Próxima ação |
|---|---|---|---|
| Paisagem branca, três pavilhões, caminhos violeta | Imagem aprovada e preservada | match da referência, não da aplicação | Comparação P0 |
| Cumprimento e descrição curta | Texto na imagem aprovada e contrato de copy | match da referência | Implementar em HTML no P1 |
| Tom RUON | Token `#6534D8` confirmado no repo RUON | match do token; render 3D ainda requer comparação | Conferir P0/P1 |
| Desktop reconstruído em 3D | Nenhum render 3D produzido | runtime proof | P0, comparação legível |
| Mobile e landscape | Layout proposto, sem render móvel | runtime proof | P0/P1/P7 |
| Destinos dos caminhos | Contrato de links definido | runtime proof | P3 |
| Falhas, espera, redução e pausa | Inventário na spec | runtime proof | P2/P7 |
| Tema escuro | Tokens de referência, sem composição aprovada | runtime proof | P6 e revisão guiada |
| Acessibilidade e performance | Documentação oficial + metas de projeto | runtime proof | Medições P7; campo após publicação |

**Veredito visual completo:** não emitido. A imagem desktop está aprovada; não existe ainda uma proposta renderizada completa de todos os estados, nem aplicação nova para validar. Não usar `meets direction` como sinônimo de aprovação desta imagem.

## Gates e próximos responsáveis

- Objective Confirmation: confirmado pela sequência da conversa.
- Direction Gate da abertura: confirmado pela seleção e ajustes da imagem.
- Visual Proposal Gate da jornada inteira: pendente da prévia completa; não exigir que o usuário reaprove agora a mesma imagem.
- Revisões guiadas: cena e fidelidade; jornada integrada; pronto para publicação.
- Próximo responsável: executor da implementação do portfólio, a partir do plano e da spec. Assets de produção, render móvel, teste de dispositivo e métricas permanecem explicitamente pendentes.

## Revisão técnica independente do plano

Uma revisão de leitura identificou quatro lacunas, corrigidas antes da entrega: exclusividade de runtimes já no P1, contrato explícito dos callbacks de picking/projeção, posters produzidos como critério de conclusão visual e transições de preferência/visibilidade durante loading. Nenhum resultado de teste de aplicação foi alegado nesta revisão documental.
