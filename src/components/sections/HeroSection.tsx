'use client';
import { ArrowUpRight } from 'lucide-react';
import PortalArtwork from '../hero/PortalArtwork';
import PortfolioIntro from '../hero/PortfolioIntro';
import type { Dictionary } from '@/i18n/types';

export default function HeroSection({dict:d}:{dict:Dictionary['hero']}) {
  return <section id="hero" aria-label={d.greetingH1} className="portal-hero">
    <PortfolioIntro dict={d} />
    <div className="portal-composition">
      <div className="portal-intro">
        <div><h1 tabIndex={-1}><span data-intro-target="first">{d.greetingH1Line1}</span>{' '}<span data-intro-target="second">{d.greetingH1Line2}</span></h1><p className="portal-areas">{d.areasSubtitle}</p></div>
        <div className="portal-presentation"><p data-intro-target="support">{d.presentation}</p><div className="portal-primary-links"><a href="#projetos" className="portal-primary">{d.ctaExplore}<ArrowUpRight size={17} aria-hidden="true" /></a><a href="/curriculo_kaue.pdf" target="_blank" rel="noopener noreferrer" className="portal-resume">{d.ctaResumeShort}</a></div></div>
      </div>
      <div className="portal-scene"><PortalArtwork /></div>
    </div>
  </section>;
}
