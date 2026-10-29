'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary } from '@/i18n/types';

interface HeroSectionProps {
  dict: Dictionary['hero'];
}

export default function HeroSection({ dict: d }: HeroSectionProps) {
  const greetingLine1 = d.greetingH1Line1 || 'Olá, que bom ter';
  const greetingLine2 = d.greetingH1Line2 || 'você por aqui.';
  const areas = d.areasSubtitle || 'Desenvolvimento, automações e suporte.';
  const presentation =
    d.presentation ||
    'Sou Kauê Ruon Cardoso. Crio aplicações, automatizo rotinas e ajudo pessoas a usar tecnologia.';
  const ctaExplore = d.ctaExplore || 'Explorar meu trabalho';
  const ctaResume = d.ctaResumeShort || 'Currículo';
  const scrollHint = d.scrollHint || 'Explore os caminhos ou role para ver os projetos ↓';
  const destDevelopment = d.destDevelopment || 'Desenvolvimento';
  const destAutomation = d.destAutomation || 'Automação';
  const destSupport = d.destSupport || 'Suporte';
  const locationEdu = d.locationEdu || 'Blumenau, SC · ADS em formação';

  return (
    <section
      id="hero"
      aria-label="Apresentação e Paisagem Interativa"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24 overflow-hidden"
    >
      {/* ── Topo: Abertura e Apresentação (U04–U09) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 sm:mb-14">
        {/* Lado Esquerdo: Cumprimento e Atuação (U04–U06) */}
        <div className="lg:col-span-7 space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-[#14131C] dark:text-[#F3F2F5]">
            <span className="block">{greetingLine1}</span>
            <span className="block text-[#6534D8] dark:text-[#A17AFF]">
              {greetingLine2}
            </span>
          </h1>

          <p className="text-base sm:text-xl font-medium text-[#565565] dark:text-[#A09FA8] pt-1">
            {areas}
          </p>
        </div>

        {/* Lado Direito: Apresentação e CTAs (U07–U09) */}
        <div className="lg:col-span-5 space-y-6 lg:pt-2">
          <p className="text-sm sm:text-base leading-relaxed text-[#565565] dark:text-[#C5C4D0]">
            {presentation}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            {/* U08: CTA Principal */}
            <Link
              href="#projetos"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#6534D8] hover:bg-[#5225b8] text-white text-sm sm:text-base font-semibold transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6534D8] min-h-[44px] min-w-[44px]"
            >
              {ctaExplore}
            </Link>

            {/* U09: Currículo Secundário */}
            <a
              href="/curriculo_kaue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-sm sm:text-base font-medium text-[#14131C] dark:text-[#F3F2F5] hover:text-[#6534D8] dark:hover:text-[#A17AFF] border border-[#D9D9E3] dark:border-[#333240] hover:border-[#6534D8]/40 dark:hover:border-[#A17AFF]/40 bg-white/60 dark:bg-black/20 backdrop-blur-sm transition-all min-h-[44px] min-w-[44px]"
            >
              <span>{ctaResume}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Paisagem Conceitual Mineral com Poster e Rótulos Ancorados (W01–W11, U10–U12) ── */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#EBEBF0] dark:border-[#22212C] bg-[#F7F7FA] dark:bg-[#111015] shadow-sm">
        {/* Container que preserva proporção 1433 x 1098 para Zero CLS */}
        <div className="relative w-full aspect-[1433/1098]">
          <Image
            src="/images/hero-clean.webp"
            alt="Paisagem conceitual mineral com caminhos violeta interligando os pavilhões de Desenvolvimento, Automação e Suporte"
            width={1433}
            height={1098}
            priority
            fetchPriority="high"
            className="w-full h-full object-cover select-none"
          />

          {/* Rótulos dos Pavilhões Ancorados sobre a Imagem (Desktop e Tablet) */}
          {/* U10: Desenvolvimento (W01) */}
          <Link
            href="#projetos"
            style={{ left: '14.3%', top: '45.3%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/85 dark:bg-[#14131C]/85 border border-black/10 dark:border-white/15 text-xs sm:text-sm font-medium text-[#14131C] dark:text-[#F3F2F5] shadow-md hover:scale-105 hover:border-[#6534D8] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-h-[44px]"
          >
            <span className="w-2 h-2 rounded-full bg-[#6534D8] animate-pulse" aria-hidden="true" />
            <span>{destDevelopment}</span>
          </Link>

          {/* U11: Automação (W02) */}
          <Link
            href="#project-atlas"
            style={{ left: '51.4%', top: '35.6%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/85 dark:bg-[#14131C]/85 border border-black/10 dark:border-white/15 text-xs sm:text-sm font-medium text-[#14131C] dark:text-[#F3F2F5] shadow-md hover:scale-105 hover:border-[#6534D8] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-h-[44px]"
          >
            <span className="w-2 h-2 rounded-full bg-[#6534D8] animate-pulse" aria-hidden="true" />
            <span>{destAutomation}</span>
          </Link>

          {/* U12: Suporte (W03) */}
          <Link
            href="#experiencia"
            style={{ left: '87.5%', top: '43.1%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/85 dark:bg-[#14131C]/85 border border-black/10 dark:border-white/15 text-xs sm:text-sm font-medium text-[#14131C] dark:text-[#F3F2F5] shadow-md hover:scale-105 hover:border-[#6534D8] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] min-h-[44px]"
          >
            <span className="w-2 h-2 rounded-full bg-[#6534D8] animate-pulse" aria-hidden="true" />
            <span>{destSupport}</span>
          </Link>
        </div>

        {/* Barra de Destinos Touch-Friendly para Mobile (< 640px) */}
        <div className="sm:hidden grid grid-cols-3 divide-x divide-[#EBEBF0] dark:divide-[#22212C] border-t border-[#EBEBF0] dark:border-[#22212C] bg-white dark:bg-[#14131C]">
          <Link
            href="#projetos"
            className="flex flex-col items-center justify-center p-3 text-xs font-semibold text-[#14131C] dark:text-[#F3F2F5] hover:bg-[#F7F7FA] dark:hover:bg-[#1c1b26] transition-colors min-h-[44px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6534D8] mb-1" />
            <span>{destDevelopment}</span>
          </Link>
          <Link
            href="#project-atlas"
            className="flex flex-col items-center justify-center p-3 text-xs font-semibold text-[#14131C] dark:text-[#F3F2F5] hover:bg-[#F7F7FA] dark:hover:bg-[#1c1b26] transition-colors min-h-[44px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6534D8] mb-1" />
            <span>{destAutomation}</span>
          </Link>
          <Link
            href="#experiencia"
            className="flex flex-col items-center justify-center p-3 text-xs font-semibold text-[#14131C] dark:text-[#F3F2F5] hover:bg-[#F7F7FA] dark:hover:bg-[#1c1b26] transition-colors min-h-[44px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6534D8] mb-1" />
            <span>{destSupport}</span>
          </Link>
        </div>
      </div>

      {/* ── Base do Hero: Indicação de Rolagem, Formação e Atalhos Rápidos (U13–U16) ── */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#565565] dark:text-[#A09FA8]">
        {/* U14: Localização e Formação */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
          <span>{locationEdu}</span>
        </div>

        {/* U13: Indicação Discreta de Rolagem */}
        <p className="text-center font-medium text-[#6534D8] dark:text-[#A17AFF]">
          {scrollHint}
        </p>

        {/* U15 + U16: Atalhos Rápidos */}
        <div className="flex items-center gap-3">
          <Link
            href="#project-atlas"
            className="hover:text-[#14131C] dark:hover:text-[#F3F2F5] transition-colors underline-offset-4 hover:underline py-1 px-1 min-h-[44px] flex items-center"
          >
            Atlas Notarial
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="#project-ckf"
            className="hover:text-[#14131C] dark:hover:text-[#F3F2F5] transition-colors underline-offset-4 hover:underline py-1 px-1 min-h-[44px] flex items-center"
          >
            CKF
          </Link>
        </div>
      </div>
    </section>
  );
}
