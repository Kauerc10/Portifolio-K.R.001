/* ═══════════════════════════════════════════
   THREE.JS SCENE — The "Anomaly" WebGL Engine
   Reacts to scroll depth, mouse repulsion & velocity distortion
   ═══════════════════════════════════════════ */

const HeroScene = (() => {
    let scene, camera, renderer, wireframe, particles, clock;
    let debrisParticles;
    let debrisData = [];

    let mouseX = 0, mouseY = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let canvas;
    let scrollPct = 0;
    let particlePositionsOriginal = [];
    let breachActive = false;
    let obmepActive = false;

    // OBMEP Magnetic Hover — scoped at module level so animate() can access
    let cardHoverActive = false;
    let cardHoverLevel = 'none';

    // ── RAW GLSL SHADERS ──
    const baseVertexShader = `
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const baseFragmentShader = `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uGlitch;
        varying vec3 vPosition;
        varying vec2 vUv;

        void main() {
            float split = uGlitch * 0.08 + 0.005; // Base split + velocity based split
            
            // Faked RGB Chromatic Aberration
            float r = uColor.r + sin(vPosition.y * 10.0 + uTime * 2.0) * split;
            float g = uColor.g;
            float b = uColor.b + cos(vPosition.x * 10.0 - uTime * 2.0) * split;
            
            float alpha = 0.15 + sin(uTime * 4.0) * 0.05 + (uGlitch * 0.4);
            
            gl_FragColor = vec4(r, g, b, alpha);
        }
    `;

    const uniforms = {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x2563eb) },
        uGlitch: { value: 0 }
    };

    function init() {
        canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        clock = new THREE.Clock();
        scene = new THREE.Scene();

        // Camera — wide angle, far back
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.z = 8;

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // ── 1. THE ANOMALY (TESSERACT) ──
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

        // ── 2. BACKGROUND STAR PARTICLES ──
        const particleCount = 350;
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
            const r = 2.0 + Math.random() * 2.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
            sizes[i] = Math.random();
        }
        particlePositionsOriginal = Array.from(positions);

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute('aScale', new THREE.BufferAttribute(sizes, 1));
        const particleMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.015,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // ── 3. DEBRIS SYSTEM (Instanced Geometry for Repulsion) ──
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
            // Distribute around the anomaly
            const r = 3.0 + Math.random() * 4.0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const dummy = new THREE.Object3D();
            dummy.position.set(x, y, z);
            dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            dummy.updateMatrix();
            debrisParticles.setMatrixAt(i, dummy.matrix);

            debrisData.push({
                x, y, z,
                rx: Math.random() * 0.05,
                ry: Math.random() * 0.05,
                baseX: x, baseY: y, baseZ: z,
                vx: 0, vy: 0, vz: 0
            });
        }
        scene.add(debrisParticles);

        // ── EVENTS ──
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onScroll, { passive: true });

        // Breach Protocol listener
        window.addEventListener('breachProtocol', (e) => {
            breachActive = e.detail;
            if (breachActive) {
                gsap.to(uniforms.uColor.value, { r: 1, g: 0.1, b: 0.1, duration: 0.5 });
            } else {
                gsap.to(uniforms.uColor.value, { r: 0.145, g: 0.388, b: 0.921, duration: 0.5 }); // 0x2563eb
            }
        });

        let spinConfig = { val: 0, _last: 0 };
        function updateSpin() {
            wireframe.rotation.y += (spinConfig.val - spinConfig._last);
            wireframe.rotation.x += (spinConfig.val - spinConfig._last) * 0.5;
            spinConfig._last = spinConfig.val;
        }

        // OBMEP Hover Magnetic Attraction (Phase 8)

        window.addEventListener('obmepHover', (e) => {
            cardHoverActive = e.detail.active;
            if (cardHoverActive) {
                cardHoverLevel = e.detail.level;
                if (cardHoverLevel === 'prata') {
                    gsap.to(uniforms.uColor.value, { r: 0.58, g: 0.64, b: 0.72, duration: 0.5 }); // Ice Silver
                } else if (cardHoverLevel === 'bronze') {
                    gsap.to(uniforms.uColor.value, { r: 0.83, g: 0.627, b: 0.09, duration: 0.5 }); // Oxidized Bronze
                } else {
                    gsap.to(uniforms.uColor.value, { r: 0.06, g: 0.72, b: 0.51, duration: 0.5 }); // Emerald Neon
                }
            } else {
                if (obmepActive) {
                    gsap.to(uniforms.uColor.value, { r: 0.83, g: 0.627, b: 0.09, duration: 0.5 }); // Default Gold
                } else {
                    gsap.to(uniforms.uColor.value, { r: 0.145, g: 0.388, b: 0.921, duration: 0.5 }); // Ghost Blue
                }
            }
        });

        // OBMEP Synergy listener
        window.addEventListener('obmepSynergy', (e) => {
            obmepActive = e.detail;
            if (obmepActive) {
                gsap.to(uniforms.uColor.value, { r: 0.83, g: 0.627, b: 0.09, duration: 0.8 }); // Gold
                gsap.to(particles.material.color, { r: 0.83, g: 0.627, b: 0.09, duration: 0.8 });
                particles.material.size = 0.025;

                // Rapid Spin trigger forward
                spinConfig = { val: 0, _last: 0 };
                gsap.to(spinConfig, {
                    val: Math.PI * 2, duration: 1.5, ease: "power4.out", onUpdate: updateSpin
                });
            } else {
                gsap.to(uniforms.uColor.value, { r: 0.145, g: 0.388, b: 0.921, duration: 0.8 }); // Blue
                gsap.to(particles.material.color, { r: 1, g: 1, b: 1, duration: 0.8 });
                particles.material.size = 0.015;

                // Rapid Spin trigger backward
                spinConfig = { val: 0, _last: 0 };
                gsap.to(spinConfig, {
                    val: -Math.PI * 2, duration: 1.5, ease: "power4.out", onUpdate: updateSpin
                });
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

        // Calculate scroll velocity for Glitch
        const delta = Math.abs(window.scrollY - lastScrollY);
        scrollVelocity = delta;
        lastScrollY = window.scrollY;
    }

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Update uniforms
        uniforms.uTime.value = elapsed;

        // Glitch physics (decays over time, spikes on scroll velocity)
        scrollVelocity *= 0.9; // Friction
        uniforms.uGlitch.value = Math.min(scrollVelocity * 0.02, 1.0);

        // ── ANOMALY ROTATION ──
        wireframe.rotation.x += 0.0008;
        wireframe.rotation.y += 0.0012;

        // ── MOUSE PARALLAX TILT ──
        wireframe.rotation.x += (mouseY * 0.15 - wireframe.rotation.x) * 0.008;
        wireframe.rotation.y += (mouseX * 0.15 - wireframe.rotation.y) * 0.008;

        // ── SCROLL CAMERA PUSH ──
        const targetZ = 8 + scrollPct * 12;
        camera.position.z += (targetZ - camera.position.z) * 0.04;

        // Camera pan parallax
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.05;

        // Accelerate rotation with scroll
        wireframe.rotation.y += scrollPct * 0.004;

        // Subtle scale breathing
        const breathScale = 1 + Math.sin(elapsed * 0.4) * 0.03;
        wireframe.scale.setScalar(breathScale);

        // ── DEBRIS REPULSION PHYSICS ──
        // Approximate mouse world position on a Z plane
        const mouseWorld = new THREE.Vector3(mouseX * 8, -mouseY * 8, camera.position.z - 6);
        const dummy = new THREE.Object3D();

        for (let i = 0; i < debrisData.length; i++) {
            let data = debrisData[i];

            // Interaction distances
            let dx = data.x - mouseWorld.x;
            let dy = data.y - mouseWorld.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 0.001) dist = 0.001; // Fix NaN Physics Explosion

            // Interaction physics
            if (cardHoverActive && dist < 6.0) {
                // Magnetic Attraction (Phase 8)
                let force = (6.0 - dist) * 0.015;
                data.vx -= (dx / dist) * force;
                data.vy -= (dy / dist) * force;
            } else if (!cardHoverActive && dist < 2.5) {
                // Normal Repulsion explosion
                let force = (2.5 - dist) * 0.05;
                data.vx += (dx / dist) * force;
                data.vy += (dy / dist) * force;
            }

            // Orbit anomaly slowly
            data.vx += -data.y * 0.0005;
            data.vy += data.x * 0.0005;

            // Return to orbital base sphere
            data.vx += (data.baseX - data.x) * 0.002;
            data.vy += (data.baseY - data.y) * 0.002;
            data.vz += (data.baseZ - data.z) * 0.002;

            // Friction
            data.vx *= 0.94;
            data.vy *= 0.94;
            data.vz *= 0.94;

            data.x += data.vx;
            data.y += data.vy;
            data.z += data.vz;

            dummy.position.set(data.x, data.y, data.z);
            dummy.rotation.x += data.rx + data.vx * 2;
            dummy.rotation.y += data.ry + data.vy * 2;
            dummy.updateMatrix();
            debrisParticles.setMatrixAt(i, dummy.matrix);
        }
        debrisParticles.instanceMatrix.needsUpdate = true;

        // ── BACKGROUND PARTICLES ──
        particles.rotation.y = elapsed * 0.06;
        particles.rotation.x = elapsed * 0.03;

        const expandFactor = 1 + scrollPct * 0.6;
        const pos = particles.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            pos.setX(i, particlePositionsOriginal[i * 3] * expandFactor);
            pos.setY(i, particlePositionsOriginal[i * 3 + 1] * expandFactor);
            pos.setZ(i, particlePositionsOriginal[i * 3 + 2] * expandFactor);
        }
        pos.needsUpdate = true;

        // ── OBMEP OVERDRIVE ──
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
