'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Copy, Check } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

export default function ContatoSection({ dict: d }: { dict: Dictionary['contato'] }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('kaue.ruon@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="section contato" id="contato" data-section="8">
      <div className="section__line" />
      <span className="section__article">Petição Final</span>
      <h2 className="section__title" data-cipher>{d.title}</h2>

      {/* Formulário Principal da Petição */}
      <form className="peticao" id="peticaoForm" action="/api/contato" method="POST" data-messages={JSON.stringify(d.messages)}>
        <input type="text" name="botcheck" className="sr-only hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="peticao__field">
          <label className="peticao__label">{d.nameLabel}</label>
          <input type="text" name="nome" className="peticao__input" placeholder={d.namePlaceholder} required />
        </div>
        <div className="peticao__field">
          <label className="peticao__label">{d.emailLabel}</label>
          <input type="email" name="email" className="peticao__input" placeholder={d.emailPlaceholder} required />
        </div>
        <div className="peticao__field">
          <label className="peticao__label">{d.subjectLabel}</label>
          <input type="text" name="assunto" className="peticao__input" placeholder={d.subjectPlaceholder} required />
        </div>
        <div className="peticao__field">
          <label className="peticao__label">{d.messageLabel}</label>
          <textarea name="mensagem" className="peticao__textarea" rows={5} placeholder={d.messagePlaceholder} required />
        </div>
        <button type="submit" className="btn btn--protocolar magnetic" data-cursor="PROTOCOLAR" id="btnProtocolar">
          <span className="btn__text">{d.btnSubmit}</span>
          <span className="btn__sent">✓ {d.btnSubmit}</span>
        </button>
        <p className="peticao__feedback" id="peticaoFeedback" />
      </form>

      {/* Localização Notarial */}
      <div className="contato__info mt-8 mb-4">
        <span className="contato__link flex items-center justify-center gap-2 text-xs font-mono text-slate-700 dark:text-gray-400 font-medium">
          <MapPin className="w-4 h-4 text-[var(--gold)]" />
          {d.location}
        </span>
      </div>

      {/* Cards de Ação Rápida */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <button
          type="button"
          onClick={handleCopyEmail}
          className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 hover:border-[var(--gold)]/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer text-xs font-mono text-slate-800 dark:text-gray-300 hover:text-[var(--gold)] shadow-sm"
          title={d.fastContact.emailTitle}
        >
          <Mail className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="font-semibold">kaue.ruon@gmail.com</span>
          {copied ? (
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> {d.copied}
            </span>
          ) : (
            <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
          )}
        </button>

        <a
          href="https://www.linkedin.com/in/kauerc/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
        >
          <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold">{d.fastContact.linkedinTitle} ↗</span>
        </a>

        <a
          href="https://github.com/Kauerc10"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-sm"
        >
          <Github className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span className="font-semibold">{d.fastContact.githubTitle} ↗</span>
        </a>
      </div>
    </section>
  );
}
