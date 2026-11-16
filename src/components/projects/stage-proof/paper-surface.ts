import * as THREE from 'three';

/** Deformed geometry, not a transformed screenshot. Rendered only on demand. */
export function createPaperSurface(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 50);
  camera.position.set(0, 3.2, 10.8); camera.lookAt(0, .1, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb5a3cd, 1.7));
  const light = new THREE.DirectionalLight(0xffffff, 2.2); light.position.set(-3, 5, 5); scene.add(light);
  const geometry = new THREE.PlaneGeometry(8, 3.2, 100, 28);
  const material = new THREE.MeshStandardMaterial({ color: 0xfffcf8, roughness: .72, metalness: 0, side: THREE.DoubleSide });
  const paper = new THREE.Mesh(geometry, material); scene.add(paper);
  // Keep the blue accent on the physical edge; a translated duplicate surface
  // intersects the steep fold and would obscure the front of the document.
  const edgeGeometry = new THREE.BufferGeometry();
  const edge = new THREE.Line(edgeGeometry, new THREE.LineBasicMaterial({ color: 0x3469ff })); scene.add(edge);
  const positions = geometry.attributes.position;
  const base = Float32Array.from(positions.array);
  let width = 0, height = 0;
  function render(progress: number, energy: number) {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    if (width !== rect.width || height !== rect.height) {
      width = rect.width; height = rect.height; renderer.setSize(width, height, false);
      camera.aspect = width / height; camera.updateProjectionMatrix();
      camera.position.z = camera.aspect < 1 ? 15 : 10.8;
    }
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const fold = Math.sin(p * Math.PI);
    const edgePoints = [];
    for (let i = 0; i < positions.count; i++) {
      const u = (base[i * 3] + 4) / 8;
      const v = base[i * 3 + 1] / 3.2;
      const ramp = THREE.MathUtils.smoothstep(u, .57, .98);
      const crest = Math.exp(-Math.pow((u - (.12 + .76 * p)) * 5, 2));
      const x = base[i * 3] * (1 - p * .62) + p * 1.45;
      const y = -.92 + ramp * (1.5 + v * 3.1) * (1 - p) + Math.sin(u * Math.PI * 2) * .19 * (1 - p)
        + crest * fold * 1.75 + Math.sin(u * Math.PI) * energy * .08;
      const z = v * 2.9 * (1 - ramp * .93 * (1 - p)) * (1 - p * .5) + fold * Math.sin(u * Math.PI) * .7;
      positions.setXYZ(i, x, y, z);
      if (i <= 100) edgePoints.push(new THREE.Vector3(x, y - .028, z));
    }
    positions.needsUpdate = true; geometry.computeVertexNormals();
    edgeGeometry.setFromPoints(edgePoints);
    paper.scale.setScalar(1 - p * .08);
    renderer.render(scene, camera);
    host.dataset.paperShape = p.toFixed(3);
  }
  return { render, dispose() {
    geometry.dispose(); edgeGeometry.dispose(); material.dispose();
    (edge.material as THREE.Material).dispose();
    renderer.dispose(); renderer.domElement.remove();
  } };
}
