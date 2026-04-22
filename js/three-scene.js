/* ═══════════════════════════════════════════
   THREE.JS SCENE — Global fullscreen wireframe background
   Reacts to scroll depth + mouse parallax
   ═══════════════════════════════════════════ */

const HeroScene = (() => {
    let scene, camera, renderer, wireframe, particles, clock;
    let mouseX = 0, mouseY = 0;
    let canvas;
    let scrollPct = 0;
    let particlePositionsOriginal = [];
    let breachActive = false;
    let obmepActive = false;

    function init() {
        canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        clock = new THREE.Clock();
        scene = new THREE.Scene();

        // Camera — wide angle, far back
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.z = 8;

        // Renderer — transparent, fixed behind everything
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // ── PRIMARY WIREFRAME ──
        const geo = new THREE.IcosahedronGeometry(2.2, 2);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x2563eb,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
        });
        wireframe = new THREE.Mesh(geo, wireMat);
        scene.add(wireframe);

        // ── ORBITAL PARTICLES ──
        const particleCount = 350;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 2.0 + Math.random() * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        // Store originals for scroll dispersion
        particlePositionsOriginal = Array.from(positions);

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.018,
            transparent: true,
            opacity: 0.4,
        });
        particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // ── EVENTS ──
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onScroll, { passive: true });

        // Breach Protocol listener
        window.addEventListener('breachProtocol', (e) => {
            breachActive = e.detail;
            if (breachActive) {
                wireframe.material.color.setHex(0xff2222);
                wireframe.material.opacity = 0.25;
            } else {
                wireframe.material.color.setHex(0x2563eb);
            }
        });

        // OBMEP Synergy listener
        window.addEventListener('obmepSynergy', (e) => {
            obmepActive = e.detail;
            if (obmepActive) {
                wireframe.material.color.setHex(0xd4a017); // Gold
                particles.material.color.setHex(0xd4a017);
                particles.material.size = 0.025;
            } else {
                wireframe.material.color.setHex(0x2563eb); // Blue
                particles.material.color.setHex(0xffffff);
                particles.material.size = 0.018;
            }
        });

        animate();
    }

    function onMouseMove(e) {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }

    function onResize() {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onScroll() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollPct = docHeight > 0 ? window.scrollY / docHeight : 0;
    }

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // ── BASE ROTATION — slow, contemplative ──
        wireframe.rotation.x += 0.0008;
        wireframe.rotation.y += 0.0012;

        // ── MOUSE PARALLAX — subtle tilt ──
        wireframe.rotation.x += (mouseY * 0.15 - wireframe.rotation.x) * 0.008;
        wireframe.rotation.y += (mouseX * 0.15 - wireframe.rotation.y) * 0.008;

        // ── SCROLL & MOUSE REACTIONS ──
        // 1) Push the wireframe deeper into Z as user scrolls, and pan X/Y with mouse
        const targetZ = 8 + scrollPct * 12;
        camera.position.z += (targetZ - camera.position.z) * 0.04;

        // 1.5) Camera pan parallax
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.05;

        // 2) Accelerate rotation with scroll
        const scrollBoost = scrollPct * 0.004;
        wireframe.rotation.y += scrollBoost;

        // 3) Subtle scale breathing
        const breathScale = 1 + Math.sin(elapsed * 0.4) * 0.03;
        wireframe.scale.setScalar(breathScale);

        // 4) Opacity fades slightly at extremes but never disappears
        wireframe.material.opacity = 0.12 - scrollPct * 0.04;
        wireframe.material.opacity = Math.max(wireframe.material.opacity, 0.04);

        // ── PARTICLES — orbit and drift ──
        particles.rotation.y = elapsed * 0.06;
        particles.rotation.x = elapsed * 0.03;

        // ── OBMEP OVERDRIVE ──
        if (obmepActive) {
            wireframe.rotation.x += 0.01;
            wireframe.rotation.y += 0.015;
            particles.rotation.y -= 0.02;
            const wildBreath = 1 + Math.sin(elapsed * 4) * 0.06;
            wireframe.scale.setScalar(wildBreath);
        }

        // Slight scroll-based expansion of particle field
        const expandFactor = 1 + scrollPct * 0.6;
        const pos = particles.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const ox = particlePositionsOriginal[i * 3];
            const oy = particlePositionsOriginal[i * 3 + 1];
            const oz = particlePositionsOriginal[i * 3 + 2];
            pos.setX(i, ox * expandFactor);
            pos.setY(i, oy * expandFactor);
            pos.setZ(i, oz * expandFactor);
        }
        pos.needsUpdate = true;

        renderer.render(scene, camera);
    }

    return { init };
})();
