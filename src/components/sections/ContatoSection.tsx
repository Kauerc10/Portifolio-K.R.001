'use client';

import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import type { Dictionary } from '@/i18n/types';

const fields = [
  { name: 'nome', type: 'text', label: 'nameLabel', placeholder: 'namePlaceholder', autoComplete: 'name' },
  { name: 'email', type: 'email', label: 'emailLabel', placeholder: 'emailPlaceholder', autoComplete: 'email' },
  { name: 'assunto', type: 'text', label: 'subjectLabel', placeholder: 'subjectPlaceholder', autoComplete: 'off' },
] as const;

export default function ContatoSection({ dict }: { dict: Dictionary['contato'] }) {
  const started = useRef(0);
  const inFlight = useRef(false);
  const [feedback, setFeedback] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setSending(true);
    setFeedback('');

    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, fillTime: started.current ? Date.now() - started.current : undefined }),
      });
      const result = await response.json();
      if (response.ok && result.success === true) {
        setFeedback(dict.messages.SUCCESS);
        form.reset();
        started.current = 0;
      } else {
        const code = result.error;
        setFeedback(typeof code === 'string' && Object.hasOwn(dict.messages, code)
          ? dict.messages[code as keyof typeof dict.messages]
          : dict.messages.INTERNAL_ERROR);
      }
    } catch {
      setFeedback(dict.messages.INTERNAL_ERROR);
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return (
    <section className="section editorial-section contact-editorial" id="contato" data-section="8">
      <div className="contact-editorial__copy">
        <span className="editorial-kicker">{dict.editorialLabel}</span>
        <h2 className="editorial-display">{dict.editorialTitle}{' '}<em>{dict.editorialAccent}</em></h2>
        <p>{dict.editorialDescription}</p>
        <nav className="contact-editorial__links" aria-label={dict.fastContact.title}>
          <a href="mailto:kaue.ruon@gmail.com"><Mail aria-hidden="true" />{dict.emailLabel}</a>
          <a href="https://www.linkedin.com/in/kauerc/" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" />LinkedIn</a>
          <a href="https://github.com/Kauerc10" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" />GitHub</a>
        </nav>
      </div>
      <form
        className="contact-editorial__form"
        method="post"
        action="/api/contato"
        onSubmit={submit}
        onFocusCapture={() => { if (!started.current) started.current = Date.now(); }}
        aria-busy={sending}
      >
        <input type="text" name="botcheck" hidden autoComplete="off" tabIndex={-1} />
        {fields.map(field => (
          <label key={field.name} htmlFor={field.name}>
            {dict[field.label]}
            <input id={field.name} name={field.name} type={field.type} autoComplete={field.autoComplete} placeholder={dict[field.placeholder]} required />
          </label>
        ))}
        <label htmlFor="mensagem">
          {dict.messageLabel}
          <textarea id="mensagem" name="mensagem" rows={5} placeholder={dict.messagePlaceholder} required />
        </label>
        <button type="submit" disabled={sending}>{sending ? dict.btnSubmitting : dict.btnSubmit}<ArrowUpRight size={16} aria-hidden="true" /></button>
        <p className="contact-editorial__feedback" role="status">{feedback}</p>
      </form>
    </section>
  );
}
