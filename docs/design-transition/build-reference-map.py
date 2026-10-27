"""Render an independent spatial diagram; never modify the approved reference.

Run with the bundled Python/Pillow runtime from the repository root.
Coordinates describe observed 2D framing, not recovered 3D geometry or final CSS.
"""
from pathlib import Path
import hashlib
import json
from html import escape
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / 'assets'
SOURCE = ASSETS / 'approved-desktop.png'
W, H = Image.open(SOURCE).size

def node(id, name, box, layer, **extra):
    x, y, w, h = box
    return dict(id=id, name=name, bbox_px=list(box),
                bbox_normalized=[round(v, 5) for v in (x/W,y/H,w/W,h/H)],
                layer=layer, **extra)

nodes = [
 node('U01','Marca pessoal',(74,25,150,42),'html', role='link', href='#hero'),
 node('U02','Navegação principal',(905,28,274,34),'html', role='navigation'),
 node('U03','Currículo no cabeçalho',(1207,22,155,50),'html', role='link', href='/curriculo_kaue.pdf'),
 node('U04','Cumprimento: linha grafite',(73,135,684,82),'html', role='heading', text='Olá, que bom ter'),
 node('U05','Cumprimento: linha violeta',(72,224,585,80),'html', role='heading-part', text='você por aqui.'),
 node('U06','Três áreas de atuação',(75,328,610,38),'html', role='text', text='Desenvolvimento, automações e suporte.'),
 node('U07','Apresentação curta',(931,150,388,83),'html', role='text', text='Sou Kauê Ruon Cardoso. Crio aplicações, automatizo rotinas e ajudo pessoas a usar tecnologia.'),
 node('U08','Explorar meu trabalho',(934,257,252,50),'html', role='link', href='#projetos'),
 node('U09','Currículo secundário',(1210,267,92,31),'html', role='link', href='/curriculo_kaue.pdf'),
 node('U10','Rótulo Desenvolvimento',(188,440,188,29),'html', role='link', destination='development', href='#projetos', anchor_px=[190,504]),
 node('U11','Rótulo Automação',(724,314,160,29),'html', role='link', destination='automation', href='#project-atlas', anchor_px=[724,384]),
 node('U12','Rótulo Suporte',(1245,414,118,29),'html', role='link', destination='support', href='#experiencia', anchor_px=[1248,476]),
 node('U13','Indicação de rolagem',(600,899,252,29),'html', role='hint', observed_text='Role para conectar os caminhos', proposed_text='Explore os caminhos ou role para ver os projetos'),
 node('U14','Localização e formação',(74,1015,247,29),'html', role='text', text='Blumenau, SC · ADS em formação'),
 node('U15','Atalho Atlas Notarial',(840,1002,244,52),'html', role='link', href='#project-atlas'),
 node('U16','Atalho CKF Manutenção',(1135,1002,240,52),'html', role='link', href='#project-ckf'),
 node('W01','Pavilhão esquerdo',(73,507,240,148),'world', destination='development', anchor_px=[190,504], shape='block-with-arch'),
 node('W02','Pavilhão central elevado',(649,384,209,139),'world', destination='automation', anchor_px=[724,384], shape='open-cylinder'),
 node('W03','Pavilhão direito',(1145,465,237,174),'world', destination='support', anchor_px=[1248,476], shape='vault-with-workspace'),
 node('W04','Caminho de primeiro plano',(0,602,533,345),'world', shape='curved-path', visual_only=True),
 node('W05','Ponte / caminho central',(369,485,617,206),'world', shape='curved-bridge', visual_only=True),
 node('W06','Caminho direito',(1180,585,253,151),'world', shape='curved-path', visual_only=True),
 node('W07','Escadaria esquerda',(110,604,105,64),'world', shape='stairs', visual_only=True),
 node('W08','Escadaria central',(547,498,162,87),'world', shape='stairs', visual_only=True),
 node('W09','Escadaria direita',(1094,611,174,151),'world', shape='stairs', visual_only=True),
 node('W10','Terreno / plataformas',(0,386,1433,581),'world', shape='terrain', visual_only=True),
 node('W11','Fundo distante / vazios',(0,377,1134,230),'world', shape='background', visual_only=True),
]

ROUTES = dict(front=[[0,880],[200,830],[420,760],[500,690],[470,640],[330,620],[210,615]],
              bridge=[[490,660],[700,600],[900,590],[1030,570],[960,500],[850,470]],
              right=[[1075,570],[1190,680],[1300,715],[1433,730]])

data = dict(schema='portfolio-reference-map/v1', source='approved-desktop.png',
            source_sha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
            canvas=dict(width=W,height=H,units='source-image-pixels',origin='top-left'),
            coordinate_status='Approximate semantic bounds manually interpreted from the approved image; not CSS measurements, 3D coordinates or pixel-exact segmentation.',
            layers=dict(html='Real text, links, focus, labels and controls',world='Illustration or 3D only; no baked UI'),
            nodes=nodes,
            destination_links=[dict(id='development',label='Desenvolvimento',label_node='U10',world_node='W01',href='#projetos'),dict(id='automation',label='Automação',label_node='U11',world_node='W02',href='#project-atlas'),dict(id='support',label='Suporte',label_node='U12',world_node='W03',href='#experiencia')],
            route_polylines_px=ROUTES,inferred_path_relationships=[['W04','W01'],['W04','W05'],['W05','W02'],['W05','W06'],['W06','W03']],
            path_relationship_status='Proposed coherent reconstruction. Generated source does not prove hidden topology or physical continuity.',
            mobile=dict(status='proposed-not-approved-render',width_range=[320,767],order=['U01/U03/menu','U04/U05','U06','U07','U08/U09','world-camera-mobile','U10/U11/U12-in-document-if-needed','U15/U16','remaining-content'],minimum_target_css_px=44,scene_height_css_px=[260,360]))
(ROOT/'reference-map.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')


INK='#14131C'
BLUE='#245783'; PURPLE='#6534D8'; ORANGE='#E8590C'; MUTED='#555566'
LEG_H=290
ref=Image.open(SOURCE).convert('RGB')
base=Image.blend(ref,Image.new('RGB',ref.size,'white'),0.5)
im=Image.new('RGB',(W,H+LEG_H),'#FFFFFF'); im.paste(base,(0,0))
ov=Image.new('RGBA',im.size,(0,0,0,0)); od=ImageDraw.Draw(ov)
d=ImageDraw.Draw(im)
fontroot=Path('C:/Windows/Fonts')
def font(size,bold=True): return ImageFont.truetype(str(fontroot/('arialbd.ttf' if bold else 'arial.ttf')),size)
svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H+LEG_H}" viewBox="0 0 {W} {H+LEG_H}" role="img" aria-labelledby="title desc">',
 '<title id="title">Mapa espacial da referência aprovada</title>',
 '<desc id="desc">Referência esmaecida com sobreposição. Azul = HTML (U). Roxo = cena 3D (W). Laranja tracejado = rota dos caminhos. Consulte reference-map.md e JSON.</desc>',
 f'<rect width="{W}" height="{H+LEG_H}" fill="#fff"/>',
 f'<image href="approved-desktop.png" width="{W}" height="{H}" opacity="0.5"/>']
def hexrgb(h): return tuple(int(h[i:i+2],16) for i in (1,3,5))
def tag(x,y,t,color):
  f=font(15); tw=int(d.textlength(t,font=f))+10
  d.rectangle((x,y,x+tw,y+20),fill=color); d.text((x+5,y+2),t,font=f,fill='white')
  svg.append(f'<rect x="{x}" y="{y}" width="{tw}" height="20" fill="{color}"/><text x="{x+5}" y="{y+16}" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#fff">{t}</text>')
tags=[]
for n in nodes:
  if n['id'] in ('W10','W11'): continue
  x,y,w,h=n['bbox_px']; world=n['layer']=='world'
  c=PURPLE if world else BLUE
  dash = n['id'] in ('W04','W05','W06')
  od.rectangle((x,y,x+w,y+h),fill=hexrgb(c)+((22 if world else 30),),outline=hexrgb(c)+(255,),width=2)
  svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}" fill-opacity="{0.09 if world else 0.12}" stroke="{c}" stroke-width="2"/>')
  tags.append((n['id'],x,y,c))
im.paste(Image.alpha_composite(im.convert('RGBA'),ov).convert('RGB')); d=ImageDraw.Draw(im)
# re-emit svg rects done above; now routes
for name,pts in ROUTES.items():
  for a,b in zip(pts,pts[1:]):
    dx,dy=b[0]-a[0],b[1]-a[1]; L=max(1,(dx*dx+dy*dy)**.5); steps=int(L//16)
    for s in range(0,steps,2):
      p=(a[0]+dx*s/steps,a[1]+dy*s/steps); q=(a[0]+dx*(s+1)/steps,a[1]+dy*(s+1)/steps); d.line([p,q],fill=ORANGE,width=4)
  svg.append('<polyline points="'+' '.join(f'{x},{y}' for x,y in pts)+f'" fill="none" stroke="{ORANGE}" stroke-width="4" stroke-dasharray="12 8"/>')
for n in nodes:
  if n['id'] in ('U10','U11','U12'):
    ax,ay=n['anchor_px']; d.ellipse((ax-7,ay-7,ax+7,ay+7),fill=ORANGE,outline='white',width=2)
    svg.append(f'<circle cx="{ax}" cy="{ay}" r="7" fill="{ORANGE}" stroke="#fff" stroke-width="2"/>')
# tag offsets avoid collisions in dense areas
OFF={'W08':(0,0),'W07':(0,44),'W09':(0,0),'W06':(60,100),'W04':(10,300),'W05':(380,150),'W10':(0,0),'U05':(560,0),'U04':(690,0)}
for id,x,y,c in tags:
  dx,dy=OFF.get(id,(0,-22 if id.startswith('U') and id not in ('U04','U05') else 0))
  tag(max(0,x+dx),max(0,y+dy),id,c)
# legend
ly=H+14
d.rectangle((0,H,W,H+LEG_H),fill='#F7F7FA'); svg.append(f'<rect x="0" y="{H}" width="{W}" height="{LEG_H}" fill="#F7F7FA"/>')
def txt(x,y,t,color,size=15,bold=False):
  d.text((x,y),t,font=font(size,bold),fill=color)
  svg.append(f'<text x="{x}" y="{y+size}" font-family="Arial,sans-serif" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{escape(t)}</text>')
txt(24,ly,'LEGENDA  ·  imagem original esmaecida; posições aproximadas, não é um design novo',INK,17,True)
txt(24,ly+30,'AZUL  U = HTML real, acessível (texto, links, foco)',BLUE,15,True)
txt(24,ly+52,'ROXO  W = cena / arte 3D, sem UI embutida',PURPLE,15,True)
txt(24,ly+74,'LARANJA tracejado = rota inferida dos caminhos (W04 → W01 · W04 → W05 → W02 · W05 → W06 → W03); ponto = âncora do rótulo',ORANGE,15,True)
cols=[(24,['U01 marca · #hero','U02 navegação (Projetos, Trajetória, Contato)','U03 Currículo (cabeçalho) · PDF','U04 + U05 título em duas linhas','U06 três áreas de atuação','U07 apresentação curta','U08 CTA Explorar meu trabalho · #projetos']),
 (500,['U09 Currículo secundário · PDF','U10 Desenvolvimento → W01 · #projetos','U11 Automação → W02 · #project-atlas','U12 Suporte → W03 · #experiencia','U13 indicação de rolagem','U14 Blumenau · ADS em formação','U15 Atlas · U16 CKF (atalhos)']),
 (960,['W01 pavilhão Desenvolvimento','W02 pavilhão Automação (elevado)','W03 pavilhão Suporte','W04 caminho frente · W05 ponte central','W06 caminho direito','W07/W08/W09 escadarias','W10 terreno · W11 fundo e vazios (sem caixa)'])]
for x,items in cols:
  for i,t in enumerate(items): txt(x,ly+104+i*20,t,'#33334A',14)
svg.append('</svg>')
(ASSETS/'reference-map.svg').write_text('\n'.join(svg)+'\n',encoding='utf-8')
im.save(ASSETS/'reference-map.png',optimize=True)
print(f'Reference {W} x {H}; {len(nodes)} elements. SVG, PNG and JSON written.')

