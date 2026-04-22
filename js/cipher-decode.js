/* ═══════════════════════════════════════════
   CIPHER DECODE — Text decryption on scroll reveal
   Characters scramble then resolve to readable text
   ═══════════════════════════════════════════ */

const CipherDecode = (() => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>{}[]=/\\|~^';
    const ITERATIONS = 8;   // How many random steps before resolving
    const SPEED = 30;       // ms between each iteration

    function init() {
        const targets = document.querySelectorAll('[data-cipher]');
        if (!targets.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.cipherDone) {
                    entry.target.dataset.cipherDone = 'true';
                    decode(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -60px 0px',
        });

        targets.forEach(el => {
            // Store original text, replace with scrambled
            el.dataset.cipherOriginal = el.textContent;
            el.textContent = scramble(el.textContent);
            el.style.opacity = '1';
            observer.observe(el);
        });
    }

    function scramble(text) {
        return text.split('').map(c => {
            if (c === ' ' || c === '\n') return c;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
    }

    function decode(el) {
        const original = el.dataset.cipherOriginal;
        const length = original.length;
        let iteration = 0;

        const interval = setInterval(() => {
            el.textContent = original.split('').map((char, i) => {
                if (char === ' ' || char === '\n') return char;
                // Resolve characters left-to-right with a wave effect
                if (i < Math.floor((iteration / ITERATIONS) * length)) {
                    return char;
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');

            iteration++;

            if (iteration >= ITERATIONS) {
                clearInterval(interval);
                el.textContent = original;
            }
        }, SPEED);
    }

    return { init };
})();
