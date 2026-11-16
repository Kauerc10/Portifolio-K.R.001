'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { languageTransitionKey, type LanguageTransition } from '@/lib/language-transition';
import styles from './LanguageToggle.module.css';

const motionPreference = '(prefers-reduced-motion: reduce)';

function clearCover() {
  delete document.documentElement.dataset.languagePhase;
  delete document.documentElement.dataset.languageDirection;
}

function restorePosition(record: LanguageTransition) {
  const section = record.section ? document.getElementById(record.section) : null;
  const target = section ? section.getBoundingClientRect().top + window.scrollY + record.offset : record.scrollY;
  window.scrollTo({ top: Math.max(0, target), behavior: 'instant' });
}

export default function LanguageToggle() {
  const pathname = usePathname() || '/pt-BR';
  const currentLocale: Locale = pathname.startsWith('/en-US') ? 'en-US' : 'pt-BR';
  const isEnglish = currentLocale === 'en-US';
  const inFlight = useRef(false);
  const controllerId = useId();
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let disposed = false;
    const root = document.documentElement;
    function reset() {
      inFlight.current = false;
      setBusy(false);
      clearCover();
    }

    async function arrive() {
      let record: LanguageTransition | null = null;
      try {
        record = JSON.parse(sessionStorage.getItem(languageTransitionKey) || 'null');
      } catch {
        return;
      }
      if (!record) return;
      if (record.target !== location.pathname + location.search + location.hash || record.expires <= Date.now()) {
        try { sessionStorage.removeItem(languageTransitionKey); } catch { /* Storage may be blocked. */ }
        reset();
        return;
      }
      if (root.dataset.languageController && root.dataset.languageController !== controllerId) return;
      root.dataset.languageController = controllerId;

      await Promise.race([
        document.fonts.ready,
        new Promise<void>(resolve => { timers.current.push(setTimeout(resolve, 450)); }),
      ]);
      if (disposed) return;
      restorePosition(record);
      if (window.matchMedia(motionPreference).matches) {
        try { sessionStorage.removeItem(languageTransitionKey); } catch { /* Storage may be blocked. */ }
        reset();
        return;
      }

      root.dataset.languageDirection = record.locale === 'en-US' ? 'forward' : 'backward';
      // Give project/hash and font layouts one frame before uncovering the page.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (disposed) return;
        restorePosition(record);
        root.dataset.languagePhase = 'reveal';
        timers.current.push(setTimeout(() => {
          reset();
          try { sessionStorage.removeItem(languageTransitionKey); } catch { /* Storage may be blocked. */ }
          const button = [...document.querySelectorAll<HTMLButtonElement>(`[data-language="${record.locale}"]`)]
            .find(node => node.getClientRects().length > 0);
          const target = button ?? document.querySelector<HTMLElement>('header button[aria-expanded]');
          target?.focus({ preventScroll: true });
        }, 720));
      }));
    }

    void arrive();
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) reset(); };
    window.addEventListener('pageshow', onPageShow);
    return () => {
      disposed = true;
      timers.current.splice(0).forEach(clearTimeout);
      window.removeEventListener('pageshow', onPageShow);
      if (root.dataset.languageController === controllerId) delete root.dataset.languageController;
    };
  }, []);

  function switchLanguage(targetLocale: Locale) {
    if (targetLocale === currentLocale || inFlight.current) return;
    const target = pathname.replace(/^\/(pt-BR|en-US)(?=\/|$)/, '/' + targetLocale) + location.search + location.hash;
    let canAnimate = false;

    try {
      document.cookie = `portfolio_lang=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
      sessionStorage.setItem('portfolio-intro-complete', 'true');
      const sections = [...document.querySelectorAll<HTMLElement>('main > section[id], footer[id]')];
      const section = sections.find(node => {
        const rect = node.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });
      const record: LanguageTransition = {
        target,
        locale: targetLocale,
        expires: Date.now() + 10000,
        section: section?.id,
        offset: section ? -section.getBoundingClientRect().top : 0,
        scrollY: window.scrollY,
      };
      sessionStorage.setItem(languageTransitionKey, JSON.stringify(record));
      canAnimate = !window.matchMedia(motionPreference).matches;
    } catch {
      // A direct locale navigation remains available when storage is blocked.
    }

    inFlight.current = true;
    setBusy(true);
    if (!canAnimate) {
      window.location.assign(target);
      return;
    }

    document.documentElement.dataset.languageDirection = targetLocale === 'en-US' ? 'forward' : 'backward';
    document.documentElement.dataset.languagePhase = 'cover';
    timers.current.push(setTimeout(() => { window.location.assign(target); }, 480));
    // Restore the current document if navigation cannot proceed.
    timers.current.push(setTimeout(() => {
      clearCover();
      inFlight.current = false;
      setBusy(false);
      try { sessionStorage.removeItem(languageTransitionKey); } catch { /* Storage can be unavailable. */ }
    }, 3500));
  }

  return (
    <div className={styles.group} role="group" aria-label={isEnglish ? 'Language selector' : 'Seletor de idioma'} aria-busy={busy}>
      <span className={styles.marker} aria-hidden="true" data-english={isEnglish} />
      <button type="button" data-language="pt-BR" onClick={() => switchLanguage('pt-BR')} disabled={busy} aria-pressed={!isEnglish}>PT</button>
      <button type="button" data-language="en-US" onClick={() => switchLanguage('en-US')} disabled={busy} aria-pressed={isEnglish}>EN</button>
    </div>
  );
}
