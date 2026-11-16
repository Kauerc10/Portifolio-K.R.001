# R03 — Respostas locais

Issue #66 · 11/11/2026 · integração base `098f9f7`.

Projetos: marcador vertical acompanha seleção em 180ms. Painel entra com 10px/opacidade por Web Animations; cleanup cancela seleção anterior, desmontagem e alteração de movimento reduzido. Grade sobreposta reserva altura intrínseca do maior caso, sem fixar pixels; casos inativos mantêm `hidden`, `aria-hidden` e `inert`. Sem JS todos os casos ficam disponíveis. O gesto é uma entrada curta, sem manter cópias do texto animadas simultaneamente.

Cursos mantêm details/summary nativo e controles de 44px; navegadores com interpolate-size suportam expansão de altura automática em 200ms. Demais recebem alternância imediata. Links/certificados usam sublinhado e seta de 2px no hover/foco. Contato recebe foco/pressão e feedback cromático; validação devolve foco ao primeiro campo inválido. Transporte real, payload, prevenção de duplicação e mensagens existentes permanecem iguais. Nenhuma escala alterada sem evidência de competição visual. Hero, intro, medalhas e percurso futuro sem mudanças.

TDD na fronteira DOM acordada: teste de seleção rápida falhou por ausência de inert; teste de validação falhou por foco ausente; ambos passaram após implementação. Suite completa: 12 arquivos / 51 testes. Build integrado passou antes da remoção do antigo keyframe CSS redundante; alteração final é CSS localizada, sem mudança de contrato/types.

`scripts/qa/micro-r03.cjs`: Chromium local, 1440/390, movimento normal/reduzido; troca rápida, foco, altura estável, repouso dos projetos sem animação corrente, sem overflow. Capturas e resultados anexos. Desktop/mobile de projetos inspecionados: índice legível, marcador alinhado, conteúdo livre. Contato capturado com erro. Prova sem JS confirma quatro projetos disponíveis. Execução em Next dev local; indicador de desenvolvimento aparece nas capturas. Não houve envio de mensagem real nem publicação. Formação atual tem até seis cursos; ramificação expandida continua coberta pelos testes existentes, sem prova visual de expansão com conteúdo inventado. Revisão conjunta PT/EN/temas e jornada completa cabe a R04.
