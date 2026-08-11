import type { Dictionary } from '@/i18n/types';

export default function FormacaoSection({ dict }: { dict?: Dictionary['formacao'] }) {
  const d = dict || {
    title: 'FORMAÇÃO ACADÊMICA',
    subtitle: 'QUALIFICAÇÃO CONTINUADA E APERFEIÇOAMENTO TÉCNICO',
    statusCompleted: 'CONCLUÍDO',
    statusInProgress: 'EM ANDAMENTO',
    btnCertificate: 'Ver Certificado',
    btnOpen: 'ABRIR',
    items: [
      {
        title: 'Engenharia de Software / Ciência da Computação',
        institution: 'Ensino Superior Tecnológico',
        period: '2024 — PRESENTE',
        status: 'EM ANDAMENTO',
        description: 'Foco em arquitetura de sistemas distribuídos, estrutura de dados, segurança cibernética e inteligência artificial.',
      },
      {
        title: 'Desenvolvimento Web Full Stack & IA Generativa',
        institution: 'Especialização e Projetos Práticos Próprios',
        period: '2025 — 2026',
        status: 'CONCLUÍDO',
        description: 'Construção de aplicações Next.js 15, integração de LLMs via Vercel AI SDK, otimização 3D WebGL e governança de código.',
      },
    ],
  };

  return (
    <section className="section formacao" id="formacao" data-section="6">
      <div className="section__line" />
      <span className="section__article">Anexo I</span>
      <h2 className="section__title">{d.title}</h2>
      <p className="text-xs text-slate-400 mb-8 font-mono">{d.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {d.items.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-950/60 border border-slate-800 dark:border-white/10 hover:border-[var(--gold)]/50 transition-all duration-300 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-amber-400">{item.period}</span>
              <span className={`px-2 py-0.5 text-[10px] font-mono rounded ${item.status === 'CONCLUÍDO' || item.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                {item.status === 'CONCLUÍDO' || item.status === 'COMPLETED' ? d.statusCompleted : d.statusInProgress}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">{item.title}</h3>
            <p className="text-xs text-slate-400 mb-3">{item.institution}</p>
            <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
