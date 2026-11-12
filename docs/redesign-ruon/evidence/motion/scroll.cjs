const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/Kauerc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const [url, output] = process.argv.slice(2);
(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const results = [];
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, recordVideo: { dir: output, size: { width, height: 900 } } });
      await context.addInitScript(() => sessionStorage.setItem('portfolio-intro-complete', 'true'));
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url + '/pt-BR', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const art = page.locator('[data-motion-art]');
      await art.evaluate(el => scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight * .85, behavior: 'instant' }));
      await page.waitForFunction(() => document.querySelector('[data-motion-art]').getAnimations().some(a => a.playState === 'paused'));
      const read = () => art.evaluate(el => ({ time: el.getAnimations()[0]?.currentTime, clip: getComputedStyle(el).clipPath }));
      const start = await read();
      await page.waitForTimeout(1400);
      assert.deepEqual(await read(), start, 'The decoration must hold while the reader stops');
      await page.mouse.wheel(0, 130);
      await page.waitForFunction(startTime => document.querySelector('[data-motion-art]').getAnimations()[0]?.currentTime > startTime, start.time);
      const forward = await read();
      await page.mouse.wheel(0, -90);
      await page.waitForFunction(previous => document.querySelector('[data-motion-art]').getAnimations()[0]?.currentTime < previous, forward.time);
      const backward = await read();
      assert.ok(backward.time < forward.time);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(100);
      assert.equal(await art.evaluate(el => el.getAnimations().length), 0);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      for (const selector of ['[data-motion-art]', '[data-motion-experience-item]', '.conquistas-editorial__medal-frame']) {
        await page.locator(selector).first().evaluate(el => scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight * .95, behavior: 'instant' }));
        for (let step = 0; step < 10; step++) {
          await page.mouse.wheel(0, 65);
          await page.waitForTimeout(260);
        }
      }
      assert.deepEqual(errors, []);
      const video = page.video();
      await context.close();
      await fs.rename(await video.path(), path.join(output, `scroll-${width}.webm`));
      results.push({ width, start, forward, backward, heldForMs: 1400, reducedMotion: true, errors });
    }
    await fs.writeFile(path.join(output, 'scroll.json'), JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
