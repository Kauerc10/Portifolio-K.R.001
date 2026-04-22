/* ═══════════════════════════════════════════
   BREACH PROTOCOL — Final scroll event at the footer
   Distorts the 3D scene and triggers a system alert
   ═══════════════════════════════════════════ */

const BreachProtocol = (() => {
    let alertBar = null;
    let triggered = false;

    function init() {
        alertBar = document.getElementById('breachAlert');
        if (!alertBar) return;

        // Create a ScrollTrigger at the bottom of the page
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: '#contato',
            start: 'bottom 95%',
            onEnter: () => {
                if (!triggered) triggerBreach();
            },
            onLeaveBack: () => {
                resetBreach();
            }
        });
    }

    function triggerBreach() {
        triggered = true;

        // Show the alert bar with a glitch
        alertBar.classList.add('active');

        // Pulse the contact buttons
        document.querySelectorAll('.contato__link').forEach(link => {
            link.classList.add('breach-glow');
        });

        // Intensify the footer
        const footer = document.querySelector('.footer');
        if (footer) footer.classList.add('breach-active');

        // Dispatch event for three-scene to react
        window.dispatchEvent(new CustomEvent('breachProtocol', { detail: true }));
    }

    function resetBreach() {
        triggered = false;
        alertBar.classList.remove('active');

        document.querySelectorAll('.contato__link').forEach(link => {
            link.classList.remove('breach-glow');
        });

        const footer = document.querySelector('.footer');
        if (footer) footer.classList.remove('breach-active');

        window.dispatchEvent(new CustomEvent('breachProtocol', { detail: false }));
    }

    return { init };
})();
