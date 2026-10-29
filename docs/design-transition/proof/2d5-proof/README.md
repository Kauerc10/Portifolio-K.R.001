# Prova de Transição: Paisagem 2.5D Volumétrica (T01)

Data: 29/10/2026.
Decisão: Aprovada pelo usuário com fornecimento do asset canônico limpo (`hero-clean.webp`).

## 1. Comparação Visual

Visualizar folha comparativa completa: [comparison-3d-vs-2d5.png](comparison-3d-vs-2d5.png)

1. **Referência Aprovada (Arte Original)**: Renderização artística de estúdio com iluminação global, espalhamento mineral suave (*subsurface scattering*), móveis ergonômicos e dunas que abraçam o relevo.
2. **Modelo 3D Procedural (1,6 MB GLB)**: Modelagem rígida por equações e extrusões matemáticas em Python; escadas flutuando sem tocar o solo em declive, móveis em blocos simples, vegetação facetada e iluminação cinzenta no bake 2048px.
3. **Paisagem 2.5D Volumétrica (74 KB)**: A própria arte limpa renderizada via WebGL com shader de paralaxe por mapa de profundidade (*Depth Map Parallax*), realce dinâmico dos caminhos por máscara RGB e carregamento instantâneo.

## 2. Telemetria e Desempenho Medido (Playwright 10s Benchmark)

| Métrica | Modelo 3D Procedural (GLB) | Paisagem 2.5D Volumétrica (Shader) | Vantagem / Redução |
| :--- | :--- | :--- | :--- |
| **Tamanho dos Assets** | 1.626 KB (GLB) + 171 KB runtime | **53 KB (imagem) + 5,7 KB (depth) + 15 KB (paths)** | **-95,4% de rede** |
| **Triângulos** | 48.168 | **2** | **-99,99%** |
| **Draw Calls** | 23 | **1** | **-95,6%** |
| **Frame Time Mediano** | 16,9 ms | **16,7 ms (60 fps cravados)** | Fluido e estável |
| **Tempo de Submissão CPU** | 2,2 ms | **0,2 ms** | **11× mais rápido** |
| **Erros de Console** | 0 | **0** | Perfeito |

## 3. Âncoras Projetadas para a Interface (HTML Pins)

As âncoras dos 3 destinos na resolução desktop (1433 × 1098):
- **Desenvolvimento** (`#projetos`): `X: 205.4 px, Y: 497.5 px` (acima do arco de W01)
- **Automação** (`#project-atlas`): `X: 736.8 px, Y: 391.4 px` (acima da torre de W02)
- **Suporte** (`#experiencia`): `X: 1253.7 px, Y: 473.2 px` (acima da abóbada de W03)
