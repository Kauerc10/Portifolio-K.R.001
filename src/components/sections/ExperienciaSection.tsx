import type { Dictionary } from '@/i18n/types';

export default function ExperienciaSection({ dict }: { dict?: Dictionary['experiencia'] }) {
  const d = dict || {
    title: 'EXPERIÊNCIA PROFISSIONAL',
    subtitle: 'TRAJETÓRIA TÉCNICA E IMPACTO EM PRODUÇÃO',
    roles: [
      {
        period: 'JUL 2026 — PRESENTE',
        title: 'Engenheiro de Software & Inovação Notarial',
        company: 'Serviços Notariais e Registrais / LegalTech',
        location: 'Brasil',
        description: 'Liderança e desenvolvimento de plataformas web modernas e agentes de IA para automação de minuta de escrituras, procurações e triagem de documentos.',
        achievements: [
          'Desenvolvimento de plataformas web integradas com APIs de IA para automação documental.',
          'Implementação de pipeline RAG com busca semântica para consulta rápida a provimentos e legislação.',
          'Otimização de rotinas com redução de 70% no tempo de elaboração de minutas complexas.',
        ],
        skills: ['Next.js 15', 'TypeScript', 'Python', 'RAG / Gemini API', 'Tailwind CSS', 'Node.js'],
      },
      {
        period: 'JAN 2025 — JUN 2026',
        title: 'Desenvolvedor Full Stack & Automação de Processos',
        company: 'Cartório de Notas e Protesto / Consultoria Tech',
        location: 'Santa Catarina, Brasil',
        description: 'Construção de sistemas internos para gestão de certidões, automação de fluxos operacionais e atendimento digital notarial.',
        achievements: [
          'Criação de ferramentas web para validação automática de dados de certidões e matrículas.',
          'Desenvolvimento do agente de IA ÆVO para suporte notarial interativo aos usuários.',
          'Mitigação de erros de digitação e triagem prévia automatizada de requerimentos.',
        ],
        skills: ['React', 'JavaScript', 'Python', 'CSS3 / HTML5', 'Web3Forms API', 'Git / GitHub'],
      },
    ],
  };

  return (
    <section className="section experiencia" id="experiencia" data-section="3">
      <div className="section__line" />
      <span className="section__article">Art. II</span>
      <h2 className="section__title">{d.title}</h2>
      <p className="text-xs text-slate-400 mb-8 font-mono">{d.subtitle}</p>

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
                  <span className="status-dot" /> ONLINE
                </span>
              </div>
              <h3 className="timeline__title">{role.title}</h3>
              <p className="timeline__company">{role.company} · {role.location}</p>
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
