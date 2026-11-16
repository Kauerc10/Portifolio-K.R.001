# Refinamento editorial dos cases — 15/11/2026

Revisão posterior à entrega #75–#85, a pedido do usuário.

- CKF: molduras acompanham a altura intrínseca dos prints, incluindo na vitrine. A captura do painel mantém seu fundo original; não foi recortada nem redesenhada.
- Cinco cases: retirada do índice numerado abaixo do hero e dos números decorativos das decisões.
- Contexto de VioDigital, VECOM, Atlas e DocFácil: título em coluna própria, texto com largura de leitura limitada; títulos editoriais menores.
- DocFácil: removidas a introdução redundante da jornada e a segunda lista de etapas; preservados o título, a explicação e as etapas da animação.
- Encerramento compartilhado: resultado existente, próximo case seguindo a ordem da home e rodapé com marca, retorno, contato e topo. O código aberto do Vio continua acessível.

## Verificação local

- TypeScript sem erros; 76 testes em 20 arquivos passaram.
- Build de produção em diretório isolado passou, com 23 páginas estáticas.
- Galerias, mídia completa e retorno de foco: 15 combinações de projeto/largura passaram (1920, 1440 e 390 px).
- `checks.json`: 20 combinações de projeto/idioma/largura passaram; verifica ausência de índice, H1 único, rodapé, destinos e overflow. Na CKF, a proporção exibida acompanha a imagem natural; no DocFácil não há lista de etapas duplicada.
- Inspeção visual da home CKF, contexto DocFácil e encerramentos desktop/mobile. Os screenshots completos adicionais são arquivos locais de consulta.

Esta evidência local não equivale a homologação pelo usuário no preview nem autoriza merge em produção.
