'use client';

import { useEffect, useRef } from 'react';
import { FileDown, Check, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { CkfImage } from './CkfComposition';
import styles from './CkfQuoteStory.module.css';

export default function CkfQuoteStory({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const en = locale === 'en-US';
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, shown = Number.NaN, previous = performance.now();
    const phase = (p: number, start: number, end: number) => { const t = Math.max(0, Math.min(1, (p-start)/(end-start))); return t*t*(3-2*t); };
    const update = () => {
      frame = 0;
      const isStatic = reduced.matches || innerHeight <= 700;
      el.dataset.ckfQuoteMotion = isStatic ? 'static' : 'scroll';
      const travel = el.offsetHeight-innerHeight+32;
      const target = isStatic || travel<=0 ? 1 : Math.max(0,Math.min(1,(32-el.getBoundingClientRect().top)/travel));
      const now = performance.now(), elapsed = Math.min(48,Math.max(1,now-previous)); previous=now;
      shown = isStatic || !Number.isFinite(shown) ? target : shown+(target-shown)*(1-Math.exp(-elapsed/90));
      if(Math.abs(shown-target)<.0003) shown=target;
      const build = phase(shown,.16,.68), document = phase(shown,.55,.95);
      el.style.setProperty('--quote-progress',String(shown));
      el.style.setProperty('--quote-build',String(build));
      el.style.setProperty('--quote-document',String(document));
      for(const[index,start,end]of [[0,.18,.57],[1,.3,.7]]) {
        const t=phase(shown,start,end);
        el.style.setProperty(`--token-${index}-x`,`${35+48*t}%`);
        el.style.setProperty(`--token-${index}-y`,`${56-28*Math.sin(t*Math.PI)+index*12}%`);
        el.style.setProperty(`--token-${index}-opacity`,String(Math.sin(t*Math.PI)));
      }
      el.dataset.ckfQuoteStage=shown<.3?'items':shown<.72?'quote':'pdf';
      if(shown!==target) frame=requestAnimationFrame(update);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',schedule);
    return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule);};
  },[]);
  const steps=en?[
    ['items','Choose the services','Customer, service description, quantity and price are entered in the quote.'],
    ['quote','Review the proposal','The team checks the items, total, validity and notes before issuing the document.'],
    ['pdf','Generate the PDF','The information is assembled in the company’s commercial document.'],
  ]:[
    ['items','Informar os serviços','Cliente, descrição do serviço, quantidade e valor compõem o orçamento.'],
    ['quote','Conferir a proposta','A equipe revisa itens, total, validade e observações antes de emitir o documento.'],
    ['pdf','Gerar o PDF','As informações são organizadas no documento comercial da empresa.'],
  ];
  return <section ref={root} className={styles.story} data-ckf-quote-story data-ckf-quote-motion="static" data-ckf-quote-stage="pdf" aria-labelledby="ckf-quote-title">
    <div className={styles.sticky}>
      <div className={styles.heading}><h2 id="ckf-quote-title">{en?'From service items':'Dos serviços'}<br/><span>{en?'to a PDF quote.':'ao orçamento em PDF.'}</span></h2><p>{en?'The example follows a mechanical service quote. The editor and document below belong to the actual system, running locally with fictional records.':'O exemplo acompanha um orçamento de revisão mecânica. O editor e o documento abaixo são do sistema real, executado localmente com dados fictícios.'}</p></div>
      <div className={styles.stage} role="img" aria-label={en?'Illustrated handoff from the actual quote editor to its PDF. One fictional service, quantity one, total R$980.':'Passagem ilustrada do editor real ao PDF do orçamento. Um serviço fictício, quantidade um, total de R$ 980,00.'}>
        <svg className={styles.path} viewBox="0 0 1000 540" preserveAspectRatio="none" aria-hidden="true"><path d="M330 290 C470 90 640 90 840 300"/><circle cx="330" cy="290" r="5"/><circle cx="840" cy="300" r="5"/></svg>
        <figure className={styles.editor} data-quote-editor aria-hidden="true"><div className={styles.bar}><i/><i/><i/><span>CKF · {en?'Quote editor':'Editor de orçamento'}</span></div><CkfImage src="/assets/projects/ckf/system-editor.png" alt={en?'Actual quote editor in local demonstration mode':'Editor real em modo local de demonstração'}/><figcaption>{en?'Actual interface · local demo':'Interface real · demonstração local'}</figcaption></figure>
        <figure className={styles.document} data-quote-document aria-hidden="true"><CkfImage src="/assets/projects/ckf/quote-pdf.png" alt={en?'PDF generated from the project’s fictional quote':'PDF gerado a partir do orçamento fictício do projeto'} width={1240} height={1754}/><span className={styles.badge}><FileDown size={16}/>PDF <Check size={15}/></span></figure>
        <span className={styles.serviceToken} data-quote-token aria-hidden="true">1 × {en?'Mechanical service':'Revisão mecânica'}<ArrowRight size={13}/></span>
        <span className={styles.totalToken} data-quote-token aria-hidden="true">{en?'Total: R$980.00':'Total: R$ 980,00'}</span>
      </div>
      <ol className={styles.steps}>{steps.map(([id,title,text])=><li key={id} data-quote-step={id}><strong>{title}</strong><span>{text}</span></li>)}</ol>
      <div className={styles.footer}><p>{en?'Illustrated sequence · actual interface and PDF · fictional records.':'Sequência ilustrada · interface e PDF reais · registros fictícios.'}</p><a href="/assets/projects/ckf/example-quote.pdf" target="_blank" rel="noopener noreferrer">{en?'Open the sample PDF':'Abrir o PDF de exemplo'} <FileDown size={16}/></a></div>
    </div>
  </section>;
}
