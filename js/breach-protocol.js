/**
 * @fileoverview BREACH PROTOCOL — Evento Final de Invasão
 *
 * Quando o usuário chega ao final da página (seção #contato),
 * o sistema simula um "breach": a barra vermelha no topo aparece,
 * os links pulsam com glow e a cena 3D muda de azul pra vermelho.
 *
 * É o toque final do Tribunal — como se ao chegar no contato,
 * sua identidade fosse confirmada e o sistema "te detectasse".
 *
 * Comunicação: dispara CustomEvent 'breachProtocol' pro three-scene.js.
 *
 * @module BreachProtocol
 * @requires gsap
 * @requires ScrollTrigger (plugin GSAP)
 */

/**
 * Módulo IIFE do Breach Protocol.
 * @namespace BreachProtocol
 */
const BreachProtocol = (() => {

    /** @type {HTMLElement|null} Referência à barra de alerta no topo */
    let alertBar = null;

    /**
     * Flag pra evitar disparar o breach múltiplas vezes.
     * @type {boolean}
     */
    let triggered = false;

    /**
     * Inicializa o ScrollTrigger que observa o final da página.
     * O trigger é o fim da seção #contato (bottom 95% da viewport).
     */
    function init() {
        alertBar = document.getElementById('breachAlert');
        if (!alertBar) return;

        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: '#contato',
            start: 'bottom 95%',
            onEnter: () => { if (!triggered) triggerBreach(); },
            onLeaveBack: () => resetBreach(), // Volta ao normal se o usuário subir
        });
    }

    /**
     * Ativa o evento de "invasão".
     *
     * Ações em sequência:
     * 1. Mostra a barra vermelha de alerta no topo
     * 2. Adiciona 'breach-glow' nos links de contato (pulso de cor via CSS)
     * 3. Adiciona 'breach-active' no footer (borda vermelha)
     * 4. Despacha 'breachProtocol' pra cena 3D virar vermelha
     */
    function triggerBreach() {
        triggered = true;

        // Barra de alerta no topo
        alertBar.classList.add('active');

        // Links de contato recebem o efeito de pulso
        document.querySelectorAll('.contato__link').forEach(link => {
            link.classList.add('breach-glow');
        });

        // Footer vira vermelho sutil
        const footer = document.querySelector('.footer');
        if (footer) footer.classList.add('breach-active');

        // Avisa a cena Three.js pra alterar a cor da Anomalia pra vermelho
        window.dispatchEvent(new CustomEvent('breachProtocol', { detail: true }));
    }

    /**
     * Reverte todos os efeitos do breach.
     * Chamado quando o usuário sobe de volta e sai da área do contato.
     */
    function resetBreach() {
        triggered = false;

        alertBar.classList.remove('active');

        document.querySelectorAll('.contato__link').forEach(link => {
            link.classList.remove('breach-glow');
        });

        const footer = document.querySelector('.footer');
        if (footer) footer.classList.remove('breach-active');

        // Avisa a cena 3D pra voltar pro azul normal
        window.dispatchEvent(new CustomEvent('breachProtocol', { detail: false }));
    }

    // API pública
    return { init };
})();
