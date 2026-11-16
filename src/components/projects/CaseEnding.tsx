import type { Locale } from '@/i18n/config';
import styles from './CaseEditorial.module.css';
import { homeProjects, type StageProjectSlug } from './stage-proof/stage-projects';

export default function CaseEnding({ locale, slug, title, text }: {
  locale: Locale; slug: StageProjectSlug; title: string; text: string;
}) {
  const en = locale === 'en-US';
  const next = homeProjects[(homeProjects.findIndex(project => project.slug === slug) + 1) % homeProjects.length];
  return <>
    <section className={styles.ending} aria-labelledby="case-ending">
      <div><h2 id="case-ending">{title}</h2><p>{text}</p></div>
      <a className={styles.next} href={`/${locale}/projetos/${next.slug}`}>
        <span>{en ? 'Explore another project' : 'Conheça também'}</span>
        <strong>{next.name} <span aria-hidden="true">↗</span></strong>
      </a>
    </section>
    <footer className={styles.footer}>
      <a className={styles.brand} href={`/${locale}`}>kauê<span>ruon</span></a>
      <nav aria-label={en ? 'Case footer' : 'Rodapé do projeto'}>
        <a href={`/${locale}#project-${slug}`}>← {en ? 'Back to projects' : 'Voltar aos projetos'}</a>
        <a href={`/${locale}#contato`}>{en ? 'Get in touch' : 'Vamos conversar'} ↗</a>
        {slug === 'viodigital' && <a href="https://github.com/Kauerc10/VioWeb" target="_blank" rel="noopener noreferrer">{en ? 'Source code' : 'Código aberto'} ↗</a>}
        <a href="#">{en ? 'Back to top' : 'Voltar ao topo'} ↑</a>
      </nav>
    </footer>
  </>;
}
