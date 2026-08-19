'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu, ArrowRight } from 'lucide-react';
import LanguageToggle from '@/components/ui/LanguageToggle';
import ThemeToggle from '@/components/ui/ThemeToggle';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface MobileNavigationProps {
  locale: Locale;
  dict: Dictionary['nav'];
}

export default function MobileNavigation({ locale, dict }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const prefix = `/${locale}`;

  const navLinks = [
    { href: `${prefix}/projetos`, label: dict.work || 'TRABALHOS' },
    { href: `${prefix}/servicos`, label: dict.solutions || 'SOLUÇÕES' },
    { href: `${prefix}#sobre`, label: dict.about || 'SOBRE' },
    { href: `${prefix}/carreira`, label: dict.career || 'CARREIRA' },
    { href: `${prefix}#contato`, label: dict.contact || 'CONTATO' },
  ];

  // Fecha o menu ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Trava scroll do body e escuta Escape
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="md:hidden flex items-center gap-2">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        aria-label={isOpen ? dict.menuClose || 'Fechar menu' : dict.menuOpen || 'Abrir menu'}
        className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:border-amber-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
      </button>

      {/* Backdrop & Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navegação Mobile"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-white/95 dark:bg-[#070b14]/98 backdrop-blur-2xl p-6 transition-all duration-300 overflow-y-auto"
        >
          {/* Header do Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
            <Link
              href={prefix}
              onClick={closeMenu}
              className="font-mono text-sm font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              KRC <span className="text-amber-500 font-normal">/</span> PORTFOLIO
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label={dict.menuClose || 'Fechar menu'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Links Principais (Hit target >= 44px) */}
          <nav className="flex flex-col gap-2 py-8" aria-label="Links Mobile">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between min-h-[48px] px-4 rounded-xl font-mono text-sm font-bold tracking-wider transition-colors ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-600 dark:text-amber-400 dark:bg-amber-400/10 border border-blue-500/20 dark:border-amber-400/20'
                      : 'text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>

          {/* Rodapé do Drawer com CTA, Tema e Idioma */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-4">
            <Link
              href={`${prefix}/servicos#contato`}
              onClick={closeMenu}
              className="flex items-center justify-center min-h-[48px] px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#0b1120] font-mono text-xs font-bold tracking-wider shadow-lg shadow-blue-500/20 dark:shadow-amber-400/20 transition-all"
            >
              <span>{dict.letsTalk || 'VAMOS CONVERSAR'}</span>
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">Preferências:</span>
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
