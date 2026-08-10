import GithubLiveStats from '@/components/widgets/GithubLiveStats';
import ProjectStatusBadge from '@/components/widgets/ProjectStatusBadge';
import { ExternalLink, Github, Linkedin, Mail, Award, FileCode2, ShieldCheck, Terminal, Cpu, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 space-y-28">
      {/* ═══════════════════════════════════════════ */}
      {/* 1. HERO SECTION                             */}
      {/* ═══════════════════════════════════════════ */}
      <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-start space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs">
          <Sparkles className="w-4 h-4 animate-spin text-cyanNeon" />
          <span>AI ENGINEER · BLUMENAU / SC</span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-syne tracking-tight text-white leading-none">
            Kauê Ruon Cardoso
          </h1>
          <p className="text-xl sm:text-2xl font-mono text-cyanNeon leading-snug">
            Construo software guiando IA generativa — de protótipos com LLM a back-end e front-end.
          </p>
        </div>

        <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          Cartorário no Cartório Gaya e desenvolvedor. Minha bagagem notarial me deu tolerância zero a erros. 
          Meu trabalho é decompor problemas complexos, estruturar instruções técnicas rígidas e guiar LLMs até o fluxo inteiro funcionar em produção.
        </p>

        <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
          <a
            href="#projetos"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyanNeon text-bgDark font-bold hover:scale-105 transition-all shadow-lg shadow-cyan-500/20"
          >
            Explorar Projetos ↓
          </a>
          <a
            href="/curriculo_kaue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-bold hover:border-goldAccent hover:text-goldAccent transition-all"
          >
            Ver Currículo PDF 📄
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 2. SOBRE SECTION                            */}
      {/* ═══════════════════════════════════════════ */}
      <section id="sobre" className="space-y-8 scroll-mt-24">
        <div className="border-l-4 border-cyanNeon pl-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-syne text-white">
            // Sobre a Minha Visão de Engenharia
          </h2>
          <p className="text-xs font-mono text-gray-400">Processos notariais + IA Generativa em produção</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-cardBg/80 border border-white/10 space-y-4">
            <div className="flex items-center gap-3 text-cyanNeon">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="font-mono font-bold text-base text-white">Mentalidade Notarial</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              No departamento de procurações e inventários do Cartório Gaya, lidar com documentos jurídicos exige precisão absoluta. 
              Essa rigidez moldou meu estilo de desenvolvimento: enxergo fluxos e regras onde outros veem apenas tarefas soltas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cardBg/80 border border-white/10 space-y-4">
            <div className="flex items-center gap-3 text-goldAccent">
              <Cpu className="w-6 h-6" />
              <h3 className="font-mono font-bold text-base text-white">Engenharia Guiada por IA</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Uso IA generativa (Claude, GPT, Gemini) como ferramenta primária de aceleração e arquitetura. 
              Estruturo a instrução técnica, valido a segurança dos dados e integro as peças até rodar de forma escalável.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 3. PROJETOS SECTION                         */}
      {/* ═══════════════════════════════════════════ */}
      <section id="projetos" className="space-y-8 scroll-mt-24">
        <div className="border-l-4 border-goldAccent pl-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-syne text-white">
            // Projetos em Destaque
          </h2>
          <p className="text-xs font-mono text-gray-400">Sistemas reais desenvolvidos para produção</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* DocFácil */}
          <div
            id="project-docfacil"
            className="p-6 rounded-2xl bg-cardBg/80 border border-white/10 hover:border-cyanNeon/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold font-syne text-white">DocFácil</h3>
                <ProjectStatusBadge label="Online em Produção (Vercel)" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                IA Generativa aplicada a documentos legais (contratos, declarações e procurações) via chat guiado.
                Possui uma camada de IA agnóstica de provedor com streaming e tratamento tipado de erros.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] text-cyanNeon">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Next.js 16</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Prisma</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Vercel AI SDK</span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <a
                href="https://docfacil-indol.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-cyanNeon hover:underline"
              >
                <span>Demo Ao Vivo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/khub-solucoes/docfacil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-400 hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repositório</span>
              </a>
            </div>
          </div>

          {/* CKF Manutenção */}
          <div
            id="project-ckf"
            className="p-6 rounded-2xl bg-cardBg/80 border border-white/10 hover:border-cyanNeon/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold font-syne text-white">CKF Manutenção</h3>
                <ProjectStatusBadge label="Produção Interna Ativa" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Sistema interno em produção para empresa de manutenção mecânica. Gestão, filtro e exportação de orçamentos (CSV/XLSX) com testes unitários abrangentes.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] text-cyanNeon">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">React</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Supabase</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">TailwindCSS</span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <a
                href="https://ckf-manutencao-orcamentos.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-cyanNeon hover:underline"
              >
                <span>Demo Ao Vivo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/Kauerc10/ckf-manutencao-orcamentos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-400 hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repositório</span>
              </a>
            </div>
          </div>

          {/* Foli */}
          <div
            id="project-foli"
            className="p-6 rounded-2xl bg-cardBg/80 border border-white/10 hover:border-cyanNeon/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold font-syne text-white">Foli — PDF Engine TS</h3>
                <ProjectStatusBadge label="Open Source Package" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Biblioteca TypeScript para geração programática de PDFs com Fluent Builder API, motor de layout com garantia de zero-overflow e suporte Unicode pt-BR.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] text-cyanNeon">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Layout Engine</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Zero-Overflow</span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <a
                href="https://github.com/Kauerc10/foli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-cyanNeon hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repositório GitHub</span>
              </a>
            </div>
          </div>

          {/* Atlas Notarial */}
          <div
            id="project-atlas"
            className="p-6 rounded-2xl bg-cardBg/80 border border-white/10 hover:border-cyanNeon/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold font-syne text-white">Atlas Notarial</h3>
                <ProjectStatusBadge status="private" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Automação de procurações de veículos integrando a API do Detran-RS. Em produção no Cartório Gaya, transformando minutos de digitação manual em poucos cliques.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] text-goldAccent">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Node.js</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Detran REST API</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Cartório Gaya</span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs text-gray-400">
              <span>🔒 Código Privado (Dados Notariais Sensíveis)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 4. GITHUB LIVE STATS WIDGET                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="scroll-mt-24">
        <GithubLiveStats />
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 5. OBMEP SECTION                            */}
      {/* ═══════════════════════════════════════════ */}
      <section id="obmep" className="space-y-8 scroll-mt-24">
        <div className="border-l-4 border-amber-400 pl-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-syne text-white">
            // Conquistas na OBMEP (Matemática IMPA)
          </h2>
          <p className="text-xs font-mono text-gray-400">Base de raciocínio lógico forjada em matemática competitiva</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
            <Award className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-white text-sm">Medalha de Prata</h3>
            <p className="text-gray-400 text-[11px]">Fase Regional — OBMEP</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
            <Award className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-white text-sm">Medalha de Bronze</h3>
            <p className="text-gray-400 text-[11px]">Fase Nacional — OBMEP / IMPA</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
            <Award className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-white text-sm">2x Menção Honrosa</h3>
            <p className="text-gray-400 text-[11px]">Nível Nacional — OBMEP</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 6. CONTATO SECTION                          */}
      {/* ═══════════════════════════════════════════ */}
      <section id="contato" className="space-y-8 scroll-mt-24">
        <div className="border-l-4 border-cyanNeon pl-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-syne text-white">
            // Falar com Kauê
          </h2>
          <p className="text-xs font-mono text-gray-400">Aberto a propostas para AI Engineer e Full-Stack</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 font-mono text-xs">
            <p className="text-gray-300 leading-relaxed">
              Precisa de integração com LLMs, desenvolvimento Full-Stack com Next.js ou automação notarial/jurídica?
              Entre em contato direto pelos canais oficiais:
            </p>

            <div className="space-y-3">
              <a
                href="mailto:kaue.ruon@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyanNeon text-gray-200 hover:text-cyanNeon transition-colors"
              >
                <Mail className="w-5 h-5 text-cyanNeon" />
                <span>kaue.ruon@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/kauerc/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyanNeon text-gray-200 hover:text-cyanNeon transition-colors"
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
                <span>linkedin.com/in/kauerc</span>
              </a>

              <a
                href="https://github.com/Kauerc10"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyanNeon text-gray-200 hover:text-cyanNeon transition-colors"
              >
                <Github className="w-5 h-5 text-gray-300" />
                <span>github.com/Kauerc10</span>
              </a>
            </div>
          </div>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="p-6 rounded-2xl bg-cardBg border border-white/10 space-y-4 font-mono text-xs"
          >
            <input type="hidden" name="access_key" value="SEU_ACCESS_KEY_AQUI" />
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="space-y-1">
              <label className="text-gray-400">Nome Completo</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Seu nome"
                className="w-full px-3 py-2 rounded-lg bg-bgDark border border-white/10 text-white focus:outline-none focus:border-cyanNeon"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400">Seu E-mail</label>
              <input
                type="email"
                name="email"
                required
                placeholder="seu.email@exemplo.com"
                className="w-full px-3 py-2 rounded-lg bg-bgDark border border-white/10 text-white focus:outline-none focus:border-cyanNeon"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400">Mensagem</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Como posso te ajudar?"
                className="w-full px-3 py-2 rounded-lg bg-bgDark border border-white/10 text-white focus:outline-none focus:border-cyanNeon"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyanNeon text-bgDark font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
            >
              Enviar Petição / Mensagem 🚀
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center font-mono text-xs text-gray-500 pt-10 border-t border-white/10">
        <p>Construído por Kauê Ruon Cardoso com IA generativa como ferramenta de engenharia.</p>
        <p className="text-[10px] text-gray-600 mt-1">© 2026 kaueruon.dev · Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
