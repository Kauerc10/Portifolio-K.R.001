const {chromium}=require(process.env.VIO_PLAYWRIGHT || 'C:/Users/suelen.morais/.codex/tmp/portals49-qa/node_modules/playwright');
const assert=require('node:assert/strict');
const url=process.env.STAGE_URL || 'http://localhost:3070/pt-BR#projetos';
const matrix=[[1920,900],[1440,900],[1280,720],[1024,768],[390,844],[1536,720],[1280,600],[960,600],[853,480]];
(async()=>{const browser=await chromium.launch({channel:'chrome'});const failures=[];try{
for(const deviceScaleFactor of [1,2]) for(const [width,height] of matrix){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor,reducedMotion:'reduce'});
 const page=await context.newPage();await page.addInitScript(()=>sessionStorage.setItem('portfolio-intro-complete','true'));
 await page.goto(url,{waitUntil:'networkidle'});const stage=page.locator('#projetos [data-stage-proof]');await stage.scrollIntoViewIfNeeded();
 for(let i=0;i<5;i++){
  const result=await stage.evaluate(stage=>{
   const panel=stage.querySelector('article[aria-hidden=false]');const errors=[];
   const box=e=>{const b=e.getBoundingClientRect();return {left:b.left,top:b.top,right:b.right,bottom:b.bottom,width:b.width,height:b.height}};
   const contains=(parent,child,label,pad=0)=>{if(!parent||!child)return;const a=box(parent),b=box(child);if(b.left<a.left+pad-1||b.top<a.top+pad-1||b.right>a.right-pad+1||b.bottom>a.bottom-pad+1)errors.push({label,parent:a,child:b});};
   // Test the real stage, each nested paper and the actual rendered images.
   const scene=panel.querySelector('[data-stage-scene]');contains(scene,panel.querySelector('[data-stage-canvas]'),'canvas safe area');
   for(const selector of ['[data-vio-document]','[data-vio-results]','[data-doc-paper]','[data-owl-body]','[data-vecom-layer=laptop]','[data-vecom-layer=phone]','[data-atlas-layer=document]','[data-atlas-socket]','[data-ckf-layer=site]','[data-ckf-layer=system]','[data-quote-pdf]'])for(const child of panel.querySelectorAll(selector))contains(stage,child,selector,6);
   contains(panel.querySelector('[data-vio-paper]'),panel.querySelector('[data-vio-qr]'),'QR inside paper',5);
   const paper=panel.querySelector('[data-doc-paper]');if(paper)for(const child of paper.children)contains(paper,child,'Doc paper '+child.tagName,3);
   for(const device of panel.querySelectorAll('[data-vecom-layer=laptop],[data-vecom-layer=phone]')){const image=device.querySelector('img');if(image){contains(device,image,'device image');const natural=image.naturalWidth/image.naturalHeight;const ratio=image.clientWidth/image.clientHeight;if(Math.abs(natural-ratio)>.015)errors.push({label:'capture ratio',natural,ratio});}}
   return {slug:stage.dataset.active,errors};
  });
  if(result.errors.length) failures.push({width,height,deviceScaleFactor,...result});
  if(width===1920&&deviceScaleFactor===1)await stage.screenshot({path:'C:/Users/suelen.morais/.codex/tmp/stage-fit-'+result.slug+'.png'});
  await page.getByRole('button',{name:'Próximo projeto',exact:true}).click();
 }
 await context.close();
}
console.log(JSON.stringify(failures,null,2));assert.equal(failures.length,0,'Nested stage geometry must fit at every viewport and DPR');
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exitCode=1});
