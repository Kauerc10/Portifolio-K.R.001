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
      <form className="peticao" id="peticaoForm" action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="b5f3a417-aca9-47ab-b4db-05670020c989" />
        <input type="checkbox" name="botcheck" className="peticao__honeypot" tabIndex={-1} autoComplete="off" />

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
        <span className="contato__link flex items-center justify-center gap-2 text-xs font-mono text-gray-400">
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
          className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 dark:bg-white/5 border border-white/10 hover:border-[var(--gold)]/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer text-xs font-mono text-gray-300 hover:text-[var(--gold)] shadow-sm"
          title="Copiar E-mail"
        >
          <Mail className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="font-medium">kaue.ruon@gmail.com</span>
          {copied ? (
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
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
          className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 dark:bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-blue-400 shadow-sm"
        >
          <Linkedin className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium">LinkedIn ↗</span>
        </a>

        {/* CARD 3: GITHUB */}
        <a
          href="https://github.com/Kauerc10"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 dark:bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-purple-400 shadow-sm"
        >
          <Github className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-medium">GitHub ↗</span>
        </a>
      </div>
    </section>
  );
}
