"""Issue #47: localized, reproducible refinement of the authored scene.

blender -b --python design/scene-proof/blender/refine_scene.py -- --stage focus
blender -b --python design/scene-proof/blender/refine_scene.py -- --stage full --bake

The previous authoring geometry is retained. Geometry stays camera-locked;
this pass adds mineral finish, small edge radii, branched vegetation and soft light.
"""
import importlib.util
import json
import math
import os
import sys
import time

import bpy
import bmesh
import numpy as np
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('authored_base', os.path.join(HERE, 'build_scene.py'))
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.ARGS += ['--bake-gain', '1.02']
STAGE = base.arg('--stage', 'focus')
BAKE = '--bake' in base.ARGS
FOCUS = {'dest-development', 'path-development', 'path-bridge', 'stairs-w01-entry', 'stairs-dev', 'terraces-left', 'foliage'}
start = time.time()
objects, terrain = base.build()
base.setup_lighting()
base.setup_camera()


def mineral_finish():
    material = base.STONE.copy()
    material.name = 'refined-limestone'
    nodes, links = material.node_tree.nodes, material.node_tree.links
    bsdf = next(n for n in nodes if n.type == 'BSDF_PRINCIPLED')
    noises = [n for n in nodes if n.bl_idname == 'ShaderNodeTexNoise']
    noises[0].inputs['Scale'].default_value = 2.8
    noises[0].inputs['Detail'].default_value = 4.0
    noises[0].inputs['Roughness'].default_value = 0.55
    noises[1].inputs['Scale'].default_value = 46
    noises[1].inputs['Detail'].default_value = 3.0
    ramp = next(n for n in nodes if n.bl_idname == 'ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].color = (*base.srgb_to_lin((.878, .846, .824)), 1)
    ramp.color_ramp.elements[1].color = (*base.srgb_to_lin((.964, .944, .926)), 1)
    ramp.color_ramp.elements[0].position = .20
    ramp.color_ramp.elements[1].position = .82
    bump = next(n for n in nodes if n.bl_idname == 'ShaderNodeBump')
    bump.inputs['Strength'].default_value = .16
    bump.inputs['Distance'].default_value = .018
    # Cycles bevel shader rounds architectural edges during both camera renders and atlas baking
    # without generating sub-pixel geometry slivers that miss UV texel centers.
    bevel_node = nodes.new('ShaderNodeBevel')
    bevel_node.samples = 4
    bevel_node.inputs['Radius'].default_value = 0.016
    links.new(bevel_node.outputs['Normal'], bump.inputs['Normal'])
    rough = nodes.new('ShaderNodeMapRange')
    rough.inputs['From Min'].default_value = .15
    rough.inputs['From Max'].default_value = .85
    rough.inputs['To Min'].default_value = .82
    rough.inputs['To Max'].default_value = .97
    links.new(noises[0].outputs['Fac'], rough.inputs['Value'])
    links.new(rough.outputs['Result'], bsdf.inputs['Roughness'])
    bsdf.inputs['Specular IOR Level'].default_value = .14
    base.ALL_MATS.append(material)
    return material


def soften_edges(obj, radius=.010):
    """Preserve outward normals and clean quad topology while smoothing curved strips."""
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.shade_smooth_by_angle(angle=math.radians(34))


stone = mineral_finish()
for obj in objects:
    if STAGE == 'full' or obj.name in FOCUS:
        for slot in obj.material_slots:
            if slot.material == base.STONE:
                slot.material = stone
        if obj.name.startswith(('dest-', 'stairs-', 'terraces-', 'mass-', 'viaduct', 'props')):
            soften_edges(obj, .007 if obj.name.startswith('stairs-') else .010)


def area(name, position, target, energy, size, color):
    data = bpy.data.lights.new(name, 'AREA')
    data.energy, data.shape, data.size = energy, 'DISK', size
    data.color = color
    obj = bpy.data.objects.new(name, data)
    base.coll.objects.link(obj)
    obj.location = base.P(position)
    obj.rotation_euler = (base.P(target) - obj.location).to_track_quat('-Z', 'Y').to_euler()


def point_light(name, position, energy, radius, color):
    data = bpy.data.lights.new(name, 'POINT')
    data.energy = energy
    data.shadow_soft_size = radius
    data.color = color
    obj = bpy.data.objects.new(name, data)
    base.coll.objects.link(obj)
    obj.location = base.P(position)


sun = bpy.data.lights['sun']
sun.energy = 2.22
sun.angle = math.radians(6.2)
sun.color = (1.0, .95, .89)
next(n for n in base.scene.world.node_tree.nodes if n.type == 'BACKGROUND').inputs['Strength'].default_value = .42
area('large-soft-key', (-12, 17, 16), (0, 1, 7), 280, 18, (1.0, .95, .89))
area('cool-fill', (12, 12, 11), (0, 2, 6), 90, 22, (.90, .93, 1.0))

# Localized portal lights placed inside the lower chamber of W01, W02, W03 so arch crowns remain deep RUON #6534D8
w01_fl = base.atpx(148, 626, 2.30)
w01_fr = base.atpx(312, 608, 2.30)
w01_depth = base.atpx(73, 510, 2.30) - base.atpx(148, 522, 2.30)
w01_portal = base.wall_pt(224, 596, w01_fl, 148, 626, w01_fr, 312, 608) + w01_depth * 0.34
point_light('portal-w01', w01_portal, 18.0, 0.24, (0.96, 0.90, 1.0))
point_light('portal-w02', base.atpx(766, 488, 3.40) + np.array([0.0, 0.0, -0.22]), 11.0, 0.24, (0.95, 0.88, 1.0))
point_light('portal-w03', base.atpx(1258, 560, 4.18), 11.0, 0.30, (0.95, 0.88, 1.0))


def replace_foliage():
    old = bpy.data.objects.get('foliage')
    old_mesh = old.data
    objects.remove(old)
    bpy.data.objects.remove(old, do_unlink=True)
    bpy.data.meshes.remove(old_mesh, do_unlink=True)
    bm = bmesh.new()
    rng = np.random.default_rng(47)

    def branch(a, b, radius):
        delta = base.P(b - a)
        if delta.length < 1e-4:
            return
        result = bmesh.ops.create_cone(bm, cap_ends=True, segments=6, radius1=radius,
                                       radius2=radius * .42, depth=delta.length)
        rotation = Vector((0, 0, 1)).rotation_difference(delta.normalized()).to_matrix()
        bmesh.ops.rotate(bm, cent=(0, 0, 0), matrix=rotation, verts=result['verts'])
        bmesh.ops.translate(bm, vec=base.P((a + b) * .5), verts=result['verts'])

    for px, py, h, radius in [(334, 580, 2.28, .56), (362, 574, 2.34, .64), (388, 588, 2.24, .50), (406, 598, 2.18, .40),
                              (852, 446, 2.98, .60), (876, 440, 3.04, .54), (892, 454, 2.94, .44)]:
        center = base.atpx(px, py, h)
        root = center - np.array([0, radius * .78, 0])
        crown = center + np.array([.03, radius * .32, .02])
        branch(root, crown, .045)
        for i in range(12):
            angle = i * 2.39996
            spread = radius * (.38 + .48 * ((i % 4) / 3.0))
            tip = center + np.array([math.cos(angle) * spread,
                                    radius * (.06 + .68 * ((i + 1) % 3) / 2.0),
                                    math.sin(angle) * spread * .68])
            branch(center - np.array([0, radius * .26, 0]), tip, .018)
            leaves = bmesh.ops.create_icosphere(bm, subdivisions=1, radius=radius * rng.uniform(.22, .32))
            bmesh.ops.scale(bm, vec=(1.30, .78, .85), verts=leaves['verts'])
            bmesh.ops.translate(bm, vec=base.P(tip), verts=leaves['verts'])
    for face in bm.faces:
        face.material_index = 5
    objects.append(base.to_obj('foliage', bm))


replace_foliage()
if STAGE == 'full':
    # Preserve ridge silhouette while breaking planar low-poly facets internally.
    mountains = bpy.data.objects['mountains']
    bm = bmesh.new()
    bm.from_mesh(mountains.data)
    interior = [edge for edge in bm.edges if len(edge.link_faces) == 2]
    bmesh.ops.subdivide_edges(bm, edges=interior, cuts=2, use_grid_fill=True)
    for vertex in bm.verts:
        if not vertex.is_boundary:
            vertex.co.z += .045 * math.sin(vertex.co.x * 8 + vertex.co.y * 2) * math.cos(vertex.co.y * 5)
    bm.to_mesh(mountains.data)
    bm.free()

# Ground remains one mesh. Small strata follow the architecture without moving
# foundations or introducing an independent plane beneath every object.
for vertex in terrain.data.vertices:
    x, y, z = vertex.co
    weight = math.exp(-((x + 10) / 8) ** 2 - ((y + 9) / 9) ** 2)
    if STAGE == 'full':
        weight = max(weight, .4 * math.exp(-((y + 10) / 12) ** 2))
    vertex.co.z += weight * (.045 * math.sin(x * 1.8 + y * .7) + .025 * math.sin(x * 4.5 - y * 1.9))

base.scene.render.engine = 'CYCLES'
base.scene.cycles.use_denoising = False  # OIDN exceeded memory on this 8 GB host.
base.scene.view_settings.view_transform = 'Standard'
base.scene.view_settings.look = 'None'
blend_path = os.path.join(base.OUT_DIR, 'refined-landscape.blend')

# Explicit equivalent of the source render helper, with consistent color management.
base.scene.cycles.samples = int(base.arg('--samples', '48'))
base.scene.render.resolution_x, base.scene.render.resolution_y = base.REF_W, base.REF_H
base.scene.render.resolution_percentage = 100
crop = '--crop' in base.ARGS
if crop:
    base.scene.render.use_border = True
    base.scene.render.use_crop_to_border = True
    base.scene.render.border_min_x, base.scene.render.border_max_x = 40 / base.REF_W, 550 / base.REF_W
    base.scene.render.border_min_y, base.scene.render.border_max_y = 1 - 940 / base.REF_H, 1 - 480 / base.REF_H
base.scene.render.filepath = os.path.join(base.OUT_DIR, f'refinement-{STAGE}{"-crop" if crop else ""}.png')
base.scene.render.image_settings.file_format = 'PNG'
bpy.ops.wm.save_as_mainfile(filepath=blend_path)
if '--skip-render' not in base.ARGS:
    bpy.ops.render.render(write_still=True)

if BAKE:
    base.bake_and_export(objects, terrain)

with open(os.path.join(base.OUT_DIR, f'refinement-{STAGE}.json'), 'w') as stream:
    json.dump({'issue': 47, 'stage': STAGE, 'source': 'build_scene.py at 440f2e3',
               'blender': bpy.app.version_string, 'elapsed_seconds': time.time() - start,
               'focus': sorted(FOCUS), 'geometry_objects': len(objects) + 1,
               'baked': BAKE, 'renderer': 'Cycles CPU', 'view_transform': 'Standard'}, stream, indent=2)
