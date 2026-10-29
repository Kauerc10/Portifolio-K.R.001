import * as THREE from 'three';
import { cover, type LandscapeRenderer, type landscapeAssets } from './landscape';
const fragmentShader = `
precision highp float;
uniform sampler2D imageMap, depthMap, pathMap;
uniform vec2 crop, movement;
uniform float zoom;
uniform vec3 highlight;
varying vec2 vUv;
void main() {
 vec2 base = (vUv-.5)*crop/zoom+.5;
 float depth = texture2D(depthMap,base).r;
 // Edge taper preserves the exact poster framing without inventing unseen areas.
 vec2 edge = smoothstep(vec2(0.),vec2(.06),base)*smoothstep(vec2(0.),vec2(.06),1.-base);
 vec2 sampleUv = clamp(base + movement*(depth-.42)*edge, .0001,.9999);
 vec4 color = texture2D(imageMap,sampleUv);
 float mask = dot(texture2D(pathMap,sampleUv).rgb,highlight);
 color.rgb = mix(color.rgb, min(vec3(1.),color.rgb*1.12+vec3(.055,.025,.09)),mask*.65);
 gl_FragColor=color;
}`;
export async function createLandscape(host: HTMLElement, assets: typeof landscapeAssets, signal: AbortSignal, failed: () => void): Promise<LandscapeRenderer> {
 const textures: THREE.Texture[] = [];
 let renderer: THREE.WebGLRenderer | undefined;
 let geometry: THREE.PlaneGeometry | undefined;
 let material: THREE.ShaderMaterial | undefined;
 let disposed = false, frame = 0, paused = false, previous = 0;
 const dispose = () => { if (disposed) return; disposed=true; cancelAnimationFrame(frame); textures.forEach(t=>t.dispose()); geometry?.dispose(); material?.dispose(); renderer?.domElement.remove(); renderer?.dispose(); };
 signal.addEventListener('abort', dispose, { once:true });
 try {
  const loader = new THREE.TextureLoader();
  const loaded = await Promise.allSettled([assets.color, assets.depth, assets.paths].map(async url => {
   const texture = await loader.loadAsync(url); if (disposed) texture.dispose(); else textures.push(texture); return texture;
  }));
  if (disposed || signal.aborted) throw new DOMException('Aborted','AbortError');
  if (loaded.some(r=>r.status==='rejected')) throw new Error('Landscape texture unavailable');
  const [color,depth,paths] = loaded.map(r => (r as PromiseFulfilledResult<THREE.Texture>).value);
  renderer = new THREE.WebGLRenderer({ alpha:false, antialias:false, powerPreference:'low-power' });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.domElement.setAttribute('aria-hidden','true'); renderer.domElement.className='absolute inset-0 w-full h-full';
  renderer.domElement.addEventListener('webglcontextlost', event=>{ event.preventDefault(); failed(); });
  for (const texture of [color,depth,paths]) {
   texture.colorSpace=THREE.NoColorSpace; texture.minFilter=THREE.LinearFilter; texture.magFilter=THREE.LinearFilter; texture.generateMipmaps=false;
   if (texture.image.width > renderer.capabilities.maxTextureSize || texture.image.height > renderer.capabilities.maxTextureSize) throw new Error('Texture exceeds GPU capacity');
  }
  const scene = new THREE.Scene(), camera = new THREE.Camera();
  const uniforms = { imageMap:{value:color},depthMap:{value:depth},pathMap:{value:paths},crop:{value:new THREE.Vector2(1,1)},movement:{value:new THREE.Vector2()},zoom:{value:1},highlight:{value:new THREE.Vector3()} };
  material = new THREE.ShaderMaterial({uniforms,vertexShader:'varying vec2 vUv; void main(){vUv=position.xy*.5+.5;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader,depthTest:false,depthWrite:false});
  geometry = new THREE.PlaneGeometry(2,2); scene.add(new THREE.Mesh(geometry,material));
  const target=[0,0,1,0,0,0], current=[0,0,1,0,0,0];
  let width=1,height=1;
  const draw = (time:number) => {
   frame=0; if(disposed||paused)return;
   const delta=previous ? Math.min((time-previous)/1000,.05) : 1/60; previous=time;
   const damping=1-Math.exp(-10*delta); let changing=false;
   current.forEach((value,index)=>{ const distance=target[index]-value; current[index]=Math.abs(distance)<.00005?target[index]:value+distance*damping; if(current[index]!==target[index])changing=true; });
   uniforms.movement.value.set(current[0]*12/width,-current[1]*12/height);
   uniforms.zoom.value=current[2]; uniforms.highlight.value.set(current[3],current[4],current[5]);
   renderer!.render(scene,camera);
   if(changing)frame=requestAnimationFrame(draw); else previous=0;
  };
  const invalidate=()=>{if(!disposed&&!paused&&!frame)frame=requestAnimationFrame(draw);};
  const resize=()=>{width=host.clientWidth||1;height=host.clientHeight||1; const fit=cover(width,height,color.image.width,color.image.height);uniforms.crop.value.set(fit.x,fit.y); const dpr=Math.min(devicePixelRatio||1,width<768?1:1.5,Math.sqrt(3_000_000/(width*height)));renderer!.setPixelRatio(dpr);renderer!.setSize(width,height,false);invalidate();};
  resize(); cancelAnimationFrame(frame); frame=0; draw(0);
  return {canvas:renderer.domElement,resize,pointer(x,y){target[0]=x;target[1]=y;invalidate();},scroll(progress){target[2]=1+progress*.015;invalidate();},highlight(path){target[3]=path===1?1:0;target[4]=path===2?1:0;target[5]=path===3?1:0;invalidate();},pause(value){paused=value;cancelAnimationFrame(frame);frame=0;previous=0;if(!paused)invalidate();},dispose(){signal.removeEventListener('abort',dispose);dispose();}};
 } catch(error) {dispose(); throw error;}
}
