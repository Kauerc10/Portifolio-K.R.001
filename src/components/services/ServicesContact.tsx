import React from 'react';
import { MessageSquare } from 'lucide-react';
import ContatoSection from '@/components/sections/ContatoSection';
import { buildWhatsAppUrl } from '@/lib/contact';
import type { Dictionary } from '@/i18n/types';

interface ServicesContactProps {
  dictServices: Dictionary['services'];
  dictContato: Dictionary['contato'];
}

export default function ServicesContact({ dictServices: s, dictContato: c }: ServicesContactProps) {
  const whatsappUrl = buildWhatsAppUrl(s.hero.whatsappMessage);

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-white/[0.01] border-t border-slate-200/80 dark:border-white/5" id="contato" aria-label="Contato Comercial">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-blue-600 dark:bg-amber-400 text-white dark:text-[#070b14] text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            {s.ctaFinalTitle}
          </h2>
          <p className="text-sm sm:text-base opacity-90 max-w-xl mx-auto mb-8 font-sans">
            {s.ctaFinalText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-sm font-bold tracking-wider transition-all shadow-lg hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>{s.ctaWhatsAppFinal}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Formulário Petição / Contato Direto */}
      <ContatoSection dict={c} />
    </section>
  );
}
