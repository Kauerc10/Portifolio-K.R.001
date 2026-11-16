import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import landscapeUrl from './assets/landscape.glb?url';

// Authored in Blender (design/scene-proof/blender/build_scene.py), lighting baked into two atlases.
// Runtime therefore needs no lights or shadow maps: each atlas is shown through an unlit material.
const DESTINATIONS = ['development', 'automation', 'support'] as const;
type Destination = (typeof DESTINATIONS)[number];

export async function loadAuthoredWorld() {
  const gltf = await new GLTFLoader().loadAsync(landscapeUrl);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f7f7fa');
  const materials = new Map<THREE.Material, THREE.MeshBasicMaterial>();
  const textures = new Set<THREE.Texture>();
  const geometries = new Set<THREE.BufferGeometry>();
  gltf.scene.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    const source = object.material as THREE.MeshStandardMaterial;
    if (!materials.has(source)) {
      if (source.map) {
        source.map.colorSpace = THREE.SRGBColorSpace;
        source.map.anisotropy = 4;
        textures.add(source.map);
      }
      materials.set(source, new THREE.MeshBasicMaterial({ map: source.map, toneMapped: false }));
      source.dispose();
    }
    object.material = materials.get(source)!;
    object.castShadow = object.receiveShadow = false;
    geometries.add(object.geometry);
  });
  scene.add(gltf.scene);
  scene.updateMatrixWorld(true);

  // Anchors for the HTML labels: top-centre of each destination's bounds.
  const anchors = {} as Record<Destination, THREE.Vector3>;
  for (const id of DESTINATIONS) {
    const object = gltf.scene.getObjectByName(`dest-${id}`);
    if (!object) throw new Error(`Missing destination mesh dest-${id}`);
    const box = new THREE.Box3().setFromObject(object);
    anchors[id] = new THREE.Vector3((box.min.x + box.max.x) / 2, box.max.y, (box.min.z + box.max.z) / 2);
  }
  return {
    scene, anchors,
    dispose() {
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      textures.forEach(texture => texture.dispose());
      scene.clear();
    },
  };
}
