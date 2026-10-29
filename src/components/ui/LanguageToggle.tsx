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
  const currentLocale: Locale = (pathname || '').startsWith('/en-US') ? 'en-US' : 'pt-BR';
  const isEnglish = currentLocale === 'en-US';

  const handleLanguageSwitch = (targetLocale: Locale, event: MouseEvent<HTMLButtonElement>) => {
    if (targetLocale === currentLocale) return;

    // Substituir a rota mantendo query params e o hash de seção atual
    const newPath = (pathname || '').replace(`/${currentLocale}`, `/${targetLocale}`);
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

    window.location.assign(targetUrl);
  };

  return (
    <div
      className="relative grid h-8 w-20 shrink-0 grid-cols-2 items-center rounded-full border border-[#D9D9E3] dark:border-[#2E2D3B] bg-white/70 dark:bg-black/40 p-0.5 text-xs font-semibold transition-all"
      role="group"
      aria-label={isEnglish ? 'Language selector' : 'Seletor de idioma'}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-full bg-[#14131C] dark:bg-[#F3F2F5] shadow-xs transition-transform duration-200 ease-out ${
          isEnglish ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      <button
        type="button"
        onClick={(e) => handleLanguageSwitch('pt-BR', e)}
        aria-pressed={!isEnglish}
        className={`relative z-10 flex h-full items-center justify-center rounded-full text-xs font-semibold transition-colors ${
          !isEnglish
            ? 'text-white dark:text-[#14131C]'
            : 'text-[#565565] dark:text-[#A09FA8] hover:text-[#14131C]'
        }`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={(e) => handleLanguageSwitch('en-US', e)}
        aria-pressed={isEnglish}
        className={`relative z-10 flex h-full items-center justify-center rounded-full text-xs font-semibold transition-colors ${
          isEnglish
            ? 'text-white dark:text-[#14131C]'
            : 'text-[#565565] dark:text-[#A09FA8] hover:text-[#14131C]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
