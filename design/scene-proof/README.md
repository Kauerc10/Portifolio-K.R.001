# Prova T01 (não integrada à aplicação)

Execute `npm ci`, `npx vite build design/scene-proof --outDir ../../.scene-proof-dist`,
depois `npx vite preview design/scene-proof --outDir ../../.scene-proof-dist --host 127.0.0.1 --port 4173`.
O Vite é a dependência já resolvida pelo Vitest. Nenhuma rota Next ou CDN é adicionada.

Desktop: viewport 1433×1098. Mobile: 390×340, `?camera=mobile`.
O canvas mostra somente arte; não contém textos do portfólio.

O objeto `window.sceneProof` é telemetria deste experimento, não uma API de produto.
`measure(10000)` mede intervalos RAF e duração CPU de submissão de renderização após
aquecimento; não confundir com tempo GPU nem desempenho de aparelho físico.

Prova visual deliberadamente sem testes de coordenadas artísticas, conforme P0.
Contratos funcionais do renderer/React pertencem às próximas fatias aprovadas.
Ver decisões e resultados em `docs/design-transition/scene-proof.md`.

O acabamento localizado de #47 usa `blender/refine_scene.py`; instruções,
comparações Blender/navegador e limites estão em
`docs/design-transition/refinement-proof.md`. O arquivo GLB padrão contém esse
checkpoint. `capture.cjs --output docs/design-transition/proof/refinement-47`
preserva as capturas anteriores em vez de sobrescrevê-las.
