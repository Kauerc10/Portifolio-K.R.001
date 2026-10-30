# Revisão de usabilidade do hero — 30/10/2026

Decisão posterior do usuário: cursor nativo visível, paisagem estável sem paralaxe de ponteiro ou zoom de rolagem, preservando realce por hover/foco. A composição integrada à paisagem continua em telas largas; abaixo de 1280px, texto, paisagem e destinos têm espaço próprio no fluxo. O limite foi ampliado após a medição em 1024px revelar colisões entre indicadores e apresentação. Os atalhos não reservam margem lateral para o ÆVO em telas compactas e o rodapé oferece respiro inferior.

Validação no build de produção local, Chrome headless, DPR 1, Windows:

- 320, 390, 768, 1024 e 1440px em pt-BR e en-US: sem overflow horizontal; cursor do body `auto` e dos links `pointer`.
- Nas oito combinações abaixo de 1280px: fim da apresentação ≤ início da paisagem; fim da paisagem ≤ início dos destinos; fim dos destinos ≤ início do rodapé. Coordenadas em [usability-metrics.json](proof/usability-metrics.json).
- Capturas inspecionadas: [390px](proof/usability-390.png), [1024px](proof/usability-1024.png), [1440px](proof/usability-1440.png). Os três pavilhões permanecem visíveis.
- 38 testes passam; regressão comprova ausência de movimento em pointer/scroll com realce ainda funcional. TypeScript, build de produção e diff check passam.

A prévia local usa o build atualizado na porta 3000. Sem deploy. A emulação não substitui avaliação em aparelho físico.
