const {chromium}=require('C:/Users/suelen.morais/.codex/tmp/portals49-qa/node_modules/playwright');
const fs=require('fs'),path=require('path'); const out=__dirname;
(async()=>{const b=await chromium.launch({executablePath:'C:/Users/suelen.morais/AppData/Local/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-win64/chrome-headless-shell.exe'});const results=[];
for(const width of [390,768,1440,1920])for(const locale of ['pt-BR','en-US'])for(const theme of ['light','dark']){
 const c=await b.newContext({viewport:{width,height:1000},reducedMotion:'reduce',hasTouch:width===390});const p=await c.newPage();await p.addInitScript(t=>localStorage.setItem('theme',t),theme);
 await p.goto('http://localhost:3067/'+locale+'#projetos');await p.locator('.projects-editorial__detail[data-enhanced]').waitFor();await p.evaluate(()=>document.fonts.ready);
 const before=await p.locator('.projects-editorial__detail').boundingBox();for(const n of [1,2,3]){const a=p.locator('.projects-editorial__index a').nth(n);await a.focus();await p.keyboard.press('Enter');}await p.waitForFunction(()=>document.querySelectorAll('.projects-editorial__case:not([hidden])').length===1);
 await p.waitForFunction(()=>document.querySelector('#projetos').getAnimations({subtree:true}).every(a=>a.playState!=='running'));
 const after=await p.locator('.projects-editorial__detail').boundingBox();const data=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,theme:document.documentElement.className,focus:document.activeElement?.getAttribute('href'),idle:document.querySelector('#projetos').getAnimations({subtree:true}).filter(a=>a.playState==='running').length,h1:document.querySelectorAll('h1').length}));
 if(data.overflow||Math.abs(before.height-after.height)>1||data.focus!=='#project-foli'||data.idle||data.h1!==1)throw Error(JSON.stringify({width,locale,theme,data,before,after}));
 await p.locator('#contato button[type=submit]').click();if(!await p.locator('#nome').evaluate(el=>el===document.activeElement))throw Error('invalid focus');
 if((width===390&&locale==='en-US'&&theme==='dark')||(width===1440&&locale==='pt-BR'&&theme==='light')||(width===768&&locale==='pt-BR'&&theme==='dark')||(width===1920&&locale==='en-US'&&theme==='light')){await p.locator('#experiencia').scrollIntoViewIfNeeded();await p.locator('#experiencia img').evaluate(img=>img.decode());await p.locator('#experiencia').screenshot({path:path.join(out,`${width}-${locale}-${theme}-experience.png`)});await p.locator('#projetos').screenshot({path:path.join(out,`${width}-${locale}-${theme}-projects.png`)});}
 results.push({width,locale,theme,...data,panelHeight:after.height,keyboard:'selection and invalid form focus PASS'});await c.close();}
 fs.writeFileSync(path.join(out,'matrix.json'),JSON.stringify(results,null,2));await b.close();console.log('16 integrated states PASS');})().catch(e=>{console.error(e);process.exit(1)});

