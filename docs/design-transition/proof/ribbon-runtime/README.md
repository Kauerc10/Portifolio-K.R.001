# Runtime checkpoint — paused for visual research

2026-10-30. The user rejected visual fidelity to the approved modeling reference. This checkpoint preserves the functional integration; it is not visual approval or a completed delivery.

Production renderer loads the actual GLB with manifest camera/routes, stable camera, demand-driven brief light journey, soft contact shadows, and HTML destinations/previews. Hover/focus retains the selected preview so its CTA remains reachable. Repeated unpaused visibility events preserve the light journey. The legacy smooth-link handler now skips hero links to restore native hash/history; a browser recheck of that last fix is pending.

Validation before pause: production build and type check passed. Hero interaction/renderer regression tests passed (5 targeted tests after the independent review fixes). Earlier browser checks covered 1440/1024/390/320 widths with a mounted GLB canvas, no page errors and no horizontal overflow. Reduced motion and Save-Data requested no GLB; texture/model failure and context loss retained the poster and three HTML links. Earlier instrumentation recorded zero WebGL draw calls during 1200ms idle and after the brief journey settled. These are desktop headless Chrome observations, not physical-device or field performance certification. Final browser rerun after the last crop/native-navigation changes was interrupted by the user's request to research a better visual pipeline.

`capture.cjs` uses an existing Playwright installation (`PLAYWRIGHT_MODULE`) and Chrome against production port3100, with GitHub API calls intercepted. Without flags it captures the page at four widths and records the HTML preview CTA. `--poster` captures only the GLB canvas with transparent alpha at2400x1350 and an overscan orthographic width39. This wider camera prevents finite-poster clipping when the responsive canvas exposes more horizontal geometry. It excludes all HTML labels. The production image uses the same camera target and lighting, and its crop is calculated from the scene manifest. `poster-blender.webp` preserves the original Blender poster; `poster.webp` is the calibrated runtime capture. Convert the PNG once with Pillow:

```python
from PIL import Image
Image.open('docs/design-transition/proof/ribbon-runtime/calibrated-poster.png').save('public/models/ribbon-portals/poster.webp', quality=90, method=6)
```

`benchmark.cjs` contains the follow-up functional checks, including a required real `#project-atlas` hash. Its final run is pending; do not treat any local earlier JSON or screenshots as final verification of the current checkpoint.
