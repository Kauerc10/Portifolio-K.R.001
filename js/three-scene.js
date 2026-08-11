/**
 * @fileoverview THREE-SCENE — Motor WebGL da Anomalia 3D
 *
 * O elemento visual mais avançado do portfólio: uma cena Three.js
 * que renderiza a "Anomalia" — um icosaedro wireframe com shaders
 * GLSL customizados, partículas de fundo e um sistema de física
 * de debris interativo com o mouse.
 *
 * O que acontece na tela:
 * - Um icosaedro wireframe (The Anomaly) gira suavemente e respira
 * - 350 partículas em espiral ao redor dele rotacionam independente
 * - 120 fragmentos de debris flutuam com física de repulsão/atração
 * - Shaders calculam aberração cromática (RGB split) baseada na velocidade de scroll
 * - A cor de tudo muda dinamicamente conforme você rola e interage
 *
 * Sistema de eventos (CustomEvents no window):
 * - 'breachProtocol'      → tinge a Anomalia de vermelho
 * - 'obmepSynergy'        → tinge de dourado + acelera rotação
 *
 * @module HeroScene
 * @requires three.js (r128+)
 * @requires gsap
 */

/**
 * Módulo IIFE da cena Three.js.
 * @namespace HeroScene
 */
const HeroScene = (() => {

    // ── Objetos da Cena ──
    let scene, camera, renderer, wireframe, particles, clock;
    let debrisParticles;

    // ── Estado de Física dos Debris ──
    /**
     * @typedef {Object} DebrisData
     * @property {number} x       - Posição X atual
     * @property {number} y       - Posição Y atual
     * @property {number} z       - Posição Z atual
     * @property {number} baseX   - Posição X de origem (pra forço de retorno)
     * @property {number} baseY   - Posição Y de origem
     * @property {number} baseZ   - Posição Z de origem
     * @property {number} vx      - Velocidade X (física)
     * @property {number} vy      - Velocidade Y (física)
     * @property {number} vz      - Velocidade Z (física)
     * @property {number} rx      - Velocidade de rotação X
     * @property {number} ry      - Velocidade de rotação Y
     */

    /** @type {DebrisData[]} Buffer de física dos 120 fragmentos */
    let debrisData = [];

    // ── Estado da Cena ──
    let mouseX = 0, mouseY = 0;       // Posição do mouse normalizada (-1 a 1)
    let lastScrollY = window.scrollY || window.pageYOffset; // Último Y de scroll pra calcular velocidade
    let scrollVelocity = 0;           // Velocidade de scroll (usada no glitch)
    let canvas;                       // Referência ao canvas DOM
    let scrollPct = 0;                // Progresso de scroll (0 a 1)
    let particlePositionsOriginal = []; // Posições base das estrelas (pra expand)
    let obmepActive = false;         // Se estamos na seção OBMEP

    // ── Flags de Pause (performance) ──
    // NOTA: o canvas #heroCanvas é um fundo FIXED global (classe .global-3d-bg),
    // visível em todas as seções — não limitado ao #hero. Portanto NÃO usamos
    // IntersectionObserver no #hero (congelaria o fundo visível ao rolar = flicker).
    // Só pausamos quando a aba inteira some (visibilitychange), resetando o clock
    // no retorno pra evitar saltos na física acumulada.
    let tabVisible = true;
    let lastExpandFactor = -1;        // Último expandFactor aplicado (pra só reescrever posições no scroll)

    // ── Objetos reutilizáveis (evitam GC pressure no hot loop) ──
    const _mouseWorld = new THREE.Vector3();
    const _dummy = new THREE.Object3D();

    // ── docHeight em cache (atualizado no resize) ──
    let cachedDocHeight = 0;

    // ════════════════════════════════
    //  SHADERS GLSL
    // ════════════════════════════════

    /**
     * Vertex Shader base.
     * Passa posição e UV pra o fragment shader via varyings.
     * @type {string}
     */
    const baseVertexShader = `
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vUv      = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    /**
     * Fragment Shader customizado com aberração cromática (RGB split).
     *
     * O `uGlitch` uniform controla a intensidade do split:
     * - Scroll lento  → split mínimo (0.005, quase imperceptível)
     * - Scroll rápido → split máximo (até 0.085, visível nos fios do wireframe)
     *
     * O canal R oscila com seno baseado na posição Y,
     * e o canal B com cosseno baseado na posição X,
     * criando o efeito visual de aberração cromática fakeado.
     * @type {string}
     */
    const baseFragmentShader = `
    uniform float uTime;
    uniform vec3  uColor;
    uniform float uGlitch;
    varying vec3  vPosition;
    varying vec2  vUv;

    void main() {
      float split = uGlitch * 0.08 + 0.005; // split = velocidade + base mínima

      // Aberração cromática: canais R e B se deslocam em direções opostas
      float r = uColor.r + sin(vPosition.y  * 10.0 + uTime * 2.0) * split;
      float g = uColor.g; // Canal G não se move
      float b = uColor.b + cos(vPosition.x  * 10.0 - uTime * 2.0) * split;

      // Alpha pulsa levemente + sobe com o glitch
      float alpha = 0.15 + sin(uTime * 4.0) * 0.05 + (uGlitch * 0.4);

      gl_FragColor = vec4(r, g, b, alpha);
    }
  `;

    /**
     * Uniforms passados ao shader.
     * São atualizados a cada frame no loop animate().
     * @type {Object}
     */
    const uniforms = {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x2563eb) }, // Azul padrão
        uGlitch: { value: 0 }
    };

    // ════════════════════════════════
    //  INICIALIZAÇÃO
    // ════════════════════════════════

    /**
     * Configura a cena completa: camera, renderer, geometrias e listeners.
     * Se não encontrar o canvas #heroCanvas, para silenciosamente.
     */
    function init() {
        canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        // Usuários com prefers-reduced-motion: renderiza UM frame estático
        // e não inicia o loop de animação (sem rotação, física ou shader animado).
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        clock = new THREE.Clock();
        scene = new THREE.Scene();

        // ── Câmera perspectiva — ângulo amplo, distante ──
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.z = 8;

        // ── Renderer WebGL de alta performance otimizado ──
        const isMobile = window.innerWidth <= 768;
        const maxDpr = isMobile ? 1.0 : 1.25; // 1.25x no desktop economiza 60%+ de GPU sem perda visual perceptível
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: (window.devicePixelRatio || 1) <= 1.25, // MSAA desligado se densidade de pixels for alta
            powerPreference: 'high-performance',
            precision: 'mediump'
        });
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        renderer.setPixelRatio(dpr);

        // ── 1. THE ANOMALY — Icosaedro Wireframe ──
        const geo = new THREE.IcosahedronGeometry(2.2, 2); // Subdivide 2x pra mais faces
        const wireMat = new THREE.ShaderMaterial({
            vertexShader: baseVertexShader,
            fragmentShader: baseFragmentShader,
            uniforms: uniforms,
            wireframe: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending // Cores se somam — dá o brilho
        });
        wireframe = new THREE.Mesh(geo, wireMat);
        scene.add(wireframe);

        // ── 2. ESTRELAS DE FUNDO — Sistema de Partículas ──
        const particleCount = 350;
        const positions = new Float32Array(particleCount * 3);

        // Distribui as partículas em esfera ao redor da Anomalia
        for (let i = 0; i < particleCount; i++) {
            const r = 2.0 + Math.random() * 2.5;     // Raio entre 2 e 4.5
            const theta = Math.random() * Math.PI * 2;   // Ângulo horizontal
            const phi = Math.acos(2 * Math.random() - 1); // Ângulo vertical

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }

        // Salva as posições originais pra o efeito de expansão no scroll
        particlePositionsOriginal = Array.from(positions);

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.015,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // ── 3. DEBRIS SYSTEM — 120 Fragmentos com Física ──
        const debrisCount = 120;
        const debGeo = new THREE.TetrahedronGeometry(0.04); // Tetraedros pequenos
        const debMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending
        });

        debrisParticles = new THREE.InstancedMesh(debGeo, debMat, debrisCount);

        for (let i = 0; i < debrisCount; i++) {
            // Posição aleatória em esfera maior (3 a 7 de raio)
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

            // Dados de física de cada debris
            debrisData.push({
                x, y, z,
                baseX: x, baseY: y, baseZ: z, // Posição orbital base
                rx: Math.random() * 0.05,     // Velocidade de spin X
                ry: Math.random() * 0.05,     // Velocidade de spin Y
                vx: 0, vy: 0, vz: 0          // Velocidade linear (começa em repouso)
            });
        }
        scene.add(debrisParticles);

        // ── Registra todos os event listeners ──
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('resize', debouncedResize);
        window.addEventListener('scroll', onScroll, { passive: true });

        // Pause/resume quando a aba some (economia de bateria/CPU).
        // No retorno, getElapsedTime() abaixo recalibra o clock automaticamente,
        // evitando saltos na física (problema que getDelta() teria).
        document.addEventListener('visibilitychange', () => {
            tabVisible = document.visibilityState === 'visible';
        });

        // Cache inicial da altura do documento (recalculada no resize)
        cachedDocHeight = document.documentElement.scrollHeight - window.innerHeight;

        registerCustomEvents();

        if (reducedMotion) {
            // Render estático único — sem loop, sem física, sem shader animado
            renderer.render(scene, camera);
        } else {
            animate(); // Inicia o loop de renderização
        }
    }

    /**
     * Registra os CustomEvents que conectam outros módulos à cena 3D.
     * Toda a comunicação é por eventos — sem acoplamento direto.
     */
    function registerCustomEvents() {

        // Breach Protocol → tinge a Anomalia de vermelho
        window.addEventListener('breachProtocol', (e) => {
            if (e.detail) {
                gsap.to(uniforms.uColor.value, { r: 1, g: 0.1, b: 0.1, duration: 0.5 });
            } else {
                gsap.to(uniforms.uColor.value, { r: 0.145, g: 0.388, b: 0.921, duration: 0.5 });
            }
        });

        // Entrando/saindo da seção OBMEP, apenas a paleta muda. Evitamos giro
        // adicional e física especial, que disputavam a GPU com o scroll.
        window.addEventListener('obmepSynergy', (e) => {
            obmepActive = e.detail;

            if (obmepActive) {
                // Tudo vira dourado
                gsap.to(uniforms.uColor.value, { r: 0.83, g: 0.627, b: 0.09, duration: 0.8 });
                gsap.to(particles.material.color, { r: 0.83, g: 0.627, b: 0.09, duration: 0.8 });
                particles.material.size = 0.025; // Estrelas ficam maiores

            } else {
                // Volta pro azul
                gsap.to(uniforms.uColor.value, { r: 0.145, g: 0.388, b: 0.921, duration: 0.8 });
                gsap.to(particles.material.color, { r: 1, g: 1, b: 1, duration: 0.8 });
                particles.material.size = 0.015;

            }
        });
    }

    // ════════════════════════════════
    //  EVENT HANDLERS
    // ════════════════════════════════

    /**
     * Normaliza a posição do mouse pra o espaço NDC (-1 a 1).
     * Usado pra calcular parallax e repulsão de debris.
     * @param {MouseEvent} e
     */
    function onMouseMove(e) {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }

    /**
     * Recalcula aspect ratio, viewport e cache de altura quando a janela é redimensionada.
     */
    function onResize() {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Recalcula o cache de altura do documento (usado no onScroll)
        cachedDocHeight = document.documentElement.scrollHeight - window.innerHeight;
    }

    /** Wrapper com debounce (150ms) pra não esmagar o resize durante arraste. */
    let resizeTimer = null;
    function debouncedResize() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(onResize, 150);
    }

    /**
     * Calcula o progresso de scroll (0 a 1) e a velocidade instantânea
     * que alimenta o efeito de glitch no shader. Usa cachedDocHeight pra
     * evitar reflow síncrono em cada scroll.
     */
    function onScroll() {
        const y = window.scrollY || window.pageYOffset;
        scrollPct = cachedDocHeight > 0 ? y / cachedDocHeight : 0;

        // Velocidade = diferença do scroll desde o último frame
        scrollVelocity = Math.abs(y - lastScrollY);
        lastScrollY = y;
    }

    // ════════════════════════════════
    //  LOOP PRINCIPAL DE ANIMAÇÃO
    // ════════════════════════════════

    /**
     * Loop de renderização principal (~60fps via requestAnimationFrame).
     *
     * Otimizações de performance:
     * - Pula renderização se a aba está oculta (visibilitychange). No retorno,
     *   getElapsedTime() recalibra o relógio (sem salto, ao contrário de getDelta).
     * - Reutiliza _mouseWorld e _dummy (sem alocações no hot loop).
     * - Só reescreve posições das partículas quando expandFactor muda.
     *
     * Ordem de operações por frame:
     * 1. Atualiza uniforms do shader (tempo + glitch)
     * 2. Rotaciona a Anomalia (idle + mouse parallax + scroll)
     * 3. Move a câmera (zoom no scroll + pan no mouse)
     * 4. Calcula física dos 120 debris
     * 5. Atualiza as estrelas de fundo (expansão por scroll)
     * 6. Renderiza a cena
     */
    let lastFrameTime = 0;
    const targetFpsInterval = 1000 / 60; // Limita a no máximo 60 FPS (evita sobrecarga em monitores 120Hz+)

    function animate(timestamp) {
        requestAnimationFrame(animate);

        // Pause total quando a aba está oculta (economia de CPU/bateria).
        if (!tabVisible) return;

        // Limitação de FPS pra economizar GPU em monitores de alta taxa de atualização
        if (timestamp) {
            const delta = timestamp - lastFrameTime;
            if (delta < targetFpsInterval - 1) return;
            lastFrameTime = timestamp - (delta % targetFpsInterval);
        }

        const elapsed = clock.getElapsedTime();

        // ── Uniforms do Shader ──
        uniforms.uTime.value = elapsed;

        // Glitch diminui por fricção (0.9x por frame) e sobe com velocidade de scroll.
        // Decaimento por-frame (aceitável: o efeito é visual, não físico-critico).
        scrollVelocity *= 0.9;
        uniforms.uGlitch.value = Math.min(scrollVelocity * 0.02, 1.0);

        // ── Rotação Idle da Anomalia ──
        wireframe.rotation.x += 0.0008;
        wireframe.rotation.y += 0.0012;

        // ── Mouse Parallax (leve inclinação seguindo o mouse) ──
        wireframe.rotation.x += (mouseY * 0.15 - wireframe.rotation.x) * 0.008;
        wireframe.rotation.y += (mouseX * 0.15 - wireframe.rotation.y) * 0.008;

        // ── Câmera empurrada pra longe conforme o scroll ──
        const targetZ = 8 + scrollPct * 12; // z vai de 8 pra 20 no scroll total
        camera.position.z += (targetZ - camera.position.z) * 0.04;

        // Pan da câmera seguindo o mouse (suave via lerp)
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.05;

        // Rotação extra no scroll (quanto mais embaixo, mais roda)
        wireframe.rotation.y += scrollPct * 0.004;

        // "Respiração" da escala — pulsação suave de ±3%
        const breathScale = 1 + Math.sin(elapsed * 0.4) * 0.03;
        wireframe.scale.setScalar(breathScale);

        // ── Física dos Debris ──
        // Reutiliza objetos module-scope (antes era new Vector3/Object3D por frame)
        _mouseWorld.set(mouseX * 8, -mouseY * 8, camera.position.z - 6);
        _dummy.rotation.set(0, 0, 0); // reset parcial — posições são sobrescritas

        for (let i = 0; i < debrisData.length; i++) {
            let data = debrisData[i];

            const dx = data.x - _mouseWorld.x;
            const dy = data.y - _mouseWorld.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.001) dist = 0.001; // Evita divisão por zero (NaN explosion)

            if (dist < 2.5) {
                // Cursor normal próximo → repulsão: debris fogem do mouse
                const force = (2.5 - dist) * 0.05;
                data.vx += (dx / dist) * force;
                data.vy += (dy / dist) * force;
            }

            // Órbita natural ao redor da Anomalia (perpendicular = rotação)
            data.vx += -data.y * 0.0005;
            data.vy += data.x * 0.0005;

            // Mola de retorno pra posição orbital base (spring force)
            data.vx += (data.baseX - data.x) * 0.002;
            data.vy += (data.baseY - data.y) * 0.002;
            data.vz += (data.baseZ - data.z) * 0.002;

            // Fricção — sem isso os debris aceleram infinitamente
            data.vx *= 0.94;
            data.vy *= 0.94;
            data.vz *= 0.94;

            // Integra velocidade na posição
            data.x += data.vx;
            data.y += data.vy;
            data.z += data.vz;

            // Atualiza a instância no InstancedMesh
            _dummy.position.set(data.x, data.y, data.z);
            _dummy.rotation.x += data.rx + data.vx * 2; // Spin afetado pela velocidade
            _dummy.rotation.y += data.ry + data.vy * 2;
            _dummy.updateMatrix();
            debrisParticles.setMatrixAt(i, _dummy.matrix);
        }
        debrisParticles.instanceMatrix.needsUpdate = true;

        // ── Estrelas de Fundo ──
        // Rotacionam lentamente e se expandem conforme o scroll.
        // O loop de expansão só reescreve posições quando o fator muda
        // (antes reescrevia 350 atributos toda frame mesmo sem scroll).
        particles.rotation.y = elapsed * 0.06;
        particles.rotation.x = elapsed * 0.03;

        const expandFactor = 1 + scrollPct * 0.6; // Expand até 60% maior no final
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

        renderer.render(scene, camera);
    }

    // API pública
    return { init };
})();
