import React from 'react';
import type { Dictionary } from '@/i18n/types';

interface CareerTimelineProps {
  dict: Dictionary['careerPage'];
}

export default function CareerTimeline({ dict: d }: CareerTimelineProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50/50 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/5" aria-label="Trajetória Profissional">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
            {d.timelineTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {d.timelineSubtitle}
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {d.timeline.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="md:w-1/4">
                <span className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 dark:bg-amber-400/10 text-blue-600 dark:text-amber-400 font-mono text-xs font-bold">
                  {item.period}
                </span>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2">
                  {item.company}
                </p>
              </div>

              <div className="md:w-3/4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.role}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
