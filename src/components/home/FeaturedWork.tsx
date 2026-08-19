import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import { getProjects } from '@/content/projects';
import type { Locale } from '@/i18n/config';

interface FeaturedWorkProps {
  locale: Locale;
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
  seeCaseLabel?: string;
}

export default function FeaturedWork({
  locale,
  title = 'PROJETOS EM DESTAQUE',
  subtitle = 'SISTEMAS EM PRODUÇÃO E PRODUTOS REAIS',
  viewAllLabel = 'Ver todos os projetos',
  seeCaseLabel = 'Ver case completo',
}: FeaturedWorkProps) {
  const prefix = `/${locale}`;
  const featuredProjects = getProjects(locale).filter((p) => p.featured);

  return (
    <section className="section py-16 md:py-24" id="projetos" data-section="7" aria-label="Projetos em destaque">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200/80 dark:border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
              {title}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {subtitle}
            </h2>
          </div>

          <Link
            href={`${prefix}/projetos`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-600 dark:text-amber-400 hover:underline shrink-0"
          >
            <span>{viewAllLabel}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Grid de Cards de Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              seeCaseLabel={seeCaseLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
