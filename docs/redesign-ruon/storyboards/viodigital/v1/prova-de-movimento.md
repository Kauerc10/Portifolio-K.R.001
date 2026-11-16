# VioDigital — prova local de movimento

12/11/2026. O usuário aprovou a estética do card e da página própria e autorizou seguir para a prova. Implementação local, sem commit, push ou publicação nesta rodada.

## O que está disponível

- Home: /pt-BR#project-viodigital (e /en-US#project-viodigital).
- Página dedicada: /pt-BR/projetos/viodigital (e versão /en-US).
- Prévia inserida antes do catálogo existente. A substituição completa do catálogo pelos cinco cases será feita nas próximas fatias.
- Documento, placa posterior, realce, módulos e faixas em camadas provisórias. Scroll nativo com fixação temporária; avanço, pausa e reversão sem temporizador. Celular usa percurso menor; telas baixas e movimento reduzido usam composição estável em fluxo normal.
- Links HTML entre documentos permitem compartilhar, abrir em nova aba e navegar sem JavaScript. View Transitions nativas conectam o documento compartilhado nos navegadores compatíveis; demais navegadores seguem com navegação normal. Retorno preserva posição por histórico e por link, com fallback para âncora se storage estiver indisponível.
- Introdução restrita à home para não cobrir o acesso direto aos cases.

## Limites desta prova

A arte testa geometria, continuidade e ritmo, não o acabamento mineral final. Ainda não há vídeo produzido. O vídeo poderá complementar o ambiente ou a narrativa interna, mantendo texto e ações HTML. A decisão final sobre mídia depende da revisão desta prova. Não há processamento real de QR, upload, câmera ou integração com o motor do VioWeb.

O interior do case tem a estrutura inicial dos capítulos; screenshots reais, galeria, contribuição detalhada e créditos completos entram no primeiro case final. Nenhuma interface gerada por IA foi inserida como prova de funcionamento.

## Validação

- TypeScript sem erros e 69 testes existentes passando.
- Chromium desktop 1440×1000 e celular 390×844: progresso avança, pausa por 1,2 segundo sem mudança e reverte ao subir.
- Navegação, histórico, ausência de repetição da introdução, PT/EN, teclado, movimento reduzido, JavaScript desativado, viewport baixo e tema escuro verificados pelo roteiro automatizado.
- Capturas desktop/mobile e tema escuro abertas para revisão visual. Fontes Google bloqueadas no teste; capturas usam fallback local.
- Evidência: [resultados](../../../evidence/viodigital-proof/results.json) e capturas na mesma pasta. Roteiro reproduzível: scripts/qa/viodigital-proof.cjs; requer Playwright instalado fora das dependências de produção.
- Consulta de issues por gh indisponível nesta sessão por HTTP 401. Nenhuma issue foi criada, atribuída ou encerrada.

## Próxima etapa

Avaliar visualmente a prova em movimento. Depois produzir camadas e eventual vídeo com acabamento final, preencher a narrativa e evidências do VioDigital e repetir a abordagem nos outros cases, preservando suas identidades.
