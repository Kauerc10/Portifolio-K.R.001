import sys
from PIL import Image
ref=Image.open('docs/design-transition/assets/approved-desktop.png').convert('RGB')
pre=Image.open('design/scene-proof/blender/out/preview.png').convert('RGB').resize(ref.size)
w=ref.width//2; h=ref.height//2
side=Image.new('RGB',(w*2,h),'white'); side.paste(ref.resize((w,h)),(0,0)); side.paste(pre.resize((w,h)),(w,h*0))
side.save('design/scene-proof/blender/out/compare-side.png')
Image.blend(ref,pre,0.5).save('design/scene-proof/blender/out/compare-blend.png')
print('ok')