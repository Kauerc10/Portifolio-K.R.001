import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { legalCopy } from '@/lib/legal-copy';
import styles from './page.module.css';

type Params = Promise<{ locale: string; legal: string }>;
function resolve(locale: string, legal: string) {
  if (!isValidLocale(locale) || (legal !== 'privacidade' && legal !== 'termos')) notFound();
  return { locale, legal, copy: legalCopy[locale][legal] };
}
export function generateStaticParams() {
  return ['pt-BR', 'en-US'].flatMap(locale => ['privacidade', 'termos'].map(legal => ({ locale, legal })));
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, legal } = await params;
  const { copy } = resolve(locale, legal);
  return { title: `${copy.title} — Kauê Ruon`, description: copy.intro,
    alternates: { canonical: `/${locale}/${legal}`, languages: { 'pt-BR': `/pt-BR/${legal}`, 'en-US': `/en-US/${legal}` } },
    openGraph: { title: `${copy.title} — Kauê Ruon`, description: copy.intro, url: `/${locale}/${legal}` },
  };
}
export default async function LegalPage({ params }: { params: Params }) {
  const raw = await params;
  const { locale, legal, copy } = resolve(raw.locale, raw.legal);
  const en = locale === 'en-US';
  return <main className={styles.page}>
    <Link className={styles.back} href={`/${locale}`}>← {en ? 'Back to portfolio' : 'Voltar ao portfólio'}</Link>
    <header><p className={styles.eyebrow}>Kauê Ruon · {en ? 'Legal information' : 'Informações legais'}</p>
      <h1>{copy.title}</h1><p>{copy.intro}</p>
      <p className={styles.date}>{en ? 'Last updated: November 17, 2026' : 'Atualizado em 17 de novembro de 2026'}</p>
    </header>
    <nav className={styles.contents} aria-label={en ? 'On this page' : 'Nesta página'}>
      {copy.sections.map(([title], i) => <a key={title} href={`#item-${i + 1}`}>{title}</a>)}
    </nav>
    <article>{copy.sections.map(([title, text], i) => <section key={title} id={`item-${i + 1}`}><h2>{title}</h2><p>{text}</p></section>)}</article>
    <aside className={styles.providers}><h2>{en ? 'Useful links' : 'Links úteis'}</h2>
      <a href="mailto:kaue@ruon.dev">kaue@ruon.dev</a>
      {legal === 'privacidade' && <><a href="https://web3forms.com/privacy">Web3Forms · {en ? 'Privacy' : 'Privacidade'}</a><a href="https://vercel.com/legal/privacy-notice">Vercel · {en ? 'Privacy' : 'Privacidade'}</a><a href="https://www.spaceship.com/legal/privacy-policy/">Spacemail / Spaceship · {en ? 'Privacy' : 'Privacidade'}</a><a href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares">ANPD · {en ? 'Data subject rights' : 'Direitos dos titulares'}</a></>}
    </aside>
    <footer><Link href={`/${locale}/${legal === 'termos' ? 'privacidade' : 'termos'}`}>{legal === 'termos' ? legalCopy[locale].privacidade.title : legalCopy[locale].termos.title}</Link><span>© 2026 Kauê Ruon Cardoso.</span></footer>
  </main>;
}
