import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// An authored reconstruction from a single view, not recovered 3D geometry.
const VIEW_WIDTH = 36;
const VIEW_HEIGHT = VIEW_WIDTH * 1098 / 1433;
const ELEVATION = Math.atan2(16, 28);
const stoneColor = '#f5f3ef';

function atPixel(x: number, y: number, height: number) {
  const screenY = (0.5 - y / 1098) * VIEW_HEIGHT;
  return new THREE.Vector3((x / 1433 - 0.5) * VIEW_WIDTH, height,
    (height * Math.cos(ELEVATION) - screenY) / Math.sin(ELEVATION));
}

function mineralTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const context = canvas.getContext('2d')!;
  const pixels = context.createImageData(256, 256);
  let seed = 291;
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const value = 170 + (seed >>> 26);
    pixels.data.set([value, value, value, 255], i);
  }
  context.putImageData(pixels, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

function archFace(width: number, height: number, opening: number, spring: number) {
  const face = new THREE.Shape();
  face.moveTo(-width / 2, 0);
  face.lineTo(-width / 2, height);
  face.lineTo(width / 2, height);
  face.lineTo(width / 2, 0);
  face.lineTo(opening, 0);
  face.lineTo(opening, spring);
  face.absarc(0, spring, opening, 0, Math.PI, false);
  face.lineTo(-opening, 0);
  face.closePath();
  return face;
}

function ribbonGeometry(curve: THREE.CatmullRomCurve3, width: number, depth: number, offset = 0) {
  const vertices: number[] = [];
  const indices: number[] = [];
  const count = 160;
  for (let i = 0; i <= count; i++) {
    const point = curve.getPoint(i / count);
    const direction = curve.getTangent(i / count);
    const normal = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
    for (const [side, down] of [[-1, 0], [1, 0], [-1, depth], [1, depth]]) {
      const vertex = point.clone().addScaledVector(normal, offset + side * width / 2);
      vertices.push(vertex.x, vertex.y - down, vertex.z);
    }
    if (i < count) {
      const a = i * 4, b = a + 4;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
      indices.push(a + 2, a + 3, b + 2, a + 3, b + 3, b + 2);
      indices.push(a, a + 2, b, b, a + 2, b + 2);
      indices.push(a + 1, b + 1, a + 3, a + 3, b + 1, b + 3);
    }
  }
  indices.push(0, 1, 2, 1, 3, 2);
  const end = count * 4;
  indices.push(end, end + 2, end + 1, end + 1, end + 2, end + 3);
  // The cross-section is ordered from left to right: reverse winding so
  // the upper surface faces skywards instead of disappearing behind its underside.
  for (let i = 0; i < indices.length; i += 3) {
    [indices[i + 1], indices[i + 2]] = [indices[i + 2], indices[i + 1]];
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function buildProofWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f7f7fa');
  scene.fog = new THREE.Fog('#f7f7fa', 44, 95);
  const grain = mineralTexture();
  const stone = new THREE.MeshStandardMaterial({ color: stoneColor, roughness: 0.92, bumpMap: grain, bumpScale: 0.065 });
  const violet = new THREE.MeshStandardMaterial({ color: '#6534D8', roughness: 0.65 });
  const inner = new THREE.MeshStandardMaterial({ color: '#6534D8', roughness: 0.9, emissive: '#6534D8', emissiveIntensity: 0.18 });
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = [stone, violet, inner];
  const group = new THREE.Group();
  scene.add(group);
  const mesh = (geometry: THREE.BufferGeometry, material = stone, parent: THREE.Object3D = group) => {
    geometries.add(geometry);
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  };
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, parent = group, material = stone) => {
    const object = mesh(new THREE.BoxGeometry(w, h, d), material, parent);
    object.position.set(x, y, z);
    return object;
  };

  // Single continuous terrain, deterministic low-amplitude dunes + distant ridges.
  const terrain = new THREE.PlaneGeometry(110, 100, 110, 100);
  terrain.rotateX(-Math.PI / 2);
  const positions = terrain.getAttribute('position');
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), z = positions.getZ(i);
    const ridge = Math.exp(-Math.pow((z + 8) / 5, 2));
    const hills = 2.1 + Math.sin(x * .39) * 1.3 + Math.sin(x * .93) * .65;
    positions.setY(i, -.7 + Math.sin(x * .2 + z * .16) * .18 + ridge * hills);
  }
  terrain.computeVertexNormals();
  mesh(terrain).castShadow = false;

  function platform(position: THREE.Vector3, radius: number, height: number) {
    const object = mesh(new THREE.CylinderGeometry(radius, radius + .08, height, 72));
    object.position.set(position.x, position.y - height / 2 - .03, position.z - 1.2);
    return object;
  }

  function steps(position: THREE.Vector3, rise: number, count: number, yaw = 0, width = 1.65) {
    const parts: THREE.BufferGeometry[] = [];
    for (let i = 0; i < count; i++) {
      const h = rise * (count - i) / count;
      const geometry = new THREE.BoxGeometry(width, h, .26);
      geometry.translate(0, h / 2 - rise, .26 * i);
      parts.push(geometry);
    }
    const geometry = mergeGeometries(parts)!;
    parts.forEach(part => part.dispose());
    const object = mesh(geometry);
    object.position.copy(position);
    object.rotation.y = yaw;
  }

  function furniture(parent: THREE.Group) {
    const pieces: THREE.BufferGeometry[] = [];
    for (const [w, h, d, x, y, z] of [
      [1.15, .08, .55, .25, .73, -.5], [.06, .7, .06, -.25, .35, -.35],
      [.06, .7, .06, .75, .35, -.35], [.55, .4, .04, .25, 1, -.67],
      [.08, .2, .08, .25, .8, -.67], [.5, .07, .5, -.65, .45, .15],
      [.5, .5, .07, -.65, .7, .4], [.06, .45, .06, -.83, .22, .3],
      [.06, .45, .06, -.47, .22, .3],
    ]) {
      const geometry = new THREE.BoxGeometry(w, h, d);
      geometry.translate(x, y, z);
      pieces.push(geometry);
    }
    mesh(mergeGeometries(pieces)!, stone, parent);
    pieces.forEach(piece => piece.dispose());
  }

  const development = atPixel(230, 624, 2.3);
  const automation = atPixel(756, 500, 4.2);
  const support = atPixel(1247, 640, 2.5);
  const anchors = { development: development.clone(), automation: automation.clone(), support: support.clone() };

  // W01: squared block, true open doorway, violet inner wall and accessible deck.
  const left = new THREE.Group();
  left.name = 'development';
  left.position.copy(development);
  group.add(left);
  const face = new THREE.ExtrudeGeometry(archFace(4.5, 3, 1.05, 1.05), { depth: 1.8, bevelEnabled: false, curveSegments: 36 });
  face.translate(0, 0, -1.8);
  mesh(face, stone, left);
  box(2.1, .07, 2.2, 0, .035, -.8, left, violet);
  box(2.1, 2.8, .07, 0, 1.4, -1.82, left, inner);
  platform(development, 3.1, 2.8);
  steps(development.clone().add(new THREE.Vector3(-1.6, 0, .2)), 1.4, 9, -.12, 1.2);
  anchors.development.y += 3.1;

  // W02: open cylindrical shell, roof ring and a front portal cut out of the wall.
  const center = new THREE.Group();
  center.name = 'automation';
  center.position.copy(automation);
  group.add(center);
  const ring = new THREE.Shape();
  ring.absarc(0, 0, 2.15, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, 1.72, 0, Math.PI * 2, true);
  ring.holes.push(hole);
  const ringGeo = new THREE.ExtrudeGeometry(ring, { depth: .18, bevelEnabled: false, curveSegments: 48 });
  ringGeo.rotateX(-Math.PI / 2);
  ringGeo.translate(0, 2.75, -1.8);
  mesh(ringGeo, stone, center);
  const wall = new THREE.CylinderGeometry(2.1, 2.1, 2.75, 64, 1, true, .65, Math.PI * 2 - 1.3);
  wall.translate(0, 1.375, -1.8);
  mesh(wall, stone, center);
  const lining = new THREE.CylinderGeometry(1.73, 1.73, 2.75, 64, 1, true, .65, Math.PI * 2 - 1.3);
  lining.scale(-1, 1, 1);
  lining.translate(0, 1.375, -1.8);
  mesh(lining, inner, center);
  const centerDoor = new THREE.ExtrudeGeometry(archFace(3, 2.75, .85, 1.2), { depth: .45, bevelEnabled: false, curveSegments: 32 });
  centerDoor.translate(0, 0, -.65);
  mesh(centerDoor, stone, center);
  box(1.7, .08, 2.2, 0, .04, -.9, center, violet);
  furniture(center);
  platform(automation, 4.3, 4.6);
  steps(automation.clone().add(new THREE.Vector3(-1.5, -.05, .6)), 2.2, 14, -.42, 2.4);
  anchors.automation.y += 3;

  // W03: continuous barrel vault with a genuinely hollow interior.
  const right = new THREE.Group();
  right.name = 'support';
  right.position.copy(support);
  group.add(right);
  const vault = new THREE.Shape();
  vault.moveTo(-2.3, 0);
  vault.lineTo(-2.3, 1.25);
  vault.absarc(0, 1.25, 2.3, Math.PI, 0, true);
  vault.lineTo(2.3, 0);
  vault.lineTo(1.83, 0);
  vault.lineTo(1.83, 1.25);
  vault.absarc(0, 1.25, 1.83, 0, Math.PI, false);
  vault.lineTo(-1.83, 0);
  vault.closePath();
  const vaultGeometry = new THREE.ExtrudeGeometry(vault, { depth: 2.6, bevelEnabled: false, curveSegments: 48 });
  vaultGeometry.translate(0, 0, -2.6);
  mesh(vaultGeometry, stone, right);
  box(3.66, .08, 2.7, 0, .04, -1.25, right, violet);
  const back = new THREE.Shape();
  back.moveTo(-1.83, 0); back.lineTo(-1.83, 1.25);
  back.absarc(0, 1.25, 1.83, Math.PI, 0, true); back.lineTo(1.83, 0);
  const backGeometry = new THREE.ShapeGeometry(back, 32);
  backGeometry.translate(0, 0, -2.58);
  mesh(backGeometry, inner, right);
  furniture(right);
  platform(support, 3.9, 3.2);
  steps(support.clone().add(new THREE.Vector3(-2.2, 0, .1)), 2.2, 14, -.4, 2.1);
  anchors.support.y += 3.8;

  // Visible routes are separate. The source image does not prove the hidden joint.
  const routes: { name: string; pixels: number[][]; start: number; end: number; width: number }[] = [
    { name: 'development', pixels: [[-70,925],[120,853],[330,775],[470,695],[495,675],[480,650],[430,632],[350,622],[230,624]], start: 2.3, end: 2.3, width: 1.65 },
    { name: 'automation', pixels: [[495,665],[650,619],[850,603],[1020,592],[1060,568],[1040,540],[930,508],[800,498],[756,500]], start: 2.3, end: 4.2, width: 1.05 },
    { name: 'automation', pixels: [[850,468],[900,472],[950,482],[920,495],[870,500]], start: 4.2, end: 4.2, width: .85 },
    { name: 'support', pixels: [[1247,640],[1235,652],[1200,672],[1195,688],[1230,700],[1370,723],[1510,744]], start: 2.5, end: 2.5, width: 1.15 },
  ];
  for (const route of routes) {
    // Land on the platform before entering its footprint. An interpolated ramp
    // continuing underneath it made the platform slice white wedges into the road.
    const points = route.pixels.map(([x, y], index) => atPixel(x, y,
      route.start + (route.end - route.start) * Math.min(1, index / 3)));
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    mesh(ribbonGeometry(curve, route.width + .65, route.pixels[0][0] < 0 ? 1.8 : .48));
    const purple = mesh(ribbonGeometry(curve, route.width, .025), violet);
    purple.position.y += .018;
    purple.name = `path-${route.name}`;
    const parapets = [-1, 1].map(side => ribbonGeometry(curve, .18, .45, side * (route.width / 2 + .23)));
    const parapet = mesh(mergeGeometries(parapets)!);
    parapets.forEach(part => part.dispose());
    parapet.position.y += .36;
  }

  // Bridge piers have real arches: daylight remains visible under the deck.
  for (const [x, z, width, height] of [[-2.8, 8.7, 7.4, 2.8], [5.2, 6.8, 6.2, 3.1]]) {
    const bridge = new THREE.ExtrudeGeometry(archFace(width, height, width * .28, .15), { depth: .85, bevelEnabled: false, curveSegments: 40 });
    const object = mesh(bridge);
    object.position.set(x, -.55, z);
    object.rotation.y = -.12;
  }

  scene.add(new THREE.HemisphereLight('#ffffff', '#d0cbd4', 2.8));
  const sun = new THREE.DirectionalLight('#fffaf5', 2.4);
  sun.position.set(-14, 26, 13);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -28; sun.shadow.camera.right = 28;
  sun.shadow.camera.top = 24; sun.shadow.camera.bottom = -24;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 90;
  sun.shadow.normalBias = .04;
  sun.shadow.bias = -.0002;
  sun.shadow.radius = 4;
  scene.add(sun);
  return {
    scene, anchors,
    dispose() {
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      grain.dispose(); sun.shadow.map?.dispose();
      scene.clear();
    },
  };
}

export function proofCamera(width: number, height: number, mobile: boolean) {
  const worldWidth = mobile ? 39 : VIEW_WIDTH;
  const worldHeight = worldWidth * height / width;
  const camera = new THREE.OrthographicCamera(-worldWidth / 2, worldWidth / 2, worldHeight / 2, -worldHeight / 2, .1, 150);
  if (mobile) {
    camera.position.set(-3, 24, 34);
    camera.lookAt(0, 1.5, 5.8);
  } else {
    camera.position.set(0, 16, 28);
    camera.lookAt(0, 0, 0);
  }
  camera.updateMatrixWorld();
  return camera;
}
