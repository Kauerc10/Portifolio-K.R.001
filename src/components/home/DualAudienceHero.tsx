import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Briefcase } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface DualAudienceHeroProps {
  locale: Locale;
  dict: Dictionary['dualHero'];
}

export default function DualAudienceHero({ locale, dict: d }: DualAudienceHeroProps) {
  const prefix = `/${locale}`;

  return (
    <section className="hero section pt-32 pb-16 md:pt-40 md:pb-24" id="hero" data-section="1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        {/* Context line / Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-amber-400/10 border border-blue-500/20 dark:border-amber-400/20 text-blue-600 dark:text-amber-400 font-mono text-[11px] sm:text-xs font-bold tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-amber-400 animate-pulse" />
          <span>{d.contextLine}</span>
        </div>

        {/* H1 Principal com Tipografia Editorial Forte */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
          {d.h1}
        </h1>

        {/* Parágrafo de Apoio Claro e Direto */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8">
          {d.supporting}
        </p>

        {/* CTAs Principais Dual-Audience */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-start mb-12">
          <Link
            href={`${prefix}/servicos#contato`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#070b14] font-mono text-sm font-bold tracking-wider transition-all shadow-lg shadow-blue-500/25 dark:shadow-amber-400/20 hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>{d.ctaTalk}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <Link
            href={`${prefix}/projetos`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-mono text-sm font-bold tracking-wider transition-all hover:border-amber-500/40"
          >
            <Briefcase className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            <span>{d.ctaWork}</span>
          </Link>
        </div>

        {/* Highlights de Prova Rápida */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 dark:border-white/10 font-mono text-xs">
          {d.proofHighlights.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-0.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5"
            >
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">{item.label}</span>
              <span className="text-slate-900 dark:text-white font-bold">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
