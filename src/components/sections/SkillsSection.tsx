export default function SkillsSection() {
  return (
    <section className="section skills" id="skills" data-section="4">
      <div className="section__line"></div>
      <span className="section__article">Art. III</span>
      <h2 className="section__title">DAS COMPETÊNCIAS</h2>
      <p className="skills__intro anim-slide">O que eu realmente uso nos projetos (verificável nos repositórios públicos).
        Sem porcentagens inventadas — eu construo com IA como ferramenta primária e domino o fluxo de decompor, instruir e
        conectar.</p>

      <div className="skills__grid">
        <div className="skills__technical">
          <h3 className="skills__soft-title">IA Generativa</h3>
          <div className="skills__chips">
            <span className="chip magnetic" data-cursor="✓">Integração de LLMs</span>
            <span className="chip magnetic" data-cursor="✓">Arquitetura de Providers</span>
            <span className="chip magnetic" data-cursor="✓">OpenAI / Anthropic / Gemini</span>
            <span className="chip magnetic" data-cursor="✓">Streaming de respostas</span>
            <span className="chip magnetic" data-cursor="✓">Prompt engineering</span>
          </div>

          <h3 className="skills__soft-title">Construindo com</h3>
          <div className="skills__chips">
            <span className="chip magnetic" data-cursor="✓">JavaScript / TypeScript</span>
            <span className="chip magnetic" data-cursor="✓">React / Next.js</span>
            <span className="chip magnetic" data-cursor="✓">Supabase / Prisma</span>
            <span className="chip magnetic" data-cursor="✓">Node.js</span>
          </div>

          <h3 className="skills__soft-title">Praticando</h3>
          <div className="skills__chips">
            <span className="chip magnetic" data-cursor="✓">APIs REST</span>
            <span className="chip magnetic" data-cursor="✓">Automação de processos</span>
            <span className="chip magnetic" data-cursor="✓">Testes unitários</span>
            <span className="chip magnetic" data-cursor="✓">Git / Deploy (Vercel)</span>
          </div>
        </div>

        <div className="skills__soft">
          <h3 className="skills__soft-title">Competências Complementares</h3>
          <div className="skills__chips">
            <span className="chip magnetic" data-cursor="✓">Gestão Documental</span>
            <span className="chip magnetic" data-cursor="✓">Atenção a Detalhes</span>
            <span className="chip magnetic" data-cursor="✓">Resolução de Problemas</span>
            <span className="chip magnetic" data-cursor="✓">Aprendizagem Rápida</span>
            <span className="chip magnetic" data-cursor="✓">Raciocínio Lógico</span>
            <span className="chip magnetic" data-cursor="✓">Trabalho em Equipe</span>
            <span className="chip magnetic" data-cursor="✓">Inglês (Intermediário)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
