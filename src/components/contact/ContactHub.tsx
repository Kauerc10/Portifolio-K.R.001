import React from 'react';
import ContextualWhatsAppButton from './ContextualWhatsAppButton';
import ContatoSection from '@/components/sections/ContatoSection';
import type { Dictionary } from '@/i18n/types';

interface ContactHubProps {
  dict: Dictionary['contato'];
  whatsappMessage?: string;
  whatsappLabel?: string;
  context?: 'home' | 'services' | 'career';
}

export default function ContactHub({
  dict,
  whatsappMessage = 'Olá, Kauê! Acessei seu portfólio e gostaria de conversar.',
  whatsappLabel = 'Conversar no WhatsApp',
  context = 'home',
}: ContactHubProps) {
  return (
    <section className="contact-hub" id="contato" aria-label="Central de Contato">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-400/5 border border-emerald-500/20 dark:border-emerald-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              Atendimento Direto & Rápido
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans mt-0.5">
              Prefere retorno ágil? Fale diretamente comigo pelo WhatsApp.
            </p>
          </div>

          <ContextualWhatsAppButton
            message={whatsappMessage}
            label={whatsappLabel}
            variant="primary"
          />
        </div>
      </div>

      {/* Formulário Petição Notarial */}
      <ContatoSection dict={dict} />
    </section>
  );
}
