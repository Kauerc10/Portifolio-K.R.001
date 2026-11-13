import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ProjetosSection from '@/components/sections/ProjetosSection';
import pt from '@/i18n/locales/pt-BR.json';

it('rapid project choices expose only the latest panel and preserve focus on its link', () => {
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  for (const name of [/CKF Manutenção/i, /DocFácil/i, /Foli/i]) {
    fireEvent.click(screen.getByRole('link', { name }));
  }
  const active = screen.getByRole('link', { name: /Foli/i });
  expect(active).toHaveAttribute('aria-current', 'true');
  expect(document.activeElement).toBe(active);
  expect(container.querySelector('#project-foli')).not.toHaveAttribute('inert');
  expect(container.querySelector('#project-ckf')).toHaveAttribute('inert');
  expect(container.querySelector('#project-docfacil-legacy')).toHaveAttribute('aria-hidden', 'true');
});

it('contact validation returns keyboard focus to the first invalid field', async () => {
  const { default: Contact } = await import('@/components/sections/ContatoSection');
  render(<Contact dict={pt.contato} />);
  fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/i }));
  expect(document.activeElement).toBe(screen.getByRole('textbox', { name: /^Nome/ }));
});


it('keeps the selection marker aligned after layout changes without changing the selected panel', () => {
  const callbacks = new Set<ResizeObserverCallback>();
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: ResizeObserverCallback) { callbacks.add(callback); }
    observe() {}
    disconnect() {}
  });
  try {
    const { container, unmount } = render(<ProjetosSection dict={pt.projetos} />);
    const active = screen.getByRole('link', { name: /DocF.cil/i });
    fireEvent.click(active);
    Object.defineProperties(active, {
      offsetTop: { configurable: true, value: 144 },
      offsetHeight: { configurable: true, value: 72 },
    });
    callbacks.forEach(callback => callback([], {} as ResizeObserver));
    const index = active.closest('nav');
    expect(index?.style.getPropertyValue('--project-marker-y')).toBe('144px');
    expect(index?.style.getPropertyValue('--project-marker-height')).toBe('72px');
    expect(active).toHaveAttribute('aria-current', 'true');
    expect(container.querySelector('#project-docfacil-legacy')).not.toHaveAttribute('hidden');
    unmount();
  } finally {
    vi.unstubAllGlobals();
  }
});
