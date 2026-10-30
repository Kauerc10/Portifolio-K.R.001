from PIL import Image, ImageDraw
from pathlib import Path
root=Path(__file__).parent
ref=Image.open(root/'../../docs/design-transition/assets/ribbon-portals/model-reference.png').convert('RGB').crop((0,295,620,795))
proof=Image.open(root/'portal-proof.png').convert('RGB')
out=Image.new('RGB',(1600,700),'#f4f3f0');d=ImageDraw.Draw(out)
for im,x,label in [(ref,20,'REFERENCE - first portal crop'),(proof,810,'CYCLES - isolated single portal proof')]:
 im.thumbnail((770,635));out.paste(im,(x+(770-im.width)//2,50+(635-im.height)//2));d.text((x,20),label,fill='#262328')
out.save(root/'comparison.png')
