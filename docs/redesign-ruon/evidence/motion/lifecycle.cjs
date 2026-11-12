const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/Kauerc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const [url, output] = process.argv.slice(2);
(async () => {
  await fs.mkdir(output, { recursive: true });
  const results = [];
  for (const executablePath of ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe']) {
    const browser = await chromium.launch({ executablePath });
    try {
      for (const width of [390, 1440]) {
        const context = await browser.newContext({ viewport: { width, height: 900 } });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(url + '/pt-BR', { waitUntil: 'networkidle' });
        const next = page.getByRole('button', { name: 'Continuar', exact: true });
        await next.waitFor({ state: 'visible' });
        await page.waitForTimeout(3500);
        assert.equal(await page.locator('dialog[open]').count(), 1);
        await next.click();
        await page.waitForFunction(() => !document.querySelector('dialog[open]'));
        assert.equal(await page.evaluate(() => document.activeElement === document.querySelector('#hero h1')), true);
        await page.locator('#sobre').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
        await page.waitForTimeout(140);
        await page.setViewportSize({ width: width === 390 ? 410 : 1280, height: 900 });
        await page.waitForTimeout(80);
        await page.locator('#experiencia').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
        await page.locator('button[data-language="en-US"]:visible').first().click();
        await page.waitForURL('**/en-US*');
        await page.waitForFunction(() => !document.documentElement.dataset.languagePhase);
        assert.equal(await page.locator('dialog[open]').count(), 0);
        await page.locator('#skills').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
        await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
        await page.waitForTimeout(100);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        await page.evaluate(() => { document.documentElement.style.zoom = ''; });
        await page.locator('.footer-editorial__top').click();
        // The reader interrupts smooth return. Focus must remain under their control.
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(500);
        assert.equal(await page.evaluate(() => document.activeElement === document.querySelector('#hero h1')), false);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.locator('.footer-editorial__top').click();
        await page.waitForFunction(() => scrollY <= 2 && document.activeElement === document.querySelector('#hero h1'));
        assert.deepEqual(errors, []);
        results.push({ browser: executablePath.includes('Edge') ? 'Edge' : 'Chrome', version: await browser.version(), width,
          introManual: true, introDocked: true, resize: true, languageNavigation: true, zoom200: true,
          interruptedReturn: true, reducedReturn: true, errors });
        await page.screenshot({ path: path.join(output, `${executablePath.includes('Edge') ? 'edge' : 'chrome'}-${width}-hero.png`) });
        await context.close();
      }
    } finally { await browser.close(); }
  }
  await fs.writeFile(path.join(output, 'lifecycle.json'), JSON.stringify(results, null, 2));
  console.log(`Passed ${results.length} lifecycle scenarios`);
})().catch(error => { console.error(error); process.exitCode = 1; });
