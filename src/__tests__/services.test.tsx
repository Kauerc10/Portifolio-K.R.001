import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import ServicePillars from '@/components/services/ServicePillars';
import WorkProcess from '@/components/services/WorkProcess';
import ServicesFAQ from '@/components/services/ServicesFAQ';
import { buildWhatsAppUrl } from '@/lib/contact';
import ptBR from '@/i18n/locales/pt-BR.json';

describe('Área Comercial /servicos (Task 6)', () => {
  it('deve gerar URL do WhatsApp codificada corretamente', () => {
    const msg = 'Olá, Kauê! Quero um orçamento.';
    const url = buildWhatsAppUrl(msg);
    expect(url).toContain('https://wa.me/5547991370418?text=');
    expect(url).toContain(encodeURIComponent(msg));
  });

  it('deve renderizar o ServicesHero com H1 e CTA do WhatsApp', () => {
    render(<ServicesHero dict={ptBR.services.hero} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(ptBR.services.hero.h1);
    const waLink = screen.getByRole('link', { name: /Conversar no WhatsApp/i });
    expect(waLink).toHaveAttribute('href');
    expect(waLink.getAttribute('href')).toContain('https://wa.me/5547991370418');
  });

  it('deve renderizar os 3 pilares de serviço com seus respectivos entregáveis', () => {
    render(<ServicePillars dict={ptBR.services} />);

    expect(screen.getByRole('heading', { level: 3, name: /Sites & Presença Digital/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Sistemas Web Sob Medida/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Automações & IA Aplicada/i })).toBeInTheDocument();

    expect(screen.getByText(/Landing pages de alta conversão/i)).toBeInTheDocument();
    expect(screen.getByText(/Painéis de gestão interna e dashboards/i)).toBeInTheDocument();
  });

  it('deve renderizar os 6 passos estruturados do processo de trabalho', () => {
    render(<WorkProcess dict={ptBR.services} />);

    expect(screen.getByRole('heading', { level: 3, name: /Entender/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Planejar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Construir/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Validar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Entregar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Evoluir/i })).toBeInTheDocument();
  });

  it('deve renderizar o FAQ sem tabela de preços', () => {
    render(<ServicesFAQ dict={ptBR.services} />);

    expect(screen.getByText(/Como funciona o início de um projeto\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Qual é o prazo médio de entrega\?/i)).toBeInTheDocument();
  });
});
