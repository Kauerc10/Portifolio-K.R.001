export default function SobreSection() {
  return (
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
  );
}
