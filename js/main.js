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

        const accessKey = form.querySelector('input[name="access_key"]');
        const isConfigured = accessKey && accessKey.value !== 'SEU_ACCESS_KEY_AQUI';

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot preenchido = bot, ignora silenciosamente
            const honeypot = form.querySelector('input[name="botcheck"]');
            if (honeypot && honeypot.checked) return;

            // Access key não configurada — feedback honesto (não finge envio)
            if (!isConfigured) {
                if (feedback) {
                    feedback.textContent = '⚠ Formulário em configuração. Use o email direto: kaue.ruon@gmail.com';
                    feedback.className = 'peticao__feedback peticao__feedback--error';
                }
                return;
            }

            // Estado de envio
            btn.classList.add('sending');
            btn.disabled = true;
            if (feedback) feedback.textContent = '';

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(Object.fromEntries(new FormData(form))),
                });
                const data = await res.json();

                if (data.success) {
                    btn.classList.remove('sending');
                    btn.classList.add('sent');
                    if (feedback) {
                        feedback.textContent = '✓ Mensagem enviada! Respondo em breve.';
                        feedback.className = 'peticao__feedback peticao__feedback--success';
                    }
                    setTimeout(() => {
                        form.reset();
                        btn.classList.remove('sent');
                        btn.disabled = false;
                    }, 2500);
                } else {
                    throw new Error(data.message || 'Falha no envio');
                }
            } catch (err) {
                btn.classList.remove('sending');
                btn.disabled = false;
                if (feedback) {
                    feedback.textContent = '⚠ Não foi possível enviar. Tente pelo email: kaue.ruon@gmail.com';
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

        // Init all modules after loader signals done (event bus padronizado em window)
        window.addEventListener('loaderDone', () => {
            try {
                initLenis();
                initScrollProgress();
                initNavBurger();
                initSmoothLinks();
                initForm();

                // Init interactive modules
                Cursor.init();
                HeroScene.init();
                EasterEggs.init();
                if (typeof CipherDecode !== 'undefined') CipherDecode.init();
                if (typeof BreachProtocol !== 'undefined') BreachProtocol.init();
            } catch (err) {
                // Um erro num módulo não deve matar o boot dos demais
                console.error('[boot] falha na inicialização pós-loader:', err);
            }
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
