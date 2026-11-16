Method: dual-agent (A: /root/home_design_audit · B: /root/home_technical_audit)

# Auditoria da home e continuidade do portfólio

15/11/2026. Base: `23908bf`, branch `codex/case-layout-polish`. Auditoria local, sem alteração de interface, publicação ou envio real de mensagem. Referência: cases refinados e decisões visuais aprovadas nesta conversa. Modo: Experience, com trechos de leitura e contato.

## Parecer

A identidade já é reconhecível: branco mineral, violeta RUON, objetos ligados aos produtos e texto direto. A prioridade é organizar a continuidade depois da vitrine, corrigir um defeito de grid e reconciliar a apresentação pública com os fatos atuais. Não há motivo para substituir hero, introdução, artes aprovadas ou palco de projetos. As páginas de case continuam sendo o padrão de clareza; a home não precisa copiar a escala tipográfica de uma página de leitura em todos os trechos.

O detector CLI retornou `[]`; isso não comprova ausência de problemas. Inspeção visual e leitura do código confirmaram problemas fora da cobertura do detector. A injeção de detector no navegador reportou 45 marcações brutas; elas não são 45 defeitos confirmados (ver classificação e limites ao fim).

## Saúde técnica — 13/20

| Dimensão | Nota | Evidência / limite |
|---|---:|---|
| Acessibilidade | 3/4 | Foco visível nos controles amostrados; nomes acessíveis ainda em PT na versão EN. Contraste completo não foi certificado. |
| Desempenho | 3/4 | Mídia com lazy/decoding e escopos de movimento locais; sem benchmark de dispositivo lento/Core Web Vitals. |
| Responsividade | 2/4 | Sem overflow em 1440/390 px PT/EN; grid de Competências incorreto. |
| Temas | 3/4 | Tokens e variantes existem; fundação antiga e regras locais ainda convivem. Tema escuro completo exige próxima validação. |
| Integridade | 2/4 | Visual próprio, porém grid e metadados/JSON-LD contradizem a apresentação atual. |

A avaliação técnica B isolada marcou 14/20; a síntese reduz integridade em um ponto após incorporar o conteúdo público de SEO/JSON-LD verificado pelo agente principal.

## Heurísticas de design — 24/36

| Heurística | Nota | Principal observação |
|---|---:|---|
| Visibilidade de estado | 3/4 | Formulário e controles apresentam estados; não foi feito envio real. |
| Correspondência com mundo real | 2/4 | SEO usa cargos/organizações e afirmações não alinhados à apresentação atual. |
| Controle e liberdade | 3/4 | Links nativos, rolagem livre e cases opcionais preservados. |
| Consistência | 3/4 | Mundo visual comum; rodapé e escalas ainda divergem. |
| Prevenção de erros | 3/4 | Validação/foco existem no contato; backend não homologado nesta auditoria. |
| Reconhecimento | 2/4 | Parte das seções fica pouco descoberta pelo menu. |
| Flexibilidade/eficiência | 2/4 | Página longa, intervalos extensos e Competências fragmentada. |
| Estética/minimalismo | 3/4 | Identidade forte; excesso de espaço e repetição de categorias. |
| Recuperação de erros | 3/4 | Feedback e canais diretos disponíveis; falhas externas não simuladas aqui. |
| Ajuda/documentação | n/a | Não é uma superfície operacional que exija manual. |

## Achados priorizados

### H01 — P1: decoração altera o grid de Competências

- Fonte: `src/components/sections/SkillsSection.tsx:64`, `css/components/editorial.css:224`, `css/components/motion-editorial.css:8`.
- Categoria: responsividade/integridade.
- A linha decorativa é o primeiro de três filhos num grid de duas colunas. Ela ocupa uma célula; texto e chips passam a outras posições. A separação é visível no desktop e os bounding boxes confirmam a linha adicional no celular.
- Impacto: prejudica escaneamento, aumenta a altura e torna frágil a relação entre competência e tecnologias.
- Correção: decoração fora do fluxo ou faixa explicitamente posicionada; texto e tecnologias com posições deliberadas no desktop e ordem clara no celular. Primeiro corrigir o grid, depois avaliar se ainda é necessário reduzir chips.
- Comando: `/impeccable layout`.

### H02 — P1: metadados e dados estruturados contam outra história

- Fonte: `src/app/[locale]/layout.tsx:51`, `src/app/[locale]/layout.tsx:79`, `src/components/seo/json-ld.tsx:16` e `:31`.
- Categoria: conteúdo/integridade.
- Título e descrição ainda usam Arquitetura/Engenharia de IA e “tolerância zero a erros”; publisher/worksFor usam K-HUB. O JSON-LD também representa IMPA/OBMEP como `alumniOf`, o que não decorre de uma premiação. Esses campos não acompanham a linguagem atual de desenvolvimento, automações e suporte, nem a definição de RUON como marca própria.
- Impacto: compartilhamentos, busca e leitores de dados estruturados recebem afirmações diferentes das que o visitante encontra no portfólio.
- Correção: reconciliar PT/EN com fatos já aprovados; não converter iniciativa, marca ou premiação em emprego, cargo formal, instituição de formação ou garantia de resultado. Validar qualquer cargo novo antes de acrescentá-lo.
- Comando: `/impeccable clarify` e `/impeccable harden`.

### H03 — P2: intervalos e títulos repetem o mesmo peso

- Fonte: `css/components/editorial.css:7–20`, `:70`, `:125`; `src/components/sections/ExperienciaSection.module.css:5`.
- Categoria: layout/leitura.
- Padding vertical chega a 9–10vw e se soma a margens internas e área reservada à arte. A captura mobile A tem aproximadamente 10.143 px de documento — indicador de percurso, não um defeito isolado.
- Impacto: Sobre, Experiência e Competências ficam desconectados e demoram a entregar a próxima informação.
- Correção: ritmo por função: títulos de abertura expressivos, títulos de leitura menores e espaçamentos mais curtos entre informações relacionadas. Preservar área real das artes e impedir sobreposição; não impor um único tamanho a todos os títulos.
- Comando: `/impeccable layout` e `/impeccable typeset`.

### H04 — P2: Sobre e Competências repetem categorias mais do que conectam evidências

- Fonte: `src/components/sections/SobreSection.tsx:6`, `src/components/sections/SkillsSection.tsx:49` e dicionários em `src/i18n/locales/`.
- Categoria: conteúdo/hierarquia.
- Sobre repete desenvolvimento/automações/suporte já apresentados no hero; Competências dá muito peso às tags. Há história pessoal factual nos dicionários que não aparece na composição atual.
- Impacto: sobra classificação e falta conexão rápida entre quem é Kauê, as decisões que toma e onde ver esse trabalho.
- Correção: uma apresentação pessoal curta a partir dos fatos aprovados; evidências/projetos antes da lista secundária de ferramentas. Preservar as três áreas aprovadas; não trocar seus nomes apenas para parecer diferente.
- Comando: `/impeccable clarify` e `/impeccable distill`.

### H05 — P2: navegação esconde partes relevantes da trajetória

- Fonte: `src/components/sections/Navbar.tsx:69`.
- Categoria: descoberta.
- Projetos, Trajetória e Contato são as entradas principais; Trajetória leva somente à experiência. Formação e competências dependem de exploração posterior.
- Impacto: recrutador com objetivo específico precisa procurar numa página longa.
- Correção: manter menu enxuto e dar a Trajetória um agrupamento/atalhos discretos, testando a necessidade depois de compactar a página. Não acrescentar índice numerado, barra longa ou novo menu sem necessidade.
- Comando: `/impeccable shape`.

### H06 — P2: fechamento da home não acompanha o padrão dos cases

- Fonte: `src/components/sections/Footer.tsx:80`, `css/components/contact-footer-editorial.css:113`, `src/components/projects/CaseEnding.tsx`.
- Categoria: consistência.
- Home e cases têm implementações distintas para marca, escala, linha de separação e navegação final.
- Impacto: a jornada parece mudar de sistema ao retornar de um case.
- Correção: compartilhar linguagem/tokens de marca, divisórias, links e estados; preservar canais diretos da home, retorno ao projeto nos cases e CTA de contato. Evitar adicionar uma nova frase de efeito entre Conquistas e Contato só para preencher a passagem.
- Comando: `/impeccable extract` e `/impeccable polish`.

### H07 — P2: nomes acessíveis não acompanham o idioma

- Fonte: `src/components/sections/Navbar.tsx:70`, `src/components/ui/ThemeToggle.tsx:33`.
- Categoria: acessibilidade/i18n.
- Navegação e troca de tema permanecem nomeadas em português em `/en-US`.
- Impacto: leitor de tela recebe uma interface com idiomas misturados.
- Correção: labels e titles vindos do dicionário ativo; preservar a transição de idioma aprovada.
- Comando: `/impeccable harden`.

### H08 — P3: conforto de toque dos links de evidência

- Fonte: links de projetos em `SkillsSection.tsx` e de comprovação em `ConquistasSection.tsx`.
- Categoria: responsividade.
- Medidos 17 controles abaixo de 44 px no desktop e 13 no celular, predominantemente links de texto.
- Impacto: ações isoladas pequenas exigem mais precisão de toque.
- Correção: ampliar área/intervalo das ações isoladas, mantendo texto inline quando apropriado. A medida de 44 px é uma meta de conforto; não foi estabelecida falha WCAG 2.5.8, que admite exceções e outro limiar mínimo.
- Comando: `/impeccable adapt`.

Contagem: **0 P0, 2 P1, 5 P2, 1 P3**. P1 de layout/conteúdo não é afirmação de violação WCAG.

## Direção por seção

| Trecho | Preservar | Refinar |
|---|---|---|
| Introdução/hero | Continuar, texto transferido para hero, portais e fundo aprovados | Somente regressões de enquadramento, foco, pausa e idioma; não redesenhar. |
| Projetos | Palco, cinco universos, setas e movimento finito | Referência de acabamento; não reabrir sua composição. |
| Sobre | Roxo, arte e três áreas de atuação | Apresentação pessoal curta e menos repetição do hero. |
| Experiência | Timeline, empresas e fatos | Cadência, datas/localização legíveis e resultados com contexto; não inflar cargos. |
| Competências | Grupos e exemplos de projeto | Grid correto, evidência prioritária, tecnologias com peso secundário. |
| Formação | Agrupamento por instituição, expansão nativa e metadados escaláveis | Hierarquia e acesso à evidência; a credencial Scrum hoje aponta ao perfil LinkedIn, não a uma URL específica de certificado. Não inventar novos cursos. |
| Conquistas | Prata/bronze/menções, links oficiais e assets aprovados | Proporção dos cards e peso dos textos; conferir rótulo do destino (“premiação”/“certificado”) ao validar o link. |
| Contato | Formulário, labels, feedback e canais diretos | Integração com o encerramento; não acrescentar texto sem função. |
| Rodapé | Marca e acesso ao topo/canais | Mesma família visual dos cases, inclusive foco, hover, tema e celular. |

## Movimento e microinterações

Preservar texto legível enquanto se anima a decoração. A linha de experiência pode acompanhar o scroll; competências podem destacar o projeto relacionado no foco/hover; formação usa expansão intrínseca sem salto; medalhas têm realce breve; contato mantém feedback discreto por campo. Esses recursos já existem em parte: primeiro corrigir e coordenar os atuais, depois acrescentar apenas o que ajuda a compreender a seção. Não usar fixação temporária ou vídeo em todo trecho. Nenhum percurso deve depender de esperar uma animação terminar. Tema escuro, reduced motion e retorno do case entram no aceite de cada fatia.

## Ordem recomendada de implementação

1. **Fundação e defeitos concretos:** H01, H02, H07. Reconciliar conteúdo público sem alterar fatos; corrigir grid e nomes acessíveis. Validar PT/EN e navegação.
2. **Sobre + Experiência:** aplicar ritmo/escala de leitura, reduzir repetição e manter o caráter da trajetória. Testar desktop e celular antes de avançar.
3. **Competências + Formação + Conquistas:** evidências em primeiro plano, escalabilidade, links e áreas de toque. Preservar artes aprovadas e testar conteúdo longo/expansão.
4. **Contato + Rodapé + continuidade:** alinhar encerramentos e tokens, revisar navegação discreta e microinterações. Encerrar com `/impeccable polish` e uma rodada integrada.

Uma fatia por vez, com preview para Kauê testar. Não publicar tickets nem alterar a UI como efeito desta auditoria.

## Forças e personas

- A ordem projetos → trajetória coloca o trabalho antes da promessa.
- Branco/mineral, violeta e materiais dos projetos dão identidade específica; não é uma proposta para trocar o visual.
- Foco, semântica, canais diretos e redução de movimento já têm implementação e devem ser preservados.
- **Recrutador com pouco tempo:** perde eficiência nos intervalos e na separação entre competência e evidência.
- **Visitante no celular:** sente o percurso longo e ações de evidência pequenas; não houve overflow nas larguras testadas.
- **Pessoa usando leitor de tela em inglês:** encontra nomes de controles em português.

## Evidências e limites

Assessment A: `evidence/home-audit/design-a/desktop-full.png` e `mobile-full.png`. A captura de página inteira pegou a introdução em andamento e pode omitir assets lazy fora do viewport; isso não foi contado como falha de arte/carregamento.

Assessment B: `evidence/home-audit/technical-b/report.md`, `browser-results.json`, `focus-check.txt` e `skill-bbox.txt`. CLI uma vez, `src/components/sections`, exit 0 e zero achados; Playwright com contexts novos, 1440×900 e 390×844, PT/EN, reduced motion. Quatro views sem overflow ou erros de console/página; foco visível nos controles amostrados.

### Detector no navegador: classificação dos sinais

Em uma nova página PT, preflight mutável e injeção de `detect.js` passaram; o console anunciou 45 marcações. Foram registrados 48 eventos de regra no console, que não devem ser somados como defeitos únicos: 8 sobre violeta, 16 sobre borda/sombra, 6 glow, 11 contraste, 2 fontes, 2 textos pequenos, 1 tracking, 1 clipping e 1 card aninhado. Evidência bruta: `evidence/home-audit/technical-b/overlay-attempt.txt`.

- **Violeta e fontes:** falsos positivos de preferência genérica diante da identidade expressamente aprovada. Não trocar paleta ou fonte por esse sinal.
- **Borda/sombra, objetos aninhados, clipping e glow:** vários sinais abrangem o palco, seus objetos ilustrativos e conteúdo legado/modal. Não demonstram por si sós corte de texto ou problema de legibilidade; não entraram no backlog confirmado desta auditoria.
- **Tracking:** sinal de revisão tipográfica, incorporado a H03; não é violação automática.
- **Contraste e texto pequeno:** exigem triagem por visibilidade, tamanho e fundo realmente renderizado. Há sinais em ilustrações/cases inativos e conteúdo legado; o cálculo usa cores de fundo que podem não refletir gradientes/transparência. Permanecem pendências de medição na fatia de validação, não foram declarados falhas WCAG confirmadas nem descartados integralmente.

Não há overlay visível para o usuário: a tentativa ocorreu no Playwright headless. O servidor temporário da injeção (PID 31372, porta 8400) foi encerrado; o servidor de desenvolvimento preexistente permaneceu ligado.

Isto não é certificação WCAG, medição Core Web Vitals, homologação do envio de e-mail, comprovação de links externos ou auditoria de todos os dispositivos. Fontes/fontes de verdade antigas (`DESIGN.md` e `PRODUCT.md`) ainda descrevem parte da direção anterior; foram registradas como divergência, sem reescrita automática. Não tomar esse conteúdo antigo como autoridade sobre decisões posteriores do usuário.
