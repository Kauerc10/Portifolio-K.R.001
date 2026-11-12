import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale } from '@/i18n/config';
import { vioCopy } from '@/components/projects/viodigital-copy';
import VioDocument from '@/components/projects/VioDocument';
import VioStory from '@/components/projects/VioStory';
import VioGallery from '@/components/projects/VioGallery';
import styles from '@/components/projects/VioDigital.module.css';

export const metadata: Metadata = { title: 'VioDigital — Kauê Ruon Cardoso' };

export default async function VioDigitalCase({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const copy = vioCopy(locale);
  return <div className={styles.case}>
    <header className={styles.header}><a href={`/${locale}#project-viodigital`}>kauê<span>ruon</span></a><a href={`/${locale}#project-viodigital`}>← {copy.back}</a></header>
    <main>
      <section className={styles.caseHero} aria-labelledby="vio-title">
        <div className={styles.composition}><div className={styles.copy}>
          <p className={styles.kicker}>{copy.kind}</p><h1 id="vio-title">VioDigital</h1>
          <p className={styles.tagline}>{copy.title}</p><p className={styles.description}>{copy.description}</p>
          <div className={styles.heroActions}><a href="https://vioweb.vercel.app" target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.primaryButton}`}>{copy.visit} <span aria-hidden="true">↗</span></a><a href="#contexto" className={styles.textLink}>{copy.presentation} ↓</a></div>
        </div><VioDocument example={copy.example} /></div>
      </section>
      <nav className={styles.chapterNav} aria-label={locale === 'pt-BR' ? 'Explorar o projeto' : 'Explore the project'}>{['contexto','caminho','telas','escolhas'].map((id, i) => <a key={id} href={`#${id}`}><span aria-hidden="true">0{i + 1}</span>{copy.chapterNav[i]}<span aria-hidden="true">↘</span></a>)}</nav>
      <section id="contexto" className={styles.chapter}><span className={styles.chapterNumber}>01</span><div><h2>{copy.challenge}</h2><div className={styles.proseColumns}><p>{copy.context}</p><p>{copy.contextMore}</p></div></div></section>
      <VioStory locale={locale} />
      <section id="telas" className={styles.screens}><span className={styles.sectionEyebrow}>03 / {copy.chapterNav[2]}</span><div className={styles.screensHeading}><h2>{copy.gallery}</h2><p>{copy.galleryText}</p></div><VioGallery locale={locale} /></section>
      <section id="escolhas" className={styles.chapter}><span className={styles.chapterNumber}>04</span><div><h2>{copy.decisions}</h2><ol className={styles.decisions}>{copy.choices.map((choice, i) => <li key={choice.title}><span aria-hidden="true">0{i + 1}</span><div><h3>{choice.title}</h3><p>{choice.text}</p></div></li>)}</ol><div className={styles.stack}><span>{copy.stackLabel}</span><ul>{copy.stack.map(item => <li key={item}>{item}</li>)}</ul></div><aside className={styles.credit}><h3>{copy.credit}</h3><p>{copy.creditText}</p><a href="https://github.com/Kauerc10/VioWeb/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className={styles.textLink}>{locale === 'pt-BR' ? 'Conhecer a origem e os créditos' : 'Read about the origins and credits'} ↗</a></aside></div></section>
      <section className={styles.invitation}><span className={styles.sectionEyebrow}>{copy.invitation}</span><h2>{copy.result}</h2><p>{copy.resultText}</p><div className={styles.heroActions}><a href="https://vioweb.vercel.app" target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.primaryButton}`}>{copy.visit} <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="https://github.com/Kauerc10/VioWeb" target="_blank" rel="noopener noreferrer">{copy.code} ↗</a></div><a className={styles.backLink} href={`/${locale}#project-viodigital`}>← {copy.back}</a></section>
    </main>
  </div>;
}
