/**
 * Reveals the portfolio availability banner when the contact section ends.
 * The banner resets when the visitor scrolls back into the page.
 */
const AvailabilityBanner = (() => {
    let banner = null;

    function init() {
        banner = document.getElementById('availabilityBanner');
        if (!banner || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);
        const setActive = (active) => {
            banner.classList.toggle('active', active);
            window.dispatchEvent(new CustomEvent('availabilityVisual', { detail: active }));
        };
        ScrollTrigger.create({
            trigger: '#contato',
            start: 'bottom 95%',
            onEnter: () => setActive(true),
            onLeaveBack: () => setActive(false),
        });
    }

    return { init };
})();
