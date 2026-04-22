/* ═══════════════════════════════════════════
   EASTER EGGS — Konami, 5x click, console art, hover firma
   ═══════════════════════════════════════════ */

const EasterEggs = (() => {
    // ── 1. KONAMI CODE ──
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    function initKonami() {
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiSequence[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiSequence.length) {
                    konamiIndex = 0;
                    showKonamiModal();
                }
            } else {
                konamiIndex = 0;
            }
        });

        document.getElementById('konamiClose').addEventListener('click', () => {
            document.getElementById('konamiModal').classList.remove('active');
        });
    }

    function showKonamiModal() {
        document.getElementById('konamiModal').classList.add('active');
    }

    // ── 2. CLICK 5X NO NOME ──
    let nameClickCount = 0;
    let nameClickTimer;
    let nameGlitchActive = false;

    function initNameGlitch() {
        const nameEl = document.getElementById('heroName');
        if (!nameEl) return;

        nameEl.addEventListener('click', () => {
            if (nameGlitchActive) return;

            nameClickCount++;
            clearTimeout(nameClickTimer);

            nameClickTimer = setTimeout(() => {
                nameClickCount = 0;
            }, 2000);

            if (nameClickCount >= 5) {
                nameClickCount = 0;
                triggerNameGlitch(nameEl);
            }
        });
    }

    function triggerNameGlitch(el) {
        nameGlitchActive = true;

        // Save original content
        const lines = el.querySelectorAll('.hero__name-line');
        const originals = Array.from(lines).map(l => ({
            el: l,
            text: l.textContent,
            class: l.className,
        }));

        // Apply glitch
        el.classList.add('glitch');
        lines.forEach(l => {
            l.textContent = '';
            l.style.fontSize = 'clamp(1rem, 3vw, 2.5rem)';
        });
        lines[0].textContent = 'ERRO 418:';
        lines[0].style.color = '#ef4444';
        lines[1].textContent = 'PESSOA COMPLEXA DEMAIS';
        lines[1].style.color = '#ef4444';
        lines[2].textContent = 'PRA UM CURRÍCULO';
        lines[2].style.color = '#ef4444';

        // Revert after 3s
        setTimeout(() => {
            el.classList.remove('glitch');
            originals.forEach(o => {
                o.el.textContent = o.text;
                o.el.className = o.class;
                o.el.style.fontSize = '';
                o.el.style.color = '';
            });
            nameGlitchActive = false;
        }, 3000);
    }

    // ── 3. DEVTOOLS CONSOLE ──
    function initConsoleArt() {
        const art = `
%c
  _  __     _   _ _____
 | |/ /    | | | | ____|
 | ' /     | | | |  _|
 | . \\     | |_| | |___
 |_|\\_\\     \\___/|_____|

%cSe você chegou aqui, você é do meu tipo.
Fala comigo: kaue.ruon@gmail.com

P.S.: sim, esse site foi feito por alguém
que também processa procurações. ⚖️
    `;

        console.log(
            art,
            'color: #2563eb; font-family: monospace; font-size: 14px; font-weight: bold;',
            'color: #d4a017; font-family: monospace; font-size: 12px;'
        );
    }

    // ── 4. HOVER 3s NA FICHA TÉCNICA ──
    let fichaTimer;

    function initFichaHover() {
        const card = document.getElementById('fichaCard');
        const stamp = document.getElementById('fichaStamp');
        if (!card || !stamp) return;

        card.addEventListener('mouseenter', () => {
            fichaTimer = setTimeout(() => {
                // Tremor
                card.style.animation = 'fichaShake 0.1s 5';

                // Show stamp
                setTimeout(() => {
                    card.style.animation = '';
                    stamp.classList.add('visible');

                    // Remove after 2.5s
                    setTimeout(() => {
                        stamp.classList.remove('visible');
                    }, 2500);
                }, 500);
            }, 3000);
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(fichaTimer);
        });

        // Add shake keyframe dynamically
        const style = document.createElement('style');
        style.textContent = `
      @keyframes fichaShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px) rotate(-0.5deg); }
        75% { transform: translateX(2px) rotate(0.5deg); }
      }
    `;
        document.head.appendChild(style);
    }

    function init() {
        initKonami();
        initNameGlitch();
        initConsoleArt();
        initFichaHover();
    }

    return { init };
})();
