import React from 'react';
import { Award, BrainCircuit, Terminal, ShieldCheck } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

interface EngineeringPositioningProps {
  dict: Dictionary['careerPage'];
}

export default function EngineeringPositioning({ dict: d }: EngineeringPositioningProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50/50 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/5" aria-label="Posicionamento de Engenharia">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
            {d.positioningTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {d.positioningSubtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Coluna de Texto Explicativo */}
          <div className="md:col-span-7 flex flex-col gap-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            <p>{d.positioningP1}</p>
            <p>{d.positioningP2}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200/80 dark:border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <BrainCircuit className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                <span>Decomposição de Problemas</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Terminal className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                <span>Test-Driven Development</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <span>Tolerância Zero a Falhas</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Award className="w-4 h-4 text-purple-500 shrink-0" aria-hidden="true" />
                <span>Base Lógica em Matemática</span>
              </div>
            </div>
          </div>

          {/* Card Destacado: Medalhas OBMEP / IMPA */}
          <div className="md:col-span-5 p-6 sm:p-7 rounded-2xl bg-white dark:bg-white/[0.03] border border-amber-500/30 dark:border-amber-400/20 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block">
                  Destaque Acadêmico
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {d.obmepBadge}
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {d.obmepDetail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
