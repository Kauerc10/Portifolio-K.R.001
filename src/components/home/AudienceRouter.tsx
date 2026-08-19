import React from 'react';
import Link from 'next/link';
import { Building2, Code2, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import type { VisitorIntent } from '@/lib/intent';

interface AudienceRouterProps {
  locale: Locale;
  dict: Dictionary['audienceRouter'];
  intent?: VisitorIntent;
}

export default function AudienceRouter({ locale, dict: d, intent }: AudienceRouterProps) {
  const prefix = `/${locale}`;

  const isBusinessIntent = intent === 'business';
  const isCareerIntent = intent === 'career';

  return (
    <section className="section py-16 md:py-20" id="audience-router" aria-label="Escolha seu objetivo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
            {d.title}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {d.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Clientes & Negócios */}
          <div
            className={`flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border transition-all duration-300 shadow-md ${
              isBusinessIntent
                ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-amber-400 dark:ring-amber-400/20'
                : 'border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-amber-400/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold tracking-wider">
                  {d.business.tag}
                </span>
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                {d.business.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                {d.business.text}
              </p>
            </div>

            <Link
              href={`${prefix}/servicos`}
              className="flex items-center justify-between px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white font-mono text-xs font-bold tracking-wider transition-all group"
            >
              <span>{d.business.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 2: Recrutadores & Tech Leads */}
          <div
            className={`flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border transition-all duration-300 shadow-md ${
              isCareerIntent
                ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-amber-400 dark:ring-amber-400/20'
                : 'border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-amber-400/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 font-mono text-[11px] font-bold tracking-wider">
                  {d.career.tag}
                </span>
                <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                {d.career.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                {d.career.text}
              </p>
            </div>

            <Link
              href={`${prefix}/carreira`}
              className="flex items-center justify-between px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white font-mono text-xs font-bold tracking-wider transition-all group"
            >
              <span>{d.career.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
