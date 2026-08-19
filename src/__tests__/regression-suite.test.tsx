import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ContatoSection from '@/components/sections/ContatoSection';
import Footer from '@/components/sections/Footer';
import LanguageToggle from '@/components/ui/LanguageToggle';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { getProjects, getProjectBySlug } from '@/content/projects';
import ptBR from '@/i18n/locales/pt-BR.json';

vi.mock('next/navigation', () => ({
  usePathname: () => '/pt-BR',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Suíte de Regressão V3 → V4 (Task 15)', () => {
  it('deve preservar todos os 4 projetos fundamentais', () => {
    const projects = getProjects('pt-BR');
    const slugs = projects.map((p) => p.slug);

    expect(slugs).toContain('docfacil');
    expect(slugs).toContain('ckf-manutencao');
    expect(slugs).toContain('atlas-notarial');
    expect(slugs).toContain('foli');
  });

  it('deve preservar integridade do formulário e honeypot anti-spam', () => {
    const { container } = render(<ContatoSection dict={ptBR.contato} />);

    expect(container.querySelector('#peticaoForm')).toBeInTheDocument();
    expect(container.querySelector('input[name="botcheck"]')).toBeInTheDocument();
    expect(container.querySelector('#btnProtocolar')).toBeInTheDocument();
  });

  it('deve preservar links sociais e de contato no Footer', () => {
    render(<Footer dict={ptBR.footer} />);

    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', 'https://github.com/Kauerc10');
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/kauerc/');
    expect(screen.getByRole('button', { name: /E-mail|Email|Copiar/i })).toBeInTheDocument();
  });

  it('deve preservar os controles de Tema e Idioma', () => {
    render(
      <div>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    );

    expect(screen.getByRole('group', { name: /Seletor de idioma|Language Selector/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ativar tema|Alternar tema|Toggle theme/i })).toBeInTheDocument();
  });
});
