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
      <div className="relative w-full aspect-[1433/1018] min-h-[680px] flex flex-col justify-between select-none">
        {/* Imagem Canônica de Fundo (Preenche todo o canvas: céu branco no topo, paisagem no meio/base) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src="/images/hero-clean.jpg"
            alt="Paisagem conceitual mineral com caminhos violeta interligando os pavilhões de Desenvolvimento, Automação e Suporte"
            // Keep the original artwork bytes: avoid a second lossy optimization pass.
            unoptimized
            sizes="(max-width: 1433px) 100vw, 1433px"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
          />
        </div>

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
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* U10: Desenvolvimento (W01) */}
          <Link
            href="#projetos"
            style={{ left: '13.3%', top: 'calc(45.9% - 24px)' }}
            className="group absolute pointer-events-auto -translate-x-1/2 -translate-y-full flex items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] rounded p-1 min-w-[44px] min-h-[44px]"
            aria-label={destDevelopment}
          >
            <div className="flex flex-col items-center">
              <span className="w-[1.5px] h-10 sm:h-14 bg-[#6534D8] group-hover:bg-[#5225b8] transition-colors" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#6534D8] shadow-sm -mt-0.5" />
            </div>
            <span className="text-sm sm:text-base font-medium text-[#1E1B4B] dark:text-[#F3F2F5] group-hover:text-[#6534D8] dark:group-hover:text-[#A17AFF] transition-colors tracking-tight pl-2 -translate-y-1">
              {destDevelopment}
            </span>
          </Link>

          {/* U11: Automação (W02) */}
          <Link
            href="#project-atlas"
            style={{ left: '50.5%', top: 'calc(35.0% - 24px)' }}
            className="group absolute pointer-events-auto -translate-x-1/2 -translate-y-full flex items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] rounded p-1 min-w-[44px] min-h-[44px]"
            aria-label={destAutomation}
          >
            <div className="flex flex-col items-center">
              <span className="w-[1.5px] h-10 sm:h-14 bg-[#6534D8] group-hover:bg-[#5225b8] transition-colors" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#6534D8] shadow-sm -mt-0.5" />
            </div>
            <span className="text-sm sm:text-base font-medium text-[#1E1B4B] dark:text-[#F3F2F5] group-hover:text-[#6534D8] dark:group-hover:text-[#A17AFF] transition-colors tracking-tight pl-2 -translate-y-1">
              {destAutomation}
            </span>
          </Link>

          {/* U12: Suporte (W03) */}
          <Link
            href="#experiencia"
            style={{ left: '87.1%', top: 'calc(43.4% - 24px)' }}
            className="group absolute pointer-events-auto -translate-x-1/2 -translate-y-full flex items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6534D8] rounded p-1 min-w-[44px] min-h-[44px]"
            aria-label={destSupport}
          >
            <div className="flex flex-col items-center">
              <span className="w-[1.5px] h-10 sm:h-14 bg-[#6534D8] group-hover:bg-[#5225b8] transition-colors" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#6534D8] shadow-sm -mt-0.5" />
            </div>
            <span className="text-sm sm:text-base font-medium text-[#1E1B4B] dark:text-[#F3F2F5] group-hover:text-[#6534D8] dark:group-hover:text-[#A17AFF] transition-colors tracking-tight pl-2 -translate-y-1">
              {destSupport}
            </span>
          </Link>
        </div>

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
