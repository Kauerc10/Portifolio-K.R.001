'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Car, Check, FileText, House, Layers3, MessageCircle, Type } from 'lucide-react';
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
    let displayed = Number.NaN;
    let lastTime = performance.now();
    const update = () => {
      frame = 0;
      const staticLayout = reduced.matches || innerHeight <= 700;
      el.dataset.atlasMotion = staticLayout ? 'static' : 'scroll';
      const travel = el.offsetHeight - innerHeight + 32;
      const target = staticLayout || travel <= 0 ? 1 : Math.max(0, Math.min(1, (32 - el.getBoundingClientRect().top) / travel));
      const now = performance.now();
      const elapsed = Math.min(48, Math.max(1, now - lastTime));
      lastTime = now;
      displayed = staticLayout || !Number.isFinite(displayed) ? target : displayed + (target - displayed) * (1 - Math.exp(-elapsed / 90));
      if (Math.abs(displayed - target) < .0003) displayed = target;
      const p = displayed;
      el.style.setProperty('--atlas-story-progress', String(p));
      const phase = (from: number, to: number) => {
        const t = Math.max(0, Math.min(1, (p - from) / (to - from)));
        return t * t * (3 - 2 * t);
      };
      el.style.setProperty('--format-phase', String(phase(.05, .4)));
      el.style.setProperty('--expand-phase', String(phase(.48, .94)));
      el.style.setProperty('--tool-one', String(phase(.57, .82)));
      el.style.setProperty('--tool-two', String(phase(.62, .87)));
      el.style.setProperty('--tool-three', String(phase(.67, .93)));
      // Three small pieces of information travel along the same arc as the trace.
      const xs = innerWidth <= 760 ? [200, 380, 580, 770] : [265, 390, 550, 675];
      el.querySelectorAll<HTMLElement>('[data-atlas-payload]').forEach((packet, index) => {
        const t = phase(.07 + index * .045, .35 + index * .045);
        const u = 1 - t;
        const x = u ** 3 * xs[0] + 3 * u * u * t * xs[1] + 3 * u * t * t * xs[2] + t ** 3 * xs[3];
        const y = u ** 3 * 200 + 3 * u * u * t * 50 + 3 * u * t * t * 50 + t ** 3 * 200;
        packet.style.left = `${x / 10}%`;
        packet.style.top = `${y / 3.5}%`;
        packet.style.opacity = String(Math.sin(Math.PI * t));
        packet.style.transform = `translate(-50%,-50%) rotate(${-12 + 24 * t}deg)`;
      });
      el.dataset.atlasStage = p < .3 ? 'routine' : p < .7 ? 'formatter' : 'toolkit';
      if (displayed !== target) frame = requestAnimationFrame(update);
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
        <h2 id="atlas-story-title">{en ? 'One document was ' : 'Um documento foi '}<span>{en ? 'just the start.' : 'só o começo.'}</span></h2>
        <p>{en ? 'The Vehicle Formatter retrieves details from the Detran API and prepares them for a power of attorney. From that first tool, Atlas grew into a toolkit for everyday work.' : 'O Formatador de Veículos busca os dados na API do Detran e os prepara para inserir na procuração. Dessa primeira ferramenta, o Atlas cresceu para uma bancada de soluções do dia a dia.'}</p>
      </div>
      <div className={styles.storyStage} role="img" aria-label={en ? 'Illustrated evolution: vehicle details, a structured document, and a toolkit. Fictional data.' : 'Evolução ilustrada: dados do veículo, documento estruturado e uma bancada de ferramentas. Dados fictícios.'}>
        <svg className={styles.storyFlow} viewBox="0 0 1000 350" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className={styles.flowDesktop} d="M265 200C390 50 550 50 675 200" />
          <path className={styles.flowMobile} d="M200 200C380 50 580 50 770 200" />
        </svg>
        {(en ? ['Query', 'Details', 'Ready text'] : ['Consulta', 'Dados', 'Texto pronto']).map((text, i) => <span key={text} className={styles.payload} data-atlas-payload aria-hidden="true"><FileText size={14} />{text}</span>)}
        <div className={styles.storyGuide} aria-hidden="true"><span>API {en ? 'Detran' : 'do Detran'}</span><ArrowRight size={18} /><span>{en ? 'Power of attorney' : 'Procuração'}</span></div>
        <div data-atlas-paper className={`${styles.storyPaper} ${styles.storyRoutine}`}><small>{en ? 'EXAMPLE' : 'EXEMPLO'}</small><Car size={36} strokeWidth={1.4} /><div className={styles.rawLines}><i /><i /><i /><i /><i /></div></div>
        <div data-atlas-paper className={`${styles.storyPaper} ${styles.storyFormatter}`}><small>{en ? 'EXAMPLE' : 'EXEMPLO'}</small><Type size={36} strokeWidth={1.4} /><div className={styles.cleanLines}><i /><i /><i /><i /><i /></div><span className={styles.paperSeal}><Check size={22} /></span></div>
        <div data-atlas-paper className={`${styles.storyPaper} ${styles.storyToolkit}`}>
          <div className={styles.toolkitHeading}><Layers3 size={26} /><strong>Atlas Notarial</strong><span>{en ? 'One workspace. More possibilities.' : 'Uma bancada. Novas possibilidades.'}</span></div>
          <div className={styles.toolTiles}>
            <div><House size={25} /><span>{en ? 'Residence declaration' : 'Declaração de residência'}</span></div>
            <div><FileText size={25} /><span>{en ? 'Promissory notes' : 'Notas promissórias'}</span></div>
            <div><MessageCircle size={25} /><span>{en ? 'Team chat' : 'Chat da equipe'}</span></div>
          </div>
          <span className={styles.formatterOrigin}><Car size={16} />{en ? 'It started with the Vehicle Formatter.' : 'Tudo começou com o Formatador de Veículos.'}</span>
        </div>
      </div>
      <ol className={styles.storyLabels}>{steps.map((step, i) => <li key={step} data-step={i}><strong>{step}</strong><span>{descriptions[i]}</span></li>)}</ol>
      <p className={styles.storyNote}>{en ? 'Illustrated flow · scroll to follow the evolution.' : 'Fluxo ilustrado · role para acompanhar a evolução.'}</p>
    </div>
  </section>;
}
