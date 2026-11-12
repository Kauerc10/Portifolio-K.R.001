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
  expect(container.querySelector('#project-ckf')).not.toHaveAttribute('hidden');
  expect(container.querySelector('#project-atlas')).toHaveAttribute('hidden');
  expect(container.querySelector('.projects-editorial__directional-border')).toBeTruthy();
});

it('does not hide the section when animation APIs are unavailable', () => {
  vi.stubGlobal('IntersectionObserver', undefined);
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  expect(container.querySelector('#projetos')).toHaveAttribute('data-motion-state', 'entered');
  expect(screen.getByRole('heading', { name: /Projetos selecionados/i })).toBeVisible();
});
