import type { StageProjectSlug } from './stage-projects';

/** Finite product stories, separate from the directional carousel movement. */
export function playStageEntrance(panel: HTMLElement, project: StageProjectSlug): Animation[] {
  const animations: Animation[] = [];
  const animate = (selector: string, frames: Keyframe[], duration: number, delay = 0) => {
    panel.querySelectorAll<HTMLElement>(selector).forEach(element => {
      animations.push(element.animate(frames, { duration, delay, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)' }));
    });
  };
  if (project === 'docfacil') {
    const paper = panel.querySelector<HTMLElement>('[data-doc-paper]');
    const pose = paper ? getComputedStyle(paper).transform : 'none';
    animate('[data-doc-paper]', [
      { transform: pose, offset: 0 },
      { transform: `${pose} rotateY(5deg) rotateZ(1.5deg)`, offset: .35 },
      { transform: pose, offset: 1 },
    ], 2400);
    animate('[data-owl-body]', [
      { transform: 'translateY(0) rotate(0deg) scale(1)', offset: 0 },
      { transform: 'translateY(3px) rotate(-7deg) scale(1.015,.98)', offset: .18 },
      { transform: 'translateY(-18px) rotate(5deg) scale(.99,1.03)', offset: .38 },
      { transform: 'translateY(2px) rotate(-3deg) scale(1.025,.98)', offset: .55 },
      { transform: 'translateY(-4px) rotate(2deg) scale(1)', offset: .73 },
      { transform: 'translateY(0) rotate(0deg) scale(1)', offset: 1 },
    ], 2700);
    animate('[data-doc-answer]', [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], 950, 280);
    animate('[data-doc-check]', [{ opacity: 0, transform: 'scale(.25) rotate(-35deg)' }, { opacity: 1, transform: 'scale(1) rotate(0deg)' }], 600, 1050);
    panel.querySelectorAll<HTMLElement>('[data-doc-line]').forEach((element, index) => {
      animations.push(element.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
        duration: 800, delay: 1000 + index * 180, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)',
      }));
    });
    animate('[data-doc-success]', [{ opacity: 0, transform: 'translateY(10px) scale(.9)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], 700, 1500);
  } else if (project === 'vecom') {
    // The two screens remain real captures. Only the sample form and receipt are illustrative.
    for (const [layer, rotation, delay] of [['phone', -5, 0], ['laptop', 2, 1100], ['folder', -2, 1450]] as const) {
      const element = panel.querySelector<HTMLElement>(`[data-vecom-layer="${layer}"]`);
      if (!element) continue;
      const pose = getComputedStyle(element).transform;
      animations.push(element.animate([
        { transform: pose, offset: 0 },
        { transform: `${pose} translateY(-10px) rotate(${rotation}deg)`, offset: .4 },
        { transform: pose, offset: 1 },
      ], { duration: 1300, delay, easing: 'ease-in-out', fill: 'backwards' }));
    }
    const transfer = panel.querySelector<HTMLElement>('[data-transfer]');
    const scene = panel.querySelector<HTMLElement>('[data-vecom-art]');
    if (transfer && scene) {
      const w = scene.clientWidth, h = scene.clientHeight;
      animations.push(transfer.animate([
        { transform: `translate(${w * .72}px,${h * .5}px) rotate(8deg) scale(.35)`, opacity: 0, offset: 0 },
        { transform: `translate(${w * .67}px,${h * .29}px) rotate(4deg) scale(.8)`, opacity: 1, offset: .2 },
        { transform: `translate(${w * .39}px,${h * .03}px) rotate(-9deg) scale(1)`, opacity: 1, offset: .52 },
        { transform: `translate(${w * .22}px,${h * .33}px) rotate(-2deg) scale(.55)`, opacity: 1, offset: .83 },
        { transform: `translate(${w * .22}px,${h * .4}px) rotate(0deg) scale(.2)`, opacity: 0, offset: 1 },
      ], { duration: 2100, delay: 350, fill: 'backwards', easing: 'ease-in-out' }));
    }
    animate('[data-vecom-receipt]', [{ opacity: 0, transform: 'translateY(12px) scale(.85)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], 700, 2150);
  }
  if (project !== 'docfacil' && project !== 'vecom') {
    const reveal = (selector: string, delay: number) => animate(selector, [{opacity:0,translate:'0 18px'},{opacity:1,translate:'0 0'}],750,delay);
    const rock = (selector: string, delay: number, rotation = 4) => panel.querySelectorAll<HTMLElement>(selector).forEach(element => {
      const pose = getComputedStyle(element).transform;
      animations.push(element.animate([{transform:pose},{transform:`${pose} translateY(-12px) rotate(${rotation}deg)`},{transform:pose}],{duration:1800,delay,fill:'backwards',easing:'ease-in-out'}));
    });
    if (project === 'viodigital') {
      rock('[data-vio-document]',0,-3);
      animate('[data-vio-scan]',[{opacity:0,top:'20%'},{opacity:1,top:'25%',offset:.15},{opacity:1,top:'78%',offset:.85},{opacity:0,top:'80%'}],1600,200);
      panel.querySelectorAll<HTMLElement>('[data-vio-results]>div').forEach((element,index)=>{ animations.push(element.animate([{opacity:0,translate:'-22px 8px'},{opacity:1,translate:'0 0'}],{duration:650,delay:1000+index*200,fill:'backwards',easing:'cubic-bezier(.22,1,.36,1)'})); });
      reveal('[data-extra-receipt]',1750);
    } else if (project === 'atlas-notarial') {
      rock('[data-atlas-layer="document"]',0,-3);
      panel.querySelectorAll<HTMLElement>('[data-atlas-socket]').forEach((socket,index)=>{
        const element=socket.parentElement!;
        animations.push(element.animate([{translate:'0 18px',opacity:0},{translate:'0 0',opacity:1}],{duration:750,delay:450+index*380,fill:'backwards',easing:'cubic-bezier(.22,1,.36,1)'}));
      });
      reveal('[data-extra-receipt]',1900);
    } else {
      rock('[data-ckf-layer="site"]',0,-3);
      rock('[data-ckf-layer="system"]',700,3);
      animate('[data-quote-pdf]',[{opacity:0,transform:'translate(-70px,-35px) scale(.35) rotate(-12deg)'},{opacity:1,transform:'translate(0,-8px) scale(1) rotate(3deg)',offset:.72},{opacity:1,transform:'translate(0,0) scale(1) rotate(0deg)'}],1400,1200);
    }
  }
  return animations;
}
