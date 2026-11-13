'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import { vioCopy } from './viodigital-copy';
import VioDocument from './VioDocument';
import styles from './VioDigital.module.css';

export default function VioStory({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(2);
  const copy = vioCopy(locale);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const pinned = innerWidth > 760 && innerHeight > 700;
      const travel = pinned ? root.offsetHeight - innerHeight + 32 : rect.height + innerHeight * .35;
      const progress = media.matches ? 1 : Math.max(0, Math.min(1, ((pinned ? 32 : innerHeight * .65) - rect.top) / Math.max(1, travel)));
      root.style.setProperty('--vio-progress', String(progress));
      setStage(progress < .3 ? 0 : progress < .68 ? 1 : 2);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); media.removeEventListener('change', schedule); };
  }, []);
  return <section id="caminho" ref={ref} className={styles.story} data-vio-story data-stage={stage} aria-labelledby="vio-story-title">
    <div className={styles.storyInner}>
      <div className={styles.storyHeading}><span className={styles.sectionEyebrow}>02 / {copy.chapterNav[1]}</span><h2 id="vio-story-title">{copy.solution}</h2><p>{copy.solutionText}</p></div>
      <div className={styles.storyLayout}>
        <ol className={styles.acts}>{copy.acts.map((act, index) => <li key={act.title} data-active={stage === index}><span aria-hidden="true">0{index + 1}</span><div><h3>{act.title}</h3><p>{act.text}</p></div></li>)}</ol>
        <div className={styles.storyArt}><VioDocument example={copy.example} shared={false} /><span className={styles.orbit} aria-hidden="true" /><span className={styles.sampleNote}>{copy.illustration}</span></div>
      </div>
      <div className={styles.storyTrack} aria-hidden="true"><i /></div>
    </div>
  </section>;
}
