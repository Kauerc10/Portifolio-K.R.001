# Correção de espaço editorial · 11/11/2026

Base: `bd12543` (`codex/redesign-ruon`). Escopo: largura útil, proporção dos títulos e reflow das seções existentes.

- A grade compartilhada passa de 1440 para 1920 px, com margens fluidas de 20–96 px. Em 1920 px a largura útil passa de 1280 para 1728 px. Cabeçalho e apresentação do hero acompanham o alinhamento.
- Títulos laterais respondem à largura da coluna, com teto de 96 px, sem cortes ou divisão artificial de palavras. Formação preserva o título lateral com acento na linha seguinte.
- Experiência ganha proporção próxima à referência 06. Formação e Conquistas preservam trilha e destaques das referências 11 e 08. Sobre mantém a frase à esquerda e apresentação à direita, conforme 04. Competências mantém os grupos da referência 07.
- Abaixo de 900 px, títulos e conteúdo das trilhas empilham. As linhas internas de Competências refluem antes de comprimir texto e tecnologias.
- Conteúdo, abertura, arte dos portais, links e ações permanecem os existentes. Texturas e ilustrações atuais continuam diferenças em relação aos PNGs; esta correção trata a composição espacial.

Validação: navegador Chromium na página localizada, PT-BR e EN-US, larguras 1920, 1440, 768 e 390 px. Capturas de Sobre, Experiência, Formação, Conquistas, Projetos e Contato; inspeção visual com as referências aprovadas. Nenhuma rolagem horizontal; títulos dentro de suas colunas; nenhuma interseção entre colunas adjacentes. O inglês “Achievements” permanece inteiro. Contato preserva canais antes do formulário em celular.

`npm run build` aprovado; `npm test`: 11 arquivos, 49 testes aprovados. Detector Impeccable de layout sem achados; `git diff --check` limpo. Evidências locais (não versionadas) em `qa-editorial/`, incluindo `results.json` e capturas dos dois idiomas.
