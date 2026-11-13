'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { CkfImage } from './CkfComposition';
import styles from './Ckf.module.css';

export default function CkfStory({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const en = locale === 'en-US';
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, shown = Number.NaN, previous = performance.now();
    const update = () => {
      frame = 0;
      const isStatic = reduced.matches || innerHeight <= 700;
      el.dataset.ckfMotion = isStatic ? 'static' : 'scroll';
      const travel = el.offsetHeight - innerHeight + 32;
      const target = isStatic || travel <= 0 ? 1 : Math.max(0, Math.min(1, (32 - el.getBoundingClientRect().top) / travel));
      const now = performance.now(), elapsed = Math.min(48, Math.max(1, now - previous)); previous = now;
      shown = isStatic || !Number.isFinite(shown) ? target : shown + (target - shown) * (1 - Math.exp(-elapsed / 90));
      if (Math.abs(shown - target) < .0003) shown = target;
      el.style.setProperty('--ckf-story-progress', String(shown));
      el.dataset.ckfStage = shown < .33 ? 'presence' : shown < .7 ? 'services' : 'contact';
      if (shown !== target) frame = requestAnimationFrame(update);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); reduced.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced.removeEventListener('change', schedule); };
  }, []);
  const stages = en ? [
    ['presence','Show the company','Company background and industrial maintenance work.','site-desktop.png'],
    ['services','Make the services clear','Service areas and photographs of the work.','site-services.png'],
    ['contact','Open the conversation','A visible path to the commercial contact.','site-contact.png'],
  ] : [
    ['presence','Apresentar a empresa','Apresentação da empresa e dos trabalhos de manutenção industrial.','site-desktop.png'],
    ['services','Explicar os serviços','Áreas de atuação e imagens dos serviços da empresa.','site-services.png'],
    ['contact','Abrir a conversa','Um caminho visível até o contato comercial.','site-contact.png'],
  ];
  return <section ref={root} className={styles.story} data-ckf-story data-ckf-motion="static" data-ckf-stage="contact" aria-labelledby="ckf-story-title">
    <div className={styles.storySticky}>
      <div className={styles.storyHeading}><h2 id="ckf-story-title">{en ? 'How the website presents CKF.' : 'Como o site apresenta a CKF.'}<br /><span>{en ? 'Services, facilities and contact.' : 'Serviços, estrutura e contato.'}</span></h2><p>{en ? 'Identity, services and contact: a short route to understanding the company.' : 'Identidade, serviços e contato: um percurso direto para entender a empresa.'}</p></div>
      <div className={styles.storyStage}>
        <div className={styles.rail} aria-hidden="true"><span /></div>
        <div className={styles.storyFrames}>{stages.map(([id,title,description,asset]) => <figure className={styles.storyScreen} data-ckf-panel={id} key={id}><div className={styles.browserBar} aria-hidden="true"><i /><i /><i /><span>CKF Manutenção</span></div><CkfImage src={'/assets/projects/ckf/'+asset} alt={title+' · '+description} /><figcaption><strong>{title}</strong><span>{description}</span></figcaption></figure>)}</div>
      </div>
      <ol className={styles.storyLabels}>{stages.map(([id,title,description]) => <li data-step={id} key={id}><strong>{title}</strong><span>{description}</span></li>)}</ol>
      <p className={styles.storyNote}>{en ? 'Public website captures · the scroll directs the presentation.' : 'Capturas públicas do site · a rolagem conduz a apresentação.'}</p>
    </div>
  </section>;
}
