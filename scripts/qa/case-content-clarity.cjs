const { chromium } = require(process.env.VIO_PLAYWRIGHT);
const fs = require('node:fs');
const assert = require('node:assert/strict');
const out = 'docs/redesign-ruon/evidence/case-content-clarity';
(async () => {
  fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({executablePath:process.env.VIO_BROWSER});
  const results=[];
  try {
    for(const [name,width,height]of [['desktop',1440,1000],['mobile',390,844]]) {
      for(const slug of ['ckf','viodigital','vecom','atlas-notarial','docfacil']) {
        const page=await browser.newPage({viewport:{width,height}});
        const errors=[];page.on('pageerror',error=>errors.push(error.message));
        await page.goto(`http://localhost:3064/pt-BR/projetos/${slug}`,{waitUntil:'networkidle'});
        assert(await page.locator('h1').isVisible());
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
        await page.screenshot({path:`${out}/${name}-${slug}.png`});
        if(slug==='ckf') {
          assert((await page.locator('main').innerText()).includes('CKF MANUTENCAO LTDA'));
          assert.equal(await page.locator('#telas figure').count(),5);
          await page.locator('#sistema').scrollIntoViewIfNeeded();
          await page.screenshot({path:`${out}/${name}-ckf-system.png`});
          assert((await page.locator('#sistema').innerText()).includes('interface real'));
        }
        assert.deepEqual(errors,[]);
        results.push({name,slug,heading:'PASS',overflow:'PASS',errors});
        await page.close();
      }
    }
    for(const slug of ['ckf','viodigital','vecom','atlas-notarial','docfacil']) {
      const page=await browser.newPage({viewport:{width:390,height:844}});
      await page.goto(`http://localhost:3064/en-US/projetos/${slug}`,{waitUntil:'networkidle'});
      assert(await page.locator('h1').isVisible());
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      results.push({locale:'en-US',slug,overflow:'PASS'});await page.close();
    }
    fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(results);
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
