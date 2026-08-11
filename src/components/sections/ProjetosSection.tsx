import GithubLiveStats from '@/components/widgets/GithubLiveStats';
import { ExternalLink, GitBranch, Lock, Cpu, ShieldCheck, CheckCircle2, FileText, Zap } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

export default function ProjetosSection({ dict }: { dict?: Dictionary['projetos'] }) {
  const d = dict || {
    title: 'PROJETOS EM DESTAQUE',
    subtitle: 'CASE STUDIES DE PRODUÇÃO E ENGENHARIA DE SOFTWARE',
    btnDemo: 'Live Demo',
    btnRepo: 'Repositório',
    privateRepo: 'Repositório Privado',
    items: {
      docfacil: {
        title: 'DocFácil — Automação Notarial',
        tagline: 'Gerador Autônomo de Minutas de Escrituras e Procurações Notariais',
        description: 'Plataforma web avançada para cartórios que reduz em até 70% o tempo de elaboração de minutas notariais através de algoritmos de preenchimento inteligente e validação rigorosa.',
      },
      atlas: {
        title: 'Atlas Notarial — Gestão Jurisprudencial',
        tagline: 'Motor de Consulta Semântica RAG para Legislação e Provimentos',
        description: 'Sistema corporativo de busca semântica em normativas notariais e decisões da Corregedoria, permitindo aos tabeliães e escreventes consultar jurisprudência em milissegundos.',
      },
      ckf: {
        title: 'CKF Manutenção — Gestão Industrial',
        tagline: 'Sistema de Controle Operacional de Chamados e Manutenção',
        description: 'Aplicação web responsiva para gerenciamento de ordens de serviço, agendamento de rotinas preventivas e controle de estoque de peças industriais.',
      },
      folilib: {
        title: 'Foli Lib — Biblioteca de Efeitos 3D WebGL',
        tagline: 'Engine de Shaders GLSL e Partículas de Alta Performance para Web',
        description: 'Biblioteca open-source de componentes e shaders WebGL acelerados por GPU para proporcionar experiências visuais 3D fluidas a 60 FPS com baixo consumo de memória.',
      },
    },
  };

  return (
    <section className="section evidencias" id="projetos" data-section="7">
      <div className="section__line" />
      <span className="section__article font-mono font-bold">Anexo II</span>
      <h2 className="section__title" data-cipher>{d.title}</h2>
      <p className="text-xs text-slate-400 mb-8 font-mono">{d.subtitle}</p>

      {/* Grid dos Mini Case Studies de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        
        {/* CASE STUDY 1: DOCFÁCIL */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-lg dark:shadow-xl flex flex-col justify-between"
          id="project-docfacil"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-mono flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                SAAS IA · LIVE DEMO
              </span>
              <Cpu className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{d.items.docfacil.title}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-3">{d.items.docfacil.tagline}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">{d.items.docfacil.description}</p>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-white/5 text-xs font-mono font-bold">
            <a
              href="https://docfacil-indol.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[var(--gold)] text-[#0b1120] hover:bg-amber-400 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>{d.btnDemo}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/Kauerc10/docfacil"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 hover:border-[var(--gold)]/40 flex items-center gap-1.5 transition-all"
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
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/30 font-mono flex items-center gap-1.5 font-bold">
                <Lock className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                PRODUCTION SYSTEM
              </span>
              <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{d.items.atlas.title}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-3">{d.items.atlas.tagline}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">{d.items.atlas.description}</p>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-white/5 text-xs font-mono text-rose-700 dark:text-rose-400 font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>{d.privateRepo}</span>
          </div>
        </div>

        {/* CASE STUDY 3: CKF MANUTENÇÃO */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-lg dark:shadow-xl flex flex-col justify-between"
          id="project-ckf"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30 font-mono flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                ENTERPRISE WEB APP
              </span>
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{d.items.ckf.title}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-3">{d.items.ckf.tagline}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">{d.items.ckf.description}</p>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-white/5 text-xs font-mono font-bold">
            <a
              href="https://ckf-manutencao-orcamentos.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[var(--gold)] text-[#0b1120] hover:bg-amber-400 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>{d.btnDemo}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/Kauerc10/ckf-manutencao-orcamentos"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 hover:border-[var(--gold)]/40 flex items-center gap-1.5 transition-all"
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
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/30 font-mono flex items-center gap-1.5 font-bold">
                <Zap className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                OPEN SOURCE ENGINE
              </span>
              <GitBranch className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{d.items.folilib.title}</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-3">{d.items.folilib.tagline}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-4">{d.items.folilib.description}</p>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-white/5 text-xs font-mono font-bold">
            <a
              href="https://github.com/Kauerc10/foli"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-purple-700 dark:bg-purple-600/90 text-white hover:bg-purple-600 flex items-center gap-1.5 transition-all shadow-md"
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
