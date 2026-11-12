'use client';

import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef, type MouseEvent } from 'react';
import type { Dictionary } from '@/i18n/types';
import { DIRECT_CONTACT_LINKS } from '@/lib/editorial';

export default function Footer({ dict }: { dict: Dictionary['footer'] }) {
  const pendingTop = useRef(false);
  const trackingFrame = useRef(0);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hero = () => document.querySelector<HTMLElement>('#hero h1');
    const track = () => {
      if (!pendingTop.current) return;
      if (window.scrollY <= 2) {
        pendingTop.current = false;
        hero()?.focus({ preventScroll: true });
        return;
      }
      trackingFrame.current = requestAnimationFrame(track);
    };
    const cancel = () => { pendingTop.current = false; cancelAnimationFrame(trackingFrame.current); };
    const stopReduced = () => {
      if (!motion.matches || !pendingTop.current) return;
      window.scrollTo({ top: window.scrollY, behavior: 'instant' });
      cancel();
    };
    const onPreference = () => {
      if (motion.matches) stopReduced();
    };
    const onPageHide = () => cancel();
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('pointerdown', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
    window.addEventListener('pagehide', onPageHide);
    motion.addEventListener('change', onPreference);
    return () => {
      cancel();
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('keydown', cancel);
      window.removeEventListener('pagehide', onPageHide);
      motion.removeEventListener('change', onPreference);
    };
  }, []);

  function returnToTop(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    pendingTop.current = true;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
    if (reduceMotion) {
      pendingTop.current = false;
      document.querySelector<HTMLElement>('#hero h1')?.focus({ preventScroll: true });
      return;
    }
    cancelAnimationFrame(trackingFrame.current);
    trackingFrame.current = requestAnimationFrame(function trackTop() {
      if (!pendingTop.current) return;
      if (window.scrollY <= 2) {
        pendingTop.current = false;
        document.querySelector<HTMLElement>('#hero h1')?.focus({ preventScroll: true });
        return;
      }
      trackingFrame.current = requestAnimationFrame(trackTop);
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
