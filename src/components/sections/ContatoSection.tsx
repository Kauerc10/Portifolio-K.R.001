'use client';

import { MapPin } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

export default function ContatoSection({ dict: d }: { dict: Dictionary['contato'] }) {
  return (
    <section className="section contato" id="contato" data-section="8">
      <div className="section__line" />
      <span className="section__article">Petição Final</span>
      <h2 className="section__title">{d.title}</h2>

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

    </section>
  );
}
