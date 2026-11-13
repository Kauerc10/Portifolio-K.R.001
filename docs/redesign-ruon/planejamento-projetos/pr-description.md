Esta PR reúne a implementação das prévias e páginas dedicadas dos cinco cases da spec #75. A referência inicial é o VioDigital já testado e aprovado por Kauê; VECOM e Atlas seguem as composições v3, e DocFácil e CKF seguem os conceitos aprovados.

## Estado atual

- Vio aprovado preservado na branch, incluindo história corrigida, galeria real, links e prova de movimento.
- Tickets C01–C10 publicados com bloqueios nativos.
- C01 aprovado por Kauê e #76 encerrada.
- C02 integrado: modelo localizado de case/múltiplas entregas, cabeçalho e galeria reutilizáveis, retorno isolado por case/idioma com guardas de dados inválidos. Vio migrado para essa base sem alterar copy, CSS ou coreografia.
- C02 aprovado por Kauê e #77 encerrada.
- C03 entregue para teste: versão nativa 2.5D documentada, manifesto de arte decorativa, galeria resiliente com acesso sem JavaScript e metadados/sitemap do case nas duas línguas. História e composição aprovadas preservadas. Aguarda aceite de Kauê antes de encerrar #78 e avançar para VECOM.
- Vídeo, camadas 2.5D ou combinação serão avaliados por case; nenhuma escolha técnica geral foi antecipada.

## Fluxo de revisão

Cada ticket termina com material ou prévia verificável e aguarda o teste de Kauê antes de avançar. A PR permanece em rascunho até a implementação completa e revisão final. Não há merge ou deploy de produção autorizado.

## Validação

C02: TypeScript e 72 testes passando. Roteiro independente no navegador verificou desktop/celular, retorno pelo link/histórico, galeria por teclado e foco, conteúdo inglês, nova aba, storage bloqueado, sem JavaScript, movimento reduzido e persistência do tema escuro. Comparação antes/depois teve zero pixels alterados nas seis capturas de home, hero e galeria, excluindo o badge do ambiente de desenvolvimento. Build validado em worktree isolado. Isso não valida os cases ainda não implementados.

## Escopo final planejado

C03: 74 testes em 18 arquivos, TypeScript e build passando. Browser independente validou metadados/sitemap, desktop/celular, pausa/reversão, erro de mídia antes da hidratação, erro no modal com foco restaurado e imagens sem JavaScript. Jornada completa de retorno e fallbacks revalidada. Capturas e gravações acompanham a entrega.

- [x] C01 #76 — Roteiros completos e aprovados.
- [x] C02 #77 — Base reutilizável aprovada.
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
