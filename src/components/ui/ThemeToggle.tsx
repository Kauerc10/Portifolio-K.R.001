'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-slate-200 dark:bg-white/10 opacity-50 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  const handleToggle = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 700);

    const nextTheme = isDark ? 'light' : 'dark';

    // Suporte nativo à API de View Transitions para efeito de onda circular suave no navegador
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
      title={isDark ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
      className="group relative flex items-center justify-between w-16 h-8 p-1 rounded-full bg-slate-200/90 dark:bg-[#0b1120]/90 border border-slate-300 dark:border-[var(--gold)]/40 shadow-inner hover:shadow-[0_0_20px_rgba(212,160,23,0.35)] backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Glow de fundo notarial no hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

      {/* Ícone fixo da Esquerda: Sol (Modo Claro) */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6 text-amber-600 dark:text-amber-500/40 transition-colors duration-300">
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'scale-110 text-amber-500' : 'scale-90 opacity-60'}`} />
      </div>

      {/* Ícone fixo da Direita: Lua (Modo Escuro) */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6 text-slate-400 dark:text-[var(--gold)] transition-colors duration-300">
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'scale-110 text-[var(--gold)]' : 'scale-90 opacity-60'}`} />
      </div>

      {/* Thumb Deslizante com Gradiente Notarial e Rotação 3D */}
      <div
        className={`absolute top-1 left-1 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-[#0f172a] border border-amber-400/50 dark:border-[var(--gold)]/60 shadow-md transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${
          isDark ? 'translate-x-8 text-[var(--gold)]' : 'translate-x-0 text-amber-500'
        }`}
      >
        <div className={`transition-transform duration-700 ease-out ${isRotating ? 'rotate-[360deg]' : 'rotate-0'}`}>
          {isDark ? (
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] animate-pulse" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          )}
        </div>
      </div>
    </button>
  );
}
