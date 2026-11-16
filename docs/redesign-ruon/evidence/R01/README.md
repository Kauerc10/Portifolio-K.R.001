# R01 — abertura e encaixe (#64)

11/11/2026, Chromium headless156, build de produção local `localhost:3064`,1440×1000 e390×844. Os vídeos desktop/mobile e filmstrips acompanham primeira pintura, ordem das linhas, apoio, botão por último e encaixe; capturas ready/docking/complete permitem inspeção dos marcos. Sem aprovação estética implícita.

Contrato testado: página pública/hero completo (fluxo-refinamento.md). TDD: o teste de Continuar inicialmente desabilitado falhou no comportamento anterior, depois passou;10 testes da jornada verdes. Build de produção e TypeScript passaram após integrar R02.

`results.json` registra sequência, espera sem avanço automático, conclusão e foco, sessão recorrente, hash direto, movimento reduzido, JS ausente, storage indisponível, resize durante encaixe, preferência dinâmica, Escape e falha de hidratação. `scripts/qa/intro-r01.cjs` reproduz a matriz no servidor local. Fonte externa bloqueada na prova final para incluir fallback estável; captura anterior com rede disponível também passou. Vídeos são gravados desde a navegação, com strip via CDP; imagens do hero permanecem as existentes.

Bootstrap inline precede corpo e ativa cobertura apenas quando elegível. Watchdog de4s libera cobertura e impede reabertura tardia se hidratação falhar ou ficar lenta. Em dev frio/gravação pesada houve bypass por esse caminho; em produção a sequência foi validada. Sem JavaScript a cobertura não é ativada. Branco da sequência dura180ms após montagem, sem esperar imagem/fonte. Saída por Escape, hash, resize durante encaixe e preferência reduzida mantém conteúdo e foco utilizáveis.

Encaixe usa caixas reais e950ms; fontes/cores do destino são medidas. Apoio tem textos diferentes entre abertura e hero: troca por sobreposição de opacidade durante deslocamento evita substituição abrupta ao fim. Não há reprodução automática ou loop. Sessão só é armazenada ao finalizar ou sair explicitamente.

Limites: Chromium desktop com viewport mobile, sem hardware tátil real; não há baseline em vídeo do código anterior nem afirmação de revisão estética humana. Produção pública não foi publicada, issues anteriores permanecem abertas.
