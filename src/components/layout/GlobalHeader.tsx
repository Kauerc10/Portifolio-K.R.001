'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import LanguageToggle from '@/components/ui/LanguageToggle';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MobileNavigation from './MobileNavigation';
import SkipLink from './SkipLink';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface GlobalHeaderProps {
  locale: Locale;
  dict: Dictionary['nav'];
}

export default function GlobalHeader({ locale, dict }: GlobalHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const prefix = `/${locale}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `${prefix}/projetos`, label: dict.work || 'TRABALHOS' },
    { href: `${prefix}/servicos`, label: dict.solutions || 'SOLUÇÕES' },
    { href: `${prefix}#sobre`, label: dict.about || 'SOBRE' },
    { href: `${prefix}/carreira`, label: dict.career || 'CARREIRA' },
    { href: `${prefix}#contato`, label: dict.contact || 'CONTATO' },
  ];

  return (
    <>
      <SkipLink label={dict.skipToContent} />
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/85 dark:bg-[#070b14]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Nome do Portfólio */}
          <Link
            href={prefix}
            className="group flex items-center gap-2 font-mono text-sm font-extrabold tracking-tight text-slate-900 dark:text-white"
            aria-label="KRC Home"
          >
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-blue-600 dark:bg-amber-400 text-white dark:text-[#070b14] text-xs font-black shadow-md">
              K
            </span>
            <span className="transition-colors group-hover:text-blue-600 dark:group-hover:text-amber-400">
              KAUÊ RUON
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navegação Principal">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 dark:text-amber-400 bg-blue-500/10 dark:bg-amber-400/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Ações Desktop: Idioma, Tema e CTA Comercial */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href={`${prefix}/servicos#contato`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#070b14] font-mono text-xs font-bold tracking-wider transition-all shadow-md shadow-blue-500/20 dark:shadow-amber-400/20 hover:scale-[1.02]"
            >
              <span>{dict.letsTalk || 'VAMOS CONVERSAR'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Drawer Trigger */}
          <MobileNavigation locale={locale} dict={dict} />
        </div>
      </header>
    </>
  );
}
