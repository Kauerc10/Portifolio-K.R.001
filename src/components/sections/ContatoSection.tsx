'use client';

import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import type { Dictionary } from '@/i18n/types';
import { DIRECT_CONTACT_LINKS } from '@/lib/editorial';

const fields = [
  { name: 'nome', type: 'text', label: 'nameLabel', placeholder: 'namePlaceholder', autoComplete: 'name' },
  { name: 'email', type: 'email', label: 'emailLabel', placeholder: 'emailPlaceholder', autoComplete: 'email' },
  { name: 'assunto', type: 'text', label: 'subjectLabel', placeholder: 'subjectPlaceholder', autoComplete: 'off' },
] as const;

type FieldName = (typeof fields)[number]['name'] | 'mensagem';

export default function ContatoSection({ dict }: { dict: Dictionary['contato'] }) {
  const started = useRef(0);
  const inFlight = useRef(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sending, setSending] = useState(false);

  function validateForm(form: HTMLFormElement) {
    const data = new FormData(form);
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) {
      const val = String(data.get(field.name) ?? '').trim();
      if (!val || (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
        nextErrors[field.name] = dict.messages.VALIDATION_ERROR;
      }
    }
    if (!String(data.get('mensagem') ?? '').trim()) {
      nextErrors.mensagem = dict.messages.VALIDATION_ERROR;
    }
    return nextErrors;
  }

  function clearFieldError(name: FieldName) {
    setFieldErrors(prev => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const form = event.currentTarget;
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstInvalid = form.elements.namedItem(Object.keys(errors)[0]);
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      setFeedbackState('error');
      setFeedback(dict.messages.VALIDATION_ERROR);
      return;
    }

    setFieldErrors({});
    inFlight.current = true;
    setSending(true);
    setFeedback('');
    setFeedbackState('idle');

    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, fillTime: started.current ? Date.now() - started.current : undefined }),
      });
      const result = await response.json();
      if (response.ok && result.success === true) {
        setFeedbackState('success');
        setFeedback(dict.messages.SUCCESS);
        form.reset();
        started.current = 0;
      } else {
        const code = result.error;
        setFeedbackState('error');
        setFeedback(typeof code === 'string' && Object.hasOwn(dict.messages, code)
          ? dict.messages[code as keyof typeof dict.messages]
          : dict.messages.INTERNAL_ERROR);
      }
    } catch {
      setFeedbackState('error');
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
          <a href={DIRECT_CONTACT_LINKS.email}><Mail aria-hidden="true" />{dict.emailLabel}</a>
          <a href={DIRECT_CONTACT_LINKS.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" />LinkedIn</a>
          <a href={DIRECT_CONTACT_LINKS.github} target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" />GitHub</a>
        </nav>
      </div>
      <form
        className="contact-editorial__form"
        method="post"
        action="/api/contato"
        noValidate
        onSubmit={submit}
        onFocusCapture={() => { if (!started.current) started.current = Date.now(); }}
        aria-busy={sending}
      >
        <input type="text" name="botcheck" hidden autoComplete="off" tabIndex={-1} />
        {fields.map(field => (
          <label key={field.name} htmlFor={field.name}>
            {dict[field.label]}
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={dict[field.placeholder]}
              aria-invalid={Boolean(fieldErrors[field.name]) || undefined}
              aria-describedby={fieldErrors[field.name] ? `${field.name}-error` : undefined}
              onChange={() => clearFieldError(field.name)}
              required
            />
            {fieldErrors[field.name] && (
              <span id={`${field.name}-error`} className="contact-editorial__field-error">
                {fieldErrors[field.name]}
              </span>
            )}
          </label>
        ))}
        <label htmlFor="mensagem">
          {dict.messageLabel}
          <textarea
            id="mensagem"
            name="mensagem"
            rows={5}
            placeholder={dict.messagePlaceholder}
            aria-invalid={Boolean(fieldErrors.mensagem) || undefined}
            aria-describedby={fieldErrors.mensagem ? 'mensagem-error' : undefined}
            onChange={() => clearFieldError('mensagem')}
            required
          />
          {fieldErrors.mensagem && (
            <span id="mensagem-error" className="contact-editorial__field-error">
              {fieldErrors.mensagem}
            </span>
          )}
        </label>
        <button type="submit" disabled={sending}>{sending ? dict.btnSubmitting : dict.btnSubmit}<ArrowUpRight size={16} aria-hidden="true" /></button>
        <p className="contact-editorial__feedback" data-state={feedbackState} role="status">{feedback}</p>
      </form>
    </section>
  );
}
