'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

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

  const titleBreak = dict.editorialTitle.lastIndexOf(' ');
  return (
    <section className="section editorial-section projects-editorial" id="projetos" data-section="7">
      <div className="projects-editorial__heading">
        <h2 className="editorial-display">
          {dict.editorialTitle.slice(0, titleBreak)}{' '}<em>{dict.editorialTitle.slice(titleBreak + 1)}</em>
        </h2>
        <p className="projects-editorial__intro">{dict.editorialDescription}</p>
      </div>
      <div className="projects-editorial__layout">
        <nav className="projects-editorial__index" aria-label={dict.editorialTitle}>
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
        <div className="projects-editorial__detail">
          {projects.map(project => {
            const item = dict.items[project.key];
            return (
              <article key={project.id} id={project.id} className="projects-editorial__case" hidden={selected !== null && selected !== project.id}>
                <span className="editorial-kicker">{item.status}</span>
                <h3>{item.title}</h3>
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
