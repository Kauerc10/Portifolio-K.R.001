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

      {/* Cards de Ação Rápida Notariais */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        {/* CARD 1: COPIAR E-MAIL */}
        <button
          type="button"
          onClick={handleCopyEmail}
          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--gold)] transition-all duration-300 flex items-center justify-between group cursor-pointer text-left shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-mono block uppercase tracking-wider">E-MAIL OFICIAL</span>
              <span className="text-xs font-mono font-bold text-white group-hover:text-[var(--gold)] transition-colors">
                kaue.ruon@gmail.com
              </span>
            </div>
          </div>
          <div className="text-[var(--gold)] p-1.5 rounded-lg bg-white/5 border border-white/10">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </div>
        </button>

        {/* CARD 2: LINKEDIN */}
        <a
          href="https://www.linkedin.com/in/kauerc/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--gold)] transition-all duration-300 flex items-center gap-3 group shadow-md"
        >
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
            <Linkedin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-mono block uppercase tracking-wider">LINKEDIN</span>
            <span className="text-xs font-mono font-bold text-white group-hover:text-[var(--gold)] transition-colors">
              linkedin.com/in/kauerc ↗
            </span>
          </div>
        </a>

        {/* CARD 3: GITHUB */}
        <a
          href="https://github.com/Kauerc10"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--gold)] transition-all duration-300 flex items-center gap-3 group shadow-md"
        >
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
            <Github className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-mono block uppercase tracking-wider">GITHUB REPOS</span>
            <span className="text-xs font-mono font-bold text-white group-hover:text-[var(--gold)] transition-colors">
              github.com/Kauerc10 ↗
            </span>
          </div>
        </a>
      </div>

      <form className="peticao" id="peticaoForm" action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
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

      <div className="contato__info mt-8">
        <span className="contato__link flex items-center gap-2 text-xs font-mono text-gray-400">
          <MapPin className="w-4 h-4 text-[var(--gold)]" />
          Blumenau / SC — Disponível para atuação remota e projetos globais
        </span>
      </div>
    </section>
  );
}
