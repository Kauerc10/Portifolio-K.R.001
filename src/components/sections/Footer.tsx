'use client';

import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import type { MouseEvent } from 'react';
import type { Dictionary } from '@/i18n/types';

export default function Footer({ dict }: { dict: Dictionary['footer'] }) {
  function returnToTop(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    document.querySelector<HTMLElement>('#hero h1')?.focus({ preventScroll: true });
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
  }

  return (
    <footer className="editorial-section footer-editorial" id="rodape">
      <div className="footer-editorial__brand">kauê<span>ruon</span></div>
      <nav className="footer-editorial__channels" aria-label={dict.channelsLabel}>
        <a href="mailto:kaue.ruon@gmail.com"><Mail aria-hidden="true" />{dict.email}</a>
        <a href="https://www.linkedin.com/in/kauerc/" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" />LinkedIn</a>
        <a href="https://github.com/Kauerc10" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" />GitHub</a>
      </nav>
      <a className="footer-editorial__top" href="#hero" onClick={returnToTop}>{dict.topLabel}<ArrowUpRight aria-hidden="true" /></a>
      <p>{dict.copyright}</p>
    </footer>
  );
}
