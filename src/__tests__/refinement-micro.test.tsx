import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ProjetosSection from '@/components/sections/ProjetosSection';
import pt from '@/i18n/locales/pt-BR.json';

it('project showcase exposes the five current cases and a Foli fallback', () => {
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  expect(container.querySelectorAll('.projects-editorial > article')).toHaveLength(5);
  expect(container.querySelector('#project-foli a')).toHaveAttribute('href', 'https://github.com/Kauerc10/foli');
});

it('contact validation returns keyboard focus to the first invalid field', async () => {
  const { default: Contact } = await import('@/components/sections/ContatoSection');
  render(<Contact dict={pt.contato} />);
  fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/i }));
  expect(document.activeElement).toBe(screen.getByRole('textbox', { name: /^Nome/ }));
});


it('keeps the quick reading control keyboard accessible', () => {
  const callbacks = new Set<ResizeObserverCallback>();
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: ResizeObserverCallback) { callbacks.add(callback); }
    observe() {}
    disconnect() {}
  });
  try {
    const { unmount } = render(<ProjetosSection dict={pt.projetos} />);
    const toggle = screen.getByRole('button', { name: /Leitura rápida/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    unmount();
  } finally {
    vi.unstubAllGlobals();
  }
});
