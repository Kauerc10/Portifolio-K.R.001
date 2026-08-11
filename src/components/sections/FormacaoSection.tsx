import type { Dictionary } from '@/i18n/types';

export default function FormacaoSection({ dict }: { dict: Dictionary['formacao'] }) {
  return (
    <section className="section formacao" id="formacao" data-section="6">
      <div className="section__line"></div>
      <span className="section__article">{dict.article}</span>
      <h2 className="section__title">{dict.title}</h2>

      <div className="formacao__grid">
        <div className="formacao__card anim-slide magnetic" data-cursor={dict.btnOpen}>
          <div className="formacao__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
            </svg>
          </div>
          <h3 className="formacao__name">{dict.items[0].title}</h3>
          <p className="formacao__info">{dict.items[0].info}</p>
          <div className="formacao__stamp">{dict.statusCompleted}</div>
        </div>
        <div className="formacao__card anim-slide magnetic" data-cursor={dict.btnOpen}>
          <div className="formacao__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h3 className="formacao__name">{dict.items[1].title}</h3>
          <p className="formacao__info">{dict.items[1].info}</p>
          <div className="formacao__stamp">{dict.statusCompleted}</div>
        </div>
        <div className="formacao__card anim-slide magnetic" data-cursor={dict.btnOpen}>
          <div className="formacao__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <h3 className="formacao__name">{dict.items[2].title}</h3>
          <p className="formacao__info">{dict.items[2].info}</p>
          <div className="formacao__stamp">{dict.statusCompleted}</div>
        </div>
        <div className="formacao__card anim-slide magnetic" data-cursor={dict.btnOpen}>
          <div className="formacao__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
          </div>
          <h3 className="formacao__name">{dict.items[3].title}</h3>
          <p className="formacao__info">{dict.items[3].info}</p>
          <div className="formacao__stamp">{dict.statusCompleted}</div>
        </div>
        <div className="formacao__card anim-slide magnetic" data-cursor={dict.btnOpen}>
          <div className="formacao__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <h3 className="formacao__name">{dict.items[4].title}</h3>
          <p className="formacao__info">{dict.items[4].info}</p>
          <div className="formacao__stamp">{dict.statusCompleted}</div>
        </div>
      </div>
    </section>
  );
}
