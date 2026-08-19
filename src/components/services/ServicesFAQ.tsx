import React from 'react';
import type { Dictionary } from '@/i18n/types';

interface ServicesFAQProps {
  dict: Dictionary['services'];
}

export default function ServicesFAQ({ dict: d }: ServicesFAQProps) {
  return (
    <section className="py-16 md:py-24" id="faq" aria-label="Perguntas Frequentes">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase">
            {d.faqTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {d.faqSubtitle}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {d.faq.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {item.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
