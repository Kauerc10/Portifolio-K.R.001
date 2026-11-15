import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale } from '@/i18n/config';
import CaseHeader from '@/components/projects/CaseHeader';
import CaseGallery from '@/components/projects/CaseGallery';
import AtlasComposition from '@/components/projects/AtlasComposition';
import AtlasStory from '@/components/projects/AtlasStory';
import { atlasCase } from '@/components/projects/case-model';
import { atlasCopy } from '@/components/projects/atlas-copy';
import { getAtlasMetadata } from '@/components/projects/atlas-metadata';
import styles from '@/components/projects/Atlas.module.css';
import galleryStyles from '@/components/projects/VioDigital.module.css';

type Params = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return isValidLocale(locale) ? getAtlasMetadata(locale) : {};
}
export default async function AtlasCase({ params }: Params) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const c = atlasCopy(locale);
  const en = locale === 'en-US';
  const items = [
    { id: 'desktop', src: '/assets/projects/atlas-notarial/interface-desktop.png', alt: en ? 'Official Atlas dashboard image showing the Vehicle Formatter among the tools' : 'Imagem oficial da bancada Atlas com o Formatador de Veículos entre as ferramentas', caption: c.desktopCaption, width: 1440, height: 773, className: '' },
    { id: 'mobile', src: '/assets/projects/atlas-notarial/interface-mobile.png', alt: en ? 'Atlas public product presentation on a phone, with the dashboard preview' : 'Apresentação pública do Atlas no celular, com a prévia da bancada', caption: c.mobileCaption, width: 390, height: 844, className: galleryStyles.mobileShot },
  ];
  return <div className={styles.case}>
    <CaseHeader homeHref={atlasCase.links.home[locale]} backLabel={c.back} />
    <main>
      <section className={styles.caseHero} aria-labelledby="atlas-title">
        <div className={styles.composition}>
          <div className={styles.copy}>
            <p className={styles.kicker}>{c.kind}</p>
            <h1 id="atlas-title">Atlas <span>Notarial</span></h1>
            <p className={styles.tagline}>{c.title}</p><p className={styles.description}>{c.description}</p>
            <div className={styles.heroActions}>
              <a className={styles.button} href="#contexto">{c.presentation} ↓</a>
              <a className={styles.button} href="https://atlasnotarial.com.br" target="_blank" rel="noopener noreferrer">{c.visit} ↗</a>
            </div>
          </div>
          <AtlasComposition locale={locale} progress={1} label={en ? 'Example vehicle document and three layers: Format, Review and Organize' : 'Documento de veículo de exemplo e três camadas: Formatar, Conferir e Organizar'} />
        </div>
      </section>
      <nav className={styles.chapterNav} aria-label={en ? 'Explore the project' : 'Explorar o projeto'}>
        {c.chapterNav.map((item, i) => <a key={item} href={'#' + ['contexto', 'evolucao', 'telas', 'escolhas'][i]}><span>0{i + 1}</span>{item} ↘</a>)}
      </nav>
      <section id="contexto" className={styles.chapter}>
        <h2>{c.challenge}</h2><div className={styles.prose}><p>{c.context}</p><p>{c.contextMore}</p></div>
      </section>
      <div id="evolucao"><AtlasStory locale={locale} /></div>
      <section className={styles.chapter} aria-labelledby="atlas-tools-title">
        <h2 id="atlas-tools-title">{c.toolkitTitle}</h2>
        <p>{c.toolkitIntro}</p>
        <ul className={styles.steps}>{c.tools.map(tool => <li key={tool}><strong>{tool}</strong></li>)}</ul>
      </section>
      <section id="telas" className={styles.screens}>
        <div className={styles.screensHeading}><h2>{c.gallery}</h2><p>{c.galleryText}</p></div>
        <CaseGallery items={items} enlarge={c.enlarge} close={c.close} naming={c.naming} mediaUnavailable={c.mediaUnavailable} openOriginal={c.openOriginal} />
      </section>
      <section id="escolhas" className={styles.chapter}>
        <h2>{c.invitation}</h2>
        <ol className={styles.steps}>{c.choices.map((choice, i) => <li key={choice.title}><strong>{choice.title}</strong><p>{choice.text}</p></li>)}</ol>
        <p><strong>{c.contribution}.</strong> {c.contributionText}</p>
      </section>
      <section className={styles.invitation}>
        <h2>{c.result}</h2><p>{c.resultText}</p><a className={styles.button} href={atlasCase.links.home[locale]}>← {c.back}</a>
      </section>
    </main>
  </div>;
}
