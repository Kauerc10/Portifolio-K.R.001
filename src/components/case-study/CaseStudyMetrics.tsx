import React from 'react';
import type { ProjectMetric } from '@/content/projects';

interface CaseStudyMetricsProps {
  metrics: ProjectMetric[];
}

export default function CaseStudyMetrics({ metrics }: CaseStudyMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="py-8 border-y border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]" aria-label="Métricas e Impacto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-center sm:text-left"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-amber-400 font-mono block mb-1">
                {metric.value}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {metric.label}
              </h3>
              {metric.source && (
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Fonte: {metric.source}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
