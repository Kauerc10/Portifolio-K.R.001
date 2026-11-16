const { chromium } = require('C:/Users/suelen.morais/.codex/tmp/portals49-qa/node_modules/playwright');
const fs = require('fs'); const path = require('path');
const out = path.resolve('docs/redesign-ruon/propostas-88/h02-evidence'); fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser = await chromium.launch({channel:'chrome',headless:true}); const results=[];
 for(const width of [390,768,1440,1920]) for(const locale of ['pt-BR','en-US']) for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height:960},deviceScaleFactor:1,reducedMotion:'reduce',colorScheme:theme});
  await context.addInitScript(({theme})=>{sessionStorage.setItem('portfolio-intro-complete','true');localStorage.setItem('theme',theme);},{theme});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://localhost:3070/'+locale,{waitUntil:'networkidle'});
  const result={width,locale,theme,sections:[],errors};
  for(const id of ['sobre','experiencia','skills']){
   const section=page.locator('#'+id); await section.scrollIntoViewIfNeeded();
   result.sections.push(await section.evaluate(el=>({id:el.id,width:el.getBoundingClientRect().width,overflow:document.documentElement.scrollWidth>innerWidth,focusables:el.querySelectorAll('a,button,[tabindex]').length,articles:el.querySelectorAll('article').length})));
   if([390,1440].includes(width)&&locale==='pt-BR'&&theme==='light') await section.screenshot({path:path.join(out,id+'-'+width+'.png')});
  }
  const cta=page.locator('#skills .editorial-cta');await cta.focus();result.focus=await cta.evaluate(el=>({outline:getComputedStyle(el).outline,color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor}));
  result.staticSkills=await page.locator('#skills').evaluate(el=>({projectLinks:el.querySelectorAll('a[href^="#project-"]').length,extraTabs:el.querySelectorAll('[tabindex]').length,text:el.textContent}));
  results.push(result);await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:960},recordVideo:{dir:out,size:{width:1440,height:960}}});
 await context.addInitScript(()=>{sessionStorage.setItem('portfolio-intro-complete','true');localStorage.setItem('theme','light');});
 const page=await context.newPage();await page.goto('http://localhost:3070/pt-BR#sobre',{waitUntil:'networkidle'});
 await page.evaluate(()=>scrollTo(0,document.querySelector('#sobre').offsetTop-100));
 for(const id of ['sobre','experiencia','skills']) {await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(650);await page.mouse.wheel(0,180);await page.waitForTimeout(450);}
 const row=page.locator('#skills article').first();await row.hover();await page.waitForTimeout(300);await row.locator('.editorial-skill-chip').first().hover();await page.waitForTimeout(300);await page.locator('#skills .editorial-cta').focus();await page.waitForTimeout(500);
 const lifecycle={idle:await page.evaluate(()=>document.getAnimations().map(a=>({state:a.playState,target:a.effect?.target?.className})).filter(a=>a.state==='running')),hover:await row.evaluate(el=>({glow:getComputedStyle(el,'::before').opacity,icon:getComputedStyle(el.querySelector('svg')).transform}))};
 await page.emulateMedia({reducedMotion:'reduce'});lifecycle.reduced=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
 await page.locator('#contato').scrollIntoViewIfNeeded();await page.waitForTimeout(250);lifecycle.offscreen=await page.locator('#skills').evaluate(el=>el.getAnimations({subtree:true}).length);
 const video=page.video();await context.close();await video.saveAs(path.join(out,'h02-scroll-hover.webm'));
 // HTTP-delivered HTML without JavaScript.
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:960}});const np=await nojs.newPage();await np.goto('http://localhost:3070/en-US#skills');lifecycle.nojs={groups:await np.locator('#skills article').count(),links:await np.locator('#skills a').count(),text:await np.locator('#skills').textContent()};await nojs.close();
 fs.writeFileSync(path.join(out,'matrix.json'),JSON.stringify(results,null,2));fs.writeFileSync(path.join(out,'motion.json'),JSON.stringify(lifecycle,null,2));
 console.log(JSON.stringify({cases:results.length,overflow:results.filter(r=>r.sections.some(s=>s.overflow)),errors:results.flatMap(r=>r.errors),lifecycle},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
