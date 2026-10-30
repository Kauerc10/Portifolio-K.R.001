'use client';
import { useEffect, useRef, useState } from 'react';
import { landscapeAssets, type LandscapeRenderer, type RendererLoader } from './landscape';
const defaultLoader: RendererLoader = () => import('./renderer');
export default function HeroLandscape({ loadRenderer = defaultLoader, activePath = 0 }: { loadRenderer?: RendererLoader; activePath?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const renderer = useRef<LandscapeRenderer | null>(null);
  const [state, setState] = useState('poster');
  useEffect(() => {
    const element = host.current!;
    if (!window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    let visible = typeof IntersectionObserver === 'undefined', disposed = false, failed = false;
    let pending: AbortController | null = null;
    let generation: AbortController | null = null;
    const stop = () => { generation?.abort(); generation = null; pending = null; renderer.current?.dispose(); renderer.current = null; };
    const reconcile = () => {
      if (disposed) return;
      if (media.matches || connection?.saveData) { stop(); setState('poster'); return; }
      const paused = !visible || document.hidden;
      if (paused && pending) { pending.abort(); pending = null; setState('paused'); }
      if (renderer.current) { renderer.current.pause(paused); setState(paused ? 'paused' : 'ready'); return; }
      if (paused || pending || failed) return;
      const controller = new AbortController(); generation = controller; pending = controller; setState('loading');
      const fallback = () => { if (controller.signal.aborted || disposed) return; failed = true; stop(); setState('fallback'); };
      loadRenderer().then(module => {
        if (controller.signal.aborted) return null;
        return module.createLandscape(element, landscapeAssets, controller.signal, fallback);
      }).then(result => {
        if (!result) return;
        if (controller.signal.aborted || disposed) { result.dispose(); return; }
        pending = null; renderer.current = result; element.append(result.canvas); reconcile();
      }).catch(error => { if (error?.name !== 'AbortError') fallback(); });
    };
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => { visible = entries[0].isIntersecting; reconcile(); }) : null;
    observer?.observe(element);
    media.addEventListener('change', reconcile); connection?.addEventListener('change', reconcile);
    document.addEventListener('visibilitychange', reconcile);
    const resize = () => renderer.current?.resize();
    const sizes = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null; sizes?.observe(element);
    const pointer = (event: PointerEvent) => { if (event.pointerType === 'touch') return; const rect = element.getBoundingClientRect(); renderer.current?.pointer((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1); };
    const leave = () => renderer.current?.pointer(0, 0);
    const scroll = () => { const rect = element.getBoundingClientRect(); renderer.current?.scroll(Math.max(0, Math.min(1, -rect.top / rect.height))); };
    const section = element.closest('section') ?? element;
    section.addEventListener('pointermove', pointer); section.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', scroll, { passive: true }); window.addEventListener('resize', resize);
    reconcile();
    return () => { disposed = true; stop(); observer?.disconnect(); sizes?.disconnect(); media.removeEventListener('change', reconcile); connection?.removeEventListener('change', reconcile); document.removeEventListener('visibilitychange', reconcile); section.removeEventListener('pointermove', pointer); section.removeEventListener('pointerleave', leave); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', resize); };
  }, [loadRenderer]);
  useEffect(() => { renderer.current?.highlight(activePath); }, [activePath, state]);
  return <div ref={host} className="hero-landscape absolute inset-0 pointer-events-none" data-landscape-state={state}>
    {/* A calibrated original is served directly; renderer uses this same URL. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={landscapeAssets.color} alt="Paisagem conceitual mineral com caminhos violeta interligando os pavilhões de Desenvolvimento, Automação e Suporte" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-center" />
  </div>;
}
