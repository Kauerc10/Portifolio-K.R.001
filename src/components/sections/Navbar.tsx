'use client';

import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import type { Dictionary } from '@/i18n/types';

export default function Navbar({ dict }: { dict?: Dictionary['nav'] }) {
  const [isOpen, setIsOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const d = dict || {
    home: 'INÍCIO',
    about: 'SOBRE',
    experience: 'EXPERIÊNCIA',
    trajectory: 'Trajetória',
    skills: 'SKILLS',
    achievements: 'CONQUISTAS',
    education: 'FORMAÇÃO',
    projects: 'PROJETOS',
    contact: 'CONTATO',
    resume: 'Currículo',
    menu: 'Menu',
    closeMenu: 'Fechar menu',
    brandAria: 'Kauê Ruon Cardoso - Início',
    indicator: '§ 01 / 08',
  };

  // Trava/Restaura o foco e fecha com a tecla Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        burgerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    burgerRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F7F7FA]/80 dark:bg-[#111015]/80 border-b border-[#EBEBF0] dark:border-[#22212C] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* U01: Marca Pessoal */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 text-[#14131C] dark:text-[#F3F2F5] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] rounded-md py-1 px-1.5 min-h-[44px] min-w-[44px]"
          aria-label={d.brandAria || 'Kauê Ruon Cardoso - Início'}
          onClick={closeMenu}
        >
          <Image
            src="/assets/krc-logo-512.webp"
            alt="KRC"
            width={32}
            height={32}
            priority
            className="w-8 h-8 rounded-full border border-[#EBEBF0] dark:border-[#333240]"
          />
          <span className="font-semibold text-base sm:text-lg tracking-tight">
            kauê ruon
          </span>
        </Link>

        {/* U02 + U03: Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
          <Link
            href="#projetos"
            className="text-sm font-medium text-[#565565] dark:text-[#A09FA8] hover:text-[#14131C] dark:hover:text-[#F3F2F5] transition-colors py-2 px-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-h-[44px] flex items-center"
          >
            {d.projects}
          </Link>
          <Link
            href="#experiencia"
            className="text-sm font-medium text-[#565565] dark:text-[#A09FA8] hover:text-[#14131C] dark:hover:text-[#F3F2F5] transition-colors py-2 px-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-h-[44px] flex items-center"
          >
            {d.trajectory || d.experience}
          </Link>
          <Link
            href="#contato"
            className="text-sm font-medium text-[#565565] dark:text-[#A09FA8] hover:text-[#14131C] dark:hover:text-[#F3F2F5] transition-colors py-2 px-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-h-[44px] flex items-center"
          >
            {d.contact}
          </Link>

          {/* U03: Currículo do cabeçalho */}
          <a
            href="/curriculo_kaue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6534D8] dark:text-[#A17AFF] bg-[#6534D8]/10 dark:bg-[#6534D8]/20 hover:bg-[#6534D8]/20 dark:hover:bg-[#6534D8]/30 px-3 py-1.5 rounded-full transition-colors border border-[#6534D8]/20 min-h-[44px] items-center"
          >
            <span>{d.resume || 'Currículo'}</span>
            <span aria-hidden="true">↗</span>
          </a>

          <div className="h-5 w-px bg-[#EBEBF0] dark:bg-[#22212C]" aria-hidden="true" />

          {/* Controles de Idioma e Tema */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>

        {/* Botão Burger para Telas Menores */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            ref={burgerRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? (d.closeMenu || 'Fechar menu') : (d.menu || 'Menu')}
            className="p-2.5 rounded-lg border border-[#EBEBF0] dark:border-[#333240] text-[#14131C] dark:text-[#F3F2F5] hover:bg-[#EBEBF0]/50 dark:hover:bg-[#22212C]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-w-[44px] min-h-[44px] flex flex-col justify-center items-center gap-1.5"
          >
            <span
              className={`w-5 h-0.5 bg-current transition-transform duration-200 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-current transition-opacity duration-200 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-current transition-transform duration-200 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu Móvel com Drawer Acessível */}
      {isOpen && (
        <div
          id="mobile-nav"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label={d.menu || 'Menu de navegação'}
          className="md:hidden border-t border-[#EBEBF0] dark:border-[#22212C] bg-[#F7F7FA] dark:bg-[#111015] px-4 pt-4 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-2">
            <Link
              href="#projetos"
              onClick={closeMenu}
              className="text-base font-medium text-[#14131C] dark:text-[#F3F2F5] hover:text-[#6534D8] dark:hover:text-[#A17AFF] py-3 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 min-h-[44px] flex items-center"
            >
              {d.projects}
            </Link>
            <Link
              href="#experiencia"
              onClick={closeMenu}
              className="text-base font-medium text-[#14131C] dark:text-[#F3F2F5] hover:text-[#6534D8] dark:hover:text-[#A17AFF] py-3 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 min-h-[44px] flex items-center"
            >
              {d.trajectory || d.experience}
            </Link>
            <Link
              href="#contato"
              onClick={closeMenu}
              className="text-base font-medium text-[#14131C] dark:text-[#F3F2F5] hover:text-[#6534D8] dark:hover:text-[#A17AFF] py-3 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 min-h-[44px] flex items-center"
            >
              {d.contact}
            </Link>
            <a
              href="/curriculo_kaue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="inline-flex items-center justify-between text-base font-medium text-[#6534D8] dark:text-[#A17AFF] bg-[#6534D8]/10 dark:bg-[#6534D8]/20 py-3 px-3 rounded-lg min-h-[44px]"
            >
              <span>{d.resume || 'Currículo'}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="pt-3 border-t border-[#EBEBF0] dark:border-[#22212C] flex items-center justify-between">
            <span className="text-xs text-[#565565] dark:text-[#A09FA8]">Idioma:</span>
            <LanguageToggle />
          </div>
        </div>
      )}
    </header>
  );
}
