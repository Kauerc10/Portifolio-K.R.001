/**
 * @fileoverview THREE-SCENE — Motor WebGL da Anomalia 3D com Suporte a Tema Claro / Escuro
 *
 * Renderiza a "Anomalia" (icosaedro wireframe) e sistema de partículas 3D.
 * Suporta alternância dinâmica de cores entre Dark Mode (estrelas/wireframe azul/branco)
 * e Light Mode (wireframe/partículas pretas/grafite).
 */

const HeroScene = (() => {

    // ── Objetos da Cena ──
    let scene, camera, renderer, wireframe, particles, clock;
    let debrisParticles;

    let debrisData = [];

    // ── Estado da Cena ──
    let mouseX = 0, mouseY = 0;
    let lastScrollY = window.scrollY || window.pageYOffset;
    let scrollVelocity = 0;
    let canvas;
    let scrollPct = 0;
    let particlePositionsOriginal = [];
    let obmepActive = false;

    let tabVisible = true;
    let lastExpandFactor = -1;
    let lastLightState = null;

    const _mouseWorld = new THREE.Vector3();
    const _dummy = new THREE.Object3D();

    let cachedDocHeight = 0;
    let cardHoverActive = false;
    let cardHoverLevel = 'none';

    // ════════════════════════════════
    //  SHADERS GLSL
    // ════════════════════════════════

    const baseVertexShader = `
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vUv      = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const baseFragmentShader = `
    uniform float uTime;
    uniform vec3  uColor;
    uniform float uGlitch;
    uniform float uIsLight;
    varying vec3  vPosition;
    varying vec2  vUv;

    void main() {
      float split = uGlitch * 0.08 + 0.005;

      float r = uColor.r + sin(vPosition.y * 10.0 + uTime * 2.0) * split;
      float g = uColor.g;
      float b = uColor.b + cos(vPosition.x * 10.0 - uTime * 2.0) * split;

      float alpha = uIsLight > 0.5 
        ? 0.45 + sin(uTime * 4.0) * 0.1
        : 0.15 + sin(uTime * 4.0) * 0.05 + (uGlitch * 0.4);

      gl_FragColor = vec4(r, g, b, alpha);
    }
  `;

    const uniforms = {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x2563eb) },
        uGlitch: { value: 0 },
        uIsLight: { value: 0 }
    };

    function isLightMode() {
        return document.documentElement.classList.contains('light') ||
               document.documentElement.getAttribute('data-theme') === 'light';
    }

    function updateThemeColors() {
        const light = isLightMode();
        if (light === lastLightState) return;
        lastLightState = light;

        uniforms.uIsLight.value = light ? 1.0 : 0.0;

        if (wireframe && wireframe.material) {
            wireframe.material.uniforms.uColor.value.set(light ? 0x0f172a : 0x2563eb);
            wireframe.material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
            wireframe.material.needsUpdate = true;
        }

        if (particles && particles.material) {
            particles.material.color.set(light ? 0x0f172a : 0xffffff);
            particles.material.opacity = light ? 0.65 : 0.4;
            particles.material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
            particles.material.needsUpdate = true;
        }

        if (debrisParticles && debrisParticles.material) {
            debrisParticles.material.color.set(light ? 0x0f172a : 0xffffff);
            debrisParticles.material.opacity = light ? 0.45 : 0.25;
            debrisParticles.material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
            debrisParticles.material.needsUpdate = true;
        }
    }

    function init() {
        canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        clock = new THREE.Clock();

        cachedDocHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight
        ) - window.innerHeight;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: dpr <= 1.25,
            powerPreference: 'high-performance',
            precision: 'mediump'
        });
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        renderer.setPixelRatio(dpr);

        // ── 1. THE ANOMALY — Icosaedro Wireframe ──
        const geo = new THREE.IcosahedronGeometry(2.2, 2);
        const wireMat = new THREE.ShaderMaterial({
            vertexShader: baseVertexShader,
            fragmentShader: baseFragmentShader,
            uniforms: uniforms,
            wireframe: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        wireframe = new THREE.Mesh(geo, wireMat);
        scene.add(wireframe);

        // ── 2. ESTRELAS DE FUNDO — Sistema de Partículas ──
        const particleCount = 350;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const r = 2.0 + Math.random() * 2.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }

        particlePositionsOriginal = Array.from(positions);

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.018,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // ── 3. DEBRIS SYSTEM ──
        const debrisCount = 120;
        const debGeo = new THREE.TetrahedronGeometry(0.04);
        const debMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending
        });

        debrisParticles = new THREE.InstancedMesh(debGeo, debMat, debrisCount);

        for (let i = 0; i < debrisCount; i++) {
            const r = 3.0 + Math.random() * 4.0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const dummy = new THREE.Object3D();
            dummy.position.set(x, y, z);
            dummy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            dummy.updateMatrix();
            debrisParticles.setMatrixAt(i, dummy.matrix);

            debrisData.push({
                x, y, z,
                baseX: x, baseY: y, baseZ: z,
                rx: Math.random() * 0.05,
                ry: Math.random() * 0.05,
                vx: 0, vy: 0, vz: 0
            });
        }
        scene.add(debrisParticles);

        updateThemeColors();

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('resize', debouncedResize);
        window.addEventListener('scroll', onScroll, { passive: true });

        document.addEventListener('visibilitychange', () => {
            tabVisible = !document.hidden;
            if (tabVisible) {
                clock.getDelta();
            }
        });

        window.addEventListener('breachProtocol', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(uniforms.uColor.value, { r: 0.9, g: 0.1, b: 0.1, duration: 0.5 });
            }
        });

        window.addEventListener('obmepSynergy', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(uniforms.uColor.value, { r: 0.83, g: 0.63, b: 0.09, duration: 1 });
            }
        });

        window.addEventListener('obmepHover', (e) => {
            cardHoverActive = !!(e.detail && e.detail.active);
            cardHoverLevel  = (e.detail && e.detail.level) || 'none';
        });

        animate();
    }

    function onMouseMove(e) {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    function onScroll() {
        const currentScrollY = window.scrollY || window.pageYOffset;
        scrollVelocity = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        if (cachedDocHeight > 0) {
            scrollPct = Math.min(Math.max(currentScrollY / cachedDocHeight, 0), 1);
        }

        const obmepEl = document.getElementById('conquistas');
        if (obmepEl) {
            const rect = obmepEl.getBoundingClientRect();
            obmepActive = (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5);
        }
    }

    let resizeTimeout;
    function debouncedResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight, false);
            cachedDocHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight
            ) - window.innerHeight;
        }, 150);
    }

    function animate() {
        requestAnimationFrame(animate);

        if (!tabVisible) return;

        updateThemeColors();

        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        uniforms.uTime.value = elapsed;

        const targetGlitch = Math.min(scrollVelocity * 0.003, 0.8);
        uniforms.uGlitch.value += (targetGlitch - uniforms.uGlitch.value) * 0.1;
        scrollVelocity *= 0.95;

        wireframe.rotation.x = elapsed * 0.08 + mouseY * 0.3;
        wireframe.rotation.y = elapsed * 0.12 + mouseX * 0.3;

        const breath = 1 + Math.sin(elapsed * 1.5) * 0.04;
        wireframe.scale.setScalar(breath);

        _mouseWorld.set(mouseX * 3, mouseY * 3, 0);
        _dummy.rotation.set(0, 0, 0);

        for (let i = 0; i < debrisData.length; i++) {
            let data = debrisData[i];

            const dx = data.x - _mouseWorld.x;
            const dy = data.y - _mouseWorld.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.001) dist = 0.001;

            if (cardHoverActive && dist < 6.0) {
                const force = (6.0 - dist) * 0.015;
                data.vx -= (dx / dist) * force;
                data.vy -= (dy / dist) * force;

            } else if (!cardHoverActive && dist < 2.5) {
                const force = (2.5 - dist) * 0.05;
                data.vx += (dx / dist) * force;
                data.vy += (dy / dist) * force;
            }

            data.vx += -data.y * 0.0005;
            data.vy += data.x * 0.0005;

            data.vx += (data.baseX - data.x) * 0.002;
            data.vy += (data.baseY - data.y) * 0.002;
            data.vz += (data.baseZ - data.z) * 0.002;

            data.vx *= 0.94;
            data.vy *= 0.94;
            data.vz *= 0.94;

            data.x += data.vx;
            data.y += data.vy;
            data.z += data.vz;

            _dummy.position.set(data.x, data.y, data.z);
            _dummy.rotation.x += data.rx + data.vx * 2;
            _dummy.rotation.y += data.ry + data.vy * 2;
            _dummy.updateMatrix();
            debrisParticles.setMatrixAt(i, _dummy.matrix);
        }
        debrisParticles.instanceMatrix.needsUpdate = true;

        particles.rotation.y = elapsed * 0.06;
        particles.rotation.x = elapsed * 0.03;

        const expandFactor = 1 + scrollPct * 0.6;
        if (Math.abs(expandFactor - lastExpandFactor) > 0.001) {
            const pos = particles.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                pos.setX(i, particlePositionsOriginal[i * 3] * expandFactor);
                pos.setY(i, particlePositionsOriginal[i * 3 + 1] * expandFactor);
                pos.setZ(i, particlePositionsOriginal[i * 3 + 2] * expandFactor);
            }
            pos.needsUpdate = true;
            lastExpandFactor = expandFactor;
        }

        if (obmepActive) {
            wireframe.rotation.x += 0.015;
            wireframe.rotation.y += 0.02;
            particles.rotation.y -= 0.03;

            const wildBreath = 1 + Math.sin(elapsed * 4) * 0.08;
            wireframe.scale.setScalar(wildBreath);
        }

        renderer.render(scene, camera);
    }

    return { init };
})();
