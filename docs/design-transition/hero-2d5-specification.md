## Problem Statement
O hero atual mostra uma imagem estática de resolução limitada. A prova 2.5D com profundidade existe separadamente, mas ainda não entrega animação e realce dos caminhos no portfólio. A ampliação do fundo reduz a nitidez e uma integração incorreta pode desalinhá-lo dos indicadores, alterar suas cores ou prejudicar desempenho e navegação.

## Solution
Integrar ao hero real uma paisagem 2.5D com paralaxe discreta, avanço curto na rolagem e realce dos três caminhos, preservando a composição aprovada. Melhorar a fonte visual e seus derivados antes de animar. A apresentação e todos os links devem funcionar imediatamente, enquanto a experiência gráfica carrega progressivamente e pode retornar à imagem estática.

## User Stories
1. Como visitante, quero ver uma paisagem nítida para perceber o cuidado visual do portfólio.
2. Como visitante, quero reconhecer a composição aprovada para ter uma experiência coerente.
3. Como visitante, quero perceber profundidade ao mover o ponteiro para explorar a paisagem.
4. Como visitante, quero um movimento curto na rolagem para conectar a abertura aos projetos.
5. Como visitante, quero realçar um caminho para antecipar seu destino.
6. Como recrutador, quero acessar projetos imediatamente para avaliar o trabalho sem esperar animações.
7. Como recrutador, quero abrir o currículo independentemente do renderer para continuar minha avaliação.
8. Como visitante, quero acessar desenvolvimento, automação e suporte por links claros para encontrar evidências profissionais.
9. Como usuário de teclado, quero foco visível e realce equivalente ao hover para explorar os mesmos destinos.
10. Como usuário de toque, quero navegar sem hover para usar o portfólio no celular.
11. Como usuário de toque, quero rolar verticalmente sobre a cena para continuar lendo naturalmente.
12. Como usuário com movimento reduzido, quero uma apresentação estática confortável para acessar o conteúdo.
13. Como visitante em rede econômica, quero evitar recursos gráficos dispensáveis para economizar dados.
14. Como visitante sem WebGL, quero imagem e links preservados para navegar normalmente.
15. Como visitante, quero que falhas de carregamento mantenham o conteúdo utilizável para não ficar bloqueado.
16. Como visitante, quero indicadores alinhados aos pavilhões para compreender cada destino.
17. Como visitante em tela larga, quero detalhe visual adequado sem downloads excessivos para ter qualidade com fluidez.
18. Como visitante no celular, quero enquadramento e links legíveis para reconhecer os três destinos.
19. Como visitante, quero que imagem inicial e cena animada coincidam para evitar saltos visuais.
20. Como visitante, quero cores consistentes entre imagem e canvas para perceber uma paisagem integrada ao fundo.
21. Como visitante, quero que a animação pare quando não estou vendo o hero para poupar bateria.
22. Como visitante, quero que a cena fique em repouso quando não interajo para evitar distrações.
23. Como responsável pelo portfólio, quero comparar candidatos de maior resolução antes de substituir a arte para preservar sua identidade.
24. Como desenvolvedor, quero fontes e mapas com procedência registrada para reproduzir e ajustar a experiência.
25. Como responsável pelo portfólio, quero medições do hero integrado para avaliar qualidade e custo reais.

## Implementation Decisions
- Escolha aprovada: 2.5D substitui a exigência de geometria 3D para esta paisagem. O restante do site permanece fora desta etapa.
- Manter Next/React para HTML e Three.js já instalado para um plano com shader, cor, profundidade e máscara de caminhos. Carregar renderer dinamicamente; não adicionar React Three Fiber, GSAP ou WebGPU para este efeito.
- Preservar composição, copy, links e elevação de 24 px dos três indicadores solicitada pelo usuário.
- Primeiro procurar master maior. Se indisponível, produzir candidato conservador de aprimoramento usando a arte limpa como referência. Meta de master próxima de 2880 px de largura, condicionada à saída real da ferramenta; interpolação simples não será apresentada como detalhe recuperado.
- Não sobrescrever o original. Revisar arcos, curvas, móveis, silhuetas e cores antes de adotar candidato gerado. Se houver alteração material da composição, manter original até revisão guiada.
- Produzir variantes responsivas a partir do master escolhido, com uma compressão calibrada. Registrar dimensões, bytes, procedência e custo decodificado. Mapas de dados devem preservar canais e alinhamento com a arte final.
- Poster inicial e HTML independem do canvas. Estados: poster, loading, ready, paused, fallback. Mostrar canvas apenas após primeiro frame válido e coincidente com o poster.
- Compartilhar cálculo de enquadramento, recorte e projeção entre imagem, shader e indicadores. Ler dimensões reais; corrigir cover e proporções extremas do protótipo.
- Calibrar explicitamente o pipeline de cor para evitar dupla conversão sRGB, fundo branco divergente e diferença entre imagem HTML e canvas. Fundo claro de referência: #F7F7FA; violeta RUON: #6534D8.
- Paralaxe inicial de aproximadamente 4–8 CSS px, ajustada pela prova visual; zoom de rolagem inicialmente 1–2%. Não revelar áreas ocultas nem produzir rasgos nas bordas. Esses valores são hipóteses de projeto.
- Realce contido por hover/foco, sem pulsação permanente. Amortecimento por delta de tempo, cancelamento da intenção anterior e renderização sob demanda somente enquanto há mudança visível.
- Cadastro único de destinos: desenvolvimento → #projetos; automação → #project-atlas; suporte → #experiencia. HTML controla navegação, foco e histórico. Canvas decorativo não recebe foco nem bloqueia gestos.
- Indicadores acompanham a transformação ou o movimento é limitado para preservar a ancoragem. Em mobile, destinos podem ir para o fluxo quando houver colisão.
- Movimento reduzido e Save-Data mantêm poster. Alterações durante carregamento invalidam resultados tardios. Pausar fora da viewport/aba oculta; liberar recursos e listeners no unmount. Falha de contexto preserva poster e links sem retry infinito.
- Dimensionar canvas por área real e limite de pixels. DPR inicial limitado a 1,5 desktop e 1 mobile; aumentar somente com fonte e medições adequadas. Respeitar capacidade de textura da GPU.
- Metas propostas: poster inicial até 250 KB desktop/150 KB mobile; arte detalhada adiada até 800 KB desktop/350 KB mobile; mapas juntos até 150 KB; runtime incremental até 220 KB gzip. Registrar transferência total se poster e textura diferirem, evitando downloads redundantes. Alterações em orçamentos canônicos exigem justificativa explícita; estes limites não são resultados medidos.
- Ordem: candidato visual e mapas; integração resiliente com poster; movimento e destinos; medições; revisão guiada do hero completo.

## Testing Decisions
- Fronteira confirmada pelo usuário: o hero funcionando no site, incluindo nitidez/fidelidade visual, profundidade e caminhos, mouse/teclado/toque, fallback e desempenho. Testar comportamento observável, não coordenadas artísticas ou detalhes internos do shader.
- Preferir o wrapper público do hero como fronteira automatizada. Validar links antes de ready, falha preservando conteúdo, resultado tardio descartado, pausa, desmontagem idempotente e mudança de preferência durante loading/interação.
- Reaproveitar o harness existente de captura e telemetria da prova 2.5D como instrumentação; medições isoladas não comprovam integração na página pública.
- E2E no site real: confirmar canvas montado, destinos/hash e histórico, teclado e foco, swipe sobre a cena e navegação direta por hash.
- Comparar poster e canvas no primeiro frame e após interação; verificar bordas, cor, nitidez e ancoragem em 320, 390, 1440 e 1920 px, dois idiomas e zoom 200%.
- Simular WebGL indisponível/contexto perdido, erro de textura, movimento reduzido em boot/runtime e mudanças de visibilidade. Conteúdo e navegação permanecem acessíveis.
- Medir build de produção: bytes transferidos, tamanho incremental de JS, memória estimável das texturas, mediana/p95 dos frames por 10 segundos após aquecimento e long tasks. Registrar viewport, GPU, DPR e limitações; emulação não equivale a dispositivo físico.
- Metas de fluidez: 60 fps desktop e pelo menos 30 fps mobile durante interação. Repouso e hero oculto sem loop contínuo. Métricas de laboratório não certificam percentis de campo.
- Inspeção visual em lote, correção em lote e confirmação. Defeitos funcionais detectados recebem diagnóstico próprio, sem serem tratados como polimento opcional.

## Out of Scope
Reformular seções abaixo do hero, publicar o site, alterar domínio/backend, reconstruir a paisagem em geometria 3D completa, adicionar órbita livre ou tour obrigatório, usar giroscópio obrigatório, comprar serviços/assets, trocar a composição aprovada sem revisão, ou declarar resolução e desempenho não medidos.

## Further Notes
Especificação sintetizada em 29/10/2026 com critérios de teste confirmados nesta conversa. Complementa o trabalho existente de abertura, ciclo de vida e caminhos (#37–#39); não autoriza recriar ou encerrar essas issues. Antes da execução, reconciliar escopo e bloqueios nativos para evitar entregas duplicadas. A especificação #47 permanece registro do refinamento Blender anterior; esta decisão 2.5D é a direção atual do hero, sem encerrar automaticamente aquele histórico.

Fontes primárias: https://threejs.org/manual/pages/rendering-on-demand.html ; https://threejs.org/manual/pages/responsive.html ; https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices ; https://nextjs.org/docs/pages/api-reference/components/image .
