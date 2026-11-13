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
      const travel = el.offsetHeight - innerHeight + 32;
      const p = reduced.matches || innerHeight <= 700 || travel <= 0 ? 1 : Math.max(0, Math.min(1, (32 - el.getBoundingClientRect().top) / travel));
      el.style.setProperty('--atlas-story-progress', String(p));
      el.dataset.atlasStage = p < .3 ? 'routine' : p < .7 ? 'formatter' : 'toolkit';
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); reduced.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced.removeEventListener('change', schedule); };
  }, []);
  const steps = en ? ['Registry routine', 'Vehicle Formatter', 'Atlas Notarial'] : ['Rotina do cartório', 'Formatador de Veículos', 'Atlas Notarial'];
  const descriptions = en ? ['Details to read, check and write again.', 'A first tool to structure the document.', 'One useful tool made room for others.'] : ['Dados para ler, conferir e redigir de novo.', 'Uma primeira ferramenta para estruturar o documento.', 'Uma ferramenta útil abriu espaço para outras.'];
  return <section ref={root} className={styles.story} data-atlas-story data-atlas-stage="toolkit" aria-labelledby="atlas-story-title">
    <div className={styles.storySticky}>
      <div className={styles.storyHeading}>
        <h2 id="atlas-story-title">{en ? 'One document was just the start.' : 'Um documento foi só o começo.'}</h2>
        <p>{en ? 'I started with the task in front of me. The Vehicle Formatter came first; other tools grew from the same attention to everyday work.' : 'Eu comecei pelo que estava ali, na minha frente. Primeiro veio o Formatador de Veículos. As outras ferramentas nasceram desse mesmo olhar para a rotina.'}</p>
      </div>
      <div className={styles.storyStage} role="img" aria-label={en ? 'Illustrated evolution: vehicle details, a structured document, and a toolkit. Fictional data.' : 'Evolução ilustrada: dados do veículo, documento estruturado e uma bancada de ferramentas. Dados fictícios.'}>
        <div className={`${styles.storyPaper} ${styles.storyRoutine}`}><small>{en ? 'EXAMPLE' : 'EXEMPLO'}</small><Car size={36} strokeWidth={1.4} /><div className={styles.rawLines}><i /><i /><i /><i /><i /></div></div>
        <div className={`${styles.storyPaper} ${styles.storyFormatter}`}><small>{en ? 'EXAMPLE' : 'EXEMPLO'}</small><Type size={36} strokeWidth={1.4} /><div className={styles.cleanLines}><i /><i /><i /><i /><i /></div><span className={styles.paperSeal}><Check size={22} /></span></div>
        <div className={`${styles.storyPaper} ${styles.storyToolkit}`}><small>ATLAS NOTARIAL</small><Layers3 size={36} strokeWidth={1.4} /><div className={styles.toolTiles}><Car size={23} /><Type size={23} /><Layers3 size={23} /></div><div className={styles.cleanLines}><i /><i /><i /></div></div>
      </div>
      <ol className={styles.storyLabels}>{steps.map((step, i) => <li key={step} data-step={i}><strong>{step}</strong><span>{descriptions[i]}</span></li>)}</ol>
      <p className={styles.storyNote}>{en ? 'Illustrated flow · scroll to follow the evolution.' : 'Fluxo ilustrado · role para acompanhar a evolução.'}</p>
    </div>
  </section>;
}
