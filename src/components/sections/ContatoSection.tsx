export default function ContatoSection() {
  return (
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
  );
}
