import { useRef } from 'react';
import { act, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useProjectPreview } from '@/components/projects/useProjectPreview';
import { vecomCase } from '@/components/projects/case-model';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it('suspends offscreen and hidden previews, resumes on visibility, and cancels pending work on unmount', () => {
  let intersection: (entries: { isIntersecting: boolean }[]) => void = () => {};
  const frames = new Map<number, FrameRequestCallback>();
  let id = 0;
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => { frames.set(++id, fn); return id; });
  vi.stubGlobal('cancelAnimationFrame', (key: number) => frames.delete(key));
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: typeof intersection) { intersection = callback; }
    observe() {} disconnect() {}
  });
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden });
  let hidden = false;
  function Preview() {
    const ref = useRef<HTMLElement>(null);
    useProjectPreview(ref, 'pt-BR', vecomCase, '--vecom-progress', 'title');
    return <article ref={ref}><h3 id="title">VECOM</h3></article>;
  }
  const mounted = render(<Preview />);
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(0)); };
  act(flush);
  act(() => intersection([{ isIntersecting: false }]));
  act(() => window.dispatchEvent(new Event('scroll')));
  expect(frames.size).toBe(0);
  act(() => intersection([{ isIntersecting: true }]));
  expect(frames.size).toBe(1);
  hidden = true;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(frames.size).toBe(0);
  hidden = false;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(frames.size).toBe(1);
  mounted.unmount();
  expect(frames.size).toBe(0);
  delete (document as unknown as { hidden?: boolean }).hidden;
});
