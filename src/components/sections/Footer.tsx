'use client';

import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef, type MouseEvent } from 'react';
import type { Dictionary } from '@/i18n/types';
import { DIRECT_CONTACT_LINKS } from '@/lib/editorial';

export default function Footer({ dict }: { dict: Dictionary['footer'] }) {
  const pendingTop = useRef(false);

  useEffect(() => {
    let frame = 0;
    const hero = () => document.querySelector<HTMLElement>('#hero h1');
    const finish = () => {
      if (!pendingTop.current || window.scrollY > 2) return;
      pendingTop.current = false;
      hero()?.focus({ preventScroll: true });
    };
    const cancel = () => { pendingTop.current = false; cancelAnimationFrame(frame); };
    const check = () => { finish(); if (pendingTop.current) frame = requestAnimationFrame(check); };
    const onScroll = () => { if (pendingTop.current) frame = requestAnimationFrame(check); };
    const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onPreference = () => { if (reduce()) cancel(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('pointerdown', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', onPreference);
    return () => {
      cancel();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('keydown', cancel);
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', onPreference);
    };
  }, []);

  function returnToTop(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    pendingTop.current = true;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
    if (reduceMotion) pendingTop.current = false;
    requestAnimationFrame(() => {
      if (reduceMotion) document.querySelector<HTMLElement>('#hero h1')?.focus({ preventScroll: true });
    });
  }

  return (
    <footer className="editorial-section footer-editorial" id="rodape">
      <div className="footer-editorial__brand">kauê<span>ruon</span></div>
      <nav className="footer-editorial__channels" aria-label={dict.channelsLabel}>
        <a href={DIRECT_CONTACT_LINKS.email}><Mail aria-hidden="true" />{dict.email}</a>
        <a href={DIRECT_CONTACT_LINKS.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" />LinkedIn</a>
        <a href={DIRECT_CONTACT_LINKS.github} target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" />GitHub</a>
      </nav>
      <a className="footer-editorial__top" href="#hero" onClick={returnToTop}>{dict.topLabel}<ArrowUpRight aria-hidden="true" /></a>
      <p>{dict.copyright}</p>
    </footer>
  );
}
