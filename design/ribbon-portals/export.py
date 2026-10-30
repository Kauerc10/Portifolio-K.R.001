import bpy,os
ROOT=os.path.dirname(os.path.abspath(__file__))
bpy.ops.object.select_all(action='DESELECT')
for o in bpy.data.objects:
 if o.type=='MESH' and not o.name.startswith('PREVIEW'): o.select_set(True)
bpy.ops.export_scene.gltf(filepath=ROOT+'/../../public/models/ribbon-portals/hero.glb',export_format='GLB',use_selection=True,export_apply=True)
