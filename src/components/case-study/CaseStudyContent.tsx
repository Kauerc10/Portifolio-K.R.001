import React from 'react';
import { AlertCircle, CheckCircle, Cpu, Check } from 'lucide-react';
import type { PortfolioProject } from '@/content/projects';

interface CaseStudyContentProps {
  project: PortfolioProject;
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
  return (
    <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Detalhes do Problema e Solução">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Bloco 1: O Problema */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase mb-4">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              <span>O Desafio / Gargalo</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Contexto do Problema
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {project.problem}
            </p>
          </div>
        </div>

        {/* Bloco 2: A Solução */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs font-bold uppercase mb-4">
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              <span>A Solução Desenvolvida</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Engenharia & Arquitetura
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Bloco 3: Capacidades & Entregáveis */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 mb-12">
        <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase mb-4">
          <Cpu className="w-4 h-4" aria-hidden="true" />
          <span>Capacidades Entregues</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Funcionalidades em Produção
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5"
            >
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-slate-800 dark:text-slate-200 font-medium font-sans">
                {cap}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bloco 4: Stack Técnica Completa */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5">
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-bold block mb-3 uppercase tracking-wider">
          Tecnologias Utilizadas:
        </span>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
