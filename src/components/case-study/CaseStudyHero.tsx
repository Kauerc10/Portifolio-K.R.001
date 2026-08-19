import React from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Building, Calendar, Layers } from 'lucide-react';
import type { PortfolioProject } from '@/content/projects';
import type { Locale } from '@/i18n/config';

interface CaseStudyHeroProps {
  project: PortfolioProject;
  locale: Locale;
}

export default function CaseStudyHero({ project, locale }: CaseStudyHeroProps) {
  const prefix = `/${locale}`;

  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16" aria-label="Apresentação do Case">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Link de Retorno */}
        <Link
          href={`${prefix}/projetos`}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-600 dark:text-amber-400 hover:underline mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>Voltar para todos os projetos</span>
        </Link>

        {/* Badges de Status e Tipo */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 dark:bg-amber-400/10 text-blue-600 dark:text-amber-400 font-mono text-[11px] font-bold tracking-wider">
            {project.status}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-bold uppercase">
            {project.kind}
          </span>
        </div>

        {/* Título Principal do Case */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
          {project.title}
        </h1>

        {/* Resumo Impactante */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8 font-sans">
          {project.summary}
        </p>

        {/* Ficha Técnica Rápida */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 font-mono text-xs">
          <div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mb-1">
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Papel</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white block truncate">{project.role}</span>
          </div>

          <div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mb-1">
              <Building className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Contexto</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white block truncate">{project.client || 'Produto / SaaS'}</span>
          </div>

          <div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mb-1">
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Stack</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white block truncate">{project.stack[0]} + {project.stack.length - 1}</span>
          </div>

          <div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Audiência</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white block uppercase">{project.audience}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
