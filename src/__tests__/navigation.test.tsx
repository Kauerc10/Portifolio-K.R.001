import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import GlobalHeader from '@/components/layout/GlobalHeader';
import MobileNavigation from '@/components/layout/MobileNavigation';
import SkipLink from '@/components/layout/SkipLink';
import ptBR from '@/i18n/locales/pt-BR.json';
import enUS from '@/i18n/locales/en-US.json';

vi.mock('next/navigation', () => ({
  usePathname: () => '/pt-BR',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Navegação Dual-Audience & Mobile Navigation (Task 3)', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('deve renderizar o SkipLink apontando para #main-content', () => {
    render(<SkipLink label="Pular para o conteúdo" />);
    const link = screen.getByRole('link', { name: /Pular para o conteúdo/i });
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('deve renderizar links principais desktop com labels em Português', () => {
    render(<GlobalHeader locale="pt-BR" dict={ptBR.nav} />);

    expect(screen.getByRole('link', { name: /TRABALHOS/i })).toHaveAttribute('href', '/pt-BR/projetos');
    expect(screen.getByRole('link', { name: /SOLUÇÕES/i })).toHaveAttribute('href', '/pt-BR/servicos');
    expect(screen.getByRole('link', { name: /CARREIRA/i })).toHaveAttribute('href', '/pt-BR/carreira');
    expect(screen.getByRole('link', { name: /VAMOS CONVERSAR/i })).toHaveAttribute('href', '/pt-BR/servicos#contato');
  });

  it('deve renderizar links principais desktop com labels em Inglês', () => {
    render(<GlobalHeader locale="en-US" dict={enUS.nav} />);

    expect(screen.getByRole('link', { name: /WORK/i })).toHaveAttribute('href', '/en-US/projetos');
    expect(screen.getByRole('link', { name: /SOLUTIONS/i })).toHaveAttribute('href', '/en-US/servicos');
    expect(screen.getByRole('link', { name: /CAREER/i })).toHaveAttribute('href', '/en-US/carreira');
    expect(screen.getByRole('link', { name: /LET'S TALK/i })).toHaveAttribute('href', '/en-US/servicos#contato');
  });

  it('deve alternar aria-expanded ao clicar no botão de menu mobile', () => {
    render(<MobileNavigation locale="pt-BR" dict={ptBR.nav} />);

    const toggleBtn = screen.getByRole('button', { name: /Abrir menu/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Abre menu
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /Navegação Mobile/i })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    // Fecha menu
    const closeBtns = screen.getAllByRole('button', { name: /Fechar menu/i });
    fireEvent.click(closeBtns[0]);
    expect(screen.queryByRole('dialog', { name: /Navegação Mobile/i })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('deve fechar o menu mobile ao pressionar a tecla Escape', () => {
    render(<MobileNavigation locale="pt-BR" dict={ptBR.nav} />);

    const toggleBtn = screen.getByRole('button', { name: /Abrir menu/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByRole('dialog', { name: /Navegação Mobile/i })).toBeInTheDocument();

    // Pressiona Escape
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: /Navegação Mobile/i })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
