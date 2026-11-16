import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import HeroSection from '@/components/sections/HeroSection';
import ptBR from '@/i18n/locales/pt-BR.json';

it('presents the approved portal artwork and primary actions', () => {
  const { container } = render(<HeroSection dict={ptBR.hero} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Olá, que bom ter');
  expect(container.querySelector('picture img')).toHaveAttribute('src', '/images/portals/portals-1672.webp');
  expect(screen.getByRole('link', { name: ptBR.hero.ctaExplore })).toHaveAttribute('href', '#projetos');
  expect(screen.getByRole('link', { name: ptBR.hero.ctaResumeShort })).toHaveAttribute('href', '/curriculo_kaue.pdf');
  expect(screen.getByRole('link', { name: ptBR.hero.scrollDown })).toHaveAttribute('href', '#projetos');
});

it('toggles scroll prompt state smoothly while keeping ready entrance intact', () => {
  Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 0 });
  const { container } = render(<HeroSection dict={ptBR.hero} />);
  const prompt = container.querySelector('.portal-scroll-prompt');
  const link = screen.getByRole('link', { name: ptBR.hero.scrollDown });

  expect(prompt).toHaveClass('is-ready');
  expect(prompt).not.toHaveClass('is-scrolled');
  expect(prompt).toHaveAttribute('aria-hidden', 'false');

  window.scrollY = 120;
  fireEvent.scroll(window);

  expect(prompt).toHaveClass('is-ready');
  expect(prompt).toHaveClass('is-scrolled');
  expect(prompt).toHaveAttribute('aria-hidden', 'true');
  expect(link).toHaveAttribute('tabindex', '-1');

  window.scrollY = 0;
  fireEvent.scroll(window);

  expect(prompt).toHaveClass('is-ready');
  expect(prompt).not.toHaveClass('is-scrolled');
  expect(prompt).toHaveAttribute('aria-hidden', 'false');
  expect(link).not.toHaveAttribute('tabindex');
});
