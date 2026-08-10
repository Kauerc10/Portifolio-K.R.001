import GithubLiveStats from '@/components/widgets/GithubLiveStats';

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* NAVBAR                                      */}
      {/* ═══════════════════════════════════════════ */}
      <nav className="nav" id="nav">
        <a href="#hero" className="nav__logo" aria-label="Início">
          <img src="/assets/krc-logo-512.webp" alt="KRC" className="nav__logo-img" />
        </a>
        <div className="nav__links" id="navLinks">
          <a href="#hero" className="nav__link" data-section="1">INÍCIO</a>
          <a href="#sobre" className="nav__link" data-section="2">SOBRE</a>
          <a href="#experiencia" className="nav__link" data-section="3">EXPERIÊNCIA</a>
          <a href="#skills" className="nav__link" data-section="4">SKILLS</a>
          <a href="#conquistas" className="nav__link" data-section="5">CONQUISTAS</a>
          <a href="#formacao" className="nav__link" data-section="6">FORMAÇÃO</a>
          <a href="#projetos" className="nav__link" data-section="7">PROJETOS</a>
          <a href="#contato" className="nav__link" data-section="8">CONTATO</a>
        </div>
        <span className="nav__indicator" id="navIndicator">§ 01 / 08</span>
        <button className="nav__burger" id="navBurger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/* HERO — QUALIFICAÇÃO DO REQUERENTE            */}
      {/* ═══════════════════════════════════════════ */}
      <section className="hero section" id="hero" data-section="1">
        <div className="hero__text">
          <p className="hero__case mono-ghost">AI ENGINEER · BLUMENAU / SC · 2026</p>
          <h1 className="hero__name" id="heroName">
            <span className="hero__name-line hero__name--white">KAUÊ</span>
            <span className="hero__name-line hero__name--gold">RUON</span>
            <span className="hero__name-line hero__name--outline">CARDOSO</span>
          </h1>
          <div className="hero__typewriter" id="heroTypewriter">
            <span className="hero__tw-text" id="twText">&gt; Construo software com IA generativa.</span>
            <span className="hero__tw-cursor">|</span>
          </div>
          <div className="hero__buttons">
            <a href="#projetos" className="btn btn--primary magnetic" data-cursor="VER">VER PROJETOS ↓</a>
            <a href="/curriculo_kaue.pdf" download="Kauê Ruon Cardoso - Currículo.pdf" className="btn btn--outline magnetic" data-cursor="BAIXAR">CURRÍCULO.PDF</a>
          </div>
          <p className="hero__footnote mono-ghost">Nenhum processo foi arquivado na criação deste site.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SOBRE — Art. I · DO REQUERENTE               */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section sobre" id="sobre" data-section="2">
        <div className="section__line"></div>
        <div className="sobre__grid">
          <div className="sobre__text">
            <span className="section__article">Art. I §1º</span>
            <h2 className="section__title" data-cipher>DO REQUERENTE</h2>
            <p className="sobre__paragraph anim-slide">
              Meu interesse por tecnologia vem desde cedo, e sempre que vejo um processo manual e repetitivo, não consigo
              ficar sem querer automatizá-lo. Essa curiosidade me levou da manutenção de placas de iPhone até mesas de
              cartório — e de volta pra tecnologia.
            </p>
            <p className="sobre__paragraph anim-slide">
              Hoje trabalho como cartorário no Cartório Gaya, em Blumenau/SC. Lá dentro descobri que me dou muito bem com o
              mundo jurídico, mas a minha tendência sempre me puxa de volta pra tecnologia: sempre tento melhorar ou
              automatizar processos, mesmo sem ninguém me pedir.
            </p>
            <p className="sobre__paragraph anim-slide">
              Construo software guiando <strong>IA generativa</strong> (Claude, GPT) como ferramenta primária — de
              protótipos com LLM ao back-end e front-end. Não escrevo código do zero linha por linha; meu trabalho é
              <strong>decompor o problema, estruturar a instrução e conectar as peças</strong> até o fluxo inteiro funcionar.
              É exatamente o tipo de engenharia que quero fazer em produção: colocar IA pra resolver problemas reais.
            </p>
          </div>
          <div className="sobre__card-wrap">
            <div className="sobre__card magnetic" data-cursor="INFO" id="fichaCard">
              <div className="sobre__card-header">■ FICHA TÉCNICA</div>
              <div className="sobre__card-divider"></div>
              <div className="sobre__card-row"><span className="sobre__card-label">NOME</span><span>Kauê Ruon Cardoso</span></div>
              <div className="sobre__card-row"><span className="sobre__card-label">ORIGEM</span><span>Blumenau / SC</span></div>
              <div className="sobre__card-row"><span className="sobre__card-label">STACK</span><span>TS · React/Next.js · IA</span></div>
              <div className="sobre__card-row"><span className="sobre__card-label">DISTINÇÃO</span><span>Prata OBMEP Regional · Bronze Nacional</span></div>
              <div className="sobre__card-row"><span className="sobre__card-label">STATUS</span><span className="status-badge"><span className="status-dot"></span> ATIVO</span></div>
              <div className="sobre__stamp" id="fichaStamp">AUTENTICADO ✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* EXPERIÊNCIA — Art. II · DO HISTÓRICO         */}
      {/* ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════ */}
      {/* SKILLS — Art. III · DAS COMPETÊNCIAS         */}
      {/* ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════ */}
      {/* CONQUISTAS — Art. IV · O B M E P            */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section obmep-vault" id="conquistas" data-section="5">
        <div className="section__article golden-text">Artigo IV</div>
        <h2 className="section__title golden-text">Museu de Conquistas (OBMEP)</h2>

        <div className="obmep-vault__container">
          <div className="obmep-timeline-track"></div>
          <div className="obmep-timeline-glow"></div>

          <div className="obmep-vault__grid">
            {/* 2023 - PRATA REGIONAL */}
            <div className="obmep-card magnetic" data-level="prata" data-cursor="PRATA">
              <div className="obmep-card__aura"></div>
              <div className="obmep-node-marker"></div>
              <div className="obmep-card__content">
                <svg className="obmep-medal-svg medal-prata" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '140px', height: '182px', overflow: 'visible', flexShrink: 0 }} aria-label="Medalha de Prata OBMEP" role="img">
                  <defs>
                    <linearGradient id="medal-shine-prata" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0" />
                      <stop offset="40%" stopColor="#cbd5e1" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#ffffff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="metal-grad-prata" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <filter id="shadow-prata" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.6)" />
                    </filter>
                  </defs>
                  <path d="M34 2 L50 34 L42 34 L28 6 Z" fill="#64748b" filter="url(#shadow-prata)" />
                  <path d="M66 2 L72 6 L58 34 L50 34 Z" fill="#cbd5e1" filter="url(#shadow-prata)" />
                  <rect x="42" y="2" width="16" height="32" fill="url(#metal-grad-prata)" filter="url(#shadow-prata)" />
                  <circle cx="50" cy="80" r="42" fill="rgba(0,0,0,0.5)" filter="url(#shadow-prata)" />
                  <circle cx="50" cy="78" r="40" fill="#0b1120" stroke="url(#metal-grad-prata)" strokeWidth="2" />
                  <circle cx="50" cy="78" r="32" fill="none" stroke="rgba(203,213,225,0.2)" strokeWidth="0.5" strokeDasharray="2 4" />
                  <circle cx="50" cy="78" r="36" fill="none" stroke="rgba(203,213,225,0.4)" strokeWidth="1.2" />
                  <circle cx="50" cy="78" r="38" fill="none" stroke="url(#medal-shine-prata)" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 60 20 180">
                    <animateTransform attributeName="transform" type="rotate" values="0 50 78;360 50 78" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <text x="50" y="68" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5" fill="#94a3b8" letterSpacing="3">OBMEP</text>
                  <text x="50" y="85" textAnchor="middle" fontFamily="'Syne',sans-serif" fontSize="22" fontWeight="800" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">18ª</text>
                  <text x="50" y="99" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5.5" fill="url(#metal-grad-prata)" letterSpacing="2" fontWeight="bold">PRATA</text>
                </svg>
                <div className="obmep-card__info">
                  <span className="obmep-card__year">2023</span>
                  <h3 className="obmep-card__title">Prata Regional</h3>
                  <p className="obmep-card__desc">18ª Olimpíada Brasileira de Matemática das Escolas Públicas</p>
                </div>
              </div>
            </div>

            {/* 2023 - BRONZE NACIONAL */}
            <div className="obmep-card magnetic" data-level="bronze" data-cursor="BRONZE">
              <div className="obmep-card__aura"></div>
              <div className="obmep-node-marker"></div>
              <div className="obmep-card__content">
                <svg className="obmep-medal-svg medal-bronze" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '140px', height: '182px', overflow: 'visible', flexShrink: 0 }} aria-label="Medalha de Bronze OBMEP" role="img">
                  <defs>
                    <linearGradient id="medal-shine-bronze" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#d4a017" stopOpacity="0" />
                      <stop offset="40%" stopColor="#d4a017" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#fff8e1" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="metal-grad-bronze" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#b8871a" />
                      <stop offset="50%" stopColor="#fcd34d" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                    <filter id="shadow-bronze" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.6)" />
                    </filter>
                  </defs>
                  <path d="M34 2 L50 34 L42 34 L28 6 Z" fill="#b8871a" filter="url(#shadow-bronze)" />
                  <path d="M66 2 L72 6 L58 34 L50 34 Z" fill="#d4a017" filter="url(#shadow-bronze)" />
                  <rect x="42" y="2" width="16" height="32" fill="url(#metal-grad-bronze)" filter="url(#shadow-bronze)" />
                  <circle cx="50" cy="80" r="42" fill="rgba(0,0,0,0.5)" filter="url(#shadow-bronze)" />
                  <circle cx="50" cy="78" r="40" fill="#0b1120" stroke="url(#metal-grad-bronze)" strokeWidth="2" />
                  <circle cx="50" cy="78" r="32" fill="none" stroke="rgba(212,160,23,0.2)" strokeWidth="0.5" strokeDasharray="2 4" />
                  <circle cx="50" cy="78" r="36" fill="none" stroke="rgba(212,160,23,0.4)" strokeWidth="1.2" />
                  <circle cx="50" cy="78" r="38" fill="none" stroke="url(#medal-shine-bronze)" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 60 20 180">
                    <animateTransform attributeName="transform" type="rotate" values="0 50 78;360 50 78" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <text x="50" y="68" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5" fill="#fcd34d" letterSpacing="3">OBMEP</text>
                  <text x="50" y="85" textAnchor="middle" fontFamily="'Syne',sans-serif" fontSize="22" fontWeight="800" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">18ª</text>
                  <text x="50" y="99" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5.5" fill="url(#metal-grad-bronze)" letterSpacing="2" fontWeight="bold">BRONZE</text>
                </svg>
                <div className="obmep-card__info">
                  <span className="obmep-card__year">2023</span>
                  <h3 className="obmep-card__title">Bronze Nacional</h3>
                  <p className="obmep-card__desc">18ª Olimpíada Brasileira de Matemática das Escolas Públicas</p>
                </div>
              </div>
            </div>

            {/* 2022 - MENÇÃO HONROSA */}
            <div className="obmep-card magnetic" data-level="mencao" data-cursor="HONRA">
              <div className="obmep-card__aura"></div>
              <div className="obmep-node-marker"></div>
              <div className="obmep-card__content">
                <svg className="obmep-medal-svg medal-honra" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '140px', height: '182px', overflow: 'visible', flexShrink: 0 }} aria-label="Menção Honrosa OBMEP" role="img">
                  <defs>
                    <linearGradient id="metal-grad-honra-1" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#047857" />
                      <stop offset="50%" stopColor="#6ee7b7" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                    <filter id="shadow-honra-1" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.6)" />
                    </filter>
                  </defs>
                  <path d="M34 2 L50 34 L42 34 L28 6 Z" fill="#047857" filter="url(#shadow-honra-1)" />
                  <path d="M66 2 L72 6 L58 34 L50 34 Z" fill="#10b981" filter="url(#shadow-honra-1)" />
                  <rect x="42" y="2" width="16" height="32" fill="url(#metal-grad-honra-1)" filter="url(#shadow-honra-1)" />
                  <circle cx="50" cy="80" r="42" fill="rgba(0,0,0,0.5)" filter="url(#shadow-honra-1)" />
                  <circle cx="50" cy="78" r="40" fill="#0b1120" stroke="url(#metal-grad-honra-1)" strokeWidth="2" />
                  <text x="50" y="68" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5" fill="#6ee7b7" letterSpacing="3">OBMEP</text>
                  <text x="50" y="85" textAnchor="middle" fontFamily="'Syne',sans-serif" fontSize="22" fontWeight="800" fill="#ffffff">17ª</text>
                  <text x="50" y="99" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5.5" fill="url(#metal-grad-honra-1)" letterSpacing="2" fontWeight="bold">MENÇÃO</text>
                </svg>
                <div className="obmep-card__info">
                  <span className="obmep-card__year">2022</span>
                  <h3 className="obmep-card__title">Menção Honrosa</h3>
                  <p className="obmep-card__desc">17ª Olimpíada Brasileira de Matemática das Escolas Públicas</p>
                </div>
              </div>
            </div>

            {/* 2021 - MENÇÃO HONROSA */}
            <div className="obmep-card magnetic" data-level="mencao" data-cursor="HONRA">
              <div className="obmep-card__aura"></div>
              <div className="obmep-node-marker"></div>
              <div className="obmep-card__content">
                <svg className="obmep-medal-svg medal-honra" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '140px', height: '182px', overflow: 'visible', flexShrink: 0 }} aria-label="Menção Honrosa OBMEP" role="img">
                  <defs>
                    <linearGradient id="metal-grad-honra-2" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#047857" />
                      <stop offset="50%" stopColor="#6ee7b7" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                    <filter id="shadow-honra-2" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.6)" />
                    </filter>
                  </defs>
                  <path d="M34 2 L50 34 L42 34 L28 6 Z" fill="#047857" filter="url(#shadow-honra-2)" />
                  <path d="M66 2 L72 6 L58 34 L50 34 Z" fill="#10b981" filter="url(#shadow-honra-2)" />
                  <rect x="42" y="2" width="16" height="32" fill="url(#metal-grad-honra-2)" filter="url(#shadow-honra-2)" />
                  <circle cx="50" cy="80" r="42" fill="rgba(0,0,0,0.5)" filter="url(#shadow-honra-2)" />
                  <circle cx="50" cy="78" r="40" fill="#0b1120" stroke="url(#metal-grad-honra-2)" strokeWidth="2" />
                  <text x="50" y="68" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5" fill="#6ee7b7" letterSpacing="3">OBMEP</text>
                  <text x="50" y="85" textAnchor="middle" fontFamily="'Syne',sans-serif" fontSize="22" fontWeight="800" fill="#ffffff">16ª</text>
                  <text x="50" y="99" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5.5" fill="url(#metal-grad-honra-2)" letterSpacing="2" fontWeight="bold">MENÇÃO</text>
                </svg>
                <div className="obmep-card__info">
                  <span className="obmep-card__year">2021</span>
                  <h3 className="obmep-card__title">Menção Honrosa</h3>
                  <p className="obmep-card__desc">16ª Olimpíada Brasileira de Matemática das Escolas Públicas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FORMAÇÃO — Anexo I                          */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section formacao" id="formacao" data-section="6">
        <div className="section__line"></div>
        <span className="section__article">Anexo I</span>
        <h2 className="section__title">DA FORMAÇÃO E CERTIFICAÇÕES</h2>

        <div className="formacao__grid">
          <div className="formacao__card anim-slide magnetic" data-cursor="ABRIR">
            <div className="formacao__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <h3 className="formacao__name">Ensino Médio Completo</h3>
            <p className="formacao__info">EEB Cel. Pedro Christiano Feddersen</p>
            <div className="formacao__stamp">CONCLUÍDO</div>
          </div>
          <div className="formacao__card anim-slide magnetic" data-cursor="ABRIR">
            <div className="formacao__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="formacao__name">Téc. Gestão Administrativa</h3>
            <p className="formacao__info">156h · VisualMídia · 2020</p>
            <div className="formacao__stamp">CONCLUÍDO</div>
          </div>
          <div className="formacao__card anim-slide magnetic" data-cursor="ABRIR">
            <div className="formacao__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3 className="formacao__name">Operador de Tecnologia</h3>
            <p className="formacao__info">92h · VisualMídia · 2017</p>
            <div className="formacao__stamp">CONCLUÍDO</div>
          </div>
          <div className="formacao__card anim-slide magnetic" data-cursor="ABRIR">
            <div className="formacao__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </div>
            <h3 className="formacao__name">Programador de Games</h3>
            <p className="formacao__info">40h · VisualMídia · 2017</p>
            <div className="formacao__stamp">CONCLUÍDO</div>
          </div>
          <div className="formacao__card anim-slide magnetic" data-cursor="ABRIR">
            <div className="formacao__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <h3 className="formacao__name">3Ds Max</h3>
            <p className="formacao__info">32h · VisualMídia · 2018</p>
            <div className="formacao__stamp">CONCLUÍDO</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PROJETOS — Anexo II                         */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section evidencias" id="projetos" data-section="7">
        <div className="section__line"></div>
        <span className="section__article">Anexo II</span>
        <h2 className="section__title" data-cipher>DOS PROJETOS</h2>

        {/* Live GitHub Stats Widget */}
        <div className="my-8">
          <GithubLiveStats />
        </div>

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
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CONTATO — Petição Final                      */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section contato" id="contato" data-section="8">
        <div className="section__line"></div>
        <span className="section__article">Petição Final</span>
        <h2 className="section__title" data-cipher>SOLICITAR CONTATO</h2>

        <form className="peticao" id="peticaoForm" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
          <input type="checkbox" name="botcheck" className="peticao__honeypot" tabIndex={-1} autoComplete="off" />

          <div className="peticao__field">
            <label className="peticao__label">REQUERENTE (seu nome)</label>
            <input type="text" name="nome" className="peticao__input" placeholder="Nome completo" required />
          </div>
          <div className="peticao__field">
            <label className="peticao__label">E-MAIL DE CONTATO</label>
            <input type="email" name="email" className="peticao__input" placeholder="seu@email.com" required />
          </div>
          <div className="peticao__field">
            <label className="peticao__label">OBJETO DO CONTATO (assunto)</label>
            <input type="text" name="assunto" className="peticao__input" placeholder="Ex: proposta de trabalho" required />
          </div>
          <div className="peticao__field">
            <label className="peticao__label">EXPOSIÇÃO DOS FATOS (mensagem)</label>
            <textarea name="mensagem" className="peticao__textarea" rows={5} placeholder="Descreva sua solicitação..." required></textarea>
          </div>
          <button type="submit" className="btn btn--protocolar magnetic" data-cursor="PROTOCOLAR" id="btnProtocolar">
            <span className="btn__text">PROTOCOLAR SOLICITAÇÃO</span>
            <span className="btn__sent">✓ PETIÇÃO PROTOCOLADA</span>
          </button>
          <p className="peticao__feedback" id="peticaoFeedback"></p>
        </form>

        <div className="contato__info">
          <a href="mailto:kaue.ruon@gmail.com" className="contato__link magnetic" data-cursor="EMAIL">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            kaue.ruon@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/kauerc/" target="_blank" rel="noopener" className="contato__link magnetic" data-cursor="ABRIR">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            linkedin.com/in/kauerc
          </a>
          <a href="https://github.com/Kauerc10" target="_blank" rel="noopener" className="contato__link magnetic" data-cursor="ABRIR">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            github.com/Kauerc10
          </a>
          <span className="contato__link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Blumenau / SC — Disponível remoto
          </span>
        </div>
      </section>

      {/* KONAMI MODAL */}
      <div className="modal" id="konamiModal">
        <div className="modal__crt-overlay"></div>
        <div className="modal__box">
          <div className="modal__icon glitch">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h2 className="modal__title glitch" data-text="ACESSO ROOT CONCEDIDO">ACESSO ROOT CONCEDIDO</h2>
          <p className="modal__desc">God Mode Ativado. Você desativou os limitadores de segurança.</p>

          <div className="konami-stats">
            <div className="konami-stat">
              <span className="konami-stat-label">STATUS</span>
              <span className="konami-stat-val" style={{ color: 'var(--signal)' }}>OVERRIDE</span>
            </div>
            <div className="konami-stat">
              <span className="konami-stat-label">RESTRICTIONS</span>
              <span className="konami-stat-val" style={{ color: '#ef4444' }}>BYPASSED</span>
            </div>
          </div>

          <button className="btn btn--outline modal__close magnetic" data-cursor="EXIT" id="konamiClose">ENCERRAR CONEXÃO</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__links">
          <a href="mailto:kaue.ruon@gmail.com" className="footer__link">Email</a>
          <a href="https://www.linkedin.com/in/kauerc/" target="_blank" rel="noopener" className="footer__link">LinkedIn</a>
          <a href="https://github.com/Kauerc10" target="_blank" rel="noopener" className="footer__link">GitHub</a>
        </div>
        <p>© 2026 Kauê Ruon Cardoso · Construído com IA generativa como ferramenta de engenharia.</p>
      </footer>
    </>
  );
}
