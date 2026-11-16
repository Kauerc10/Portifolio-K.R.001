'use client';
import { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import PortalArtwork from '../hero/PortalArtwork';
import PortfolioIntro from '../hero/PortfolioIntro';
import type { Dictionary } from '@/i18n/types';

export default function HeroSection({ dict: d }: { dict: Dictionary['hero'] }) {
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById('projetos');
    if (target) {
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="hero" aria-label={d.greetingH1} className="portal-hero">
      <PortfolioIntro dict={d} onComplete={() => setReady(true)} />
      <div className="portal-composition">
        <div className="portal-intro">
          <div>
            <h1 tabIndex={-1}>
              <span data-intro-target="first">{d.greetingH1Line1}</span>{' '}
              <span data-intro-target="second">{d.greetingH1Line2}</span>
            </h1>
            <p className="portal-areas">{d.areasSubtitle}</p>
          </div>
          <div className="portal-presentation">
            <p data-intro-target="support">{d.presentation}</p>
            <div className="portal-primary-links">
              <a href="#projetos" className="portal-primary">
                {d.ctaExplore}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                href="/curriculo_kaue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="portal-resume"
              >
                {d.ctaResumeShort}
              </a>
            </div>
          </div>
        </div>
        <div className="portal-scene">
          <PortalArtwork />
        </div>
      </div>
      <div
        className={`portal-scroll-prompt ${ready ? 'is-ready' : ''} ${scrolled ? 'is-scrolled' : ''}`}
        aria-hidden={!ready || scrolled}
      >
        <div className="portal-scroll-prompt-motion">
          <a
            href="#projetos"
            onClick={handleScrollClick}
            className="portal-scroll-prompt-link"
            aria-label={d.scrollDown}
            tabIndex={!ready || scrolled ? -1 : undefined}
          >
            <span className="portal-scroll-prompt-text">{d.scrollDown}</span>
            <span className="portal-scroll-prompt-icon" aria-hidden="true">
              <ChevronDown size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
