import React from 'react';
import { ArrowRight, MessageSquare, FileCode } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/contact';
import type { Dictionary } from '@/i18n/types';

interface ServicesHeroProps {
  dict: Dictionary['services']['hero'];
}

export default function ServicesHero({ dict: d }: ServicesHeroProps) {
  const whatsappUrl = buildWhatsAppUrl(d.whatsappMessage);

  return (
    <section className="pt-32 pb-14 md:pt-40 md:pb-20 text-center md:text-left" aria-label="Apresentação de Serviços">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-amber-400/10 border border-blue-500/20 dark:border-amber-400/20 text-blue-600 dark:text-amber-400 font-mono text-[11px] sm:text-xs font-bold tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-amber-400" />
          <span>{d.tag}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
          {d.h1}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8">
          {d.supporting}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-start">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-sm font-bold tracking-wider transition-all shadow-lg shadow-emerald-600/25 hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>{d.ctaWhatsApp}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href="#contato"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-mono text-sm font-bold tracking-wider transition-all"
          >
            <FileCode className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            <span>{d.ctaForm}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
