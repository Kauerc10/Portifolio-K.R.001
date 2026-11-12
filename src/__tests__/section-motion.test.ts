import { afterEach, expect, it, vi } from 'vitest';
import { createMotionScope } from '@/lib/section-motion';

afterEach(() => {
  document.body.innerHTML = '';
  delete document.documentElement.dataset.languagePhase;
  vi.unstubAllGlobals();
});

it('waits for the language cover, enters once, and cancels active decoration on preference changes', async () => {
  let preference: (() => void) | undefined;
  const media = { matches: false, addEventListener: vi.fn((_event, fn) => { preference = fn; }), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', () => media);
  const root = document.createElement('section');
  document.body.append(root);
  const animation = { cancel: vi.fn(), finished: new Promise<void>(() => {}) };
  root.animate = vi.fn(() => animation as unknown as Animation);
  document.documentElement.dataset.languagePhase = 'cover';
  const scope = createMotionScope(root);
  const enter = vi.fn(() => scope.animate(root, [{ opacity: .7 }, { opacity: 1 }], { duration: 200 }));
  scope.onEnter(root, enter);
  expect(enter).not.toHaveBeenCalled();
  delete document.documentElement.dataset.languagePhase;
  await Promise.resolve();
  expect(enter).toHaveBeenCalledTimes(1);
  expect(root.animate).toHaveBeenCalledTimes(1);
  media.matches = true;
  preference?.();
  expect(animation.cancel).toHaveBeenCalledOnce();
  expect(scope.animate(root, [], { duration: 20 })).toBeNull();
  media.matches = false;
  preference?.();
  expect(enter).toHaveBeenCalledTimes(1);
  scope.dispose();
  expect(media.removeEventListener).toHaveBeenCalled();
});

it('keeps readable content with no animation API and clears live effects when resized or disposed', () => {
  const root = document.createElement('section');
  root.textContent = 'Experiência';
  document.body.append(root);
  const scope = createMotionScope(root);
  expect(scope.animate(root, [], { duration: 200 })).toBeNull();
  expect(root.textContent).toBe('Experiência');
  const cancel = vi.fn();
  root.animate = vi.fn(() => ({ cancel, finished: new Promise<void>(() => {}) }) as unknown as Animation);
  scope.animate(root, [], { duration: 200 });
  window.dispatchEvent(new Event('resize'));
  expect(cancel).toHaveBeenCalledOnce();
  scope.animate(root, [], { duration: 200 });
  scope.dispose();
  expect(cancel).toHaveBeenCalledTimes(2);
  expect(scope.canAnimate()).toBe(false);
});
