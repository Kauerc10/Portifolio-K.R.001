import Link from 'next/link';
import type { Dictionary } from '@/i18n/types';

export default function HeroSection({ dict }: { dict?: Dictionary['hero'] }) {
  const d = dict || {
    greeting: 'ENGENHARIA DE SOFTWARE & INTELIGÊNCIA ARTIFICIAL',
    nameWhite: 'KAUÊ',
    nameGold: 'RUON',
    nameOutline: 'CARDOSO',
    subtitle: 'Desenvolvedor Full Stack & Especialista em Automação RAG com Foco Notarial de Tolerância Zero a Erros.',
    roles: [
      'Desenvolvedor Full Stack',
      'Engenheiro de IA & Automação RAG',
      'Arquiteto de Sistemas Notariais',
      'Medalhista OBMEP de Matemática',
    ],
    ctaProjects: 'Ver Projetos',
    ctaContact: 'Protocolar Contato',
    statExperience: 'Anos de Prática Técnica',
    statCommits: 'Commits Auditados no GitHub',
    statProjects: 'Projetos em Produção',
  };

  return (
    <section className="hero section" id="hero" data-section="1">
      <div className="hero__text">
        <p className="hero__case mono-ghost">{d.greeting}</p>
        <h1 className="hero__name" id="heroName">
          <span className="hero__name-line hero__name--white">{d.nameWhite}</span>
          <span className="hero__name-line hero__name--gold">{d.nameGold}</span>
          <span className="hero__name-line hero__name--outline">{d.nameOutline}</span>
        </h1>
        <div className="hero__typewriter" id="heroTypewriter">
          <span className="hero__tw-text" id="twText" data-roles={JSON.stringify(d.roles)}>
            &gt; {d.subtitle}
          </span>
          <span className="hero__tw-cursor">|</span>
        </div>
        <div className="hero__buttons">
          <Link href="#projetos" className="btn btn--primary magnetic" data-cursor="VER">
            {d.ctaProjects} ↓
          </Link>
          <a href="/curriculo_kaue.pdf" download="Kauê Ruon Cardoso - Currículo.pdf" className="btn btn--outline magnetic" data-cursor="BAIXAR">
            CURRÍCULO.PDF
          </a>
        </div>
        <p className="hero__footnote mono-ghost">
          {d.statExperience}: 2+ · {d.statCommits}: 850+ · {d.statProjects}: 4+
        </p>
      </div>
    </section>
  );
}
