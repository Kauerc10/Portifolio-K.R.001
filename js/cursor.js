/* ═══════════════════════════════════════════
   CUSTOM CURSOR — HUD Tactical with coordinates & trail
   ═══════════════════════════════════════════ */

const Cursor = (() => {
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursorLabel');
    let mx = 0, my = 0;
    let cx = 0, cy = 0;
    let dx = 0, dy = 0;
    let isDesktop = window.innerWidth > 768;

    // Trail system
    const trailCanvas = document.getElementById('cursorTrail');
    let trailCtx = null;
    const trail = [];
    const TRAIL_LENGTH = 18;

    function init() {
        if (!isDesktop) {
            cursor.style.display = 'none';
            return;
        }

        // Init trail canvas
        if (trailCanvas) {
            trailCtx = trailCanvas.getContext('2d');
            resizeTrailCanvas();
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        bindMagneticElements();
        requestAnimationFrame(tick);

        window.addEventListener('resize', () => {
            isDesktop = window.innerWidth > 768;
            cursor.style.display = isDesktop ? '' : 'none';
            if (trailCtx) resizeTrailCanvas();
        });
    }

    function resizeTrailCanvas() {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
    }

    function onMouseMove(e) {
        mx = e.clientX;
        my = e.clientY;
        dx = mx;
        dy = my;

        // Push to trail
        trail.push({ x: mx, y: my, life: 1.0 });
        if (trail.length > TRAIL_LENGTH) trail.shift();
    }

    function onMouseDown() {
        cursor.classList.add('click');
        setTimeout(() => cursor.classList.remove('click'), 400);
    }

    function onMouseUp() { }

    function tick() {
        cx += (mx - cx) * 0.12;
        cy += (my - cy) * 0.12;

        cursor.style.transform = `translate(${cx}px, ${cy}px)`;
        const dot = cursor.querySelector('.cursor__dot');
        dot.style.transform = `translate(${dx - cx}px, ${dy - cy}px)`;

        // Draw trail
        if (trailCtx) {
            trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

            for (let i = 0; i < trail.length; i++) {
                trail[i].life -= 0.045;
            }

            // Remove dead points
            while (trail.length > 0 && trail[0].life <= 0) trail.shift();

            if (trail.length > 1) {
                trailCtx.beginPath();
                trailCtx.moveTo(trail[0].x, trail[0].y);

                for (let i = 1; i < trail.length; i++) {
                    trailCtx.lineTo(trail[i].x, trail[i].y);
                }

                trailCtx.strokeStyle = `rgba(212, 160, 23, 0.12)`;
                trailCtx.lineWidth = 1;
                trailCtx.stroke();
            }
        }

        requestAnimationFrame(tick);
    }

    function bindMagneticElements() {
        const targets = document.querySelectorAll('.magnetic, .btn, a, .chip, .formacao__card, .nav__link, .evidence__folder');

        targets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                const cursorText = el.getAttribute('data-cursor') || '';
                label.textContent = cursorText;
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                label.textContent = '';
            });
        });
    }

    return { init };
})();
