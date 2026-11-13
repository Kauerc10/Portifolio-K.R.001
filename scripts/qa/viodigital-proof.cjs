/* Run with VIO_PLAYWRIGHT pointing to an installed Playwright package. */
const { chromium } = require(process.env.VIO_PLAYWRIGHT || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const out = path.resolve('docs/redesign-ruon/evidence/viodigital-proof');
fs.mkdirSync(out, { recursive: true });
const base = process.env.VIO_BASE_URL || 'http://localhost:3064';
(async () => {
  const browser = await chromium.launch(process.env.VIO_BROWSER ? { executablePath: process.env.VIO_BROWSER } : {});
  const results = [];
  try {
    for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, recordVideo: { dir: out, size: { width, height } } });
      const page = await context.newPage();
      await page.addInitScript(() => {
        addEventListener('pagereveal', event => { document.documentElement.dataset.vioNativeTransition = String(Boolean(event.viewTransition)); });
      });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
      await page.goto(base + '/pt-BR#project-viodigital', { waitUntil: 'networkidle', timeout: 120000 });
      const preview = page.locator('#project-viodigital');
      await preview.waitFor();
      const geometry = await preview.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight + 80 }));
      const seek = async progress => {
        await page.evaluate(({ top, travel, progress }) => scrollTo({ top: top - 80 + travel * progress, behavior: 'instant' }), { ...geometry, progress });
        await page.waitForTimeout(200);
        return Number(await preview.evaluate(el => el.style.getPropertyValue('--vio-progress')));
      };
      const start = await seek(.05);
      await page.screenshot({ path: path.join(out, name + '-01-arrival.png') });
      const middle = await seek(.48);
      await page.screenshot({ path: path.join(out, name + '-02-reading.png') });
      await page.waitForTimeout(1200);
      const paused = Number(await preview.evaluate(el => el.style.getPropertyValue('--vio-progress')));
      assert(Math.abs(paused - middle) < .01, 'scroll pause must hold');
      const end = await seek(.95);
      await page.screenshot({ path: path.join(out, name + '-03-data.png') });
      const reversed = await seek(.2);
      assert(start < middle && middle < end && reversed < middle, 'scroll must advance and reverse');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      await seek(.8);
      const previousY = await page.evaluate(() => scrollY);
      await page.getByRole('link', { name: 'Conhecer o projeto' }).click();
      await page.waitForURL('**/pt-BR/projetos/viodigital');
      await page.waitForTimeout(1400);
      assert(await page.locator('h1').textContent() === 'VioDigital');
      const nativeTransition = await page.evaluate(() => document.documentElement.dataset.vioNativeTransition);
      await page.screenshot({ path: path.join(out, name + '-04-case.png') });
      await page.goBack({ waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      assert(Math.abs(await page.evaluate(() => scrollY) - previousY) < 8, 'browser back restores scroll');
      assert(await page.locator('dialog[open]').count() === 0, 'no intro replay');
      assert.deepEqual(errors, []);
      await page.getByRole('link', { name: 'Conhecer o projeto' }).click();
      await page.waitForURL('**/pt-BR/projetos/viodigital');
      await page.getByRole('link', { name: '← Voltar aos projetos' }).first().click();
      await page.waitForURL('**/pt-BR#project-viodigital');
      await page.waitForTimeout(300);
      assert(Math.abs(await page.evaluate(() => scrollY) - previousY) < 8, 'return link restores scroll');
      results.push({ name, start, middle, paused, end, reversed, history: 'restored', returnLink: 'restored', nativeTransition, errors });
      await page.goto(base + '/en-US/projetos/viodigital', { waitUntil: 'networkidle' });
      assert(await page.getByRole('link', { name: '← Back to projects' }).count() > 0);
      await page.getByRole('link', { name: 'See the story' }).focus();
      await page.keyboard.press('Enter');
      await page.waitForURL('**#contexto');
      await context.close();
    }
    for (const mode of ['reduced', 'nojs', 'short', 'dark']) {
      const context = await browser.newContext({ viewport: { width: 390, height: mode === 'short' ? 600 : 844 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference', javaScriptEnabled: mode !== 'nojs' });
      const page = await context.newPage();
      await page.goto(base + '/pt-BR#project-viodigital', { waitUntil: 'networkidle' });
      if (mode === 'dark') await page.evaluate(() => document.documentElement.classList.add('dark'));
      const preview = page.locator('#project-viodigital');
      await preview.scrollIntoViewIfNeeded();
      if (mode === 'reduced' || mode === 'short') assert.equal(await preview.locator('> div').evaluate(el => getComputedStyle(el).position), 'relative');
      assert(await page.getByRole('link', { name: 'Conhecer o projeto' }).isVisible());
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({ path: path.join(out, mode + '.png') });
      await page.getByRole('link', { name: 'Conhecer o projeto' }).click();
      await page.waitForURL('**/pt-BR/projetos/viodigital');
      results.push({ mode, navigation: 'PASS' });
      await context.close();
    }
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
