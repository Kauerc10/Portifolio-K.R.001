# C04 — VECOM Ficha Fácil

Ticket #79 da spec #75. Referência visual: [prancha aprovada v3](v3/imagens/vecom.png); narrativa em [roteiro VECOM](roteiros/02-vecom.md).

## Escopo da fatia

Prévia na home, página dedicada e retorno à posição anterior. A composição mantém pasta azul translúcida, notebook, celular e detalhe laranja. O case identifica o desenvolvimento sob demanda para a VECOM e diferencia o cadastro público da fila interna.

## Mídia e movimento

A composição é formada por camadas nativas em 2.5D, controladas pela rolagem. Essa abordagem permite avançar, pausar e reverter sem sincronizar a busca de quadros de um vídeo. Não foi produzido nem comparado um vídeo final nesta fatia; vídeo permanece uma opção futura caso acrescente algo à demonstração.

As telas devem ser capturas da interface do produto renderizada com registros sintéticos. A prancha gerada orienta o enquadramento e não serve como evidência funcional. A procedência das capturas acompanha os assets. Nenhuma função do produto original é executada pelo visitante do portfólio.

## Validação e aceite

Implementação integrada na branch `codex/project-cases-75`, PR rascunho #86. A fatia permanece aberta até a revisão de Kauê. Sem deploy ou merge em produção.

- 74 testes em 18 arquivos, TypeScript e build de produção passaram.
- Jornada no navegador em desktop 1440×1000 e celular 390×844: prévia → case → retorno por link e histórico; nova aba e foco da galeria por teclado.
- Progresso e transformação visível da pasta avançam com o scroll, param sem rolar e revertem. O percurso no celular é mais curto; tela baixa e movimento reduzido usam composição estática sem fixação.
- PT/EN, metadados próprios, claro/escuro, storage bloqueado, JavaScript desativado e imagens com falha foram verificados. O retorno de um case não consome a posição salva do outro.
- A primeira execução ampla dos testes incluiu o diretório temporário da captura, gerando falhas de React do produto externo. O diretório foi excluído da descoberta de testes e da compilação do portfólio; a suíte correta foi então executada e passou.
- Comparação visual do Vio antes/depois: zero pixels alterados nas seis capturas de home, hero e galeria, descontando o badge de desenvolvimento. A jornada de retorno do Vio também passou.
- Prova final executada também no build de produção local isolado, sem badge de desenvolvimento. As URLs abaixo continuam servidas pela prévia local na porta 3064.

[Resultados C04](../evidence/c04-vecom/results.json), [comparação Vio](../evidence/c04-vecom/vio-visual-comparison.json), capturas e gravações desktop/celular estão no mesmo diretório. [Procedência das telas e marca](vecom-media-provenance.md).

Limites: as telas são imagens estáticas preparadas do frontend, com registros fictícios; o portfólio não executa o cadastro ou a fila. O link externo abre o acesso da VECOM, sem alegar validação de autenticação, integrações ou prontidão de produção do produto. O acabamento e o ritmo desta fatia aguardam o teste de Kauê antes de avançar ao Atlas.

URLs locais previstas:

- http://localhost:3064/pt-BR#project-vecom
- http://localhost:3064/pt-BR/projetos/vecom

## Refinamento solicitado — entrada e passagem da ficha

Em 13/11/2026, Kauê pediu uma entrada mais trabalhada e uma cena mostrando a ficha sair do celular e chegar ao computador da equipe. Esta revisão mantém a composição e a natureza sob demanda.

- A transição nativa compartilha agora a composição inteira (`vecom-scene`) durante 1,35 s, com deslocamento entre os enquadramentos, revelação suave e ordem de profundidade preservada. Pasta e celular deixam de gerar snapshots separados que cobriam o notebook. Navegação e histórico continuam nativos; sem espera ou tela de carregamento obrigatória.
- O capítulo Jornada recebeu uma cena 2.5D: cliente preenche → ficha percorre um arco → chega à fila da equipe e se acomoda no computador. Cartão e etapas seguem o scroll; pausa e reversão são possíveis em qualquer ponto. A ficha é ilustrativa, com dados fictícios, sem envio real.
- A fixação é temporária, com percurso menor no celular. Movimento reduzido, tela baixa e ausência de JavaScript mostram o estado final legível.
- Os dois idiomas e os fallbacks usam as capturas oficiais já preparadas. Nenhum novo serviço ou integração foi acionado.

Provas adicionais: `evidence/c04-vecom-refinement/`, com três estados em desktop/celular, captura da entrada, gravações e resultados. A jornada padrão prévia → case → retorno, galeria por teclado, nova aba, mídia indisponível e temas foi revalidada. Os 74 testes, TypeScript e build passaram. A validação de build precisou liberar caches temporários, incluir o CSS compartilhado no checkout reduzido e baixar as fontes; o cache webpack foi desativado somente no checkout isolado para poupar disco, sem alterar a configuração da aplicação entregue.

Teste: entrar pela home e, no case, usar o atalho Jornada ou continuar rolando. Aguardar nova revisão de Kauê antes de encerrar #79 ou seguir ao Atlas.
