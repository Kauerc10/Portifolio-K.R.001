import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ProjetosSection from '@/components/sections/ProjetosSection';
import pt from '@/i18n/locales/pt-BR.json';

it('keeps project content immediate while moving the selection marker', () => {
  vi.stubGlobal('IntersectionObserver', undefined);
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  const atlas = screen.getByRole('link', { name: /Atlas Notarial/i });
  const ckf = screen.getByRole('link', { name: /CKF Manutenção/i });

  fireEvent.click(atlas);
  fireEvent.click(ckf);

  expect(ckf).toHaveAttribute('aria-current', 'true');
  expect(container.querySelector('#project-ckf-legacy')).not.toHaveAttribute('hidden');
  expect(container.querySelector('#project-atlas')).toHaveAttribute('hidden');
  expect(container.querySelector('.projects-editorial__directional-border')).toBeTruthy();
});

it('does not hide the section when animation APIs are unavailable', () => {
  vi.stubGlobal('IntersectionObserver', undefined);
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  expect(container.querySelector('#projetos')).toHaveAttribute('data-motion-state', 'entered');
  expect(screen.getByRole('heading', { name: /Projetos selecionados/i })).toBeVisible();
});

it('animates only supporting content and records the latest selection direction', () => {
  vi.stubGlobal('IntersectionObserver', undefined);
  const targets: HTMLElement[] = [];
  const animate = vi.fn(function (this: HTMLElement) {
    targets.push(this);
    return { cancel: vi.fn(), pause: vi.fn(), finished: Promise.resolve() };
  });
  HTMLElement.prototype.animate = animate as unknown as typeof HTMLElement.prototype.animate;
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  fireEvent.click(screen.getByRole('link', { name: /CKF Manutenção/i }));
  fireEvent.click(screen.getByRole('link', { name: /DocFácil/i }));
  const section = container.querySelector('#projetos');
  expect(section).toHaveAttribute('data-selection-direction', 'forward');
  expect(targets.some(element => element.matches('article'))).toBe(false);
  expect(targets.some(element => element.matches('h3'))).toBe(false);
});

it('keeps Atlas flow readable when returning from another project', () => {
  render(<ProjetosSection dict={pt.projetos} />);
  fireEvent.click(screen.getByRole('link', { name: /CKF Manutenção/i }));
  fireEvent.click(screen.getByRole('link', { name: /Atlas Notarial/i }));
  expect(document.querySelector('.projects-editorial__flow')).toBeVisible();
  expect(screen.getByRole('link', { name: /Atlas Notarial/i })).toHaveAttribute('aria-current', 'true');
});
