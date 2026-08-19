import React from 'react';
import Link from 'next/link';
import { Building2, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
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
  const isEn = locale === 'en-US';

  const isBusinessIntent = intent === 'business';
  const isCareerIntent = intent === 'career';

  return (
    <section className="section py-12 md:py-16" id="audience-router" aria-label="Escolha seu objetivo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
            {d.title}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            {d.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Clientes & Empresas */}
          <div
            className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-[#0c1220]/90 backdrop-blur-md border transition-all duration-300 shadow-sm hover:shadow-md ${
              isBusinessIntent
                ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-amber-400 dark:ring-amber-400/20'
                : 'border-slate-200/90 dark:border-white/10 hover:border-blue-500/60 dark:hover:border-amber-400/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 dark:bg-amber-400/10 text-blue-700 dark:text-amber-300 font-mono text-[11px] font-bold tracking-wider">
                  {d.business.tag}
                </span>
                <div className="w-9 h-9 rounded-xl grid place-items-center bg-blue-500/10 dark:bg-amber-400/10 text-blue-600 dark:text-amber-400">
                  <Building2 className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                {d.business.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                {d.business.text}
              </p>

              {/* Entregáveis Comerciais */}
              <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 dark:border-white/5 font-sans text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isEn ? 'High-speed custom websites & landing pages' : 'Sites institucionais e páginas de alta conversão'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isEn ? 'Custom web systems & business dashboards' : 'Sistemas web sob medida e painéis de gestão'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isEn ? 'Intelligent process automations with AI' : 'Automação inteligente de processos e rotinas com IA'}</span>
                </div>
              </div>
            </div>

            <Link
              href={`${prefix}/servicos`}
              className="flex items-center justify-between min-h-[44px] px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#070b14] font-mono text-xs font-bold tracking-wider transition-all group-hover:shadow-md"
            >
              <span>{d.business.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 2: Recrutadores & Tech Leads */}
          <div
            className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-[#0c1220]/90 backdrop-blur-md border transition-all duration-300 shadow-sm hover:shadow-md ${
              isCareerIntent
                ? 'border-blue-500 ring-2 ring-blue-500/20 dark:border-amber-400 dark:ring-amber-400/20'
                : 'border-slate-200/90 dark:border-white/10 hover:border-purple-500/60 dark:hover:border-purple-400/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg bg-purple-500/10 dark:bg-purple-400/10 text-purple-700 dark:text-purple-300 font-mono text-[11px] font-bold tracking-wider">
                  {d.career.tag}
                </span>
                <div className="w-9 h-9 rounded-xl grid place-items-center bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400">
                  <Code2 className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                {d.career.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                {d.career.text}
              </p>

              {/* Destaques de Engenharia */}
              <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 dark:border-white/5 font-sans text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>{isEn ? 'Full-stack Next.js 15, TypeScript & React' : 'Full-stack Next.js 15, TypeScript & React'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>{isEn ? 'Generative AI provider architecture & RAG' : 'Arquitetura agnóstica de IA, streaming e RAG'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>{isEn ? 'OBMEP Silver & Bronze Math Medals (IMPA)' : 'Medalhas Prata e Bronze na OBMEP / IMPA'}</span>
                </div>
              </div>
            </div>

            <Link
              href={`${prefix}/carreira`}
              className="flex items-center justify-between min-h-[44px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/20 font-mono text-xs font-bold tracking-wider transition-all group-hover:shadow-md"
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
