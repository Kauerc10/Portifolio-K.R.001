const {chromium}=require('C:/Users/suelen.morais/.codex/tmp/portals49-qa/node_modules/playwright');
const fs=require('fs');const path=require('path');const out=path.resolve('docs/redesign-ruon/evidence/R03');fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'C:/Users/suelen.morais/AppData/Local/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-win64/chrome-headless-shell.exe'});const results=[];
for(const width of [1440,390])for(const reduced of [false,true]){
 const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:reduced?'reduce':'no-preference'});const page=await context.newPage();await page.goto('http://localhost:3066/pt-BR#projetos');await page.locator('.projects-editorial__detail[data-enhanced]').waitFor();await page.evaluate(()=>document.fonts.ready);
 const detail=page.locator('.projects-editorial__detail');const before=await detail.boundingBox();
 await page.locator('.projects-editorial__index a').nth(1).click();await page.locator('.projects-editorial__index a').nth(2).click();await page.locator('.projects-editorial__index a').nth(3).click();
 await page.waitForTimeout(250);const after=await detail.boundingBox();if(Math.abs(before.height-after.height)>1)throw Error('panel height shifted');
 const active=page.locator('.projects-editorial__index a').nth(3);if(!await active.evaluate(el=>el===document.activeElement))throw Error('focus lost');if(await page.locator('.projects-editorial__case:not([hidden])').count()!==1)throw Error('multiple panels');
 await page.locator('#projetos').screenshot({path:path.join(out,`${width}-${reduced?'reduced':'motion'}-projects.png`)});
 const animations=await page.evaluate(()=>document.querySelector('#projetos').getAnimations({subtree:true}).filter(a=>a.playState==='running').length);if(animations)throw Error('idle animation');
 await page.locator('#contato button[type=submit]').click();if(!await page.locator('#nome').evaluate(el=>el===document.activeElement))throw Error('invalid field focus');await page.locator('#contato').screenshot({path:path.join(out,`${width}-${reduced?'reduced':'motion'}-contact.png`)});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)throw Error('horizontal overflow');results.push({width,reduced,panelHeight:after.height,focus:true,animations,overflow});await context.close();
}
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await nojs.newPage();await page.goto('http://localhost:3066/pt-BR#projetos');if(await page.locator('.projects-editorial__case:visible').count()!==4)throw Error('noJS projects lost');results.push({noJS:'four projects and real links visible'});await nojs.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));await browser.close();})().catch(e=>{console.error(e);process.exit(1)});

