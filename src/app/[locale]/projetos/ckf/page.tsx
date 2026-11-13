import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale } from '@/i18n/config';
import CaseHeader from '@/components/projects/CaseHeader';
import CaseGallery from '@/components/projects/CaseGallery';
import CkfComposition from '@/components/projects/CkfComposition';
import CkfStory from '@/components/projects/CkfStory';
import { ckfCase } from '@/components/projects/case-model';
import { ckfCopy } from '@/components/projects/ckf-copy';
import { getCkfMetadata } from '@/components/projects/ckf-metadata';
import styles from '@/components/projects/Ckf.module.css';
import galleryStyles from '@/components/projects/VioDigital.module.css';

type Params = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { locale } = await params; return isValidLocale(locale) ? getCkfMetadata(locale) : {}; }

export default async function CkfCase({ params }: Params) {
  const { locale } = await params; if (!isValidLocale(locale)) notFound();
  const c = ckfCopy(locale); const en = locale === 'en-US';
  const items = [
    { id: 'site-desktop', src: '/assets/projects/ckf/site-desktop.png', alt: en ? 'CKF institutional website desktop interface' : 'Interface desktop do site institucional da CKF', caption: c.siteDesktopCaption, width: 1440, height: 1000, className: '' },
    { id: 'site-mobile', src: '/assets/projects/ckf/site-mobile.png', alt: en ? 'CKF institutional website mobile interface' : 'Interface mobile do site institucional da CKF', caption: c.siteMobileCaption, width: 390, height: 844, className: galleryStyles.mobileShot },
    { id: 'system', src: '/assets/projects/ckf/system-preview.png', alt: en ? 'Prepared illustration of the CKF quotes system with quote items and PDF' : 'Imagem preparada do sistema de orçamentos CKF com itens e PDF', caption: c.systemCaption, width: 1440, height: 1000, className: '' },
  ];
  return <div className={styles.case}><CaseHeader homeHref={ckfCase.links.home[locale]} backLabel={c.back} /><main>
    <section className={styles.caseHero} aria-labelledby="ckf-title"><div className={styles.composition}><div className={styles.copy}><p className={styles.kicker}>{c.kind}</p><h1 id="ckf-title">CKF <span>{en ? 'Maintenance' : 'Manutenção'}</span></h1><p className={styles.tagline}>{c.title}</p><p className={styles.description}>{c.description}</p><div className={styles.heroActions}><a className={styles.button} href="#site">{c.presentation} ↓</a></div></div><CkfComposition locale={locale} progress={1} label={en ? 'CKF institutional website and quotes system presented as separate deliveries' : 'Site institucional e sistema de orçamentos CKF apresentados como entregas separadas'} /></div></section>
    <nav className={styles.chapterNav} aria-label={en ? 'Explore the project' : 'Explorar o projeto'}>{['site','sistema','fechamento'].map((id,i)=><a key={id} href={'#'+id}><span>0{i+1}</span>{c.chapters[i]} ↘</a>)}</nav>
    <section id="site" className={styles.chapter}><h2>{c.siteTitle}</h2><div className={styles.prose}><p>{c.siteText}</p><p>{c.siteMore}</p></div><CkfStory locale={locale} /></section>
    <section id="sistema" className={styles.chapter}><h2>{c.systemTitle}</h2><div className={styles.prose}><p>{c.systemText}</p><p>{c.systemMore}</p></div></section>
    <section id="telas" className={styles.screens}><div className={styles.screensHeading}><h2>{c.gallery}</h2><p>{c.galleryText}</p></div><CaseGallery items={items} enlarge={c.enlarge} close={c.close} naming={c.naming} mediaUnavailable={c.mediaUnavailable} openOriginal={c.openOriginal} /></section>
    <section id="fechamento" className={styles.chapter}><h2>{c.closing}</h2><div className={styles.prose}><p>{c.closingText}</p><p><strong>{c.contribution}.</strong> {c.contributionText}</p></div></section>
    <section className={styles.invitation}><h2>{c.result}</h2><p>{c.resultText}</p><a className={styles.button} href={ckfCase.links.home[locale]}>← {c.back}</a></section>
  </main></div>;
}
