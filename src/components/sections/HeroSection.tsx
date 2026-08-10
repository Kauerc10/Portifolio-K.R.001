import Link from 'next/link';

export default function HeroSection() {
  return (
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
          <Link href="#projetos" className="btn btn--primary magnetic" data-cursor="VER">VER PROJETOS ↓</Link>
          <a href="/curriculo_kaue.pdf" download="Kauê Ruon Cardoso - Currículo.pdf" className="btn btn--outline magnetic" data-cursor="BAIXAR">CURRÍCULO.PDF</a>
        </div>
        <p className="hero__footnote mono-ghost">Nenhum processo foi arquivado na criação deste site.</p>
      </div>
    </section>
  );
}
