import type { Dictionary } from '@/i18n/types';

export default function ExperienciaSection({ dict: d }: { dict: Dictionary['experiencia'] }) {

  return (
    <section className="section experiencia" id="experiencia" data-section="3">
      <div className="section__line" />
      <span className="section__article">Art. II</span>
      <h2 className="section__title">{d.title}</h2>

      <div className="timeline">
        <div className="timeline__line" id="timelineLine" />

        {d.roles.map((role, idx) => (
          <div
            key={idx}
            className={`timeline__item ${idx % 2 === 0 ? 'timeline__item--right' : 'timeline__item--left'} anim-slide`}
          >
            <div className="timeline__dot" />
            <div className="timeline__content">
              <div className="timeline__header">
                <span className="timeline__year">{role.period}</span>
                <span className="timeline__badge timeline__badge--active">
                  <span className="status-dot" /> {role.status}
                </span>
              </div>
              <h3 className="timeline__title">{role.title}</h3>
              <p className="timeline__company">{role.company} · {role.location}</p>
              <h4 className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 mt-3">{role.projectLabel}</h4>
              <p className="timeline__paragraph mt-2 text-sm text-slate-300 dark:text-slate-400">
                {role.description}
              </p>

              <ul className="timeline__bullets mt-3">
                {role.achievements.map((ach, aIdx) => (
                  <li key={aIdx}>{ach}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {role.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/60 dark:bg-white/5 border border-slate-700/50 dark:border-white/10 text-slate-300 dark:text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
