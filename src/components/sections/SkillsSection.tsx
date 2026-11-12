import type { Dictionary } from '@/i18n/types';
import {
  Bot,
  Braces,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Radio,
  Server,
  Sparkles,
  Wand2,
  Webhook,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { splitAccentTitle } from '@/lib/editorial';
import SectionMotionEnhancer from './SectionMotionEnhancer';

const groupIcons = [Braces, Cpu, Sparkles];

const itemIcons: Record<string, LucideIcon> = {
  'JavaScript / TypeScript': Code2,
  'React / Next.js': Layers,
  'Supabase / Prisma': Database,
  'Node.js': Server,
  'APIs REST': Webhook,
  'REST APIs': Webhook,
  'Automação de processos': Workflow,
  'Process automation': Workflow,
  'Testes unitários': CheckCircle2,
  'Unit testing': CheckCircle2,
  'Git / Deploy (Vercel)': GitBranch,
  'Integração de LLMs': Sparkles,
  'LLM Integration': Sparkles,
  'Arquitetura de Providers': Cpu,
  'Provider Architecture': Cpu,
  'OpenAI / Anthropic / Gemini': Bot,
  'Streaming de respostas': Radio,
  'Response streaming': Radio,
  'Prompt engineering': Wand2,
};

export default function SkillsSection({ dict: d }: { dict: Dictionary['skills'] }) {
  const [titleLead, titleAccent] = splitAccentTitle(d.title);
  return (
    <section className="section editorial-section skills editorial-skills" id="skills" data-section="4">
      <div className="editorial-section__eyebrow">{d.eyebrow}</div>
      <div className="editorial-section__rule" aria-hidden="true" />
      <div className="editorial-grid editorial-grid--skills">
        <div className="editorial-intro">
          <h2 className="editorial-display">
            {titleLead}{' '}<em>{titleAccent}</em>
          </h2>
          <p className="editorial-lede">{d.subtitle}</p>
          <a className="editorial-cta" href="/curriculo_kaue.pdf" target="_blank" rel="noopener noreferrer">{d.resumeCta}<span aria-hidden="true">↗</span></a>
        </div>
        <div className="editorial-skill-list" aria-label={d.groupsLabel}>
        {d.groups.map((group, groupIndex) => {
          const GroupIcon = groupIcons[groupIndex] ?? Cpu;
          return (
            <article className="editorial-skill-row" key={group.title} data-motion-skill-row>
              <div className="editorial-skill-row__copy">
                <GroupIcon className="editorial-skill-row__icon" aria-hidden="true" />
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                {group.links?.length ? (
                  <div className="editorial-skill-row__links">
                    {group.links.map((link) => <a key={link.href} href={link.href}>{link.label}<span aria-hidden="true">↗</span></a>)}
                  </div>
                ) : null}
              </div>
              <div className="editorial-skill-row__chips">
                {group.items.map((item) => {
                  const ChipIcon = itemIcons[item] ?? GroupIcon;
                  return (
                    <span className="editorial-skill-chip" key={item}>
                      <ChipIcon className="editorial-skill-chip__icon" aria-hidden="true" />
                      {item}
                    </span>
                  );
                })}
              </div>
            </article>
          );
        })}
        </div>
      </div>
      <SectionMotionEnhancer sectionId="skills" kind="skills" />
    </section>
  );
}
