import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ContextualWhatsAppButton from '@/components/contact/ContextualWhatsAppButton';
import ContactHub from '@/components/contact/ContactHub';
import { buildWhatsAppUrl } from '@/lib/contact';
import ptBR from '@/i18n/locales/pt-BR.json';

describe('Central de Contato & WhatsApp Contextual (Task 10)', () => {
  it('deve gerar URLs do WhatsApp específicas para cada contexto', () => {
    const homeMsg = 'Olá, Kauê! Acessei seu portfólio e gostaria de conversar.';
    const servicesMsg = 'Olá, Kauê! Vi seus serviços e gostaria de explicar uma necessidade da minha empresa.';
    const careerMsg = 'Olá, Kauê! Gostei do seu perfil técnico e gostaria de conversar sobre uma oportunidade.';

    expect(buildWhatsAppUrl(homeMsg)).toContain(encodeURIComponent(homeMsg));
    expect(buildWhatsAppUrl(servicesMsg)).toContain(encodeURIComponent(servicesMsg));
    expect(buildWhatsAppUrl(careerMsg)).toContain(encodeURIComponent(careerMsg));
  });

  it('deve renderizar o ContextualWhatsAppButton com touch target e mensagem codificada', () => {
    render(
      <ContextualWhatsAppButton
        message="Mensagem de teste"
        label="Falar agora"
      />
    );

    const btn = screen.getByRole('link', { name: /Falar agora/i });
    expect(btn).toHaveAttribute('href');
    expect(btn.getAttribute('href')).toContain('https://wa.me/5547991370418?text=Mensagem%20de%20teste');
    expect(btn.className).toContain('min-h-[48px]');
  });

  it('deve renderizar o ContactHub com o botão de WhatsApp e o formulário de petição com honeypot', () => {
    const { container } = render(<ContactHub dict={ptBR.contato} />);

    expect(screen.getByRole('link', { name: /Conversar no WhatsApp/i })).toBeInTheDocument();

    const form = container.querySelector('#peticaoForm');
    expect(form).toBeInTheDocument();

    const honeypot = container.querySelector('input[name="botcheck"]');
    expect(honeypot).toBeInTheDocument();
  });
});
