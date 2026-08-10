export default function ExperienciaSection() {
  return (
    <section className="section experiencia" id="experiencia" data-section="3">
      <div className="section__line"></div>
      <span className="section__article">Art. II</span>
      <h2 className="section__title">DO HISTÓRICO DE ATUAÇÃO</h2>

      <div className="timeline">
        <div className="timeline__line" id="timelineLine"></div>

        {/* PROJETO PESSOAL: DOCFÁCIL */}
        <div className="timeline__item timeline__item--right anim-slide">
          <div className="timeline__dot"></div>
          <div className="timeline__content">
            <div className="timeline__header">
              <span className="timeline__year">Jul 2026 → ATUAL</span>
              <span className="timeline__badge timeline__badge--active"><span className="status-dot"></span> EM DESENVOLVIMENTO</span>
            </div>
            <h3 className="timeline__title">Founder & Builder — DocFácil</h3>
            <p className="timeline__company">K-HUB Soluções · <a href="https://github.com/Kauerc10/docfacil" target="_blank" rel="noopener" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>github.com/Kauerc10/docfacil ↗</a></p>

            <div className="timeline__highlight">
              <div className="timeline__highlight-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </div>
              <div>
                <h4 className="timeline__highlight-title">ARQUITETURA DE IA: AI PROVIDER + STREAMING</h4>
                <p>Plataforma Next.js que gera documentos legais conversando com o usuário. Construí uma camada agnóstica
                  de provedor (<code>AIProvider</code>) com factory por env var, API route server-side
                  (<code>/api/ai/generate</code>) que mantém a chave secreta no servidor, streaming de respostas e
                  tratamento de erro tipado (<code>AIError</code>). Providers reais (OpenAI / Anthropic / Gemini) são
                  pluggáveis sem tocar no resto do app.</p>
                <span className="timeline__stack">Stack: Next.js 16 · TypeScript · Prisma · IA Generativa</span>
              </div>
            </div>

            <ul className="timeline__bullets">
              <li>Interface conversacional (chat guiado) com preview do documento em tempo real.</li>
              <li>Camada de IA desacoplada — trocar de LLM não exige mudar o front-end.</li>
            </ul>
          </div>
        </div>

        {/* CARTÓRIO GAYA */}
        <div className="timeline__item timeline__item--left anim-slide">
          <div className="timeline__dot"></div>
          <div className="timeline__content">
            <div className="timeline__header">
              <span className="timeline__year">2023 → ATUAL</span>
              <span className="timeline__badge timeline__badge--active"><span className="status-dot"></span> EM CURSO</span>
            </div>
            <h3 className="timeline__title">Cartorário / Depto. de Procurações</h3>
            <p className="timeline__company">Cartório Gaya · Blumenau/SC</p>

            <div className="timeline__highlight">
              <div className="timeline__highlight-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </div>
              <div>
                <h4 className="timeline__highlight-title">PROJETO DE INICIATIVA: ATLAS NOTARIAL</h4>
                <p>Construí uma automação que consome endpoints do Detran-RS pra gerar procurações de veículos
                  automaticamente, eliminando digitação manual repetitiva. Está em produção no cartório até hoje — uma
                  tarefa que tomava minutos virou poucos cliques.</p>
                <span className="timeline__stack">Stack: Node.js · APIs REST · Automação</span>
              </div>
            </div>

            <ul className="timeline__bullets">
              <li>Redação de procurações, escrituras e inventários.</li>
              <li>Melhoria não supervisionada de metodologias digitais.</li>
              <li>Suporte e diagnóstico geral das redes e hardwares do ambiente.</li>
            </ul>
          </div>
        </div>

        {/* IPHONERIA */}
        <div className="timeline__item timeline__item--right anim-slide">
          <div className="timeline__dot"></div>
          <div className="timeline__content">
            <div className="timeline__header">
              <span className="timeline__year">Nov 2021 → Mar 2023</span>
              <span className="timeline__badge">CONCLUÍDO</span>
            </div>
            <h3 className="timeline__title">Técnico em Manutenção Apple</h3>
            <p className="timeline__company">iPhoneria · Blumenau/SC</p>
            <p className="timeline__note">Promoção rápida de estagiário para técnico de diagnóstico.</p>
            <ul className="timeline__bullets">
              <li>Micro-soldadura, diagnóstico térmico e reparo de placas iOS.</li>
              <li>Controle de estoque de peças e organização do fluxo de reparos.</li>
              <li>Atendimento focado em traduzir problemas técnicos em respostas simples ao cliente.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
