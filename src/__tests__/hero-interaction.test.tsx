import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import HeroSection from '@/components/sections/HeroSection';
import ptBR from '@/i18n/locales/pt-BR.json';

it('presents the approved portal artwork and primary actions', () => {
  const { container } = render(<HeroSection dict={ptBR.hero} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Olá, que bom ter');
  expect(container.querySelector('picture img')).toHaveAttribute('src', '/images/portals/portals-1672.webp');
  expect(screen.getByRole('link', { name: ptBR.hero.ctaExplore })).toHaveAttribute('href', '#projetos');
  expect(screen.getByRole('link', { name: ptBR.hero.ctaResumeShort })).toHaveAttribute('href', '/curriculo_kaue.pdf');
});
