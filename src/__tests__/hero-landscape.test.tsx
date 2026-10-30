import { act, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import HeroLandscape from '@/components/hero/HeroLandscape';

it('keeps the poster available when enhancement fails', async () => {
  render(<HeroLandscape loadRenderer={() => Promise.reject(new Error('WebGL unavailable'))} />);
  expect(screen.getByRole('img')).toHaveAttribute('src', '/models/ribbon-portals/poster.webp');
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

it('ignores an old renderer failure after preferences replace its completed generation', async () => {
  const changes=new EventTarget();
  const media={matches:false,addEventListener:changes.addEventListener.bind(changes),removeEventListener:changes.removeEventListener.bind(changes)};
  vi.mocked(window.matchMedia).mockReturnValueOnce(media as unknown as MediaQueryList);
  const failures: (()=>void)[]=[];
  const handles: {canvas:HTMLCanvasElement;dispose:ReturnType<typeof vi.fn>;pause:ReturnType<typeof vi.fn>;highlight:ReturnType<typeof vi.fn>;resize:ReturnType<typeof vi.fn>;pointer:ReturnType<typeof vi.fn>;scroll:ReturnType<typeof vi.fn>}[]=[];
  const createLandscape=vi.fn(async (_host:unknown,_assets:unknown,_signal:unknown,onFailure:()=>void)=>{
    failures.push(onFailure);
    const handle={canvas:document.createElement('canvas'),dispose:vi.fn(),pause:vi.fn(),highlight:vi.fn(),resize:vi.fn(),pointer:vi.fn(),scroll:vi.fn()};handles.push(handle);return handle;
  });
  render(<HeroLandscape loadRenderer={async()=>({createLandscape})} />);
  await waitFor(()=>expect(handles[0]?.pause).toHaveBeenCalled());
  media.matches=true;act(()=>changes.dispatchEvent(new Event('change')));
  media.matches=false;act(()=>changes.dispatchEvent(new Event('change')));
  await waitFor(()=>expect(handles[1]?.pause).toHaveBeenCalled());
  act(()=>failures[0]());
  expect(screen.getByRole('img').parentElement).toHaveAttribute('data-landscape-state','ready');
  expect(handles[1].dispose).not.toHaveBeenCalled();
  expect(handles[1].canvas).toBeInTheDocument();
});


it('keeps the scene stable on pointer and scroll while preserving path highlight', async () => {
  const handle = {canvas:document.createElement('canvas'),dispose:vi.fn(),pause:vi.fn(),resize:vi.fn(),pointer:vi.fn(),scroll:vi.fn(),highlight:vi.fn()};
  const loader = async () => ({createLandscape:async () => handle});
  const {rerender} = render(<section><HeroLandscape loadRenderer={loader} /></section>);
  await waitFor(() => expect(screen.getByRole('img').parentElement).toHaveAttribute('data-landscape-state','ready'));
  act(() => {
    screen.getByRole('img').closest('section')!.dispatchEvent(new MouseEvent('pointermove',{bubbles:true,clientX:200,clientY:100}));
    window.dispatchEvent(new Event('scroll'));
  });
  expect(handle.pointer).not.toHaveBeenCalled();
  expect(handle.scroll).not.toHaveBeenCalled();
  rerender(<section><HeroLandscape loadRenderer={loader} activePath={2} /></section>);
  expect(handle.highlight).toHaveBeenLastCalledWith(2);
});
