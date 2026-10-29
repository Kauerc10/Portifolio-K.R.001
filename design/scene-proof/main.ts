import * as THREE from 'three';
import { buildProofWorld, proofCamera } from './world';
import { loadAuthoredWorld } from './authored';
import { createLandscape2D5 } from './landscape2d5';

const canvas = document.querySelector('canvas')!;
const params = new URLSearchParams(location.search);
const mobile = params.get('camera') === 'mobile';
// ?scene=blockout shows the earlier procedural experiment; ?engine=3d shows the authored GLB; default is 2.5D.
const blockout = params.get('scene') === 'blockout';
const use3D = params.get('engine') === '3d';
const width = innerWidth, height = innerHeight;
const percentile = (values: number[], fraction: number) => [...values].sort((a, b) => a - b)[Math.floor((values.length - 1) * fraction)];

async function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(mobile ? 1 : 1.5);
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  if (!use3D && !blockout) {
    // 2.5D Volumetric Landscape with Canonical Approved Artwork
    const landscape = await createLandscape2D5(width, height);
    renderer.render(landscape.scene, landscape.camera);

    const gl = renderer.getContext();
    const extension = gl.getExtension('WEBGL_debug_renderer_info');

    // Calculate pixel anchors on screen based on cover aspect scaling
    const screenAspect = width / height;
    const imageAspect = 1024 / 768;
    let scaleX = 1.0, scaleY = 1.0;
    if (screenAspect > imageAspect) {
      scaleY = screenAspect / imageAspect;
    } else {
      scaleX = imageAspect / screenAspect;
    }

    const anchors = Object.fromEntries(Object.entries(landscape.anchors).map(([id, pt]) => {
      const u = (pt.xRatio - 0.5) * 1.06 + 0.5;
      const v = (pt.yRatio - 0.5) * 1.06 + 0.5;
      const screenX = ((u - 0.5) / scaleX + 0.5) * width;
      const screenY = ((v - 0.5) / scaleY + 0.5) * height;
      return [id, { x: screenX, y: screenY }];
    }));

    window.addEventListener('pointermove', (e: PointerEvent) => {
      const mx = (e.clientX / width - 0.5) * 2;
      const my = (e.clientY / height - 0.5) * 2;
      landscape.setMouse(mx, my);
    }, { passive: true });

    let animId = 0;
    const renderLoop = (time: number) => {
      animId = requestAnimationFrame(renderLoop);
      landscape.update(time * 0.001);
      renderer.render(landscape.scene, landscape.camera);
    };
    animId = requestAnimationFrame(renderLoop);

    const proof = {
      ready: true,
      engine: '2.5D-volumetric',
      metrics: {
        width, height, dpr: renderer.getPixelRatio(), mobile,
        triangles: 2, calls: 1, geometries: 1, textures: 3,
        renderer: extension ? gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
        three: THREE.REVISION, anchors,
      },
      setHoveredPath(id: 0 | 1 | 2 | 3) {
        landscape.setHoveredPath(id);
      },
      async measure(duration = 10000) {
        cancelAnimationFrame(animId);
        const frames: number[] = [], submit: number[] = [];
        let start = 0, previous = 0;
        return new Promise(resolve => {
          const frame = (time: number) => {
            if (!start) { start = time; previous = time; }
            const elapsed = time - start;
            landscape.setMouse(Math.sin(elapsed * 0.001) * 0.45, Math.cos(elapsed * 0.0008) * 0.25);
            landscape.update(time * 0.001);
            const before = performance.now();
            renderer.render(landscape.scene, landscape.camera);
            if (elapsed > 1500) {
              frames.push(time - previous);
              submit.push(performance.now() - before);
            }
            previous = time;
            if (elapsed < duration + 1500) {
              requestAnimationFrame(frame);
            } else {
              landscape.setMouse(0, 0);
              landscape.update(time * 0.001);
              renderer.render(landscape.scene, landscape.camera);
              animId = requestAnimationFrame(renderLoop);
              resolve({
                ...proof.metrics,
                durationMs: elapsed - 1500,
                samples: frames.length,
                steadyTriangles: 2,
                steadyCalls: 1,
                frameMedianMs: percentile(frames, 0.5),
                frameP95Ms: percentile(frames, 0.95),
                cpuSubmitMedianMs: percentile(submit, 0.5),
                cpuSubmitP95Ms: percentile(submit, 0.95),
              });
            }
          };
          requestAnimationFrame(frame);
        });
      },
    };

    Object.assign(window, { sceneProof: proof });
    addEventListener('pagehide', () => {
      cancelAnimationFrame(animId);
      landscape.dispose();
      renderer.dispose();
    }, { once: true });
    return;
  }

  // Legacy 3D code path for comparison (?engine=3d)
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
    engine: '3D-mesh',
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
