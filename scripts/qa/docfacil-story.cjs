const { chromium } = require(process.env.VIO_PLAYWRIGHT);
const fs = require('node:fs');
const assert = require('node:assert/strict');
const out = 'docs/redesign-ruon/evidence/c06-docfacil/story';
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.VIO_BROWSER });
  const results = [];
  try {
    for (const [name, width, height] of [['desktop',1440,1000], ['mobile',390,844]]) {
      const context = await browser.newContext({ viewport: { width, height } });
      const page = await context.newPage();
      await page.goto('http://localhost:3064/pt-BR/projetos/docfacil', { waitUntil:'networkidle' });
      const root = page.locator('[data-docfacil-story]');
      await page.waitForFunction(() => document.querySelector('[data-docfacil-story]')?.dataset.docfacilMotion === 'scroll');
      const geometry = await root.evaluate(el => ({ top:el.getBoundingClientRect().top+scrollY, travel:el.offsetHeight-innerHeight+32 }));
      const seek = async value => {
        await page.evaluate(({top,travel,value}) => scrollTo({top:top-32+travel*value,behavior:'instant'}), {...geometry,value});
        await page.waitForFunction(value => Math.abs(Number(document.querySelector('[data-docfacil-story]').style.getPropertyValue('--docfacil-story-progress'))-value)<.001, value);
        await page.waitForTimeout(150);
        return root.evaluate(el => Number(el.style.getPropertyValue('--docfacil-story-progress')));
      };
      for (const [stage,value] of [['choose',.05],['answer',.35],['review',.68],['pdf',.98]]) {
        await seek(value);
        assert.equal(await root.getAttribute('data-docfacil-stage'),stage);
        await page.screenshot({path:`${out}/${name}-${stage}.png`});
      }
      const middle = await seek(.35);
      const before = await root.locator('[data-docfacil-reply]').boundingBox();
      await page.waitForTimeout(500);
      assert.equal(await root.evaluate(el=>Number(el.style.getPropertyValue('--docfacil-story-progress'))),middle);
      await seek(.48);
      const after = await root.locator('[data-docfacil-reply]').boundingBox();
      assert(Math.abs(before.x-after.x)>10,'answer visibly moves into document');
      assert(await seek(.1)<middle,'scroll reverses');
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      assert(await root.locator('img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0)));
      results.push({name,stages:'PASS',pauseReverse:'PASS',replyTravel:'PASS',owl:'PASS'});
      await context.close();
    }
    for (const mode of ['reduced','nojs','low']) {
      const context = await browser.newContext({viewport:{width:390,height:mode==='low'?600:844},reducedMotion:mode==='reduced'?'reduce':'no-preference',javaScriptEnabled:mode!=='nojs'});
      const page = await context.newPage();
      await page.goto('http://localhost:3064/pt-BR/projetos/docfacil#jornada',{waitUntil:'networkidle'});
      const root = page.locator('[data-docfacil-story]');
      assert.equal(await root.getAttribute('data-docfacil-motion'),'static');
      assert.equal(await root.locator('ol li').count(),4);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      await root.screenshot({path:`${out}/${mode}-story.png`});
      results.push({mode,readableStaticFlow:'PASS'});
      await context.close();
    }
    fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
    console.log(results);
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
