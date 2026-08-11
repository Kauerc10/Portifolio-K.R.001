import type { Dictionary } from '@/i18n/types';

export default function SkillsSection({ dict }: { dict?: Dictionary['skills'] }) {
  const d = dict || {
    title: 'COMPETÊNCIAS TÉCNICAS',
    subtitle: 'STACK TECNOLÓGICA E FERRAMENTAS DE ALTA PERFORMANCE',
    categories: {
      frontend: 'Frontend & UI/UX',
      backend: 'Backend & APIs',
      ai: 'IA Generativa & Automação',
      tools: 'DevOps & Ferramentas',
    },
  };

  return (
    <section className="section skills" id="skills" data-section="4">
      <div className="section__line" />
      <span className="section__article">Art. III</span>
      <h2 className="section__title">{d.title}</h2>
      <p className="skills__intro anim-slide">{d.subtitle}</p>

      <div className="skills__grid">
        <div className="skills__technical">
          <h3 className="skills__soft-title">{d.categories.ai}</h3>
          <div className="skills__chips">
            <span className="chip magnetic" data-cursor="✓">RAG Pipelines</span>
            <span className="chip magnetic" data-cursor="✓">Tool Calling System</span>
            <span className="chip magnetic" data-cursor="✓">Vercel AI SDK</span>
            <span className="chip magnetic" data-cursor="✓">Gemini 1.5 Flash</span>
            <span className="chip magnetic" data-cursor="✓">OpenAI GPT-4o-mini</span>
          </div>

          <h3 className="skills__soft-title">{d.categories.frontend}</h3>
          <div className="skills__chips">
            <span className="chip magnetic" data-cursor="✓">Next.js 15 App Router</span>
            <span className="chip magnetic" data-cursor="✓">React & TypeScript</span>
            <span className="chip magnetic" data-cursor="✓">Tailwind CSS & Vanilla CSS</span>
            <span className="chip magnetic" data-cursor="✓">WebGL 3D (Three.js GLSL)</span>
          </div>

          <h3 className="skills__soft-title">{d.categories.backend}</h3>
          <div className="skills__chips">
            <span className="chip magnetic" data-cursor="✓">Node.js & Express</span>
            <span className="chip magnetic" data-cursor="✓">Python & Automation</span>
            <span className="chip magnetic" data-cursor="✓">RESTful APIs & JSON</span>
            <span className="chip magnetic" data-cursor="✓">Prisma ORM & PostgreSQL</span>
          </div>
        </div>

        <div className="skills__soft">
          <h3 className="skills__soft-title">{d.categories.tools}</h3>
          <div className="skills__chips">
            <span className="chip magnetic" data-cursor="✓">Git & GitHub Actions</span>
            <span className="chip magnetic" data-cursor="✓">Vercel Serverless</span>
            <span className="chip magnetic" data-cursor="✓">Vitest Unit Testing</span>
            <span className="chip magnetic" data-cursor="✓">Impeccable UI Audit</span>
            <span className="chip magnetic" data-cursor="✓">English (Bilingual / Professional)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
