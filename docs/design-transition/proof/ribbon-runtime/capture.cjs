// Run against a fresh production build. Browser plugin was unavailable; regular Playwright uses installed Chrome.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs/promises');
const base=process.env.HERO_QA_URL||'http://127.0.0.1:3100';
const out=__dirname;
async function prepare(page){await page.route('**/api/github**',r=>r.fulfill({status:503,body:'{}'}));await page.route(/^https?:\/\/(?!127\.0\.0\.1:3100)/,r=>r.abort());}
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 if(process.argv.includes('--poster')){
  const page=await browser.newPage({viewport:{width:2400,height:1350}});await prepare(page);await page.route('**/scene.json',async route=>{const response=await route.fetch();const data=await response.json();data.orthoWidth=39;await route.fulfill({json:data});});await page.goto(`${base}/pt-BR`);await page.waitForSelector('[data-landscape-state="ready"]');
  await page.addStyleTag({content:`html,body{background:transparent!important} body,body *{visibility:hidden!important} .hero-landscape{position:fixed!important;inset:0!important;margin:0!important;width:2400px!important;height:1350px!important;min-height:0!important;background:none!important;visibility:visible!important;z-index:999999!important}.hero-landscape img{display:none!important}.hero-landscape canvas{visibility:visible!important}`});
  await page.waitForTimeout(700);await page.locator('.hero-landscape canvas').screenshot({path:`${out}/calibrated-poster.png`,omitBackground:true});await page.close();
 } else {
  const report=[];
  for(const width of [1440,1024,390,320]){
   const page=await browser.newPage({viewport:{width,height:width<500?844:1000},isMobile:width<500,hasTouch:width<500});await prepare(page);const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(`${base}/pt-BR`);await page.waitForSelector('[data-landscape-state="ready"]');await page.locator('#hero').screenshot({path:`${out}/${width}-final.png`});
   const data=await page.evaluate(()=>({state:document.querySelector('[data-landscape-state]').dataset.landscapeState,overflow:document.documentElement.scrollWidth>innerWidth,heroHeight:document.querySelector('#hero').clientHeight,canvas:!!document.querySelector('canvas[data-hero-geometry]')}));
   await page.getByRole('button',{name:'Explorar Automação',exact:true}).click();await page.waitForTimeout(280);if(width===1440)await page.locator('#hero').screenshot({path:`${out}/1440-light-final.png`});await page.waitForTimeout(900);data.preview=await page.getByRole('region',{name:'Prévia da área'}).innerText();data.href=await page.getByRole('link',{name:'Ver Automação'}).getAttribute('href');await page.locator('#hero').screenshot({path:`${out}/${width}-selected-final.png`});
   report.push({width,errors,...data});await page.close();
  }
  await fs.writeFile(`${out}/qa-final.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report));
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
