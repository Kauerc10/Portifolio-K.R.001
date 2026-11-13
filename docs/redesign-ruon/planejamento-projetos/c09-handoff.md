# C09 — Vitrine consolidada dos projetos

Ticket #84 da spec #75. C08 foi aprovado por Kauê e #83 encerrada antes de iniciar esta fatia. C09 aguarda seu teste; C10 não foi iniciado.

## Entrega

A home apresenta exatamente cinco cases, nesta ordem: VioDigital, VECOM Ficha Fácil, Atlas Notarial, DocFácil e CKF Manutenção. As duas entregas CKF continuam no mesmo case. O catálogo selecionável antigo foi retirado da interface; as composições aprovadas e páginas dedicadas foram preservadas.

Uma navegação com cinco âncoras permite escolher a ordem. A opção **Leitura rápida** remove a fixação temporária e suas pistas de scroll; a preferência permanece na sessão e funciona mesmo quando o armazenamento está bloqueado. O modo normal usa percursos de 155svh no desktop e 135svh no celular, em lugar das cinco fixações anteriores de 175–185svh. Sem JavaScript, com movimento reduzido ou altura de tela até 700px, a apresentação fica estática, com links disponíveis.

Os destinos antigos Atlas, CKF e DocFácil têm aliases junto ao projeto correspondente, inclusive sem JavaScript. Com JavaScript, o endereço é normalizado para o destino atual. Foli mantém um aviso compacto e link ao repositório somente quando seu endereço antigo é acessado; não vira um sexto case.

## Movimento e carregamento

As cinco prévias compartilham o mesmo ciclo de vida: scroll conduz o progresso, a cena pausa quando a pessoa para e reverte ao voltar. Somente prévias próximas da viewport recebem atualizações; uma aba oculta cancela trabalho pendente. Não foram adicionados vídeos ou operações de backend. As capturas e mascotes continuam com carregamento lazy, dimensões reservadas e fallbacks existentes.

O retorno preserva posição e foco por case/idioma, também com leitura rápida persistida. A recomposição ocorre antes da restauração; a ancoragem automática do navegador foi desativada apenas na vitrine aprimorada para evitar uma segunda correção da posição.

## Validação

- TypeScript e suíte automatizada: 74 testes em 19 arquivos.
- Build de produção em worktree isolado, preservando o servidor local para teste.
- [Provas locais no navegador](../evidence/c09-showcase/results.json): quinze percursos home → case → retorno, distribuídos entre desktop, celular e inglês/tema escuro; cinco cases, modo rápido, ausência de overflow, reversão/pausa do scroll e ausência de erros JavaScript.
- [Navegação nativa](../evidence/c09-showcase/native-results.json): entrada pelo CTA do hero, âncoras, retorno pelo histórico e abertura em nova aba, em desktop e celular.
- Fallbacks: sem JavaScript, movimento reduzido, armazenamento bloqueado e tela baixa; aliases e destino Foli acessíveis.
- Teste de ciclo de vida verifica suspensão fora da viewport, aba oculta e cancelamento no unmount. Revisão focada independente não encontrou pendências.

Capturas do índice e das prévias estão em `docs/redesign-ruon/evidence/c09-showcase/`. A prova no navegador é local. O status READY da Vercel comprova o build remoto; o Preview exige a sessão autorizada da Vercel e não foi tratado como uma jornada pública sem autenticação.

## Para testar

Abra a home em `#projetos`, use a navegação dos cinco cases, compare a rolagem normal com **Leitura rápida**, entre em uma página e volte. Confira também no celular. O hero e as demais seções não foram redesenhados nesta fatia.

Sem merge de produção. Aguardamos o aceite de C09 para começar C10, o QA integrado final.
