import GithubLiveStats from '@/components/widgets/GithubLiveStats';
import { ExternalLink, GitBranch, Lock, Cpu, ShieldCheck, FileText } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

export default function ProjetosSection({ dict: d }: { dict: Dictionary['projetos'] }) {

  return (
    <section className="section evidencias" id="projetos" data-section="7">
      <div className="section__line" />
      <span className="section__article font-mono font-bold">Anexo II</span>
      <h2 className="section__title">{d.title}</h2>

      {/* Grid dos Mini Case Studies de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        
        {/* CASE STUDY 1: DOCFÁCIL */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-lg dark:shadow-xl flex flex-col justify-between"
          id="project-docfacil"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] py-1 font-mono flex items-center gap-2 font-bold tracking-[0.08em] border-b text-emerald-700 dark:text-emerald-300 border-emerald-500/40">
                <span className="opacity-60">CASE 01</span><span aria-hidden="true">/</span>{d.items.docfacil.status}
              </span>
              <Cpu className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{d.items.docfacil.title}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-3">{d.problemLabel}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">{d.items.docfacil.problem}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-2"><span aria-hidden="true">↳</span> {d.items.docfacil.solutionLabel}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-3">{d.items.docfacil.solution}</p>
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{d.items.docfacil.stack}</p>
          </div>

          <div className="case-actions case-actions--emerald">
            <a
              href="https://docfacil-indol.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="case-action case-action--primary"
            >
              <span>{d.btnDemo}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/Kauerc10/docfacil"
              target="_blank"
              rel="noopener noreferrer"
              className="case-action case-action--secondary"
            >
              <span>{d.btnRepo}</span>
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* CASE STUDY 2: ATLAS NOTARIAL */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-lg dark:shadow-xl flex flex-col justify-between"
          id="project-atlas"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] py-1 font-mono flex items-center gap-2 font-bold tracking-[0.08em] border-b text-amber-800 dark:text-amber-300 border-amber-500/40">
                <span className="opacity-60">CASE 02</span><span aria-hidden="true">/</span>{d.items.atlas.status}
              </span>
              <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{d.items.atlas.title}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-3">{d.problemLabel}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">{d.items.atlas.problem}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-2"><span aria-hidden="true">↳</span> {d.items.atlas.solutionLabel}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-3">{d.items.atlas.solution}</p>
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{d.items.atlas.stack}</p>
          </div>

          <div className="case-actions case-actions--amber">
            <span className="case-action case-action--status">
              <Lock className="w-3.5 h-3.5" />
              <span>{d.privateRepo}</span>
            </span>
          </div>
        </div>

        {/* CASE STUDY 3: CKF MANUTENÇÃO */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-lg dark:shadow-xl flex flex-col justify-between"
          id="project-ckf"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] py-1 font-mono flex items-center gap-2 font-bold tracking-[0.08em] border-b text-blue-700 dark:text-blue-300 border-blue-500/40">
                <span className="opacity-60">CASE 03</span><span aria-hidden="true">/</span>{d.items.ckf.status}
              </span>
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{d.items.ckf.title}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-3">{d.problemLabel}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">{d.items.ckf.problem}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-2"><span aria-hidden="true">↳</span> {d.items.ckf.solutionLabel}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-3">{d.items.ckf.solution}</p>
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{d.items.ckf.stack}</p>
          </div>

          <div className="case-actions case-actions--blue">
            <a
              href="https://ckf-manutencao-orcamentos.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="case-action case-action--primary"
            >
              <span>{d.btnDemo}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/Kauerc10/ckf-manutencao-orcamentos"
              target="_blank"
              rel="noopener noreferrer"
              className="case-action case-action--secondary"
            >
              <span>{d.btnRepo}</span>
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* CASE STUDY 4: FOLI LIB */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-lg dark:shadow-xl flex flex-col justify-between"
          id="project-foli"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] py-1 font-mono flex items-center gap-2 font-bold tracking-[0.08em] border-b text-purple-700 dark:text-purple-300 border-purple-500/40">
                <span className="opacity-60">CASE 04</span><span aria-hidden="true">/</span>{d.items.folilib.status}
              </span>
              <GitBranch className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{d.items.folilib.title}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-3">{d.problemLabel}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">{d.items.folilib.problem}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-2"><span aria-hidden="true">↳</span> {d.items.folilib.solutionLabel}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-3">{d.items.folilib.solution}</p>
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{d.items.folilib.stack}</p>
          </div>

          <div className="case-actions case-actions--purple">
            <a
              href="https://github.com/Kauerc10/foli"
              target="_blank"
              rel="noopener noreferrer"
              className="case-action case-action--primary"
            >
              <span>{d.btnRepo}</span>
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(15,23,42,0.1)' }}>
        <GithubLiveStats />
      </div>
    </section>
  );
}
