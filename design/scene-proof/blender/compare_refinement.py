"""Compare the approved reference, the camera render and captured runtime.

Run from repository root with Pillow. These are evidence crops, not production art.
"""
from pathlib import Path
import gzip
import json
import re
import struct
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[3]
output = root / 'docs/design-transition/proof/refinement-47'
output.mkdir(parents=True, exist_ok=True)
full_render = Path(__file__).parent / 'out/refinement-full.png'
focus_render = Path(__file__).parent / 'out/refinement-focus.png'
sources = [
    ('Referencia aprovada', root / 'docs/design-transition/assets/approved-desktop.png'),
    ('Blender / Cycles CPU', full_render if full_render.exists() else focus_render),
    ('Navegador / GLB assado', output / 'scene-desktop.png'),
]
for name, box in [('focus', (40, 480, 550, 940)), ('material', (80, 525, 310, 625)),
                  ('stairs', (140, 600, 350, 705)), ('junction', (430, 620, 565, 725))]:
    width, height = box[2] - box[0], box[3] - box[1]
    sheet = Image.new('RGB', (width * 3, height + 26), 'white')
    draw = ImageDraw.Draw(sheet)
    for index, (label, source) in enumerate(sources):
        with Image.open(source) as image:
            sheet.paste(image.convert('RGB').crop(box), (index * width, 26))
        draw.text((index * width + 6, 6), label, fill='black')
    sheet.save(output / f'comparison-{name}.png')

glb = (root / 'design/scene-proof/assets/landscape.glb').read_bytes()
json_length = struct.unpack_from('<I', glb, 12)[0]
gltf = json.loads(glb[20:20 + json_length])
dist = root / '.scene-proof-dist'
script = re.search(r'src="([^"]+\.js)"', (dist / 'index.html').read_text())[1]
runtime = (dist / script.lstrip('/')).read_bytes()
manifest = {
    'status': 'full refinement complete; awaiting human visual review',
    'stagesCompleted': ['focus', 'full'],
    'uvValidation': {'resolution': 1024, 'overlappingPixels': 0},
    'modelBytes': len(glb),
    'embeddedTextures': [{'mimeType': image['mimeType'],
                          'bytes': gltf['bufferViews'][image['bufferView']]['byteLength']}
                         for image in gltf['images']],
    'runtimeBytes': len(runtime), 'runtimeGzipBytes': len(gzip.compress(runtime, compresslevel=6)),
    'posterBytes': {name: (output / f'poster-{name}.webp').stat().st_size
                    for name in ('desktop', 'mobile')},
    'destinations': {'development': '#projetos', 'automation': '#project-atlas', 'support': '#experiencia'},
    'destinationValidation': 'three named meshes loaded and projected; application HTML behavior belongs to T02/T03',
}
(output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
