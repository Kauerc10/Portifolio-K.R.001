# C02 — comparação com a versão aprovada

Baseline: VioDigital aprovado em 5b25760. Capturas desktop 1440×1000 e celular 390×844 da prévia, hero e galeria, registradas antes da refatoração.

Roteiro: scripts/qa/case-foundation.cjs, com CASE_PHASE=before/after. Evidências locais em evidence/c02-foundation.

## Observação prévia

A primeira versão do roteiro aparentou detectar diferenças de retorno, mas media a posição antes de locator.click. A automação podia fazer autoscroll entre essa medição e o clique, especialmente durante a transição compartilhada. O roteiro foi corrigido para registrar scrollY no próprio evento de ativação, independentemente do armazenamento interno do aplicativo.

Com essa medição correta, o build do C02 restaurou exatamente a posição de ativação em desktop e celular. Os resultados antigos representam falso positivo do teste, não evidência de bug do aplicativo. Não foi introduzido um temporizador para contornar esse falso positivo.

Os cenários antes da mudança confirmaram retorno explícito, galeria com foco, conteúdo inglês, abertura em nova aba, storage bloqueado, ausência de JavaScript, movimento reduzido e persistência do tema escuro.

A comparação após a integração deverá preservar a composição e estabilizar a navegação, sem mudar a narrativa aprovada ou acrescentar páginas vazias.
