"""Authored T01 landscape for the portfolio hero (Blender 4.5, headless).

Usage (from the repository root):
  blender --background --python design/scene-proof/blender/build_scene.py -- --mode preview
  blender --background --python design/scene-proof/blender/build_scene.py -- --mode bake

Camera-ray-locked reconstruction from the approved desktop reference (1433x1098).
Every horizontal contour at elevation `h` is placed via `atpx(px, py, h)` and every
vertical drop of `dy_px` screen pixels uses `KY = (VIEW_H / REF_H) / cos(EL)`, so
screen guides inform the orthographic projection. They do not prove hidden
geometry or exact fidelity to `docs/design-transition/assets/approved-desktop.png`.
"""
import bpy, bmesh, math, os, sys, json, time
import numpy as np
from mathutils import Vector, Matrix

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def arg(name, default=None):
    return ARGS[ARGS.index(name) + 1] if name in ARGS else default

MODE = arg('--mode', 'preview')
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
OUT_DIR = os.path.join(ROOT, 'design', 'scene-proof', 'blender', 'out')
os.makedirs(OUT_DIR, exist_ok=True)

REF_W, REF_H = 1433, 1098
VIEW_W = 36.0
VIEW_H = VIEW_W * REF_H / REF_W
EL = math.atan2(16, 28)
SIN_EL, COS_EL = math.sin(EL), math.cos(EL)
TAN_EL = 16.0 / 28.0
PX_W = VIEW_W / REF_W
PX_H = VIEW_H / REF_H
KY = PX_H / COS_EL  # world Y per screen pixel at fixed (X, Z)

BG = (0xF7 / 255, 0xF7 / 255, 0xFA / 255)
VIOLET = (0x65 / 255, 0x34 / 255, 0xD8 / 255)
DEEP_VIOLET = (0x43 / 255, 0x1E / 255, 0xA8 / 255)


def atpx(x, y, h=0.0):
    """Reference pixel (x, y) + world height h -> three-space (X, Y, Z)."""
    sy = (0.5 - y / REF_H) * VIEW_H
    return np.array([(x / REF_W - 0.5) * VIEW_W, float(h), (h * COS_EL - sy) / SIN_EL])


def drop_py(p_top, py_top, py_bot):
    """Point directly below/above `p_top` (same X, Z) that projects to screen y `py_bot`."""
    return np.array([p_top[0], p_top[1] - (py_bot - py_top) * KY, p_top[2]])


def wall_pt(px, py, A, pxA, pyA, B, pxB, pyB):
    """Point on the vertical plane through 3D segment A->B that projects to pixel (px, py)."""
    t = (px - pxA) / (pxB - pxA) if abs(pxB - pxA) > 1e-6 else 0.0
    base = (1.0 - t) * A + t * B
    py_base = (1.0 - t) * pyA + t * pyB
    return np.array([base[0], base[1] + (py_base - py) * KY, base[2]])


def P(v):
    return Vector((float(v[0]), -float(v[2]), float(v[1])))


def srgb_to_lin(c):
    return tuple(((v + 0.055) / 1.055) ** 2.4 if v > 0.04045 else v / 12.92 for v in c)


# --------------------------------------------------------------------------- scene & materials
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
coll = scene.collection


def material(name, color, rough=0.95, emit=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (*srgb_to_lin(color), 1)
    bsdf.inputs['Roughness'].default_value = rough
    bsdf.inputs['Specular IOR Level'].default_value = 0.10
    if emit:
        bsdf.inputs['Emission Color'].default_value = (*srgb_to_lin(color), 1)
        bsdf.inputs['Emission Strength'].default_value = emit
    return m


def mineral(name, base, bump=0.06, tone=0.015, scale=1.2, ripple=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes['Principled BSDF']
    bsdf.inputs['Roughness'].default_value = 0.96
    bsdf.inputs['Specular IOR Level'].default_value = 0.06
    tc = nt.nodes.new('ShaderNodeTexCoord')
    big = nt.nodes.new('ShaderNodeTexNoise')
    big.inputs['Scale'].default_value = scale
    big.inputs['Detail'].default_value = 5
    big.inputs['Roughness'].default_value = 0.58
    fine = nt.nodes.new('ShaderNodeTexNoise')
    fine.inputs['Scale'].default_value = 32
    fine.inputs['Detail'].default_value = 6
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    lo = srgb_to_lin(tuple(v * (1 - tone * 2.2) for v in base))
    ramp.color_ramp.elements[0].color = (*lo, 1)
    ramp.color_ramp.elements[1].color = (*srgb_to_lin(base), 1)
    ramp.color_ramp.elements[0].position = 0.25
    ramp.color_ramp.elements[1].position = 0.72
    nt.links.new(tc.outputs['Object'], big.inputs['Vector'])
    nt.links.new(tc.outputs['Object'], fine.inputs['Vector'])
    nt.links.new(big.outputs['Fac'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])
    height = fine.outputs['Fac']
    if ripple:
        wave = nt.nodes.new('ShaderNodeTexWave')
        wave.inputs['Scale'].default_value = 2.6
        wave.inputs['Distortion'].default_value = 4.2
        wave.inputs['Detail'].default_value = 2
        nt.links.new(tc.outputs['Object'], wave.inputs['Vector'])
        mixh = nt.nodes.new('ShaderNodeMath')
        mixh.operation = 'MULTIPLY_ADD'
        mixh.inputs[1].default_value = ripple
        nt.links.new(wave.outputs['Fac'], mixh.inputs[0])
        nt.links.new(fine.outputs['Fac'], mixh.inputs[2])
        height = mixh.outputs['Value']
    bmp = nt.nodes.new('ShaderNodeBump')
    bmp.inputs['Strength'].default_value = bump
    bmp.inputs['Distance'].default_value = 0.04
    nt.links.new(height, bmp.inputs['Height'])
    nt.links.new(bmp.outputs['Normal'], bsdf.inputs['Normal'])
    return m


STONE = mineral('stone', (0.958, 0.940, 0.922), bump=0.075, tone=0.018, scale=1.35)
VIOLET_M = material('violet', VIOLET, 0.74, 0.14)
INNER = material('violet_inner', VIOLET, 0.86, 0.16)
INNER_DARK = material('violet_deep', DEEP_VIOLET, 0.88, 0.10)
INNER_GLOW = material('violet_glow', (0.58, 0.38, 0.94), 0.82, 0.24)
TERRAIN = mineral('terrain', (0.984, 0.976, 0.968), bump=0.075, tone=0.012, scale=0.42, ripple=0.14)
FOLIAGE = mineral('foliage', (0.79, 0.73, 0.65), bump=0.24, tone=0.06, scale=4.5)

ALL_MATS = [STONE, INNER, VIOLET_M, INNER_DARK, INNER_GLOW, FOLIAGE]


def to_obj(name, bm, mats=None, merge_verts=True):
    if merge_verts:
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-4)
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    for m in (mats or ALL_MATS):
        mesh.materials.append(m)
    obj = bpy.data.objects.new(name, mesh)
    coll.objects.link(obj)
    return obj


def add_prism(bm, top_pts, bot_pts, mat_top=0, mat_side=0, mat_bot=0, cap_top=True, cap_bot=True, side_mask=None):
    """Add a prism between two equal-length 3D vertex rings `top_pts` and `bot_pts` with guaranteed outward normals."""
    n = len(top_pts)
    vt = [bm.verts.new(P(p)) for p in top_pts]
    vb = [bm.verts.new(P(p)) for p in bot_pts]
    cent = Vector((0.0, 0.0, 0.0))
    for v in vt + vb:
        cent += v.co
    cent /= float(2 * n)

    created = []
    for i in range(n):
        if side_mask is not None and not side_mask[i]:
            continue
        j = (i + 1) % n
        ms = mat_side[i] if isinstance(mat_side, (list, tuple)) else mat_side
        try:
            f = bm.faces.new([vt[i], vb[i], vb[j], vt[j]])
            f.material_index = ms
            created.append(f)
        except ValueError:
            pass
    if cap_top and n >= 3:
        try:
            ft = bm.faces.new(vt)
            ft.material_index = mat_top
            created.append(ft)
        except ValueError:
            pass
    if cap_bot and n >= 3:
        try:
            fb = bm.faces.new(list(reversed(vb)))
            fb.material_index = mat_bot
            created.append(fb)
        except ValueError:
            pass
    for f in created:
        f.normal_update()
        if f.normal.dot(f.calc_center_median() - cent) < 0.0:
            f.normal_flip()


def add_box_3d(bm, c, w, h, d, yaw=0.0, mat=0):
    t = bmesh.new()
    bmesh.ops.create_cube(t, size=1.0)
    bmesh.ops.scale(t, vec=(w, d, h), verts=t.verts)
    if yaw:
        bmesh.ops.rotate(t, cent=(0, 0, 0), matrix=Matrix.Rotation(yaw, 3, 'Z'), verts=t.verts)
    bmesh.ops.translate(t, vec=P(c), verts=t.verts)
    for f in t.faces:
        f.material_index = mat
    me = bpy.data.meshes.new('tmp')
    t.to_mesh(me)
    t.free()
    bm.from_mesh(me)
    bpy.data.meshes.remove(me)


# --------------------------------------------------------------------------- paths
def catmull_rom(points, per_seg=20, alpha=0.5):
    pts = [np.array(p, float) for p in points]
    pts = [2 * pts[0] - pts[1]] + pts + [2 * pts[-1] - pts[-2]]
    out = []
    for i in range(1, len(pts) - 2):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[i + 1], pts[i + 2]
        t0 = 0.0
        t1 = t0 + max(np.linalg.norm(p1 - p0), 1e-4) ** alpha
        t2 = t1 + max(np.linalg.norm(p2 - p1), 1e-4) ** alpha
        t3 = t2 + max(np.linalg.norm(p3 - p2), 1e-4) ** alpha
        for t in np.linspace(t1, t2, per_seg, endpoint=False):
            a1 = (t1 - t) / (t1 - t0) * p0 + (t - t0) / (t1 - t0) * p1
            a2 = (t2 - t) / (t2 - t1) * p1 + (t - t1) / (t2 - t1) * p2
            a3 = (t3 - t) / (t3 - t2) * p2 + (t - t2) / (t3 - t2) * p3
            b1 = (t2 - t) / (t2 - t0) * a1 + (t - t0) / (t2 - t0) * a2
            b2 = (t3 - t) / (t3 - t1) * a2 + (t - t1) / (t3 - t1) * a3
            out.append((t2 - t) / (t2 - t1) * b1 + (t - t1) / (t2 - t1) * b2)
    out.append(pts[-2])
    return np.array(out)


def smooth_2d_rail(xy, passes=8):
    arr = np.array(xy, float)
    for _ in range(passes):
        nxt = arr.copy()
        nxt[1:-1] = 0.25 * arr[:-2] + 0.50 * arr[1:-1] + 0.25 * arr[2:]
        arr = nxt
    return arr


def untangle_rail_2d(px_arr, py_arr, center_px, center_py, passes=24):
    """Ensure offset rails never retrograde (loop backward) around tight inner bends."""
    xy = np.stack([px_arr, py_arr], axis=1)
    n = len(xy)
    for _ in range(passes):
        changed = False
        for i in range(1, n - 1):
            tx = center_px[min(i + 2, n - 1)] - center_px[max(i - 2, 0)]
            ty = center_py[min(i + 2, n - 1)] - center_py[max(i - 2, 0)]
            vx = xy[i + 1, 0] - xy[i - 1, 0]
            vy = xy[i + 1, 1] - xy[i - 1, 1]
            # If the rail step reverses or pinches relative to the centerline tangent, relax it
            if vx * tx + vy * ty < 0.15 * (tx * tx + ty * ty):
                xy[i] = 0.35 * xy[i - 1] + 0.30 * xy[i] + 0.35 * xy[i + 1]
                changed = True
        if not changed:
            break
    return smooth_2d_rail(xy, passes=10)


def sweep_ribbon_px(name, ctrl, wall_px=11.0, wall_h_px=8.5, per_seg=18, taper_start=0, taper_end=0, open_start=0):
    """Sweep a violet road + left/right white parapets + vertical retaining wall in screen-consistent space."""
    samples = catmull_rom(ctrl, per_seg=per_seg)
    samples[:, :2] = smooth_2d_rail(samples[:, :2], passes=4)
    n = len(samples)
    bm = bmesh.new()
    floor_idx = 4

    raw_px = np.zeros((n, 10))
    raw_py = np.zeros((n, 10))
    raw_h = np.zeros((n, 10))
    raw_v = np.zeros((n, 10))

    for i in range(n):
        px, py, h, hw, dl, dr = samples[i]
        i0 = max(i - 5, 0)
        i1 = min(i + 5, n - 1)
        tx, ty = samples[i1][0] - samples[i0][0], samples[i1][1] - samples[i0][1]
        L = math.hypot(tx, ty) or 1.0
        tx, ty = tx / L, ty / L
        nx, ny = -ty, tx

        t_scale = 1.0
        if taper_start > 0 and i < taper_start:
            t_scale = max(0.08, i / float(taper_start))
        if taper_end > 0 and (n - 1 - i) < taper_end:
            t_scale = min(t_scale, max(0.08, (n - 1 - i) / float(taper_end)))

        wh = wall_h_px * t_scale
        wp = wall_px * (0.45 + 0.55 * t_scale)
        r = wp * 0.42
        outer = hw + wp
        prof = [
            (-outer, -dl),
            (-outer, wh - r),
            (-(hw + r * 0.7), wh),
            (-hw, wh - r),
            (-hw, 0.0),
            (hw, 0.0),
            (hw, wh - r),
            (hw + r * 0.7, wh),
            (outer, wh - r),
            (outer, -dr),
        ]
        for j, (u_px, v_px) in enumerate(prof):
            raw_px[i, j] = px + nx * u_px
            raw_py[i, j] = py + ny * u_px * 0.58
            raw_h[i, j] = h
            raw_v[i, j] = v_px

    # Untangle and co-smooth outer/inner rail bounds, then interpolate parapet crests strictly between them
    for j in (1, 3, 4, 5, 6, 8):
        sm = untangle_rail_2d(raw_px[:, j], raw_py[:, j], samples[:, 0], samples[:, 1], passes=48)
        raw_px[:, j] = sm[:, 0]
        raw_py[:, j] = sm[:, 1]
    raw_px[:, 2] = 0.35 * raw_px[:, 1] + 0.65 * raw_px[:, 3]
    raw_py[:, 2] = 0.35 * raw_py[:, 1] + 0.65 * raw_py[:, 3]
    raw_px[:, 7] = 0.65 * raw_px[:, 6] + 0.35 * raw_px[:, 8]
    raw_py[:, 7] = 0.65 * raw_py[:, 6] + 0.35 * raw_py[:, 8]
    # Keep bottom retaining wall vertices strictly aligned under top outer wall vertices
    raw_px[:, 0], raw_py[:, 0] = raw_px[:, 1], raw_py[:, 1]
    raw_px[:, 9], raw_py[:, 9] = raw_px[:, 8], raw_py[:, 8]

    rings = []
    for i in range(n):
        ring = []
        for j in range(10):
            p = atpx(raw_px[i, j], raw_py[i, j], raw_h[i, j])
            p[1] += raw_v[i, j] * KY
            ring.append(bm.verts.new(P(p)))
        rings.append(ring)

    m = 10
    floor_faces = []
    for i in range(n - 1):
        for j in range(m):
            if i < open_start and j != floor_idx:
                continue
            k = (j + 1) % m
            f = bm.faces.new([rings[i][j], rings[i][k], rings[i + 1][k], rings[i + 1][j]])
            f.material_index = 2 if j == floor_idx else 0
            if j == floor_idx:
                floor_faces.append(f)
    for ring in ([rings[0]] if not open_start else []) + [list(reversed(rings[-1]))]:
        bm.faces.new(ring)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if floor_faces:
        floor_faces[0].normal_update()
        if floor_faces[0].normal.z < 0.0:
            for f in bm.faces:
                f.normal_flip()
    return to_obj(name, bm)


# --------------------------------------------------------------------------- terrain & faceted mountains
TERRAIN_BOUNDS = (-24.0, 24.0, -5.0, 30.0)


def terrain_height(x, z):
    if z >= -1.8:
        base = -0.68
    else:
        base = -0.68 + (z - (-1.8)) * (TAN_EL + 0.08)
    ripples = 0.09 * math.sin(x * 0.27 + z * 0.18) + 0.05 * math.cos(x * 0.48 - z * 0.29)
    emb = atpx(522, 718, 0.0)
    dune = 1.25 * math.exp(-(((x - emb[0]) / 2.6) ** 2 + ((z - emb[2]) / 2.4) ** 2))
    return base + ripples + dune


def build_terrain():
    x0, x1, z0, z1 = TERRAIN_BOUNDS
    nx, nz = 120, 112
    bm = bmesh.new()
    grid = []
    for j in range(nz + 1):
        row = []
        for i in range(nx + 1):
            x = x0 + (x1 - x0) * i / nx
            z = z0 + (z1 - z0) * j / nz
            row.append(bm.verts.new(P((x, terrain_height(x, z), z))))
        grid.append(row)
    for j in range(nz):
        for i in range(nx):
            f = bm.faces.new([grid[j][i], grid[j + 1][i], grid[j + 1][i + 1], grid[j][i + 1]])
            f.normal_update()
            if f.normal.z < 0.0:
                f.normal_flip()
    return to_obj('terrain', bm, [TERRAIN])


def build_mountains():
    """Continuous faceted desert mountain range locked to the exact horizon & ridge pixels of `ref_grid.png`."""
    bm = bmesh.new()
    h_back = -1.95
    h_Ridge = -1.45
    h_front = -0.95
    cam_dir = Vector(P((0, 16, 28))).normalized()

    def add_peak(px_L, py_L, px_TL, py_TL, px_TR, py_TR, px_R, py_R, px_S, py_S, py_skirt=585.0):
        # Mid-slope control points for richer desert ridge faceting
        px_mL, py_mL = 0.55 * px_L + 0.45 * px_TL - 8.0, 0.55 * py_L + 0.45 * py_TL + 4.0
        px_mR, py_mR = 0.55 * px_R + 0.45 * px_TR + 8.0, 0.55 * py_R + 0.45 * py_TR + 4.0
        px_mS, py_mS = 0.48 * px_TL + 0.52 * px_S - 6.0, 0.48 * py_TL + 0.52 * py_S

        vL = bm.verts.new(P(atpx(px_L, py_L, h_back)))
        vmL = bm.verts.new(P(atpx(px_mL, py_mL, 0.5 * (h_back + h_Ridge) + 0.08)))
        vTL = bm.verts.new(P(atpx(px_TL, py_TL, h_Ridge)))
        vTR = bm.verts.new(P(atpx(px_TR, py_TR, h_Ridge)))
        vmR = bm.verts.new(P(atpx(px_mR, py_mR, 0.5 * (h_back + h_Ridge) - 0.06)))
        vR = bm.verts.new(P(atpx(px_R, py_R, h_back)))
        vmS = bm.verts.new(P(atpx(px_mS, py_mS, 0.5 * (h_Ridge + h_front) + 0.12)))
        vS = bm.verts.new(P(atpx(px_S, py_S, h_front)))
        vBL = bm.verts.new(P(drop_py(atpx(px_L, py_L, h_back), py_L, py_skirt)))
        vBS = bm.verts.new(P(drop_py(atpx(px_S, py_S, h_front), py_S, py_skirt)))
        vBR = bm.verts.new(P(drop_py(atpx(px_R, py_R, h_back), py_R, py_skirt)))

        for tri in [
            (vL, vS, vmS), (vL, vmS, vmL), (vmL, vmS, vTL),
            (vTL, vmS, vTR), (vTR, vmS, vS),
            (vTR, vS, vmR), (vmR, vS, vR),
            (vL, vBL, vBS, vS), (vS, vBS, vBR, vR),
        ]:
            f = bm.faces.new(tri)
            f.material_index = 0
            f.normal_update()
            if f.normal.dot(cam_dir) < 0.0:
                f.normal_flip()

    # Connected peaks across the full horizon (-45..1485) locked to `edges_on_ref.png`:
    add_peak(-45, 542, 28, 514, 45, 516, 128, 538, 48, 562)
    add_peak(115, 532, 228, 482, 244, 484, 305, 520, 222, 548)
    add_peak(285, 522, 348, 484, 360, 486, 405, 516, 342, 548)
    add_peak(368, 520, 426, 470, 436, 472, 495, 512, 418, 550)
    add_peak(465, 524, 562, 436, 594, 438, 675, 496, 518, 556)
    add_peak(875, 518, 968, 496, 995, 498, 1155, 544, 965, 558)
    add_peak(1125, 542, 1245, 522, 1275, 524, 1365, 542, 1255, 562)
    add_peak(1340, 545, 1430, 496, 1455, 494, 1485, 532, 1410, 562)

    return to_obj('mountains', bm)


# --------------------------------------------------------------------------- architectural helpers
def build_ellipse_drum(bm, cx, cy_top, rx, ry, h_top, wall_px, a0=0.0, a1=math.pi * 2, segs=64, mat=0):
    """Cylindrical/elliptical drum whose top rim projects to (cx + rx*cos a, cy_top + ry*sin a)."""
    angles = np.linspace(a0, a1, segs, endpoint=(abs(a1 - a0 - math.pi * 2) > 1e-3))
    top_pts, bot_pts = [], []
    for a in angles:
        px = cx + rx * math.cos(a)
        py = cy_top + ry * math.sin(a)
        pt = atpx(px, py, h_top)
        pb = drop_py(pt, py, py + wall_px)
        top_pts.append(pt)
        bot_pts.append(pb)
    add_prism(bm, top_pts, bot_pts, mat_top=mat, mat_side=mat, mat_bot=mat)


def build_terrace_poly(bm, poly_px, h_top, drop_px, mat=0):
    """Flat horizontal polygon defined by screen pixels [(px, py), ...] at height h_top, extruded down by drop_px."""
    top_pts = [atpx(px, py, h_top) for px, py in poly_px]
    bot_pts = [drop_py(p, py, py + drop_px) for p, (_, py) in zip(top_pts, poly_px)]
    add_prism(bm, top_pts, bot_pts, mat_top=mat, mat_side=mat, mat_bot=mat)


def build_ramp_wall(bm, crest_px_h, back_dx, back_dy, y_bot_fn, mat=0):
    """Build a continuous curved or sloped ramp wall without internal partition faces."""
    n = len(crest_px_h)
    for i in range(n - 1):
        px0, py0, h0 = crest_px_h[i]
        px1, py1, h1 = crest_px_h[i + 1]
        yb0, yb1 = y_bot_fn(px0), y_bot_fn(px1)
        f_t0 = atpx(px0, py0, h0)
        f_t1 = atpx(px1, py1, h1)
        b_t0 = atpx(px0 + back_dx, py0 + back_dy, h0)
        b_t1 = atpx(px1 + back_dx, py1 + back_dy, h1)
        f_b0 = drop_py(f_t0, py0, yb0)
        f_b1 = drop_py(f_t1, py1, yb1)
        b_b0 = drop_py(b_t0, py0 + back_dy, yb0 + back_dy)
        b_b1 = drop_py(b_t1, py1 + back_dy, yb1 + back_dy)
        mask = [True, (i == n - 2), True, (i == 0)]
        add_prism(bm, [f_t0, f_t1, b_t1, b_t0], [f_b0, f_b1, b_b1, b_b0],
                  mat_top=mat, mat_side=mat, mat_bot=mat, side_mask=mask)


def build_stairs_px(name, fl_px, fr_px, bl_px, br_px, h_bot, h_top, steps=10, drop_base_px=45.0, y_ground=None):
    """Watertight 2-manifold stepped prism staircase with zero buried/overlapping riser faces."""
    bm = bmesh.new()
    fl, fr, bl, br = map(lambda p: np.array(p, float), (fl_px, fr_px, bl_px, br_px))
    L0, R0 = atpx(fl[0], fl[1], h_bot), atpx(fr[0], fr[1], h_bot)
    L1, R1 = atpx(bl[0], bl[1], h_top), atpx(br[0], br[1], h_top)

    def station_xz(k):
        t = k / float(steps)
        pL = (1.0 - t) * L0 + t * L1
        pR = (1.0 - t) * R0 + t * R1
        pyL = (1.0 - t) * fl[1] + t * bl[1]
        pyR = (1.0 - t) * fr[1] + t * br[1]
        h_k = h_bot + (h_top - h_bot) * t
        if y_ground is not None:
            ybL = min(h_k - 0.08, h_k - max(4.0, y_ground - pyL) * KY)
            ybR = min(h_k - 0.08, h_k - max(4.0, y_ground - pyR) * KY)
        else:
            ybL = h_k - max(8.0, drop_base_px * 0.55) * KY
            ybR = h_k - max(8.0, drop_base_px * 0.55) * KY
        return pL[0], pL[2], pR[0], pR[2], h_k, ybL, ybR

    st = [station_xz(k) for k in range(steps + 1)]
    v_bot_L, v_bot_R = [], []
    v_step_bot_L, v_step_bot_R = [], []
    v_step_top_L, v_step_top_R = [], []

    for k in range(steps + 1):
        xL, zL, xR, zR, h_k, ybL, ybR = st[k]
        v_bot_L.append(bm.verts.new(P((xL, ybL, zL))))
        v_bot_R.append(bm.verts.new(P((xR, ybR, zR))))
        v_step_bot_L.append(bm.verts.new(P((xL, h_k, zL))))
        v_step_bot_R.append(bm.verts.new(P((xR, h_k, zR))))
        if k < steps:
            h_next = st[k + 1][4]
            v_step_top_L.append(bm.verts.new(P((xL, h_next, zL))))
            v_step_top_R.append(bm.verts.new(P((xR, h_next, zR))))

    # Front base face below step 0
    bm.faces.new([v_bot_L[0], v_bot_R[0], v_step_bot_R[0], v_step_bot_L[0]])
    for i in range(steps):
        # Vertical riser i (strictly from h_i to h_{i+1}, never buried!)
        bm.faces.new([v_step_bot_L[i], v_step_bot_R[i], v_step_top_R[i], v_step_bot_L[i] if False else v_step_top_L[i]])
        # Horizontal tread i (from station i to station i+1 at h_{i+1})
        bm.faces.new([v_step_top_L[i], v_step_top_R[i], v_step_bot_R[i + 1], v_step_bot_L[i + 1]])
        # Left stringer quad for step i
        bm.faces.new([v_bot_L[i], v_step_bot_L[i], v_step_top_L[i], v_step_bot_L[i + 1], v_bot_L[i + 1]])
        # Right stringer quad for step i
        bm.faces.new([v_bot_R[i + 1], v_step_bot_R[i + 1], v_step_top_R[i], v_step_bot_R[i], v_bot_R[i]])
        # Bottom carriage quad
        bm.faces.new([v_bot_R[i], v_bot_L[i], v_bot_L[i + 1], v_bot_R[i + 1]])
    # Back wall at station `steps`
    bm.faces.new([v_bot_R[steps], v_bot_L[steps], v_step_bot_L[steps], v_step_bot_R[steps]])

    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return to_obj(name, bm)


def build_fin_stairs(name, x0, x1, y_base_fn, y_top_fn, h_base, depth_px=16.0, count=14):
    """Sculptural vertical-fin staircase where each fin's base steps in depth so every fin casts a crisp vertical shadow."""
    bm = bmesh.new()
    xs = np.linspace(x0, x1, count + 1)
    for i in range(count):
        step_w = xs[i + 1] - xs[i]
        xa, xb = xs[i], xs[i] + step_w * 0.68
        xm = 0.5 * (xa + xb)
        yt = y_top_fn(xm)
        yb = y_base_fn(xm)
        if yb <= yt + 2:
            continue
        h_fin = h_base + (count - 1 - i) * 0.045
        base_quad = [(xa, yb), (xb, yb), (xb + 3.5, yb - depth_px * 0.55), (xa + 3.5, yb - depth_px * 0.55)]
        bot_pts = [atpx(px, py, h_fin) for px, py in base_quad]
        top_pts = [drop_py(bp, py, yt - (yb - py)) for bp, (_, py) in zip(bot_pts, base_quad)]
        add_prism(bm, top_pts, bot_pts)
        # Recessed shadow riser filling the gap to the next fin
        if i < count - 1:
            g_xa, g_xb = xb, xs[i + 1]
            g_quad = [(g_xa, yb), (g_xb, yb), (g_xb + 2.0, yb - depth_px * 0.35), (g_xa + 2.0, yb - depth_px * 0.35)]
            g_bot = [atpx(px, py, h_fin - 0.14) for px, py in g_quad]
            g_top = [drop_py(bp, py, (yt + 3.0) - (yb - py)) for bp, (_, py) in zip(g_bot, g_quad)]
            add_prism(bm, g_top, g_bot)
    return to_obj(name, bm)


def build_arch_viaduct_wall(bm, x0, x1, y_top_fn, y_ground, arches, h_ref, dx_arch=-32.0, dy_arch=5.0, dh_back=-0.42, inner_mat=0):
    """Single-loop continuous viaduct wall with super-ellipse arches `(ax0, ax1, crown, y_bot_arch, power)`."""
    xs = [x0, x1]
    for ax0, ax1, *_ in arches:
        xs += list(np.linspace(ax0, ax1, 37))
    xs = sorted(set(x for x in xs if x0 <= x <= x1))

    def y_bot(x):
        for arch in arches:
            ax0, ax1, crown, spring = arch[:4]
            power = arch[4] if len(arch) > 4 else 2.0
            if ax0 <= x <= ax1:
                u = abs((x - 0.5 * (ax0 + ax1)) / (0.5 * (ax1 - ax0)))
                u = min(1.0, max(0.0, u))
                return spring - (spring - crown) * ((1.0 - u ** power) ** (1.0 / power))
        return y_ground

    n = len(xs) - 1
    for i in range(n):
        xa, xb = xs[i], xs[i + 1]
        if xb - xa < 0.05:
            continue
        xm = 0.5 * (xa + xb)
        yta, ytb = y_top_fn(xa), y_top_fn(xb)
        yba, ybb = max(yta + 5.0, y_bot(xa)), max(ytb + 5.0, y_bot(xb))
        in_arch = any(arch[0] <= xm <= arch[1] for arch in arches)

        f_ta = atpx(xa, yta, h_ref)
        f_tb = atpx(xb, ytb, h_ref)
        f_bb = drop_py(f_tb, ytb, ybb)
        f_ba = drop_py(f_ta, yta, yba)

        depth_vec = atpx(dx_arch, dy_arch, dh_back) - atpx(0.0, 0.0, 0.0)
        b_ta = f_ta + depth_vec
        b_tb = f_tb + depth_vec
        b_bb = f_bb + depth_vec
        b_ba = f_ba + depth_vec

        mask = [True, (i == n - 1), True, (i == 0)]
        add_prism(bm, [f_ta, f_tb, b_tb, b_ta], [f_ba, f_bb, b_bb, b_ba],
                  mat_top=0, mat_side=0, mat_bot=(inner_mat if in_arch else 0), side_mask=mask)


# --------------------------------------------------------------------------- W01, W02, W03
def build_w01():
    """W01 ('Desenvolvimento'): angled rectangular block at x=73..312, y=504..626 with arched doorway."""
    bm = bmesh.new()
    h_dev = 2.30
    FL = atpx(148, 626, h_dev)
    FR = atpx(312, 608, h_dev)
    depth_vec = atpx(73, 510, h_dev) - atpx(148, 522, h_dev)

    y_top_fn = lambda x: 522.0 + (504.0 - 522.0) * (x - 148.0) / (312.0 - 148.0)
    y_bot_fn = lambda x: 626.0 + (608.0 - 626.0) * (x - 148.0) / (312.0 - 148.0)

    def y_arch_w01(x):
        if x <= 240.0:
            u = max(0.0, min(1.0, (240.0 - x) / (240.0 - 172.0)))
            return 522.0 + 76.0 * (u ** 1.55)
        u = max(0.0, min(1.0, (x - 240.0) / (278.0 - 240.0)))
        return 558.0 - 36.0 * math.sqrt(max(0.0, 1.0 - u * u))

    def d_arch_ratio(x):
        if x <= 200.0:
            return 0.66
        if x <= 236.0:
            return 0.66 - 0.20 * (x - 200.0) / (236.0 - 200.0)
        return 0.46 + 0.18 * (x - 236.0) / (278.0 - 236.0)

    xs = [148.0] + list(np.linspace(172.0, 200.0, 7)[:-1]) + list(np.linspace(200.0, 236.0, 9)[:-1]) + list(np.linspace(236.0, 278.0, 10)) + [312.0]
    n = len(xs) - 1
    for i in range(n):
        xa, xb = xs[i], xs[i + 1]
        xm = 0.5 * (xa + xb)
        yta, ytb = y_top_fn(xa), y_top_fn(xb)
        yba_full, ybb_full = y_bot_fn(xa), y_bot_fn(xb)
        f_ta = wall_pt(xa, yta, FL, 148, 626, FR, 312, 608)
        f_tb = wall_pt(xb, ytb, FL, 148, 626, FR, 312, 608)
        f_bb_full = wall_pt(xb, ybb_full, FL, 148, 626, FR, 312, 608)
        f_ba_full = wall_pt(xa, yba_full, FL, 148, 626, FR, 312, 608)

        in_arch = 172.0 <= xm <= 278.0
        if in_arch:
            yba, ybb = y_arch_w01(xa), y_arch_w01(xb)
            f_ba = wall_pt(xa, yba, FL, 148, 626, FR, 312, 608)
            f_bb = wall_pt(xb, ybb, FL, 148, 626, FR, 312, 608)
            da = depth_vec * d_arch_ratio(xa)
            db = depth_vec * d_arch_ratio(xb)
            # Full-depth upper arch spandrel (no longitudinal roof split), soffit = INNER (1)
            add_prism(bm, [f_ta, f_tb, f_tb + depth_vec, f_ta + depth_vec],
                      [f_ba, f_bb, f_bb + depth_vec, f_ba + depth_vec],
                      mat_top=0, mat_side=0, mat_bot=1, side_mask=[True, False, True, False])
            # Lower 3-plane interior chamber wall strictly below y_arch_w01
            mat_i = 4 if (200.0 <= xm < 236.0) else 1
            f_ba_fl = wall_pt(xa, 614.0, FL, 148, 626, FR, 312, 608)
            f_bb_fl = wall_pt(xb, 614.0, FL, 148, 626, FR, 312, 608)
            add_prism(bm, [f_ba + da, f_bb + db, f_bb + depth_vec, f_ba + depth_vec],
                      [f_ba_fl + da, f_bb_fl + db, f_bb_fl + depth_vec, f_ba_fl + depth_vec],
                      mat_top=0, mat_side=[mat_i, 0, 0, 0], mat_bot=0,
                      cap_top=False, side_mask=[True, False, True, False])
        elif xm > 278.0:
            # Right pier split at arch springing (y=558) so the purple reveal only exists below the arch!
            f_ma = wall_pt(xa, 558.0, FL, 148, 626, FR, 312, 608)
            f_mb = wall_pt(xb, 558.0, FL, 148, 626, FR, 312, 608)
            is_right_pier = abs(xa - 278.0) < 0.5
            add_prism(bm, [f_ta, f_tb, f_tb + depth_vec, f_ta + depth_vec],
                      [f_ma, f_mb, f_mb + depth_vec, f_ma + depth_vec],
                      mat_top=0, mat_side=0, mat_bot=0, side_mask=[True, (i == n - 1), True, False])
            add_prism(bm, [f_ma, f_mb, f_mb + depth_vec, f_ma + depth_vec],
                      [f_ba_full, f_bb_full, f_bb_full + depth_vec, f_ba_full + depth_vec],
                      mat_top=0, mat_side=[0, 0, 0, 1 if is_right_pier else 0], mat_bot=0,
                      side_mask=[True, (i == n - 1), True, is_right_pier])
        else:
            # Left pier (148..172)
            add_prism(bm, [f_ta, f_tb, f_tb + depth_vec, f_ta + depth_vec],
                      [f_ba_full, f_bb_full, f_bb_full + depth_vec, f_ba_full + depth_vec],
                      mat_top=0, mat_side=0, mat_bot=0, side_mask=[True, False, True, (i == 0)])

    fl_pts = [
        wall_pt(195, 610, FL, 148, 626, FR, 312, 608),
        wall_pt(278, 610, FL, 148, 626, FR, 312, 608),
        wall_pt(278, 610, FL, 148, 626, FR, 312, 608) + depth_vec * 0.58,
        wall_pt(195, 610, FL, 148, 626, FR, 312, 608) + depth_vec * 0.58,
    ]
    add_prism(bm, fl_pts, [p - np.array([0, 0.08, 0]) for p in fl_pts], mat_top=2, mat_side=2, mat_bot=2)

    build_ellipse_drum(bm, 322, 567, 24, 5, h_dev + 0.85, 40, segs=36)
    return to_obj('dest-development', bm, merge_verts=False)


def build_w02():
    """W02 ('Automação'): cylindrical tower at x=652..844, y=376..503 + portal + left terrace drum."""
    bm = bmesh.new()
    h_aut = 3.25
    cx, cy = 748.0, 397.0
    rx_out, ry_out = 96.0, 20.0
    rx_in, ry_in = 74.0, 15.5
    segs = 96
    angles = np.linspace(0, math.pi * 2, segs, endpoint=False)

    def lintel_y(x):
        if x <= 772.0:
            return 425.0
        u = min(1.0, max(0.0, (x - 772.0) / 23.0))
        return 448.0 - 23.0 * math.sqrt(max(0.0, 1.0 - u * u))

    for i in range(segs):
        a0, a1 = angles[i], angles[(i + 1) % segs]
        am = 0.5 * (a0 + a1)
        px0, py0 = cx + rx_out * math.cos(a0), cy + ry_out * math.sin(a0)
        px1, py1 = cx + rx_out * math.cos(a1), cy + ry_out * math.sin(a1)
        ix0, iy0 = cx + rx_in * math.cos(a0), cy + ry_in * math.sin(a0)
        ix1, iy1 = cx + rx_in * math.cos(a1), cy + ry_in * math.sin(a1)
        pxm = 0.5 * (px0 + px1)
        front = math.sin(am) > 0.15
        h_rim = h_aut + 2.52
        t_o0, t_o1 = atpx(px0, py0, h_rim), atpx(px1, py1, h_rim)
        t_i0, t_i1 = atpx(ix0, iy0, h_rim), atpx(ix1, iy1, h_rim)
        in_door = front and (718.0 <= pxm <= 795.0)
        if in_door:
            yb0, yb1 = lintel_y(px0), lintel_y(px1)
            b_o0, b_o1 = drop_py(t_o0, py0, yb0), drop_py(t_o1, py1, yb1)
            b_i0, b_i1 = drop_py(t_i0, iy0, yb0 - 1.5), drop_py(t_i1, iy1, yb1 - 1.5)
        else:
            drop_px = 502.5 - (cy + ry_out)
            b_o0, b_o1 = drop_py(t_o0, py0, py0 + drop_px), drop_py(t_o1, py1, py1 + drop_px)
            b_i0, b_i1 = drop_py(t_i0, iy0, iy0 + drop_px), drop_py(t_i1, iy1, iy1 + drop_px)

        # Check if adjacent slices are inside the doorway so jamb faces only exist below lintel
        a_prev, a_next = angles[(i - 1) % segs], angles[(i + 2) % segs]
        px_prev = cx + rx_out * math.cos(0.5 * (a_prev + a0))
        px_next = cx + rx_out * math.cos(0.5 * (a1 + a_next))
        prev_door = (math.sin(0.5 * (a_prev + a0)) > 0.15) and (718.0 <= px_prev <= 795.0)
        next_door = (math.sin(0.5 * (a1 + a_next)) > 0.15) and (718.0 <= px_next <= 795.0)

        add_prism(bm, [t_o0, t_o1, t_i1, t_i0], [b_o0, b_o1, b_i1, b_i0],
                  mat_top=0, mat_side=[0, 1 if (not in_door and next_door) else 0, 1 if not front else 0, 4 if (not in_door and prev_door) else 0],
                  mat_bot=(1 if in_door else 0),
                  side_mask=[True, (not in_door and next_door), True, (not in_door and prev_door)])

    # Recessed purple interior chamber wall behind the W02 doorway (strictly below lintel_y)
    door_xs = np.linspace(716.0, 797.0, 19)
    for k in range(len(door_xs) - 1):
        xa, xb = door_xs[k], door_xs[k + 1]
        xm = 0.5 * (xa + xb)
        ya_top, yb_top = lintel_y(xa) - 1.5, lintel_y(xb) - 1.5
        ya_bot, yb_bot = 496.0, 496.0
        # Recessed depth inside the cylinder (corner at x=754)
        da = -0.52 if xa <= 754.0 else -0.52 + 0.36 * (xa - 754.0) / (797.0 - 754.0)
        db = -0.52 if xb <= 754.0 else -0.52 + 0.36 * (xb - 754.0) / (797.0 - 754.0)
        p_ta = drop_py(atpx(xa, 415.0, h_aut + 2.52), 415.0, ya_top) + np.array([0.0, 0.0, da])
        p_tb = drop_py(atpx(xb, 415.0, h_aut + 2.52), 415.0, yb_top) + np.array([0.0, 0.0, db])
        p_ba = drop_py(atpx(xa, 415.0, h_aut + 2.52), 415.0, ya_bot) + np.array([0.0, 0.0, da])
        p_bb = drop_py(atpx(xb, 415.0, h_aut + 2.52), 415.0, yb_bot) + np.array([0.0, 0.0, db])
        back_vec = np.array([0.0, 0.0, -0.18])
        w_mat = 4 if xm >= 754.0 else 1
        add_prism(bm, [p_ta, p_tb, p_tb + back_vec, p_ta + back_vec],
                  [p_ba, p_bb, p_bb + back_vec, p_ba + back_vec],
                  mat_top=w_mat, mat_side=[w_mat, 0, 0, 0], mat_bot=w_mat,
                  cap_top=False, cap_bot=False, side_mask=[True, False, False, False])

    court_pts = [atpx(cx + (rx_in - 1) * math.cos(a), cy + (ry_in - 0.5) * math.sin(a), h_aut + 2.12) for a in angles]
    add_prism(bm, court_pts, [p - np.array([0, 0.12, 0]) for p in court_pts], mat_top=1, mat_side=1, mat_bot=1)
    build_ellipse_drum(bm, 766, 402, 26, 5.5, h_aut + 2.22, 8, a0=-0.3, a1=math.pi + 0.3, segs=24, mat=0)

    build_terrace_poly(bm, [(716, 492), (796, 492), (796, 503), (716, 503)], h_aut + 0.03, 2.5, mat=2)

    build_ellipse_drum(bm, 659, 486, 37, 6, h_aut + 0.32, 14, segs=36, mat=0)
    build_terrace_poly(bm, [(650, 480), (672, 480), (672, 484), (650, 484)], h_aut + 0.95, 26.0, mat=0)

    build_ellipse_drum(bm, 656, 498, 112, 16, h_aut - 0.02, 84, segs=64, mat=0)
    return to_obj('dest-automation', bm)


def build_w03():
    """W03 ('Suporte'): angled barrel vault at x=1126..1386, y=456..645 + mezzanine + lower violet recess."""
    bm = bmesh.new()
    h_sup = 2.50
    L = atpx(1126, 562, h_sup + 1.55)
    R = atpx(1308, 645, h_sup)
    depth_vec = atpx(1204, 556, h_sup + 1.55) - L

    segs = 44
    ts = np.linspace(0.0, 1.0, segs)
    front_out, front_in, back_out, back_in = [], [], [], []
    in_xs, in_ys = [], []
    for t in ts:
        ang = math.pi * (1.0 - t)
        base_x = 1217.0 + 91.0 * math.cos(ang)
        base_y = 562.0 + (645.0 - 562.0) * t
        arch_lift = 136.0 * (math.sin(ang) ** 0.88)
        px_o, py_o = base_x, base_y - arch_lift

        in_x = 1212.0 + 76.0 * math.cos(ang)
        in_y = base_y - max(0.0, arch_lift - 14.0)
        in_xs.append(in_x)
        in_ys.append(in_y)
        fo = wall_pt(px_o, py_o, L, 1126, 562, R, 1308, 645)
        fi = wall_pt(in_x, in_y, L, 1126, 562, R, 1308, 645)
        front_out.append(fo)
        front_in.append(fi)
        back_out.append(fo + depth_vec)
        back_in.append(fi + depth_vec)

    for i in range(segs - 1):
        mask = [True, (i == segs - 2), True, (i == 0)]
        add_prism(bm,
                  [front_out[i], front_out[i + 1], back_out[i + 1], back_out[i]],
                  [front_in[i], front_in[i + 1], back_in[i + 1], back_in[i]],
                  mat_top=0, mat_side=0, mat_bot=1, side_mask=mask)

    # Interior back wall strictly above the mezzanine floor (y_floor = 562..574) so it never inverts!
    for i in range(segs - 1):
        y_fl0 = 560.0 + 14.0 * ts[i]
        y_fl1 = 560.0 + 14.0 * ts[i + 1]
        if in_ys[i] >= y_fl0 - 1.5 or in_ys[i + 1] >= y_fl1 - 1.5:
            continue
        p0 = wall_pt(in_xs[i], y_fl0, L, 1126, 562, R, 1308, 645) + depth_vec * 0.92
        p1 = wall_pt(in_xs[i + 1], y_fl1, L, 1126, 562, R, 1308, 645) + depth_vec * 0.92
        t_top0 = wall_pt(in_xs[i], in_ys[i], L, 1126, 562, R, 1308, 645) + depth_vec * 0.92
        t_top1 = wall_pt(in_xs[i + 1], in_ys[i + 1], L, 1126, 562, R, 1308, 645) + depth_vec * 0.92
        xm = 0.5 * (in_xs[i] + in_xs[i + 1])
        mat_p = 3 if xm < 1208.0 else (4 if xm > 1254.0 else 1)
        d = depth_vec * 0.08
        add_prism(bm, [t_top0 - d, t_top1 - d, t_top1, t_top0],
                  [p0 - d, p1 - d, p1, p0],
                  mat_top=mat_p, mat_side=[mat_p, 0, 0, 0], mat_bot=mat_p,
                  cap_top=False, cap_bot=False, side_mask=[True, False, True, False])

    mezz_px = [(1126, 562), (1168, 548), (1298, 558), (1286, 572)]
    build_terrace_poly(bm, mezz_px, h_sup + 1.55, 16.0, mat=0)

    rec_px = [(1202, 576), (1286, 574), (1288, 636), (1202, 632)]
    p_rec = [wall_pt(px, py, L, 1126, 562, R, 1308, 645) + depth_vec * 0.18 for px, py in rec_px]
    add_prism(bm, p_rec, [p + depth_vec * 0.45 for p in p_rec], mat_top=3, mat_side=3, mat_bot=3)

    build_terrace_poly(bm, [(1308, 642), (1382, 626), (1402, 634), (1332, 648)], h_sup + 0.15, 10.0, mat=0)

    build_ellipse_drum(bm, 1102, 562, 66, 12, h_sup + 1.50, 82, segs=48, mat=0)
    build_ellipse_drum(bm, 1102, 556, 66, 12, h_sup + 1.68, 10, a0=math.pi * 0.55, a1=math.pi * 1.35, segs=24, mat=0)
    return to_obj('dest-support', bm)


# --------------------------------------------------------------------------- build all
def build():
    t0 = time.time()
    objs = []
    terrain = build_terrain()
    objs.append(build_mountains())

    # 1. Violet paths + white parapets + retaining walls
    dev = sweep_ribbon_px('path-development', [
        (-60, 902, 1.45, 42, 35, 95),
        (50, 862, 1.62, 40, 32, 95),
        (165, 820, 1.80, 36, 28, 95),
        (280, 778, 1.98, 32, 28, 95),
        (385, 734, 2.12, 30, 32, 98),
        (466, 706, 2.22, 26, 42, 102),
        (490, 675, 2.28, 22, 48, 102),
        (466, 650, 2.30, 19, 48, 38),
        (411, 633, 2.30, 15, 44, 22),
        (334, 625, 2.30, 12, 20, 16),
        (225, 608, 2.30, 11, 14, 14),
    ], wall_px=11.0, wall_h_px=8.0, per_seg=18, taper_end=6)

    # Start `path-bridge` cleanly at the outer edge of `path-development` (no overlap onto the purple road!)
    bridge = sweep_ribbon_px('path-bridge', [
        (502, 661, 2.29, 11, 12, 14),
        (558, 629, 2.42, 9, 12, 14),
        (665, 610, 2.55, 7, 10, 12),
        (780, 600, 2.68, 6, 10, 12),
        (895, 594, 2.80, 6, 10, 12),
        (995, 588, 2.92, 12, 14, 16),
        (1058, 570, 3.02, 18, 16, 20),
        (1066, 552, 3.08, 18, 16, 20),
        (1012, 528, 3.14, 14, 14, 16),
        (928, 512, 3.19, 10, 12, 14),
        (835, 502, 3.23, 8, 10, 12),
        (752, 500, 3.25, 8, 10, 10),
    ], wall_px=8.5, wall_h_px=7.5, per_seg=16, taper_start=3, taper_end=8, open_start=1)

    upper = sweep_ribbon_px('path-upper', [
        (832, 463, 2.98, 6, 10, 12),
        (892, 468, 2.98, 8, 14, 18),
        (932, 478, 2.98, 9, 18, 26),
        (906, 491, 2.98, 8, 14, 20),
        (852, 498, 2.98, 6, 10, 12),
    ], wall_px=5.5, wall_h_px=5.5, per_seg=16, taper_start=6, taper_end=8)

    support = sweep_ribbon_px('path-support', [
        (1254, 612, 4.90, 20, 14, 14),
        (1228, 636, 4.90, 17, 16, 16),
        (1204, 658, 4.90, 14, 18, 18),
        (1208, 672, 4.90, 13, 22, 18),
        (1248, 684, 4.90, 10, 24, 16),
        (1335, 696, 4.90, 7, 24, 16),
        (1445, 708, 4.90, 6, 24, 16),
    ], wall_px=8.5, wall_h_px=7.5, per_seg=16, taper_start=6)
    objs += [dev, bridge, upper, support]

    # 2. Central viaduct walls with the 3 arches (Left Arch, Wide Central Arch, Upper Viaduct Arch)
    bm_via = bmesh.new()
    build_arch_viaduct_wall(
        bm_via, 558.0, 885.0,
        y_top_fn=lambda x: 640.0 - 38.0 * ((x - 558.0) / 327.0) ** 0.78,
        y_ground=718.0,
        arches=[(578.0, 632.0, 644.0, 718.0, 3.0), (664.0, 834.0, 608.0, 718.0, 2.0)],
        h_ref=2.38, dx_arch=-28.0, dy_arch=5.0, dh_back=-0.42, inner_mat=0
    )
    build_arch_viaduct_wall(
        bm_via, 768.0, 975.0,
        y_top_fn=lambda x: 506.0 + 30.0 * max(0.0, (x - 830.0) / 145.0),
        y_ground=592.0,
        arches=[(812.0, 958.0, 516.0, 592.0, 2.0)],
        h_ref=3.05, dx_arch=-36.0, dy_arch=5.0, dh_back=-0.45, inner_mat=0
    )
    build_ellipse_drum(bm_via, 515, 588, 125, 10, 1.85, 48, segs=48, mat=0)
    build_ellipse_drum(bm_via, 1006, 604, 22, 5, 2.52, 18, segs=28, mat=0)
    build_ellipse_drum(bm_via, 856, 472, 22, 4.5, 3.02, 18, segs=32, mat=0)
    objs.append(to_obj('viaduct-arches', bm_via))

    # 3. Three main destinations (W01, W02, W03)
    objs += [build_w01(), build_w02(), build_w03()]

    # 4. Left terraces, sloped W01 left buttress & foreground sweeping wing wall (zone_left.png)
    bm_left = bmesh.new()
    build_ramp_wall(
        bm_left,
        [(-15, 546, 2.82), (48, 550, 2.78), (148, 626, 2.28)],
        back_dx=32.0, back_dy=-18.0,
        y_bot_fn=lambda x: 626.0,
        mat=0
    )
    # Smooth curved terrace edge around stairs-dev
    s_curve = catmull_rom([
        (158, 626), (196, 634), (218, 646), (212, 656), (186, 665), (168, 672), (-15, 675)
    ], per_seg=8)
    build_terrace_poly(bm_left, [(-15, 626)] + [(float(p[0]), float(p[1])) for p in s_curve], 2.24, 52.0)
    # Middle-left terrace step extending from x=-15 to x=372 above the wing wall crest
    mid_curve = catmull_rom([
        (-15, 686), (115, 690), (245, 682), (372, 676)
    ], per_seg=8)
    mid_bot = catmull_rom([
        (372, 704), (245, 712), (115, 718), (-15, 696)
    ], per_seg=8)
    build_terrace_poly(bm_left, [(float(p[0]), float(p[1])) for p in np.vstack([mid_curve, mid_bot])], 1.78, 32.0)
    build_ramp_wall(
        bm_left,
        [(-15, 698, 2.25), (65, 718, 2.15), (145, 748, 2.02), (215, 772, 1.92), (262, 782, 1.86)],
        back_dx=-30.0, back_dy=-12.0,
        y_bot_fn=lambda x: 816.0 - (816.0 - 784.0) * (x + 15.0) / 277.0,
        mat=0
    )
    objs.append(to_obj('terraces-left', bm_left))

    # 5. Right foreground bastion + tall arched stone tunnel + forecourt walls (zone_right.png)
    bm_right = bmesh.new()
    build_arch_viaduct_wall(
        bm_right, 1146.0, 1440.0,
        y_top_fn=lambda x: 668.0 + 48.0 * ((x - 1146.0) / 294.0) ** 0.8,
        y_ground=868.0,
        arches=[(1158.0, 1220.0, 734.0, 866.0, 3.2)],
        h_ref=4.85, dx_arch=-10.0, dy_arch=2.0, dh_back=-0.22, inner_mat=0
    )
    t_back = [atpx(1154, 730, 0.40), atpx(1222, 730, 0.40), atpx(1222, 730, 0.25), atpx(1154, 730, 0.25)]
    b_back = [atpx(1154, 868, -0.58), atpx(1222, 868, -0.58), atpx(1222, 868, -0.65), atpx(1154, 868, -0.65)]
    add_prism(bm_right, t_back, b_back, mat_top=0, mat_side=0, mat_bot=0)

    # Terrace strictly to the right of `path-support` so it never overlaps `path-support`'s violet lane
    build_terrace_poly(bm_right, [(1272, 650), (1440, 640), (1440, 690), (1298, 676)], 4.82, 18.0)
    build_ellipse_drum(bm_right, 1038, 786, 106, 14, 0.85, 18, a0=math.pi * 0.08, a1=math.pi * 0.92, segs=36, mat=0)
    objs.append(to_obj('mass-right', bm_right))

    # 6. All Staircases
    objs += [
        build_stairs_px('stairs-w01-entry', (148, 636), (216, 632), (168, 604), (208, 602), 2.31, 2.68, steps=6, drop_base_px=12),
        build_stairs_px('stairs-dev', (246, 675), (306, 686), (282, 628), (334, 636), 1.80, 2.28, steps=6, drop_base_px=22),
        build_stairs_px('stairs-front', (320, 916), (352, 920), (356, 796), (386, 800), 0.45, 1.85, steps=10, drop_base_px=20),
        build_stairs_px('stairs-left', (545, 580), (628, 586), (688, 504), (742, 506), 2.25, 3.21, steps=13, drop_base_px=24, y_ground=586.0),
        build_stairs_px('stairs-centre-right', (835, 672), (938, 682), (968, 594), (1048, 602), 1.50, 2.45, steps=11, drop_base_px=24, y_ground=684.0),
        build_stairs_px('stairs-support', (1148, 634), (1198, 628), (1105, 566), (1148, 560), 3.22, 4.03, steps=10, drop_base_px=16),
        build_stairs_px('stairs-tunnel', (1160, 858), (1210, 862), (1168, 826), (1210, 830), -0.52, -0.22, steps=5, drop_base_px=10),
        build_fin_stairs('fins-w02', 568.0, 650.0,
                         y_base_fn=lambda x: 498.0,
                         y_top_fn=lambda x: 496.0 - 50.0 * (x - 568.0) / 44.0 if x <= 612.0 else 446.0 + 22.0 * (x - 612.0) / 38.0,
                         h_base=3.26, count=14),
        build_fin_stairs('fins-right', 975.0, 1142.0,
                         y_base_fn=lambda x: 784.0,
                         y_top_fn=lambda x: 780.0 - 108.0 * ((x - 975.0) / 167.0) ** 1.15,
                         h_base=1.15, count=16),
    ]

    # 7. Interior furniture & architectural trees
    bm_props = bmesh.new()
    ac = atpx(758, 496, 3.28)
    for w, h, d, dx, dy, dz in [
        # Sculpted lounge armchair (seat cushion, angled backrest, left/right armrests, 4 slender legs)
        (0.54, 0.09, 0.52, 0.0, 0.36, 0.0),
        (0.54, 0.56, 0.09, 0.06, 0.64, -0.21),
        (0.07, 0.18, 0.48, -0.24, 0.46, -0.02),
        (0.07, 0.18, 0.48, 0.24, 0.46, -0.02),
        (0.05, 0.34, 0.05, -0.21, 0.17, -0.19), (0.05, 0.34, 0.05, 0.21, 0.17, -0.19),
        (0.05, 0.34, 0.05, -0.21, 0.17, 0.19), (0.05, 0.34, 0.05, 0.21, 0.17, 0.19),
        # Side table with pedestal + circular/chamfered top
        (0.40, 0.05, 0.40, -0.52, 0.44, 0.05),
        (0.06, 0.42, 0.06, -0.52, 0.21, 0.05),
        (0.24, 0.03, 0.24, -0.52, 0.02, 0.05),
    ]:
        add_box_3d(bm_props, ac + np.array([dx, dy, dz]), w, h, d, yaw=-0.35, mat=0)

    sc = atpx(1228, 566, 4.06)
    for w, h, d, dx, dy, dz in [
        # Architectural desk with top slab, modesty panel, side leg panels
        (1.26, 0.06, 0.58, 0.12, 0.52, 0.0),
        (0.07, 0.50, 0.52, -0.44, 0.25, 0.0), (0.07, 0.50, 0.52, 0.66, 0.25, 0.0),
        (1.04, 0.28, 0.04, 0.11, 0.34, -0.18),
        # Monitor screen, neck, and base stand
        (0.48, 0.32, 0.04, 0.14, 0.76, -0.10),
        (0.06, 0.16, 0.05, 0.14, 0.60, -0.12),
        (0.20, 0.02, 0.14, 0.14, 0.55, -0.08),
        # Office chair with seat, curved back, armrests, pedestal
        (0.42, 0.06, 0.42, -0.58, 0.34, 0.14),
        (0.06, 0.48, 0.40, -0.76, 0.56, 0.14),
        (0.32, 0.04, 0.05, -0.60, 0.45, -0.05),
        (0.32, 0.04, 0.05, -0.60, 0.45, 0.33),
        (0.06, 0.32, 0.06, -0.58, 0.16, 0.14),
        (0.30, 0.03, 0.30, -0.58, 0.02, 0.14),
    ]:
        add_box_3d(bm_props, sc + np.array([dx, dy, dz]), w, h, d, yaw=-0.42, mat=0)
    objs.append(to_obj('props', bm_props))

    bm_trees = bmesh.new()
    for px, py, h_base, r in [
        (332, 582, 2.35, 0.52), (358, 575, 2.45, 0.64), (382, 588, 2.35, 0.54), (402, 598, 2.25, 0.45),
        (852, 442, 3.05, 0.58), (872, 432, 3.15, 0.52), (888, 452, 2.98, 0.45),
    ]:
        c = atpx(px, py, h_base)
        t = bmesh.new()
        bmesh.ops.create_icosphere(t, subdivisions=2, radius=r)
        bmesh.ops.scale(t, vec=(1.15, 0.85, 0.9), verts=t.verts)
        bmesh.ops.translate(t, vec=P(c), verts=t.verts)
        for f in t.faces:
            f.material_index = 5
        me = bpy.data.meshes.new('tmp')
        t.to_mesh(me); t.free()
        bm_trees.from_mesh(me); bpy.data.meshes.remove(me)
    objs.append(to_obj('foliage', bm_trees))

    bpy.ops.object.select_all(action='DESELECT')
    for o in bpy.data.objects:
        if o.type == 'MESH':
            o.select_set(True)
            bpy.context.view_layer.objects.active = o
    bpy.ops.object.shade_smooth_by_angle(angle=math.radians(34))
    print('built', len(bpy.data.objects), 'objects in', round(time.time() - t0, 2), 's')
    return objs, terrain


def setup_lighting():
    world = bpy.data.worlds.new('sky')
    scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    bg_lit = nt.nodes['Background']
    bg_lit.inputs['Color'].default_value = (*srgb_to_lin((0.94, 0.93, 0.96)), 1)
    bg_lit.inputs['Strength'].default_value = 0.50
    bg_cam = nt.nodes.new('ShaderNodeBackground')
    bg_cam.inputs['Color'].default_value = (*srgb_to_lin(BG), 1)
    bg_cam.inputs['Strength'].default_value = 1.0
    lp = nt.nodes.new('ShaderNodeLightPath')
    mix = nt.nodes.new('ShaderNodeMixShader')
    out = nt.nodes['World Output']
    nt.links.new(lp.outputs['Is Camera Ray'], mix.inputs['Fac'])
    nt.links.new(bg_lit.outputs['Background'], mix.inputs[1])
    nt.links.new(bg_cam.outputs['Background'], mix.inputs[2])
    nt.links.new(mix.outputs['Shader'], out.inputs['Surface'])

    sun = bpy.data.lights.new('sun', 'SUN')
    sun.energy = 1.90
    sun.angle = math.radians(3.8)
    sun.color = (1.0, 0.96, 0.90)
    so = bpy.data.objects.new('sun', sun)
    coll.objects.link(so)
    direction = -Vector(P((-18, 12.5, 15.5))).normalized()
    so.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()


def setup_camera():
    cam = bpy.data.cameras.new('proof')
    cam.type = 'ORTHO'
    cam.ortho_scale = VIEW_W
    cam.clip_start, cam.clip_end = 0.1, 200
    co = bpy.data.objects.new('proof', cam)
    coll.objects.link(co)
    co.location = P((0, 16, 28))
    co.rotation_euler = (-Vector(P((0, 16, 28)))).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = co
    return co


def render_preview(path, scale=100, samples=36):
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = samples
    scene.cycles.use_denoising = False
    scene.render.resolution_x, scene.render.resolution_y = REF_W, REF_H
    scene.render.resolution_percentage = scale
    scene.view_settings.view_transform = 'Standard'
    scene.render.filepath = path
    scene.render.image_settings.file_format = 'PNG'
    bpy.ops.render.render(write_still=True)


# --------------------------------------------------------------------------- bake + export
ATLAS_STRUCT = int(arg('--struct-size', '2048'))
ATLAS_TERRAIN = int(arg('--terrain-size', '2048'))
BAKE_SAMPLES = int(arg('--bake-samples', '64'))
WEB_DIR = os.path.join(ROOT, 'design', 'scene-proof', 'assets')


def lin_to_srgb(x):
    x = np.clip(x, 0, 1)
    return np.where(x <= 0.0031308, x * 12.92, 1.055 * np.power(x, 1 / 2.4) - 0.055)


def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def make_uvs(terrain, structs):
    me = terrain.data
    uv = me.uv_layers.new(name='UVMap')
    x0, x1, z0, z1 = TERRAIN_BOUNDS
    cos = np.empty(len(me.vertices) * 3)
    me.vertices.foreach_get('co', cos)
    cos = cos.reshape(-1, 3)
    loops = np.empty(len(me.loops), dtype=np.int32)
    me.loops.foreach_get('vertex_index', loops)
    v = cos[loops]
    arr = np.stack([(v[:, 0] - x0) / (x1 - x0), 1 - ((-v[:, 1]) - z0) / (z1 - z0)], axis=1)
    uv.data.foreach_set('uv', arr.ravel())
    for o in structs:
        o.data.uv_layers.new(name='UVMap')
    bpy.ops.object.select_all(action='DESELECT')
    for o in structs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = structs[0]
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(10), island_margin=0.002, scale_to_bounds=False)
    bpy.ops.uv.pack_islands(margin=0.002, rotate=True)
    # Curved/concave authored strips can fold inside a projected UV chart even
    # though separate charts do not overlap. Project those triangles isometrically
    # onto their own 3D tangent plane as independent islands, then repack.
    detached = 0
    for _pass in range(3):
        bpy.ops.uv.select_all(action='DESELECT')
        bpy.ops.uv.select_overlap(extend=False)
        pass_detached = 0
        for obj in structs:
            bm = bmesh.from_edit_mesh(obj.data)
            layer = bm.loops.layers.uv.active
            folded = [f for f in bm.faces if any(loop[layer].select for loop in f.loops)]
            pass_detached += len(folded)
            for index, face in enumerate(folded):
                v0 = face.loops[0].vert.co
                v1 = face.loops[1].vert.co
                e1 = (v1 - v0)
                if e1.length < 1e-6:
                    e1 = Vector((1.0, 0.0, 0.0))
                else:
                    e1.normalize()
                n = face.normal if face.normal.length > 1e-6 else Vector((0.0, 0.0, 1.0))
                e2 = n.cross(e1)
                if e2.length < 1e-6:
                    e2 = Vector((0.0, 1.0, 0.0))
                else:
                    e2.normalize()
                ox = 2.0 + (detached + index) * 0.12
                for li, loop in enumerate(face.loops):
                    d = loop.vert.co - v0
                    u = d.dot(e1) * 0.028
                    v = d.dot(e2) * 0.028
                    if li == 2 and abs(v) < 0.004:
                        v = 0.004 if v >= 0 else -0.004
                    loop[layer].uv = (ox + u, v)
            bmesh.update_edit_mesh(obj.data)
        detached += pass_detached
        if pass_detached == 0:
            break
        bpy.ops.uv.select_all(action='SELECT')
        bpy.ops.uv.pack_islands(margin=0.002, rotate=True)
    bpy.ops.uv.select_all(action='DESELECT')
    bpy.ops.uv.select_overlap(extend=False)
    remaining = 0
    for obj in structs:
        bm = bmesh.from_edit_mesh(obj.data)
        layer = bm.loops.layers.uv.active
        remaining += sum(any(loop[layer].select for loop in f.loops) for f in bm.faces)
    bpy.ops.object.mode_set(mode='OBJECT')
    print('UV charts: detached', detached, 'folded triangles; remaining overlaps', remaining)
    if remaining:
        raise RuntimeError(f'Atlas has {remaining} overlapping UV faces; refusing to bake')


def bake_target(mats, name, size):
    img = bpy.data.images.new(name, size, size, alpha=False, float_buffer=True)
    for m in mats:
        node = m.node_tree.nodes.new('ShaderNodeTexImage')
        node.image = img
        node.name = 'bake_target'
        m.node_tree.nodes.active = node
    return img


def bake(objs, label):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    t0 = time.time()
    bpy.ops.object.bake(type='COMBINED', pass_filter={'DIRECT', 'INDIRECT', 'COLOR', 'DIFFUSE', 'EMIT'},
                        margin=3, margin_type='EXTEND', use_clear=True)
    print(f'baked {label} in {time.time() - t0:.0f}s')


def pixels(img):
    a = np.empty(len(img.pixels), dtype=np.float32)
    img.pixels.foreach_get(a)
    return a.reshape(img.size[1], img.size[0], 4)


def write_png(arr_linear, name, path):
    srgb = lin_to_srgb(arr_linear[..., :3])
    out = np.ones((*srgb.shape[:2], 4), dtype=np.float32)
    out[..., :3] = srgb
    img = bpy.data.images.new(name + '_png', srgb.shape[1], srgb.shape[0], alpha=False)
    img.colorspace_settings.name = 'Non-Color'
    img.pixels.foreach_set(out.ravel())
    img.filepath_raw = path
    img.file_format = 'PNG'
    img.save()
    return img


def bake_and_export(objs, terrain):
    structs = [o for o in objs]
    # Freeze concave/beveled faces before both UV projection and glTF export.
    # Otherwise Blender's bake and glTF may triangulate the same ngon differently.
    for obj in structs:
        bm = bmesh.new()
        bm.from_mesh(obj.data)
        bmesh.ops.dissolve_degenerate(bm, dist=1e-4, edges=list(bm.edges))
        bmesh.ops.split_edges(bm, edges=[edge for edge in bm.edges if len(edge.link_faces) == 2
                              and edge.link_faces[0].material_index != edge.link_faces[1].material_index])
        bmesh.ops.triangulate(bm, faces=list(bm.faces))
        degen = [f for f in bm.faces if f.calc_area() < 1e-6]
        if degen:
            bmesh.ops.delete(bm, geom=degen, context='FACES')
        bm.to_mesh(obj.data)
        bm.free()
    make_uvs(terrain, structs)
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = BAKE_SAMPLES
    scene.cycles.use_denoising = False
    scene.view_settings.view_transform = 'Standard'
    img_s = bake_target(ALL_MATS, 'bake_struct', ATLAS_STRUCT)
    bake(structs, 'structures')
    img_t = bake_target([TERRAIN], 'bake_terrain', ATLAS_TERRAIN)
    bake([terrain], 'terrain')
    s, t = pixels(img_s), pixels(img_t)
    # Inpaint any unhit or dark-bordered UV island texels (luminance < 0.22) from valid 3x3 neighbors
    rgb_s = s[..., :3].copy()
    for _ in range(14):
        lum_s = rgb_s.max(axis=2)
        dark = lum_s < 0.22
        if not np.any(dark):
            break
        best = rgb_s.copy()
        best_lum = lum_s.copy()
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dx == 0 and dy == 0:
                    continue
                sh = np.roll(np.roll(rgb_s, dy, axis=0), dx, axis=1)
                sh_l = sh.max(axis=2)
                upd = dark & (sh_l > best_lum)
                best[upd] = sh[upd]
                best_lum[upd] = sh_l[upd]
        rgb_s = best
    s[..., :3] = rgb_s
    gain = float(arg('--bake-gain', '1.05'))
    print('gain', gain)
    s[..., :3] *= gain
    t[..., :3] *= gain
    x0, x1, z0, z1 = TERRAIN_BOUNDS
    rows = t.shape[0]
    z = z0 + (1 - (np.arange(rows) + 0.5) / rows) * (z1 - z0)
    haze_back = smoothstep(-1.5, -4.9, z) * 0.92
    haze_front = smoothstep(8.5, 16.0, z) * 0.85
    haze = np.clip(haze_back + haze_front, 0.0, 0.95)[:, None, None]
    bg = np.array(srgb_to_lin(BG))[None, None, :]
    if '--no-atlas-grade' not in ARGS:
        t[..., :3] = t[..., :3] * (1 - haze) + bg * haze
        for a in (s, t):
            lum = a[..., :3].mean(axis=2, keepdims=True)
            a[..., :3] += (1 - np.clip(lum, 0, 1)) * np.array([0.004, 0.003, 0.016])[None, None, :]
    os.makedirs(WEB_DIR, exist_ok=True)
    write_png(s, 'struct', os.path.join(OUT_DIR, 'atlas-structures.png'))
    write_png(t, 'terrain', os.path.join(OUT_DIR, 'atlas-terrain.png'))

    def export_mat(name, image_path):
        m = bpy.data.materials.new(name)
        m.use_nodes = True
        bsdf = m.node_tree.nodes['Principled BSDF']
        bsdf.inputs['Roughness'].default_value = 1.0
        tex = m.node_tree.nodes.new('ShaderNodeTexImage')
        tex.image = bpy.data.images.load(image_path)
        tex.image.colorspace_settings.name = 'sRGB'
        m.node_tree.links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
        return m

    mat_s = export_mat('baked-structures', os.path.join(OUT_DIR, 'atlas-structures.png'))
    mat_t = export_mat('baked-terrain', os.path.join(OUT_DIR, 'atlas-terrain.png'))
    tris = 0
    for o in structs + [terrain]:
        me = o.data
        me.materials.clear()
        me.materials.append(mat_t if o is terrain else mat_s)
        for poly in me.polygons:
            poly.material_index = 0
        me.calc_loop_triangles()
        tris += len(me.loop_triangles)
    print('export triangles', tris, 'objects', len(structs) + 1)
    bpy.ops.object.select_all(action='DESELECT')
    for o in structs + [terrain]:
        o.select_set(True)
    props = bpy.ops.export_scene.gltf.get_rna_type().properties.keys()
    kw = dict(filepath=os.path.join(WEB_DIR, 'landscape.glb'), export_format='GLB', use_selection=True,
              export_image_format='WEBP', export_materials='EXPORT', export_normals=False,
              export_texcoords=True, export_apply=True, export_yup=True, export_cameras=False,
              export_lights=False)
    if 'export_image_quality' in props:
        kw['export_image_quality'] = int(arg('--webp-quality', '82'))
    bpy.ops.export_scene.gltf(**kw)
    print('exported', kw['filepath'], os.path.getsize(kw['filepath']))
    json.dump({'triangles': tris, 'objects': [o.name for o in structs] + ['terrain'], 'gain': gain,
               'atlas': {'structures': ATLAS_STRUCT, 'terrain': ATLAS_TERRAIN}, 'samples': BAKE_SAMPLES,
               'post_grade': '--no-atlas-grade' not in ARGS},
              open(os.path.join(OUT_DIR, 'bake-report.json'), 'w'), indent=2)


if __name__ == '__main__':
    objs, terrain = build()
    setup_lighting()
    setup_camera()
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT_DIR, 'landscape.blend'))
    if MODE == 'preview':
        render_preview(os.path.join(OUT_DIR, 'preview.png'), int(arg('--scale', '100')), int(arg('--samples', '36')))
    elif MODE == 'bake':
        bake_and_export(objs, terrain)
