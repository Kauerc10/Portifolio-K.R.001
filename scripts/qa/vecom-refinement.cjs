const {chromium}=require(process.env.VIO_PLAYWRIGHT);
const fs=require('fs');const path=require('path');const assert=require('assert/strict');
(async()=>{const out='docs/redesign-ruon/evidence/c04-vecom-refinement';fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({executablePath:process.env.VIO_BROWSER});const results=[];
try{for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
 const ctx=await browser.newContext({viewport:{width,height},recordVideo:{dir:path.join(out,'raw'),size:{width,height}}});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3064/pt-BR#project-vecom',{waitUntil:'networkidle'});
 assert.equal(await page.locator('#project-vecom [data-vecom-art]').evaluate(el=>getComputedStyle(el).viewTransitionName),'vecom-scene');
 await page.locator('#project-vecom a[href="/pt-BR/projetos/vecom"]').click();await page.waitForURL('**/projetos/vecom');await page.waitForTimeout(300);await page.screenshot({path:path.join(out,`${name}-entrance.png`)});await page.waitForTimeout(1300);
 const root=page.locator('[data-vecom-handoff]');const card=page.locator('[data-handoff-card]');const r=await root.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,travel:el.offsetHeight-innerHeight+32}));
 const seek=async p=>{await page.evaluate(({top,travel,p})=>scrollTo({top:top-32+travel*p,behavior:'instant'}),{...r,p});await page.waitForTimeout(250);return card.evaluate(el=>({left:el.getBoundingClientRect().left,top:el.getBoundingClientRect().top}));};
 const positions=[];for(const [phase,p] of [['fill',.05],['send',.5],['receive',.95]]){positions.push(await seek(p));assert.equal(await root.getAttribute('data-handoff-stage'),phase);await page.screenshot({path:path.join(out,`${name}-${phase}.png`)});}
 assert(positions[0].left<positions[1].left&&positions[1].left<positions[2].left);const held=await seek(.5);await page.waitForTimeout(650);assert.deepEqual(await card.evaluate(el=>({left:el.getBoundingClientRect().left,top:el.getBoundingClientRect().top})),held);
 const reversed=await seek(.1);assert(reversed.left<held.left);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
 const video=page.video();await ctx.close();await video.saveAs(path.join(out,`${name}-journey.webm`));results.push({name,scrollAdvancePauseReverse:'PASS',stageCaptures:'PASS',errors});
 }
 for(const mode of ['reduced','low','nojs','english']){const ctx=await browser.newContext({viewport:{width:390,height:mode==='low'?600:844},reducedMotion:mode==='reduced'?'reduce':'no-preference',javaScriptEnabled:mode!=='nojs'});const page=await ctx.newPage();await page.goto(`http://localhost:3064/${mode==='english'?'en-US':'pt-BR'}/projetos/vecom#jornada`,{waitUntil:'networkidle'});if(mode!=='english')assert.equal(await page.locator('[data-vecom-handoff]').getAttribute('data-handoff-stage'),'receive');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:path.join(out,`${mode}.png`)});await ctx.close();results.push({mode,result:'PASS'});}
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log(results);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
