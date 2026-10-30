# Codex + Blender: reconstrução guiada pela referência

Pesquisa em 30/10/2026. Escopo: método e ferramentas; nenhuma instalação, modelagem ou alteração da aplicação. Alvo único: [model-reference.png](assets/ribbon-portals/model-reference.png), conforme [direção atual](assets/ribbon-portals/README.md). Esta direção de fita/portais supera o primeiro plano 2.5D anterior.

## Decisão recomendada

O controle disponível já permite autoria completa via Python e inspeção visual. Trocar MCP, instalar uma skill ou aumentar samples não resolve, por si, câmera aproximada, proporções e material inadequados. Recomendo manter Blender 4.5.15 + integração atual para uma reconstrução parametrizada, com comparação projetada antes de material e exportação. É uma conclusão operacional desta pesquisa, não garantia de resultado.

A [última prova](../../design/portal-artproof/README.md) reconhece pedra manchada, chão/projeção diferentes e gradação violeta insuficiente. A [comparação](../../design/portal-artproof/comparison-notes.md) confirma câmera aproximada e material de rocha recolorida. Portanto, corrigir composição/geometria e identidade da superfície antecede expansão da prova. O [checkpoint de runtime](proof/ribbon-runtime/README.md) registra rejeição visual; testes funcionais não representam aprovação estética.

## Integrações: diferenças que realmente importam

| Opção | Evidência e consequência |
|---|---|
| Comunitária, atualmente exposta como `mcp__blender` | Inventário desta sessão oferece `get_addon_status`, `get_scene_info`, `execute_blender_code` e `look`. Python tem acesso a `bpy`, `bmesh`, `mathutils`; `look` permite câmera, ângulos e render. O projeto upstream separa processo MCP de add-on/socket e agora distribui `mcp-for-blender` (o nome antigo continua compatível). Nada exige contratar geração de modelos. [Upstream](https://github.com/ahujasid/blender-mcp) |
| Blender Lab oficial | Requer **Blender 5.1+**, add-on, cliente e processo MCP separado. Assim, não é substituição direta na instalação 4.5.15. A proposta oficial é interface para Python/documentação, não reconstrução automática. Migrar exigiria instância separada e revalidar scripts/arquivos. [Blender Lab](https://www.blender.org/lab/mcp-server/) |
| Ambos | A skill RobLe3 documenta APIs/resultados diferentes e escolha fixa por tarefa; seu teste 5.1.1 cobre execução, inspeção, imagem, documentação e render nos dois backends. Isso comprova possibilidades do fluxo, não equivalência estética nem compatibilidade local 4.5.15. [Teste primário do autor](https://github.com/RobLe3/cc-blender-skill/blob/main/docs/test-results/v1.4.0-integration.md) |

O código oficial em projects.blender.org foi bloqueado para este navegador; não tratei o mapeamento comunitário como auditoria do código oficial. Não há evidência nesta pesquisa de que mudar para o oficial aumente a fidelidade deste cenário. A arquitetura prática é **Codex → código parametrizado → MCP → Blender → render → análise → correção dos parâmetros**. MCP transporta ações; o agente continua responsável pelas decisões.

## Skills examinadas: utilidade e limites

**RobLe3/cc-blender-skill:** biblioteca de instruções, não novo motor de reconstrução. O README declara separação entre correção funcional e qualidade de design, compatibilidade 4.x não testada e validação externa limitada. Aproveitar seletivamente registro da referência, máscaras, ajuste de marcos, UV e calibração de aparência; não adotar receitas inteiras como autoridade visual. [README e arquitetura](https://github.com/RobLe3/cc-blender-skill/blob/main/README.md).

O módulo `landmark-fit-repair` efetivamente exige JSON de pontos nomeados, deltas por vista e reparo no script/manifesto antes da exportação. É orientação aplicável aos cantos dos portais e bordas da fita; o módulo não descobre a geometria correta sozinho. [Código da skill](https://github.com/RobLe3/cc-blender-skill/blob/main/plugin/skills/landmark-fit-repair/SKILL.md).

**CheshireJCat/create-3d-model-skill:** adapta a pilha para Codex, com inspeção prévia, checkpoints e preservação da cena. A validação publicada é uma luminária low-poly em macOS/Blender 5.2.0; declara explicitamente que o contrato GLB + fonte e todos os formatos não estão comprovados. Aproveitar a disciplina de checkpoints; não interpretar o exemplo como prova de reconstrução fotográfica arquitetônica. [Registro de validação](https://github.com/CheshireJCat/create-3d-model-skill/blob/main/docs/validation.md). Nenhuma das duas foi instalada.

## Pipeline concreto proposto

### 1. Câmera, silhueta e conexão

Primeiro registrar imagem/crop 1672×941, máscaras separadas de pedra/violeta e marcos: cantos externos, impostas e ápices dos três arcos, entradas da fita, extremos das bases, encontro em Y e bordas do primeiro plano. Marcar explicitamente regiões ocultas como desconhecidas. Medir em pixels; não inventar dimensões recuperadas.

Testar câmera perspectiva antes de assumir ortográfica. fSpy estima câmera por linhas que representam paralelas e eixos perpendiculares; linhas quase paralelas degradam a estimativa. Sua importação leva parâmetros ao Blender, mas não modela objetos. Nesta imagem gerada, convergências podem ser inconsistentes: usar fSpy como hipótese inicial, comparar todos os portais e refinar câmera/posições conjuntamente. [Fundamentos](https://fspy.io/basics/), [importação](https://fspy.io/).

**Proposta de modelagem:** poucos parâmetros explícitos para largura/altura/profundidade do monólito, vão, raio, espessura, base e chanfro. Para fita, Bézier com perfil retangular achatado e bordas minerais, não tubo circular. Curve to Mesh extruda um perfil ao longo de cada spline; fechamento das pontas não resolve uma bifurcação Y entre splines. Construir o encontro como patch único com bordas compartilhadas e transições tangentes, depois inspecionar normais, interseções e faces coplanares. [Definição oficial do nó](https://docs.blender.org/manual/id/4.4/modeling/geometry_nodes/curve/operations/curve_to_mesh.html). A escolha do patch é recomendação de engenharia, não função automática do nó.

Gate geométrico proposto, ainda não medido: render clay da câmera completa e recortes; erro mediano dos marcos ≤1% da largura, máximo ≤2%; IoU das máscaras arquitetônicas ≥0,95; continuidade do Y sem costuras/interseções na câmera e em vista superior. Conservar espessura visualmente legível. Esses limites são iniciais; aprovação humana da imagem permanece necessária. Não avançar com média boa que esconda um portal errado.

### 2. Pedra, violeta e iluminação

Fixar câmera. Fazer uma prancha controlada de materiais/iluminação no **mesmo recorte e exposição**: calcário claro de baixa variação, normal com escala física pequena, rugosidade consistente; violeta com pigmento e gradiente de iluminação, brilho localizado. Comparar entrada, intradorso, topo e sombra de contato separadamente. Não recolorir rocha muito contrastada e esperar equivalência.

Registrar engine, luzes, world, exposição e view transform. AgX desatura altas exposições; Standard e Khronos PBR Neutral têm comportamentos distintos. Portanto, saturação aparente não é somente base color: escolher e congelar a transformação antes de calibrar a luz. [Manual de cor 4.5](https://docs.blender.org/manual/en/4.5/render/color_management.html).

Gate proposto: referência/render com overlay e amostras medianas de cor em regiões equivalentes, sem bordas; comparar textura, sombras e clipping. Não usar SSIM global como aprovação: céu/terreno podem dominar a pontuação e esconder arquitetura errada. Aprovar a cena completa, não apenas o portal aproximado.

### 3. GLB e navegador

Escolher cedo entre PBR com luz runtime ou iluminação estática assada. glTF reconhece arranjos específicos de materiais, não exporta arbitrariamente todo shader Blender; normal tangente, roughness e metallic exigem conexões/canais adequados. [Manual glTF](https://docs.blender.org/manual/en/4.2/addons/import_export/scene_gltf2.html).

No bake, congelar triangulação antes do UV, evitar sobreposição em iluminação única e reservar padding compatível com mipmaps. Bake requer UV e destino ativo; margem existe para prevenir costuras de filtragem. Não assar luz no albedo e iluminá-la novamente sem intenção. [Bake Cycles](https://docs.blender.org/manual/nl/4.2/render/cycles/baking.html). Reutilizar a correção comprovada de UV da [prova anterior](refinement-proof.md), sem pressupor que o novo asset já passou.

Gate runtime: mesma projeção/crop e comparação referência → Blender → browser, depois desktop/mobile, poster, pausa, movimento reduzido e links HTML. Medir metas existentes: <100 mil triângulos, <80 draw calls, <2 MB. Um PNG offline aprovado não valida exportação, resposta ao hover ou dispositivo real.

## Execução pelo Codex

Antes de mutar: consultar versão/cena via MCP, preservar fonte e coleção própria. Salvar parâmetros em manifesto e fazer alterações pequenas, reproduzíveis e identificáveis; após timeout inspecionar antes de repetir. Em cada gate guardar render, overlay, métricas, script e `.blend` versionado. Corrigir a dimensão diagnosticada (câmera, perfil, albedo ou luz), evitando mudar tudo junto. Só gerar GLB após geometria e aparência aprovadas.

Uma vista não determina profundidades ocultas, escala absoluta ou topologia única. A entrega realista é uma reconstrução autorada fiel à projeção aprovada, com hipóteses documentadas e tolerâncias verificáveis; equivalência exata de geometria e aparência não pode ser prometida a partir desta imagem.
