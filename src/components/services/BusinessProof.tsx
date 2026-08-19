import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import { getProjects } from '@/content/projects';
import type { Locale } from '@/i18n/config';

interface BusinessProofProps {
  locale: Locale;
}

export default function BusinessProof({ locale }: BusinessProofProps) {
  const prefix = `/${locale}`;
  // Seleciona projetos orientados a negócios ou ambos
  const businessProjects = getProjects(locale).filter(
    (p) => p.audience === 'business' || p.audience === 'both'
  );

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/5" aria-label="Projetos e Resultados para Empresas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-slate-200/80 dark:border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
              PROJETOS REAIS EM PRODUÇÃO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Casos de Sucesso e Automação
            </h2>
          </div>

          <Link
            href={`${prefix}/projetos`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-600 dark:text-amber-400 hover:underline shrink-0"
          >
            <span>Ver todos os projetos</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {businessProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              seeCaseLabel="Ver detalhes do case"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
