export const landscapeAssets = { color: '/images/hero-clean.jpg', depth: '/images/hero-depth.webp', paths: '/images/hero-paths-id.webp' };
export const destinations = [
  { key: 'development', href: '#projetos', x: .133, y: .4616, path: 1 },
  { key: 'automation', href: '#project-atlas', x: .505, y: .358, path: 2 },
  { key: 'support', href: '#experiencia', x: .871, y: .4379, path: 3 },
] as const;
export function cover(width: number, height: number, imageWidth: number, imageHeight: number) {
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const drawnWidth = imageWidth * scale, drawnHeight = imageHeight * scale;
  return { x: width / drawnWidth, y: height / drawnHeight,
    project: (x: number, y: number) => ({ x: (x - .5) * drawnWidth + width / 2, y: (y - .5) * drawnHeight + height / 2 }) };
}
export interface LandscapeRenderer {
  canvas: HTMLCanvasElement;
  resize(): void;
  pointer(x: number, y: number): void;
  scroll(progress: number): void;
  highlight(path: number): void;
  pause(paused: boolean): void;
  dispose(): void;
}
export type RendererLoader = () => Promise<{ createLandscape: (host: HTMLElement, assets: typeof landscapeAssets, signal: AbortSignal, failed: () => void) => Promise<LandscapeRenderer> }>;
