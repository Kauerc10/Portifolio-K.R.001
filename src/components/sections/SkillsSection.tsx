import type { Dictionary } from '@/i18n/types';

export default function SkillsSection({ dict: d }: { dict: Dictionary['skills'] }) {
  return (
    <section className="section skills" id="skills" data-section="4">
      <div className="section__line" />
      <span className="section__article">Art. III</span>
      <h2 className="section__title">{d.title}</h2>
      <p className="skills__intro anim-slide">{d.subtitle}</p>

      <div className="skills__grid">
        {d.groups.map((group) => (
          <div className="skills__technical" key={group.title}>
            <h3 className="skills__soft-title">{group.title}</h3>
            <div className="skills__chips">
              {group.items.map((item) => (
                <span className="chip magnetic" data-cursor="✓" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
