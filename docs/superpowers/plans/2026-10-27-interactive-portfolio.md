# Portfólio interativo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Delegação de execução não está escolhida; manter o trabalho no agente principal por padrão.

**Goal:** Migrar o portfólio existente para a paisagem branca e violeta aprovada, com caminhos interativos, conteúdo profissional atualizado e acesso imediato em desktop e celular.

**Architecture:** Documento e navegação em HTML renderizado no servidor; mundo Three.js isolado no hero, carregado progressivamente sobre um poster próprio. Uma interface pequena concentra câmera, destinos, qualidade e ciclo de vida; as ações continuam sendo links reais. Migrar responsabilidades de scripts globais antes de removê-los.

**Tech Stack:** Next.js 15.5.23 / React 19.2.8 / TypeScript / Tailwind existentes; Three.js 0.185.1 via npm; CSS para interação de UI; Vitest/Testing Library existentes. Playwright e ferramenta de auditoria de acessibilidade são adições de teste propostas, não instaladas nesta etapa. Não acrescentar R3F, runtime 3D por CDN nem biblioteca de scroll.

**Spec:** [Especificação](../../design-transition/specification.md). [Imagem aprovada](../../design-transition/assets/approved-desktop.png). Ler ambos antes de executar.

## Global Constraints

- Claro padrão: fundo `#F7F7FA`, texto `#14131C`, secundário `#565565`, acento `#6534D8`; alternativa escura preservada.
- Copy hero: “Olá, que bom ter você por aqui.” e “Desenvolvimento, automações e suporte.”; intro curta aprovada da especificação.
- Manter `pt-BR`, `en-US`, hashes existentes, IDs de projetos, PDFs e APIs atuais.
- Conteúdo legível e links úteis antes do 3D; canvas nunca será a única forma de navegação.
- Sem loader bloqueante, partículas globais, rolagem capturada ou cursor personalizado.
- Movimento reduzido, toque, teclado e falha de GPU são estados principais.
- Nenhum título profissional, cliente, URL, resultado ou nível de competência inventado.
- Planejamento não autoriza publicação. Não modificar RUON nem preparar envio real de formulário como teste.

## Review Focus

1. Rede lenta ou falha de WebGL: visitante consegue abrir projeto, PDF e contato sem esperar; testado em P1/P2.
2. Mudança de idioma/tema e montagem dupla: listeners e renderer não duplicam; hash e query continuam úteis; P2/P6.
3. Mobile com gesto vertical, zoom e rótulos projetados: câmera não captura scroll e destinos não ficam escondidos; P3/P7.
4. Usuário interrompe movimento ou ativa redução durante interação: animação cancela e link ainda navega; P2/P3.
5. Formulário com erro/429 e clipboard negado: nada afirma sucesso indevido nem apaga trabalho do visitante; P5.

## Ordem de execução e entregas

| Etapa | Depende de | Entrega demonstrável |
|---|---|---|
| P0 — Linha de base e prova da paisagem | — | Um trecho da paisagem comparável ao alvo, com medições e decisão de assets |
| P1 — Portfólio utilizável com poster | P0 para poster final | Abertura responsiva, navegação e currículo sem dependência do loader |
| P2 — Mundo resiliente | P0, P1 | Cena carrega, pausa, reduz qualidade e retorna ao poster em falha |
| P3 — Três caminhos funcionais | P2 | Cada pavilhão leva a evidência real por mouse, teclado ou toque |
| P4 — Projetos e trajetória | P1 | Conteúdo atualizado em duas línguas, provas e formação |
| P5 — Contato e canais | P1 | Formulário com estados reais, e-mail e PDFs funcionando |
| P6 — Compatibilidade e retirada do legado | P3, P4, P5 | Tema, idioma, ÆVO e SEO coerentes; motor antigo retirado |
| P7 — Verificação e entrega | P6 | Prévia completa, matriz de dispositivos e relatório de limites |

P4/P5 não dependem do acabamento da cena, mas integrar sobre a mesma estrutura e tokens. A pedido posterior do usuário, esta sequência foi refinada em uma [proposta de 11 tickets](../../design-transition/ticket-breakdown.md), com dependências explícitas, aguardando revisão da divisão antes de publicar no GitHub. Fazer commits por entrega coerente durante a execução.

## Mapa de arquivos e responsabilidades

### Existentes a modificar

- `src/app/[locale]/layout.tsx`: retirar overlays e CDNs no momento seguro, tema claro padrão, fonte e metadados.
- `src/app/[locale]/page.tsx`: sequência de seções; apenas um `main`, landmarks e âncoras.
- `src/app/globals.css` e `css/main.css`: retirar a cascata antiga após migrar seus consumidores; não acumular overrides ao fim do arquivo.
- `src/components/sections/{Navbar,HeroSection,SobreSection,ExperienciaSection,SkillsSection,ProjetosSection,FormacaoSection,ConquistasSection,ContatoSection,Footer}.tsx`: composição e conteúdo.
- `src/i18n/locales/{pt-BR,en-US}.json`, `src/i18n/types.ts`: novo contrato de copy, com paridade entre línguas.
- `src/components/ui/{LanguageToggle,ThemeToggle}.tsx`: apresentação e ciclo sem scripts one-shot.
- `src/components/ai/{AevoWidget,AevoEffects}.tsx`, `src/lib/aevo/{rag-knowledge,tools-definitions,provider-factory}.ts`: fatos e ações compatíveis, sem efeitos globais conflitantes.
- `src/components/seo/json-ld.tsx`, `src/app/manifest.ts`, `README.md`, `public/llms.txt`, `DESIGN.md`, `PRODUCT.md`: identidade e fatos coerentes.
- `src/app/api/contato/route.ts`: apenas linguagem do remetente/assunto e ajustes estritamente necessários ao contrato preservado; manter transporte e antispam.
- `package.json`, `package-lock.json`, `.github/workflows/ci.yml`: dependências/QA reais e scripts compatíveis; não atualizar framework por estética.

### Novos arquivos propostos

- `src/components/hero-world/HeroWorld.tsx`: poster, links e composição; API pública pequena.
- `src/components/hero-world/WorldClient.tsx`: fronteira client e import dinâmico do renderer.
- `src/components/hero-world/WorldCanvas.tsx`: montagem e destruição; sem texto de produto pintado no canvas.
- `src/components/hero-world/{world.types,world.destinations,world.policy}.ts`: contratos, IDs e seleção de qualidade.
- `src/components/hero-world/scene/{createWorld,buildWorld,cameraRig,disposeWorld}.ts`: renderer, geometria/asset, câmera e recursos. Dividir apenas se essas responsabilidades existirem na prova.
- `src/components/hero-world/HeroWorld.module.css`: posicionamento responsivo da cena/links; estilos do conteúdo ficam nas seções.
- `src/styles/{tokens,base}.css`: tokens globais e fundamentos substituindo o hub antigo.
- `public/images/world/manifest.json`, posters e eventual `public/models/portfolio-world.glb`: assets de produção, sem UI rasterizada.
- `src/__tests__/{world-policy,hero-world,navigation,contact,profile-content}.test.ts[x]`: comportamento, não snapshot da implementação.
- `tests/e2e/portfolio.spec.ts` e `playwright.config.ts`: fluxos completos; fixtures de APIs para não enviar mensagens reais.
- `docs/design-transition/{scene-proof,verification}.md`: resultados e lacunas de prova, criados durante execução.

## P0 — Linha de base e prova da paisagem

**Files:** referência em `docs/design-transition/assets/`; resultados em `scene-proof.md`; experimento isolado inicialmente no diretório de trabalho da cena, sem entrar na rota pública até integrar. Asset-fonte autorado, se necessário, em `design/assets/world/` com exportações em `public/`.

**Interfaces:** produz o enquadramento desktop/mobile, cadastro de três destinos e a escolha procedural/glTF. O experimento é prova, não aprovação antecipada do produto inteiro.

- [ ] Confirmar `git status`, preservar todos os arquivos locais, ler instruções aplicáveis e registrar o commit-base. `npm ci` conforme lockfile; não trocar versões sem registrar motivo.
- [ ] Rodar baseline: `npx tsc --noEmit`, `npm run test`, `npm run build`. Registrar falhas existentes separadamente. Capturar aparência atual em desktop/mobile e inventariar consumidores dos scripts antigos.
- [ ] Conferir APIs de Three da versão instalada e compatibilidade com `@types/three` 0.173.0; corrigir só o desalinhamento comprovado. Verificar o script `lint`: Next 15 usa `next lint`, mas projeto pode não ter configuração; não inventar “lint passou”.
- [ ] Construir terreno + uma ponte curva com espessura + um pavilhão com abertura, usando câmera travada e branco/violeta do alvo. Montar também enquadramento retrato; sem componentes fake em CSS para substituir a cena.
- [ ] Capturar quadro comparável, medir triângulos/draw calls/bytes e tempo de frame em build de produção. Conferir pavilhão, caminho contínuo, vazios e material. Não fazer testes unitários de coordenadas artísticas.
- [ ] Decidir a partir da prova: procedural viável → expandir; fidelidade insuficiente → modelagem autorada glTF com fonte editável. Verificar ferramenta disponível, origem e licença; não prometer converter PNG automaticamente.
- [ ] Produzir posters desktop/mobile sem textos/UI e verificar arquivos, proporções e câmeras. Registrar pontos âncora. Um asset obrigatório ausente bloqueia a conclusão visual de P1; o shell pode avançar com um poster marcado como temporário, sem ser apresentado como entregue.
- [ ] **Revisão guiada 1:** mostrar cena desktop e mobile lado a lado com a referência. Resolver eventual diferença material antes de espalhar o design pelo site.

**Pronto quando:** existe um caminho demonstrável para o alvo visual e os limites iniciais não são obviamente inviáveis. Se o experimento falhar, o relatório mostra por quê e qual decisão precisa do usuário; não substituir silenciosamente a experiência por uma imagem com tilt.

## P1 — Abertura e navegação utilizáveis com poster

**Files:** layout/page, Navbar/HeroSection, tokens/base, dicionários, ThemeToggle, HeroWorld e styles; testar `navigation.test.tsx`, `hero-world.test.tsx`.

**Interfaces:** `HeroWorld({ locale, labels, links, motionEnabled })`; `WorldLink = { id: WorldDestination; label: string; href: string }`; destinos fixos development → `#projetos`, automation → `#project-atlas`, support → `#experiencia`.

- [ ] Teste de comportamento antes da implementação: `renders_work_resume_and_world_links_before_renderer_ready`. Esperar H1 e links com href corretos, inclusive com carregamento pendente e erro simulado.
- [ ] Teste `mobile_menu_opens_closes_and_restores_focus`: abrir por botão, inspecionar `aria-expanded`, fechar com Escape/link, retornar foco. Ver o teste falhar antes da migração.
- [ ] Implementar os textos exatos e tokens da spec; manter nome completo em intro/metadados. Fonte via `next/font`, sem CDN externa no caminho crítico.
- [ ] Reservar proporção/altura da paisagem; poster próprio responsivo e destinos HTML. Sem usar a página inteira aprovada como fundo.
- [ ] Migrar menu e navegação para React/âncoras antes de desligar callbacks legados correspondentes. Nunca manter dois listeners executando a mesma navegação.
- [ ] Criar seleção interna temporária de shell novo/legado no layout, sem rota pública extra e sem montar ambos. No shell novo, excluir desde já CDN, canvas, loader, cursor e `main.js` legados. Menu já é React; onde formulário ainda não foi migrado, oferecer e-mail direto até P5. P6 retira a seleção e arquivos órfãos, não inaugura a exclusividade dos motores.
- [ ] Verificar 320, 390, 768 e 1440 px; quebra de texto natural, CTA visível, sem overflow. Verificar navegação com JS desativado pelo menos pelos links desktop e links de seção sempre presentes.
- [ ] Rodar os testes novos, `npx tsc --noEmit` e `git diff --check`; commit do shell funcional.

**Pronto quando:** há um portfólio navegável mesmo sem renderer, com o hero reconhecível e sem bloqueio visual.

## P2 — Cena resiliente e otimização de recursos

**Files:** WorldClient/WorldCanvas, policy/types, scene/*, manifesto/posters; testes `world-policy.test.ts` e `hero-world.test.tsx`.

**Interfaces internas propostas:** `resolveWorldQuality({ reducedMotion, saveData, webglAvailable }): WorldQuality`; `createWorld({ canvas, quality, onReady, onFailure, onAnchorsChange, onHoverChange, onActivate }): WorldController`; controlador com `setProgress(number)`, `setPointer({x,y}|null)`, `setActiveDestination(WorldDestination|null)`, `setVisible(boolean)`, `resize(width,height)`, `dispose()`.

`onAnchorsChange(anchors: ReadonlyArray<{id: WorldDestination; x: number; y: number; visible: boolean}>): void` fornece coordenadas em CSS px relativas ao hero, sem expor objetos Three. `onHoverChange(id: WorldDestination|null): void` informa picking visual. `onActivate(id: WorldDestination): void` comunica clique do canvas; o wrapper resolve o cadastro de links e ativa o mesmo anchor HTML, responsável por href/foco/histórico. O controlador nunca chama router, scroll ou DOM de outra seção. Hover/foco dos links HTML atualizam `setActiveDestination` no sentido inverso.

- [ ] Testes antes de implementar: `reduced_motion_and_save_data_choose_static`; `webgl_unavailable_keeps_poster`; `asset_failure_preserves_links`; `late_load_after_unmount_does_not_attach_canvas`.
- [ ] Acrescentar `allow_motion_after_static_loads_only_when_visible`, `leave_viewport_during_loading_does_not_create_gpu_renderer` e `reduce_motion_during_loading_discards_late_result`: observar mudança de preferência em runtime, adiar GPU fora da viewport e invalidar callbacks de gerações antigas. Download concluído fora da tela não autoriza iniciar RAF.
- [ ] Importar renderer dinamicamente dentro de wrapper client; poster e HTML permanecem server-rendered. Não colocar `ssr:false` em Server Component.
- [ ] Implementar a máquina `poster/loading/ready/paused/fallback`. Ocultar poster somente após frame válido; rejeição não cria loader infinito.
- [ ] Manter único RAF; suspender por aba oculta/hero fora da viewport; controlar animação por delta de tempo; renderizar sob demanda quando não houver movimento.
- [ ] Implementar descarte idempotente, observers e eventos de contexto perdido. Não fazer retry automático infinito; poster e links permanecem após falha.
- [ ] Testar com adapter controlável: montar → desmontar → montar e simular eventos; afirmar quantidade de instâncias/cleanup pelo contrato, não comparar cada material interno.
- [ ] Aplicar DPR/qualidade e degradação única conforme spec; medir 10 s de interação no dispositivo de referência. Se faltar medição física, declarar emulação como tal.
- [ ] Registrar tamanhos transferidos, memória observável e render calls em `scene-proof.md`; rodar testes, tipos e build; commit.

**Pronto quando:** cena pode ser desativada ou falhar sem quebrar conteúdo; pausa e limpeza estão demonstradas. FPS e bytes têm números e configuração do teste, não estimativas apresentadas como resultado.

## P3 — Navegar pelos três caminhos

**Files:** world.destinations, HeroWorld, cameraRig, interação na cena; e2e de navegação.

**Interfaces:** mesmo cadastro de destinos do P1. `activeDestination` é apresentação transitória; `href` é a fonte da navegação. Ativação visual e por HTML seguem o mesmo destino.

- [ ] Teste `each_world_destination_reaches_expected_section`: development/projetos, automation/project-atlas, support/experiencia; executar por clique e teclado, verificar hash e destino.
- [ ] Implementar picking por raycast e hover/foco correspondentes; projetar labels e mantê-los dentro da área disponível. Quando não couberem, renderizar links no fluxo abaixo da cena.
- [ ] Implementar câmera limitada por mouse e scroll conforme parâmetros propostos; não bloquear a navegação enquanto uma animação termina.
- [ ] Testes de interrupção: `new_target_cancels_previous_highlight`; `reduced_motion_toggled_mid_interaction_stops_camera`; `direct_hash_skips_intro_and_preserves_destination`.
- [ ] E2E touch: swipe vertical iniciado na cena move a página; toque em link leva ao conteúdo; nenhum hover obrigatório. Zoom e orientação preservam acesso aos três destinos.
- [ ] Testar Voltar/Avançar e link com hash externo; atualizar foco apenas em ativação explícita, sem roubar foco durante scroll passivo.
- [ ] Rodar testes/e2e; capturar a interação para revisão, sem afirmar que screenshot estático prova movimento; commit.

**Pronto quando:** uma pessoa consegue explorar a paisagem ou ignorá-la, chegando ao mesmo conteúdo por todas as entradas.

## P4 — Conteúdo, projetos e trajetória em duas línguas

**Files:** todas as seções de conteúdo, dicionários/types; PDFs; `profile-content.test.ts` e paridade i18n.

**Interfaces:** preservar hashes/IDs legados. Projetos com `slug`, `status`, `summary`, `contribution`, `stack`, `demoUrl?`, `repoUrl?`; URLs ausentes omitem a ação, nunca viram `href="#"`.

- [ ] Testes de aceitação de conteúdo: Atlas e CKF em produção; DocFácil e VECOM em desenvolvimento; ADS desde 08/2026; `5 min → 20 s` descrito como uma etapa. Checar paridade entre as duas línguas.
- [ ] Aplicar fatos e stacks dos PDFs; substituir a narrativa centrada em senioridade de IA pelo equilíbrio confirmado. Não afirmar equivalência de nomes do cartório sem confirmação.
- [ ] Redesenhar projetos como evidências com imagens reais quando disponíveis, contexto e links. Atlas privado não recebe screenshot ou URL inventada. Não acrescentar logo de cliente como prova sem origem.
- [ ] Construir trajetória, competências, formação e conquistas no mesmo sistema visual; preservar anexos e certificados acessíveis. Foli fica complementar.
- [ ] Copiar PDFs fornecidos para os destinos da spec e verificar MIME/download, inclusive URL histórica `/curriculo_kaue.pdf`; a versão geral é padrão.
- [ ] Testar conteúdo longo em inglês, teclado e mobile; nenhuma escala fixa exige truncar texto. Rodar testes/tipos; commit.

**Pronto quando:** o recrutador entende as três frentes e consegue verificar o trabalho sem depender da cena ou do assistente.

## P5 — Contato e canais com estados reais

**Files:** ContatoSection/Footer, route de contato apenas onde necessário; `contact.test.tsx`, e2e com respostas mockadas.

**Interfaces:** manter payload e códigos atuais de `/api/contato`; `fill_petition_form` continua alias de integração, mesmo que a interface deixe de usar linguagem notarial.

- [ ] Testar `submit_success_only_after_success_response`, `error_keeps_fields`, `rate_limit_shows_retry_and_email`, `double_submit_is_prevented` com fetch controlado; não chamar Web3Forms real.
- [ ] Migrar formulário para estado React; labels associados com `htmlFor`, feedback `aria-live`, foco em erros relevantes e botão com largura estável. Preservar honeypot/fillTime e validação.
- [ ] Testar servidor indisponível, rejeição de rede e JSON inválido; manter o conteúdo digitado e mostrar contato alternativo. Não afirmar entrega quando o backend não confirmou.
- [ ] Atualizar remetente e texto visível para linguagem profissional; manter proteção de chave e transporte atuais. Limite de requisições em memória continua uma limitação preexistente, não foi redesenhado aqui.
- [ ] Teste `clipboard_denied_shows_selectable_email`: aguardar clipboard real antes de mostrar sucesso, fallback com endereço visível e mailto.
- [ ] Migrar vínculos com o ÆVO para preenchimento controlado, evitando escrever `.value` sem sincronizar React. Nome interno da ação pode permanecer; rótulo público passa a mensagem.
- [ ] Verificar formulário por teclado/mobile e e-mail direto sem JS; rodar testes e commit.

**Pronto quando:** contato funciona sem depender de `loaderDone`, preserva entradas em falha e não simula sucesso.

## P6 — Idioma, tema, ÆVO, SEO e retirada do legado

**Files:** layout/page, CSS hub antigo, public/js consumidores, ui toggles, ai/*, aevo/*, JSON-LD, manifest, README/llms, DESIGN/PRODUCT e CI.

**Interfaces:** APIs mantidas; IDs de seção/projeto estáveis; ações `scroll_to_section`, `highlight_project`, `open_resume` e preenchimento continuam úteis. Efeitos globais não podem deformar a página.

- [ ] Testar o fluxo ÆVO → seção/projeto/currículo/formulário; incluir movimento reduzido e base local sem API key. Nenhum teste envia conteúdo a provider externo.
- [ ] Atualizar conhecimento principal E chunks/respostas determinísticas/prompts, não apenas o título inicial. Buscar e resolver títulos, stacks e afirmações antigas em todas as superfícies públicas.
- [ ] Estilizar assistente para o novo sistema e carregá-lo sem competir com hero; manter fechado por padrão. Tratar ações de explosão/gravidade como não suportadas visualmente com resposta útil; não apagar silenciosamente contratos úteis.
- [ ] Validar tema escuro com pedra, caminhos e poster coerentes; não apenas inverter a imagem. Se faltar variante de qualidade, reportar a lacuna antes de declarar o tema completo.
- [ ] Testar idioma preservando `?query#hash`, sem listeners duplicados. Trocar reload legado apenas quando ciclo React estiver correto.
- [ ] Remover do layout canvas global, CDN Three r128, loaders, cursor, ruido e os scripts migrados. Retirar imports e dependências sem consumidores somente após `rg`; inventariar separadamente arquivos React/UI duplicados antes de remover.
- [ ] Não apagar diretórios legados em massa; remoção deliberada dos consumidores e arquivos confirmadamente órfãos. Garantir um único `main` e nenhum `loaderDone` necessário para funcionalidades.
- [ ] Atualizar metadata/JSON-LD, manifest, README, llms, DESIGN e PRODUCT. Atualizar testes de manifest que fixam ouro/fundo escuro antigo; manter testes de canonical/idiomas.
- [ ] Conferir CI realmente roda os comandos anunciados; acrescentar E2E de fluxos relevantes se a execução adotar Playwright. Rodar tipos, testes, build e `git diff --check`; commit de integração.

**Pronto quando:** trocar idioma, tema ou usar assistente não traz a identidade antiga nem reativa efeitos globais concorrentes.

## P7 — Validação, revisão guiada e entrega

**Files:** `docs/design-transition/verification.md`, capturas em `.impeccable/review/`, relatório de build e medições.

- [ ] Fluxos automatizados em build de produção: projetos, PDF, contato mockado, menu, teclado, hash, tema e idiomas; falhas de renderer/API. Executar `npx tsc --noEmit`, `npm run test`, `npm run build` e, se instalado, `npx playwright test`.
- [ ] Medir em 320×740, 390×844, 768×1024, 1440×900 e 1920×1080, com foco em desktop/mobile de referência. Incluir mobile landscape e zoom 200%; confirmar aparelho físico quando disponível.
- [ ] Testar WebGL ausente/contexto perdido, rede limitada, poster 404, movimento reduzido em boot/runtime, aba oculta, scroll para fora do hero e retorno. Links não podem desaparecer quando poster e renderer falham juntos.
- [ ] Inspeção visual inicial em lote: desktop, mobile, tema e estados principais. Comparar crops de hero/texto/cena na escala legível com o alvo, registrar diferenças; corrigir em um lote; confirmar em uma segunda rodada. Não prolongar polimento sem uma falha material identificada.
- [ ] Rodar detector Impeccable uma vez nos arquivos UI alterados, usando o script da versão carregada. Separar achados mecânicos das decisões aprovadas. Revisão independente avalia fidelidade, coerência e riscos do diff, sem anunciar PASS com falhas abertas.
- [ ] Registrar contraste medido, tamanhos de toque, navegação assistiva manual, bytes, long tasks, frame times e Web Vitals de laboratório. Se houver axe/Lighthouse, anexar configuração; não tomar nota agregada como prova de todos os requisitos.
- [ ] **Revisão guiada 2:** apresentar a prévia completa, interação gravada/observável, capturas desktop/mobile e limitações. A aparência da imagem já está aprovada; revisar a fidelidade da tradução e a jornada que agora existe.
- [ ] Preparar diff e instrução de reversão; preservar um commit-base e assets antigos até o aceite. Não usar force push nem publicar por inferência da aprovação de design.
- [ ] **Revisão guiada 3:** entrega pronta para publicação separada, com autorização explícita para publicar. Depois da publicação autorizada, verificar rotas e métricas de campo quando houver amostra suficiente.

**Pronto quando:** todos os critérios obrigatórios têm prova ou uma lacuna explícita aceita pelo usuário; não restam “provas” baseadas apenas no mockup. Estado do campo pode permanecer pendente se não houver tráfego, sem bloquear a prévia validada.

## Estratégia de reversão

Trabalhar em branch de integração a definir na execução; não há necessidade de trocar o checkout apenas para escrever este plano. Guardar commit-base e comparar cada fatia. O corte é a remoção dos consumidores legados no P6, realizado somente com navegação, formulário e assistente substituídos. Reverter o commit integrado, não restaurar arquivos arbitrariamente nem descartar trabalho do usuário. Domínio/APIs/rotas não mudam, reduzindo o custo da reversão.

## Pendências que o primeiro experimento resolve

- Capacidade de chegar à fidelidade da paisagem com geometria procedural e ferramentas locais; tempo de produção de asset autorado se necessário.
- Peso e tempo de frame reais; orçamentos da spec são hipótese de engenharia.
- Posição das âncoras e enquadramento mobile; a imagem aprovada só mostra desktop.
- Tratamento escuro de qualidade, sem alterar a direção clara aprovada.

Essas pendências não justificam outra rodada de perguntas de gosto agora. A prova P0 deve trazer alternativas concretas se uma decisão material não se resolver tecnicamente.

## Estado desta entrega

- [x] Referência aprovada preservada, identificada e vinculada.
- [x] Dependências e riscos do código existente inspecionados.
- [x] Jornada, estados, responsividade, movimento, assets e critérios de prova especificados.
- [x] Ordem, arquivos, interfaces, aceites e verificações de implementação definidos.
- [ ] Implementação da aplicação: não iniciada nesta etapa.
- [ ] Build, testes, fidelidade e desempenho do novo design: ainda não verificados.
