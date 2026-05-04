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
 * - 'heroScrollProgress'  → empurra a câmera pra trás
 * - 'breachProtocol'      → tinge a Anomalia de vermelho
 * - 'obmepSynergy'        → tinge de dourado + acelera rotação
 * - 'obmepHover'          → atração magnética dos debris no hover das medalhas
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
    let lastScrollY = window.scrollY; // Último Y de scroll pra calcular velocidade
    let scrollVelocity = 0;           // Velocidade de scroll (usada no glitch)
    let canvas;                       // Referência ao canvas DOM
    let scrollPct = 0;                // Progresso de scroll (0 a 1)
    let particlePositionsOriginal = []; // Posições base das estrelas (pra expand)
    let breachActive = false;         // Se o breach protocol está ativo
    let obmepActive = false;         // Se estamos na seção OBMEP

    // ── Estado do Hover das Medalhas ──
    // Precisa ser no escopo do módulo pra o loop animate() acessar
    let cardHoverActive = false;     // Se algum card OBMEP está em hover
    let cardHoverLevel = 'none';   // Qual nível de medalha está em hover

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

        clock = new THREE.Clock();
        scene = new THREE.Scene();

        // ── Câmera perspectiva — ângulo amplo, distante ──
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.z = 8;

        // ── Renderer WebGL com alpha pra transparência ──
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,          // Fundo transparente (não preto sólido)
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Max 2x pra performance

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
        const sizes = new Float32Array(particleCount);

        // Distribui as partículas em esfera ao redor da Anomalia
        for (let i = 0; i < particleCount; i++) {
            const r = 2.0 + Math.random() * 2.5;     // Raio entre 2 e 4.5
            const theta = Math.random() * Math.PI * 2;   // Ângulo horizontal
            const phi = Math.acos(2 * Math.random() - 1); // Ângulo vertical

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
            sizes[i] = Math.random();
        }

        // Salva as posições originais pra o efeito de expansão no scroll
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
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onScroll, { passive: true });

        registerCustomEvents();

        animate(); // Inicia o loop de renderização
    }

    /**
     * Registra os CustomEvents que conectam outros módulos à cena 3D.
     * Toda a comunicação é por eventos — sem acoplamento direto.
     */
    function registerCustomEvents() {

        // Breach Protocol → tinge a Anomalia de vermelho
        window.addEventListener('breachProtocol', (e) => {
            breachActive = e.detail;
            if (breachActive) {
                gsap.to(uniforms.uColor.value, { r: 1, g: 0.1, b: 0.1, duration: 0.5 });
            } else {
                gsap.to(uniforms.uColor.value, { r: 0.145, g: 0.388, b: 0.921, duration: 0.5 });
            }
        });

        // Configuração do spin rápido que acontece na synergy OBMEP
        let spinConfig = { val: 0, _last: 0 };
        function updateSpin() {
            wireframe.rotation.y += (spinConfig.val - spinConfig._last);
            wireframe.rotation.x += (spinConfig.val - spinConfig._last) * 0.5;
            spinConfig._last = spinConfig.val;
        }

        // Hover nos cards OBMEP → muda cor por nível + débris viram magnéticos
        window.addEventListener('obmepHover', (e) => {
            cardHoverActive = e.detail.active;

            if (cardHoverActive) {
                cardHoverLevel = e.detail.level;

                // Cada tipo de medalha tem sua própria cor na cena
                if (cardHoverLevel === 'prata') {
                    gsap.to(uniforms.uColor.value, { r: 0.58, g: 0.64, b: 0.72, duration: 0.5 }); // Prata gelado
                } else if (cardHoverLevel === 'bronze') {
                    gsap.to(uniforms.uColor.value, { r: 0.83, g: 0.627, b: 0.09, duration: 0.5 }); // Bronze oxidado
                } else {
                    gsap.to(uniforms.uColor.value, { r: 0.06, g: 0.72, b: 0.51, duration: 0.5 }); // Verde esmeralda
                }
            } else {
                // Volta pro estado da seção (dourado se obmepActive, azul se não)
                if (obmepActive) {
                    gsap.to(uniforms.uColor.value, { r: 0.83, g: 0.627, b: 0.09, duration: 0.5 });
                } else {
                    gsap.to(uniforms.uColor.value, { r: 0.145, g: 0.388, b: 0.921, duration: 0.5 });
                }
            }
        });

        // Entrando/saindo da seção OBMEP → modo dourado + spin acelerado
        window.addEventListener('obmepSynergy', (e) => {
            obmepActive = e.detail;

            if (obmepActive) {
                // Tudo vira dourado
                gsap.to(uniforms.uColor.value, { r: 0.83, g: 0.627, b: 0.09, duration: 0.8 });
                gsap.to(particles.material.color, { r: 0.83, g: 0.627, b: 0.09, duration: 0.8 });
                particles.material.size = 0.025; // Estrelas ficam maiores

                // Giro rápido de 360° em 1.5s
                spinConfig = { val: 0, _last: 0 };
                gsap.to(spinConfig, { val: Math.PI * 2, duration: 1.5, ease: 'power4.out', onUpdate: updateSpin });

            } else {
                // Volta pro azul
                gsap.to(uniforms.uColor.value, { r: 0.145, g: 0.388, b: 0.921, duration: 0.8 });
                gsap.to(particles.material.color, { r: 1, g: 1, b: 1, duration: 0.8 });
                particles.material.size = 0.015;

                // Giro rápido na direção oposta
                spinConfig = { val: 0, _last: 0 };
                gsap.to(spinConfig, { val: -Math.PI * 2, duration: 1.5, ease: 'power4.out', onUpdate: updateSpin });
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
     * Recalcula aspect ratio e viewport quando a janela é redimensionada.
     */
    function onResize() {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Calcula o progresso de scroll (0 a 1) e a velocidade instantânea
     * que alimenta o efeito de glitch no shader.
     */
    function onScroll() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollPct = docHeight > 0 ? window.scrollY / docHeight : 0;

        // Velocidade = diferença do scroll desde o último frame
        scrollVelocity = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
    }

    // ════════════════════════════════
    //  LOOP PRINCIPAL DE ANIMAÇÃO
    // ════════════════════════════════

    /**
     * Loop de renderização principal (~60fps via requestAnimationFrame).
     *
     * Ordem de operações por frame:
     * 1. Atualiza uniforms do shader (tempo + glitch)
     * 2. Rotaciona a Anomalia (idle + mouse parallax + scroll)
     * 3. Move a câmera (zoom no scroll + pan no mouse)
     * 4. Calcula física dos 120 debris
     * 5. Atualiza as estrelas de fundo (expansão por scroll)
     * 6. Modo OBMEP Overdrive se ativo
     * 7. Renderiza a cena
     */
    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // ── Uniforms do Shader ──
        uniforms.uTime.value = elapsed;

        // Glitch diminui por fricção (0.9x por frame) e sobe com velocidade de scroll
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
        // Calcula a posição do mouse no espaço 3D (projetado num plano Z)
        const mouseWorld = new THREE.Vector3(mouseX * 8, -mouseY * 8, camera.position.z - 6);
        const dummy = new THREE.Object3D();

        for (let i = 0; i < debrisData.length; i++) {
            let data = debrisData[i];

            const dx = data.x - mouseWorld.x;
            const dy = data.y - mouseWorld.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.001) dist = 0.001; // Evita divisão por zero (NaN explosion)

            if (cardHoverActive && dist < 6.0) {
                // Hover numa medalha → atração magnética: debris voam em direção ao mouse
                const force = (6.0 - dist) * 0.015;
                data.vx -= (dx / dist) * force;
                data.vy -= (dy / dist) * force;

            } else if (!cardHoverActive && dist < 2.5) {
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
            dummy.position.set(data.x, data.y, data.z);
            dummy.rotation.x += data.rx + data.vx * 2; // Spin afetado pela velocidade
            dummy.rotation.y += data.ry + data.vy * 2;
            dummy.updateMatrix();
            debrisParticles.setMatrixAt(i, dummy.matrix);
        }
        debrisParticles.instanceMatrix.needsUpdate = true;

        // ── Estrelas de Fundo ──
        // Rotacionam lentamente e se expandem conforme o scroll
        particles.rotation.y = elapsed * 0.06;
        particles.rotation.x = elapsed * 0.03;

        const expandFactor = 1 + scrollPct * 0.6; // Expand até 60% maior no final
        const pos = particles.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            pos.setX(i, particlePositionsOriginal[i * 3] * expandFactor);
            pos.setY(i, particlePositionsOriginal[i * 3 + 1] * expandFactor);
            pos.setZ(i, particlePositionsOriginal[i * 3 + 2] * expandFactor);
        }
        pos.needsUpdate = true;

        // ── Modo OBMEP Overdrive ──
        // Quando a seção OBMEP está ativa, tudo fica mais caótico
        if (obmepActive) {
            wireframe.rotation.x += 0.015; // Rotação 20x mais rápida
            wireframe.rotation.y += 0.02;
            particles.rotation.y -= 0.03;  // Estrelas na direção oposta

            const wildBreath = 1 + Math.sin(elapsed * 4) * 0.08; // Pulsação mais intensa
            wireframe.scale.setScalar(wildBreath);
        }

        renderer.render(scene, camera);
    }

    // API pública
    return { init };
})();
