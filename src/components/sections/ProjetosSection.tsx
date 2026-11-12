'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';
import { splitAccentTitle } from '@/lib/editorial';
import { createMotionScope, type MotionScope } from '@/lib/section-motion';

const projects = [
  { key: 'atlas', id: 'project-atlas' },
  { key: 'ckf', id: 'project-ckf', demo: 'https://ckf-manutencao-orcamentos.vercel.app', repo: 'https://github.com/Kauerc10/ckf-manutencao-orcamentos' },
  { key: 'docfacil', id: 'project-docfacil', demo: 'https://docfacil-indol.vercel.app', repo: 'https://github.com/Kauerc10/docfacil' },
  { key: 'folilib', id: 'project-foli', repo: 'https://github.com/Kauerc10/foli' },
] as const;

const flowAssets = [
  '/assets/atlas-consulta.svg',
  '/assets/atlas-veiculo.svg',
  '/assets/atlas-procuracao.svg',
] as const;

export default function ProjetosSection({ dict }: { dict: Dictionary['projetos'] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const indexRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLSpanElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const selectionSweepRef = useRef<HTMLSpanElement>(null);
  const motionRef = useRef<MotionScope | null>(null);
  const previousSelectedRef = useRef<string | null>(null);
  const atlasPlayedRef = useRef(false);
  const atlasEntryCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motion = createMotionScope(section);
    motionRef.current = motion;
    const stopEntry = motion.onEnter(section, () => {
      section.dataset.motionState = 'entered';
      motion.animate(borderRef.current, [
        { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 76% 100%, 0 100%)' },
      ], { duration: 650 });
    });
    return () => {
      stopEntry();
      motion.dispose();
      motionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const panel = document.getElementById(selected);
    const motion = motionRef.current;
    if (!panel || !motion) return;
    motion.cancel();
    // Keep the project title and layout anchors stable; animate only supporting content.
    const content = [...panel.querySelectorAll<HTMLElement>(
      '.editorial-kicker, .projects-editorial__role, .projects-editorial__solution, .projects-editorial__stack, .projects-editorial__actions',
    )];
    content.forEach((element, index) => motion.animate(element,
      [{ opacity: .45, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 180, delay: index * 18 },
    ));

    const previous = previousSelectedRef.current;
    const changed = previous !== null && previous !== selected;
    const border = selectionSweepRef.current;
    if (border && changed) {
      const fromIndex = projects.findIndex(project => project.id === previous);
      const toIndex = projects.findIndex(project => project.id === selected);
      const direction = toIndex >= fromIndex ? 'forward' : 'backward';
      const section = sectionRef.current;
      if (section) section.dataset.selectionDirection = direction;
      motion.animate(border,
        direction === 'forward'
          ? [{ opacity: .2, transform: 'scaleY(0)' }, { opacity: 1, transform: 'scaleY(1)' }]
          : [{ opacity: .2, transform: 'scaleY(0)' }, { opacity: 1, transform: 'scaleY(1)' }],
        { duration: 320 },
      );
    }
    previousSelectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    if (selected !== 'project-atlas') return;
    const motion = motionRef.current;
    const panel = document.getElementById(selected);
    if (!motion || !panel || atlasPlayedRef.current) return;
    const flow = panel.querySelector<HTMLElement>('.projects-editorial__flow');
    if (!flow) return;
    atlasEntryCleanupRef.current?.();
    const playAtlas = () => {
      if (atlasPlayedRef.current) return;
      atlasPlayedRef.current = true;
      flow.dataset.motionPlayed = 'true';
      flow.dataset.motionPlayCount = String(Number(flow.dataset.motionPlayCount ?? '0') + 1);
      const nodes = [...flow.querySelectorAll<HTMLElement>('li')];
      nodes.forEach((node, index) => motion.animate(node, [
        { opacity: .35, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 420, delay: index * 90 }));
    };
    atlasEntryCleanupRef.current = motion.onEnter(flow, playAtlas);
    return () => {
      atlasEntryCleanupRef.current?.();
      atlasEntryCleanupRef.current = null;
    };
  }, [selected]);

  useEffect(() => {
    const index = indexRef.current;
    const control = index?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!index || !control) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      index.style.setProperty('--project-marker-y', `${control.offsetTop}px`);
      index.style.setProperty('--project-marker-height', `${control.offsetHeight}px`);
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(index);
    // Earlier labels can wrap and move the active item without changing its size.
    index.querySelectorAll('a').forEach(item => observer?.observe(item));
    window.addEventListener('resize', measure);
    void document.fonts?.ready.then(measure);
    return () => {
      disposed = true;
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [selected, dict]);

  useEffect(() => {
    let frame = 0;
    function syncHash() {
      const target = projects.find(({ id }) => '#' + id === window.location.hash);
      setSelected(target?.id ?? projects[0].id);
      cancelAnimationFrame(frame);
      if (target) {
        frame = requestAnimationFrame(() => {
          if (window.location.hash === '#' + target.id) {
            document.getElementById(target.id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
          }
        });
      }
    }
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', syncHash);
    };
  }, []);

  function selectProject(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    setSelected(id);
    window.history.replaceState(null, '', '#' + id);
    event.currentTarget.focus({ preventScroll: true });
  }

  const [titleLead, titleAccent] = splitAccentTitle(dict.editorialTitle);
  return (
    <section ref={sectionRef} className="section editorial-section projects-editorial" id="projetos" data-section="7" data-motion-state="idle">
      <div className="projects-editorial__heading">
        <h2 className="editorial-display">
          {titleLead}{' '}<em>{titleAccent}</em>
        </h2>
        <p className="projects-editorial__intro">{dict.editorialDescription}</p>
        <span ref={borderRef} className="projects-editorial__directional-border" aria-hidden="true" />
      </div>
      <div className="projects-editorial__layout">
        <nav ref={indexRef} className="projects-editorial__index" aria-label={dict.editorialTitle}>
          <span className="projects-editorial__marker" aria-hidden="true" />
          {projects.map(({ id, key }) => (
            <a
              key={id}
              href={'#' + id}
              aria-current={selected === id ? 'true' : undefined}
              className={selected === id ? 'is-active' : undefined}
              onClick={(event) => selectProject(event, id)}
            >
              <span>{dict.navLabels[key as keyof typeof dict.navLabels]}</span><ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div ref={detailRef} className="projects-editorial__detail" data-enhanced={selected !== null || undefined}>
          <span ref={selectionSweepRef} className="projects-editorial__selection-sweep" aria-hidden="true" />
          {projects.map(project => {
            const item = dict.items[project.key];
            return (
              <article key={project.id} id={project.id} className="projects-editorial__case" hidden={selected !== null && selected !== project.id} inert={selected !== null && selected !== project.id} aria-hidden={selected !== null && selected !== project.id || undefined}>
                <span className="editorial-kicker">{item.status}</span>
                <h3>{item.title}</h3>
                <p className="projects-editorial__role">{item.role}</p>
                <p>{item.problem}</p>
                <p className="projects-editorial__solution">{item.solution}</p>
                {project.key === 'atlas' && (
                  <ol className="projects-editorial__flow">
                    {flowAssets.map((assetSrc, index) => (
                      <li key={dict.flowLabels[index]} className={index === flowAssets.length - 1 ? 'is-result' : undefined}>
                        <span><img src={assetSrc} alt="" width="44" height="44" loading="lazy" /></span><strong>{dict.flowLabels[index]}</strong>
                      </li>
                    ))}
                  </ol>
                )}
                <p className="projects-editorial__stack">{item.stack}</p>
                <div className="projects-editorial__actions">
                  {'demo' in project && <a href={project.demo} target="_blank" rel="noopener noreferrer">{dict.btnDemo}<ArrowUpRight aria-hidden="true" /></a>}
                  {'repo' in project && <a href={project.repo} target="_blank" rel="noopener noreferrer">{dict.btnRepo}<ArrowUpRight aria-hidden="true" /></a>}
                  {project.key === 'atlas' && <span>{dict.privateRepo}</span>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
