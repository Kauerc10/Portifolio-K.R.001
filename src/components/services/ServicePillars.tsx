import React from 'react';
import { Globe, LayoutGrid, Sparkles, Check } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

interface ServicePillarsProps {
  dict: Dictionary['services'];
}

export default function ServicePillars({ dict: d }: ServicePillarsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'sites':
        return <Globe className="w-6 h-6 text-blue-500" aria-hidden="true" />;
      case 'sistemas':
        return <LayoutGrid className="w-6 h-6 text-emerald-500" aria-hidden="true" />;
      case 'automacoes':
        return <Sparkles className="w-6 h-6 text-amber-500" aria-hidden="true" />;
      default:
        return <Globe className="w-6 h-6 text-blue-500" aria-hidden="true" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/5" id="pilares" aria-label="Pilares de Serviços">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
            {d.pillarsTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {d.pillarsSubtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {d.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6">
                  {getIcon(pillar.id)}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="font-mono text-xs text-blue-600 dark:text-amber-400 font-bold mb-4">
                  {pillar.tagline}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                  {pillar.description}
                </p>
              </div>

              {/* Lista de Entregáveis */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
                  Entregáveis típicos:
                </span>
                <ul className="flex flex-col gap-2">
                  {pillar.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
