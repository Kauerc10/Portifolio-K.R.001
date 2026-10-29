'use client';

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import HeroLandscape from '../hero/HeroLandscape';
import { cover, destinations } from '../hero/landscape';
import Link from 'next/link';
import type { Dictionary } from '@/i18n/types';

interface HeroSectionProps {
  dict: Dictionary['hero'];
}

export default function HeroSection({ dict: d }: HeroSectionProps) {
  const [activePath, setActivePath] = useState(0);
  const composition = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 1433, height: 1018 });
  const [imageSize, setImageSize] = useState({width: 1024, height: 768});
  useEffect(() => {
    const image = new window.Image(); image.src = '/images/hero-clean.jpg';
    let alive = true;
    image.onload = () => { if (alive) setImageSize({width:image.naturalWidth,height:image.naturalHeight}); };
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(entries => { const {width,height} = entries[0].contentRect; setBounds({width,height}); });
    observer.observe(composition.current!);
    return () => { alive=false; image.onload=null; observer.disconnect(); };
  }, []);
  const greetingLine1 = d.greetingH1Line1 || 'Olá, que bom ter';
  const greetingLine2 = d.greetingH1Line2 || 'você por aqui.';
  const areas = d.areasSubtitle || 'Desenvolvimento, automações e suporte.';
  const presentation =
    d.presentation ||
    'Sou Kauê Ruon Cardoso. Crio aplicações, automatizo rotinas e ajudo pessoas a usar tecnologia.';
  const presentationBody = presentation.replace(/^Sou Kauê Ruon Cardoso\.\s*/i, '');
  const ctaExplore = d.ctaExplore || 'Explorar meu trabalho';
  const ctaResume = d.ctaResumeShort || 'Currículo';
  const scrollHint = d.scrollHint || 'Role para conectar os caminhos ↓';
  const destDevelopment = d.destDevelopment || 'Desenvolvimento';
  const destAutomation = d.destAutomation || 'Automação';
  const destSupport = d.destSupport || 'Suporte';
  const locationEdu = d.locationEdu || 'Blumenau, SC · ADS em formação';

  return (
    <section
      id="hero"
      aria-label="Apresentação e Paisagem Interativa"
      className="relative w-full max-w-[1433px] mx-auto overflow-hidden bg-[#F7F7FA] dark:bg-[#111015] transition-colors"
    >
      {/* ── Composição Unificada Desktop (1433 × 1018 Aspect Ratio) ── */}
      <div ref={composition} className="hero-composition relative w-full aspect-[1433/1018] min-h-[680px] flex flex-col justify-between select-none">
        {/* Imagem Canônica de Fundo (Preenche todo o canvas: céu branco no topo, paisagem no meio/base) */}
        <HeroLandscape activePath={activePath} />

        {/* ── Topo: Tipografia Canônica Integrada Sobre o Céu da Paisagem (U04–U09) ── */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Lado Esquerdo: Cumprimento e Atuação (U04–U06) */}
            <div className="lg:col-span-7 space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-bold tracking-tight leading-[1.08] text-[#14131C] dark:text-[#F3F2F5]">
                <span className="block">{greetingLine1}</span>
                <span className="block text-[#6534D8] dark:text-[#A17AFF]">
                  {greetingLine2}
                </span>
              </h1>

              <p className="text-lg sm:text-2xl font-normal text-[#2E1E6B] dark:text-[#C5C4D0] pt-1">
                {areas}
              </p>
            </div>

            {/* Lado Direito: Apresentação com Borda Violeta e CTAs (U07–U09) */}
            <div className="lg:col-span-5 lg:pt-3">
              <div className="border-l-2 border-[#8B5CF6]/40 pl-5 space-y-5">
                <div>
                  <strong className="block text-base sm:text-lg font-semibold text-[#14131C] dark:text-[#F3F2F5]">
                    Sou Kauê Ruon Cardoso.
                  </strong>
                  <p className="text-sm sm:text-base font-normal text-[#565565] dark:text-[#A09FA8] leading-relaxed pt-1">
                    {presentationBody}
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-1">
                  {/* U08: CTA Principal (Pill Escuro com Seta ↗) */}
                  <Link
                    href="#projetos"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C0A1D] hover:bg-[#1E1B4B] dark:bg-[#F3F2F5] dark:hover:bg-white text-white dark:text-[#0C0A1D] text-sm font-semibold transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-h-[44px]"
                  >
                    <span>{ctaExplore}</span>
                    <span aria-hidden="true" className="text-xs font-bold">↗</span>
                  </Link>

                  {/* U09: Currículo Secundário (Texto com Linha Violeta) */}
                  <a
                    href="/curriculo_kaue.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-[#14131C] dark:text-[#F3F2F5] hover:text-[#6534D8] dark:hover:text-[#A17AFF] border-b-2 border-[#6534D8] pb-0.5 transition-colors min-h-[44px]"
                  >
                    {ctaResume}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pins Arquitetônicos Reais da Referência Ancorados nos Pavilhões (U10, U11, U12) ── */}
        <nav className="hero-destinations" aria-label="Destinos da paisagem">
          {destinations.map(destination => {
            const point = cover(bounds.width, bounds.height, imageSize.width, imageSize.height).project(destination.x, destination.y);
            const label = {development:destDevelopment, automation:destAutomation, support:destSupport}[destination.key];
            return <Link key={destination.key} href={destination.href} aria-label={label}
              className="hero-destination" style={{'--anchor-x':`${point.x}px`, '--anchor-y':`${point.y}px`} as CSSProperties}
              onPointerEnter={() => setActivePath(destination.path)} onPointerLeave={() => setActivePath(0)}
              onFocus={() => setActivePath(destination.path)} onBlur={() => setActivePath(0)}>
              <span className="hero-destination-stem" aria-hidden="true" />
              <span className="hero-destination-label">{label}</span>
            </Link>;
          })}
        </nav>

        {/* ── Base Integrada Sobre as Dunas da Paisagem (U13–U16) ── */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-16 pb-4 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* U14: Localização e Formação */}
          <div className="flex items-center gap-4 text-xs sm:text-sm font-medium text-[#2E1E6B] dark:text-[#C5C4D0]">
            <span>{locationEdu}</span>
            <span className="hidden md:inline-block w-24 lg:w-48 h-[1px] bg-[#8B5CF6]/30" aria-hidden="true" />
          </div>

          {/* U13: Indicação Discreta de Rolagem */}
          <div className="flex flex-col items-center text-xs sm:text-sm font-medium text-[#2E1E6B] dark:text-[#A17AFF]">
            <span>{scrollHint}</span>
            <span className="w-[1.5px] h-5 bg-[#6534D8] mt-1" aria-hidden="true" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#6534D8]" aria-hidden="true" />
          </div>

          {/* U15 + U16: Atalhos Rápidos com Divisória Violeta */}
          <div className="flex items-center gap-6 text-xs sm:text-sm mr-24 sm:mr-28">
            {/* U15: Atlas Notarial */}
            <Link
              href="#project-atlas"
              className="border-l border-[#8B5CF6]/40 pl-3.5 group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] rounded py-1 min-h-[44px]"
            >
              <div>
                <span className="block font-semibold text-[#14131C] dark:text-[#F3F2F5] group-hover:text-[#6534D8] transition-colors">
                  Atlas Notarial
                </span>
                <span className="block text-[11px] text-[#6534D8] dark:text-[#A17AFF]">
                  Automação em produção
                </span>
              </div>
              <span className="text-[#14131C] dark:text-[#F3F2F5] group-hover:translate-x-0.5 transition-transform font-bold">
                →
              </span>
            </Link>

            {/* U16: CKF Manutenção */}
            <Link
              href="#project-ckf"
              className="border-l border-[#8B5CF6]/40 pl-3.5 group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] rounded py-1 min-h-[44px]"
            >
              <div>
                <span className="block font-semibold text-[#14131C] dark:text-[#F3F2F5] group-hover:text-[#6534D8] transition-colors">
                  CKF Manutenção
                </span>
                <span className="block text-[11px] text-[#6534D8] dark:text-[#A17AFF]">
                  Clientes e orçamentos
                </span>
              </div>
              <span className="text-[#14131C] dark:text-[#F3F2F5] group-hover:translate-x-0.5 transition-transform font-bold">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
