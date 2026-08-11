'use client';

import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

export default function Footer({ dict: d }: { dict: Dictionary['footer'] }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('kaue.ruon@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <footer className="footer">
      <nav className="footer__channels" aria-label={d.channelsLabel}>
        <button type="button" onClick={handleCopyEmail} className="footer__channel" aria-label={d.emailLabel}>
          <Mail aria-hidden="true" />
          <span>{copied ? d.copied : d.email}</span>
          {copied ? <Check aria-hidden="true" /> : <Copy className="footer__channel-action" aria-hidden="true" />}
        </button>
        <a href="https://www.linkedin.com/in/kauerc/" target="_blank" rel="noopener noreferrer" className="footer__channel">
          <Linkedin aria-hidden="true" />
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/Kauerc10" target="_blank" rel="noopener noreferrer" className="footer__channel">
          <Github aria-hidden="true" />
          <span>GitHub</span>
        </a>
      </nav>
      <p className="text-[11px] text-slate-500 font-mono mt-1">{d.copyright}</p>
    </footer>
  );
}
