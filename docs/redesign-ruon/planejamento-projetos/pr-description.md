Esta PR reúne a implementação das prévias e páginas dedicadas dos cinco cases da spec #75. A referência inicial é o VioDigital já testado e aprovado por Kauê; VECOM e Atlas seguem as composições v3, e DocFácil e CKF seguem os conceitos aprovados.

## Estado atual

- Vio aprovado preservado na branch, incluindo história corrigida, galeria real, links e prova de movimento.
- Tickets C01–C10 publicados com bloqueios nativos.
- C01 em execução: roteiros dos cinco cases. As demais entregas aguardam as dependências e revisão de Kauê.
- Vídeo, camadas 2.5D ou combinação serão avaliados por case; nenhuma escolha técnica geral foi antecipada.

## Fluxo de revisão

Cada ticket termina com material ou prévia verificável e aguarda o teste de Kauê antes de avançar. A PR permanece em rascunho até a implementação completa e revisão final. Não há merge ou deploy de produção autorizado.

## Validação

A base Vio possui validação local anterior: TypeScript, 69 testes, roteiros de navegador desktop/celular, navegação de retorno, imagens e galeria por teclado. Essa evidência é ponto de partida e não valida os demais cases ainda não implementados. C01 recebe revisão documental e visual, sem testes de código artificiais.

## Escopo final planejado

- [ ] C01 #76 — Roteiros completos.
- [ ] C02 #77 — Base reutilizável.
- [ ] C03 #78 — VioDigital completo.
- [ ] C04 #79 — VECOM.
- [ ] C05 #80 — Atlas.
- [ ] C06 #81 — DocFácil.
- [ ] C07 #82 — CKF institucional.
- [ ] C08 #83 — CKF sistema.
- [ ] C09 #84 — Vitrine consolidada.
- [ ] C10 #85 — QA completo.

Closes #75
Closes #76
Closes #77
Closes #78
Closes #79
Closes #80
Closes #81
Closes #82
Closes #83
Closes #84
Closes #85
