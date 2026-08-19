import React from 'react';
import type { Dictionary } from '@/i18n/types';

interface WorkProcessProps {
  dict: Dictionary['services'];
}

export default function WorkProcess({ dict: d }: WorkProcessProps) {
  return (
    <section className="py-16 md:py-24" id="processo" aria-label="Processo de Trabalho">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
            {d.processTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-4">
            {d.processSubtitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            {d.processLead}
          </p>
        </div>

        {/* Grid de 6 Passos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-black text-blue-600/30 dark:text-amber-400/30">
                  {step.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500/40 dark:bg-amber-400/40" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
