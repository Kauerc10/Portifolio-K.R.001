import React from 'react';
import { Download, Linkedin, Github, MessageSquare } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

interface CareerHeroProps {
  dict: Dictionary['careerPage']['hero'];
}

export default function CareerHero({ dict: d }: CareerHeroProps) {
  return (
    <section className="pt-32 pb-14 md:pt-40 md:pb-20" aria-label="Perfil Profissional">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-amber-400/10 border border-blue-500/20 dark:border-amber-400/20 text-blue-600 dark:text-amber-400 font-mono text-[11px] sm:text-xs font-bold tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-amber-400" />
          <span>{d.tag}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-4">
          {d.h1}
        </h1>

        <p className="font-mono text-xs sm:text-sm font-bold text-blue-600 dark:text-amber-400 mb-6">
          {d.subtitle}
        </p>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8 font-sans">
          {d.lead}
        </p>

        {/* CTAs de Carreira */}
        <div className="flex flex-wrap items-center gap-3 justify-start">
          <a
            href="/curriculo_kaue.pdf"
            download
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#070b14] font-mono text-xs font-bold tracking-wider transition-all shadow-md hover:scale-105"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{d.ctaResume}</span>
          </a>

          <a
            href="https://www.linkedin.com/in/kauerc/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-mono text-xs font-bold transition-all"
          >
            <Linkedin className="w-4 h-4 text-[#0A66C2]" aria-hidden="true" />
            <span>{d.ctaLinkedIn}</span>
          </a>

          <a
            href="https://github.com/Kauerc10"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-mono text-xs font-bold transition-all"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>{d.ctaGitHub}</span>
          </a>

          <a
            href="#contato"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold transition-all"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>{d.ctaTalk}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
