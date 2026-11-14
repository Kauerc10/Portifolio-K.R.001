'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FileText } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import VecomComposition from '../VecomComposition';
import styles from './StageProof.module.css';
import { playStageEntrance } from './stage-entrance';
import { stageProjects } from './stage-projects';
import AdditionalStageArt from './AdditionalStageArt';
import { captureCaseReturnPosition, restoreCaseReturnPosition, isPlainPrimaryClick } from '../case-return-position';
const homeProjects = [2,1,3,0,4].map(index => stageProjects[index]);
import type { CSSProperties } from 'react';

/** Five-case showcase experiment. */
export default function StageProof({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const projects = embedded ? homeProjects : stageProjects;
  const Container = embedded ? 'div' : 'main';
  const root = useRef<HTMLDivElement>(null);
  const engine = useRef<((direction: number) => void) | null>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const en = locale === 'en-US';

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const panels = Array.from(el.querySelectorAll<HTMLElement>('[data-panel]'));
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? { matches: true, addEventListener() {}, removeEventListener() {} };
    const canAnimate = typeof el.animate === 'function';
    let current = 0, generation = 0, visible = !embedded;
    let animations: Animation[] = []; let story: Animation[] = []; let storyRun = 0; let storyFrozen = false; let prepared: Animation[] = [];
    const identity = 'translate3d(0px,0px,0px) rotate(0deg) scale(1)';
    const layers = panels.map(panel => Array.from(panel.querySelectorAll<HTMLElement>('[data-layer]')));
    const settle = () => {
      generation++;
      animations.forEach(animation => animation.cancel()); animations = [];
      layers.forEach((items, index) => items.forEach(item => {
        item.style.transform = identity; item.style.opacity = index === current ? '1' : '0';
        item.style.willChange = 'auto';
      }));
      el.dataset.motion = 'rest';
    };
    const syncVisibility = () => [...animations, ...(storyFrozen ? [] : story)].forEach(animation => {
      if (!visible || document.hidden) animation.pause();
      else if (animation.playState === 'paused') animation.play();
    });
    const present = () => {
      storyFrozen = false;
      story.forEach(animation => animation.cancel()); story = [];
      const run = ++storyRun;
      if (reduced.matches || !canAnimate) return;
      el.dataset.motion = 'presenting';
      story = prepared.length ? prepared : playStageEntrance(panels[current], stageProjects.indexOf(projects[current])); prepared = []; story.forEach(animation => animation.play());
      syncVisibility();
      void Promise.all(story.map(animation => animation.finished.catch(() => undefined))).then(() => {
        if (run !== storyRun) return;
        story.forEach(animation => animation.cancel()); story = [];
        el.dataset.motion = 'rest';
      });
    };
    engine.current = direction => {
      storyRun++; storyFrozen = true;
      // Freeze the small product story while the whole composition leaves the card.
      story.forEach(animation => animation.pause());
      const interrupted = el.dataset.motion === 'moving';
      const next = (current + direction + panels.length) % panels.length;
      // Sample every layer before cancelling: a reversal starts from the rendered pose.
      const snapshots = layers.map(items => items.map(item => {
        const style = getComputedStyle(item);
        return { transform: style.transform, opacity: style.opacity };
      }));
      animations.forEach(animation => animation.cancel()); animations = [];
      current = next; setActive(next);
      if (embedded) {
        try { sessionStorage.setItem('ruon:stage-project', projects[next].slug); } catch {}
        history.replaceState(history.state, '', '#project-' + projects[next].slug);
      }
      el.dataset.active = projects[next].slug;
      el.dataset.direction = direction > 0 ? 'next' : 'previous';
      panels.forEach((panel, i) => { panel.inert = i !== next; });
      prepared.forEach(animation => animation.cancel()); prepared = [];
      if (!reduced.matches && canAnimate) {
        prepared = playStageEntrance(panels[next], stageProjects.indexOf(projects[next]));
        prepared.forEach(animation => { animation.pause(); animation.currentTime = 0; });
      }
      const run = ++generation;
      if (reduced.matches || !canAnimate) { settle(); return; }
      el.dataset.motion = 'moving';
      const width = el.clientWidth;
      layers.forEach((items, panelIndex) => items.forEach((item, index) => {
        const incoming = panelIndex === next;
        if (!incoming && snapshots[panelIndex].every(pose => Number(pose.opacity) < .001)) return;
        const depth = Number(item.dataset.layer);
        const scene = item.closest<HTMLElement>('[data-stage-scene]');
        const scale = scene ? scene.getBoundingClientRect().width / scene.offsetWidth : 1;
        const distance = width * (1.18 + depth * .12) / Math.max(scale, .1);
        const offstage = (sign: number) => `translate3d(${sign * distance}px,${depth > 1 ? 22 : 0}px,0px) rotate(${sign * (depth > 1 ? 9 : 0)}deg) scale(${depth > 1 ? .92 : .98})`;
        const start = incoming && !interrupted ? { transform: offstage(direction), opacity: '1' } : snapshots[panelIndex][index];
        const end = { transform: incoming ? identity : offstage(-direction), opacity: '1' };
        item.style.transform = end.transform; item.style.opacity = end.opacity; item.style.willChange = 'transform, opacity';
        const artwork = depth > 1;
        const duration = interrupted ? 850 : incoming ? (artwork ? 1350 : 950) : (artwork ? 900 : 820);
        const animation = item.animate([start, end], {
          duration, delay: interrupted ? 0 : incoming ? (artwork ? 60 + Math.max(0, index - 5) * 24 : 310 + index * 24) : index * 8,
          easing: incoming ? 'cubic-bezier(.16,1,.3,1)' : 'cubic-bezier(.4,0,.2,1)', fill: 'both',
        });
        animations.push(animation);
      }));
      syncVisibility();
      void Promise.all(animations.map(animation => animation.finished.catch(() => undefined))).then(() => {
        if (run === generation) { settle(); present(); }
      });
    };
    el.dataset.interactive = 'true';
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncVisibility(); });
    if (observer) observer.observe(el); else visible = true;
    const preference = () => { if (reduced.matches) { storyRun++; [...story, ...prepared].forEach(animation => animation.cancel()); story = []; prepared = []; settle(); } };
    reduced.addEventListener('change', preference);
    document.addEventListener('visibilitychange', syncVisibility);
    let restoreFrame = 0;
    const alias: Record<string,string> = {'project-atlas':'atlas-notarial','project-docfacil-legacy':'docfacil','project-ckf-legacy':'ckf'};
    const restore = () => {
      if (!embedded) return;
      cancelAnimationFrame(restoreFrame);
      const hash = location.hash.slice(1);
      let slug = alias[hash] || (hash.startsWith('project-') ? hash.slice(8) : '');
      if (!slug) try { slug = sessionStorage.getItem('ruon:stage-project') || ''; } catch {}
      const index = projects.findIndex(project => project.slug === slug);
      if (index >= 0 && index !== current) {
        storyRun++; [...story,...prepared].forEach(animation=>animation.cancel()); story=[]; prepared=[];
        current=index; setActive(index); el.dataset.active=projects[index].slug;
        panels.forEach((panel,i)=>{panel.inert=i!==index;}); settle(); present();
      }
      restoreFrame=requestAnimationFrame(()=>{restoreFrame=requestAnimationFrame(()=>{
        restoreCaseReturnPosition({locale,caseSlug:projects[current].slug,homePath:`/${locale}`},{focus:()=>panels[current].querySelector<HTMLElement>('h3')?.focus({preventScroll:true})});
      });});
    };
    restore(); present();
    if(embedded){addEventListener('hashchange',restore);addEventListener('pageshow',restore);}
    return () => {
      cancelAnimationFrame(restoreFrame); removeEventListener('hashchange',restore); removeEventListener('pageshow',restore);
      generation++; storyRun++; [...animations, ...story, ...prepared].forEach(animation => animation.cancel()); observer?.disconnect();
      reduced.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', syncVisibility); engine.current = null;
    };
  }, [embedded, locale, projects]);

  return <Container className={embedded ? styles.embedded : styles.page}>
    {!embedded && <a className={styles.back} href={`/${locale}#projetos`}>{en ? 'Back to the portfolio' : 'Voltar ao portfólio'}</a>}
    {!embedded && <h1>{en ? 'Selected' : 'Projetos'} <em>{en ? 'projects' : 'selecionados'}</em></h1>}
    {embedded && [...projects.map(project=>`project-${project.slug}`),"project-atlas","project-docfacil-legacy","project-ckf-legacy"].map(id=><span key={id} id={id} className={styles.anchor} aria-hidden="true"/>)}
    <div ref={root} className={styles.stage} data-stage-proof data-active={projects[active].slug} style={{ "--stage-accent": projects[active].accent } as CSSProperties} data-motion="rest"
      role="region" aria-roledescription={en ? 'carousel' : 'carrossel'} aria-label={en ? 'Selected projects' : 'Projetos selecionados'}
      onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); engine.current?.(event.key === 'ArrowRight' ? 1 : -1); } }}
      onTouchStart={event => { gesture.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={event => { const start = gesture.current; gesture.current = null; if (!start || !event.changedTouches.length) return; const dx = event.changedTouches[0].clientX - start.x, dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) engine.current?.(dx < 0 ? 1 : -1); }}>
      <div className={styles.viewport}>
        {projects.map((project, index) => <article key={index} className={styles.panel} data-panel={index} style={{ "--stage-accent": project.accent } as CSSProperties} aria-hidden={active !== index} inert={active !== index}>
          <div className={styles.copy}>
            <p data-layer="0.65" className={styles.kind}>{project.kind[en ? 1 : 0]}</p>
            <h3 data-layer="0.85" tabIndex={-1}>{project.name}</h3>
            <p data-layer="0.9" className={styles.tagline}>{project.title[en ? 1 : 0]}</p>
            <p data-layer="0.95" className={styles.description}>{project.description[en ? 1 : 0]}</p>
            <div data-layer="1" className={styles.actions}><a className={styles.cta} href={`/${locale}/projetos/${project.slug}`} onClick={event=>{if(embedded && isPlainPrimaryClick(event)) captureCaseReturnPosition({locale,caseSlug:project.slug,homePath:`/${locale}`});}}>{en ? 'Explore the project' : 'Conhecer o projeto'} <ArrowUpRight size={18} /></a></div>          </div>
          <div className={styles.scene} data-stage-scene aria-hidden="true">
            {stageProjects.indexOf(project) > 1 ? <AdditionalStageArt project={stageProjects.indexOf(project)} locale={locale}/> : project.slug === "docfacil" ? <>
              <div className={styles.plinth} data-layer="1.05"><div /></div>
              <div className={styles.document} data-layer="1.2"><div className={styles.paper} data-doc-paper>
                <header><strong>DocFácil</strong><small>{en ? 'EXAMPLE' : 'EXEMPLO'}</small></header>
                <div className={styles.lines}><i /><i /></div>
                <div className={styles.question}><span><FileText size={19} />{en ? 'Who is the landlord?' : 'Quem é o locador do imóvel?'}</span><p><span data-doc-answer>{en ? 'Example person' : 'Pessoa de exemplo'}</span> <Check data-doc-check size={20} /></p></div>
                <div className={styles.checklist}><p><Check data-doc-check /><i data-doc-line /></p><p><b /><i data-doc-line /></p><p><b /><i data-doc-line /></p></div><div className={styles.success} data-doc-success><Check size={15} />{en ? "Ready to become a PDF" : "Pronto para virar PDF"}</div>
              </div></div>
              <div className={styles.owl} data-layer="1.48"><img data-owl-body src="/assets/projects/docfacil/owl-guide.webp" alt="" width="400" height="400" /></div>
            </> : <div className={styles.vecom} data-layer="1.25"><VecomComposition label="" progress={1} /><div className={styles.transfer} data-transfer><FileText size={22} /><strong>{en ? 'Registration form' : 'Ficha cadastral'}</strong><i /><i /><span><Check size={13} />{en ? 'Sent' : 'Enviada'}</span></div><div className={styles.receipt} data-vecom-receipt><Check size={18} /><span>{en ? 'New form received' : 'Nova ficha recebida'}<small>{en ? 'Ready for the team' : 'Pronta para a equipe'}</small></span></div></div>}
          </div>
        </article>)}
        <svg className={styles.ribbon} viewBox="0 0 1400 90" preserveAspectRatio="none" aria-hidden="true"><path d="M-40 36 C350 -60 750 170 1440 38" /></svg>
      </div>
      <button className={`${styles.arrow} ${styles.previous}`} onClick={() => engine.current?.(-1)} aria-label={en ? 'Previous project' : 'Projeto anterior'}><ArrowLeft /></button>
      <button className={`${styles.arrow} ${styles.next}`} onClick={() => engine.current?.(1)} aria-label={en ? 'Next project' : 'Próximo projeto'}><ArrowRight /></button>
    </div>
    <p className={styles.srOnly} aria-live="polite" aria-atomic="true">{projects[active].name}</p>
    {!embedded && <p className={styles.note}>{en ? 'Motion study · Five projects' : 'Estudo de movimento · Cinco projetos'}</p>}
    <noscript><p>{projects.map(project=><a key={project.slug} href={`/${locale}/projetos/${project.slug}`}>{project.name} · </a>)}</p></noscript>
  </Container>;
}
