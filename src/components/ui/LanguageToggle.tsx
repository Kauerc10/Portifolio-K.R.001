'use client';

import { useState, useEffect, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import type { Locale } from '@/i18n/config';

export default function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

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

  const handleLanguageSwitch = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) return;

    // Substituir a rota mantendo query params e o hash de seção atual
    const newPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
    const searchString = typeof window !== 'undefined' ? window.location.search : '';
    const hashString = typeof window !== 'undefined' ? window.location.hash : '';
    const targetUrl = `${newPath}${searchString}${hashString}`;

    // Atualizar cookie e marcar loader como visto na sessão antes da navegação
    try {
      document.cookie = `portfolio_lang=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('loader_seen', 'true');
      }
    } catch {
      // Cookies/storage may be unavailable in hardened privacy modes.
    }

    // Navegação client-side preserva o estado visual (inclusive a posição do cursor).
    startTransition(() => {
      router.push(targetUrl, { scroll: false });
    });
  };

  return (
    <div
      className="group relative flex items-center justify-between w-16 h-8 p-1 rounded-full bg-slate-200/90 dark:bg-[#0b1120]/90 border border-slate-300 dark:border-[var(--gold)]/40 shadow-inner hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden"
      role="region"
      aria-label={isEnglish ? 'Language selector' : 'Seletor de idioma'}
      aria-busy={isPending}
    >
      {/* Botão Português */}
      <button
        onClick={() => handleLanguageSwitch('pt-BR')}
        disabled={isPending}
        className={`relative z-10 flex items-center justify-center w-6 h-6 text-[10px] font-bold tracking-tighter transition-colors duration-300 ${
          !isEnglish ? 'text-blue-600 dark:text-[var(--gold)] font-extrabold' : 'text-slate-500 dark:text-slate-400 opacity-60'
        }`}
        aria-label="Mudar para Português"
        title="Português do Brasil (PT-BR)"
      >
        PT
      </button>

      {/* Botão Inglês */}
      <button
        onClick={() => handleLanguageSwitch('en-US')}
        disabled={isPending}
        className={`relative z-10 flex items-center justify-center w-6 h-6 text-[10px] font-bold tracking-tighter transition-colors duration-300 ${
          isEnglish ? 'text-blue-600 dark:text-[var(--gold)] font-extrabold' : 'text-slate-500 dark:text-slate-400 opacity-60'
        }`}
        aria-label="Switch to English"
        title="English United States (EN-US)"
      >
        EN
      </button>

      {/* Thumb Deslizante com Globo e Indicador de Idioma */}
      <div
        className={`absolute top-1 left-1 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-[#0f172a] border border-blue-400/50 dark:border-[var(--gold)]/60 shadow-md transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${
          isEnglish ? 'translate-x-8 text-[var(--gold)]' : 'translate-x-0 text-blue-600'
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-[var(--gold)]" />
      </div>
    </div>
  );
}
