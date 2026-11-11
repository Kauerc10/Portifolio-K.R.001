import type { Dictionary } from '@/i18n/types';
import { Braces, Cpu, Sparkles } from 'lucide-react';

const groupIcons = [Braces, Cpu, Sparkles];

export default function SkillsSection({ dict: d }: { dict: Dictionary['skills'] }) {
  const titleBreak = d.title.lastIndexOf(' ');
  return (
    <section className="section editorial-section skills editorial-skills" id="skills" data-section="4">
      <div className="editorial-section__eyebrow">{d.eyebrow}</div>
      <div className="editorial-section__rule" aria-hidden="true" />
      <div className="editorial-grid editorial-grid--skills">
        <div className="editorial-intro">
          <h2 className="editorial-display">
            {d.title.slice(0, titleBreak)}{' '}<em>{d.title.slice(titleBreak + 1)}</em>
          </h2>
          <p className="editorial-lede">{d.subtitle}</p>
          <a className="editorial-cta" href="/curriculo_kaue.pdf" target="_blank" rel="noopener noreferrer">{d.resumeCta}<span aria-hidden="true">↗</span></a>
        </div>
        <div className="editorial-skill-list" aria-label={d.groupsLabel}>
        {d.groups.map((group, groupIndex) => {
          const Icon = groupIcons[groupIndex] ?? Cpu;
          return (
            <article className="editorial-skill-row" key={group.title}>
              <div className="editorial-skill-row__copy">
                <Icon className="editorial-skill-row__icon" aria-hidden="true" />
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                {group.links?.length ? (
                  <div className="editorial-skill-row__links">
                    {group.links.map((link) => <a key={link.href} href={link.href}>{link.label}<span aria-hidden="true">↗</span></a>)}
                  </div>
                ) : null}
              </div>
              <div className="editorial-skill-row__chips">
                {group.items.map((item) => (
                  <span className="editorial-skill-chip" key={item}>
                    <Icon className="editorial-skill-chip__icon" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
        </div>
      </div>
    </section>
  );
}
