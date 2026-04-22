/* ═══════════════════════════════════════════
   MAIN — Orchestrator: Lenis, scroll progress, nav, form
   ═══════════════════════════════════════════ */

(() => {
    // ── LENIS SMOOTH SCROLL ──
    let lenis;

    function initLenis() {
        lenis = new Lenis({
            lerp: 0.08,
            smooth: true,
        });

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    // ── SCROLL PROGRESS BAR ──
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = pct + '%';
        });
    }

    // ── NAVBAR BURGER ──
    function initNavBurger() {
        const burger = document.getElementById('navBurger');
        const links = document.getElementById('navLinks');

        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            links.classList.toggle('open');
        });

        // Close on link click
        links.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('open');
                links.classList.remove('open');
            });
        });
    }

    // ── FORM SUBMIT ──
    function initForm() {
        const form = document.getElementById('peticaoForm');
        const btn = document.getElementById('btnProtocolar');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            btn.classList.add('sent');

            // Simple visual feedback — no backend
            setTimeout(() => {
                form.reset();
            }, 500);
        });
    }

    // ── SMOOTH NAV LINKS ──
    function initSmoothLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    if (lenis) {
                        lenis.scrollTo(target, { offset: -60, duration: 1.2 });
                    } else {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // ── BOOT SEQUENCE ──
    function boot() {
        // Fire loader first
        Loader.init();

        // Init all modules after loader signals done
        document.addEventListener('loaderDone', () => {
            initLenis();
            initScrollProgress();
            initNavBurger();
            initSmoothLinks();
            initForm();

            // Init interactive modules
            Cursor.init();
            HeroScene.init();
            EasterEggs.init();
            if (typeof MedalParticles !== 'undefined') MedalParticles.init();
            if (typeof CipherDecode !== 'undefined') CipherDecode.init();
            if (typeof BreachProtocol !== 'undefined') BreachProtocol.init();
        });

        // Animations self-register on loaderDone
        Animations.init();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
