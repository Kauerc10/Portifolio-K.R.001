import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import ProjetosSection from '@/components/sections/ProjetosSection';
import pt from '@/i18n/locales/pt-BR.json';

it('renders exactly five project previews in editorial order', () => {
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  expect(container.querySelectorAll('.projects-editorial > article')).toHaveLength(5);
  expect([...container.querySelectorAll('.projects-editorial > article')].map(item => item.id)).toEqual([
    'project-viodigital', 'project-vecom', 'project-atlas-notarial', 'project-docfacil', 'project-ckf',
  ]);
  expect(screen.getByRole('button', { name: /Leitura rápida/i })).toBeInTheDocument();
});

it('toggles quick reading mode without hiding the five previews', () => {
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  const toggle = screen.getByRole('button', { name: /Leitura rápida/i });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(container.querySelector('#projetos')).toHaveAttribute('data-project-reading', 'quick');
  expect(container.querySelectorAll('.projects-editorial > article')).toHaveLength(5);
});

it('keeps the Foli compatibility destination as a compact repository link', () => {
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  const note = container.querySelector('#project-foli');
  expect(note).toHaveAttribute('id', 'project-foli');
  expect(note?.querySelector('a')).toHaveAttribute('href', 'https://github.com/Kauerc10/foli');
});
