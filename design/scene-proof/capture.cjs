// Uses an existing Playwright installation; no browser download or production dependency.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const root = path.resolve(__dirname, '../..');
  const output = path.join(root, 'docs/design-transition/proof');
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const metrics = [];
  for (const variant of [
    { name: 'desktop', width: 1433, height: 1098, query: '' },
    { name: 'mobile', width: 390, height: 340, query: '?camera=mobile' },
  ]) {
    const page = await browser.newPage({ viewport: { width: variant.width, height: variant.height }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:4173/${variant.query}`);
    await page.waitForFunction(() => window.sceneProof);
    const initial = await page.evaluate(() => window.sceneProof);
    if (!initial.ready) throw new Error(JSON.stringify(initial));
    await page.screenshot({ path: path.join(output, `scene-${variant.name}.png`) });
    const data = await page.evaluate(() => {
      const source = document.querySelector('canvas');
      const image = document.createElement('canvas');
      image.width = innerWidth; image.height = innerHeight;
      image.getContext('2d').drawImage(source, 0, 0, image.width, image.height);
      return image.toDataURL('image/webp', .86).split(',')[1];
    });
    await fs.writeFile(path.join(output, `poster-${variant.name}.webp`), Buffer.from(data, 'base64'));
    const result = await page.evaluate(() => window.sceneProof.measure(10000));
    metrics.push({ variant: variant.name, ...result, errors, browser: browser.version() });
    await page.close();
  }
  if (process.argv.includes('--baseline')) {
    for (const [name, width, height] of [['desktop', 1433, 1098], ['mobile', 390, 844]]) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      await page.route('**/api/github**', route => route.fulfill({ status: 503, body: '{}' }));
      await page.goto('http://127.0.0.1:4174/pt-BR', { waitUntil: 'networkidle' });
      await page.waitForTimeout(6000);
      await page.screenshot({ path: path.join(output, `baseline-${name}.png`) });
      await page.close();
    }
  }
  await fs.writeFile(path.join(output, 'metrics.json'), JSON.stringify(metrics, null, 2) + '\n');
  await browser.close();
  console.log(JSON.stringify(metrics, null, 2));
})().catch(error => { console.error(error); process.exit(1); });
