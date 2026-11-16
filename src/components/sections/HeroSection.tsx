'use client';
import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import PortalArtwork from '../hero/PortalArtwork';
import PortfolioIntro from '../hero/PortfolioIntro';
import { portalDestinations, type PortalDestination } from '../hero/portal-art';
import type { Dictionary } from '@/i18n/types';

export default function HeroSection({dict:d}:{dict:Dictionary['hero']}) {
  const [active,setActive]=useState<PortalDestination|null>(null);
  const labels={development:d.destDevelopment,automation:d.destAutomation,support:d.destSupport};
  return <section id="hero" aria-label={d.greetingH1} className="portal-hero">
    <PortfolioIntro dict={d} />
    <div className="portal-composition">
      <div className="portal-intro">
        <div><h1 tabIndex={-1}><span data-intro-target="first">{d.greetingH1Line1}</span>{' '}<span data-intro-target="second">{d.greetingH1Line2}</span></h1><p className="portal-areas">{d.areasSubtitle}</p></div>
        <div className="portal-presentation"><p data-intro-target="support">{d.presentation}</p><div className="portal-primary-links"><a href="#projetos" className="portal-primary">{d.ctaExplore}<ArrowUpRight size={17} aria-hidden="true" /></a><a href="/curriculo_kaue.pdf" target="_blank" rel="noopener noreferrer" className="portal-resume">{d.ctaResumeShort}</a></div></div>
      </div>
      <div className="portal-scene"><PortalArtwork /><nav className="portal-indicators" aria-label="Destinos da paisagem">{portalDestinations.map(destination=><a key={destination.id} href={destination.href} className="portal-indicator" style={{'--portal-x':`${destination.anchor[0]/1672*100}%`,'--portal-y':`${destination.anchor[1]/941*100}%`} as CSSProperties}>{labels[destination.id]}<span aria-hidden="true" /></a>)}</nav></div>
    </div>
    <div className="portal-explorer">
      <div className="portal-controls" role="group" aria-label="Explorar áreas">{portalDestinations.map(destination=><button type="button" key={destination.id} aria-label={`Explorar ${labels[destination.id]}`} aria-pressed={active===destination.id} onClick={()=>setActive(destination.id)}>{labels[destination.id]}<ArrowUpRight size={15} aria-hidden="true" /></button>)}</div>
      <div className="portal-preview"><p>{d.scrollHint}</p></div>
    </div>
    <div className="portal-footer"><span>{d.locationEdu}</span><a href="#project-atlas">Atlas Notarial<ArrowRight size={16} aria-hidden="true" /></a><a href="#project-ckf">CKF Manutenção<ArrowRight size={16} aria-hidden="true" /></a></div>
  </section>;
}
