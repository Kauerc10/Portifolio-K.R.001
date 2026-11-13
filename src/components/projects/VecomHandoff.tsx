'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { PreparedImage } from './VecomComposition';
import styles from './VecomHandoff.module.css';

export default function VecomHandoff({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const en = locale === 'en-US';
  const labels = en ? ['Fill in', 'Send', 'Receive'] : ['Preencher', 'Enviar', 'Receber'];
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const travel = element.offsetHeight - innerHeight + 32;
      const p = reduced.matches || innerHeight <= 700 || travel <= 0 ? 1 : Math.max(0, Math.min(1, (32 - element.getBoundingClientRect().top) / travel));
      const t = Math.max(0, Math.min(1, (p - .15) / .7));
      const eased = t * t * (3 - 2 * t);
      element.style.setProperty('--handoff-progress', String(p));
      element.style.setProperty('--card-left', `${18 + 53 * eased}%`);
      element.style.setProperty('--card-top', `${57 - 27 * Math.sin(eased * Math.PI) - 4 * eased}%`);
      element.style.setProperty('--card-scale', String(1 - .28 * Math.max(0, Math.min(1, (p - .7) / .3))));
      element.style.setProperty('--card-turn', `${-9 + 12 * Math.sin(eased * Math.PI) + 9 * eased}deg`);
      element.dataset.handoffStage = p < .25 ? 'fill' : p < .8 ? 'send' : 'receive';
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced.removeEventListener('change', schedule); };
  }, []);
  return <section ref={root} id="jornada" className={styles.journey} aria-labelledby="vecom-handoff-title" data-vecom-handoff data-handoff-stage="receive">
    <div className={styles.sticky}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{en ? 'From the client to the team' : 'De quem solicita para quem atende'}</p>
        <h2 id="vecom-handoff-title">{en ? 'A form leaves the phone.' : 'A ficha sai do celular.'}<br /><span>{en ? 'The team takes it from there.' : 'A equipe segue dali.'}</span></h2>
        <p>{en ? 'A clear first step for the client. An organized place for the team to review and follow up.' : 'Um começo claro para o cliente. Um lugar organizado para a equipe conferir e acompanhar.'}</p>
      </div>
      <div className={styles.scene} role="img" aria-label={en ? 'Illustrated journey: a sample form moves from the client’s phone into the team’s queue. Prepared screens with fictional data.' : 'Percurso ilustrado: uma ficha de exemplo sai do celular do cliente e chega à fila da equipe. Telas preparadas com dados fictícios.'}>
        <div className={styles.path} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.clientPhone}>
          <PreparedImage src="/assets/projects/vecom/interface-mobile-device.png" className={styles.screen} width={390} height={844} />
          <span className={styles.deviceLabel}>{en ? 'Client' : 'Cliente'}</span>
        </div>
        <div className={styles.teamComputer}>
          <PreparedImage src="/assets/projects/vecom/interface-desktop-device.png" className={styles.screen} width={1440} height={1000} />
          <span className={styles.deviceLabel}>{en ? 'VECOM team' : 'Equipe VECOM'}</span>
        </div>
        <div className={styles.form} data-handoff-card aria-hidden="true">
          <span className={styles.formTag}>{en ? 'SAMPLE FORM' : 'FICHA DE EXEMPLO'}</span>
          <div className={styles.formPerson}><i /><span><b /><b /></span></div>
          <div className={styles.formLines}><i /><i /><i /></div>
          <span className={styles.formStatus}><i>✓</i>{en ? 'Ready for review' : 'Pronta para conferir'}</span>
        </div>
        <span className={styles.receipt} aria-hidden="true">✓ {en ? 'In the team’s queue' : 'Na fila da equipe'}</span>
      </div>
      <ol className={styles.stages}>{labels.map((label, i) => <li key={label} data-handoff-step={i}><span>0{i + 1}</span>{label}</li>)}</ol>
      <p className={styles.note}>{en ? 'Illustrated flow · fictional data. Scroll to follow the handoff.' : 'Fluxo ilustrado · dados fictícios. Role para acompanhar a passagem.'}</p>
    </div>
  </section>;
}
