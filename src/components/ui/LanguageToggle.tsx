'use client';

import { useState, useEffect, type MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/config';

export default function LanguageToggle() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-slate-200 dark:bg-white/10 opacity-50 animate-pulse" />
    );
  }

  // Extrair o locale atual da URL (/pt-BR/... ou /en-US/...)
  const currentLocale: Locale = pathname.startsWith('/en-US') ? 'en-US' : 'pt-BR';
  const isEnglish = currentLocale === 'en-US';

  const handleLanguageSwitch = (targetLocale: Locale, event: MouseEvent<HTMLButtonElement>) => {
    if (targetLocale === currentLocale) return;

    // Substituir a rota mantendo query params e o hash de seção atual
    const newPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
    const searchString = typeof window !== 'undefined' ? window.location.search : '';
    const hashString = typeof window !== 'undefined' ? window.location.hash : '';
    const targetUrl = `${newPath}${searchString}${hashString}`;

    // Atualizar o cookie e preservar a posição do cursor antes da navegação
    try {
      document.cookie = `portfolio_lang=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(
          'portfolio_cursor_position',
          JSON.stringify({ x: event.clientX, y: event.clientY })
        );
      }
    } catch {
      // Cookies/storage may be unavailable in hardened privacy modes.
    }

    // O layout carrega scripts legados one-shot; um reload garante que eles
    // capturem os novos nós do loader e do cursor após a troca de locale.
    window.location.assign(targetUrl);
  };

  return (
    <div
      className="relative grid h-10 w-[5.5rem] shrink-0 grid-cols-2 items-center rounded-xl border border-slate-300/80 bg-white/80 p-1 shadow-[0_6px_20px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-blue-500/50 hover:shadow-[0_10px_26px_rgba(37,99,235,0.16)] dark:border-white/15 dark:bg-[#0d1424]/95 dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      role="group"
      aria-label={isEnglish ? 'Language selector' : 'Seletor de idioma'}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg border border-blue-500/25 bg-blue-600 shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-transform duration-300 ease-out dark:border-amber-400/30 dark:bg-amber-400 dark:shadow-[0_4px_16px_rgba(212,160,23,0.22)] ${isEnglish ? 'translate-x-full' : 'translate-x-0'}`}
      />
      <button
        type="button"
        onClick={(event) => handleLanguageSwitch('pt-BR', event)}
        aria-label="Mudar para português"
        aria-pressed={!isEnglish}
        className={`relative z-10 grid h-8 place-items-center rounded-lg font-mono text-[11px] font-bold tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${!isEnglish ? 'text-white dark:text-[#111827]' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={(event) => handleLanguageSwitch('en-US', event)}
        aria-label="Switch to English"
        aria-pressed={isEnglish}
        className={`relative z-10 grid h-8 place-items-center rounded-lg font-mono text-[11px] font-bold tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${isEnglish ? 'text-white dark:text-[#111827]' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
      >
        EN
      </button>
    </div>
  );
}
