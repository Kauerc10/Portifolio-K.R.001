'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 animate-pulse" />;
  }

  const isDark = resolvedTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  const handleToggle = () => {
    const changeTheme = () => setTheme(nextTheme);
    if ('startViewTransition' in document) {
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(changeTheme);
    } else {
      changeTheme();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      aria-pressed={isDark}
      title={isDark ? 'Tema escuro — mudar para claro' : 'Tema claro — mudar para escuro'}
      className="group relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-300/80 bg-white/80 text-slate-700 shadow-[0_6px_20px_rgba(15,23,42,0.12)] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-amber-500/70 hover:shadow-[0_10px_26px_rgba(180,131,18,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--void)] active:translate-y-0 dark:border-white/15 dark:bg-[#0d1424]/95 dark:text-amber-300 dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
    >
      <span className="absolute inset-1 rounded-lg bg-amber-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Sun className={`absolute h-[18px] w-[18px] transition-[transform,opacity] duration-500 ${isDark ? '-rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
      <Moon className={`absolute h-[17px] w-[17px] transition-[transform,opacity] duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'}`} />
    </button>
  );
}
