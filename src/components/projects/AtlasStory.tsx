'use client';

import { useEffect, useRef } from 'react';
import { Car, Check, Layers3, Type } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import styles from './Atlas.module.css';

export default function AtlasStory({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const en = locale === 'en-US';
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const staticLayout = reduced.matches || innerHeight <= 700;
      el.dataset.atlasMotion = staticLayout ? 'static' : 'scroll';
      const travel = el.offsetHeight - innerHeight + 32;
      const p = staticLayout || travel <= 0 ? 1 : Math.max(0, Math.min(1, (32 - el.getBoundingClientRect().top) / travel));
      el.style.setProperty('--atlas-story-progress', String(p));
      el.dataset.atlasStage = p < .3 ? 'routine' : p < .7 ? 'formatter' : 'toolkit';
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); reduced.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced.removeEventListener('change', schedule); };
  }, []);
  const steps = en ? ['Registry routine', 'Vehicle Formatter', 'Atlas Notarial'] : ['Rotina do cartório', 'Formatador de Veículos', 'Atlas Notarial'];
  const descriptions = en ? ['Vehicle details needed in powers of attorney.', 'Detran API → formatted details for the document.', 'Declarations, promissory notes, team chat and more.'] : ['Dados de veículos para inserir nas procurações.', 'API do Detran → dados formatados para a procuração.', 'Declarações, promissórias, chat e outras ferramentas.'];
  return <section ref={root} className={styles.story} data-atlas-story data-atlas-stage="toolkit" data-atlas-motion="static" aria-labelledby="atlas-story-title">
    <div className={styles.storySticky}>
      <div className={styles.storyHeading}>
        <h2 id="atlas-story-title">{en ? 'One document was just the start.' : 'Um documento foi só o começo.'}</h2>
        <p>{en ? 'The Vehicle Formatter retrieves details from the Detran API and prepares them for a power of attorney. From that first tool, Atlas grew into a toolkit for everyday work.' : 'O Formatador de Veículos busca os dados na API do Detran e os prepara para inserir na procuração. Dessa primeira ferramenta, o Atlas cresceu para uma bancada de soluções do dia a dia.'}</p>
      </div>
      <div className={styles.storyStage} role="img" aria-label={en ? 'Illustrated evolution: vehicle details, a structured document, and a toolkit. Fictional data.' : 'Evolução ilustrada: dados do veículo, documento estruturado e uma bancada de ferramentas. Dados fictícios.'}>
        <div data-atlas-paper className={`${styles.storyPaper} ${styles.storyRoutine}`}><small>{en ? 'EXAMPLE' : 'EXEMPLO'}</small><Car size={36} strokeWidth={1.4} /><div className={styles.rawLines}><i /><i /><i /><i /><i /></div></div>
        <div data-atlas-paper className={`${styles.storyPaper} ${styles.storyFormatter}`}><small>{en ? 'EXAMPLE' : 'EXEMPLO'}</small><Type size={36} strokeWidth={1.4} /><div className={styles.cleanLines}><i /><i /><i /><i /><i /></div><span className={styles.paperSeal}><Check size={22} /></span></div>
        <div data-atlas-paper className={`${styles.storyPaper} ${styles.storyToolkit}`}><small>ATLAS NOTARIAL</small><Layers3 size={36} strokeWidth={1.4} /><div className={styles.toolTiles}><Car size={23} /><Type size={23} /><Layers3 size={23} /></div><div className={styles.cleanLines}><i /><i /><i /></div></div>
      </div>
      <ol className={styles.storyLabels}>{steps.map((step, i) => <li key={step} data-step={i}><strong>{step}</strong><span>{descriptions[i]}</span></li>)}</ol>
      <p className={styles.storyNote}>{en ? 'Illustrated flow · scroll to follow the evolution.' : 'Fluxo ilustrado · role para acompanhar a evolução.'}</p>
    </div>
  </section>;
}
