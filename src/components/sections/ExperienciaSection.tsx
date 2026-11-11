import type { Dictionary } from '@/i18n/types';

export default function ExperienciaSection({ dict: d }: { dict: Dictionary['experiencia'] }) {
  return (
    <section className="section editorial-section experience-section experiencia" id="experiencia" data-section="3">
      <div className="editorial-grid editorial-grid--experience">
        <div className="editorial-intro">
          <h2 className="editorial-title editorial-title--display">{d.title}</h2>
          <p className="editorial-lede">{d.lede}</p>
        </div>
        <ol className="editorial-timeline" aria-label={d.timelineLabel}>
          {d.roles.map((role, idx) => (
            <li key={`${role.company}-${role.title}`} className="editorial-timeline__item">
              <span className={`editorial-timeline__dot ${idx === 1 ? 'editorial-timeline__dot--warm' : ''}`} aria-hidden="true" />
              <div>
                <h3>{role.company}</h3>
                <strong>{role.title}</strong>
                <span className="editorial-timeline__period">{role.period}</span>
                <p>{role.description}</p>
                <ul>{role.achievements.map((ach) => <li key={ach}>{ach}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
