import CaseEnding from '@/components/projects/CaseEnding';
import editorial from '@/components/projects/CaseEditorial.module.css';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale } from '@/i18n/config';
import CaseHeader from '@/components/projects/CaseHeader';
import CaseGallery from '@/components/projects/CaseGallery';
import VecomComposition, { VecomBrand } from '@/components/projects/VecomComposition';
import { vecomCase } from '@/components/projects/case-model';
import { vecomCopy } from '@/components/projects/vecom-copy';
import { getVecomMetadata } from '@/components/projects/vecom-metadata';
import VecomHandoff from '@/components/projects/VecomHandoff';
import styles from '@/components/projects/Vecom.module.css';
import galleryStyles from '@/components/projects/VioDigital.module.css';

type Params = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return isValidLocale(locale) ? getVecomMetadata(locale) : {};
}

export default async function VecomCase({ params }: Params) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const c = vecomCopy(locale);
  const en = locale === 'en-US';
  const items = [
    { id: 'desktop', src: '/assets/projects/vecom/interface-desktop.png', alt: en ? 'VECOM internal interface with synthetic records' : 'Interface interna da VECOM com registros sintéticos', caption: c.desktopCaption, width: 1440, height: 1377, className: '' },
    { id: 'mobile', src: '/assets/projects/vecom/interface-mobile.png', alt: en ? 'VECOM public form on mobile in demonstration mode' : 'Cadastro público da VECOM no celular em modo de demonstração', caption: c.mobileCaption, width: 390, height: 1907, className: galleryStyles.mobileShot },
  ];
  return <div className={`${styles.case} ${editorial.page}`}>
    <CaseHeader homeHref={vecomCase.links.home[locale]} backLabel={c.back} />
    <main>
      <section className={styles.caseHero} aria-labelledby="vecom-title">
        <div className={styles.composition}>
          <div className={styles.copy}>
            <VecomBrand />
            <p className={styles.kicker}>{c.kind}</p>
            <h1 id="vecom-title">VECOM <span>Ficha Fácil</span></h1>
            <p className={styles.tagline}>{c.title}</p>
            <p className={styles.description}>{c.description}</p>
            <div className={styles.heroActions}>
              <a className={styles.button} href="#contexto">{c.presentation} ↓</a>
              <a className={styles.button} href="https://vecom-ficha-facil-staging.vercel.app/login" target="_blank" rel="noopener noreferrer">{c.visit} ↗</a>
            </div>
          </div>
          <VecomComposition progress={1} label={en ? 'Blue folder, laptop showing the prepared internal interface and phone showing the public form' : 'Pasta azul, notebook com a interface interna preparada e celular com o formulário público'} />
        </div>
      </section>

      <section id="contexto" className={`${styles.chapter} ${editorial.chapter} ${editorial.context}`}>
        <h2>{c.challenge}</h2>
        <div className={editorial.prose}><p>{c.context}</p><p>{c.contextMore}</p></div>
      </section>
      <VecomHandoff locale={locale} />
      <section id="telas" className={`${styles.screens} ${editorial.gallery}`}>
        <div className={styles.screensHeading}>
          <div><h2>{c.gallery}</h2></div><p>{c.galleryText}</p>
        </div>
        <CaseGallery items={items} enlarge={c.enlarge} close={c.close} naming={c.naming} mediaUnavailable={c.mediaUnavailable} openOriginal={c.openOriginal} />
      </section>
      <section id="escolhas" className={`${styles.chapter} ${editorial.chapter}`}>
        <h2>{c.invitation}</h2>
        <ol className={styles.steps}>{c.choices.map(choice => <li key={choice.title}><strong>{choice.title}</strong><p>{choice.text}</p></li>)}</ol>
        <p><strong>{c.contribution}.</strong> {c.contributionText}</p>
      </section>
      <CaseEnding locale={locale} slug="vecom" title={c.result} text={c.resultText} />
    </main>
  </div>;
}
