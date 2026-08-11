import type { Dictionary } from '@/i18n/types';

export default function ConquistasSection({ dict }: { dict?: Dictionary['conquistas'] }) {
  const d = dict || {
    title: 'CONQUISTAS & MATEMÁTICA',
    subtitle: 'RIGOR LÓGICO COMPROVADO EM OLIMPÍADAS NACIONAIS',
    badge: 'IMPA / OBMEP',
    mathTitle: 'Destaque Nacional em Matemática Olímpica',
    mathDescription:
      'A premiação na Olimpíada Brasileira de Matemática das Escolas Públicas (OBMEP), organizada pelo IMPA (Instituto de Matemática Pura e Aplicada), reflete capacidade de raciocínio lógico avançado, solução de problemas complexos e disciplina rigorosa aplicada à engenharia de software.',
    medals: [
      {
        type: 'Prata',
        title: 'Medalhista de Prata Regional',
        edition: 'OBMEP — Edição Nacional',
        detail: 'Reconhecimento pelo desempenho de excelência na resolução de problemas matemáticos avançados.',
      },
      {
        type: 'Bronz',
        title: 'Medalhista de Bronze Nacional',
        edition: 'OBMEP — Cerimônia Nacional no IMPA',
        detail: 'Classificação no topo do ranking nacional de matemática entre milhões de participantes.',
      },
    ],
  };

  return (
    <section className="section obmep-vault" id="conquistas" data-section="5">
      <div className="section__article golden-text">Art. IV</div>
      <h2 className="section__title golden-text">{d.title}</h2>
      <p className="text-xs text-slate-400 mb-6 font-mono">{d.subtitle}</p>

      <div className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-950/60 border border-amber-500/30 mb-8 backdrop-blur-xl">
        <span className="px-3 py-1 text-[10px] font-mono rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
          {d.badge}
        </span>
        <h3 className="text-lg font-bold text-slate-100 mt-3 mb-2">{d.mathTitle}</h3>
        <p className="text-sm text-slate-300 dark:text-slate-400 leading-relaxed">{d.mathDescription}</p>
      </div>

      <div className="obmep-vault__container">
        <div className="obmep-timeline-track" />
        <div className="obmep-timeline-glow" />

        <div className="obmep-vault__grid">
          {d.medals.map((m, idx) => (
            <div key={idx} className="obmep-card magnetic" data-level={m.type.toLowerCase()} data-cursor={m.type.toUpperCase()}>
              <div className="obmep-card__aura" />
              <div className="obmep-node-marker" />
              <div className="obmep-card__content p-4 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-amber-400/80">{m.edition}</span>
                <h4 className="text-base font-bold text-white mt-1 mb-2">{m.title}</h4>
                <p className="text-xs text-slate-400">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
