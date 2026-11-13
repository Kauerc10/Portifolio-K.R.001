const {chromium}=require(process.env.VIO_PLAYWRIGHT);
const assert=require('node:assert/strict');const fs=require('node:fs');
const out='docs/redesign-ruon/evidence/c09-showcase';fs.mkdirSync(out,{recursive:true});
const slugs=['viodigital','vecom','atlas-notarial','docfacil','ckf'];
(async()=>{const browser=await chromium.launch({executablePath:process.env.VIO_BROWSER});const results=[];
try{for(const [name,width,height,locale,dark]of[['desktop',1440,1000,'pt-BR',false],['mobile',390,844,'pt-BR',false],['english-dark',1440,1000,'en-US',true]]){
const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(dark=>{sessionStorage.setItem('portfolio-intro-complete','true');localStorage.setItem('theme',dark?'dark':'light')},dark);
await page.goto('http://localhost:3064/'+locale+'#projetos',{waitUntil:'networkidle'});
const root=page.locator('#projetos');await root.scrollIntoViewIfNeeded();
assert.deepEqual(await root.locator('[data-project-preview]').evaluateAll(es=>es.map(e=>e.id)),slugs.map(s=>'project-'+s));
assert.equal(await root.locator('.projects-editorial__layout').count(),0);
assert.equal(await root.locator('video').count(),0);
await page.screenshot({path:out+'/'+name+'-index.png'});
const toggle=root.getByRole('button',{name:locale==='pt-BR'?/Leitura rápida/i:/Quick read/i});await toggle.click();
await page.waitForFunction(()=>document.querySelector('#projetos').dataset.projectReading==='quick');
for(const slug of slugs){const preview=page.locator('#project-'+slug);await preview.scrollIntoViewIfNeeded();await page.waitForTimeout(100);
assert.equal(await preview.locator('[data-project-sticky]').evaluate(e=>getComputedStyle(e).position),'static');
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+'/'+slug+' overflow');
if(slug==='vecom'||slug==='ckf')await page.screenshot({path:out+'/'+name+'-'+slug+'.png'});
const link=preview.locator('a[href="/'+locale+'/projetos/'+slug+'"]');await link.scrollIntoViewIfNeeded();const departure=await page.evaluate(()=>scrollY);await link.click();await page.waitForURL('**/'+locale+'/projetos/'+slug);await page.waitForTimeout(1100);assert(await page.locator('h1').isVisible());
await page.locator('header a[href="/'+locale+'#project-'+slug+'"]').last().click();await page.waitForURL('**/'+locale+'#project-'+slug);await page.waitForTimeout(350);
assert.equal(await root.getAttribute('data-project-reading'),'quick');assert(Math.abs(await page.evaluate(()=>scrollY)-departure)<14,slug+' return');
assert.equal(await page.locator('dialog[open]').count(),0,'intro not repeated');}
await toggle.click();await page.waitForFunction(()=>document.querySelector('#projetos').dataset.projectReading==='normal');
const first=root.locator('[data-project-preview]').first();await first.scrollIntoViewIfNeeded();await page.waitForTimeout(100);
assert.equal(await first.locator('[data-project-sticky]').evaluate(e=>getComputedStyle(e).position),'sticky');
const geometry=await first.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,travel:e.offsetHeight-innerHeight+80}));
const seek=async value=>{await page.evaluate(({top,travel,value})=>scrollTo({top:top-80+travel*value,behavior:'instant'}),{...geometry,value});await page.waitForTimeout(120);return first.evaluate(e=>Number(e.style.getPropertyValue('--vio-progress')))};
const early=await seek(.1),late=await seek(.85),reverse=await seek(.3);assert(early<late&&reverse<late,'normal scroll moves and reverses');await page.waitForTimeout(350);assert.equal(await first.evaluate(e=>Number(e.style.getPropertyValue('--vio-progress'))),reverse,'scroll pause holds scene');

assert.deepEqual(errors,[]);results.push({name,fiveCaseJourneys:'PASS',quickReading:'PASS',layout:'PASS',errors});await context.close();}
for(const mode of ['nojs','reduced','storage-blocked','low-height']){const context=await browser.newContext({viewport:{width:mode==='low-height'?1280:390,height:mode==='low-height'?600:844},javaScriptEnabled:mode!=='nojs',reducedMotion:mode==='reduced'?'reduce':'no-preference'});const page=await context.newPage();if(mode==='storage-blocked')await page.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('blocked')};Storage.prototype.setItem=()=>{throw Error('blocked')}});
await page.goto('http://localhost:3064/pt-BR#project-atlas',{waitUntil:'networkidle'});assert.equal(await page.locator('[data-project-preview]').count(),5);
await page.locator('#project-atlas-notarial a').first().scrollIntoViewIfNeeded();assert(await page.locator('#project-atlas-notarial a').first().isVisible());
if(mode==='reduced'||mode==='low-height')assert.equal(await page.locator('#project-atlas-notarial [data-project-sticky]').evaluate(e=>getComputedStyle(e).position),'static');
await page.goto('http://localhost:3064/pt-BR#project-foli',{waitUntil:'networkidle'});assert(await page.locator('#project-foli a').isVisible());
results.push({mode,aliasesAndFallback:'PASS'});await context.close();}
fs.writeFileSync(out+'/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
