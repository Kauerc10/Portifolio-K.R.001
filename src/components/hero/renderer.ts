import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { LandscapeRenderer, landscapeAssets } from './landscape';

/** Fixed camera: only the short light journey changes when an HTML destination is selected. */
export async function createLandscape(host: HTMLElement, assets: typeof landscapeAssets, signal: AbortSignal, failed: () => void): Promise<LandscapeRenderer> {
  let renderer: THREE.WebGLRenderer | undefined;
  const scene = new THREE.Scene();
  let disposed = false, paused = false, frame = 0, active = 0, start = 0;
  const materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>(), geometries = new Set<THREE.BufferGeometry>();
  const collect = (root: THREE.Object3D) => root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      materials.add(material);
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
    }
  });
  const contextLost = (event: Event) => { event.preventDefault(); if (!disposed) failed(); };
  const dispose = () => {
    if (disposed) return; disposed = true; cancelAnimationFrame(frame);
    signal.removeEventListener('abort', dispose);
    renderer?.domElement.removeEventListener('webglcontextlost', contextLost);
    collect(scene); geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose()); textures.forEach(value => value.dispose());
    renderer?.domElement.remove(); renderer?.dispose();
  };
  signal.addEventListener('abort', dispose, {once:true});
  try {
    const [response, contractResponse] = await Promise.all([fetch(assets.model, {signal}), fetch(assets.scene, {signal})]);
    if (!response.ok || !contractResponse.ok) throw new Error('Hero model unavailable');
    const contract = await contractResponse.json() as {cameraPosition:[number,number,number];cameraTarget:[number,number,number];orthoWidth:number;minOrthoHeight:number;pathPoints:[number,number,number][];routes?:Record<string,[number,number,number][]>;portals:Record<string,[number,number,number]>};
    if (!contract.pathPoints?.length || !contract.cameraPosition?.length || !(contract.orthoWidth > 0) || !(contract.minOrthoHeight > 0)) throw new Error('Hero scene contract unavailable');
    const buffer = await response.arrayBuffer();
    if (signal.aborted) throw new DOMException('Aborted','AbortError');
    const model = await new GLTFLoader().parseAsync(buffer, '/models/ribbon-portals/');
    scene.add(model.scene); collect(model.scene);
    model.scene.traverse(object=>{
      if(object instanceof THREE.Mesh && object.name.startsWith('violet-')){
        object.material=Array.isArray(object.material)?object.material.map(material=>material.clone()):object.material.clone();
      }
    });
    collect(model.scene);
    if (disposed || signal.aborted) { geometries.forEach(value=>value.dispose()); materials.forEach(value=>value.dispose()); textures.forEach(value=>value.dispose()); throw new DOMException('Aborted','AbortError'); }
    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true, powerPreference:'low-power'});
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0xf7f7fa, 0);
    renderer.domElement.className = 'absolute inset-0 w-full h-full';
    renderer.domElement.setAttribute('aria-hidden','true');
    renderer.domElement.dataset.heroGeometry = 'ribbon-portals';
    renderer.domElement.addEventListener('webglcontextlost',contextLost);
    scene.add(new THREE.HemisphereLight(0xfffaf2,0xc5b9d6,2.5));
    const key = new THREE.DirectionalLight(0xfff8ee,3.5); key.position.set(-6,12,10); scene.add(key);
    const fill = new THREE.DirectionalLight(0xdbd5ff,1); fill.position.set(6,6,-4); scene.add(fill);
    const camera = new THREE.OrthographicCamera(-9.75,9.75,5,-5,.1,100);
    camera.position.fromArray(contract.cameraPosition); camera.lookAt(new THREE.Vector3(...contract.cameraTarget));
    const bead = new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),new THREE.MeshBasicMaterial({color:0xd2b9ff}));
    const halo = new THREE.PointLight(0x9b66ff,5,3,2); bead.add(halo); bead.visible=false; scene.add(bead);
    const path = new THREE.CatmullRomCurve3(contract.pathPoints.map(point=>new THREE.Vector3(...point)),true);
    const keys=['','development','automation','support'];
    const routes=keys.map(key=>contract.routes?.[key]?.length ? new THREE.CatmullRomCurve3(contract.routes[key].map(point=>new THREE.Vector3(...point))) : null);
    const destinations=keys.map(key=>{
      const point=contract.portals[key]; if(!point)return 0;
      let closest=0,distance=Infinity;
      for(let i=0;i<512;i++){const candidate=path.getPoint(i/512).distanceToSquared(new THREE.Vector3(...point));if(candidate<distance){distance=candidate;closest=i/512;}}
      return closest;
    });
    const draw = (time:number) => {
      frame=0; if(disposed || paused) return;
      if (active) {
        if (!start) start=time;
        const progress=Math.min(1,(time-start)/950);
        const point=routes[active]?.getPoint(progress) ?? path.getPoint((destinations[active] + (1-progress)*.28)%1);
        bead.position.copy(point); bead.position.y+=.18;
        bead.visible=progress<1;
        if(progress<1) frame=requestAnimationFrame(draw);
      }
      renderer!.render(scene,camera);
    };
    const invalidate=()=>{if(!disposed&&!paused&&!frame) frame=requestAnimationFrame(draw);};
    const resize=()=>{
      const width=host.clientWidth||1,height=host.clientHeight||1, aspect=width/height;
      const vertical=Math.max(contract.minOrthoHeight,contract.orthoWidth/aspect); camera.left=-vertical*aspect/2; camera.right=vertical*aspect/2; camera.top=vertical/2; camera.bottom=-vertical/2; camera.updateProjectionMatrix();
      renderer!.setPixelRatio(Math.min(devicePixelRatio||1,width<768?1:1.5,Math.sqrt(3_000_000/(width*height)))); renderer!.setSize(width,height,false); invalidate();
    };
    resize(); cancelAnimationFrame(frame);frame=0;draw(0);
    return {canvas:renderer.domElement,resize,pointer(){},scroll(){},highlight(path){
      if(path===active) return; active=path>=1&&path<=3?path:0; start=0; bead.visible=!!active;
      model.scene.traverse(object=>{
        if(!(object instanceof THREE.Mesh)||!object.name.startsWith('violet-'))return;
        const selected=object.name.includes(['','development','automation','support'][active] || '__none');
        for(const material of Array.isArray(object.material)?object.material:[object.material]) if(material instanceof THREE.MeshStandardMaterial){material.emissive.set(selected?0x6534d8:0x000000);material.emissiveIntensity=selected?.35:0;}
      }); invalidate();
    },pause(value){paused=value;cancelAnimationFrame(frame);frame=0;start=0;active=0;bead.visible=false;if(!paused)invalidate();},dispose};
  } catch(error) {dispose();throw error;}
}
