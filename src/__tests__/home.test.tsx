import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import DualAudienceHero from '@/components/home/DualAudienceHero';
import AudienceRouter from '@/components/home/AudienceRouter';
import { parseVisitorIntent } from '@/lib/intent';
import ptBR from '@/i18n/locales/pt-BR.json';
import enUS from '@/i18n/locales/en-US.json';

describe('Home Dual-Audience & Intent Router (Task 4)', () => {
  it('deve fazer parse correto do query param intent', () => {
    expect(parseVisitorIntent('business')).toBe('business');
    expect(parseVisitorIntent('career')).toBe('career');
    expect(parseVisitorIntent('other')).toBeNull();
    expect(parseVisitorIntent(undefined)).toBeNull();
  });

  it('deve renderizar o DualAudienceHero com H1, contexto e CTAs em pt-BR', () => {
    render(<DualAudienceHero locale="pt-BR" dict={ptBR.dualHero} />);

    expect(screen.getByRole('heading', { level: 1, name: /Do problema ao software em produção/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Conversar sobre um projeto/i })).toHaveAttribute('href', '/pt-BR/servicos#contato');
    expect(screen.getByRole('link', { name: /Ver trabalhos/i })).toHaveAttribute('href', '/pt-BR/projetos');
  });

  it('deve renderizar o DualAudienceHero com H1 e CTAs em en-US', () => {
    render(<DualAudienceHero locale="en-US" dict={enUS.dualHero} />);

    expect(screen.getByRole('heading', { level: 1, name: /From problem to production software/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Talk about a project/i })).toHaveAttribute('href', '/en-US/servicos#contato');
    expect(screen.getByRole('link', { name: /Explore work/i })).toHaveAttribute('href', '/en-US/projetos');
  });

  it('deve renderizar os dois caminhos no AudienceRouter sem esconder nenhum deles independente do intent', () => {
    const { rerender } = render(<AudienceRouter locale="pt-BR" dict={ptBR.audienceRouter} intent="business" />);

    expect(screen.getByRole('link', { name: /Conhecer soluções/i })).toHaveAttribute('href', '/pt-BR/servicos');
    expect(screen.getByRole('link', { name: /Ver perfil profissional/i })).toHaveAttribute('href', '/pt-BR/carreira');

    rerender(<AudienceRouter locale="pt-BR" dict={ptBR.audienceRouter} intent="career" />);
    expect(screen.getByRole('link', { name: /Conhecer soluções/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver perfil profissional/i })).toBeInTheDocument();
  });
});
