import {expect,it,vi} from 'vitest';
import * as THREE from 'three';
import {createLandscape} from '@/components/hero/renderer';
import {landscapeAssets} from '@/components/hero/landscape';
const {renderFrame}=vi.hoisted(()=>({renderFrame:vi.fn()}));
vi.mock('three',async importOriginal=>{
 const actual=await importOriginal<typeof import('three')>();
 return {...actual,WebGLRenderer:class {
  domElement=document.createElement('canvas');shadowMap={enabled:false,type:0};setClearColor(){}setPixelRatio(){}setSize(){}dispose(){}render=renderFrame;
 }};
});
vi.mock('three/examples/jsm/loaders/GLTFLoader.js',()=>({GLTFLoader:class {async parseAsync(){return {scene:new THREE.Group()};}}}));
it('does not cancel a selected light journey when visibility repeats the current unpaused state',async()=>{
 const callbacks=new Map<number,FrameRequestCallback>();let id=0;
 vi.stubGlobal('requestAnimationFrame',(callback:FrameRequestCallback)=>{callbacks.set(++id,callback);return id;});
 vi.stubGlobal('cancelAnimationFrame',(key:number)=>callbacks.delete(key));
 vi.stubGlobal('fetch',vi.fn(async(url:string)=>url.endsWith('.json')?{ok:true,json:async()=>({cameraPosition:[0,9,28],cameraTarget:[0,1,-1.5],orthoWidth:27,minOrthoHeight:11.5,pathPoints:[[0,0,0],[1,0,1]],routes:{development:[[0,0,0],[1,0,1]]},portals:{development:[1,0,1]}})}:{ok:true,arrayBuffer:async()=>new ArrayBuffer(0)}));
 try {
  const handle=await createLandscape(document.createElement('div'),landscapeAssets,new AbortController().signal,vi.fn());
  handle.highlight(1);handle.pause(false);handle.pause(false);
  const callback=[...callbacks.values()][0];callbacks.clear();callback(100);
  const scene=renderFrame.mock.calls.at(-1)![0] as THREE.Scene;
  const bead=scene.children.find(object=>object instanceof THREE.Mesh&&object.geometry.type==='SphereGeometry');
  expect(bead?.visible).toBe(true);expect(callbacks.size).toBe(1);
  handle.pause(true);expect(callbacks.size).toBe(0);handle.dispose();
 } finally {vi.unstubAllGlobals();}
});
