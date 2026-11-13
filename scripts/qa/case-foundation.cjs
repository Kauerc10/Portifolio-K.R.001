/* Observable C02 regression proof. Install Playwright outside production dependencies. */
const { chromium } = require(process.env.VIO_PLAYWRIGHT || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const phase = process.env.CASE_PHASE || 'after';
const base = process.env.VIO_BASE_URL || 'http://localhost:3064';
const out = path.resolve('docs/redesign-ruon/evidence/c02-foundation');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch(process.env.VIO_BROWSER ? { executablePath: process.env.VIO_BROWSER } : {});
  const results = [];
  try {
    for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height } });
      const page = await context.newPage(); const errors = []; const departures = [];
      await page.exposeFunction('recordCaseActivation', y => { departures.push(y); });
      await page.addInitScript(() => {
        document.addEventListener('click', event => {
          const link = event.target instanceof Element ? event.target.closest('a') : null;
          if (link?.getAttribute('href')?.endsWith('/projetos/viodigital')) void window.recordCaseActivation(scrollY);
        }, true);
      });
      page.on('pageerror', e => errors.push(e.message));
      await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
      await page.goto(base + '/pt-BR#project-viodigital', { waitUntil: 'networkidle' });
      await page.locator('#project-viodigital').waitFor();
      const rect = await page.locator('#project-viodigital').evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight + 80 }));
      await page.evaluate(r => scrollTo({ top: r.top - 80 + r.travel * .6, behavior: 'instant' }), rect);
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(out, `${phase}-${name}-home.png`), animations: 'disabled' });
      const previousY = await page.evaluate(() => scrollY);
      const link = page.getByRole('link', { name: 'Conhecer o projeto', exact: true });
      assert.equal(await link.getAttribute('href'), '/pt-BR/projetos/viodigital');
      await link.click(); await page.waitForURL('**/pt-BR/projetos/viodigital');
      await page.waitForTimeout(1500);
      assert.equal(await page.locator('h1').textContent(), 'VioDigital');
      await page.screenshot({ path: path.join(out, `${phase}-${name}-hero.png`), animations: 'disabled' });
      await page.locator('#telas').scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(out, `${phase}-${name}-gallery.png`), animations: 'disabled' });
      const open = page.locator('#telas button').first(); await open.focus(); await page.keyboard.press('Enter');
      assert(await page.locator('dialog[open]').isVisible());
      await page.keyboard.press('Escape'); assert.equal(await page.locator('dialog[open]').count(), 0);
      assert(await open.evaluate(el => document.activeElement === el));
      await page.getByRole('link', { name: '← Voltar aos projetos', exact: true }).first().click();
      await page.waitForURL('**/pt-BR#project-viodigital'); await page.waitForTimeout(400);
      assert(Math.abs(await page.evaluate(() => scrollY) - previousY) < 10, 'explicit return preserves scroll');
      assert.equal(await page.locator('dialog[open]').count(), 0);
      const historyLink = page.getByRole('link', { name: 'Conhecer o projeto', exact: true });
      await historyLink.scrollIntoViewIfNeeded();
      const historyY = await page.evaluate(() => scrollY);
      await historyLink.click();
      await page.waitForURL('**/pt-BR/projetos/viodigital'); await page.goBack({ waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      const restoredY = await page.evaluate(() => scrollY);
      const activationY = departures.at(-1) ?? historyY;
      const historyOk = Math.abs(restoredY - activationY) < 10;
      if (phase !== 'before') assert(historyOk, `history preserves scroll: ${restoredY} versus activation ${activationY} (before click ${historyY})`);
      await page.goto(base + '/en-US/projetos/viodigital', { waitUntil: 'networkidle' });
      assert.equal(await page.getByRole('link', { name: '← Back to projects', exact: true }).first().getAttribute('href'), '/en-US#project-viodigital');
      assert.equal(await page.getByRole('link', { name: 'Try VioDigital' }).first().getAttribute('href'), 'https://vioweb.vercel.app');
      await page.goto(base + '/pt-BR#project-viodigital', { waitUntil: 'networkidle' });
      const newTab = context.waitForEvent('page');
      await page.getByRole('link', { name: 'Conhecer o projeto', exact: true }).click({ button: 'middle' });
      const child = await newTab; await child.waitForLoadState('domcontentloaded');
      assert(child.url().endsWith('/pt-BR/projetos/viodigital'));
      assert(page.url().endsWith('/pt-BR#project-viodigital'));
      await child.close();
      assert.deepEqual(errors, []);
      results.push({ viewport: name, explicitReturn: 'PASS', history: historyOk ? 'PASS' : 'BASELINE FAILURE', expectedHistoryY: activationY, beforeClickY: historyY, actualHistoryY: restoredY, galleryKeyboardFocus: 'PASS', english: 'PASS', newTab: 'PASS', errors });
      await context.close();
    }
    for (const scenario of ['storage-blocked', 'nojs', 'reduced', 'dark']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: scenario !== 'nojs', reducedMotion: scenario === 'reduced' ? 'reduce' : 'no-preference' });
      const page = await context.newPage();
      if (scenario === 'storage-blocked') await page.addInitScript(() => { Storage.prototype.getItem = () => { throw Error('blocked'); }; Storage.prototype.setItem = () => { throw Error('blocked'); }; });
      await page.goto(base + '/pt-BR#project-viodigital', { waitUntil: 'networkidle' });
      if (scenario === 'dark') {
        await page.getByRole('button', { name: 'Ativar tema escuro', exact: true }).click();
        await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
      }
      await page.getByRole('link', { name: 'Conhecer o projeto', exact: true }).click();
      await page.waitForURL('**/pt-BR/projetos/viodigital');
      assert(await page.getByRole('heading', { name: 'Começou com um celular para todo mundo.' }).isVisible());
      assert.equal(await page.locator('dialog[open]').count(), 0);
      if (scenario === 'dark') assert(await page.evaluate(() => document.documentElement.classList.contains('dark')));
      await page.getByRole('link', { name: '← Voltar aos projetos', exact: true }).first().click();
      await page.waitForURL('**/pt-BR#project-viodigital');
      assert(await page.locator('#project-viodigital').isVisible());
      assert.equal(await page.locator('dialog[open]').count(), 0);
      if (scenario === 'dark') assert(await page.evaluate(() => document.documentElement.classList.contains('dark')));
      results.push({ scenario, navigation: 'PASS' }); await context.close();
    }
    fs.writeFileSync(path.join(out, `${phase}-results.json`), JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
