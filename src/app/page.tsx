'use client';

import { useEffect } from 'react';
import GithubLiveStats from '@/components/widgets/GithubLiveStats';
import ProjectStatusBadge from '@/components/widgets/ProjectStatusBadge';

export default function Home() {
  useEffect(() => {
    // Typewriter effect para o hero
    const twText = document.getElementById('twText');
    if (twText) {
      const phrases = [
        '> Construo software com IA generativa.',
        '> IA generativa + tolerância zero a erros.',
        '> Decompor, instruir e conectar.',
      ];
      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      const typeLoop = () => {
        const current = phrases[phraseIdx];
        if (isDeleting) {
          twText.textContent = current.substring(0, charIdx - 1);
          charIdx--;
        } else {
          twText.textContent = current.substring(0, charIdx + 1);
          charIdx++;
        }

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIdx === current.length) {
          speed = 2500;
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          speed = 400;
        }

        setTimeout(typeLoop, speed);
      };

      setTimeout(typeLoop, 1000);
    }
  }, []);

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
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
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
                  </defs>
                  <path d="M34 2 L50 34 L42 34 L28 6 Z" fill="#64748b" />
                  <path d="M66 2 L72 6 L58 34 L50 34 Z" fill="#cbd5e1" />
                  <rect x="42" y="2" width="16" height="32" fill="url(#metal-grad-prata)" />
                  <circle cx="50" cy="80" r="42" fill="rgba(0,0,0,0.5)" />
                  <circle cx="50" cy="78" r="40" fill="#0b1120" stroke="url(#metal-grad-prata)" strokeWidth="2" />
                  <text x="50" y="68" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5" fill="#94a3b8" letterSpacing="3">OBMEP</text>
                  <text x="50" y="85" textAnchor="middle" fontFamily="'Syne',sans-serif" fontSize="22" fontWeight="800" fill="#ffffff">18ª</text>
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
                    <linearGradient id="metal-grad-bronze" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#b8871a" />
                      <stop offset="50%" stopColor="#fcd34d" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                  </defs>
                  <path d="M34 2 L50 34 L42 34 L28 6 Z" fill="#b8871a" />
                  <path d="M66 2 L72 6 L58 34 L50 34 Z" fill="#d4a017" />
                  <rect x="42" y="2" width="16" height="32" fill="url(#metal-grad-bronze)" />
                  <circle cx="50" cy="80" r="42" fill="rgba(0,0,0,0.5)" />
                  <circle cx="50" cy="78" r="40" fill="#0b1120" stroke="url(#metal-grad-bronze)" strokeWidth="2" />
                  <text x="50" y="68" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="5" fill="#fcd34d" letterSpacing="3">OBMEP</text>
                  <text x="50" y="85" textAnchor="middle" fontFamily="'Syne',sans-serif" fontSize="22" fontWeight="800" fill="#ffffff">18ª</text>
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
                  </defs>
                  <path d="M34 2 L50 34 L42 34 L28 6 Z" fill="#047857" />
                  <path d="M66 2 L72 6 L58 34 L50 34 Z" fill="#10b981" />
                  <rect x="42" y="2" width="16" height="32" fill="url(#metal-grad-honra-1)" />
                  <circle cx="50" cy="80" r="42" fill="rgba(0,0,0,0.5)" />
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
                  </defs>
                  <path d="M34 2 L50 34 L42 34 L28 6 Z" fill="#047857" />
                  <path d="M66 2 L72 6 L58 34 L50 34 Z" fill="#10b981" />
                  <rect x="42" y="2" width="16" height="32" fill="url(#metal-grad-honra-2)" />
                  <circle cx="50" cy="80" r="42" fill="rgba(0,0,0,0.5)" />
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
      {/* PROJETOS — Art. VI · DAS EVIDÊNCIAS         */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section evidencias" id="projetos" data-section="7">
        <div className="section__line"></div>
        <span className="section__article">Art. VI</span>
        <h2 className="section__title">DAS EVIDÊNCIAS (PROJETOS)</h2>

        {/* Live GitHub Stats Widget */}
        <div className="my-8">
          <GithubLiveStats />
        </div>

        <div className="evidencias__grid">
          {/* DocFácil */}
          <div className="evidence-card magnetic" data-cursor="VER" id="project-docfacil">
            <div className="evidence__icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="evidence__title">DocFácil</h3>
              <ProjectStatusBadge label="Online em Produção" />
            </div>
            <p className="evidence__desc">Plataforma que gera documentos legais (contratos, declarações, procurações) através de um chat guiado com o usuário. A peça central é uma camada de IA agnóstica de provedor.</p>
            <span className="evidence__tag">Next.js 16 · TypeScript · Prisma · IA Generativa</span>
            <div className="evidence__footer">
              <a href="https://docfacil-indol.vercel.app" target="_blank" rel="noopener" className="evidence__link-btn">🚀 DEMO AO VIVO ↗</a>
              <a href="https://github.com/khub-solucoes/docfacil" target="_blank" rel="noopener" className="evidence__link-btn">💻 REPO ON GITHUB ↗</a>
            </div>
          </div>

          {/* CKF Manutenção */}
          <div className="evidence-card magnetic" data-cursor="VER" id="project-ckf">
            <div className="evidence__icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="evidence__title">CKF Manutenção</h3>
              <ProjectStatusBadge label="Produção Interna" />
            </div>
            <p className="evidence__desc">Sistema interno em produção para empresa de manutenção mecânica. Criação, gestão, filtros e exportação de orçamentos (CSV/XLSX) com testes unitários.</p>
            <span className="evidence__tag">React · TypeScript · Supabase · TailwindCSS</span>
            <div className="evidence__footer">
              <a href="https://ckf-manutencao-orcamentos.vercel.app" target="_blank" rel="noopener" className="evidence__link-btn">🚀 DEMO AO VIVO ↗</a>
              <a href="https://github.com/Kauerc10/ckf-manutencao-orcamentos" target="_blank" rel="noopener" className="evidence__link-btn">💻 REPO ON GITHUB ↗</a>
            </div>
          </div>

          {/* Atlas Notarial */}
          <div className="evidence-card magnetic" data-cursor="VER" id="project-atlas">
            <div className="evidence__icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="evidence__title">Atlas Notarial</h3>
              <ProjectStatusBadge status="private" />
            </div>
            <p className="evidence__desc">Automação que consome a API do Detran-RS para gerar procurações de veículos automaticamente. Em produção no Cartório Gaya.</p>
            <span className="evidence__tag">Node.js · APIs REST · Detran-RS</span>
            <div className="evidence__footer">
              <span className="evidence__tag" style={{ color: 'var(--gold)' }}>🔒 Código Privado (Cartório Gaya)</span>
            </div>
          </div>

          {/* Foli */}
          <div className="evidence-card magnetic" data-cursor="VER" id="project-foli">
            <div className="evidence__icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="evidence__title">Foli — PDF Engine TS</h3>
              <ProjectStatusBadge label="Open Source Package" />
            </div>
            <p className="evidence__desc">Biblioteca TypeScript para geração de PDF em Node.js e navegador. Fluent Builder API, motor de layout com garantia de zero overflow e suporte Unicode pt-BR.</p>
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
          </button>
        </form>

        <div className="contato__info">
          <a href="mailto:kaue.ruon@gmail.com" className="contato__link magnetic" data-cursor="EMAIL">
            kaue.ruon@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/kauerc/" target="_blank" rel="noopener" className="contato__link magnetic" data-cursor="ABRIR">
            linkedin.com/in/kauerc
          </a>
          <a href="https://github.com/Kauerc10" target="_blank" rel="noopener" className="contato__link magnetic" data-cursor="ABRIR">
            github.com/Kauerc10
          </a>
          <span className="contato__link">Blumenau / SC — Disponível remoto</span>
        </div>
      </section>

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
