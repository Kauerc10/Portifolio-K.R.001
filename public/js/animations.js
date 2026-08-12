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
    let typewriterPhrases = [
        '> Construo software com IA generativa.',
        '> Cartorário que automatiza burocracia.',
        '> Conecto LLMs a problemas reais.',
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

        // Espera o loader terminar antes de começar qualquer animação (event bus em window)
        window.addEventListener('loaderDone', () => {
            setTimeout(startAnimations, 200);
        });
    }

    /**
     * Respeita a preferência do usuário por movimento reduzido.
     * Usuários que ativam "reduzir movimento" no SO/navegador recebem
     * uma versão estática do site — sem flutuação, skew, tilt ou typewriter.
     */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Dispara todas as animações em sequência.
     * Chamada 200ms após o 'loaderDone' pra dar tempo
     * da transição do loader terminar visualmente.
     *
     * Em prefers-reduced-motion, omite animações decorativas (zero-G, skew,
     * tilt, typewriter loop) mantendo apenas as essenciais de navegação.
     */
    function startAnimations() {
        animateNav();
        animateHeroName();
        animateSectionLines();
        animateSlideElements();
        animateTimelineLine();
        animateObmepSynergy();
        animateObmepTimeline();

        if (prefersReducedMotion) return; // Pula decorações cinéticas

        startTypewriter();
        initTilt();
        animateZeroG();
        initVelocitySkew();
    }

    /**
     * Exibe a navbar e configura o IntersectionObserver pra tracking de seção.
     * A cada seção que entra na viewport (threshold: 30%), atualiza o indicador
     * "§ NN / TOTAL" e o link ativo na navbar.
     *
     * O total é computado dinamicamente (sections.length), não hardcoded.
     */
    function animateNav() {
        const nav = document.getElementById('nav');
        const indicator = document.getElementById('navIndicator');
        const links = document.querySelectorAll('.nav__link');
        // Só as <section> reais contam pro total — os nav links também têm
        // data-section mas não devem ser contados (senão total = 16, não 8).
        const sections = document.querySelectorAll('section[data-section]');
        const total = sections.length.toString().padStart(2, '0');

        nav.classList.add('visible');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = entry.target.getAttribute('data-section');
                    indicator.textContent = `§ ${idx.toString().padStart(2, '0')} / ${total}`;

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

        // O componente injeta as frases já localizadas no atributo data-roles.
        // O fallback acima só é usado por páginas legadas sem dicionário.
        try {
            const localizedRoles = JSON.parse(el.dataset.roles || '[]');
            if (Array.isArray(localizedRoles) && localizedRoles.length > 0) {
                typewriterPhrases = localizedRoles.map(role => `> ${String(role)}`);
            }
        } catch (error) {
            console.warn('[Animations] Não foi possível ler as frases localizadas do hero.', error);
        }

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
     * Desenha as linhas no compositor. scaleX evita recalcular o layout durante
     * a animação, ao contrário da antiga transição de width.
     */
    function animateSectionLines() {
        document.querySelectorAll('.section__line').forEach(line => {
            gsap.fromTo(line,
                { scaleX: 0, transformOrigin: 'left center' },
                {
                    scaleX: 1,
                    duration: 0.7,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: line,
                        start: 'top 88%',
                        once: true,
                    },
                    onComplete: () => gsap.set(line, { clearProps: 'transform,transformOrigin' }),
                }
            );
        });
    }

    /**
     * Revela os elementos em lotes para reduzir o número de callbacks disparados
     * durante o scroll. O deslocamento curto, a camada temporária do compositor e
     * a limpeza das propriedades ao terminar deixam o fade contínuo sem manter
     * dezenas de camadas na GPU.
     */
    function animateSlideElements() {
        const elements = gsap.utils.toArray('.anim-slide');
        if (!elements.length) return;

        if (prefersReducedMotion) {
            gsap.set(elements, { opacity: 1, clearProps: 'transform,willChange' });
            return;
        }

        gsap.set(elements, {
            opacity: 0,
            y: 24,
            force3D: true,
        });

        ScrollTrigger.batch(elements, {
            start: 'top 92%',
            once: true,
            interval: 0.08,
            batchMax: 4,
            onEnter: batch => {
                gsap.set(batch, { willChange: 'transform,opacity' });
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.07,
                    ease: 'expo.out',
                    overwrite: 'auto',
                    onComplete: () => gsap.set(batch, {
                        clearProps: 'transform,opacity,willChange',
                    }),
                });
            },
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
     * O hero e a ficha técnica permanecem no fluxo normal do documento.
     *
     * Evitamos parallax via transform nesses blocos porque transforms não reservam
     * espaço no layout: ao rolar, o conteúdo do hero podia invadir a seção Sobre
     * e a ficha podia avançar sobre a seção seguinte. O sticky da ficha já oferece
     * continuidade espacial sem retirar nenhum elemento de sua área de colisão.
     */

    /**
     * Comunica com a cena Three.js quando o usuário entra/sai da seção OBMEP.
     * Quando está na seção, dispara 'obmepSynergy' com detail: true,
     * e a cena faz uma transição leve da paleta azul para dourada.
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

        // A linha cresce no compositor, sem recalcular layout durante o scroll.
        gsap.set(glow, { scaleY: 0, transformOrigin: 'top center' });
        gsap.to(glow, {
            scaleY: 1,
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

            card.addEventListener('mouseenter', () => {
                window.dispatchEvent(new CustomEvent('obmepHover', {
                    detail: { active: true, level: card.getAttribute('data-level') }
                }));
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
     * Aplicado somente aos cards de projetos; as medalhas permanecem estáveis.
     *
     * Importante: usa GSAP (não CSS cru) para não brigar com animateZeroG,
     * que aplica transform via GSAP nos mesmos elementos. O overwrite:true
     * garante que o tilt toma posse do transform durante o hover, e o
     * mouseleave devolve o controle pro zero-G (que é retomado por seu
     * próprio listener mouseleave).
     */
    function initTilt() {
        // Pula tilt em telas de toque — não há hover confiável
        if (window.matchMedia('(hover: none)').matches) return;

        const cards = document.querySelectorAll('.evidence__folder');

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

                gsap.to(card, {
                    rotateX,
                    rotateY,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            });

            // Volta ao normal quando o mouse sai
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                    overwrite: 'auto',
                });
            });
        });
    }

    /**
     * Efeito de "gravidade zero" apenas em superfícies que não usam reveal.
     *
     * Cards com `.anim-slide` ficam de fora para duas timelines GSAP não
     * disputarem a mesma propriedade transform durante o fade de entrada.
     */
    function animateZeroG() {
        const floaters = document.querySelectorAll(
            '.sobre__card, .timeline__content'
        );

        // IntersectionObserver para SÓ animar flutuação em cards visíveis na tela (economiza CPU imensa)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const floatAnim = entry.target._floatAnim;
                if (!floatAnim) return;
                if (entry.isIntersecting) {
                    floatAnim.play();
                } else {
                    floatAnim.pause();
                }
            });
        }, { threshold: 0.1 });

        floaters.forEach((el, i) => {
            gsap.set(el, { transformPerspective: 800 });

            const floatAnim = gsap.to(el, {
                y: () => 6 + Math.random() * 6,   // Deslocamento vertical sutil
                x: () => -3 + Math.random() * 6,   // Balanceio horizontal suave
                z: () => -10 + Math.random() * 20, // Profundidade variável
                rotation: () => -1 + Math.random() * 2,   // Leve inclinação
                rotationY: () => -1.5 + Math.random() * 3, // Leve perspectiva lateral
                duration: () => 3.5 + Math.random() * 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                paused: true, // Começa pausado até entrar na tela
                delay: i * 0.15,
            });

            el._floatAnim = floatAnim;

            // Para no hover, retoma no mouseLeave se visível
            el.addEventListener('mouseenter', () => floatAnim.pause());
            el.addEventListener('mouseleave', () => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    floatAnim.play();
                }
            });

            observer.observe(el);
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
