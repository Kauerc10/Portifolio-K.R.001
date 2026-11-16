# Portal artproof — isolated review artifact

Single arch plus short curved inset ribbon. This is an art/material/camera proof, with no website integration or publication.

## Reproduce
Blender 4.5.15 LTS. Run `blender --background --python build.py`, then `blender --background portal-artproof.blend --python render.py`. Build saves a packed source file; render writes `portal-proof.png`.

Cycles CPU, 8 threads, 96 samples, 1200 × 900, 8 total bounces / 4 diffuse, Standard, exposure -0.25, no denoising. This avoids the previous OpenImageDenoise memory failure. Large warm area key, cool fill (450 W), restrained violet local light; all architecture and ground are rendered together, with real GI and contact shadows. Camera is perspective (49 mm), positioned to reveal the left side and intrados of the first reference portal.

## Material source and limits
Poly Haven Rock Boulder Dry: https://polyhaven.com/a/rock_boulder_dry . Official metadata API: https://api.polyhaven.com/files/rock_boulder_dry . All Poly Haven assets are CC0: https://polyhaven.com/license . The complete returned download manifest is saved under textures/polyhaven-files.json. Downloaded original 2k JPG diffuse, OpenGL normal and roughness. Texture URLs and upstream checksums are retained in that manifest. Images are packed into the blend and retained separately for reproducibility.

This rock material is a mineral microdetail surrogate, recolored to ivory and with reduced normal strength. It is not a verified scan of the particular porous limestone in the reference, and fidelity is not identical. No large procedural marble veins are used. The ground uses subtle geometric relief, not the full eroded landscape visible in the target. Portal proportions and camera are an intentional close-up approximation; a single reference cannot prove hidden geometry.

## Review scope
Compare the first portal crop for stone scale, soft edge treatment, tunnel depth, violet restraint, and grounding. Do not approve expansion to three portals from this artifact alone. No GLB, baking or runtime optimization is done before visual approval.

## Bounded correction
Initial render revealed bevels on coplanar triangulation edges and an incomplete inner material assignment. Corrected with angle-limited bevels and the complete interior edge range. Also reduced world/fill and deepened violet pigment. The second aesthetic proof was subsequently adjusted on root visual review; no iterative whole-scene expansion.


Verified downloaded diffuse/normal/roughness bytes against the official API MD5 values: all three match; results in textures/download-verification.json. Original asset metadata retained in textures/asset-metadata.json.


Artifact diagnosis after comparison: cap normals and surviving coplanar triangulation edges still showed diagonal seams. Recalculate normals and dissolve coplanar edges (preserving material boundaries) before evaluating bevel modifiers. The artifact-only verification render uses the same camera, material and lighting as the bounded second proof.


Root visual review requested luminous white surroundings and richer violet: final illumination uses 0.65 neutral-cool world, 1700 W broad warm key, 450 W fill, camera-ray offwhite background and Standard transform at -0.25 EV. This is a deliberate display-transform change to retain pigment chroma; clipping/headroom should be reassessed before any production bake.


## Última prova,30/10/2026
Render final concluído:1200×900,CyclesCPU96samples,71,57s,pico172,13MB informado peloBlender. Configuração definitiva no build.py:world1,4,key600W,fill100W,Standard-0,25EV; reduzida variação do albedo. Esta nota supera os valores de iluminação das tentativas anteriores. Diagonal de triangulação removida. Material e iluminação ainda NÃO atingem a referência: pedra manchada demais, relevo/chão e projeção diferentes, interior sem mesma gradação violeta. Não expandir nem integrar com base em alegação de fidelidade já alcançada. Comparação regenerada a partir do render final, fonte e mapas preservados; nenhum arquivo de aplicação alterado nesta prova.
