# R04 — revisão integrada / Spec

11/11/2026. Base fixa `7bd40e8`; `git diff 7bd40e8...HEAD`, integração testada `c62ceb7`. Página pública em produção **local** Next 15.5.23, Chromium 156 headless Windows, porta 3067. Fontes externas bloqueadas no cenário de intro. Sem publicação ou fechamento de issues.

`npm run build` passou após a limpeza CSS final de R03; `npm test -- --reporter=dot`: 12 arquivos, 51 testes passaram. Inclui teste de transporte simulado do formulário: validação, prevenção de duplicação, erro e sucesso; nenhum contato real enviado.

`matrix.json` / `matrix.cjs`: 16 combinações de 390/768/1440/1920 × PT/EN × claro/escuro. Projetos por teclado, seleção rápida, foco preservado, altura estável, um h1, ausência de overflow horizontal e repouso sem animações ativas passaram. Movimento reduzido aplicado. Formulário inválido devolveu foco ao primeiro campo em todas. Capturas representativas de Experiência/Projetos anexas; imagem lazy aguardada antes da captura. Inspeção visual: hierarquia legível, faixa na borda sem cobrir trajetória e índice/projeto acessíveis em celular escuro. Referências aprovadas: `imagens-selecionadas/03-projetos.png` e `06-experiencia.png`; diferenças intencionais de escala/arte documentadas em R02/R03.

`intro/results.json` / `intro.cjs`: carregamento frio desktop/mobile, sequência e espera pela ação, encaixe, foco e sessão recorrente passaram; também hash direto, movimento reduzido, sem JS, storage bloqueado, resize durante encaixe, preferência dinâmica, Escape e falha de hidratação. Capturas ready/docking/complete anexas; filmstrips/vídeos detalhados continuam em R01, evitando duplicação pesada.

`supplement.json`: toque emulado selecionou CKF; fonte raiz 200% em EN390 sem overflow. Não equivale a zoom nativo do navegador. Navegação local única: FCP480ms, DOMContentLoaded515ms; CLS0.2866 foi contaminado pela alteração deliberada de fonte e **não serve como métrica de carregamento**. Sem baseline comparável nem conclusão de melhoria de performance. Medição de custo de animação antes/depois permanece não concluída.

## Resultado Spec

Nenhum defeito funcional bloqueante ou aumento de escopo identificado no diff revisado. Abertura, seção piloto e respostas locais correspondem às fatias aprovadas. Cursos têm expansão nativa progressiva; conteúdo atual não exige ramo extra, coberto nos testes. Máscaras do hero, medalhas/terraços e caminhos por scroll permanecem escopo futuro conforme fluxo aprovado.

Limites reais: Chromium único, toque emulado, sem dispositivo físico, leitor de tela ou zoom nativo; matriz reduzida não substitui inspeção visual humana integral. Performance comparativa não medida. Essas lacunas de evidência não são alegadas como requisitos implementados incorretamente. Sem aprovação estética automática. Revisão Standards registrada separadamente pela equipe.
