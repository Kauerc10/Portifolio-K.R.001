'use client';
import { useRef, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FileText } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import VecomComposition from '../VecomComposition';
import styles from './StageProof.module.css';
import { stageProjects, homeProjects } from './stage-projects';
import AdditionalStageArt from './AdditionalStageArt';
import StageCanvas from './StageCanvas';
import { captureCaseReturnPosition, isPlainPrimaryClick } from '../case-return-position';
import { useStageProjectController } from './useStageProjectController';

export default function StageProof({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const projects = embedded ? homeProjects : stageProjects;
  const Container = embedded ? 'div' : 'main';
  const root = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const { active, engine } = useStageProjectController({ root, locale, embedded, projects });
  const activeProject = projects.find(project => project.slug === active) ?? projects[0];
  const activeIndex = projects.indexOf(activeProject);
  const en = locale === 'en-US';

  return <Container className={embedded ? styles.embedded : styles.page}>
    {!embedded && <a className={styles.back} href={`/${locale}#projetos`}>{en ? 'Back to the portfolio' : 'Voltar ao portfólio'}</a>}
    {!embedded && <h1>{en ? 'Selected' : 'Projetos'} <em>{en ? 'projects' : 'selecionados'}</em></h1>}
    {embedded && [...projects.map(project=>`project-${project.slug}`),"project-atlas","project-docfacil-legacy","project-ckf-legacy"].map(id=><span key={id} id={id} className={styles.anchor} aria-hidden="true"/>)}
    <div ref={root} className={styles.stage} data-stage-proof data-active={activeProject.slug} style={{ "--stage-accent": activeProject.accent } as CSSProperties} data-motion="rest"
      role="region" aria-roledescription={en ? 'carousel' : 'carrossel'} aria-label={en ? 'Selected projects' : 'Projetos selecionados'}
      onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); engine.current?.(event.key === 'ArrowRight' ? 1 : -1); } }}
      onTouchStart={event => { gesture.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={event => { const start = gesture.current; gesture.current = null; if (!start || !event.changedTouches.length) return; const dx = event.changedTouches[0].clientX - start.x, dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) engine.current?.(dx < 0 ? 1 : -1); }}>
      <div className={styles.viewport}>
        {projects.map((project, index) => <article key={project.slug} className={styles.panel} data-panel={index} style={{ "--stage-accent": project.accent } as CSSProperties} aria-hidden={activeIndex !== index} inert={activeIndex !== index}>
          <div className={styles.copy}>
            <p data-layer="0.65" className={styles.kind}>{project.kind[en ? 1 : 0]}</p>
            <h3 data-layer="0.85" tabIndex={-1}>{project.name}</h3>
            <p data-layer="0.9" className={styles.tagline}>{project.title[en ? 1 : 0]}</p>
            <p data-layer="0.95" className={styles.description}>{project.description[en ? 1 : 0]}</p>
            <div data-layer="1" className={styles.actions}><a className={styles.cta} href={`/${locale}/projetos/${project.slug}`} onClick={event=>{if(embedded && isPlainPrimaryClick(event)) captureCaseReturnPosition({locale,caseSlug:project.slug,homePath:`/${locale}`});}}>{en ? 'Explore the project' : 'Conhecer o projeto'} <ArrowUpRight size={18} /></a></div>
          </div>
          <div className={styles.scene} data-stage-scene aria-hidden="true">
            <StageCanvas>{project.art === 'viodigital' || project.art === 'atlas-notarial' || project.art === 'ckf' ? <AdditionalStageArt project={project.art} locale={locale}/> : project.slug === "docfacil" ? <>
              <div className={styles.plinth} data-layer="1.05"><div /></div>
              <div className={styles.document} data-layer="1.2"><div className={styles.paper} data-doc-paper>
                <header><strong>DocFácil</strong><small>{en ? 'EXAMPLE' : 'EXEMPLO'}</small></header>
                <div className={styles.lines}><i /><i /></div>
                <div className={styles.question}><span><FileText size={19} />{en ? 'Who is the landlord?' : 'Quem é o locador do imóvel?'}</span><p><span data-doc-answer>{en ? 'Example person' : 'Pessoa de exemplo'}</span> <Check data-doc-check size={20} /></p></div>
                <div className={styles.checklist}><p><Check data-doc-check /><i data-doc-line /></p><p><b /><i data-doc-line /></p><p><b /><i data-doc-line /></p></div><div className={styles.success} data-doc-success><Check size={15} />{en ? "Ready to become a PDF" : "Pronto para virar PDF"}</div>
              </div></div>
              <div className={styles.owl} data-layer="1.48"><img data-owl-body src="/assets/projects/docfacil/owl-guide.webp" alt="" width="400" height="400" /></div>
            </> : <div className={styles.vecom} data-layer="1.25"><VecomComposition label="" progress={1} shared={false} /><div className={styles.transfer} data-transfer><FileText size={22} /><strong>{en ? 'Registration form' : 'Ficha cadastral'}</strong><i /><i /><span><Check size={13} />{en ? 'Sent' : 'Enviada'}</span></div><div className={styles.receipt} data-vecom-receipt><Check size={18} /><span>{en ? 'New form received' : 'Nova ficha recebida'}<small>{en ? 'Ready for the team' : 'Pronta para a equipe'}</small></span></div></div>}
          </StageCanvas></div>
        </article>)}
        <svg className={styles.ribbon} viewBox="0 0 1400 90" preserveAspectRatio="none" aria-hidden="true"><path d="M-40 36 C350 -60 750 170 1440 38" /></svg>
      </div>
      <button className={`${styles.arrow} ${styles.previous}`} onClick={() => engine.current?.(-1)} aria-label={en ? 'Previous project' : 'Projeto anterior'}><ArrowLeft /></button>
      <button className={`${styles.arrow} ${styles.next}`} onClick={() => engine.current?.(1)} aria-label={en ? 'Next project' : 'Próximo projeto'}><ArrowRight /></button>
    </div>
    <p className={styles.srOnly} aria-live="polite" aria-atomic="true">{activeProject.name}</p>
    {!embedded && <p className={styles.note}>{en ? 'Motion study · Five projects' : 'Estudo de movimento · Cinco projetos'}</p>}
    <noscript><p>{projects.map(project=><a key={project.slug} href={`/${locale}/projetos/${project.slug}`}>{project.name} · </a>)}</p></noscript>
  </Container>;
}

