'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Gauge } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';
import { splitAccentTitle } from '@/lib/editorial';
import VioPreview from '@/components/projects/VioPreview';
import VecomPreview from '@/components/projects/VecomPreview';
import AtlasPreview from '@/components/projects/AtlasPreview';
import DocFacilPreview from '@/components/projects/DocFacilPreview';
import CkfPreview from '@/components/projects/CkfPreview';
import type { Locale } from '@/i18n/config';

const cases = [
  { id: 'project-viodigital', label: { 'pt-BR': 'VioDigital', 'en-US': 'VioDigital' } },
  { id: 'project-vecom', label: { 'pt-BR': 'VECOM Ficha Fácil', 'en-US': 'VECOM Ficha Fácil' } },
  { id: 'project-atlas-notarial', label: { 'pt-BR': 'Atlas Notarial', 'en-US': 'Atlas Notarial' } },
  { id: 'project-docfacil', label: { 'pt-BR': 'DocFácil', 'en-US': 'DocFácil' } },
  { id: 'project-ckf', label: { 'pt-BR': 'CKF Manutenção', 'en-US': 'CKF Maintenance' } },
] as const;

const aliases = [
  ['project-atlas', 'project-atlas-notarial'],
  ['project-ckf-legacy', 'project-ckf'],
  ['project-docfacil-legacy', 'project-docfacil'],
] as const;

export default function ProjetosSection({ dict, locale = 'pt-BR' }: { dict: Dictionary['projetos']; locale?: Locale }) {
  const [readingMode, setReadingMode] = useState<'normal' | 'quick'>('normal');
  const [titleLead, titleAccent] = splitAccentTitle(dict.editorialTitle);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem('ruon:projects-reading');
      if (stored === 'quick' || stored === 'normal') setReadingMode(stored);
    } catch { /* storage may be blocked */ }
  }, []);

  useEffect(() => {
    try { window.sessionStorage.setItem('ruon:projects-reading', readingMode); } catch { /* storage may be blocked */ }
  }, [readingMode]);

  useEffect(() => {
    const current = window.location.hash.slice(1);
    const alias = aliases.find(([from]) => from === current);
    if (!alias) return;
    const target = document.getElementById(alias[1]);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      window.history.replaceState(null, '', `#${alias[1]}`);
    });
  }, []);

  function toggleReadingMode() {
    setReadingMode(mode => mode === 'normal' ? 'quick' : 'normal');
  }

  const quickLabel = locale === 'pt-BR' ? 'Leitura rápida' : 'Quick read';
  const quickDescription = locale === 'pt-BR'
    ? 'Percorra os cinco cases sem fixação longa.'
    : 'Scan the five cases without long pinned sequences.';
  const folilibLabel = locale === 'pt-BR' ? 'Foli continua disponível no repositório.' : 'Foli remains available in the repository.';

  return (
    <section className="section editorial-section projects-editorial" id="projetos" data-section="7" data-motion-state="idle" data-project-reading={readingMode}>
      <div className="projects-editorial__heading">
        <h2 className="editorial-display">{titleLead}{' '}<em>{titleAccent}</em></h2>
        <p className="projects-editorial__intro">{dict.editorialDescription}</p>
      </div>

      <div className="projects-editorial__controls" aria-label={locale === 'pt-BR' ? 'Controles dos projetos' : 'Project controls'}>
        <div>
          <span className="editorial-kicker">{locale === 'pt-BR' ? 'Cinco histórias, seis entregas' : 'Five stories, six deliveries'}</span>
          <p>{quickDescription}</p>
        </div>
        <button type="button" className="projects-editorial__reading-toggle" aria-pressed={readingMode === 'quick'} onClick={toggleReadingMode}>
          <Gauge aria-hidden="true" /> {quickLabel}
        </button>
      </div>

      <nav className="projects-editorial__quicknav" aria-label={locale === 'pt-BR' ? 'Ir para um projeto' : 'Jump to a project'}>
        {cases.map((item, index) => <a key={item.id} href={`#${item.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{item.label[locale]}</a>)}
      </nav>

      <span id="project-atlas" className="projects-editorial__alias" aria-hidden="true" />
      <VioPreview locale={locale} />
      <VecomPreview locale={locale} />
      <AtlasPreview locale={locale} />
      <DocFacilPreview locale={locale} />
      <CkfPreview locale={locale} />
      <span id="project-ckf-legacy" className="projects-editorial__alias" aria-hidden="true" />
      <span id="project-docfacil-legacy" className="projects-editorial__alias" aria-hidden="true" />

      <aside id="project-foli" className="projects-editorial__legacy-note">
        <span>{folilibLabel}</span>
        <a href="https://github.com/Kauerc10/foli" target="_blank" rel="noopener noreferrer">Foli <ArrowUpRight aria-hidden="true" /></a>
      </aside>
    </section>
  );
}
