import GithubLiveStats from '@/components/widgets/GithubLiveStats';
import { ExternalLink, GitBranch, Lock, Zap, ShieldCheck, CheckCircle2, FileText, Cpu, ArrowRight } from 'lucide-react';

export default function ProjetosSection() {
  return (
    <section className="section evidencias" id="projetos" data-section="7">
      <div className="section__line"></div>
      <span className="section__article">Anexo II</span>
      <h2 className="section__title" data-cipher>DOS PROJETOS · CASE STUDIES DE ENGENHARIA</h2>

      {/* Grid dos Mini Case Studies de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        
        {/* CASE STUDY 1: DOCFÁCIL */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white/5 border border-white/10 dark:border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-xl flex flex-col justify-between"
          id="project-docfacil"
        >
          <div>
            {/* Header / Seal */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                DEMO AO VIVO · SAAS IA
              </span>
              <Cpu className="w-5 h-5 text-[var(--gold)]" />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">DocFácil — IA Generativa em Documentos Legais</h3>
            
            {/* Mini Case Study Structure */}
            <div className="space-y-3 text-xs text-gray-300 font-mono my-4 border-y border-white/10 py-4">
              <div>
                <strong className="text-[var(--gold)] block text-[11px] uppercase tracking-wider mb-0.5">■ O PROBLEMA:</strong>
                <p className="text-gray-400 leading-relaxed">Redação manual de documentos jurídicos propensa a inconsistências e burocracia desnecessária.</p>
              </div>

              <div>
                <strong className="text-emerald-400 block text-[11px] uppercase tracking-wider mb-0.5">⚡ SOLUÇÃO & ARQUITETURA:</strong>
                <p className="text-gray-300 leading-relaxed">
                  Plataforma Next.js 16 com camada de IA agnóstica (<code className="text-emerald-400 font-bold">AIProvider</code>), streaming server-side e suporte plugável a OpenAI, Anthropic e Gemini.
                </p>
              </div>
            </div>

            <span className="inline-block px-3 py-1 rounded-lg bg-white/5 text-[11px] text-gray-300 font-mono border border-white/10 mb-4">
              Next.js 16 · TypeScript · IA Generativa · RAG
            </span>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-white/5 text-xs font-mono font-bold">
            <a
              href="https://docfacil-indol.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[var(--gold)] text-[#0b1120] hover:bg-amber-400 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>DEMO AO VIVO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/Kauerc10/docfacil"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[var(--gold)]/40 flex items-center gap-1.5 transition-all"
            >
              <span>REPOSITÓRIO</span>
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* CASE STUDY 2: ATLAS NOTARIAL */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-xl flex flex-col justify-between"
          id="project-atlas"
        >
          <div>
            {/* Header / Seal */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono flex items-center gap-1.5 font-bold">
                <Lock className="w-3 h-3 text-amber-400" />
                EM PRODUÇÃO · CARTÓRIO GAYA
              </span>
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">Atlas Notarial — Automação com API Detran-RS</h3>

            {/* Mini Case Study Structure */}
            <div className="space-y-3 text-xs text-gray-300 font-mono my-4 border-y border-white/10 py-4">
              <div>
                <strong className="text-amber-400 block text-[11px] uppercase tracking-wider mb-0.5">■ O PROBLEMA:</strong>
                <p className="text-gray-400 leading-relaxed">Emissão manual de procurações de veículos levando 5 minutos de digitação por documento.</p>
              </div>

              <div>
                <strong className="text-emerald-400 block text-[11px] uppercase tracking-wider mb-0.5">⚡ MÉTRICA DE IMPACTO:</strong>
                <p className="text-gray-200 leading-relaxed">
                  Tempo reduzido de <strong className="text-amber-400 font-bold">5 minutos para 20 segundos</strong> por procuração com 100% de precisão jurídica.
                </p>
              </div>
            </div>

            <span className="inline-block px-3 py-1 rounded-lg bg-white/5 text-[11px] text-gray-300 font-mono border border-white/10 mb-4">
              Node.js · REST APIs · Automação Notarial · Vitest
            </span>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-white/5 text-xs font-mono text-rose-400 font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>PROJETO PRIVADO (SISTEMA INTERNO EM PRODUÇÃO)</span>
          </div>
        </div>

        {/* CASE STUDY 3: CKF MANUTENÇÃO */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-xl flex flex-col justify-between"
          id="project-ckf"
        >
          <div>
            {/* Header / Seal */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3 h-3 text-blue-400" />
                EM PRODUÇÃO · CORPORATIVO
              </span>
              <FileText className="w-5 h-5 text-blue-400" />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">CKF Manutenção — Orçamentos & Maquinário</h3>

            {/* Mini Case Study Structure */}
            <div className="space-y-3 text-xs text-gray-300 font-mono my-4 border-y border-white/10 py-4">
              <div>
                <strong className="text-blue-400 block text-[11px] uppercase tracking-wider mb-0.5">■ O PROBLEMA:</strong>
                <p className="text-gray-400 leading-relaxed">Falta de controle centralizado para emissão de orçamentos de manutenção em máquinas pesadas.</p>
              </div>

              <div>
                <strong className="text-emerald-400 block text-[11px] uppercase tracking-wider mb-0.5">⚡ ARQUITETURA & QUALIDADE:</strong>
                <p className="text-gray-300 leading-relaxed">
                  Interface React com Supabase, exportação de relatórios (CSV/XLSX) e suíte de testes unitários automatizada com Vitest.
                </p>
              </div>
            </div>

            <span className="inline-block px-3 py-1 rounded-lg bg-white/5 text-[11px] text-gray-300 font-mono border border-white/10 mb-4">
              React · TypeScript · Supabase · Vitest · XLSX
            </span>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-white/5 text-xs font-mono font-bold">
            <a
              href="https://ckf-manutencao-orcamentos.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[var(--gold)] text-[#0b1120] hover:bg-amber-400 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>DEMO AO VIVO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/Kauerc10/ckf-manutencao-orcamentos"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[var(--gold)]/40 flex items-center gap-1.5 transition-all"
            >
              <span>REPOSITÓRIO</span>
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* CASE STUDY 4: FOLI LIB */}
        <div
          className="evidence__folder anim-slide magnetic p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--gold)] transition-all duration-300 shadow-xl flex flex-col justify-between"
          id="project-foli"
        >
          <div>
            {/* Header / Seal */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono flex items-center gap-1.5 font-bold">
                <Zap className="w-3 h-3 text-purple-400" />
                OPEN SOURCE · LIB TYPESCRIPT
              </span>
              <GitBranch className="w-5 h-5 text-purple-400" />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">Foli — PDF Layout Engine em TypeScript</h3>

            {/* Mini Case Study Structure */}
            <div className="space-y-3 text-xs text-gray-300 font-mono my-4 border-y border-white/10 py-4">
              <div>
                <strong className="text-purple-400 block text-[11px] uppercase tracking-wider mb-0.5">■ O PROBLEMA:</strong>
                <p className="text-gray-400 leading-relaxed">Quebras de layout e overflow inesperado ao gerar PDFs complexos no Node.js e navegador.</p>
              </div>

              <div>
                <strong className="text-emerald-400 block text-[11px] uppercase tracking-wider mb-0.5">⚡ ENGENHARIA DA LIB:</strong>
                <p className="text-gray-300 leading-relaxed">
                  Fluent Builder API com motor de layout que garante zero overflow, primitivas nativas e suporte Unicode pt-BR.
                </p>
              </div>
            </div>

            <span className="inline-block px-3 py-1 rounded-lg bg-white/5 text-[11px] text-gray-300 font-mono border border-white/10 mb-4">
              TypeScript · PDF Engine · Open Source · Zero-Overflow
            </span>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-white/5 text-xs font-mono font-bold">
            <a
              href="https://github.com/Kauerc10/foli"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-purple-600/90 text-white hover:bg-purple-500 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>VER NO GITHUB</span>
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* GitHub Telemetry — discreto, como assinatura de código no rodapé da seção */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <GithubLiveStats />
      </div>
    </section>
  );
}
