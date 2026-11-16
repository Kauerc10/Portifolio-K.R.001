const {chromium}=require(process.env.VIO_PLAYWRIGHT);
const fs=require('node:fs');
const assert=require('node:assert/strict');
const out='docs/redesign-ruon/evidence/case-media-layout';
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.VIO_BROWSER});
 const results=[];
 try {
  for(const[name,width,height]of[['wide',1920,1000],['desktop',1440,1000],['mobile',390,844]]){
   for(const slug of ['ckf','vecom','atlas-notarial','docfacil','viodigital']){
    const page=await browser.newPage({viewport:{width,height}});
    await page.goto(`http://localhost:3064/pt-BR/projetos/${slug}`,{waitUntil:'networkidle'});
    const hero=page.locator('main>section').first();
    const heroBox=await hero.boundingBox();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${name}/${slug}: overflow`);
    if(width>=1000) assert(heroBox.width/width>=.82,`${slug}: hero uses screen width`);
    if(slug==='ckf'||slug==='vecom') {
     assert((await page.locator('main').innerText()).includes(slug==='ckf'?'Itajaí':'Blumenau'));
     await page.screenshot({path:`${out}/${name}-${slug}-hero.png`});
    }
    const gallery=page.locator('#telas');await gallery.scrollIntoViewIfNeeded();
    for(const figure of await gallery.locator('figure').all()){
     await figure.scrollIntoViewIfNeeded();
     const img=figure.locator('img');await img.waitFor();
     await img.evaluate(image=>image.decode());
     const bounds=await img.evaluate(image=>{const r=image.getBoundingClientRect();return{width:r.width,height:r.height,fit:getComputedStyle(image).objectFit,portrait:image.naturalWidth<image.naturalHeight}});
     assert.equal(bounds.fit,'contain',`${slug}: complete capture`);
     assert(bounds.height<=481,`${slug}: capture height bounded`);
     if(bounds.portrait) assert(bounds.width<=281,`${slug}: phone capture never fills desktop column`);
    }
    await gallery.scrollIntoViewIfNeeded();
    if(slug==='ckf'||slug==='vecom') await gallery.screenshot({path:`${out}/${name}-${slug}-gallery.png`});
    const open=gallery.locator('button').first();await open.click();
    const dialog=page.locator('dialog[open]');await dialog.waitFor();
    assert(await dialog.locator('a[target=_blank]').first().isVisible());
    await page.keyboard.press('Escape');assert(await open.evaluate(el=>el===document.activeElement));
    if(slug==='ckf'){
     const story=page.locator('[data-ckf-story]');
     const geometry=await story.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,travel:el.offsetHeight-innerHeight+32}));
     await page.evaluate(({top,travel})=>scrollTo({top:top-32+travel*.5,behavior:'instant'}),geometry);
     await page.waitForTimeout(800);
     assert(await story.locator('[data-ckf-panel=services] img').evaluate(el=>getComputedStyle(el).objectFit==='contain'));
     await page.screenshot({path:`${out}/${name}-ckf-story.png`});
    }
    results.push({name,slug,heroWidth:Math.round(heroBox.width),viewport:width,fullCaptures:'PASS',boundedGallery:'PASS',focus:'PASS'});
    await page.close();
   }
  }
  fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(results);
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
