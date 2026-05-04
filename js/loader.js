/**
 * @fileoverview LOADER — Tela de Introdução do Tribunal
 *
 * Responsável pela sequência de carregamento inicial:
 * anima as três barras de progresso em cascata,
 * exibe a dica de scroll, e então abre as cortinas
 * laterais revelando o site por baixo.
 *
 * Ao finalizar, dispara o CustomEvent 'loaderDone'
 * que os demais módulos usam como sinal pra começar.
 *
 * @module Loader
 */

/**
 * Módulo IIFE do Loader — encapsulado pra não poluir o escopo global.
 * @namespace Loader
 */
const Loader = (() => {

  // ── Referências do DOM ──
  const loader = document.getElementById('loader');
  const hint = document.querySelector('.loader__hint');
  const curtainL = document.querySelector('.loader__curtain--left');
  const curtainR = document.querySelector('.loader__curtain--right');

  /**
   * Configuração das três barras de progresso.
   * Cada barra tem seu elemento de preenchimento, o texto percentual
   * e o valor alvo — definidos diretamente no HTML via data-target.
   *
   * @type {Array<{fill: HTMLElement, pct: HTMLElement, target: number}>}
   */
  const bars = [
    { fill: document.getElementById('bar1'), pct: document.getElementById('pct1'), target: 74 },
    { fill: document.getElementById('bar2'), pct: document.getElementById('pct2'), target: 82 },
    { fill: document.getElementById('bar3'), pct: document.getElementById('pct3'), target: 100 },
  ];

  // Controle de estado interno
  let done = false;

  /**
   * Anima uma barra de progresso do zero até o valor alvo.
   * Usa setInterval com 30 steps pra simular uma animação fluida
   * sem depender de GSAP (o módulo Loader carrega antes de tudo).
   *
   * @param {number}   idx      - Índice da barra no array `bars`
   * @param {Function} callback - Função chamada ao terminar a animação
   */
  function animateBar(idx, callback) {
    const bar = bars[idx];
    if (!bar) { callback(); return; }

    const duration = 600 + idx * 200; // Cada barra é um pouco mais lenta
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const val = Math.min(Math.round((bar.target / steps) * step), bar.target);

      bar.fill.style.width = (val / bar.target * 100) + '%';
      bar.pct.textContent = val + '%';

      if (step >= steps) {
        clearInterval(interval);
        bar.fill.style.width = '100%';
        bar.pct.textContent = bar.target + '%';
        setTimeout(callback, 200); // Pequena pausa entre barras
      }
    }, stepTime);
  }

  /**
   * Dispara a sequência de animação das três barras em cascata.
   * Barra 1 → termina → Barra 2 → termina → Barra 3 → revela o site.
   */
  function runSequence() {
    animateBar(0, () => {
      animateBar(1, () => {
        animateBar(2, () => {
          hint.classList.add('visible'); // Mostra "↓ role para iniciar"
          setTimeout(reveal, 800);
        });
      });
    });
  }

  /**
   * Abre as cortinas e revela o site por baixo.
   *
   * Funciona em três etapas:
   * 1. As cortinas deslizam pra fora (translateX)
   * 2. O conteúdo do loader faz fade out
   * 3. O loader é removido do fluxo e o evento 'loaderDone' é disparado
   *
   * A guarda `done` previne chamadas duplicadas caso o usuário
   * interaja rápido demais durante o carregamento.
   */
  function reveal() {
    if (done) return;
    done = true;

    // Cortinas deslizando pra fora
    curtainL.style.transition = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
    curtainR.style.transition = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
    curtainL.style.transform = 'translateX(-100%)';
    curtainR.style.transform = 'translateX(100%)';

    // Fade no conteúdo central
    const content = document.querySelector('.loader__content');
    content.style.transition = 'opacity 0.4s';
    content.style.opacity = '0';

    setTimeout(() => {
      // Desabilita o loader completamente
      loader.style.pointerEvents = 'none';
      loader.style.transition = 'opacity 0.3s';
      loader.style.opacity = '0';

      // Avisa todos os outros módulos que podem começar
      document.dispatchEvent(new CustomEvent('loaderDone'));

      // Remove do DOM depois que o fade termina
      setTimeout(() => { loader.style.display = 'none'; }, 400);
    }, 800);
  }

  /**
   * Inicializa o loader.
   *
   * Trava o scroll durante a animação e libera quando terminar.
   * O timeout de 500ms é pra garantir que o DOM está pronto
   * antes de começar a animar.
   */
  function init() {
    document.body.style.overflow = 'hidden'; // Trava o scroll

    setTimeout(runSequence, 500);

    // Libera o scroll quando o loader terminar
    document.addEventListener('loaderDone', () => {
      document.body.style.overflow = '';
    });
  }

  // API pública do módulo — só expõe o init()
  return { init };
})();
