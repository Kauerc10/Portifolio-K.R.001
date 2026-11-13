'use client';

import { Car, Check, Layers3, Type } from 'lucide-react';
import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import type { Locale } from '@/i18n/config';
import styles from './Atlas.module.css';

export default function AtlasComposition({ locale, progress, label }: { locale: Locale; progress?: number; label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const connector = useRef<SVGSVGElement>(null);
  const en = locale === 'en-US';
  const style = progress === undefined ? undefined : { '--atlas-progress': progress } as CSSProperties;
  const layers = [{ key: 'format', icon: Type, text: en ? 'Format' : 'Formatar' }, { key: 'check', icon: Check, text: en ? 'Review' : 'Conferir' }, { key: 'organize', icon: Layers3, text: en ? 'Organize' : 'Organizar' }];
  useLayoutEffect(() => {
    const element = root.current;
    const svg = connector.current;
    if (!element || !svg) return;
    let frame = 0;
    let followup = 0;
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height || bounds.bottom < 0 || bounds.top > innerHeight) return;
      const points = [...element.querySelectorAll<HTMLElement>('[data-atlas-socket]')].map(node => {
        const r = node.getBoundingClientRect();
        return { x: r.left + r.width / 2 - bounds.left, y: r.top + r.height / 2 - bounds.top };
      });
      if (points.length !== 3) return;
      const [first, middle, last] = points;
      const bus = Math.min(...points.map(p => p.x)) - Math.min(32, bounds.width * .06);
      const d = `M${first.x} ${first.y}H${bus + 12}Q${bus} ${first.y} ${bus} ${first.y + 12}V${last.y - 12}Q${bus} ${last.y} ${bus + 12} ${last.y}H${last.x}M${bus} ${middle.y}H${middle.x}`;
      svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
      svg.querySelector('path')?.setAttribute('d', d);
      const p = Number(getComputedStyle(element).getPropertyValue('--atlas-progress')) || 0;
      const dot = svg.querySelector('circle');
      dot?.setAttribute('cx', String(bus));
      dot?.setAttribute('cy', String(first.y + 12 + (last.y - first.y - 24) * p));
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
        cancelAnimationFrame(followup);
        followup = requestAnimationFrame(measure);
      });
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    observer?.observe(element);
    // Parent scroll progress changes the cards; measure before that frame paints.
    const motionRoot = element.closest('#project-atlas-notarial') ?? element;
    const motionObserver = new MutationObserver(measure);
    motionObserver.observe(motionRoot, { attributes: true, attributeFilter: ['style'] });
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    reduced?.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(followup); observer?.disconnect(); motionObserver.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced?.removeEventListener('change', schedule); };
  }, []);
  return <div ref={root} className={styles.art} data-atlas-art role="img" aria-label={label} style={style}>
    <div className={styles.plinth} />
    <div className={styles.outputPaper} aria-hidden="true"><span /><i /><i /><i /><i /><i /></div>
    <div className={styles.document} data-atlas-layer="document" aria-hidden="true">
      <span className={styles.example}>{en ? 'EXAMPLE' : 'EXEMPLO'}</span>
      <Car size={42} strokeWidth={1.35} />
      <strong>{en ? 'Vehicle document' : 'Documento de veículo'}</strong>
      <div className={styles.paperLines}><i /><i /><i /><i /><i /></div>
      <small>{en ? 'Fictional details' : 'Dados de exemplo'}</small>
    </div>
    <svg ref={connector} className={styles.connector} viewBox="0 0 600 450" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M138 234H90Q78 234 78 246V375Q78 387 90 387H114M78 311H126" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/><circle cx="78" cy="375" r="4" fill="#d89b40"/></svg>
    {layers.map(({ key, icon: Icon, text }) => <div key={key} className={`${styles.layer} ${styles[key]}`} aria-hidden="true"><i className={styles.socket} data-atlas-socket /><Icon size={26} strokeWidth={1.5} /><span>{text}</span></div>)}
  </div>;
}
