export default function KonamiModal() {
  return (
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
  );
}
