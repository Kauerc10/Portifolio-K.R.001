/* C07: observable navigation, media and scroll proof against a local portfolio. */
const { chromium } = require(process.env.VIO_PLAYWRIGHT || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.VIO_BASE_URL || 'http://localhost:3064';
const out = path.resolve(process.env.CASE_EVIDENCE_DIR || 'docs/redesign-ruon/evidence/c07-ckf');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch(process.env.VIO_BROWSER ? { executablePath: process.env.VIO_BROWSER } : {});
  const results = [];
  try {
    for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, recordVideo: { dir: path.join(out, 'raw'), size: { width, height } } });
      const page = await context.newPage(); const errors = []; const departures = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.exposeFunction('captureDeparture', y => departures.push(y));
      await page.addInitScript(() => document.addEventListener('click', event => {
        const a = event.target instanceof Element ? event.target.closest('a') : null;
        if (a?.getAttribute('href')?.endsWith('/projetos/ckf')) void window.captureDeparture(scrollY);
      }, true));
      await page.goto(base + '/pt-BR#project-ckf', { waitUntil: 'networkidle' });
      const preview = page.locator('#project-ckf'); await preview.waitFor();
      const geometry = await preview.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight + 80 }));
      const seek = async progress => {
        await page.evaluate(({ top, travel, progress }) => scrollTo({ top: top - 80 + Math.max(0, travel) * progress, behavior: 'instant' }), { ...geometry, progress });
        await page.waitForTimeout(400);
        return preview.evaluate(el => Number(el.style.getPropertyValue('--ckf-progress')));
      };
      for (const [stage, progress] of [['arrival', .05], ['middle', .5], ['rest', .95]]) {
        await seek(progress);
        await page.screenshot({ path: path.join(out, `${name}-home-${stage}.png`) });
      }
      if (geometry.travel > 0) {
        const folder = preview.locator('[data-ckf-layer="site"]');
        const start = await seek(.05); const startTransform = await folder.evaluate(el => getComputedStyle(el).transform);
        const middle = await seek(.5); const middleTransform = await folder.evaluate(el => getComputedStyle(el).transform);
        await page.waitForTimeout(800);
        assert.equal(await preview.evaluate(el => Number(el.style.getPropertyValue('--ckf-progress'))), middle, 'scroll pause holds progress');
        assert.equal(await folder.evaluate(el => getComputedStyle(el).transform), middleTransform, 'scroll pause holds the visible composition');
        const end = await seek(.95); const reverse = await seek(.2);
        assert(start < middle && middle < end && reverse < middle, 'scroll advances and reverses the scene');
        assert.notEqual(startTransform, middleTransform, 'scroll moves the folder rather than only a progress line');
        await seek(.95);
      }
      const open = preview.locator('a[href="/pt-BR/projetos/ckf"]');
      assert(await open.isVisible());
      await open.click(); await page.waitForURL('**/pt-BR/projetos/ckf'); await page.waitForTimeout(1500);
      assert((await page.locator('h1').innerText()).includes('CKF'));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({ path: path.join(out, `${name}-case-hero.png`) });
      const gallery = page.locator('#telas'); await gallery.scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(out, `${name}-gallery.png`) });
      const enlarge = gallery.locator('button').first(); await enlarge.focus(); await page.keyboard.press('Enter');
      assert(await page.locator('dialog[open]').isVisible()); await page.keyboard.press('Escape');
      assert(await enlarge.evaluate(el => document.activeElement === el));
      await page.locator('header a[href="/pt-BR#project-ckf"]').last().click();
      await page.waitForURL('**/pt-BR#project-ckf'); await page.waitForTimeout(600);
      assert(Math.abs(await page.evaluate(() => scrollY) - departures.at(-1)) < 12, 'explicit return restores activation position');
      await preview.locator('a[href="/pt-BR/projetos/ckf"]').click(); await page.waitForURL('**/pt-BR/projetos/ckf');
      await page.goBack({ waitUntil: 'networkidle' }); await page.waitForTimeout(600);
      assert(Math.abs(await page.evaluate(() => scrollY) - departures.at(-1)) < 12, 'browser back restores activation position');
      const newPage = context.waitForEvent('page'); await preview.locator('a[href="/pt-BR/projetos/ckf"]').click({ button: 'middle' });
      const child = await newPage; await child.waitForLoadState('domcontentloaded'); assert(child.url().endsWith('/pt-BR/projetos/ckf')); await child.close();
      assert.deepEqual(errors, []); results.push({ viewport: name, journey: 'PASS', galleryFocus: 'PASS', history: 'PASS', newTab: 'PASS', errors });
      const video = page.video(); await context.close(); await video.saveAs(path.join(out, `${name}-journey.webm`));
    }
    for (const locale of ['pt-BR', 'en-US']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } }); const page = await context.newPage();
      await page.goto(`${base}/${locale}/projetos/ckf`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://www.kaueruon.dev/${locale}/projetos/ckf`);
      for (const language of ['pt-BR', 'en-US']) assert.equal(await page.locator(`link[rel=alternate][hreflang="${language}"]`).getAttribute('href'), `https://www.kaueruon.dev/${language}/projetos/ckf`);
      assert.equal(await page.locator('header a').last().getAttribute('href'), `/${locale}#project-ckf`);
      await page.route('**/assets/projects/ckf/*', r => r.abort());
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('main img').evaluateAll(imgs => imgs.filter(img => { const r = img.getBoundingClientRect(); return r.height > 0 && r.top < innerHeight && r.bottom > 0 && !img.naturalWidth && getComputedStyle(img).visibility !== 'hidden'; }).length), 0, 'hero media also has a graceful fallback');
      await page.locator('#telas').scrollIntoViewIfNeeded();
      for (const figure of await page.locator('#telas figure').all()) { await figure.scrollIntoViewIfNeeded(); await figure.locator('[role=img]').waitFor(); }
      assert.equal(await page.locator('#telas img').evaluateAll(imgs => imgs.filter(img => img.getBoundingClientRect().height > 0 && !img.naturalWidth).length), 0);
      assert.equal(await page.locator('#telas button a').count(), 0);
      await page.screenshot({ path: path.join(out, `${locale}-media-failure.png`) });
      results.push({ locale, metadata: 'PASS', mediaFailure: 'PASS' }); await context.close();
    }
    for (const mode of ['reduced', 'dark', 'nojs', 'storage-blocked', 'low-height']) {
      const context = await browser.newContext({ viewport: { width: mode === 'low-height' ? 1280 : 390, height: mode === 'low-height' ? 600 : 844 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference', javaScriptEnabled: mode !== 'nojs' });
      const page = await context.newPage();
      if (mode === 'dark') await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
      if (mode === 'storage-blocked') await page.addInitScript(() => { Storage.prototype.getItem = () => { throw Error('blocked'); }; Storage.prototype.setItem = () => { throw Error('blocked'); }; });
      await page.goto(base + '/pt-BR#project-ckf', { waitUntil: 'networkidle' });
      await page.locator('#project-ckf a[href="/pt-BR/projetos/ckf"]').click(); await page.waitForURL('**/pt-BR/projetos/ckf');
      await page.waitForTimeout(1500);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (mode === 'dark') assert(await page.evaluate(() => document.documentElement.classList.contains('dark')));
      if (mode === 'nojs') assert((await page.locator('#telas noscript a').count()) >= 2);
      await page.screenshot({ path: path.join(out, `${mode}-case.png`) });
      results.push({ mode, navigationAndLayout: 'PASS' }); await context.close();
    }
    const isolated = await browser.newContext(); const isolationPage = await isolated.newPage();
    await isolationPage.addInitScript(() => {
      sessionStorage.setItem('portfolio-case-return:pt-BR:viodigital', JSON.stringify({ path: '/pt-BR', y: 900, time: Date.now() }));
      sessionStorage.setItem('portfolio-case-return:pt-BR:ckf', JSON.stringify({ path: '/pt-BR', y: 2600, time: Date.now() }));
    });
    await isolationPage.goto(base + '/pt-BR#project-ckf', { waitUntil: 'networkidle' }); await isolationPage.waitForTimeout(700);
    assert(await isolationPage.evaluate(() => sessionStorage.getItem('portfolio-case-return:pt-BR:viodigital') !== null), 'CKF does not consume the other case return position');
    assert.equal(await isolationPage.evaluate(() => sessionStorage.getItem('portfolio-case-return:pt-BR:ckf')), null);
    results.push({ crossCaseReturnIsolation: 'PASS' }); await isolated.close();
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2)); console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

