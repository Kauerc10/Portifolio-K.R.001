# C02 — base reutilizável pronta para teste

Entregue na PR #86, com merge a5cc9e0 e ajuste de foco 35873e8. C01 foi aprovado e encerrado; manter C02 #77 aberto até o teste de Kauê. Nenhum outro case foi iniciado.

## O que mudou

- Modelo de case com identidade e entregas localizadas, capaz de representar uma ou mais entregas.
- Cabeçalho e galeria reutilizáveis; Vio passa a usá-los preservando aparência e conteúdo.
- Retorno isolado por case e idioma, com validação estrutural, posição finita, prazo de validade e caminho correto. Storage indisponível mantém navegação nativa.
- Cliques modificados continuam abrindo nova aba normalmente; galeria fecha devolvendo foco ao controle.
- Foco de retorno vai ao título sem deslocar a página; entrada direta por hash não ganha um contorno no card inteiro.

## Verificação

- TypeScript sem erros; 72 testes em 17 arquivos passando.
- Build Next.js validado no worktree isolado, sem sobrescrever a saída do servidor local.
- Navegador desktop 1440×1000/celular 390×844: home → case → galeria → retorno explícito → nova entrada → histórico; inglês, nova aba, storage bloqueado, ausência de JavaScript, movimento reduzido e tema escuro.
- Comparação das seis capturas de home/hero/galeria: zero pixels alterados, excluindo a área do badge de desenvolvimento. Imagens e relatórios em evidence/c02-foundation.
- Revisão por agente separado. Copy, CSS e VioStory aprovados preservados. Nenhuma página vazia criada para futuros cases.
- O primeiro diagnóstico de diferença no histórico foi um falso positivo de medição antes do clique: o roteiro correto registra a posição no evento de ativação. Não foi necessário introduzir espera temporal no aplicativo.

## Testar agora

1. Abrir http://localhost:3064/pt-BR#project-viodigital e entrar no case.
2. Ampliar uma imagem; fechar pelo botão e pela tecla Escape.
3. Voltar pelo link e repetir usando o histórico do navegador.
4. Experimentar no celular, em inglês e em tema escuro.

A aparência deve continuar como aprovada. Esta entrega prepara os próximos cases; não escolhe vídeo/2.5D, não modifica a narrativa e não conclui automaticamente o acabamento C03. Aguardar o retorno de Kauê antes de avançar.
