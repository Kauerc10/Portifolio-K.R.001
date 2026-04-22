/* ═══════════════════════════════════════════
   LOADER — Animated loading screen with split reveal
   ═══════════════════════════════════════════ */

const Loader = (() => {
  const loader = document.getElementById('loader');
  const bars = [
    { fill: document.getElementById('bar1'), pct: document.getElementById('pct1'), target: 74 },
    { fill: document.getElementById('bar2'), pct: document.getElementById('pct2'), target: 82 },
    { fill: document.getElementById('bar3'), pct: document.getElementById('pct3'), target: 100 },
  ];
  const hint = document.querySelector('.loader__hint');
  const curtainL = document.querySelector('.loader__curtain--left');
  const curtainR = document.querySelector('.loader__curtain--right');

  let currentBar = 0;
  let currentVal = 0;
  let done = false;

  function animateBar(idx, callback) {
    const bar = bars[idx];
    if (!bar) { callback(); return; }

    const startVal = idx === 0 ? 0 : bars[idx - 1].target;
    let val = 0;
    const duration = 600 + idx * 200;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      val = Math.round((bar.target / steps) * step);
      if (val > bar.target) val = bar.target;
      bar.fill.style.width = (val / bar.target * 100) + '%';
      bar.pct.textContent = val + '%';

      if (step >= steps) {
        clearInterval(interval);
        bar.fill.style.width = '100%';
        bar.pct.textContent = bar.target + '%';
        setTimeout(callback, 200);
      }
    }, stepTime);
  }

  function runSequence() {
    animateBar(0, () => {
      animateBar(1, () => {
        animateBar(2, () => {
          hint.classList.add('visible');
          setTimeout(reveal, 800);
        });
      });
    });
  }

  function reveal() {
    if (done) return;
    done = true;

    // Split curtains
    curtainL.style.transition = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
    curtainR.style.transition = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
    curtainL.style.transform = 'translateX(-100%)';
    curtainR.style.transform = 'translateX(100%)';

    // Fade loader content
    const content = document.querySelector('.loader__content');
    content.style.transition = 'opacity 0.4s';
    content.style.opacity = '0';

    setTimeout(() => {
      loader.style.pointerEvents = 'none';
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.3s';

      // Trigger site entrance
      document.dispatchEvent(new CustomEvent('loaderDone'));

      setTimeout(() => {
        loader.style.display = 'none';
      }, 400);
    }, 800);
  }

  function init() {
    document.body.style.overflow = 'hidden';
    setTimeout(runSequence, 500);

    document.addEventListener('loaderDone', () => {
      document.body.style.overflow = '';
    });
  }

  return { init };
})();
