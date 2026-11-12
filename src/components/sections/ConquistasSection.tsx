import { ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';
import SectionMotionEnhancer from './SectionMotionEnhancer';

const medalAssets = [
  {
    illustration: '/assets/achievement-silver.svg',
    certificate: 'https://premiacao.obmep.org.br/18obmep/verRelatorioPremiadosRegionalPorNivel-SC.3.do.htm',
  },
  {
    illustration: '/assets/achievement-bronze.svg',
    certificate: 'https://premiacao.obmep.org.br/18obmep/verRelatorioPremiadosBronze-SC.do.htm',
  },
] as const;

const honorCertificates = [
  'https://premiacao.obmep.org.br/17obmep/verRelatorioPremiadosMencao-SC.do.htm',
  'https://premiacao.obmep.org.br/16aobmep/verRelatorioPremiadosMencao-SC.do.htm',
];

export default function ConquistasSection({ dict }: { dict: Dictionary['conquistas'] }) {
  const [silver, bronze, ...honors] = dict.medals;

  return (
    <section className="section editorial-section conquistas-editorial" id="conquistas" data-section="5">
      <div className="conquistas-editorial__heading">
        <h2 className="editorial-title editorial-title--display">{dict.title}</h2>
        <p className="editorial-lede">{dict.description}</p>
      </div>
      <div>
        <div className="conquistas-editorial__grid">
          {[silver, bronze].map((medal, index) => {
            const { illustration, certificate } = medalAssets[index];
            return (
              <article className={`conquistas-editorial__card conquistas-editorial__card--${index === 0 ? 'silver' : 'bronze'}`} key={certificate}>
                <span className="conquistas-editorial__medal-frame">
                  <img className="conquistas-editorial__medal" src={illustration} alt="" width="160" height="160" loading="lazy" />
                  <span className="conquistas-editorial__medal-sweep" data-motion-medal-sweep aria-hidden="true" />
                </span>
                <div>
                  <span className="editorial-kicker">OBMEP</span>
                  <h3>{medal.title}</h3>
                  <p>{medal.description}</p>
                  <a href={certificate} target="_blank" rel="noopener noreferrer" aria-label={`${dict.certificateLabel} · ${medal.title}`}>{dict.certificateLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="conquistas-editorial__honors">
          <img src="/assets/achievement-laurel.svg" alt="" width="72" height="42" loading="lazy" />
          <div>
            <h3>{dict.honorsLabel}</h3>
            <ul>
              {honors.map((honor, index) => (
                <li key={honor.editionLabel}>
                  <a href={honorCertificates[index]} target="_blank" rel="noopener noreferrer" title={honor.description}>{dict.certificateLabel} · {honor.editionLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <SectionMotionEnhancer sectionId="conquistas" kind="conquistas" />
    </section>
  );
}
