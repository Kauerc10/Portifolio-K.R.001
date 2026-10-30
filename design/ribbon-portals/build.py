import bpy, math, json, os, random, bmesh
from mathutils import Vector
from mathutils.geometry import tessellate_polygon
ROOT=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.abspath(os.path.join(ROOT,'../../public/models/ribbon-portals'))
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
random.seed(14)
def material(name,color,rough):
 m=bpy.data.materials.new(name); m.use_nodes=True; p=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED'); p.inputs['Base Color'].default_value=(*color,1); p.inputs['Roughness'].default_value=rough; return m
stone=material('Warm ivory limestone',(0.77,.735,.675),.76)
# Small, deterministic shared stone grain is embedded in GLB. No runtime procedural shader.
im=bpy.data.images.new('limestone-grain',256,256); pix=[]
for y in range(256):
 for x in range(256):
  n=random.random()*.022-.07*math.exp(-abs(math.sin(x*.065+math.sin(y*.025)*2+.5*math.sin(y*.09)))*24)
  pix.extend((.88+n,.847+n,.792+n,1))
im.pixels=pix; im.filepath_raw=os.path.join(ROOT,'limestone.png'); im.file_format='PNG'; im.save(); im.pack()
n=stone.node_tree.nodes.new('ShaderNodeTexImage'); n.image=im; stone.node_tree.links.new(n.outputs['Color'],next(n for n in stone.node_tree.nodes if n.type=='BSDF_PRINCIPLED').inputs['Base Color'])
# Explicit tangent-space normal map is supported by glTF; no procedural runtime nodes.
norm=bpy.data.images.new('limestone-normal',256,256); norm.colorspace_settings.name='Non-Color'; npix=[]
for iy in range(256):
 for ix in range(256):
  dx=.06*math.sin(ix*.31+iy*.17)+(random.random()-.5)*.08; dy=.06*math.cos(iy*.29-ix*.13)+(random.random()-.5)*.08
  vec=Vector((dx,dy,1)); vec.normalize(); npix.extend((vec.x*.5+.5,vec.y*.5+.5,vec.z*.5+.5,1))
norm.pixels=npix; norm.filepath_raw=os.path.join(ROOT,'limestone-normal.png'); norm.file_format='PNG'; norm.save(); norm.pack()
nnode=stone.node_tree.nodes.new('ShaderNodeTexImage'); nnode.image=norm; nm=stone.node_tree.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value=.3; stone.node_tree.links.new(nnode.outputs['Color'],nm.inputs['Color']); stone.node_tree.links.new(nm.outputs['Normal'],next(n for n in stone.node_tree.nodes if n.type=='BSDF_PRINCIPLED').inputs['Normal'])
violet=material('RUON violet satin',(.11,.001,.55),.36)
p=next(n for n in violet.node_tree.nodes if n.type=='BSDF_PRINCIPLED'); p.inputs['Metallic'].default_value=.06; p.inputs['Emission Color'].default_value=(.22,.002,.65,1); p.inputs['Emission Strength'].default_value=.025
models=[]
def mesh(name,vs,fs,mat):
 me=bpy.data.meshes.new(name); me.from_pydata(vs,[],fs); me.update(); ob=bpy.data.objects.new(name,me); bpy.context.collection.objects.link(ob); ob.data.materials.append(mat); models.append(ob); return ob
def finish(ob,bevel=.04):
 bpy.ops.object.select_all(action='DESELECT'); bpy.context.view_layer.objects.active=ob; ob.select_set(True)
 bm=bmesh.new(); bm.from_mesh(ob.data); bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces)); bmesh.ops.dissolve_limit(bm,angle_limit=.001,verts=list(bm.verts),edges=list(bm.edges),delimit={'MATERIAL'}); bm.to_mesh(ob.data); bm.free()
 if bevel:
  b=ob.modifiers.new('Soft stone arris','BEVEL'); b.width=bevel; b.segments=3; b.limit_method='ANGLE'; b.angle_limit=.5; b.harden_normals=True; bpy.ops.object.modifier_apply(modifier=b.name)
 for f in ob.data.polygons: f.use_smooth=False
 mod=ob.modifiers.new('Weighted corner normals','WEIGHTED_NORMAL'); mod.keep_sharp=True; bpy.ops.object.modifier_apply(modifier=mod.name)
 bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.uv.smart_project(island_margin=.025); bpy.ops.object.mode_set(mode='OBJECT'); ob.select_set(False)
def footprint(name,outline,z,depth,mat):
 L=len(outline); vs=[(x,y,zz) for zz in [z-depth,z] for x,y in outline]
 coords=[Vector((x,y,0)) for x,y in outline]; tris=tessellate_polygon([coords]); lookup={tuple(v):i for i,v in enumerate(coords)}; fs=[]
 for tr in tris:
  ids=[v if isinstance(v,int) else lookup[tuple(v)] for v in tr]; fs += [tuple(reversed(ids)),tuple(i+L for i in ids)]
 fs += [(i,(i+1)%L,(i+1)%L+L,i+L) for i in range(L)]
 ob=mesh(name,vs,fs,mat); finish(ob,.035); return ob
foot=json.load(open(os.path.join(ROOT,'footprint.json')))
footprint('path',foot['stone'],.55,.55,stone); footprint('path-violet',foot['violet'],.575,.055,violet)
portals=[('development',(-8,1),3.5,4.8),('automation',(0,9),3.1,4),('support',(8,.5),3.5,4.8)]
for name,xy,h,w in portals:
 x,y=xy; r=.91 if name != "automation" else .78; stem=1.52; depth=1.2
 bpy.ops.mesh.primitive_cylinder_add(vertices=96,radius=3.05 if name != "automation" else 2.65,depth=.49,location=(x,y,.245)); pad=bpy.context.object; pad.name="pad-"+name; pad.data.materials.append(stone); models.append(pad); finish(pad,.06)
 outline=[(-w/2,0),(-w/2,h),(w/2,h),(w/2,0),(r,0),(r,stem)]
 outline += [(r*math.cos(a),stem+r*math.sin(a)) for a in [math.pi*i/48 for i in range(1,49)]]
 outline += [(-r,0)]; L=len(outline)
 vs=[(x+xx,y+yy,z+.55) for yy in [-depth/2,depth/2] for xx,z in outline]
 coords=[Vector((xx,z,0)) for xx,z in outline]; tri=tessellate_polygon([coords]); lookup={tuple(v):i for i,v in enumerate(coords)}
 fs=[]
 for tr in tri:
  ids=[v if isinstance(v,int) else lookup[tuple(v)] for v in tr]; fs += [tuple(reversed(ids)),tuple(i+L for i in ids)]
 fs += [(i,(i+1)%L,(i+1)%L+L,i+L) for i in range(L)]
 ob=mesh('portal-'+name,vs,fs,stone); ob.data.materials.append(violet)
 for i in range(5,L-1): ob.data.polygons[len(tri)*2+i].material_index=1
 finish(ob,.045)
 # Slight architectural yaw reveals real violet intrados under an orthographic camera.
 yaw=math.radians(12 if name=='development' else -12 if name=='support' else 8)
 for vert in ob.data.vertices:
  dx,dy=vert.co.x-x,vert.co.y-y; vert.co.x=x+dx*math.cos(yaw)-dy*math.sin(yaw); vert.co.y=y+dx*math.sin(yaw)+dy*math.cos(yaw)
 # inset violet threshold provides clear portal destination without opaque door plane
 mesh('violet-'+name,[(x-r,y-.65,.59),(x+r,y-.65,.59),(x+r,y+.65,.59),(x-r,y+.65,.59)],[(0,1,2,3)],violet)
scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.cycles.samples=32; scene.cycles.use_denoising=False
scene.world.color=(.8,.8,.8)
world=scene.world; world.use_nodes=True; next(n for n in world.node_tree.nodes if n.type=='BACKGROUND').inputs[0].default_value=(.78,.81,.9,1); next(n for n in world.node_tree.nodes if n.type=='BACKGROUND').inputs[1].default_value=.9
bpy.ops.object.light_add(type='AREA',location=(-5,-7,12)); bpy.context.object.name='Studio key'; bpy.context.object.data.energy=3200; bpy.context.object.data.shape='DISK'; bpy.context.object.data.size=8
bpy.context.object.rotation_euler=(Vector((0,0,0))-bpy.context.object.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(0,-28,9)); cam=bpy.context.object; cam.rotation_euler=(Vector((0,1.5,1))-cam.location).to_track_quat('-Z','Y').to_euler(); cam.data.type='ORTHO'; cam.data.ortho_scale=27; scene.camera=cam
scene.render.resolution_x=1600; scene.render.resolution_y=900; scene.render.resolution_percentage=100; scene.render.film_transparent=True
scene.view_settings.view_transform='AgX'
# Export architecture only: ground and studio lights are preview infrastructure.
bpy.ops.object.select_all(action='DESELECT')
for ob in models: ob.select_set(True)
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,'hero.glb'),export_format='GLB',use_selection=True,export_apply=True)
# Preview ground catches soft contact shadows; not part of GLB.
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.015)); ground=bpy.context.object; ground.name='PREVIEW ground'; ground.data.materials.append(material('Preview warm ground',(.86,.84,.8),.85)); ground.is_shadow_catcher=True
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'ribbon-portals.blend'))
scene.render.filepath=os.path.join(ROOT,'desktop.png'); bpy.ops.render.render(write_still=True)
report={'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in models),'meshes':len(models),'bytes':os.path.getsize(os.path.join(OUT,'hero.glb')),'camera':{'position':[0,9,28],'target':[0,1,-1.5],'width':27},'portals':{name:[xy[0],.55,-xy[1]] for name,xy,h,w in portals}}
open(os.path.join(ROOT,'report.json'),'w').write(json.dumps(report,indent=2)); print(report)
scene.render.resolution_x=720; scene.render.resolution_y=900; cam.data.ortho_scale=29; scene.render.filepath=os.path.join(ROOT,'mobile.png'); bpy.ops.render.render(write_still=True)

