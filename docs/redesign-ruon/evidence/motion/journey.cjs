const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/Kauerc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const [url, output] = process.argv.slice(2);
const sections = ['projetos', 'sobre', 'experiencia', 'skills', 'formacao', 'conquistas', 'contato', 'rodape'];
(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const results = [];
  try {
    for (const width of [390, 768, 1440, 1920]) for (const locale of ['pt-BR', 'en-US'])
      for (const dark of [false, true]) for (const reduce of [false, true]) {
        const record = !dark && !reduce && locale === 'pt-BR' && [390, 1440].includes(width);
        const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width === 390,
          reducedMotion: reduce ? 'reduce' : 'no-preference', colorScheme: dark ? 'dark' : 'light',
          ...(record ? { recordVideo: { dir: output, size: { width, height: 900 } } } : {}) });
        await context.addInitScript(({ dark }) => {
          sessionStorage.setItem('portfolio-intro-complete', 'true');
          localStorage.setItem('theme', dark ? 'dark' : 'light');
        }, { dark });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.route('**/api/contato', route => route.fulfill({ status: 500, contentType: 'application/json', body: '{"error":"INTERNAL_ERROR"}' }));
        await page.goto(url + '/' + locale, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        for (const id of sections) {
          await page.locator('#' + id).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
          if (record && id !== 'rodape') {
            await page.waitForTimeout(180);
            await page.screenshot({ path: path.join(output, `${width}-${id}-passage.png`) });
          }
          await page.waitForTimeout(record ? 800 : 40);
          if (record) await page.screenshot({ path: path.join(output, `${width}-${id}-rest.png`) });
        }
        await page.locator('#projetos').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
        for (const id of ['project-ckf', 'project-docfacil', 'project-atlas', 'project-foli']) {
          await page.locator(`.projects-editorial__index a[href="#${id}"]`).click();
        }
        await page.locator('#project-foli').waitFor({ state: 'visible' });
        assert.equal(await page.locator('.projects-editorial__case:visible').count(), 1);
        assert.equal(await page.locator('#project-foli').isVisible(), true);
        assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('href')), '#project-foli');
        // Restore a direct hash, then exercise history into the selected panel.
        await page.evaluate(() => { location.hash = '#project-ckf'; });
        await page.waitForFunction(() => !document.getElementById('project-ckf').hidden);
        await page.goBack();
        await page.waitForFunction(() => !document.getElementById('project-foli').hidden);
        const form = page.locator('#contato form');
        await form.locator('button[type=submit]').click();
        assert.equal(await page.evaluate(() => document.activeElement?.id), 'nome');
        for (const [name, value] of [['nome', 'Teste local'], ['email', 'qa@example.invalid'], ['assunto', 'Validação'], ['mensagem', 'Mensagem sintética de teste local.']]) {
          await form.locator(`[name="${name}"]`).fill(value);
        }
        await form.locator('button[type=submit]').click();
        await page.waitForFunction(() => document.querySelector('.contact-editorial__feedback').dataset.state === 'error');
        assert.equal(await form.locator('[name=mensagem]').inputValue(), 'Mensagem sintética de teste local.');
        // Toggle preference while local effects can be running, then allow resting state.
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.waitForFunction(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
        await page.waitForTimeout(100);
        const running = await page.locator('main').evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').map(a => ({
          target: a.effect?.target?.outerHTML?.slice(0, 300), owner: a.effect?.target?.parentElement?.outerHTML?.slice(0, 300), name: a.animationName,
          transition: getComputedStyle(a.effect.target).transition, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
          keyframes: a.effect?.getKeyframes(),
        })));
        assert.deepEqual(running, [], JSON.stringify({ width, locale, dark, reduce, running }));
        await page.locator('.footer-editorial__top').click();
        await page.waitForFunction(() => window.scrollY < 2 && document.activeElement === document.querySelector('#hero h1'));
        assert.equal(await page.locator('dialog[open]').count(), 0);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        assert.equal(overflow, 0);
        assert.deepEqual(errors, []);
        results.push({ width, locale, dark, reduce, overflow, errors, passed: true });
        const video = record ? page.video() : null;
        await context.close();
        if (video) await fs.rename(await video.path(), path.join(output, `${width}-journey.webm`));
      }
    // Progressive enhancement: readable SSR and native project anchors in both languages.
    for (const locale of ['pt-BR', 'en-US']) {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
      const page = await context.newPage();
      await page.goto(url + '/' + locale + '#projetos');
      assert.equal(await page.locator('.projects-editorial__case:visible').count(), 4);
      for (const id of sections) assert.equal(await page.locator('#' + id + ' h2, #' + id + ' nav').first().isVisible(), true);
      await context.close();
      results.push({ locale, javaScript: false, passed: true });
    }
    await fs.writeFile(path.join(output, 'journey.json'), JSON.stringify({ browser: await browser.version(), results }, null, 2));
    console.log(`Passed ${results.length} integrated scenarios`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
