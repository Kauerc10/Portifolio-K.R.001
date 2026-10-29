import { act, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import HeroLandscape from '@/components/hero/HeroLandscape';

it('keeps the poster available when enhancement fails', async () => {
  render(<HeroLandscape loadRenderer={() => Promise.reject(new Error('WebGL unavailable'))} />);
  expect(screen.getByRole('img')).toHaveAttribute('src', '/images/hero-detailed.webp');
  await waitFor(() => expect(screen.getByRole('img').parentElement).toHaveAttribute('data-landscape-state', 'fallback'));
});

it('discards a renderer which finishes after unmount', async () => {
  let resolve!: (value: unknown) => void;
  const dispose = vi.fn();
  const createLandscape = vi.fn(() => new Promise(resolveResult => { resolve = resolveResult; }));
  const { unmount } = render(<HeroLandscape loadRenderer={async () => ({ createLandscape }) as never} />);
  await waitFor(() => expect(createLandscape).toHaveBeenCalled());
  unmount();
  resolve({ canvas: document.createElement('canvas'), dispose });
  await waitFor(() => expect(dispose).toHaveBeenCalledOnce());
  expect(document.querySelector('canvas')).toBeNull();
});

it('keeps reduced-motion visitors on the poster without downloading the renderer', () => {
  vi.mocked(window.matchMedia).mockReturnValueOnce({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
  const loader = vi.fn();
  render(<HeroLandscape loadRenderer={loader} />);
  expect(screen.getByRole('img')).toBeVisible();
  expect(loader).not.toHaveBeenCalled();
});

it('returns to the poster when reduced motion changes during loading', async () => {
  const changes = new EventTarget();
  const media = { matches: false, addEventListener: changes.addEventListener.bind(changes), removeEventListener: changes.removeEventListener.bind(changes) };
  vi.mocked(window.matchMedia).mockReturnValueOnce(media as unknown as MediaQueryList);
  let resolve!: (value: unknown) => void;
  const dispose = vi.fn();
  const createLandscape = vi.fn(() => new Promise(resolveResult => { resolve = resolveResult; }));
  render(<HeroLandscape loadRenderer={async () => ({ createLandscape }) as never} />);
  await waitFor(() => expect(createLandscape).toHaveBeenCalled());
  media.matches = true;
  act(() => changes.dispatchEvent(new Event('change')));
  await waitFor(() => expect(screen.getByRole('img').parentElement).toHaveAttribute('data-landscape-state', 'poster'));
  resolve({canvas:document.createElement('canvas'),dispose});
  await waitFor(() => expect(dispose).toHaveBeenCalledOnce());
});


it('does not download enhancement before the hero becomes visible', async () => {
  let intersect!: (entries: {isIntersecting:boolean}[]) => void;
  vi.stubGlobal('IntersectionObserver', class { constructor(callback: typeof intersect) { intersect=callback; } observe() {} disconnect() {} });
  const loader=vi.fn(() => new Promise<never>(()=>{}));
  const {unmount}=render(<HeroLandscape loadRenderer={loader} />);
  expect(loader).not.toHaveBeenCalled();
  act(()=>intersect([{isIntersecting:true}]));
  await waitFor(()=>expect(loader).toHaveBeenCalledOnce());
  act(()=>intersect([{isIntersecting:false}]));
  expect(screen.getByRole('img').parentElement).toHaveAttribute('data-landscape-state','paused');
  unmount(); vi.unstubAllGlobals();
});

it('pauses the enhancement while the document is hidden and restores it on return', async () => {
  const pause=vi.fn();
  const dispose=vi.fn();
  const renderHandle={canvas:document.createElement('canvas'),pause,dispose,highlight:vi.fn(),resize:vi.fn(),pointer:vi.fn(),scroll:vi.fn()};
  const {unmount}=render(<HeroLandscape loadRenderer={async()=>({createLandscape:async()=>renderHandle})} />);
  await waitFor(()=>expect(screen.getByRole('img').parentElement).toHaveAttribute('data-landscape-state','ready'));
  Object.defineProperty(document,'hidden',{value:true,configurable:true});
  act(()=>document.dispatchEvent(new Event('visibilitychange')));
  expect(screen.getByRole('img').parentElement).toHaveAttribute('data-landscape-state','paused');
  expect(pause).toHaveBeenLastCalledWith(true);
  Object.defineProperty(document,'hidden',{value:false,configurable:true});
  act(()=>document.dispatchEvent(new Event('visibilitychange')));
  expect(screen.getByRole('img').parentElement).toHaveAttribute('data-landscape-state','ready');
  unmount(); expect(dispose).toHaveBeenCalledOnce();
});
