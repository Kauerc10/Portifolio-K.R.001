import * as THREE from 'three';
import cleanImgUrl from './assets/hero-clean.webp?url';
import depthImgUrl from './assets/hero-depth.webp?url';
import pathsImgUrl from './assets/hero-paths-id.webp?url';

export interface Landscape2D5 {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  material: THREE.ShaderMaterial;
  setMouse: (x: number, y: number) => void;
  setScroll: (scrollProgress: number) => void;
  setHoveredPath: (pathId: 0 | 1 | 2 | 3, intensity?: number) => void;
  update: (time: number) => void;
  anchors: Record<'development' | 'automation' | 'support', { xRatio: number; yRatio: number }>;
  dispose: () => void;
}

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform sampler2D u_image;
uniform sampler2D u_depth;
uniform sampler2D u_paths;
uniform vec2 u_resolution;
uniform vec2 u_image_res;
uniform vec2 u_mouse;
uniform float u_parallax_scale;
uniform float u_scroll_zoom;
uniform float u_time;
uniform float u_hovered_path;
uniform float u_hover_intensity;

varying vec2 vUv;

void main() {
  float screenAspect = u_resolution.x / u_resolution.y;
  float imageAspect = u_image_res.x / u_image_res.y;

  vec2 scale = vec2(1.0);
  if (screenAspect > imageAspect) {
    scale = vec2(1.0, screenAspect / imageAspect);
  } else {
    scale = vec2(imageAspect / screenAspect, 1.0);
  }

  // Centered UV for object-fit cover
  vec2 centeredUv = (vUv - 0.5) * scale + 0.5;

  // Safety margin so parallax never exposes empty canvas borders
  float zoom = u_scroll_zoom;
  vec2 safeUv = (centeredUv - 0.5) / (1.06 * zoom) + 0.5;

  // Pure white background matching the sky
  vec3 bgColor = vec3(1.0, 1.0, 1.0);

  if (safeUv.x < 0.0 || safeUv.x > 1.0 || safeUv.y < 0.0 || safeUv.y > 1.0) {
    gl_FragColor = vec4(bgColor, 1.0);
    return;
  }

  // Texture coordinates
  vec2 texCoord = safeUv;

  // Sample depth (1.0 = close, 0.08 = far mountains, 0.0 = sky)
  float depth = texture2D(u_depth, texCoord).r;
  if (depth < 0.05) depth = 0.08; // Sky stays locked with distant mountain horizon

  // Pivot around midground (0.42)
  float pivot = 0.42;
  vec2 parallax = u_mouse * (depth - pivot) * u_parallax_scale;

  // Secondary depth sample for parallax occlusion smoothing
  vec2 sampleCoord = clamp(texCoord + parallax, 0.0, 1.0);
  float depth2 = texture2D(u_depth, sampleCoord).r;
  if (depth2 < 0.05) depth2 = 0.08;
  vec2 refinedParallax = u_mouse * (mix(depth, depth2, 0.5) - pivot) * u_parallax_scale;
  vec2 finalCoord = clamp(texCoord + refinedParallax, 0.0, 1.0);

  // Sample color
  vec4 color = texture2D(u_image, finalCoord);

  // Sample path ID mask (R = Dev, G = Auto, B = Support)
  vec3 pathMask = texture2D(u_paths, finalCoord).rgb;

  float activeMask = 0.0;
  if (u_hovered_path > 0.5 && u_hovered_path < 1.5) {
    activeMask = pathMask.r;
  } else if (u_hovered_path > 1.5 && u_hovered_path < 2.5) {
    activeMask = pathMask.g;
  } else if (u_hovered_path > 2.5 && u_hovered_path < 3.5) {
    activeMask = pathMask.b;
  }

  if (activeMask > 0.05) {
    float wave = 0.85 + 0.15 * sin(u_time * 3.8);
    vec3 glowColor = vec3(0.58, 0.35, 0.96);
    color.rgb = mix(color.rgb, glowColor * 1.35, activeMask * u_hover_intensity * wave);
  }

  gl_FragColor = color;
}
`;

export async function createLandscape2D5(width: number, height: number): Promise<Landscape2D5> {
  const loader = new THREE.TextureLoader();

  const [imageTex, depthTex, pathsTex] = await Promise.all([
    loader.loadAsync(cleanImgUrl),
    loader.loadAsync(depthImgUrl),
    loader.loadAsync(pathsImgUrl),
  ]);

  imageTex.colorSpace = THREE.SRGBColorSpace;
  imageTex.minFilter = THREE.LinearFilter;
  imageTex.magFilter = THREE.LinearFilter;

  depthTex.minFilter = THREE.LinearFilter;
  depthTex.magFilter = THREE.LinearFilter;

  pathsTex.minFilter = THREE.NearestFilter;
  pathsTex.magFilter = THREE.NearestFilter;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f7f7fa');

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    u_image: { value: imageTex },
    u_depth: { value: depthTex },
    u_paths: { value: pathsTex },
    u_resolution: { value: new THREE.Vector2(width, height) },
    u_image_res: { value: new THREE.Vector2(1024, 768) },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_parallax_scale: { value: 0.024 }, // ~2° angular parallax equivalent
    u_scroll_zoom: { value: 1.0 },
    u_time: { value: 0 },
    u_hovered_path: { value: 0.0 },
    u_hover_intensity: { value: 0.0 },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const quad = new THREE.Mesh(geometry, material);
  scene.add(quad);

  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  let targetHoverIntensity = 0;
  let currentHoverIntensity = 0;

  // Normalized 2D anchor positions on the 1024x768 clean image
  const anchors = {
    development: { xRatio: 160 / 1024, yRatio: 350 / 768 },
    automation: { xRatio: 526 / 1024, yRatio: 280 / 768 },
    support: { xRatio: 882 / 1024, yRatio: 334 / 768 },
  };

  return {
    scene,
    camera,
    material,
    anchors,
    setMouse(x: number, y: number) {
      targetMouseX = Math.max(-1, Math.min(1, x));
      targetMouseY = Math.max(-1, Math.min(1, y));
    },
    setScroll(progress: number) {
      const zoom = 1.0 + Math.min(0.06, Math.max(0, progress) * 0.06);
      uniforms.u_scroll_zoom.value = zoom;
    },
    setHoveredPath(pathId: 0 | 1 | 2 | 3, intensity = 1.0) {
      uniforms.u_hovered_path.value = pathId;
      targetHoverIntensity = pathId > 0 ? intensity : 0.0;
    },
    update(time: number) {
      // Smooth inertial lerp for mouse (spring-like feel, 0.06)
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;
      uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

      // Smooth hover fade
      currentHoverIntensity += (targetHoverIntensity - currentHoverIntensity) * 0.12;
      uniforms.u_hover_intensity.value = currentHoverIntensity;

      uniforms.u_time.value = time;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      imageTex.dispose();
      depthTex.dispose();
      pathsTex.dispose();
      scene.clear();
    },
  };
}
