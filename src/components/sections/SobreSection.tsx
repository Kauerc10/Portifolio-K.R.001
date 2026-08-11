import type { Dictionary } from '@/i18n/types';

export default function SobreSection({ dict: d }: { dict: Dictionary['sobre'] }) {

  return (
    <section className="section sobre" id="sobre" data-section="2">
      <div className="section__line" />
      <div className="sobre__grid">
        <div className="sobre__text">
          <span className="section__article">Art. I §1º</span>
          <h2 className="section__title">{d.title}</h2>
                    <p className="sobre__paragraph anim-slide">{d.bioP1}</p>
          <p className="sobre__paragraph anim-slide">{d.bioP2}</p>
          <p className="sobre__paragraph anim-slide">{d.bioP3}</p>
        </div>
        <div className="sobre__card-wrap">
          <div className="sobre__card magnetic" data-cursor="INFO" id="fichaCard">
            <div className="sobre__card-header">■ {d.badge}</div>
            <div className="sobre__card-divider" />
            {d.fields.map((field) => (
              <div className="sobre__card-row" key={field.label}>
                <span className="sobre__card-label">{field.label}</span>
                <span>{field.value}</span>
              </div>
            ))}
            <div className="sobre__stamp" id="fichaStamp">{d.authenticated}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
