const { chromium } = require(process.env.VIO_PLAYWRIGHT || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.VIO_BASE_URL || 'http://localhost:3064';
const out = path.resolve('docs/redesign-ruon/evidence/c03-viodigital');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch(process.env.VIO_BROWSER ? { executablePath: process.env.VIO_BROWSER } : {});
  const results = [];
  try {
    for (const locale of ['pt-BR', 'en-US']) {
      const page = await browser.newPage();
      await page.goto(`${base}/${locale}/projetos/viodigital`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://www.kaueruon.dev/${locale}/projetos/viodigital`);
      for (const language of ['pt-BR', 'en-US']) assert.equal(await page.locator(`link[rel=alternate][hreflang="${language}"]`).getAttribute('href'), `https://www.kaueruon.dev/${language}/projetos/viodigital`);
      assert.equal(await page.locator('h1').textContent(), 'VioDigital');
      assert((await page.locator('meta[name=description]').getAttribute('content')).length > 20);
      results.push({ locale, caseMetadata: 'PASS' }); await page.close();
    }
    const page = await browser.newPage();
    const sitemap = await page.request.get(base + '/sitemap.xml');
    assert(sitemap.ok()); const xml = await sitemap.text();
    for (const language of ['pt-BR', 'en-US']) assert(xml.includes(`https://www.kaueruon.dev/${language}/projetos/viodigital`));
    results.push({ sitemapActiveVioLocales: 'PASS' }); await page.close();
    for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, recordVideo: { dir: out, size: { width, height } } });
      const page = await context.newPage(); const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + '/pt-BR/projetos/viodigital', { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(out, name + '-hero.png') });
      const story = page.locator('[data-vio-story]'); await story.scrollIntoViewIfNeeded();
      if (name === 'desktop') {
        const geometry = await story.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: el.offsetHeight - innerHeight + 32 }));
        const seek = async p => { await page.evaluate(({ top, travel, p }) => scrollTo({ top: top - 32 + travel * p, behavior: 'instant' }), { ...geometry, p }); await page.waitForTimeout(200); return Number(await story.evaluate(el => el.style.getPropertyValue('--vio-progress'))); };
        const start = await seek(.05); const mid = await seek(.48);
        await page.waitForTimeout(1000); assert.equal(Number(await story.evaluate(el => el.style.getPropertyValue('--vio-progress'))), mid);
        const end = await seek(.95); const reverse = await seek(.2); assert(start < mid && mid < end && reverse < mid);
        await seek(.95);
      }
      await page.screenshot({ path: path.join(out, name + '-story.png') });
      await page.locator('#telas').scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(out, name + '-screens.png') });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.deepEqual(errors, []); results.push({ viewport: name, motionAndLayout: 'PASS', errors }); await context.close();
    }
    for (const locale of ['pt-BR', 'en-US']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } }); const page = await context.newPage();
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      await page.route('**/assets/projects/viodigital/*.png', route => route.abort());
      await page.goto(`${base}/${locale}/projetos/viodigital`, { waitUntil: 'networkidle' });
      await page.locator('#telas').scrollIntoViewIfNeeded(); await page.waitForTimeout(200);
      const brokenVisible = await page.locator('#telas img').evaluateAll(images => images.filter(img => img.getBoundingClientRect().height > 0 && !img.naturalWidth).length);
      assert.equal(brokenVisible, 0, 'failed images should have a useful fallback instead of broken-image frames');
      assert.equal(await page.locator('#telas button a').count(), 0, 'fallback links must not be nested inside enlargement buttons');
      assert((await page.locator('#telas').innerText()).length > 80);
      const visit = page.getByRole('link', { name: locale === 'pt-BR' ? 'Experimentar o VioDigital' : 'Try VioDigital', exact: true });
      assert(await visit.count()); assert.equal(await visit.first().getAttribute('href'), 'https://vioweb.vercel.app');
      assert.deepEqual(errors, []);
      await page.screenshot({ path: path.join(out, `${locale}-media-failure.png`) });
      results.push({ locale, mediaFailureFallback: 'PASS', errors }); await context.close();
    }
    const failureContext = await browser.newContext();
    const failurePage = await failureContext.newPage();
    await failurePage.goto(base + '/pt-BR/projetos/viodigital', { waitUntil: 'networkidle' });
    await failurePage.locator('#telas button').first().click();
    await failurePage.route(/\/assets\/projects\/viodigital\/.*\.png\?c03-fail=1$/, route => route.abort());
    await failurePage.locator('dialog[open] img').evaluate(img => { img.src += '?c03-fail=1'; });
    await failurePage.waitForTimeout(250);
    assert.equal(await failurePage.locator('dialog[open] img').evaluateAll(images => images.filter(img => img.getBoundingClientRect().height > 0 && !img.naturalWidth).length), 0);
    await failurePage.keyboard.press('Escape');
    assert(await failurePage.evaluate(() => Boolean(document.activeElement?.isConnected && document.activeElement.closest('#telas'))), 'closing after a media error returns focus to a useful gallery control');
    results.push({ modalMediaFailureAndFocus: 'PASS' }); await failureContext.close();
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const nojs = await context.newPage(); await nojs.goto(base + '/pt-BR/projetos/viodigital', { waitUntil: 'networkidle' });
    const directImages = nojs.locator('#telas noscript a'); assert((await directImages.count()) >= 2, 'no-JS visitors can open real images directly');
    for (const link of await directImages.all()) assert((await link.getAttribute('href')).startsWith('/assets/projects/viodigital/'));
    results.push({ noJavaScriptImageAccess: 'PASS' }); await context.close();
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2)); console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
