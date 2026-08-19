import React from 'react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

interface ResumeDownloadCardProps {
  dict: Dictionary['careerPage'];
}

export default function ResumeDownloadCard({ dict: d }: ResumeDownloadCardProps) {
  return (
    <section className="py-16 md:py-20" aria-label="Currículo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-2">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>CURRICULUM VITAE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              {d.resumeTitle}
            </h2>
            <p className="text-sm text-slate-300 max-w-lg leading-relaxed font-sans mb-4">
              {d.resumeDescription}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>Atualizado 2026</span>
              </span>
              <span>·</span>
              <span>Formato PDF</span>
              <span>·</span>
              <span>1 Página</span>
            </div>
          </div>

          <a
            href="/curriculo_kaue.pdf"
            download
            className="shrink-0 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-wider transition-all shadow-lg hover:scale-105"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{d.resumeButton}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
