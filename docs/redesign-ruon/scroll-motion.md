# Ajuste de ritmo — movimento acompanhado pela rolagem

A revisão de Kauê substitui as entradas disparadas por temporizador por progresso de scroll. A implementação anterior podia terminar assim que a primeira borda entrava na tela, antes da área de leitura.

- Fita de Sobre, chegada a Projetos, fluxo do Atlas, filetes, marcos e luz nas medalhas acompanham a posição real do elemento no viewport.
- A passagem ocupa aproximadamente 70% da altura da tela: começa ao entrar pela borda inferior e termina perto dos 30% superiores. Parar de rolar mantém o quadro atual; rolar para cima recua o movimento.
- A sequência da Experiência usa faixas desse mesmo progresso para filete, nó e período. O Atlas usa faixas sucessivas para seus três ícones. Títulos, descrições e links continuam legíveis.
- O controle usa animações pausadas, atualizadas por um único requestAnimationFrame por escopo quando há scroll. Não há loop permanente nem captura da rolagem. Resize recalcula a posição; navegação, aba oculta e movimento reduzido restauram o repouso.
- Ações por clique continuam com resposta temporal: seleção de projeto em cerca de 420–650 ms. Formação conserva expansão nativa e contato mantém seus estados reais. Abertura e troca de idioma mantêm a coreografia aprovada.

A referência atual de validação é `evidence/motion/scroll.cjs`: verifica avanço, pausa de 1,4 s sem alteração do quadro, retorno e preferência dinâmica em 390 e 1440 px. Os relatórios e vídeos da primeira rodada continuam como histórico da versão temporizada; a evidência `scroll.json` e as novas gravações documentam este ajuste.

Validação: 69 testes em 16 arquivos, TypeScript e build de produção passaram. Os dois cenários de scroll comprovaram pausa, avanço e retorno sem erros de execução. A matriz integrada de 34 jornadas também passou; seu resultado está em `evidence/motion/scroll-regression.json`.
