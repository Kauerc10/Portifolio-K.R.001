/**
 * @fileoverview EASTER EGGS — Segredos Escondidos pelo Site
 *
 * Quatro surpresas interativas pra quem explorar o portfólio:
 *
 * 1. **Konami Code** (↑↑↓↓←→←→BA) → Modal de "acesso privilegiado"
 * 2. **5 cliques no nome** → Glitch com mensagem de erro 418
 * 3. **Console do DevTools** → Arte ASCII com contato direto
 * 4. **3s de hover na ficha técnica** → Carimbo de "APROVADO"
 *
 * São detalhes que só aparecem pra quem realmente explorá o site
 * — exatamente o tipo de dev com quem quero trabalhar.
 *
 * @module EasterEggs
 */

/**
 * Módulo IIFE dos Easter Eggs.
 * @namespace EasterEggs
 */
const EasterEggs = (() => {

    // ════════════════════════════════
    //  1. KONAMI CODE
    //  ↑↑↓↓←→←→BA — sequência clássica dos games dos anos 80
    // ════════════════════════════════

    /**
     * Sequência de teclas do Konami Code.
     * @type {string[]}
     */
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    /** @type {number} Índice atual na sequência do Konami */
    let konamiIndex = 0;

    /**
     * Inicia o detector do Konami Code.
     * Escuta cada tecla e compara com a sequência esperada.
     * Qualquer erro reseta pra posição 0.
     */
    function initKonami() {
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiSequence[konamiIndex]) {
                konamiIndex++;

                if (konamiIndex === konamiSequence.length) {
                    konamiIndex = 0;
                    showKonamiModal();
                }
            } else {
                konamiIndex = 0; // Errou a sequência — recomeça
            }
        });

        // Botão de fechar o modal
        document.getElementById('konamiClose').addEventListener('click', () => {
            document.getElementById('konamiModal').classList.remove('active');
        });
    }

    /**
     * Exibe o modal do Konami Code.
     * O CSS cuida do fade in — aqui só adicionamos a classe.
     */
    function showKonamiModal() {
        document.getElementById('konamiModal').classList.add('active');
    }


    // ════════════════════════════════
    //  2. GLITCH DO NOME (5 cliques em 2 segundos)
    // ════════════════════════════════

    let nameClickCount = 0;
    let nameClickTimer;
    let nameGlitchActive = false;

    /**
     * Inicia o detector de cliques no nome do hero.
     * 5 cliques em até 2 segundos dispara o efeito de glitch.
     */
    function initNameGlitch() {
        const nameEl = document.getElementById('heroName');
        if (!nameEl) return;

        nameEl.addEventListener('click', () => {
            if (nameGlitchActive) return; // Evita acionar durante o glitch

            nameClickCount++;
            clearTimeout(nameClickTimer);

            // Reseta a contagem depois de 2 segundos sem novo clique
            nameClickTimer = setTimeout(() => { nameClickCount = 0; }, 2000);

            if (nameClickCount >= 5) {
                nameClickCount = 0;
                triggerNameGlitch(nameEl);
            }
        });
    }

    /**
     * Executa o glitch no nome por 3 segundos.
     * Substitui o texto pelo Erro 418 e aplica a animação CSS de glitch,
     * depois restaura tudo ao estado original.
     *
     * @param {HTMLElement} el - O elemento wrapper do nome (#heroName)
     */
    function triggerNameGlitch(el) {
        nameGlitchActive = true;

        // Salva o conteúdo original pra restaurar depois
        const lines = el.querySelectorAll('.hero__name-line');
        const originals = Array.from(lines).map(l => ({
            el: l,
            text: l.textContent,
            class: l.className,
        }));

        // Aplica o glitch
        el.classList.add('glitch');
        lines.forEach(l => {
            l.textContent = '';
            l.style.fontSize = 'clamp(1rem, 3vw, 2.5rem)';
        });

        // Erro 418: I'm a teapot — o código HTTP mais filosófico que existe
        lines[0].textContent = 'ERRO 418:';
        lines[0].style.color = '#ef4444';
        lines[1].textContent = 'PESSOA COMPLEXA DEMAIS';
        lines[1].style.color = '#ef4444';
        lines[2].textContent = 'PRA UM CURRÍCULO';
        lines[2].style.color = '#ef4444';

        // Restaura depois de 3 segundos
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


    // ════════════════════════════════
    //  3. ARTE ASCII NO CONSOLE (DevTools)
    // ════════════════════════════════

    /**
     * Printa arte ASCII com meu contato no console do DevTools.
     * Quem inspeciona o código vai encontrar isso — é um convite direto.
     */
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


    // ════════════════════════════════
    //  4. HOVER 3s NA FICHA TÉCNICA — Carimbo de Aprovação
    // ════════════════════════════════

    /** @type {ReturnType<typeof setTimeout>} Timer do hover da ficha */
    let fichaTimer;

    /**
     * Após 3 segundos de hover na ficha técnica, a card treme
     * e aparece um carimbo de "APROVADO" estilo cartório.
     *
     * A animação de tremor é injetada dinamicamente no <head>
     * pois é muito simples pra justificar um @keyframe no CSS global.
     */
    function initFichaHover() {
        const card = document.getElementById('fichaCard');
        const stamp = document.getElementById('fichaStamp');
        if (!card || !stamp) return;

        card.addEventListener('mouseenter', () => {
            fichaTimer = setTimeout(() => {
                // Tremor do card antes do carimbo aparecer
                card.style.animation = 'fichaShake 0.1s 5';

                setTimeout(() => {
                    card.style.animation = '';
                    stamp.classList.add('visible'); // CSS cuida da animação de escala

                    // Carimbo desaparece depois de 2.5s automaticamente
                    setTimeout(() => { stamp.classList.remove('visible'); }, 2500);
                }, 500);
            }, 3000); // 3 segundos de hover pra disparar
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(fichaTimer); // Cancela se o mouse sair antes dos 3s
        });

        // Injeta o keyframe de tremor dinamicamente
        const style = document.createElement('style');
        style.textContent = `
      @keyframes fichaShake {
        0%, 100% { transform: translateX(0); }
        25%       { transform: translateX(-2px) rotate(-0.5deg); }
        75%       { transform: translateX(2px)  rotate(0.5deg);  }
      }
    `;
        document.head.appendChild(style);
    }

    /**
     * Inicializa todos os easter eggs.
     * Chamado pelo main.js após o 'loaderDone'.
     */
    function init() {
        initKonami();
        initNameGlitch();
        initConsoleArt();
        initFichaHover();
    }

    // API pública
    return { init };
})();
