import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="nav" id="nav">
      <Link href="#hero" className="nav__logo" aria-label="Início">
        <Image
          src="/assets/krc-logo-512.webp"
          alt="KRC Logo"
          width={40}
          height={40}
          priority
          className="nav__logo-img"
        />
      </Link>
      <div className="nav__links" id="navLinks">
        <Link href="#hero" className="nav__link" data-section="1">INÍCIO</Link>
        <Link href="#sobre" className="nav__link" data-section="2">SOBRE</Link>
        <Link href="#experiencia" className="nav__link" data-section="3">EXPERIÊNCIA</Link>
        <Link href="#skills" className="nav__link" data-section="4">SKILLS</Link>
        <Link href="#conquistas" className="nav__link" data-section="5">CONQUISTAS</Link>
        <Link href="#formacao" className="nav__link" data-section="6">FORMAÇÃO</Link>
        <Link href="#projetos" className="nav__link" data-section="7">PROJETOS</Link>
        <Link href="#contato" className="nav__link" data-section="8">CONTATO</Link>
      </div>
      <span className="nav__indicator" id="navIndicator">§ 01 / 08</span>
      <button className="nav__burger" id="navBurger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
