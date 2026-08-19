import React from 'react';
import type { Dictionary } from '@/i18n/types';

interface TechStackMatrixProps {
  dict: Dictionary['careerPage'];
}

export default function TechStackMatrix({ dict: d }: TechStackMatrixProps) {
  return (
    <section className="py-16 md:py-20" aria-label="Matriz de Tecnologias">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
            {d.stackTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {d.stackSubtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {d.stackGroups.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200/80 dark:border-white/10 font-mono">
                  {group.category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 dark:bg-amber-400/60" />
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
