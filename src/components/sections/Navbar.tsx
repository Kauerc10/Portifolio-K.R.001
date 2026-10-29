'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import type { Dictionary } from '@/i18n/types';

export default function Navbar({ dict }: { dict?: Dictionary['nav'] }) {
  const [isOpen, setIsOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const d = dict || {
    home: 'Início',
    about: 'Sobre',
    experience: 'Experiência',
    trajectory: 'Trajetória',
    skills: 'Skills',
    achievements: 'Conquistas',
    education: 'Formação',
    projects: 'Projetos',
    contact: 'Contato',
    resume: 'Currículo',
    menu: 'Menu',
    closeMenu: 'Fechar menu',
    brandAria: 'Kauê Ruon Cardoso - Início',
    indicator: '§ 01 / 08',
  };

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
    <header className="relative w-full z-40 bg-[#F7F7FA] dark:bg-[#111015] transition-colors duration-200">
      <div className="max-w-[1433px] mx-auto px-6 sm:px-12 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
        {/* U01: Marca Pessoal Typographic "kauêruon" (Idêntico à referência aprovada) */}
        <Link
          href="#hero"
          className="group inline-flex items-center text-2xl font-bold tracking-tight text-[#14131C] dark:text-[#F3F2F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] rounded-md py-1"
          aria-label={d.brandAria || 'Kauê Ruon Cardoso - Início'}
          onClick={closeMenu}
        >
          <span>kauê</span>
          <span className="text-[#6534D8] dark:text-[#A17AFF] transition-colors">ruon</span>
        </Link>

        {/* U02 + U03: Navegação Desktop Minimalista */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Navegação principal">
          <Link
            href="#projetos"
            className="text-[15px] font-medium text-[#2E1E6B] dark:text-[#C5C4D0] hover:text-[#14131C] dark:hover:text-[#F3F2F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] py-2"
          >
            {d.projects || 'Projetos'}
          </Link>
          <Link
            href="#experiencia"
            className="text-[15px] font-medium text-[#2E1E6B] dark:text-[#C5C4D0] hover:text-[#14131C] dark:hover:text-[#F3F2F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] py-2"
          >
            {d.trajectory || 'Trajetória'}
          </Link>
          <Link
            href="#contato"
            className="text-[15px] font-medium text-[#2E1E6B] dark:text-[#C5C4D0] hover:text-[#14131C] dark:hover:text-[#F3F2F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] py-2"
          >
            {d.contact || 'Contato'}
          </Link>

          {/* U03: Currículo no Cabeçalho (Pill Escuro com Seta ↗) */}
          <a
            href="/curriculo_kaue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0C0A1D] hover:bg-[#1E1B4B] dark:bg-[#F3F2F5] dark:hover:bg-white text-white dark:text-[#0C0A1D] text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8]"
          >
            <span>{d.resume || 'Currículo'}</span>
            <span aria-hidden="true" className="text-xs font-bold">↗</span>
          </a>

          {/* Controles Secundários Discretos */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#D9D9E3] dark:border-[#2E2D3B]">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>

        {/* Menu Mobile Burger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            ref={burgerRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? (d.closeMenu || 'Fechar menu') : (d.menu || 'Menu')}
            className="p-2.5 rounded-lg text-[#14131C] dark:text-[#F3F2F5] hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-w-[44px] min-h-[44px] flex flex-col justify-center items-center gap-1.5"
          >
            <span
              className={`w-6 h-0.5 bg-current transition-transform duration-200 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-current transition-opacity duration-200 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-current transition-transform duration-200 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Drawer Mobile */}
      {isOpen && (
        <div
          id="mobile-nav"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label={d.menu || 'Menu de navegação'}
          className="md:hidden border-t border-[#EBEBF0] dark:border-[#22212C] bg-[#F7F7FA] dark:bg-[#111015] px-6 pt-4 pb-6 space-y-4 shadow-xl"
        >
          <div className="flex flex-col space-y-3">
            <Link
              href="#projetos"
              onClick={closeMenu}
              className="text-base font-semibold text-[#14131C] dark:text-[#F3F2F5] hover:text-[#6534D8] py-2"
            >
              {d.projects || 'Projetos'}
            </Link>
            <Link
              href="#experiencia"
              onClick={closeMenu}
              className="text-base font-semibold text-[#14131C] dark:text-[#F3F2F5] hover:text-[#6534D8] py-2"
            >
              {d.trajectory || 'Trajetória'}
            </Link>
            <Link
              href="#contato"
              onClick={closeMenu}
              className="text-base font-semibold text-[#14131C] dark:text-[#F3F2F5] hover:text-[#6534D8] py-2"
            >
              {d.contact || 'Contato'}
            </Link>
            <a
              href="/curriculo_kaue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="inline-flex items-center justify-between text-base font-semibold text-white bg-[#0C0A1D] dark:bg-[#F3F2F5] dark:text-[#0C0A1D] px-4 py-3 rounded-xl"
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
