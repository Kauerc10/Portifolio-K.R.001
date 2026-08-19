import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import DualAudienceHero from '@/components/home/DualAudienceHero';
import AudienceRouter from '@/components/home/AudienceRouter';
import FeaturedWork from '@/components/home/FeaturedWork';
import ContactHub from '@/components/contact/ContactHub';
import ptBR from '@/i18n/locales/pt-BR.json';

vi.mock('next/navigation', () => ({
  usePathname: () => '/pt-BR',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Integração da Home Híbrida Dual-Audience (Task 12)', () => {
  it('deve renderizar a sequência de valor completa na Home', () => {
    const { container } = render(
      <>
        <DualAudienceHero locale="pt-BR" dict={ptBR.dualHero} />
        <AudienceRouter locale="pt-BR" dict={ptBR.audienceRouter} />
        <FeaturedWork locale="pt-BR" />
        <ContactHub dict={ptBR.contato} />
      </>
    );

    // Hero com H1
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(ptBR.dualHero.h1);

    // Audience Router
    expect(screen.getByRole('link', { name: /Conhecer soluções/i })).toHaveAttribute('href', '/pt-BR/servicos');
    expect(screen.getByRole('link', { name: /Ver perfil profissional/i })).toHaveAttribute('href', '/pt-BR/carreira');

    // Featured Work
    expect(screen.getByRole('heading', { level: 2, name: /SISTEMAS EM PRODUÇÃO E PRODUTOS REAIS/i })).toBeInTheDocument();

    // Contato
    expect(screen.getByRole('link', { name: /Conversar no WhatsApp/i })).toBeInTheDocument();
    expect(container.querySelector('#peticaoForm')).toBeInTheDocument();
  });
});
