# #47 — checkpoint de acabamento, 29/10/2026

**Primeira fatia exportada para revisão; #47 e T01/#36 continuam abertas.**
Não houve publicação nem integração na página do portfólio. A aprovação da
referência não equivale à aprovação deste resultado.

## Escopo e fonte

Base `440f2e3`, preservando autoria em `build_scene.py` e a fonte Blender anterior.
`refine_scene.py --stage focus` acrescenta pedra com variação de rugosidade e
microrelevo, bordas pequenas em W01/escadas/terraços, luz principal ampla,
preenchimento e gradação de emissão violeta. O retorno foi ajustado e o
guarda-corpo da ponte começa após o encontro para não atravessar a faixa.
As luzes e materiais violetas compartilhados também afetam o contexto inteiro.

A fonte editável é `design/scene-proof/blender/out/refined-landscape.blend`.
Salva câmera 1433×1098 e materiais procedurais **antes** de substituí-los pelos
atlas da exportação. O código `--stage full` permanece uma proposta não executada:
vegetação, outros pavilhões e terreno completo ainda não passaram pela revisão.

MCP ao vivo verificado nesta rodada: Blender 4.5.15 LTS, add-on 1.8/protocolo 15,
27 objetos (23 malhas, três luzes e câmera), telemetria desativada. A instância
estava fechada na retomada; foi reaberta com o add-on já instalado. Não houve
compra, geração ou importação de asset externo. A inspeção e o ajuste da câmera
foram feitos via MCP; render/bake reproduzíveis usam o executável local.

## Comparação que orienta a revisão

- [Referência × Blender × navegador, trecho W01](proof/refinement-47/comparison-focus.png)
- [Pedra/interior](proof/refinement-47/comparison-material.png),
  [escadas](proof/refinement-47/comparison-stairs.png) e
  [encontro](proof/refinement-47/comparison-junction.png)
- [Desktop WebGL](proof/refinement-47/scene-desktop.png) e
  [mobile com câmera própria](proof/refinement-47/scene-mobile.png)
- [Render da câmera Blender](../../design/scene-proof/blender/out/refinement-focus.png)

A primeira exportação evidenciou uma mancha retangular na abertura de W01 e
linhas nas bordas UV que não apareciam no render. Foi conservada em
[first-bake-desktop.png](proof/refinement-47/first-bake-desktop.png).
A correção congela a triangulação antes de UV/bake/exportação e amplia a
extrusão de borda do bake de 3 para 8 pixels. O atlas mantém cor e luz assadas,
sem ganho extra ou gradação posterior, evitando uma segunda direção de luz.

O terreno ainda é simples, montanhas facetadas, vegetação arredondada e props
esquemáticos. O arco de W01, suas escadas e o retorno não reproduzem exatamente
a referência. A pedra e o contato têm mais informação, mas não comprovam
acabamento final. Não tratar o trecho oculto das pontes como geometria observada.
O ruído residual de Cycles foi preservado: OIDN ultrapassou a memória disponível
na tentativa anterior; não foi reativado nesta rodada.

## Medições e limites

Dados completos: [metrics.json](proof/refinement-47/metrics.json),
[manifest.json](proof/refinement-47/manifest.json) e
[bake-report.json](../../design/scene-proof/blender/out/bake-report.json).
Chrome 156, Windows/ANGLE D3D11, Intel UHD Graphics 630; desktop 1433×1098
DPR 1,5, mobile 390×340 DPR 1. Mobile é emulação na mesma GPU, não aparelho físico.
Cada coleta mede cerca de dez segundos depois de 1,5 s de aquecimento.
Intervalos RAF incluem agendamento; tempo de submissão CPU não é tempo GPU.

O modelo usa dois atlas (2048² estruturas, 1024² terreno), iluminação assada
com 32 samples, 61.571 triângulos e 23 draw calls. Nenhum shader ou luz dinâmica
extra foi adicionado. O runtime medido é o bundle isolado completo; não é um
incremento medido no Next de produção. A variante economy de até 1 MB ainda
não existe. Posters ficam em documentação, sem UI, e não são assets finais T02.

Os três grupos `dest-development`, `dest-automation` e `dest-support` carregam
e suas âncoras são projetadas no desktop/mobile. Destinos canônicos preservados:
desenvolvimento → projetos, automação → Atlas, suporte → experiência. O harness
é somente a prova visual; clique/foco/teclado/toque e fallback com HTML continuam
nos tickets de integração. Não afirmar que foram testados nesta fatia.

## Reprodução e validação

```powershell
blender -b --python design/scene-proof/blender/refine_scene.py -- --stage focus --samples 48 --bake --bake-samples 32 --struct-size 2048 --terrain-size 1024
npx vite build design/scene-proof --outDir ../../.scene-proof-dist
npx vite preview design/scene-proof --outDir ../../.scene-proof-dist --host 127.0.0.1 --port 4173
node design/scene-proof/capture.cjs --output docs/design-transition/proof/refinement-47
python design/scene-proof/blender/compare_refinement.py
```

`PLAYWRIGHT_MODULE` pode apontar para o runtime local do Codex; Python precisa
de Pillow. `npx tsc --noEmit` e build Vite passaram. Não foram criados testes
artificiais de coordenadas: a fronteira acordada é a comparação visual e a
telemetria do harness. A suíte da aplicação não foi repetida, pois seus fontes
não mudaram. O aviso de chunk JS acima de 500 KB permanece, distinto do peso gzip.

Próximo gate: revisão guiada do trecho e das perdas de exportação antes de
expandir acabamento. #47 não está integralmente implementada, e não desbloqueia
por si só os posters de produção ou a conclusão de T01.
