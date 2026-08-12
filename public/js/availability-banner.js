/**
 * Reveals the portfolio availability banner near the end of the document.
 * Uses the real scroll position instead of cached ScrollTrigger geometry so
 * content that changes height after load (for example GitHub stats) cannot
 * leave the final notice unreachable.
 */
const AvailabilityBanner = (() => {
    let banner = null;
    let active = false;
    let ticking = false;

    function init() {
        banner = document.getElementById('availabilityBanner');
        if (!banner) return;

        const setActive = (nextActive) => {
            if (nextActive === active) return;

            active = nextActive;
            banner.classList.toggle('active', active);
            window.dispatchEvent(new CustomEvent('availabilityVisual', { detail: active }));
        };

        const update = () => {
            const root = document.documentElement;
            const scrollBottom = window.scrollY + window.innerHeight;
            const remaining = Math.max(0, root.scrollHeight - scrollBottom);
            const revealDistance = Math.max(120, window.innerHeight * 0.12);

            setActive(remaining <= revealDistance);
            ticking = false;
        };

        const requestUpdate = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate, { passive: true });
        window.addEventListener('load', requestUpdate, { once: true });

        // Covers restored scroll positions and pages whose async content has
        // already settled before this module initializes.
        requestUpdate();
    }

    return { init };
})();
