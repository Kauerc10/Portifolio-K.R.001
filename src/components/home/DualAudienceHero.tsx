import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Briefcase, ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface DualAudienceHeroProps {
  locale: Locale;
  dict: Dictionary['dualHero'];
}

export default function DualAudienceHero({ locale, dict: d }: DualAudienceHeroProps) {
  const prefix = `/${locale}`;
  const isEn = locale === 'en-US';

  const typewriterRoles = isEn
    ? [
        'Custom Web Systems & SaaS Platforms.',
        'Generative AI Process Automations.',
        'Zero-Tolerance Engineering & Notarial Rigor.',
        'Next.js 15 · TypeScript · Architecture.',
      ]
    : [
        'Sistemas Web Sob Medida & Plataformas SaaS.',
        'Automações de Processos com IA Generativa.',
        'Rigor Notarial & Tolerância Zero a Erros.',
        'Next.js 15 · TypeScript · Arquitetura.',
      ];

  return (
    <section className="hero section relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-20" id="hero" data-section="1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Jurídico-Notarial / Status de Engenharia */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200/80 dark:border-white/10 font-mono text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200">
              {isEn ? 'KAUÊ RUON CARDOSO · SOFTWARE ARCHITECT' : 'KAUÊ RUON CARDOSO · ARQUITETO DE SOFTWARE'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <span>BLUMENAU / SC</span>
            <span className="text-amber-500 font-bold">§ 001 / 008</span>
          </div>
        </div>

        {/* Tipografia de Assinatura Syne: KAUÊ RUON CARDOSO */}
        <div className="mb-6 select-none" id="heroName">
          <h1 className="flex flex-col tracking-tight leading-[0.92]">
            <span className="font-extrabold text-4xl sm:text-7xl md:text-8xl lg:text-[6.2rem] text-slate-900 dark:text-white uppercase font-sans tracking-tight">
              KAUÊ
            </span>
            <span className="font-extrabold text-4xl sm:text-7xl md:text-8xl lg:text-[6.2rem] text-amber-500 dark:text-[#d4a017] uppercase font-sans tracking-tight">
              RUON
            </span>
            <span
              className="font-extrabold text-4xl sm:text-7xl md:text-8xl lg:text-[6.2rem] text-transparent uppercase font-sans tracking-tight"
              style={{ WebkitTextStroke: '2px currentColor' }}
            >
              <span className="text-slate-800 dark:text-slate-100">CARDOSO</span>
            </span>
          </h1>
        </div>

        {/* Typewriter Dinâmico Autêntico */}
        <div className="hero__typewriter mb-6 font-mono text-sm sm:text-base text-slate-600 dark:text-slate-300 min-h-[1.8rem] flex items-center" id="heroTypewriter">
          <span className="hero__tw-text text-amber-600 dark:text-amber-400 font-semibold" id="twText" data-roles={JSON.stringify(typewriterRoles)}>
            &gt; {d.h1}
          </span>
          <span className="hero__tw-cursor ml-1 text-blue-600 dark:text-amber-400 font-bold animate-pulse">|</span>
        </div>

        {/* Proposta de Valor Comercial & Direta */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8 font-sans">
          {d.supporting}
        </p>

        {/* Botões de Ação Comercial e Portfólio */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-start mb-10">
          <Link
            href={`${prefix}/servicos#contato`}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#070b14] font-mono text-xs sm:text-sm font-bold tracking-wider transition-all shadow-lg shadow-blue-500/20 dark:shadow-amber-400/20 hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>{d.ctaTalk}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <Link
            href={`${prefix}/projetos`}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/5 dark:hover:bg-white/10 border border-slate-700 dark:border-white/15 font-mono text-xs sm:text-sm font-bold tracking-wider transition-all"
          >
            <Briefcase className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <span>{d.ctaWork}</span>
          </Link>

          <Link
            href={`${prefix}/carreira`}
            className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-5 py-3.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-mono text-xs font-bold tracking-wider transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <span>{isEn ? 'TECHNICAL PROFILE & CV' : 'PERFIL TÉCNICO & CV'}</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Pilares de Autoridade e Prova Rápida */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 dark:border-white/10 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium block">
                {isEn ? 'NOTARIAL PRECISION' : 'RIGOR & PRECISÃO NOTARIAL'}
              </span>
              <span className="text-slate-900 dark:text-white font-bold text-xs">
                {isEn ? 'Zero tolerance for defects' : 'Tolerância zero a falhas em produção'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium block">
                {isEn ? 'AI MULTIPLIER' : 'MULTIPLICADOR COM IA'}
              </span>
              <span className="text-slate-900 dark:text-white font-bold text-xs">
                {isEn ? 'Next.js 15 · TypeScript · TDD' : 'Next.js 15 · TypeScript · TDD'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium block">
                {isEn ? 'PRODUCTION PROVEN' : 'SISTEMAS EM PRODUÇÃO'}
              </span>
              <span className="text-slate-900 dark:text-white font-bold text-xs">
                DocFácil · Atlas · CKF · Foli
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
