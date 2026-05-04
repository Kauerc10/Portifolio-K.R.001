/**
 * @fileoverview CURSOR — Cursor Personalizado com Rastro e Efeito Magnético
 *
 * Substitui o cursor padrão por um sistema visual composto de:
 * - Um ponto central que segue o mouse em tempo real
 * - Um anel externo que segue com lag suave (lerp 12%)
 * - Um canvas de rastro dourado que desenha a trajetória
 * - Uma label de contexto que aparece em elementos interativos
 *
 * Em mobile (< 768px) tudo é desativado automaticamente
 * pois touch não tem coordenadas de mouse.
 *
 * @module Cursor
 */

/**
 * Módulo IIFE do Cursor — mantém o estado interno privado.
 * @namespace Cursor
 */
const Cursor = (() => {

    // ── Referências do DOM ──
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursorLabel');

    // ── Estado da posição ──
    /** @type {number} Posição X alvo (mouse real) */
    let mx = 0, my = 0;

    /** @type {number} Posição X atual do anel (com lag) */
    let cx = 0, cy = 0;

    /** @type {number} Posição X atual do ponto (imediata) */
    let dx = 0, dy = 0;

    /** @type {boolean} Se é desktop (> 768px) */
    let isDesktop = window.innerWidth > 768;

    // ── Sistema de Rastro ──
    const trailCanvas = document.getElementById('cursorTrail');
    let trailCtx = null;

    /**
     * @typedef {Object} TrailPoint
     * @property {number} x    - Posição X do ponto de rastro
     * @property {number} y    - Posição Y do ponto de rastro
     * @property {number} life - Vida restante do ponto (1.0 a 0.0)
     */

    /** @type {TrailPoint[]} Buffer circular dos pontos do rastro */
    const trail = [];

    /** @constant {number} Máximo de pontos no rastro simultâneos */
    const TRAIL_LENGTH = 18;

    /**
     * Inicializa o cursor custom.
     * Se for mobile, esconde o cursor e para a execução.
     * Caso contrário: inicia o canvas de rastro, registra os eventos
     * e começa o loop de animação via requestAnimationFrame.
     */
    function init() {
        if (!isDesktop) {
            cursor.style.display = 'none';
            return;
        }

        // Inicializa o canvas de rastro
        if (trailCanvas) {
            trailCtx = trailCanvas.getContext('2d');
            resizeTrailCanvas();
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        bindMagneticElements(); // Registra hover nos elementos interativos

        requestAnimationFrame(tick); // Inicia o loop de renderização

        // Recalcula no resize
        window.addEventListener('resize', () => {
            isDesktop = window.innerWidth > 768;
            cursor.style.display = isDesktop ? '' : 'none';
            if (trailCtx) resizeTrailCanvas();
        });
    }

    /**
     * Ajusta o canvas de rastro pra cobrir a janela inteira.
     * Chamado no init e no resize da janela.
     */
    function resizeTrailCanvas() {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
    }

    /**
     * Atualiza as coordenadas alvo quando o mouse se move.
     * Também adiciona um novo ponto ao buffer de rastro.
     * @param {MouseEvent} e - Evento de movimento do mouse
     */
    function onMouseMove(e) {
        mx = e.clientX;
        my = e.clientY;
        dx = mx;
        dy = my;

        // Adiciona ponto ao rastro e limita o tamanho do buffer
        trail.push({ x: mx, y: my, life: 1.0 });
        if (trail.length > TRAIL_LENGTH) trail.shift();
    }

    /**
     * Adiciona a classe 'click' no cursor por 400ms para o efeito visual.
     */
    function onMouseDown() {
        cursor.classList.add('click');
        setTimeout(() => cursor.classList.remove('click'), 400);
    }

    /** Placeholder — mantido pra possível uso futuro */
    function onMouseUp() { }

    /**
     * Loop principal de animação do cursor (roda a ~60fps).
     *
     * Usa lerp (interpolação linear) pra mover o anel suavemente
     * em direção ao mouse real — o fator 0.12 define o "atraso".
     *
     * O ponto central fica na posição exata do mouse.
     * O rastro é desenhado no canvas com fade por `life`.
     */
    function tick() {
        // Interpolação suave do anel (lerp 12%)
        cx += (mx - cx) * 0.12;
        cy += (my - cy) * 0.12;

        // Move o wrapper do cursor (com lag)
        cursor.style.transform = `translate(${cx}px, ${cy}px)`;

        // O ponto central compensa o lag do wrapper ficando na posição exata
        const dot = cursor.querySelector('.cursor__dot');
        dot.style.transform = `translate(${dx - cx}px, ${dy - cy}px)`;

        // Renderização do rastro no canvas
        if (trailCtx) {
            trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

            // Diminui a vida de cada ponto
            for (let i = 0; i < trail.length; i++) {
                trail[i].life -= 0.045;
            }

            // Remove pontos mortos do início do array
            while (trail.length > 0 && trail[0].life <= 0) trail.shift();

            // Desenha a linha de rastro se tiver pontos suficientes
            if (trail.length > 1) {
                trailCtx.beginPath();
                trailCtx.moveTo(trail[0].x, trail[0].y);

                for (let i = 1; i < trail.length; i++) {
                    trailCtx.lineTo(trail[i].x, trail[i].y);
                }

                trailCtx.strokeStyle = `rgba(212, 160, 23, 0.12)`; // Dourado sutil
                trailCtx.lineWidth = 1;
                trailCtx.stroke();
            }
        }

        requestAnimationFrame(tick);
    }

    /**
     * Registra listeners de hover nos elementos interativos.
     * Quando o cursor entra num desses elementos:
     * - O anel fica maior e muda de cor (via classe CSS 'hover')
     * - A label exibe o texto do atributo data-cursor do elemento
     *
     * @example
     * // No HTML, defina o texto da label assim:
     * <a href="#" data-cursor="VER PROJETO">...</a>
     */
    function bindMagneticElements() {
        const targets = document.querySelectorAll(
            '.magnetic, .btn, a, .chip, .formacao__card, .nav__link, .evidence__folder'
        );

        targets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                label.textContent = el.getAttribute('data-cursor') || '';
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                label.textContent = '';
            });
        });
    }

    // API pública
    return { init };
})();
