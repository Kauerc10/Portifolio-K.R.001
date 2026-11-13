const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');
const out = path.resolve('docs/redesign-ruon/evidence/c02-foundation');
(async () => {
  const results = [];
  for (const viewport of ['desktop', 'mobile']) for (const view of ['home', 'hero', 'gallery']) {
    const name = `${viewport}-${view}`;
    const before = await sharp(path.join(out, `before-${name}.png`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const after = await sharp(path.join(out, `after-${name}.png`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    if (before.info.width !== after.info.width || before.info.height !== after.info.height) throw Error('Screenshot dimensions changed');
    const { width, height } = before.info; let changed = 0; let pixels = 0; let difference = 0;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      // Next's development badge is outside the product UI and can animate independently.
      if (x < 70 && y > height - 80) continue;
      const i = (y * width + x) * 4;
      const delta = Math.max(...[0, 1, 2].map(c => Math.abs(before.data[i + c] - after.data[i + c])));
      pixels++; difference += delta; if (delta > 4) changed++;
    }
    results.push({ name, changedPixels: changed, comparedPixels: pixels, changedRatio: changed / pixels, meanMaxChannelDelta: difference / pixels, excludedDevelopmentBadge: true });
  }
  fs.writeFileSync(path.join(out, 'visual-comparison.json'), JSON.stringify(results, null, 2)); console.log(JSON.stringify(results, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
