'use client';

import { useState } from 'react';
import { Menu, X, FileText, Bot } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: '// sobre', href: '#sobre' },
    { label: '// projetos', href: '#projetos' },
    { label: '// experiência', href: '#experiencia' },
    { label: '// obmep', href: '#obmep' },
    { label: '// contato', href: '#contato' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bgDark/80 backdrop-blur-md border-b border-white/10 font-mono">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand / KRC Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-goldAccent to-amber-600 flex items-center justify-center font-bold text-bgDark text-xs shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            KRC
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-white tracking-wider group-hover:text-goldAccent transition-colors">
              KAUÊ RUON CARDOSO
            </p>
            <p className="text-[10px] text-gray-400">AI Engineer · Blumenau/SC</p>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-cyanNeon transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyanNeon hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}

          <a
            href="/curriculo_kaue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-goldAccent/40 text-goldAccent hover:bg-goldAccent hover:text-bgDark font-bold transition-all text-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV PDF</span>
          </a>
        </nav>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-bgDark/95 border-b border-white/10 px-6 py-4 space-y-3 font-mono text-xs animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-cyanNeon py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/curriculo_kaue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-goldAccent text-bgDark font-bold mt-2"
          >
            <FileText className="w-4 h-4" />
            <span>Baixar Currículo PDF</span>
          </a>
        </div>
      )}
    </header>
  );
}
