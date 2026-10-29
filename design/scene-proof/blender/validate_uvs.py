"""Check the exported structure atlas for overlapping triangle interiors.

Independent GLB-level regression probe for the observed violet texture leaks.
Pixel sampling cannot prove absence of subpixel overlap; Blender also checks
chart intersections before baking. Requires NumPy, no Blender or renderer.
"""
import json
from pathlib import Path
import struct
import numpy as np

root = Path(__file__).resolve().parents[3]
data = (root / 'design/scene-proof/assets/landscape.glb').read_bytes()
length = struct.unpack_from('<I', data, 12)[0]
gltf = json.loads(data[20:20 + length])
buffer = data[28 + length:]


def accessor(index):
    item = gltf['accessors'][index]
    view = gltf['bufferViews'][item['bufferView']]
    dtype = {5126: '<f4', 5125: '<u4', 5123: '<u2'}[item['componentType']]
    components = {'VEC2': 2, 'SCALAR': 1}[item['type']]
    assert 'byteStride' not in view, 'Probe expects tightly packed exported accessors'
    return np.frombuffer(buffer, dtype=dtype, count=item['count'] * components,
                         offset=view.get('byteOffset', 0) + item.get('byteOffset', 0)).reshape(-1, components)


size = 1024
coverage = np.zeros((size, size), dtype=np.uint16)
meshes = []
for mesh in gltf['meshes']:
    if mesh['name'] == 'terrain':  # Separate texture, not the structure atlas.
        continue
    overlaps = 0
    for primitive in mesh['primitives']:
        uv = accessor(primitive['attributes']['TEXCOORD_0']) * size
        for indices in accessor(primitive['indices']).reshape(-1, 3):
            a, b, c = uv[indices]
            low = np.maximum(0, np.floor(np.min([a, b, c], axis=0)).astype(int))
            high = np.minimum(size, np.ceil(np.max([a, b, c], axis=0)).astype(int))
            if np.any(high <= low):
                continue
            x, y = np.meshgrid(np.arange(low[0], high[0]) + .5, np.arange(low[1], high[1]) + .5)
            v0, v1 = b - a, c - a
            determinant = v0[0] * v1[1] - v1[0] * v0[1]
            if abs(determinant) < 1e-8:
                continue
            u = ((x - a[0]) * v1[1] - (y - a[1]) * v1[0]) / determinant
            v = (v0[0] * (y - a[1]) - v0[1] * (x - a[0])) / determinant
            interior = (u > .001) & (v > .001) & (u + v < .999)
            region = coverage[low[1]:high[1], low[0]:high[0]]
            overlaps += int(np.count_nonzero((region > 0) & interior))
            region[interior] += 1
    meshes.append({'mesh': mesh['name'], 'overlappingSamples': overlaps})

report = {'resolution': size, 'overlappingPixels': int(np.count_nonzero(coverage > 1)), 'meshes': meshes}
output = root / 'docs/design-transition/proof/refinement-47/uv-validation.json'
output.write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report))
assert report['overlappingPixels'] == 0, 'Structure atlas has overlapping triangle interiors'
