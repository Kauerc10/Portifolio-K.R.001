## Problem Statement
A paisagem atual já reproduz boa parte da composição, mas luz, textura mineral, terreno, encaixes e props ainda parecem uma maquete e não alcançam a referência aprovada. O refinamento precisa chegar também ao navegador, mantendo leveza e exploração interativa.

## Solution
Refinar primeiro o pavilhão esquerdo, a curva de retorno e sua escada, usando controle local do Blender e comparação entre referência, render da câmera e navegador. Depois de validar esse trecho, aplicar o acabamento aos demais pavilhões, pontes e terreno. Preservar câmera, espaços para HTML, três destinos e violeta RUON.

## User Stories
1. Como visitante, quero reconhecer a paisagem aprovada para ter uma primeira impressão coerente.
2. Como recrutador, quero ler a apresentação sem interferência da arquitetura para entender o perfil rapidamente.
3. Como visitante, quero pedra com textura discreta para perceber material e escala.
4. Como visitante, quero bordas e encontros bem construídos para perceber qualidade arquitetônica.
5. Como visitante, quero sombras suaves e contato com o chão para entender profundidade.
6. Como visitante, quero interiores violetas com gradação de luz para perceber espaços reais.
7. Como visitante, quero terreno contínuo e estratificado para que a paisagem pareça integrada.
8. Como visitante, quero vegetação e móveis proporcionais para dar escala sem distração.
9. Como usuário de celular, quero enquadramento próprio e destinos acessíveis para explorar a mesma proposta.
10. Como usuário de teclado, quero os três destinos em HTML para navegar independentemente do canvas.
11. Como usuário com movimento reduzido, quero um poster coerente para acessar o conteúdo confortavelmente.
12. Como visitante, quero caminhos contínuos e legíveis para compreender as relações entre os pavilhões.
13. Como responsável pelo portfólio, quero comparar o Blender com o navegador para aprovar a experiência que será entregue.
14. Como responsável pelo portfólio, quero fontes editáveis e checkpoints para permitir ajustes reversíveis.
15. Como desenvolvedor, quero assets dentro dos orçamentos para preservar fluidez e carregamento.
16. Como responsável pelo portfólio, quero revisar um trecho antes da expansão para evitar retrabalho.
17. Como desenvolvedor, quero inspecionar objetos, materiais e câmera no Blender para corrigir regiões específicas.
18. Como visitante, quero que falhas de GPU preservem os links e conteúdo para continuar usando o portfólio.

## Implementation Decisions
- Complementa T01/#36; não substitui a especificação canônica nem cria outra direção visual.
- Reutilizar a cena autorada existente no checkout principal, preservando alterações ainda não commitadas.
- MCP for Blender instalado como integração local do Codex, com add-on habilitado no Blender 4.5 LTS. Validar comunicação com uma instância aberta antes de declarar controle ao vivo disponível.
- Preservar checkpoints antes de editar; preferir alterações localizadas por grupos e materiais.
- Primeira fatia: pavilhão esquerdo, retorno do caminho, escada, terreno adjacente e luz. Validar antes de expandir.
- Trabalhar luz principal ampla, preenchimento e iluminação indireta; calibrar exposição e gerenciamento de cor por comparação, sem impor AgX sem verificar a exportação.
- Material mineral com variações de cor, rugosidade e microrelevo em escala coerente; arredondar bordas onde contribuam para a silhueta e highlights.
- Refinar curvas, encontros e degraus; preservar os trechos visíveis da referência sem tratar oclusões como geometria comprovada.
- Vegetação ramificada e móveis com espessura plausível; detalhes subordinados à arquitetura.
- A cena atual usa iluminação e cor gravadas em atlas e materiais sem luz dinâmica no navegador. Verificar perdas de faixa tonal, resolução UV e aparência antes de escolher manter esse caminho ou separar mapas PBR e luz assada.
- Manter GLB/glTF e fonte Blender editável. Compartilhar materiais e limitar resolução de textura conforme uso visível.
- Ordem: inspeção e checkpoint; trecho de acabamento; comparação guiada; expansão; exportação e otimização; posters e métricas atualizados.

## Testing Decisions
- Critério confirmado pelo usuário: referência × render da câmera do Blender × navegador, junto com peso, fluidez e preservação dos três destinos.
- Usar a fronteira mais alta existente: harness visual da cena e seus destinos. Testar resultados observáveis, não coordenadas internas ou snapshots de código artístico.
- Capturar desktop na proporção aprovada e mobile com câmera própria. Comparar crops de material, interior, degraus e encaixes.
- Uma rodada de inspeção em lote, uma correção em lote e uma confirmação; diferenças materiais restantes ficam explícitas.
- Comparar Blender e navegador para detectar diferenças de cor, iluminação e filtragem. Um render offline bonito não prova fidelidade do runtime.
- Reaproveitar captura e telemetria existentes: bytes do modelo/texturas/runtime, triângulos, draw calls e intervalos de frame por 10 segundos após aquecimento, registrando GPU, DPR e viewport. Emulação não equivale a aparelho físico.
- Orçamentos canônicos: poster desktop até250KB/mobile150KB; cena standard até2MB/economy1MB; runtime incremental até220KB gzip; ponto de partida100miltriângulos/80calls; metas60fpsdesktop/30mobile. Registrar desvios sem transformar metas em resultados.
- Preservar desenvolvimento→projetos, automação→Atlas, suporte→experiência. Os testes funcionais completos de teclado/toque/ciclo de vida continuam pertencendo aos tickets existentes.
- T01 permanece aberta até evidência suficiente e revisão guiada; instalação do MCP não encerra a prova visual.

## Out of Scope
Publicar o site, trocar a direção aprovada, reconstruir as demais seções nesta rodada, comprar assets ou serviços, usar geração raster para simular conclusão 3D, alterar fatos profissionais, recriar as issues #36–#46 ou certificar desempenho de dispositivos não medidos.

## Further Notes
Autorização do usuário em28/10/2026 para instalar MCP for Blender e elaborar esta especificação. Instalação verificada: registro MCP do Codex habilitado e add-on habilitado nas preferências do Blender. Uma nova sessão do Codex pode ser necessária para carregar as ferramentas; conexão ao vivo ainda deve ser testada. Referências: https://github.com/ahujasid/mcp-for-blender e https://docs.blender.org/manual/pt/4.5/render/cycles/baking.html . A especificação canônica e a referência aprovada continuam sendo a autoridade visual.
