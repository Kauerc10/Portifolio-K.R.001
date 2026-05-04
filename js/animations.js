/**
 * @fileoverview ANIMATIONS — Sistema de Animações com GSAP + ScrollTrigger
 *
 * O coração visual do portfólio. Controla todas as animações de entrada,
 * scroll e interação, incluindo:
 *
 * - Animação de entrada letra por letra no nome do hero
 * - Typewriter com frases rotativas
 * - Linhas horizontais que "desenham" ao entrar na viewport
 * - Barras de habilidades animadas por GSAP
 * - Tilt 3D nos cards
 * - Efeito zero-g de flutuação em todos os cards
 * - Skew do layout baseado na velocidade de scroll
 * - Comunicação com a cena Three.js via CustomEvents
 *
 * Só começa a rodar depois do evento 'loaderDone'.
 *
 * @module Animations
 * @requires gsap
 * @requires ScrollTrigger (plugin GSAP)
 */

/**
 * Módulo IIFE de Animações.
 * @namespace Animations
 */
const Animations = (() => {

    /**
     * Frases do efeito typewriter do hero.
     * São exibidas em loop com digitação e apagamento automáticos.
     * @type {string[]}
     */
    const typewriterPhrases = [
        '> Cartorário que entende de APIs.',
        '> Desenvolvedor que entende de documentos.',
        '> Transformei burocracia em código.',
    ];

    // Estado interno do typewriter
    let twIndex = 0;      // Qual frase está sendo exibida
    let twCharIndex = 0;      // Em qual caractere estamos
    let twIsDeleting = false; // Se estamos apagando ou digitando
    let twTimeout;            // Referência do setTimeout pra cancelamento

    /**
     * Ponto de entrada do módulo.
     * Registra os plugins do GSAP e aguarda o sinal do loader.
     */
    function init() {
        gsap.registerPlugin(ScrollTrigger);

        // Espera o loader terminar antes de começar qualquer animação
        document.addEventListener('loaderDone', () => {
            setTimeout(startAnimations, 200);
        });
    }

    /**
     * Dispara todas as animações em sequência.
     * Chamada 200ms após o 'loaderDone' pra dar tempo
     * da transição do loader terminar visualmente.
     */
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

    /**
     * Exibe a navbar e configura o IntersectionObserver pra tracking de seção.
     * A cada seção que entra na viewport (threshold: 30%), atualiza o indicador
     * "§ 01 / 07" e o link ativo na navbar.
     */
    function animateNav() {
        const nav = document.getElementById('nav');
        const indicator = document.getElementById('navIndicator');
        const links = document.querySelectorAll('.nav__link');
        const sections = document.querySelectorAll('[data-section]');

        nav.classList.add('visible');

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

    /**
     * Anima o nome do hero letra por letra de baixo pra cima.
     *
     * Técnica: divide o texto em spans individuais por caractere,
     * depois usa GSAP pra animar cada span com stagger (delay escalonado).
     * O overflow:hidden nas linhas cria o efeito de "revelar" o texto.
     */
    function animateHeroName() {
        const lines = document.querySelectorAll('.hero__name-line');

        lines.forEach((line, i) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.overflow = 'hidden';

            // Cria um span por caractere
            [...text].forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(100%)';
                line.appendChild(span);
            });

            // GSAP anima todos juntos com delay escalonado por letra
            gsap.to(line.querySelectorAll('span'), {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.025,     // 25ms de delay entre cada letra
                ease: 'expo.out',
                delay: 0.3 + i * 0.15, // Cada linha começa 150ms depois da anterior
            });
        });
    }

    /**
     * Loop infinito do efeito typewriter.
     *
     * Digita char por char com 50ms de intervalo,
     * espera 2s no final da frase, depois apaga com 30ms.
     * Ao apagar tudo, troca pra próxima frase e recomeça.
     */
    function startTypewriter() {
        const el = document.getElementById('twText');
        if (!el) return;

        function tick() {
            const phrase = typewriterPhrases[twIndex];

            if (!twIsDeleting) {
                // Digitando — adiciona mais um caractere
                el.textContent = phrase.substring(0, twCharIndex + 1);
                twCharIndex++;

                if (twCharIndex >= phrase.length) {
                    twIsDeleting = true;
                    twTimeout = setTimeout(tick, 2000); // Pausa antes de apagar
                    return;
                }
                twTimeout = setTimeout(tick, 50); // Velocidade de digitação

            } else {
                // Apagando — remove um caractere
                el.textContent = phrase.substring(0, twCharIndex - 1);
                twCharIndex--;

                if (twCharIndex <= 0) {
                    twIsDeleting = false;
                    twIndex = (twIndex + 1) % typewriterPhrases.length; // Próxima frase
                    twTimeout = setTimeout(tick, 400);
                    return;
                }
                twTimeout = setTimeout(tick, 30); // Apagamento mais rápido que digitação
            }
        }

        setTimeout(tick, 1500); // Aguarda as letras do nome animarem primeiro
    }

    /**
     * Anima as linhas horizontais decorativas das seções.
     * Cada linha começa com width:0% e cresce pra 100% quando entra na viewport.
     */
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

    /**
     * Anima elementos com a classe `.anim-slide` de baixo pra cima.
     * Qualquer elemento no HTML com essa classe ganha a animação automaticamente.
     */
    function animateSlideElements() {
        document.querySelectorAll('.anim-slide').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
                }
            );
        });
    }

    /**
     * Anima as barras de habilidades (.skill-bar) via GSAP.
     * O valor alvo é lido do atributo `data-percent` de cada barra no HTML.
     *
     * @example
     * <!-- No HTML: -->
     * <div class="skill-bar" data-percent="85">...</div>
     */
    function animateSkillBars() {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const pct = bar.getAttribute('data-percent');
            const fill = bar.querySelector('.skill-bar__fill');

            gsap.to(fill, {
                width: pct + '%',
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: { trigger: bar, start: 'top 88%', toggleActions: 'play none none none' }
            });
        });
    }

    /**
     * Anima a linha vertical da timeline da experiência.
     * Usa scrub pra sincronizar o crescimento com o scroll —
     * a linha "desenha" conforme o usuário rola a página.
     */
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

    /**
     * Despacha o progresso de scroll do hero pra cena Three.js.
     * O three-scene.js escuta 'heroScrollProgress' e usa o valor
     * pra empurrar a câmera pra trás conforme o hero some.
     */
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

    /**
     * Efeito parallax no texto do hero e na ficha técnica do Sobre.
     * Os elementos se movem em velocidades diferentes do scroll (deslocamento Y).
     */
    function animateHeroParallax() {
        // Hero text desce 40% mais devagar que o scroll
        gsap.to('.hero__text', {
            yPercent: 40,
            ease: 'none',
            scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
        });

        // Ficha técnica tem parallax mais suave
        gsap.to('.sobre__card-wrap', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: { trigger: '#sobre', start: 'top bottom', end: 'bottom top', scrub: true }
        });
    }

    /**
     * Comunica com a cena Three.js quando o usuário entra/sai da seção OBMEP.
     * Quando está na seção, dispara 'obmepSynergy' com detail: true,
     * e a cena muda de azul pra dourado e acelera a rotação.
     */
    function animateObmepSynergy() {
        ScrollTrigger.create({
            trigger: '.obmep-vault',
            start: 'top 70%',
            end: 'bottom 30%',
            onEnter: () => window.dispatchEvent(new CustomEvent('obmepSynergy', { detail: true })),
            onLeave: () => window.dispatchEvent(new CustomEvent('obmepSynergy', { detail: false })),
            onEnterBack: () => window.dispatchEvent(new CustomEvent('obmepSynergy', { detail: true })),
            onLeaveBack: () => window.dispatchEvent(new CustomEvent('obmepSynergy', { detail: false })),
        });
    }

    /**
     * Anima a linha dourada da timeline OBMEP com scrub.
     * Também ativa/desativa o ponto luminoso (.is-active) conforme
     * cada card entra na viewport, e conecta o efeito magnético da cena 3D.
     */
    function animateObmepTimeline() {
        const glow = document.querySelector('.obmep-timeline-glow');
        if (!glow) return;

        // Linha dourada cresce conforme o usuário rola a seção OBMEP
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

        // Cada card: ativa o nó na linha quando está centrado na tela
        document.querySelectorAll('.obmep-card').forEach(card => {
            ScrollTrigger.create({
                trigger: card,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => card.classList.add('is-active'),
                onEnterBack: () => card.classList.add('is-active'),
                onLeave: () => card.classList.remove('is-active'),
                onLeaveBack: () => card.classList.remove('is-active'),
            });

            // Hover: muda a cor da cena 3D pro tema da medalha específica
            card.addEventListener('mouseenter', () => {
                const level = card.getAttribute('data-level');
                window.dispatchEvent(new CustomEvent('obmepHover', { detail: { active: true, level } }));
            });
            card.addEventListener('mouseleave', () => {
                window.dispatchEvent(new CustomEvent('obmepHover', { detail: { active: false } }));
            });
        });
    }

    /**
     * Efeito de inclinação 3D (tilt) nos cards ao mover o mouse.
     * Calcula o ângulo de rotação baseado na posição do cursor
     * dentro do card usando o centro como referência (0,0).
     *
     * Funciona em: .evidence__folder e .obmep-card
     */
    function initTilt() {
        const cards = document.querySelectorAll('.evidence__folder, .obmep-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Mapeamento da posição pra ângulo de rotação (±8°)
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            // Volta ao normal quando o mouse sai
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    /**
     * Efeito de "gravidade zero" — todos os cards flutuam levemente.
     *
     * Cada elemento tem valores aleatórios de translação e rotação
     * que fazem yoyo infinito, criando um efeito orgânico diferente pra cada um.
     * A flutuação pausa quando o mouse entra no elemento (via hover).
     */
    function animateZeroG() {
        const floaters = document.querySelectorAll(
            '.evidence__folder, .sobre__card, .timeline__content, .formacao__card, .obmep-card'
        );

        floaters.forEach((el, i) => {
            gsap.set(el, { transformPerspective: 800 });

            const floatAnim = gsap.to(el, {
                y: () => 6 + Math.random() * 6,   // Deslocamento vertical sutil
                x: () => -4 + Math.random() * 8,   // Balanceio horizontal suave
                z: () => -15 + Math.random() * 30, // Profundidade variável
                rotation: () => -1 + Math.random() * 2,   // Leve inclinação
                rotationY: () => -2 + Math.random() * 4,   // Leve perspectiva lateral
                duration: () => 3.5 + Math.random() * 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.2, // Cada elemento começa em um tempo diferente
            });

            // Para no hover, retoma no mouseLeave
            el.addEventListener('mouseenter', () => floatAnim.pause());
            el.addEventListener('mouseleave', () => floatAnim.play());
        });
    }

    /**
     * Aplica um leve skew (inclinação) nas seções durante o scroll rápido.
     * Quanto mais rápido o scroll, maior o ângulo (máximo ±3°).
     * O ângulo volta pra zero automaticamente com uma animação elástica.
     */
    function initVelocitySkew() {
        let proxy = { skew: 0 };
        let skewSetter = gsap.quickSetter('.section', 'skewY', 'deg');
        let clamp = gsap.utils.clamp(-3, 3); // Limita entre -3° e 3°

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -400);

                // Só atualiza se o novo skew for maior que o atual
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {
                        skew: 0,
                        duration: 0.8,
                        ease: 'power3',
                        overwrite: true,
                        onUpdate: () => skewSetter(proxy.skew)
                    });
                }
            }
        });
    }

    // API pública
    return { init };
})();
