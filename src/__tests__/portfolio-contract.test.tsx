import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ContatoSection from '@/components/sections/ContatoSection';
import Footer from '@/components/sections/Footer';
import LanguageToggle from '@/components/ui/LanguageToggle';
import ptBR from '@/i18n/locales/pt-BR.json';

// Mocks para navegação Next.js
vi.mock('next/navigation', () => ({
  usePathname: () => '/pt-BR',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Contratos Fundamentais do Portfólio (Baseline Regressivo)', () => {
  it('deve garantir que o HeroSection possui links para Projetos e Download do Currículo', () => {
    render(<HeroSection dict={ptBR.hero} />);
    
    // Link de projetos
    const projectsLink = screen.getByRole('link', { name: /Ver Projetos|Projetos/i });
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink.getAttribute('href')).toContain('#projetos');

    // Botão de download do currículo
    const cvLink = screen.getByRole('link', { name: /CURRÍCULO|Currículo/i });
    expect(cvLink).toBeInTheDocument();
    expect(cvLink.getAttribute('href')).toContain('curriculo_kaue.pdf');
  });

  it('deve conter o formulário de contato com honeypot anti-bot e campos essenciais', () => {
    const { container } = render(<ContatoSection dict={ptBR.contato} />);
    
    const form = container.querySelector('#peticaoForm');
    expect(form).toBeInTheDocument();
    expect(form?.getAttribute('action')).toBe('/api/contato');

    // Campo honeypot anti-bot
    const botcheck = container.querySelector('input[name="botcheck"]');
    expect(botcheck).toBeInTheDocument();

    // Botão de envio
    const submitBtn = container.querySelector('#btnProtocolar');
    expect(submitBtn).toBeInTheDocument();
  });

  it('deve conter links sociais verificáveis no Footer', () => {
    render(<Footer dict={ptBR.footer} />);

    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Kauerc10');

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/kauerc/');

    const emailBtn = screen.getByRole('button', { name: /E-mail|Email|Copiar/i });
    expect(emailBtn).toBeInTheDocument();
  });

  it('deve renderizar o alternador de idiomas LanguageToggle', () => {
    render(<LanguageToggle />);
    expect(screen.getByRole('group', { name: /Seletor de idioma|Language Selector/i })).toBeInTheDocument();
  });
});
