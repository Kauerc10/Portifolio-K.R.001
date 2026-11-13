'use client';

import { useEffect, useRef } from 'react';
import { Check, FileCheck2, FileText, ListChecks } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { DocFacilOwl } from './DocFacilComposition';
import styles from './DocFacil.module.css';

export default function DocFacilStory({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const en = locale === 'en-US';
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let displayed = Number.NaN;
    let lastTime = performance.now();
    const phase = (p: number, start: number, end: number) => { const t = Math.max(0, Math.min(1, (p - start) / (end - start))); return t * t * (3 - 2 * t); };
    const update = () => {
      frame = 0;
      const staticLayout = reduced.matches || innerHeight <= 700;
      el.dataset.docfacilMotion = staticLayout ? 'static' : 'scroll';
      const travel = el.offsetHeight - innerHeight + 32;
      const target = staticLayout || travel <= 0 ? 1 : Math.max(0, Math.min(1, (32 - el.getBoundingClientRect().top) / travel));
      const now = performance.now(); const elapsed = Math.min(48, Math.max(1, now - lastTime)); lastTime = now;
      displayed = staticLayout || !Number.isFinite(displayed) ? target : displayed + (target - displayed) * (1 - Math.exp(-elapsed / 90));
      if (Math.abs(displayed - target) < .0003) displayed = target;
      const p = displayed;
      const answer = phase(p, .16, .52); const review = phase(p, .5, .8); const pdf = phase(p, .76, .96);
      el.style.setProperty('--docfacil-story-progress', String(p));
      el.style.setProperty('--answer-phase', String(answer));el.style.setProperty('--review-phase', String(review));el.style.setProperty('--pdf-phase', String(pdf));
      el.style.setProperty('--reply-left', `${27 + 38 * answer}%`);el.style.setProperty('--reply-top', `${51 - 19 * Math.sin(answer * Math.PI) + 4 * answer}%`);
      el.style.setProperty('--reply-opacity', String(Math.sin(answer * Math.PI)));
      el.dataset.docfacilStage = p < .18 ? 'choose' : p < .52 ? 'answer' : p < .8 ? 'review' : 'pdf';
      if (displayed !== target) frame = requestAnimationFrame(update);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();addEventListener('scroll', schedule, { passive: true });addEventListener('resize', schedule);reduced.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame);removeEventListener('scroll', schedule);removeEventListener('resize', schedule);reduced.removeEventListener('change', schedule); };
  }, []);
  const names = en ? ['Choose', 'Answer', 'Review', 'Document / PDF'] : ['Escolher', 'Responder', 'Revisar', 'Documento / PDF'];
  const descriptions = en ? ['A document for the situation.', 'One clear question at a time.', 'Read the details together.', 'The answers give the file its shape.'] : ['Um documento para a situação.', 'Uma pergunta clara de cada vez.', 'Conferir as informações reunidas.', 'As respostas dão forma ao arquivo.'];
  return <section ref={root} className={styles.story} data-docfacil-story data-docfacil-motion="static" data-docfacil-stage="pdf" aria-labelledby="docfacil-story-title">
    <div className={styles.storySticky}>
      <div className={styles.storyHeading}><h2 id="docfacil-story-title">{en ? 'One question at a time.' : 'Uma pergunta de cada vez.'}<br /><span>{en ? 'A document taking shape.' : 'Um documento ganhando forma.'}</span></h2><p>{en ? 'Choose the document, answer with guidance and review what you have written. The owl helps show the next step.' : 'Escolher o documento, responder com orientação e revisar o que foi preenchido. A corujinha ajuda a mostrar o próximo passo.'}</p></div>
      <div className={styles.storyStage} role="img" aria-label={en ? 'Illustrated example: a question is answered, the answer enters the document, and the file is reviewed as a PDF. No document is generated here.' : 'Exemplo ilustrado: uma pergunta recebe resposta, a resposta entra no documento e o arquivo é revisado como PDF. Nenhum documento é gerado aqui.'}>
        <div className={styles.storyPaper} aria-hidden="true"><strong>DocFácil</strong><small>{en ? 'EXAMPLE · RENTAL AGREEMENT' : 'EXEMPLO · CONTRATO DE LOCAÇÃO'}</small><div className={styles.documentLines}><i /><i /><i /><i /><i /></div><span className={styles.filledDetail}>{en ? 'Example person' : 'Pessoa de exemplo'}</span><div className={styles.documentLines}><i /><i /><i /></div><span className={styles.pdfBadge}><FileCheck2 size={22} />PDF</span><Check className={styles.documentCheck} size={32} /></div>
        <div className={styles.guidePanel} aria-hidden="true"><span className={styles.guideTip}>{en ? 'A tip from the owl' : 'Dica da Corujinha'}</span><span className={styles.documentChoice}><ListChecks size={18} />{en ? 'Rental agreement' : 'Contrato de locação'}</span><strong>{en ? 'Who is the landlord?' : 'Quem é o locador do imóvel?'}</strong><small>{en ? 'The person making the property available.' : 'A pessoa que disponibiliza o imóvel.'}</small><div className={styles.answerField}>{en ? 'Example person' : 'Pessoa de exemplo'}<Check size={16} /></div></div>
        <span className={styles.reply} data-docfacil-reply aria-hidden="true"><FileText size={16} />{en ? 'Example person' : 'Pessoa de exemplo'}</span>
        <DocFacilOwl className={styles.storyOwl} />
      </div>
      <ol className={styles.storyLabels}>{names.map((name, i) => <li key={name} data-step={i}><strong>{name}</strong><span>{descriptions[i]}</span></li>)}</ol>
      <p className={styles.storyNote}>{en ? 'Illustrated flow · fictional data · follow with the scroll.' : 'Fluxo ilustrado · dados fictícios · acompanhe pela rolagem.'}</p>
    </div>
  </section>;
}
