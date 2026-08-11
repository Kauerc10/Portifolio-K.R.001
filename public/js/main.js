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

    // ── SCROLL PROGRESS BAR (otimizado com RAF e GPU scaleX) ──
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;

        let ticking = false;
        let cachedDocHeight = document.documentElement.scrollHeight - window.innerHeight;

        window.addEventListener('resize', () => {
            cachedDocHeight = document.documentElement.scrollHeight - window.innerHeight;
        }, { passive: true });

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY || window.pageYOffset;
                    const pct = cachedDocHeight > 0 ? (scrollTop / cachedDocHeight) : 0;
                    bar.style.transform = `scaleX(${pct})`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
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

    // ── FORM SUBMIT (real, via Web3Forms) ──
    // O form posta pra api.web3forms.com, que entrega no email cadastrado na access_key.
    // Sem access_key configurada, avisa o dono do site em vez de fingir sucesso.
    function initForm() {
        const form = document.getElementById('peticaoForm');
        const btn = document.getElementById('btnProtocolar');
        const feedback = document.getElementById('peticaoFeedback');
        if (!form || !btn) return;

        const mountedAt = Date.now();

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = Object.fromEntries(new FormData(form));
            formData.fillTime = Date.now() - mountedAt;

            // Honeypot preenchido = bot, ignora silenciosamente
            if (formData.botcheck && String(formData.botcheck).trim().length > 0) return;

            // Estado de envio
            btn.classList.add('sending');
            btn.disabled = true;
            if (feedback) feedback.textContent = '';

            try {
                const res = await fetch(form.action || '/api/contato', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    btn.classList.remove('sending');
                    btn.classList.add('sent');
                    if (feedback) {
                        feedback.textContent = '✓ Petição protocolada! Respondo em breve.';
                        feedback.className = 'peticao__feedback peticao__feedback--success';
                    }
                    setTimeout(() => {
                        form.reset();
                        btn.classList.remove('sent');
                        btn.disabled = false;
                    }, 2500);
                } else {
                    throw new Error(data.error || data.message || 'Falha no protocolo');
                }
            } catch (err) {
                btn.classList.remove('sending');
                btn.disabled = false;
                if (feedback) {
                    feedback.textContent = `⚠ ${err.message || 'Não foi possível protocolar. Tente pelo email: kaue.ruon@gmail.com'}`;
                    feedback.className = 'peticao__feedback peticao__feedback--error';
                }
                console.error('[form] erro:', err);
            }
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

        const safeCall = (fn, name) => {
            try { fn(); } catch (err) { console.warn(`[boot] Erro isolado ao inicializar ${name}:`, err); }
        };

        // Init all modules after loader signals done (event bus padronizado em window)
        window.addEventListener('loaderDone', () => {
            safeCall(initLenis, 'Lenis');
            safeCall(initScrollProgress, 'ScrollProgress');
            safeCall(initNavBurger, 'NavBurger');
            safeCall(initSmoothLinks, 'SmoothLinks');
            safeCall(initForm, 'Form');

            // Init interactive modules
            safeCall(() => Cursor.init(), 'Cursor');
            safeCall(() => HeroScene.init(), 'HeroScene');
            safeCall(() => EasterEggs.init(), 'EasterEggs');
            if (typeof CipherDecode !== 'undefined') safeCall(() => CipherDecode.init(), 'CipherDecode');
            if (typeof BreachProtocol !== 'undefined') safeCall(() => BreachProtocol.init(), 'BreachProtocol');
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
