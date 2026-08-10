export default function ConquistasSection() {
  return (
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
  );
}
