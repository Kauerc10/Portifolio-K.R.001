'use client';
import type { Dictionary } from '@/i18n/types';
import type { Locale } from '@/i18n/config';
import { splitAccentTitle } from '@/lib/editorial';
import StageProof from '@/components/projects/stage-proof/StageProof';
import { ArrowUpRight } from 'lucide-react';
export default function ProjetosSection({dict,locale='pt-BR'}:{dict:Dictionary['projetos'];locale?:Locale}){
 const [lead,accent]=splitAccentTitle(dict.editorialTitle);
 return <section className="section editorial-section projects-editorial" id="projetos" data-section="7" data-motion-state="idle" data-project-showcase="stage">
  <div className="projects-editorial__heading"><h2 className="editorial-display">{lead} <em>{accent}</em></h2><p className="projects-editorial__intro">{dict.editorialDescription}</p></div>
  <StageProof locale={locale} embedded/>
  <aside id="project-foli" className="projects-editorial__legacy-note"><span>{locale==='pt-BR'?'Foli continua disponível no repositório.':'Foli remains available in the repository.'}</span><a href="https://github.com/Kauerc10/foli" target="_blank" rel="noopener noreferrer">Foli <ArrowUpRight aria-hidden="true"/></a></aside>
 </section>;
}
