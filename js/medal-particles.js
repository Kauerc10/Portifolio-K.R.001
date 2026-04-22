class MedalParticles {
    static init() {
        this.canvas = document.getElementById('medalParticles');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };

        // Config
        this.particleCount = window.innerWidth < 768 ? 50 : 120;
        this.baseColor = '255, 230, 200'; // light gold

        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    static resize() {
        // Parent section bounds
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    static createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5 - 0.2, // slight upward drift
                radius: Math.random() * 2 + 0.5,
                baseAlpha: Math.random() * 0.5 + 0.1,
                angle: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.01,
            });
        }
    }

    static bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        const section = this.canvas.parentElement;
        section.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        section.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    static animate() {
        // Semi-transparent fill for trail effect and dark background
        this.ctx.fillStyle = '#111010'; // matching ink color
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            // Wobble motion
            p.angle += p.wobbleSpeed;
            const wobbleX = Math.cos(p.angle) * 0.5;

            p.x += p.vx + wobbleX;
            p.y += p.vy;

            // Wrap around bounds
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Mouse interaction (Repel)
            if (this.mouse.x != null && this.mouse.y != null) {
                let dx = this.mouse.x - p.x;
                let dy = this.mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const pushX = forceDirectionX * force * 2;
                    const pushY = forceDirectionY * force * 2;

                    p.x -= pushX;
                    p.y -= pushY;
                }
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = `rgba(${this.baseColor}, ${p.baseAlpha})`;
            this.ctx.fill();
        }

        requestAnimationFrame(() => this.animate());
    }
}
