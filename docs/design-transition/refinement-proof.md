# #47 — prova de acabamento completo, 29/10/2026

**Refinamento completo (`--stage focus` e `--stage full --bake`) concluído para revisão; #47 e T01/#36 permanecem abertas no GitHub até validação humana.**
Não houve publicação nem integração na página do portfólio. A aprovação da
referência não equivale à aprovação automática de produção.

## Escopo e acabamento aplicado

Base `440f2e3`, evoluindo a autoria em `design/scene-proof/blender/build_scene.py` e o pipeline reproduzível em `design/scene-proof/blender/refine_scene.py` nos dois estágios previstos na especificação (`--stage focus` e `--stage full --bake`):

- **Geometria 2-manifold sem auto-oclusão nas escadas (`build_stairs_px`)**: cada espelho vertical sobe estritamente de `h_i` a `h_{i+1}`, eliminando faces enterradas que geravam faixas escuras no bake de `stairs-w01-entry`, `stairs-dev`, `stairs-front`, `stairs-left`, `stairs-centre-right`, `stairs-support` e `stairs-tunnel`.
- **Pavilhões `W01` (`dest-development`), `W02` (`dest-automation`) e `W03` (`dest-support`)**:
  - `W01`: spandrel superior de profundidade contínua, pilar direito dividido na imposta (`y = 558`) e câmara interna em três planos (`x = 172..200..236..278`) estritamente abaixo de `y_arch_w01(x)`, com iluminação focal `portal-w01` posicionada à frente da parede interna (`wall_pt + 0.34 * depth_vec`).
  - `W02`: câmara interna violeta recuada atrás do portal (`x = 716..797`, quina em `x = 754` separando `INNER` e `INNER_GLOW`) e mobiliário escultural interno (poltrona lounge com braços/encosto/pés e mesa lateral em `props`).
  - `W03`: parede interna violeta estritamente acima do piso do mezanino (`y = 560..574`) sem inversão na abóbada, acompanhada de bancada arquitetônica, monitor com base e cadeira em `props`.
- **Fitas e encontros (`sweep_ribbon_px` e `viaduct-arches`)**: regularização de curvatura (`untangle_rail_2d`) nos limites internos/externos com interpolação convexa monotônica das cristas dos guarda-corpos (`rail_2` e `rail_7`), início de `path-bridge` na borda externa de `path-development` (`(502, 661, 2.29)`) e coroamento de `viaduct-arches` (`h_ref = 2.38`) alinhado sob o parapeito da ponte. O trecho oculto sob os arcos não é tratado como geometria observada.
- **Pedra calcária, bordas e relevo (`mineral_finish`, `replace_foliage`, `mountains`, `terrain`)**: variação mineral discreta de cor e rugosidade (`0.82–0.97`), chanfros suaves via `ShaderNodeBevel` (`samples=4, radius=0.016`) + `shade_smooth_by_angle`, vegetação ramificada com troncos/galhos e copas estratificadas (`foliage`), subdivisão com relevo interno nas montanhas (`mountains`) e estratificação contínua do terreno (`terrain`).
- **Fidelidade Blender × GLB assado (`make_uvs` e `bake_and_export`)**: congelamento de triangulação antes do empacotamento UV, projeção isométrica no plano tangente para faces dobradas (`overlappingPixels: 0` em `validate_uvs.py`) e dilatação morfológica de 14 passos para bordas UV (`lum < 0.22`).

A fonte editável é `design/scene-proof/blender/out/refined-landscape.blend`.

## Comparação que orienta a revisão

- [Referência × Blender × navegador, trecho W01](proof/refinement-47/comparison-focus.png)
- [Pedra/interior](proof/refinement-47/comparison-material.png),
  [escadas](proof/refinement-47/comparison-stairs.png) e
  [encontro](proof/refinement-47/comparison-junction.png)
- [Desktop WebGL](proof/refinement-47/scene-desktop.png) e
  [mobile com câmera própria](proof/refinement-47/scene-mobile.png)
- [Render da câmera Blender (`focus`)](../../design/scene-proof/blender/out/refinement-focus.png) e
  [Render da câmera Blender (`full`)](../../design/scene-proof/blender/out/refinement-full.png)
- [Registro histórico do primeiro bake antes das correções](proof/refinement-47/first-bake-desktop.png)

## Medições e limites

Dados completos: [metrics.json](proof/refinement-47/metrics.json),
[manifest.json](proof/refinement-47/manifest.json),
[refinement-focus.json](../../design/scene-proof/blender/out/refinement-focus.json),
[refinement-full.json](../../design/scene-proof/blender/out/refinement-full.json) e
[bake-report.json](../../design/scene-proof/blender/out/bake-report.json).

| Métrica | Valor medido | Orçamento (#47 / especificação) |
| --- | --- | --- |
| `landscape.glb` (standard) | `1.626.164` bytes (`1,55 MB`) | `<= 2,0 MB` |
| Texturas WebP embutidas | `91.566` B + `341.162` B (`2048²` + `2048²`) | `<= 2048×2048` |
| `poster-desktop.webp` | `47.896` bytes (`46,8 KB`) | `<= 250 KB` |
| `poster-mobile.webp` | `10.134` bytes (`9,9 KB`) | `<= 150 KB` |
| Bundle runtime gzip | `168.888` bytes (`164,9 KB`) | `<= 220 KB` |
| Triângulos renderizados | `48.168` | `<= 100.000` |
| Draw calls | `23` | `<= 80` |
| Sobreposição UV (`validate_uvs.py`) | `0` pixels (`1024×1024`) | `0` |
| Frame time desktop (mediana / p95) | `16,9 ms` / `33,6 ms` | Sem erros de console |
| Frame time mobile (mediana / p95) | `16,7 ms` / `16,8 ms` | Sem erros de console |

Chrome 156, Windows/ANGLE D3D11, Intel UHD Graphics 630; desktop 1433×1098
DPR 1,5, mobile 390×340 DPR 1. Mobile é emulação na mesma GPU, não aparelho físico.
Os três grupos `dest-development`, `dest-automation` e `dest-support` carregam
e suas âncoras são projetadas no desktop/mobile preservando os destinos canônicos
(`#projetos`, `#project-atlas`, `#experiencia`).

## Reprodução e validação

```powershell
blender -b --python design/scene-proof/blender/refine_scene.py -- --stage focus --samples 48
blender -b --python design/scene-proof/blender/refine_scene.py -- --stage full --bake --samples 48 --bake-samples 48
blender -b design/scene-proof/blender/out/refined-landscape.blend --python design/scene-proof/blender/validate_uvs.py
npx vite build design/scene-proof --outDir .scene-proof-dist --emptyOutDir
npx vite preview design/scene-proof --host 127.0.0.1 --port 4173
node design/scene-proof/capture.cjs --output docs/design-transition/proof/refinement-47
python design/scene-proof/blender/compare_refinement.py
```
