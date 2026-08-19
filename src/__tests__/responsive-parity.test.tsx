import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import GlobalHeader from '@/components/layout/GlobalHeader';
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

describe('Paridade Funcional e Responsividade (Task 15)', () => {
  it('deve garantir que links para todas as páginas essenciais estão presentes no header', () => {
    render(<GlobalHeader locale="pt-BR" dict={ptBR.nav} />);

    // Deve conter botões de navegação para todas as superfícies
    expect(screen.getByRole('link', { name: /TRABALHOS/i })).toHaveAttribute('href', '/pt-BR/projetos');
    expect(screen.getByRole('link', { name: /SOLUÇÕES/i })).toHaveAttribute('href', '/pt-BR/servicos');
    expect(screen.getByRole('link', { name: /CARREIRA/i })).toHaveAttribute('href', '/pt-BR/carreira');
  });

  it('deve permitir que tanto usuários de smartphone quanto de desktop acessem CTAs e formulários', () => {
    const { container } = render(
      <>
        <DualAudienceHero locale="pt-BR" dict={ptBR.dualHero} />
        <AudienceRouter locale="pt-BR" dict={ptBR.audienceRouter} />
        <FeaturedWork locale="pt-BR" />
        <ContactHub dict={ptBR.contato} />
      </>
    );

    // CTAs de conversão rápida e portfólio
    expect(screen.getByRole('link', { name: /Conversar sobre um projeto/i })).toHaveAttribute('href', '/pt-BR/servicos#contato');
    expect(screen.getByRole('link', { name: /Ver trabalhos/i })).toHaveAttribute('href', '/pt-BR/projetos');

    // WhatsApp direto e formulário de petição
    expect(screen.getByRole('link', { name: /Conversar no WhatsApp/i })).toBeInTheDocument();
    expect(container.querySelector('#peticaoForm')).toBeInTheDocument();
  });
});
