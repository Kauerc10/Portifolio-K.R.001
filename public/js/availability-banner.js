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
        ScrollTrigger.create({
            trigger: '#contato',
            start: 'bottom 95%',
            onEnter: () => banner.classList.add('active'),
            onLeaveBack: () => banner.classList.remove('active'),
        });
    }

    return { init };
})();
