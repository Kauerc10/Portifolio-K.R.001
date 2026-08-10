'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="nav" id="nav">
      <Link href="#hero" className="nav__logo" aria-label="Início">
        <Image
          src="/assets/krc-logo-512.webp"
          alt="KRC Logo"
          width={40}
          height={40}
          priority
          className="nav__logo-img"
        />
      </Link>

      <div className="nav__links" id="navLinks">
        <Link href="#hero" className="nav__link" data-section="1">INÍCIO</Link>
        <Link href="#sobre" className="nav__link" data-section="2">SOBRE</Link>
        <Link href="#experiencia" className="nav__link" data-section="3">EXPERIÊNCIA</Link>
        <Link href="#skills" className="nav__link" data-section="4">SKILLS</Link>
        <Link href="#conquistas" className="nav__link" data-section="5">CONQUISTAS</Link>
        <Link href="#formacao" className="nav__link" data-section="6">FORMAÇÃO</Link>
        <Link href="#projetos" className="nav__link" data-section="7">PROJETOS</Link>
        <Link href="#contato" className="nav__link" data-section="8">CONTATO</Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Botão de Alternância de Tema Claro / Escuro */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Alternar Tema Claro / Escuro"
            title="Alternar Tema Claro / Escuro"
            className="p-2 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:border-[var(--gold)] text-gray-800 dark:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--gold)] transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800 transition-transform hover:-rotate-12" />
            )}
          </button>
        )}

        <span className="nav__indicator" id="navIndicator">§ 01 / 08</span>

        <button className="nav__burger" id="navBurger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
