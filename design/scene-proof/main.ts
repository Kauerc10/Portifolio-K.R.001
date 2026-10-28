import * as THREE from 'three';
import { buildProofWorld, proofCamera } from './world';
import { loadAuthoredWorld } from './authored';

const canvas = document.querySelector('canvas')!;
const params = new URLSearchParams(location.search);
const mobile = params.get('camera') === 'mobile';
// ?scene=blockout shows the earlier procedural experiment for comparison; default is the authored GLB.
const blockout = params.get('scene') === 'blockout';
const width = innerWidth, height = innerHeight;
const percentile = (values: number[], fraction: number) => [...values].sort((a, b) => a - b)[Math.floor((values.length - 1) * fraction)];

async function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(mobile ? 1 : 1.5);
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  if (blockout) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
  }
  const world = blockout ? buildProofWorld() : await loadAuthoredWorld();
  const camera = proofCamera(width, height, mobile);
  renderer.render(world.scene, camera);
  const base = camera.position.clone();
  const gl = renderer.getContext();
  const extension = gl.getExtension('WEBGL_debug_renderer_info');
  const anchors = Object.fromEntries(Object.entries(world.anchors).map(([id, point]) => {
    const projected = point.clone().project(camera);
    return [id, { x: (projected.x + 1) * width / 2, y: (1 - projected.y) * height / 2 }];
  }));
  const proof = {
    ready: true,
    metrics: { width, height, dpr: renderer.getPixelRatio(), mobile,
      triangles: renderer.info.render.triangles, calls: renderer.info.render.calls,
      geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures,
      renderer: extension ? gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
      three: THREE.REVISION, anchors,
    },
    async measure(duration = 10000) {
      const frames: number[] = [], submit: number[] = [];
      let start = 0, previous = 0;
      return new Promise(resolve => {
        const frame = (time: number) => {
          if (!start) { start = time; previous = time; }
          const elapsed = time - start;
          camera.position.x = base.x + Math.sin(elapsed * .001) * .35;
          camera.lookAt(mobile ? new THREE.Vector3(0, 1.5, 5.8) : new THREE.Vector3());
          const before = performance.now();
          renderer.render(world.scene, camera);
          if (elapsed > 1500) { frames.push(time - previous); submit.push(performance.now() - before); }
          previous = time;
          if (elapsed < duration + 1500) requestAnimationFrame(frame);
          else {
            camera.position.copy(base);
            camera.lookAt(mobile ? new THREE.Vector3(0, 1.5, 5.8) : new THREE.Vector3());
            renderer.render(world.scene, camera);
            resolve({ ...proof.metrics, durationMs: elapsed - 1500, samples: frames.length,
              steadyTriangles: renderer.info.render.triangles, steadyCalls: renderer.info.render.calls,
              frameMedianMs: percentile(frames, .5), frameP95Ms: percentile(frames, .95),
              cpuSubmitMedianMs: percentile(submit, .5), cpuSubmitP95Ms: percentile(submit, .95) });
          }
        };
        requestAnimationFrame(frame);
      });
    },
  };
  Object.assign(window, { sceneProof: proof });
  addEventListener('pagehide', () => { world.dispose(); renderer.dispose(); }, { once: true });
}

start().catch(error => {
  canvas.hidden = true;
  document.querySelector<HTMLElement>('#failure')!.hidden = false;
  Object.assign(window, { sceneProof: { ready: false, error: String(error) } });
});
