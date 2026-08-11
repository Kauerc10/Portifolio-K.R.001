import type { Dictionary } from '@/i18n/types';

export default function SobreSection({ dict }: { dict?: Dictionary['sobre'] }) {
  const d = dict || {
    title: 'SOBRE MIM',
    subtitle: 'ENGENHARIA DE SOFTWARE E PRECISÃO NOTARIAL',
    badge: 'VISÃO & VALORES',
    quote: '“A precisão notarial exige fé pública e rigor absoluto. Trago essa mesma disciplina jurídica para a arquitetura de software: código limpo, auditável e tolerância zero a falhas.”',
    bioP1: 'Sou Engenheiro de Software Full Stack com sólida atuação em desenvolvimento web moderno (React, Next.js 15, TypeScript, Node.js, Python), automações inteligentes de processos e agentes de Inteligência Artificial Generativa (RAG / Tool Calling).',
    bioP2: 'Possuo vivência técnica e jurídica em Cartório de Notas e Protesto, o que moldou minha visão em construir sistemas com máxima integridade de dados, alta disponibilidade, segurança cibernética corporativa e conformidade estrita com LGPD.',
    card1Title: 'Tolerância Zero a Erros',
    card1Desc: 'Arquitetura planejada para evitar bugs e falhas críticas em ambiente de produção.',
    card2Title: 'Agentes de IA Generativa',
    card2Desc: 'Sistemas RAG personalizados, automação de fluxos notariais e atendimento autônomo.',
    card3Title: 'Performance & 60 FPS',
    card3Desc: 'Aceleração por GPU, renderização WebGL otimizada e zero jank em qualquer dispositivo.',
  };

  return (
    <section className="section sobre" id="sobre" data-section="2">
      <div className="section__line" />
      <div className="sobre__grid">
        <div className="sobre__text">
          <span className="section__article">Art. I §1º</span>
          <h2 className="section__title" data-cipher>{d.title}</h2>
          <p className="sobre__paragraph anim-slide">{d.quote}</p>
          <p className="sobre__paragraph anim-slide">{d.bioP1}</p>
          <p className="sobre__paragraph anim-slide">{d.bioP2}</p>
        </div>
        <div className="sobre__card-wrap">
          <div className="sobre__card magnetic" data-cursor="INFO" id="fichaCard">
            <div className="sobre__card-header">■ {d.badge}</div>
            <div className="sobre__card-divider" />
            <div className="sobre__card-row">
              <span className="sobre__card-label">{d.card1Title}</span>
              <span className="text-xs">{d.card1Desc}</span>
            </div>
            <div className="sobre__card-row">
              <span className="sobre__card-label">{d.card2Title}</span>
              <span className="text-xs">{d.card2Desc}</span>
            </div>
            <div className="sobre__card-row">
              <span className="sobre__card-label">{d.card3Title}</span>
              <span className="text-xs">{d.card3Desc}</span>
            </div>
            <div className="sobre__card-row">
              <span className="sobre__card-label">STATUS</span>
              <span className="status-badge"><span className="status-dot" /> ONLINE</span>
            </div>
            <div className="sobre__stamp" id="fichaStamp">VERIFIED ✓</div>
          </div>
        </div>
      </div>
    </section>
  );
}
