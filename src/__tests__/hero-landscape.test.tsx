import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import HeroLandscape from '@/components/hero/HeroLandscape';

it('keeps the poster available when enhancement fails', async () => {
  render(<HeroLandscape loadRenderer={() => Promise.reject(new Error('WebGL unavailable'))} />);
  expect(screen.getByRole('img')).toHaveAttribute('src', '/images/hero-clean.jpg');
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
