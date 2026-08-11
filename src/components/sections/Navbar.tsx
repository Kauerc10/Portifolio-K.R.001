'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import type { Dictionary } from '@/i18n/types';

export default function Navbar({ dict }: { dict?: Dictionary['nav'] }) {
  const d = dict || {
    home: 'INÍCIO',
    about: 'SOBRE',
    experience: 'EXPERIÊNCIA',
    skills: 'SKILLS',
    achievements: 'CONQUISTAS',
    education: 'FORMAÇÃO',
    projects: 'PROJETOS',
    contact: 'CONTATO',
    indicator: '§ 01 / 08',
  };

  return (
    <nav className="nav" id="nav">
      <Link href="#hero" className="nav__logo" aria-label={d.home}>
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
        <Link href="#hero" className="nav__link" data-section="1">{d.home}</Link>
        <Link href="#sobre" className="nav__link" data-section="2">{d.about}</Link>
        <Link href="#experiencia" className="nav__link" data-section="3">{d.experience}</Link>
        <Link href="#skills" className="nav__link" data-section="4">{d.skills}</Link>
        <Link href="#conquistas" className="nav__link" data-section="5">{d.achievements}</Link>
        <Link href="#formacao" className="nav__link" data-section="6">{d.education}</Link>
        <Link href="#projetos" className="nav__link" data-section="7">{d.projects}</Link>
        <Link href="#contato" className="nav__link" data-section="8">{d.contact}</Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Seletor Cyberdeck de Idioma */}
        <LanguageToggle />

        {/* Alternância de Tema Claro / Escuro */}
        <ThemeToggle />

        <span className="nav__indicator" id="navIndicator">{d.indicator}</span>

        <button className="nav__burger" id="navBurger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
