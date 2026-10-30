import bpy, math, os, json, bmesh
from mathutils import Vector
from mathutils.geometry import tessellate_polygon
ROOT=os.path.dirname(os.path.abspath(__file__))
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def mat(name,col,rough):
 m=bpy.data.materials.new(name);m.use_nodes=True;p=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');p.inputs['Base Color'].default_value=(*col,1);p.inputs['Roughness'].default_value=rough;return m
stone=mat('Ivory mineral - measured rock microdetail',(.78,.73,.65),.8)
n=stone.node_tree.nodes;l=stone.node_tree.links;p=next(x for x in n if x.type=='BSDF_PRINCIPLED')
tex=n.new('ShaderNodeTexCoord');mapping=n.new('ShaderNodeVectorMath');mapping.operation='SCALE';mapping.inputs[3].default_value=.65;l.new(tex.outputs['Object'],mapping.inputs[0])
for filename,kind in [('nor_gl.jpg','normal'),('Rough.jpg','rough'),('Diffuse.jpg','color')]:
 t=n.new('ShaderNodeTexImage');t.image=bpy.data.images.load(ROOT+'/textures/'+filename);t.projection='BOX';t.projection_blend=.25;l.new(mapping.outputs[0],t.inputs['Vector'])
 if kind=='normal':
  t.image.colorspace_settings.name='Non-Color';b=n.new('ShaderNodeNormalMap');b.inputs['Strength'].default_value=.26;l.new(t.outputs['Color'],b.inputs['Color']);l.new(b.outputs[0],p.inputs['Normal'])
 elif kind=='rough':
  t.image.colorspace_settings.name='Non-Color';r=n.new('ShaderNodeMapRange');r.inputs['To Min'].default_value=.64;r.inputs['To Max'].default_value=.9;l.new(t.outputs[0],r.inputs[0]);l.new(r.outputs[0],p.inputs['Roughness'])
 else:
  r=n.new('ShaderNodeValToRGB');r.color_ramp.elements[0].position=.15;r.color_ramp.elements[0].color=(.50,.455,.38,1);r.color_ramp.elements[1].position=.7;r.color_ramp.elements[1].color=(.84,.79,.7,1);l.new(t.outputs[0],r.inputs[0]);l.new(r.outputs[0],p.inputs['Base Color'])
violet=mat('Violet satin inset',(.075,.0005,.46),.34);p=next(n for n in violet.node_tree.nodes if n.type=='BSDF_PRINCIPLED');p.inputs['Emission Color'].default_value=(.22,.018,.8,1);p.inputs['Emission Strength'].default_value=.1
noise=violet.node_tree.nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=6;b=violet.node_tree.nodes.new('ShaderNodeBump');b.inputs['Strength'].default_value=.12;b.inputs['Distance'].default_value=.015;violet.node_tree.links.new(noise.outputs['Fac'],b.inputs['Height']);violet.node_tree.links.new(b.outputs[0],p.inputs['Normal'])
def mesh(name,v,f,m,bevel=.02):
 me=bpy.data.meshes.new(name);me.from_pydata(v,[],f);me.update();o=bpy.data.objects.new(name,me);bpy.context.collection.objects.link(o);o.data.materials.append(m)
 if bevel:
  q=o.modifiers.new('Soft mineral arris','BEVEL');q.width=bevel;q.segments=3;q.limit_method='ANGLE';q.angle_limit=.4
  q=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
 return o
# Left portal reference: 4.8 m wide / 3.05 m high, 1.0 m thick. Continuous single arch wall.
w=4.8;h=3.05;r=.9;stem=1.5;base=.42;depth=1.0
outline=[(-w/2,0),(-w/2,h),(w/2,h),(w/2,0),(r,0),(r,stem)]+[(r*math.cos(math.pi*i/64),stem+r*math.sin(math.pi*i/64)) for i in range(1,65)]+[(-r,0)]
L=len(outline);v=[(x,y,z+base) for y in [-depth/2,depth/2] for x,z in outline];coords=[Vector((x,z,0)) for x,z in outline];lookup={tuple(v):i for i,v in enumerate(coords)};tri=tessellate_polygon([coords]);faces=[]
for t in tri:
 ids=[v if isinstance(v,int) else lookup[tuple(v)] for v in t];faces.extend([tuple(reversed(ids)),tuple(i+L for i in ids)])
faces += [(i,(i+1)%L,(i+1)%L+L,i+L) for i in range(L)]
o=mesh('Single limestone arch',v,faces,stone,.018);o.data.materials.append(violet)
for i in range(4,L-1):o.data.polygons[len(tri)*2+i].material_index=1
# short curving ribbon, full solid side walls with white shoulders
centers=[]
for i in range(161):
 t=i/160;y=1.2-8*t;x=2.3*t*t-1.4*math.sin(t*math.pi);centers.append(Vector((x,y,0)))
def ribbon(name,width,z,bottom,m):
 vs=[]
 for i,c in enumerate(centers):
  tangent=(centers[min(i+1,160)]-centers[max(i-1,0)]).normalized();side=Vector((-tangent.y,tangent.x,0))*width/2
  vs.extend([tuple(c-side+Vector((0,0,bottom))),tuple(c+side+Vector((0,0,bottom))),tuple(c-side+Vector((0,0,z))),tuple(c+side+Vector((0,0,z)))])
 fs=[]
 for i in range(160):
  a=i*4;fs += [(a+2,a+3,a+7,a+6),(a,a+4,a+6,a+2),(a+1,a+3,a+7,a+5)]
 fs += [(0,2,3,1),(640,641,643,642)];return mesh(name,vs,fs,m,.012)
ribbon('Stone ribbon shoulders',2.12,.42,.0,stone);ribbon('Violet inset',1.82,.435,.40,violet)
bpy.ops.mesh.primitive_cylinder_add(vertices=128,radius=3.05,depth=.4,location=(0,.2,.2));o=bpy.context.object;o.name='Portal plinth';o.data.materials.append(stone);q=o.modifiers.new('Rounded plinth arris','BEVEL');q.width=.025;q.segments=3
# Real shared ground surface. Broad low relief, not a shadow-catcher composite.
bpy.ops.mesh.primitive_grid_add(x_subdivisions=160,y_subdivisions=160,size=200,location=(0,0,-.005));o=bpy.context.object;o.name='Continuous mineral ground';o.data.materials.append(stone)
for v in o.data.vertices:
 x,y=v.co.x,v.co.y;v.co.z += .035*math.sin(x*.9)*math.sin(y*.7)+.012*math.sin(x*3+y*2)
for f in o.data.polygons:f.use_smooth=True
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=96;scene.cycles.use_denoising=False;scene.cycles.max_bounces=8;scene.cycles.diffuse_bounces=4;scene.render.threads_mode='FIXED';scene.render.threads=8
world=scene.world;world.use_nodes=True;p=next(n for n in world.node_tree.nodes if n.type=='BACKGROUND');p.inputs[0].default_value=(.8,.84,1,1);p.inputs[1].default_value=1.4
nt=world.node_tree;bg=nt.nodes.new('ShaderNodeBackground');bg.inputs[0].default_value=(.93,.93,.955,1);bg.inputs[1].default_value=1;lp=nt.nodes.new('ShaderNodeLightPath');mix=nt.nodes.new('ShaderNodeMixShader');nt.links.new(lp.outputs['Is Camera Ray'],mix.inputs[0]);nt.links.new(p.outputs[0],mix.inputs[1]);nt.links.new(bg.outputs[0],mix.inputs[2]);out=next(n for n in nt.nodes if n.type=='OUTPUT_WORLD');nt.links.new(mix.outputs[0],out.inputs['Surface'])
def light(name,loc,target,power,size,color):
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.data.color=color;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
light('Large warm sky key',(-5,-4,9),(0,0,0),600,6,(1,.88,.75));light('Broad cool fill',(5,-1,6),(0,0,1),100,7,(.79,.83,1));light('Violet interior bounce',(0,.35,1.2),(0,-.8,.6),16,1.2,(.34,.06,1))
bpy.ops.object.camera_add(location=(-7.4,-13.8,5.15));cam=bpy.context.object;cam.name='Reference perspective';cam.rotation_euler=(Vector((0,-1.4,1.25))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.lens=49;scene.camera=cam
scene.render.resolution_x=1200;scene.render.resolution_y=900;scene.render.resolution_percentage=100;scene.render.film_transparent=False;scene.view_settings.view_transform='Standard';scene.view_settings.exposure=-.25
for ob in bpy.data.objects:
 if ob.type=='MESH':
  bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bmesh.ops.dissolve_limit(bm,angle_limit=.001,verts=list(bm.verts),edges=list(bm.edges),delimit={'MATERIAL'});bm.to_mesh(ob.data);bm.free()
for im in bpy.data.images:
 if im.source=='FILE':im.pack()
scene.render.filepath=ROOT+'/portal-proof';bpy.ops.wm.save_as_mainfile(filepath=ROOT+'/portal-artproof.blend')
print('Artproof scene saved. Render explicitly with bpy.ops.render.render(write_still=True).')





