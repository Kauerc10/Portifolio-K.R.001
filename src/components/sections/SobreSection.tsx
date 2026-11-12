import type { Dictionary } from '@/i18n/types';
import SectionMotionEnhancer from './SectionMotionEnhancer';

export default function SobreSection({ dict: d }: { dict: Dictionary['sobre'] }) {
  return (
    <section className="section editorial-section sobre" id="sobre" data-section="2">
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
      <picture className="editorial-about-ribbon" aria-hidden="true" data-motion-art>
        <img src="/images/editorial-details/about-ribbon-2172.webp" srcSet="/images/editorial-details/about-ribbon-1100.webp 1100w, /images/editorial-details/about-ribbon-2172.webp 2172w" sizes="100vw" width="2172" height="300" alt="" loading="lazy" decoding="async" />
      </picture>
      <div className="editorial-pillars" aria-label={d.pillarsLabel} data-motion-pillars>
        {d.pillars.map((pillar) => (
          <article className="editorial-pillar" key={pillar.title}>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </article>
        ))}
      </div>
      <SectionMotionEnhancer sectionId="sobre" kind="sobre" />
    </section>
  );
}
