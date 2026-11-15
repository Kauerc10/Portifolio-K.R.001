const {chromium}=require(process.env.VIO_PLAYWRIGHT);
const fs=require('node:fs');
const assert=require('node:assert/strict');
const out='docs/redesign-ruon/evidence/c08-ckf';
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.VIO_BROWSER});const results=[];
 try {
  for(const[name,width,height]of[['desktop',1440,1000],['mobile',390,844]]){
   const page=await browser.newPage({viewport:{width,height},recordVideo:{dir:`${out}/raw`,size:{width,height}}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
   await page.goto('http://localhost:3064/pt-BR#project-ckf',{waitUntil:'networkidle'});
   const preview=page.locator('#project-ckf');
   const home=await preview.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,travel:el.offsetHeight-innerHeight+80}));
   for(const[stage,p]of[['site',.1],['system',.9]]){
    await page.evaluate(({top,travel,p})=>scrollTo({top:top-80+travel*p,behavior:'instant'}),{...home,p});await page.waitForTimeout(300);
    assert.equal(await preview.getAttribute('data-ckf-focus'),stage);
    await page.screenshot({path:`${out}/${name}-home-${stage}.png`});
   }
   await preview.locator('a[href="/pt-BR/projetos/ckf"]').click();await page.waitForURL('**/pt-BR/projetos/ckf');await page.waitForTimeout(1400);
   await page.locator('main>section').first().locator('a[href="#sistema"]').click();
   const root=page.locator('[data-ckf-quote-story]');
   await page.waitForFunction(()=>document.querySelector('[data-ckf-quote-story]')?.dataset.ckfQuoteMotion==='scroll');
   const geometry=await root.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,travel:el.offsetHeight-innerHeight+32}));
   const seek=async p=>{
    await page.evaluate(({top,travel,p})=>scrollTo({top:top-32+travel*p,behavior:'instant'}),{...geometry,p});
    await page.waitForFunction(p=>Math.abs(Number(document.querySelector('[data-ckf-quote-story]').style.getPropertyValue('--quote-progress'))-p)<.001,p);await page.waitForTimeout(150);
    return root.evaluate(el=>Number(el.style.getPropertyValue('--quote-progress')));
   };
   for(const[stage,p]of[['items',.05],['quote',.5],['pdf',.97]]){await seek(p);assert.equal(await root.getAttribute('data-ckf-quote-stage'),stage);await page.screenshot({path:`${out}/${name}-${stage}.png`});}
   const middle=await seek(.5);const before=await root.locator('[data-quote-token]').first().boundingBox();await page.waitForTimeout(500);
   assert.equal(await root.evaluate(el=>Number(el.style.getPropertyValue('--quote-progress'))),middle);
   await seek(.4);const after=await root.locator('[data-quote-token]').first().boundingBox();assert(Math.abs(before.x-after.x)>8);assert(await seek(.1)<middle);
   for(const figure of await root.locator('figure').all()) assert.equal(await figure.locator('img').evaluate(el=>getComputedStyle(el).objectFit),'contain');
   const pdf=await page.request.get('http://localhost:3064/assets/projects/ckf/example-quote.pdf');assert(pdf.ok());assert.equal((await pdf.body()).subarray(0,5).toString(),'%PDF-');
   assert.equal(await root.locator('a[href$="example-quote.pdf"]').getAttribute('target'),'_blank');
   assert.equal(await page.locator('#telas figure').count(),2);assert.equal(await page.locator('#telas-sistema figure').count(),4);
   const gallery=page.locator('#telas-sistema');await gallery.scrollIntoViewIfNeeded();
   for(const figure of await gallery.locator('figure').all()){
    await figure.scrollIntoViewIfNeeded();const img=figure.locator('img');await img.evaluate(el=>el.decode());
    assert(await img.evaluate(el=>getComputedStyle(el).objectFit==='contain'&&el.getBoundingClientRect().height<=481));
   }
   await gallery.screenshot({path:`${out}/${name}-system-gallery.png`});
   const open=gallery.locator('button').first();await open.focus();await page.keyboard.press('Enter');assert(await page.locator('dialog[open]').isVisible());await page.keyboard.press('Escape');assert(await open.evaluate(el=>el===document.activeElement));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
   for(let p=.1;p<=.98;p+=.08)await seek(p);
   const video=page.video();
   results.push({name,homeEmphasis:'PASS',stages:'PASS',pauseReverse:'PASS',tokenMovement:'PASS',pdf:'PASS',separateGalleries:'PASS',keyboard:'PASS',errors});await page.close();await video.saveAs(`${out}/${name}-journey.webm`);
  }
  for(const mode of ['reduced','nojs','low','dark','media-failure','english']){
   const context=await browser.newContext({viewport:{width:390,height:mode==='low'?600:844},reducedMotion:mode==='reduced'?'reduce':'no-preference',javaScriptEnabled:mode!=='nojs'});
   const page=await context.newPage();if(mode==='dark')await page.addInitScript(()=>localStorage.setItem('theme','dark'));
   if(mode==='media-failure')await page.route('**/assets/projects/ckf/*.png',route=>route.abort());
   await page.goto(`http://localhost:3064/${mode==='english'?'en-US':'pt-BR'}/projetos/ckf#sistema`,{waitUntil:'networkidle'});
   const root=page.locator('[data-ckf-quote-story]');
   if(['reduced','nojs','low'].includes(mode))assert.equal(await root.getAttribute('data-ckf-quote-motion'),'static');
   assert.equal(await root.locator('ol li').count(),3);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await root.screenshot({path:`${out}/${mode}-quote-story.png`});results.push({mode,flowAccessible:'PASS'});await context.close();
  }
  fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(results);
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
