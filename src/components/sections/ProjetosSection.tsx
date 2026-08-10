import GithubLiveStats from '@/components/widgets/GithubLiveStats';

export default function ProjetosSection() {
  return (
    <section className="section evidencias" id="projetos" data-section="7">
      <div className="section__line"></div>
      <span className="section__article">Anexo II</span>
      <h2 className="section__title" data-cipher>DOS PROJETOS</h2>

      <div className="evidence__grid">
        {/* DOCFÁCIL */}
        <div className="evidence__folder anim-slide magnetic" data-cursor="DOCFÁCIL" id="project-docfacil">
          <div className="evidence__seal evidence__seal--live">DEMO AO VIVO</div>
          <div className="evidence__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          <h3 className="evidence__title">DocFácil</h3>
          <p className="evidence__desc">Plataforma Next.js que gera documentos legais conversando com o usuário. Camada de IA
            agnóstica de provedor (<code>AIProvider</code>), API route server-side, streaming e providers OpenAI/Anthropic/Gemini plugáveis.</p>
          <span className="evidence__tag">Next.js · TypeScript · IA Generativa</span>
          <div className="evidence__footer">
            <a href="https://docfacil-indol.vercel.app" target="_blank" rel="noopener" className="evidence__link-btn">⚡ DEMO ↗</a>
            <a href="https://github.com/Kauerc10/docfacil" target="_blank" rel="noopener" className="evidence__link-btn">💻 REPO ↗</a>
          </div>
        </div>

        {/* CKF MANUTENÇÃO */}
        <div className="evidence__folder anim-slide magnetic" data-cursor="CKF" id="project-ckf">
          <div className="evidence__seal evidence__seal--live">EM PRODUÇÃO</div>
          <div className="evidence__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <h3 className="evidence__title">CKF Manutenção — Gestão de Orçamentos</h3>
          <p className="evidence__desc">Sistema interno em produção para empresa de manutenção de máquinas pesadas, com criação, gestão, filtros, exportação de relatórios (CSV/XLSX) e suíte de testes unitários com Vitest.</p>
          <span className="evidence__tag">React · TypeScript · Supabase · Vitest</span>
          <div className="evidence__footer">
            <a href="https://ckf-manutencao-orcamentos.vercel.app" target="_blank" rel="noopener" className="evidence__link-btn">⚡ DEMO ↗</a>
            <a href="https://github.com/Kauerc10/ckf-manutencao-orcamentos" target="_blank" rel="noopener" className="evidence__link-btn">💻 REPO ↗</a>
          </div>
        </div>

        {/* ATLAS NOTORIAL */}
        <div className="evidence__folder anim-slide magnetic" data-cursor="PRIVADO" id="project-atlas">
          <div className="evidence__seal evidence__seal--internal">🔒 PROJETO PRIVADO</div>
          <div className="evidence__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
          <h3 className="evidence__title">Atlas Notarial — Automação Notarial</h3>
          <p className="evidence__desc">Plataforma em produção no Cartório Gaya. Automação via API do Detran-RS que reduziu a emissão de procurações de veículo de 5min para 20s com 100% de precisão.</p>
          <span className="evidence__tag">Next.js · TypeScript · APIs REST · Vitest</span>
          <div className="evidence__footer"><span className="evidence__action" style={{ color: '#ef4444' }}>🔒 PROJETO PRIVADO (DADOS NOTARIAIS SENSÍVEIS)</span></div>
        </div>

        {/* FOLI */}
        <div className="evidence__folder anim-slide magnetic" data-cursor="FOLI" id="project-foli">
          <div className="evidence__seal evidence__seal--live">OPEN SOURCE</div>
          <div className="evidence__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <h3 className="evidence__title">Foli</h3>
          <p className="evidence__desc">Biblioteca TypeScript para geração de PDF em Node.js e navegador. Fluent Builder API, motor de layout com garantia de zero overflow, primitivas nativas e suporte Unicode pt-BR.</p>
          <span className="evidence__tag">TypeScript · PDF · Layout Engine</span>
          <div className="evidence__footer">
            <a href="https://github.com/Kauerc10/foli" target="_blank" rel="noopener" className="evidence__link-btn">💻 REPO ON GITHUB ↗</a>
          </div>
        </div>
      </div>

      {/* GitHub Telemetry — discreto, após os cards */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <GithubLiveStats />
      </div>
    </section>
  );
}
