import json,math,os
from shapely.geometry import LineString
from shapely.ops import unary_union
ROOT=os.path.dirname(__file__)
def bez(points):
 out=[]
 for i in range(65):
  t=i/64; u=1-t
  out.append([u*u*u*points[0][j]+3*u*u*t*points[1][j]+3*u*t*t*points[2][j]+t*t*t*points[3][j] for j in range(2)])
 return out
trunk=bez([[-17,-21],[-10,-10],[-1,-5],[1,-4]])
left=bez([[1,-4],[-1,-3],[-7,-3],[-8,1]])
right=bez([[1,-4],[6,-3],[9,-2],[8,.5]])
back=bez([[8,.5],[8,5],[0,5],[0,9]])
paths=[trunk,left,right,back]
def outline(width):
 shape=unary_union([LineString(p).buffer(width/2,cap_style=2,join_style=1,quad_segs=8) for p in paths]); return list(shape.exterior.coords)[:-1]
json.dump({'stone':outline(2.55),'violet':outline(2.18)},open(os.path.join(ROOT,'footprint.json'),'w'))
conv=lambda p:[round(p[0],5),.59,round(-p[1],5)]
contract={'cameraPosition':[0,9,28],'cameraTarget':[0,1,-1.5],'orthoWidth':27,'minOrthoHeight':11.5,'pathPoints':[conv(p) for p in trunk+right[1:]+back[1:]],'routes':{'development':[conv(p) for p in trunk+left[1:]],'automation':[conv(p) for p in trunk+right[1:]+back[1:]],'support':[conv(p) for p in trunk+right[1:]]},'portals':{'development':[-8,.55,-1],'automation':[0,.55,-9],'support':[8,.55,-.5]},'units':'meters; glTF Y-up; proposed dimensions, not recovered geometry','portalDimensions':{'development':[4.8,3.5,1.2],'automation':[4,3.1,1.2],'support':[4.8,3.5,1.2]},'sourceReference':'docs/design-transition/assets/ribbon-portals/model-reference.png'}
json.dump(contract,open(os.path.join(ROOT,'../../public/models/ribbon-portals/scene.json'),'w'),indent=2)
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1672" height="1280" viewBox="0 0 1672 1280"><rect width="1672" height="1280" fill="#faf9f7"/><image href="../../docs/design-transition/assets/ribbon-portals/model-reference.png" width="1672" height="941"/>']
for x in range(0,1673,104): svg.append(f'<path d="M{x} 0V941" stroke="#7541b8" opacity=".25"/>')
for y in range(0,942,104): svg.append(f'<path d="M0 {y}H1672" stroke="#7541b8" opacity=".25"/>')
for x,y,label in [(300,447,'D — 4.8 × 3.5 × 1.2 m'),(850,375,'A — 4.0 × 3.1 × 1.2 m'),(1430,450,'S — 4.8 × 3.5 × 1.2 m')]:
 svg.append(f'<circle cx="{x}" cy="{y}" r="8" fill="#7a24ed"/><text x="{x-145}" y="{y-105}" font-family="Arial" font-size="23" fill="#321058">{label}</text>')
svg.append('<text x="40" y="995" font-family="Arial" font-size="30" fill="#321058">Proposed authoring dimensions — grid is image-space, not measured 3D geometry</text><text x="40" y="1040" font-family="Arial" font-size="22">Camera Blender (0, −28, 9), target (0, 1.5, 1); orthographic width 27 m</text><text x="40" y="1080" font-family="Arial" font-size="22">Ribbon: 2.55 m stone / 2.18 m violet · height 0.55 m · pads Ø6.1 m</text>')
for p in paths:
 pts=' '.join(f'{1150+x*14},{1110-y*9}' for x,y in p); svg.append(f'<polyline points="{pts}" fill="none" stroke="#8134df" stroke-width="24"/>')
for x,y,l in [(-8,1,'D'),(0,9,'A'),(8,.5,'S')]: svg.append(f'<rect x="{1150+x*14-28}" y="{1110-y*9-7}" width="56" height="14" fill="#c5b9a6"/><text x="{1150+x*14}" y="{1110-y*9-18}" font-size="20">{l}</text>')
svg.append('<text x="40" y="1130" font-family="Arial" font-size="22">Top view at right; curves and centers explicitly proposed.</text></svg>')
open(os.path.join(ROOT,'technical-sheet.svg'),'w',encoding='utf-8').write(''.join(svg))
