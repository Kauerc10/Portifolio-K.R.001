'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Copy, Check } from 'lucide-react';

export default function ContatoSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('kaue.ruon@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="section contato" id="contato" data-section="8">
      <div className="section__line"></div>
      <span className="section__article">Petição Final</span>
      <h2 className="section__title" data-cipher>SOLICITAR CONTATO</h2>

      {/* Formulário Principal da Petição */}
      <form className="peticao" id="peticaoForm" action="/api/contato" method="POST">
        <input type="text" name="botcheck" className="sr-only hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="peticao__field">
          <label className="peticao__label">REQUERENTE (seu nome)</label>
          <input type="text" name="nome" className="peticao__input" placeholder="Nome completo" required />
        </div>
        <div className="peticao__field">
          <label className="peticao__label">E-MAIL DE CONTATO</label>
          <input type="email" name="email" className="peticao__input" placeholder="seu@email.com" required />
        </div>
        <div className="peticao__field">
          <label className="peticao__label">OBJETO DO CONTATO (assunto)</label>
          <input type="text" name="assunto" className="peticao__input" placeholder="Ex: proposta de trabalho" required />
        </div>
        <div className="peticao__field">
          <label className="peticao__label">EXPOSIÇÃO DOS FATOS (mensagem)</label>
          <textarea name="mensagem" className="peticao__textarea" rows={5} placeholder="Descreva sua solicitação..." required></textarea>
        </div>
        <button type="submit" className="btn btn--protocolar magnetic" data-cursor="PROTOCOLAR" id="btnProtocolar">
          <span className="btn__text">PROTOCOLAR SOLICITAÇÃO</span>
          <span className="btn__sent">✓ PETIÇÃO PROTOCOLADA</span>
        </button>
        <p className="peticao__feedback" id="peticaoFeedback"></p>
      </form>

      {/* Localização Notarial */}
      <div className="contato__info mt-8 mb-4">
        <span className="contato__link flex items-center justify-center gap-2 text-xs font-mono text-slate-700 dark:text-gray-400 font-medium">
          <MapPin className="w-4 h-4 text-[var(--gold)]" />
          Blumenau / SC — Disponível para atuação remota e projetos globais
        </span>
      </div>

      {/* Cards de Ação Rápida Discretos e Menores (Abaixo da Localização) */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        {/* CARD 1: COPIAR E-MAIL */}
        <button
          type="button"
          onClick={handleCopyEmail}
          className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 hover:border-[var(--gold)]/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer text-xs font-mono text-slate-800 dark:text-gray-300 hover:text-[var(--gold)] shadow-sm"
          title="Copiar E-mail"
        >
          <Mail className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="font-semibold">kaue.ruon@gmail.com</span>
          {copied ? (
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> Copiado!
            </span>
          ) : (
            <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
          )}
        </button>

        {/* CARD 2: LINKEDIN */}
        <a
          href="https://www.linkedin.com/in/kauerc/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
        >
          <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold">LinkedIn ↗</span>
        </a>

        {/* CARD 3: GITHUB */}
        <a
          href="https://github.com/Kauerc10"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-sm"
        >
          <Github className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span className="font-semibold">GitHub ↗</span>
        </a>
      </div>
    </section>
  );
}
