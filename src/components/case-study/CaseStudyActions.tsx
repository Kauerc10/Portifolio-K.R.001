import React from 'react';
import Link from 'next/link';
import { ExternalLink, GitBranch, MessageSquare, ArrowLeft } from 'lucide-react';
import type { PortfolioProject } from '@/content/projects';
import type { Locale } from '@/i18n/config';

interface CaseStudyActionsProps {
  project: PortfolioProject;
  locale: Locale;
}

export default function CaseStudyActions({ project, locale }: CaseStudyActionsProps) {
  const prefix = `/${locale}`;

  return (
    <section className="py-14 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]" aria-label="Ações do Case">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          href={`${prefix}/projetos`}
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Ver outros projetos</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          {project.links.map((link, idx) => {
            const isDemo = link.type === 'demo';
            return (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all shadow-md ${
                  isDemo
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#070b14]'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{link.label}</span>
                {isDemo ? (
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <GitBranch className="w-4 h-4" aria-hidden="true" />
                )}
              </a>
            );
          })}

          <Link
            href={`${prefix}/servicos#contato`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-mono text-xs font-bold transition-all"
          >
            <MessageSquare className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            <span>Discutir projeto similar</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
