const { chromium } = require(process.env.VIO_PLAYWRIGHT || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const out = path.resolve('docs/redesign-ruon/evidence/viodigital-detail');
fs.mkdirSync(out, { recursive: true });
const base = process.env.VIO_BASE_URL || 'http://localhost:3064';
(async () => {
  const browser = await chromium.launch(process.env.VIO_BROWSER ? { executablePath: process.env.VIO_BROWSER } : {});
  const results = [];
  try {
    for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, recordVideo: { dir: out, size: { width, height } } });
      const page = await context.newPage(); const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + '/pt-BR/projetos/viodigital', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').textContent(), 'VioDigital');
      assert.equal(await page.getByRole('link', { name: 'Experimentar o VioDigital' }).first().getAttribute('href'), 'https://vioweb.vercel.app');
      assert.equal(await page.getByRole('link', { name: 'Conhecer o código' }).getAttribute('href'), 'https://github.com/Kauerc10/VioWeb');
      await page.screenshot({ path: path.join(out, name + '-hero.png') });
      const story = page.locator('[data-vio-story]');
      if (name === 'desktop') {
        const measure = await story.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight + 32 }));
        async function seek(p) { await page.evaluate(({ top, travel, p }) => scrollTo({ top: top - 32 + travel * p, behavior: 'instant' }), { ...measure, p }); await page.waitForTimeout(200); return Number(await story.evaluate(el => el.style.getPropertyValue('--vio-progress'))); }
        const start = await seek(.05); const mid = await seek(.48);
        await page.screenshot({ path: path.join(out, 'desktop-reading.png') });
        await page.waitForTimeout(1200);
        assert.equal(Number(await story.evaluate(el => el.style.getPropertyValue('--vio-progress'))), mid);
        const end = await seek(.95); const reverse = await seek(.1);
        assert(start < mid && mid < end && reverse < mid);
        await seek(.95); await page.screenshot({ path: path.join(out, 'desktop-organized.png') });
      } else {
        await story.scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(out, 'mobile-story.png') });
      }
      const gallery = page.locator('#telas'); await gallery.scrollIntoViewIfNeeded();
      const imgs = gallery.locator('figure img');
      assert.equal(await imgs.count(), 2);
      for (const image of await imgs.all()) assert(await image.evaluate(el => el.complete && el.naturalWidth > 0), 'real screenshot loads');
      await page.screenshot({ path: path.join(out, name + '-screens.png') });
      const open = gallery.getByRole('button').first();
      await open.focus(); await page.keyboard.press('Enter');
      assert(await page.locator('dialog').isVisible());
      assert(await page.locator('dialog button').evaluate(el => document.activeElement === el));
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog[open]').count(), 0);
      assert(await open.evaluate(el => document.activeElement === el));
      await page.getByRole('button', { name: /^Ampliar imagem: O mesmo/ }).click();
      assert((await page.locator('dialog img').getAttribute('src')).includes('mobile'));
      await page.getByRole('button', { name: 'Fechar imagem ×' }).click();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      await page.goto(base + '/en-US/projetos/viodigital', { waitUntil: 'networkidle' });
      assert(await page.getByRole('heading', { name: 'A closer look at VioDigital.' }).count());
      assert.deepEqual(errors, []);
      results.push({ name, links: 'PASS', motion: 'PASS', images: 'PASS', dialogKeyboardFocus: 'PASS', english: 'PASS', errors });
      await context.close();
    }
    for (const mode of ['reduced', 'nojs', 'dark']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: mode !== 'nojs', reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
      const page = await context.newPage();
      await page.goto(base + '/pt-BR/projetos/viodigital', { waitUntil: 'networkidle' });
      if (mode === 'dark') await page.evaluate(() => document.documentElement.classList.replace('light', 'dark'));
      if (mode === 'reduced') assert.equal(await page.locator('[data-vio-story] > div').evaluate(el => getComputedStyle(el).position), 'relative');
      assert(await page.locator('#telas img').first().getAttribute('src'));
      assert(await page.getByRole('link', { name: 'Conhecer o código' }).count());
      await page.locator('#telas').scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(out, mode + '.png') });
      results.push({ mode, readableStoryAndMedia: 'PASS' });
      await context.close();
    }
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2)); console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
