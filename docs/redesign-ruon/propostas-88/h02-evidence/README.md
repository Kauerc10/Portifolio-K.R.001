# H02 — Sobre, Experiência e ajuste aprovado de Skills

Base de implementação: `60634dc`, integração `codex/home-editorial-88`. Commits de UI: `ab1746a`, `c8d76db`, `9ae2e54`. Preview local: `http://localhost:3070/pt-BR` e `/en-US`; Chrome headless em Windows, emulação de viewport, sem dispositivo físico.

## Entrega

- Skills apresenta Desenvolvimento, Automação, IA/LLMs e Metodologia/resolução de problemas nos dois idiomas. Links de projeto removidos do HTML e dicionários; currículo permanece como ação real. Conteúdo continua entregue no HTML sem JavaScript. Nenhum certificado novo ou experiência foi inventado.
- Sobre e Experiência seguem as propostas isoladas aprovadas: curvas lilás discretas, ícones Lucide pequenos, divisórias e hierarquia. Empresas, cargos, períodos, localização e fatos profissionais permanecem nos dados anteriores. A curva de Sobre é SVG leve; não requer bitmap novo.
- Ondas compartilham o material e o escopo de movimento existentes. Texto permanece nítido e estável. Hover usa uma camada de iluminação local por opacidade, transformação pequena do ícone e cor nos chips. Texto estático não ganha clique, cursor de botão ou foco artificial. O currículo tem resposta equivalente por foco visível, com cores explícitas nos dois temas.
- Hover condicionado a `hover:hover` e `pointer:fine`. Movimento reduzido conserva resposta estática de cor. Não há rastreamento de mouse, animação contínua nova ou substituição do cursor.

## Validação

Red → green na fronteira DOM já aprovada: a asserção falhou com os links antigos e três grupos; passou após a mudança. Testes adicionais verificam HTML estático PT/EN, quatro áreas, conteúdo solicitado, currículo e ausência de tab stops artificiais.

`npx tsc --noEmit`: passou. `npm test -- --run src/__tests__/redesign-journey.test.tsx src/__tests__/i18n.test.ts src/__tests__/section-motion.test.ts`: 24 testes passaram.

Matriz real da página: 390, 768, 1440 e 1920 px × PT/EN × claro/escuro, 16 combinações, sem overflow horizontal e sem pageerrors. Inspeção visual agrupada desktop/mobile; um lote de correções (regra de Sobre alinhada à esquerda, curva antiga substituída por SVG suave) e uma confirmação. `matrix.json` é a primeira rodada; `confirmation.json` registra a confirmação e `sobre-*.png` foi atualizado. Demais screenshots não tiveram alteração posterior. `h02-scroll-hover.webm` mostra a versão final na página completa, scroll, hover e foco. Sem JS no navegador: quatro grupos e apenas o link de currículo.

O detector Impeccable sinalizou somente `stroke-width` como `width` animado; a transição foi removida. A mudança de stroke é imediata, ficando transformação/opacidade/cor como feedback animado.

## Custos e limites

Nenhum listener de ponteiro foi acrescentado. Listeners antigos dos links de projeto foram removidos. As três seções reutilizam o lifecycle existente (IntersectionObserver, cancelamento, preferência de movimento e scroll passivo com RAF apenas em eventos). São dois planos SVG por seção; nenhum filtro/blur e nenhum loop RAF novo. Hover não realiza trabalho JavaScript.

Amostra delimitada às três seções: zero animações `running` em repouso; zero animações fora da viewport. Ao trocar reduced motion, o primeiro snapshot CDP imediato precedeu o evento `change` (ainda mostrou efeitos); o snapshot após 150ms registrou zero em todos os escopos. Animações globais antigas em elementos de modal ocultos aparecem em `motion.json`; não pertencem a esta entrega, por isso a confirmação mede somente as seções alteradas. Ocultação de aba não foi revalidada fisicamente nesta amostra; o contrato existente permanece coberto pela suíte de lifecycle.

CPU 4× no Chrome via CDP, percorrendo as três seções e hover: uma long task de 52ms. É amostra em servidor Next dev sem baseline equivalente; não comprova ganho de desempenho nem Core Web Vitals. Sem novo build neste worktree para evitar duplicar `.next` com cerca de 280 MB livres; build de integração deve ser registrado pela raiz. Não houve publicação nem fechamento automático de issues; H03 continua aguardando aceite desta fatia.
