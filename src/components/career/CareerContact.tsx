import React from 'react';
import ContatoSection from '@/components/sections/ContatoSection';
import type { Dictionary } from '@/i18n/types';

interface CareerContactProps {
  dictContato: Dictionary['contato'];
}

export default function CareerContact({ dictContato: c }: CareerContactProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-white/[0.01] border-t border-slate-200/80 dark:border-white/5" id="contato" aria-label="Contato Profissional">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
          OPORTUNIDADES & CONTATO
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-3">
          Vamos conversar sobre engenharia e desafios técnicos?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-sans">
          Aberto a oportunidades profissionais de desenvolvimento full-stack, automações complexas e engenharia de IA.
        </p>
      </div>

      <ContatoSection dict={c} />
    </section>
  );
}
