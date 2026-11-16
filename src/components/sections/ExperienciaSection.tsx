import type { Dictionary } from '@/i18n/types';
import { Landmark, Smartphone } from 'lucide-react';
import LilacWaves from './LilacWaves';
import './ReadingLiving.css';
import styles from './ExperienciaSection.module.css';
import SectionMotionEnhancer from './SectionMotionEnhancer';

export default function ExperienciaSection({ dict: d }: { dict: Dictionary['experiencia'] }) {
  return (
    <section className={`section editorial-section experience-section experiencia editorial-reading ${styles.section}`} id="experiencia" data-section="3">
      <LilacWaves />
      <div className="editorial-grid editorial-grid--experience">
        <div className="editorial-intro">
          <h2 className="editorial-title editorial-title--display">{d.title}</h2>
          <p className="editorial-lede">{d.lede}</p>
        </div>
        <ol className="editorial-timeline" aria-label={d.timelineLabel}>
          {d.roles.map((role, idx) => {
            const Icon = idx === 0 ? Landmark : Smartphone;
            return (
            <li key={`${role.company}-${role.title}`} className="editorial-timeline__item" data-motion-experience-item>
              <span data-motion-dot className={`editorial-timeline__dot ${idx === 1 ? 'editorial-timeline__dot--warm' : ''}`} aria-hidden="true" />
              <span data-motion-segment className="editorial-timeline__segment" aria-hidden="true" />
              <div className="editorial-timeline__body">
                <span className="editorial-reading__icon" aria-hidden="true"><Icon /></span>
                <h3>{role.company}</h3>
                <strong>{role.title}</strong>
                <span className="editorial-timeline__period" data-motion-period>{role.period}</span>
                <p>{role.description}</p>
                <ul>{role.achievements.map((ach) => <li key={ach}>{ach}</li>)}</ul>
              </div>
            </li>
          ); })}
        </ol>
      </div>
      <SectionMotionEnhancer sectionId="experiencia" kind="experiencia" />

    </section>
  );
}
