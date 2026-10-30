# Ribbon + portals · authored source

Canonical target: `docs/design-transition/assets/ribbon-portals/model-reference.png` (one image, not the concept collage). Dimensions in `technical-sheet.svg/png` and `scene.json` are proposed authoring dimensions, not measurements recovered from the image.

Reproduce with Python 3 + Shapely, then Blender 4.5:

```powershell
python design/ribbon-portals/prepare.py
& 'C:/Users/suelen.morais/.codex/tools/blender/blender-4.5.15-windows-x64/blender.exe' --background --python design/ribbon-portals/build.py
node design/ribbon-portals/finalize.cjs
```

`build.py` creates all architecture from real closed volumes: a connected branching stone ribbon with inset violet surface; three arched monoliths with violet intrados; three low circular pads. The world has no terrain or mountain mesh. Shared 256px limestone color and tangent normal maps are embedded. The source `.blend` includes preview-only ground, lights and camera; export selects architecture only. The preview ground is a Cycles shadow catcher and never ships as an opaque ground plane.

Runtime uses glTF Y-up. `public/models/ribbon-portals/scene.json` supplies camera, orthographic framing, portal anchors and per-destination sampled routes for traveling lights. Node names are stable: `path`, `path-violet`, `portal-development/automation/support`, `pad-development/automation/support`, `violet-development/automation/support`. Material slots are reused. KHR_mesh_quantization is supported by the native GLTFLoader; no Draco/Meshopt decoder is required.

Lighting is hybrid PBR, not an unlit screenshot: shared color texture, warm hemisphere illumination, broad upper-left key and transparent runtime contact-shadow plane at Y=-0.03. Runtime must cast and receive shadows on architecture. The fallback poster has transparent background and baked soft shadows. Mountains belong to the independent 2D background supplied by the integration, preserving a light composition without additional 3D complexity.

`desktop.png` / `mobile.png` are transparent Blender renders; `desktop-final.png` is a review composite. They prove authoring/framing, not browser lighting parity. Browser integration must still be inspected with its actual renderer. Render denoising is disabled to avoid the earlier OIDN memory failure.
