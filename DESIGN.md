# DESIGN.md — Design System & Craft Guidelines

## 🎨 Paleta de Cores (Dual Theme)

### Dark Mode (Padrão)
- **Void Background (`--void`)**: `#04060d` (Preto profundo com toque sutil de azul)
- **Ink Card Surface (`--ink`)**: `#0d1424` / `rgba(11, 17, 32, 0.95)` (Superfície dos cards)
- **Stamp Gold (`--stamp`)**: `#d4a017` (Ouro notarial com brilho dourado)
- **Signal Blue (`--signal`)**: `#2563eb` (Azul elétrico para links e badges)
- **Primary Text (`--text`)**: `#e2e8f0` (Branco suave de alta legibilidade)
- **Ghost Border (`--ghost`)**: `#334155` / `rgba(255, 255, 255, 0.1)`

### Light Mode (Cristalino)
- **Void Background**: `#f8fafc` (Branco suave com toque frio)
- **Ink Card Surface**: `#ffffff` (Card em branco puro com sombra sutil)
- **Stamp Gold**: `#b48312` (Ouro notarial rico e legível sobre fundo claro)
- **Primary Text**: `#0f172a` (Grafite escuro de alto contraste)
- **Secondary Text**: `#334155` (Cinza ardósia para descrições)
- **Ghost Border**: `#cbd5e1` / `rgba(15, 23, 42, 0.12)`

## 📐 Tipografia & Escala
- **Display / Titles**: `Syne` (Weights: 700, 800) — Títulos marcantes de artigos (`Art. I §1°`, `DOS PROJETOS`).
- **Body Text**: `Inter` (Weights: 400, 500) — Leitura fluida dos parágrafos.
- **Code / Metrics**: `JetBrains Mono` — Hashes de git, telemetria, tags e rótulos notariais.

## ⚡ Micro-Interações & Animações
- **Magnetic Hover**: Efeito magnético de atração sutil nos cards principais.
- **Scroll reveal**: Entrada suave via GSAP ScrollTrigger (`opacity: 0 -> 1`, `translateY: 20px -> 0`).
- **WebGL Background**: Respiro de partículas 3D Three.js sem aberração cromática agressiva.
- **Focus & A11y**: Toque de foco acessível com `focus-visible:ring-2 focus-visible:ring-[var(--gold)]`.
