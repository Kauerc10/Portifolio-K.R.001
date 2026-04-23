/* ═══════════════════════════════════════════
   GSAP ANIMATIONS — ScrollTrigger, SplitText, typewriter
   ═══════════════════════════════════════════ */

const Animations = (() => {
    const typewriterPhrases = [
        '> Cartorário que entende de APIs.',
        '> Desenvolvedor que entende de documentos.',
        '> Transformei burocracia em código.',
    ];
    let twIndex = 0;
    let twCharIndex = 0;
    let twIsDeleting = false;
    let twTimeout;

    function init() {
        gsap.registerPlugin(ScrollTrigger);

        // Wait for loader to finish
        document.addEventListener('loaderDone', () => {
            setTimeout(startAnimations, 200);
        });
    }

    function startAnimations() {
        animateNav();
        animateHeroName();
        startTypewriter();
        animateSectionLines();
        animateSlideElements();
        animateSkillBars();
        animateTimelineLine();
        animateHeroScroll();
        animateHeroParallax();
        animateObmepSynergy();
        animateObmepTimeline();
        initTilt();
        animateZeroG();
        initVelocitySkew();
    }

    // ── NAV ──
    function animateNav() {
        const nav = document.getElementById('nav');
        nav.classList.add('visible');

        // Section tracking with IntersectionObserver
        const sections = document.querySelectorAll('[data-section]');
        const indicator = document.getElementById('navIndicator');
        const links = document.querySelectorAll('.nav__link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = entry.target.getAttribute('data-section');
                    indicator.textContent = `§ ${idx.toString().padStart(2, '0')} / 07`;

                    links.forEach(l => l.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav__link[data-section="${idx}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(s => observer.observe(s));
    }

    // ── HERO NAME — Letter by letter reveal ──
    function animateHeroName() {
        const lines = document.querySelectorAll('.hero__name-line');

        lines.forEach((line, i) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.overflow = 'hidden';

            [...text].forEach((char, j) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(100%)';
                line.appendChild(span);
            });

            const chars = line.querySelectorAll('span');
            gsap.to(chars, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.025,
                ease: 'expo.out',
                delay: 0.3 + i * 0.15,
            });
        });
    }

    // ── TYPEWRITER ──
    function startTypewriter() {
        const el = document.getElementById('twText');
        if (!el) return;

        function tick() {
            const phrase = typewriterPhrases[twIndex];

            if (!twIsDeleting) {
                el.textContent = phrase.substring(0, twCharIndex + 1);
                twCharIndex++;

                if (twCharIndex >= phrase.length) {
                    twIsDeleting = true;
                    twTimeout = setTimeout(tick, 2000);
                    return;
                }
                twTimeout = setTimeout(tick, 50);
            } else {
                el.textContent = phrase.substring(0, twCharIndex - 1);
                twCharIndex--;

                if (twCharIndex <= 0) {
                    twIsDeleting = false;
                    twIndex = (twIndex + 1) % typewriterPhrases.length;
                    twTimeout = setTimeout(tick, 400);
                    return;
                }
                twTimeout = setTimeout(tick, 30);
            }
        }

        // Start after name animation
        setTimeout(tick, 1500);
    }

    // ── SECTION LINES — draw left to right ──
    function animateSectionLines() {
        document.querySelectorAll('.section__line').forEach(line => {
            gsap.fromTo(line,
                { width: '0%' },
                {
                    width: '100%',
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: line,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });
    }

    // ── SLIDE ELEMENTS — from y:60 to y:0 ──
    function animateSlideElements() {
        document.querySelectorAll('.anim-slide').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });
    }

    // ── SKILL BARS — animate width ──
    function animateSkillBars() {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const pct = bar.getAttribute('data-percent');
            const fill = bar.querySelector('.skill-bar__fill');

            gsap.to(fill, {
                width: pct + '%',
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                }
            });
        });
    }

    // ── TIMELINE LINE — draw top to bottom ──
    function animateTimelineLine() {
        const line = document.getElementById('timelineLine');
        if (!line) return;

        gsap.fromTo(line,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 70%',
                    end: 'bottom 50%',
                    scrub: 0.5,
                }
            }
        );
    }

    // ── HERO SCROLL — dispatch progress for Three.js ──
    function animateHeroScroll() {
        ScrollTrigger.create({
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
                window.dispatchEvent(new CustomEvent('heroScrollProgress', {
                    detail: self.progress
                }));
            }
        });
    }

    // ── HERO PARALLAX E FICHA TÉCNICA ──
    function animateHeroParallax() {
        gsap.to('.hero__text', {
            yPercent: 40,
            ease: "none",
            scrollTrigger: {
                trigger: '#hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to('.sobre__card-wrap', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: '#sobre',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // ── OBMEP SYNERGY — Overclock 3D scene ──
    function animateObmepSynergy() {
        ScrollTrigger.create({
            trigger: '.obmep-vault',
            start: 'top 70%',
            end: 'bottom 30%',
            onEnter: () => window.dispatchEvent(new CustomEvent('obmepSynergy', { detail: true })),
            onLeave: () => window.dispatchEvent(new CustomEvent('obmepSynergy', { detail: false })),
            onEnterBack: () => window.dispatchEvent(new CustomEvent('obmepSynergy', { detail: true })),
            onLeaveBack: () => window.dispatchEvent(new CustomEvent('obmepSynergy', { detail: false }))
        });
    }

    // ── OBMEP GOLDEN TIMELINE (Phase 8) ──
    function animateObmepTimeline() {
        const glow = document.querySelector('.obmep-timeline-glow');
        if (!glow) return;

        gsap.to(glow, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.obmep-vault__grid',
                start: 'top 50%',
                end: 'bottom 50%',
                scrub: 0.5
            }
        });

        const cards = document.querySelectorAll('.obmep-card');
        cards.forEach((card) => {
            ScrollTrigger.create({
                trigger: card,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => card.classList.add('is-active'),
                onEnterBack: () => card.classList.add('is-active'),
                onLeave: () => card.classList.remove('is-active'),
                onLeaveBack: () => card.classList.remove('is-active')
            });

            // Adicionar intersecção pro Raycasting Magnético no ThreeJS
            card.addEventListener('mouseenter', () => {
                const level = card.getAttribute('data-level');
                window.dispatchEvent(new CustomEvent('obmepHover', { detail: { active: true, level } }));
            });
            card.addEventListener('mouseleave', () => {
                window.dispatchEvent(new CustomEvent('obmepHover', { detail: { active: false } }));
            });
        });
    }

    // ── VANILLA TILT — Folders e OBMEP Cards ──
    function initTilt() {
        const cards = document.querySelectorAll('.evidence__folder, .obmep-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // ── VELOCITY SKEW — CSS transform na velocidade de scroll ──
    function initVelocitySkew() {
        let proxy = { skew: 0 };
        let skewSetter = gsap.quickSetter(".section", "skewY", "deg");
        let clamp = gsap.utils.clamp(-3, 3);

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -400);
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {
                        skew: 0,
                        duration: 0.8,
                        ease: "power3",
                        overwrite: true,
                        onUpdate: () => skewSetter(proxy.skew)
                    });
                }
            }
        });
    }

    // ── ZERO-G FLOAT — Flutuação Contínua (Advanced 3D Physics) ──
    function animateZeroG() {
        const floaters = document.querySelectorAll('.evidence__folder, .sobre__card, .timeline__content, .formacao__card, .obmep-card');

        floaters.forEach((el, i) => {
            gsap.set(el, { transformPerspective: 800 });

            let floatAnim = gsap.to(el, {
                y: () => 6 + Math.random() * 6,
                x: () => -4 + Math.random() * 8,
                z: () => -15 + Math.random() * 30,
                rotation: () => -1 + Math.random() * 2,
                rotationY: () => -2 + Math.random() * 4,
                duration: () => 3.5 + Math.random() * 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2
            });

            el.addEventListener('mouseenter', () => floatAnim.pause());
            el.addEventListener('mouseleave', () => floatAnim.play());
        });
    }

    return { init };
})();
