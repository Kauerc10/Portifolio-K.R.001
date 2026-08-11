import type { Dictionary } from '@/i18n/types';

export default function KonamiModal({ dict }: { dict?: Dictionary['modals'] }) {
  const d = dict || {
    breachTitle: 'PROTOCOLO DE VIOLAÇÃO ATIVADO',
    breachDesc: 'Modo de auditoria cibernética ativado via comando direto. Todos os sistemas operando sob supervisão estrita.',
    konamiTitle: 'CÓDIGO KONAMI DESBLOQUEADO',
    konamiDesc: 'Você ativou o protocolo secreto! Partículas WebGL e efeitos visuais Notariais elevados ao nível máximo.',
  };

  return (
    <div className="modal" id="konamiModal">
      <div className="modal__crt-overlay" />
      <div className="modal__box">
        <div className="modal__icon glitch">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <h2 className="modal__title glitch" data-text={d.konamiTitle}>{d.konamiTitle}</h2>
        <p className="modal__desc">{d.konamiDesc}</p>

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

        <button className="btn btn--outline modal__close magnetic" data-cursor="EXIT" id="konamiClose">EXIT</button>
      </div>
    </div>
  );
}
