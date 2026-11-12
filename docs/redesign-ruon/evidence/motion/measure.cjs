// Run against the same production server before/after integration. No external requests are submitted.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/Kauerc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');
const [url, output] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const results = [];
  try {
    for (const width of [390, 1440]) for (let run = 0; run < 3; run++) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      await context.addInitScript(() => {
        sessionStorage.setItem('portfolio-intro-complete', 'true');
        window.motionMetrics = { shifts: 0, longTasks: [], gaps: [] };
        new PerformanceObserver(list => list.getEntries().forEach(e => {
          if (!e.hadRecentInput) window.motionMetrics.shifts += e.value;
        })).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver(list => list.getEntries().forEach(e => window.motionMetrics.longTasks.push(e.duration)))
          .observe({ type: 'longtask', buffered: true });
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url + '/pt-BR', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        window.motionMetrics.shifts = 0; window.motionMetrics.longTasks = [];
        let last = performance.now();
        const tick = now => { window.motionMetrics.gaps.push(now - last); last = now; window.motionFrame = requestAnimationFrame(tick); };
        window.motionFrame = requestAnimationFrame(tick);
      });
      for (const id of ['projetos', 'sobre', 'experiencia', 'skills', 'formacao', 'conquistas', 'contato']) {
        await page.locator('#' + id).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
        await page.waitForTimeout(950);
      }
      await page.getByRole('textbox', { name: /^Nome/ }).focus();
      const facts = await page.evaluate(() => {
        cancelAnimationFrame(window.motionFrame);
        const gaps = window.motionMetrics.gaps.sort((a, b) => a - b);
        return { cls: window.motionMetrics.shifts, longTasks: window.motionMetrics.longTasks.length,
          longTaskMs: window.motionMetrics.longTasks.reduce((sum, n) => sum + n, 0),
          frameP95Ms: gaps[Math.floor(gaps.length * .95)], overflow: document.documentElement.scrollWidth - innerWidth };
      });
      assert.equal(facts.overflow, 0);
      assert.deepEqual(errors, []);
      results.push({ width, run, ...facts, errors });
      await context.close();
    }
    await fs.writeFile(output, JSON.stringify({ url, browser: await browser.version(), runtime: 'production', results }, null, 2));
    console.log(JSON.stringify(results));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
