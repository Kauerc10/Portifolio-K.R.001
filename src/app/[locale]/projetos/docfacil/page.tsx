import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale } from '@/i18n/config';
import CaseHeader from '@/components/projects/CaseHeader';
import CaseGallery from '@/components/projects/CaseGallery';
import DocFacilComposition from '@/components/projects/DocFacilComposition';
import DocFacilStory from '@/components/projects/DocFacilStory';
import { docFacilCase } from '@/components/projects/case-model';
import { docFacilCopy } from '@/components/projects/docfacil-copy';
import { getDocFacilMetadata } from '@/components/projects/docfacil-metadata';
import styles from '@/components/projects/DocFacil.module.css';
import galleryStyles from '@/components/projects/VioDigital.module.css';

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return isValidLocale(locale) ? getDocFacilMetadata(locale) : {};
}

export default async function DocFacilCase({ params }: Params) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const c = docFacilCopy(locale);
  const en = locale === 'en-US';
  const items = [
    {
      id: 'desktop',
      src: '/assets/projects/docfacil/interface-desktop.png',
      alt: en ? 'DocFácil guided document flow with contextual owl tip' : 'Fluxo guiado do DocFácil com dica contextual da corujinha',
      caption: c.desktopCaption,
      width: 1440,
      height: 1000,
      className: '',
    },
    {
      id: 'mobile',
      src: '/assets/projects/docfacil/interface-mobile.png',
      alt: en ? 'DocFácil mobile question and document preview' : 'Pergunta e prévia de documento do DocFácil no celular',
      caption: c.mobileCaption,
      width: 390,
      height: 844,
      className: galleryStyles.mobileShot,
    },
  ];

  return <div className={styles.case}>
    <CaseHeader homeHref={docFacilCase.links.home[locale]} backLabel={c.back} />
    <main>
      <section className={styles.caseHero} aria-labelledby="docfacil-title">
        <div className={styles.composition}>
          <div className={styles.copy}>
            <p className={styles.kicker}>{c.kind}</p>
            <h1 id="docfacil-title">Doc<span>Fácil</span></h1>
            <p className={styles.tagline}>{c.title}</p>
            <p className={styles.description}>{c.description}</p>
            <div className={styles.heroActions}>
              <a className={styles.button} href="#contexto">{c.presentation} ↓</a>
              <a className={styles.button} href="https://docfacil-indol.vercel.app" target="_blank" rel="noopener noreferrer">{c.visit} ↗</a>
            </div>
          </div>
          <DocFacilComposition locale={locale} progress={1} label={en ? 'DocFácil document with a contextual owl and guided steps' : 'Documento DocFácil com corujinha contextual e etapas guiadas'} />
        </div>
      </section>
      <nav className={styles.chapterNav} aria-label={en ? 'Explore the project' : 'Explorar o projeto'}>
        {['contexto', 'jornada', 'telas', 'escolhas'].map((id, i) => <a key={id} href={'#' + id}><span>0{i + 1}</span>{c.chapterNav[i]} ↘</a>)}
      </nav>
      <section id="contexto" className={styles.chapter}>
        <h2>{c.challenge}</h2>
        <div className={styles.prose}><p>{c.context}</p><p>{c.contextMore}</p></div>
      </section>
      <section id="jornada" className={styles.chapter}>
        <h2>{c.guidanceTitle}</h2>
        <p>{c.guidanceIntro}</p>
        <DocFacilStory locale={locale} />
        <ol className={styles.steps}>{c.guidanceSteps.map((step, i) => <li key={step.title}><strong>0{i + 1} · {step.title}</strong><p>{step.text}</p></li>)}</ol>
      </section>
      <section id="telas" className={styles.screens}>
        <div className={styles.screensHeading}><h2>{c.gallery}</h2><p>{c.galleryText}</p></div>
        <CaseGallery items={items} enlarge={c.enlarge} close={c.close} naming={c.naming} mediaUnavailable={c.mediaUnavailable} openOriginal={c.openOriginal} />
      </section>
      <section id="escolhas" className={styles.chapter}>
        <h2>{c.invitation}</h2>
        <ol className={styles.steps}>{c.choices.map((choice, i) => <li key={choice.title}><strong>0{i + 1} · {choice.title}</strong><p>{choice.text}</p></li>)}</ol>
        <p><strong>{c.contribution}.</strong> {c.contributionText}</p>
      </section>
      <section className={styles.invitation}>
        <h2>{c.result}</h2><p>{c.resultText}</p>
        <a className={styles.button} href={docFacilCase.links.home[locale]}>← {c.back}</a>
      </section>
    </main>
  </div>;
}
