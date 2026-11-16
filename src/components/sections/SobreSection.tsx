import type { Dictionary } from '@/i18n/types';
import { Braces, Workflow, Headphones } from 'lucide-react';
import LilacWaves from './LilacWaves';
import './ReadingLiving.css';
import SectionMotionEnhancer from './SectionMotionEnhancer';

export default function SobreSection({ dict: d }: { dict: Dictionary['sobre'] }) {
  return (
    <section className="section editorial-section sobre editorial-reading" id="sobre" data-section="2">
      <LilacWaves />
      <div className="editorial-section__eyebrow">{d.eyebrow}</div>
      <div className="editorial-section__rule" aria-hidden="true" />
      <div className="editorial-grid editorial-grid--about">
        <div className="editorial-intro">
          <h2 className="editorial-title editorial-title--display editorial-title--about">{d.lede}{' '}<span>{d.headlineAccent}</span></h2>
        </div>
        <div className="editorial-profile">
          <h3 className="editorial-profile__name">{d.name}</h3>
          <div className="editorial-profile__rule" aria-hidden="true" />
          <p className="editorial-profile__copy">{d.profile}</p>
        </div>
      </div>
      <svg className="editorial-about-ribbon editorial-reading__ribbon" aria-hidden="true" focusable="false" data-motion-art viewBox="0 0 1600 160" preserveAspectRatio="none">
        <path d="M-40 72C480 210 1050-40 1640 48L1640 73C1050-13 480 229-40 94Z" fill="currentColor" opacity=".07" />
        <path d="M-40 72C480 210 1050-40 1640 48" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".2" />
        <path d="M-40 95C480 230 1050-10 1640 75" fill="none" stroke="currentColor" strokeWidth="1" opacity=".12" />
      </svg>
      <div className="editorial-pillars" aria-label={d.pillarsLabel} data-motion-pillars>
        {d.pillars.map((pillar, index) => {
          const Icon = [Braces, Workflow, Headphones][index] ?? Braces;
          return (
          <article className="editorial-pillar" key={pillar.title} data-motion-pillar>
            <span className="editorial-pillar__accent" data-motion-pillar-accent aria-hidden="true" />
            <span className="editorial-reading__icon" aria-hidden="true"><Icon /></span>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </article>
        ); })}
      </div>
      <SectionMotionEnhancer sectionId="sobre" kind="sobre" />
    </section>
  );
}
