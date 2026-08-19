import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, GitBranch, ArrowRight, ShieldCheck, Cpu, Building2, CheckCircle2 } from 'lucide-react';
import type { PortfolioProject } from '@/content/projects';
import type { Locale } from '@/i18n/config';

interface ProjectCardProps {
  project: PortfolioProject;
  locale: Locale;
  seeCaseLabel?: string;
  demoLabel?: string;
  repoLabel?: string;
}

export default function ProjectCard({
  project,
  locale,
  seeCaseLabel = 'Ver case completo',
  demoLabel = 'Live Demo',
  repoLabel = 'Repositório',
}: ProjectCardProps) {
  const prefix = `/${locale}`;
  const caseUrl = `${prefix}/projetos/${project.slug}`;

  // Helper de ícone por tipo de projeto
  const getKindIcon = () => {
    switch (project.kind) {
      case 'product':
        return <Cpu className="w-4 h-4 text-emerald-500" aria-hidden="true" />;
      case 'client':
        return <Building2 className="w-4 h-4 text-blue-500" aria-hidden="true" />;
      case 'internal':
        return <ShieldCheck className="w-4 h-4 text-amber-500" aria-hidden="true" />;
      case 'open-source':
        return <CheckCircle2 className="w-4 h-4 text-purple-500" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const mainScreenshot = project.screenshots[0] || {
    src: '/assets/krc-logo-512.webp',
    alt: project.title,
    width: 1200,
    height: 675,
  };

  return (
    <article
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-amber-400/50 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
      id={`card-${project.slug}`}
    >
      <div>
        {/* Screenshot / Mídia Visual com next/image */}
        <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-900/60 overflow-hidden border-b border-slate-200/80 dark:border-white/5">
          <Image
            src={mainScreenshot.src}
            alt={mainScreenshot.alt}
            width={mainScreenshot.width}
            height={mainScreenshot.height}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            priority={project.order <= 2}
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] font-bold tracking-wider">
            {getKindIcon()}
            <span>{project.status}</span>
          </div>
        </div>

        {/* Conteúdo Descritivo & Prova de Valor */}
        <div className="p-6 sm:p-7">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">
            {project.summary}
          </p>

          {/* Capacidades / Tags Principais */}
          <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Capacidades do projeto">
            {project.capabilities.slice(0, 3).map((cap, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-medium"
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Stack Técnica Secundária */}
          <p className="font-mono text-[10px] text-slate-400 dark:text-slate-500 mb-2 truncate">
            <span className="font-bold">Tech:</span> {project.stack.join(' · ')}
          </p>
        </div>
      </div>

      {/* Ações e Links */}
      <div className="px-6 pb-6 pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-white/5">
        <Link
          href={caseUrl}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-600 dark:text-amber-400 hover:underline group-hover:translate-x-0.5 transition-transform"
        >
          <span>{seeCaseLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-2">
          {project.links.map((link, idx) => {
            const isDemo = link.type === 'demo';
            return (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all ${
                  isDemo
                    ? 'bg-blue-50 dark:bg-amber-400/10 text-blue-600 dark:text-amber-400 border border-blue-200 dark:border-amber-400/20 hover:bg-blue-100 dark:hover:bg-amber-400/20'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <span>{link.label}</span>
                {isDemo ? (
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                ) : (
                  <GitBranch className="w-3 h-3" aria-hidden="true" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
