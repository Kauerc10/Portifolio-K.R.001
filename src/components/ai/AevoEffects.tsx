'use client';

import { useEffect, useRef, useState } from 'react';

type EffectNotice = { title: string; detail: string } | null;
type AevoEffectDetail = { type?: string; target?: string; intensity?: string; projects?: unknown };

const EFFECT_DURATION = 4200;

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function AevoEffects() {
  const [notice, setNotice] = useState<EffectNotice>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const schedule = (callback: () => void, delay: number) => {
      const id = window.setTimeout(callback, delay);
      timers.current.push(id);
    };
    const announce = (title: string, detail: string, duration = 2600) => {
      setNotice({ title, detail });
      schedule(() => setNotice(null), duration);
    };
    const temporaryClass = (element: Element | null, className: string, duration = EFFECT_DURATION) => {
      if (!element) return;
      element.classList.remove(className);
      void (element as HTMLElement).offsetWidth;
      element.classList.add(className);
      schedule(() => element.classList.remove(className), reducedMotion ? 300 : duration);
    };
    const spotlightSkill = (target = '') => {
      const chips = [...document.querySelectorAll<HTMLElement>('.skills .chip')];
      const skill = chips.find(chip => normalize(chip.textContent || '').includes(normalize(target))) || chips[0];
      if (!skill) return;
      skill.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
      skill.dataset.aevoSpotlight = 'true';
      skill.closest('.skills')?.classList.add('aevo-skill-focus');
      announce('COMPETÊNCIA LOCALIZADA', skill.textContent || target);
      schedule(() => {
        delete skill.dataset.aevoSpotlight;
        skill.closest('.skills')?.classList.remove('aevo-skill-focus');
      }, EFFECT_DURATION);
    };
    const zeroGravity = () => {
      if (reducedMotion) return announce('GRAVIDADE SIMULADA', 'Movimento reduzido está ativo. Nada saiu voando — por segurança cósmica.');
      const source = [...document.querySelectorAll<HTMLElement>('.skills .chip')].slice(0, 14);
      const layer = document.createElement('div');
      layer.className = 'aevo-zero-gravity-layer';
      layer.setAttribute('aria-hidden', 'true');
      source.forEach((item, index) => {
        const clone = item.cloneNode(true) as HTMLElement;
        const rect = item.getBoundingClientRect();
        clone.style.setProperty('--aevo-x', `${rect.left}px`);
        clone.style.setProperty('--aevo-y', `${rect.top}px`);
        clone.style.setProperty('--aevo-dx', `${(index % 2 ? -1 : 1) * (60 + (index * 37) % 240)}px`);
        clone.style.setProperty('--aevo-dy', `${-80 - (index * 53) % 260}px`);
        clone.style.setProperty('--aevo-rot', `${(index % 2 ? -1 : 1) * (90 + index * 17)}deg`);
        layer.appendChild(clone);
      });
      document.body.appendChild(layer);
      announce('GRAVIDADE: OFFLINE', 'As habilidades pediram alguns segundos de folga.');
      schedule(() => layer.classList.add('aevo-zero-gravity-return'), 4300);
      schedule(() => layer.remove(), 5600);
    };
    const seal = (target = 'projetos') => {
      const element = document.getElementById(target) || document.getElementById(`project-${target}`);
      if (!element) return;
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
      const stamp = document.createElement('div');
      stamp.className = 'aevo-auth-seal';
      stamp.textContent = 'EVIDÊNCIA AUTENTICADA';
      stamp.setAttribute('aria-hidden', 'true');
      document.body.appendChild(stamp);
      schedule(() => stamp.classList.add('aevo-auth-seal--return'), 2200);
      schedule(() => stamp.remove(), 3000);
    };
    const diagnostics = () => {
      announce('ÆVO DIAGNOSTICS', 'RAG ONLINE · TOOL USE NATIVE · EVIDÊNCIAS VERIFICADAS', 3900);
      temporaryClass(document.documentElement, 'aevo-diagnostics-active', 4000);
    };
    const handleEffect = (event: Event) => {
      const detail = (event as CustomEvent<AevoEffectDetail>).detail || {};
      switch (detail.type) {
        case 'spotlight-skill': spotlightSkill(detail.target); break;
        case 'zero-gravity': zeroGravity(); break;
        case 'seal': seal(detail.target); break;
        case 'explode':
          temporaryClass(document.getElementById('heroCanvas'), 'aevo-core-explode', 3000);
          announce('NÚCLEO DESCOMPACTADO', 'Calma. A reconstrução automática já foi protocolada.');
          break;
        case 'gravity':
          temporaryClass(document.getElementById('heroCanvas'), 'aevo-gravity-well', 5200);
          temporaryClass(document.documentElement, 'aevo-gravity-active', 5200);
          announce('CAMPO GRAVITACIONAL ATIVO', 'Mova o cursor. Não nos responsabilizamos por satélites curiosos.');
          break;
        case 'breach':
          temporaryClass(document.documentElement, 'aevo-screen-breach', 2200);
          announce('OVERRIDE ACEITO', 'Interface recompilada. Nenhum pixel foi ferido.');
          break;
        case 'energy':
          temporaryClass(document.documentElement, 'aevo-energy-active', 3600);
          announce('AUDITORIA VISUAL', 'Autenticando evidências do portfólio…');
          break;
        case 'diagnostics': diagnostics(); break;
        case 'rag-demo':
          spotlightSkill('RAG');
          announce('RAG EM EXECUÇÃO', 'Esta resposta recuperou contexto do próprio portfólio antes de chegar até você.', 4200);
          break;
        case 'trace-evidence': {
          spotlightSkill(detail.target);
          const projects = Array.isArray(detail.projects) ? detail.projects.filter((item): item is string => typeof item === 'string') : [];
          schedule(() => {
            document.getElementById('projetos')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
            projects.forEach(project => temporaryClass(document.getElementById(`project-${project}`), 'aevo-evidence-traced', 3600));
            announce('TRILHA DE EVIDÊNCIAS', `${projects.length} aplicação(ões) verificável(is) localizada(s).`);
          }, reducedMotion ? 100 : 1700);
          break;
        }
        case 'medals':
          document.getElementById('conquistas')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
          document.querySelectorAll('.obmep-card').forEach((card, index) => schedule(() => temporaryClass(card, 'aevo-medal-resonance', 3000), index * 160));
          announce('RESSONÂNCIA OBMEP', 'Prata, bronze e menções honrosas em formação sincronizada.');
          break;
      }
    };

    window.addEventListener('aevoEffect', handleEffect);
    return () => {
      window.removeEventListener('aevoEffect', handleEffect);
      timers.current.forEach(window.clearTimeout);
      document.querySelectorAll('.aevo-zero-gravity-layer, .aevo-auth-seal').forEach(element => element.remove());
    };
  }, []);

  return (
    <div className={`aevo-effect-notice ${notice ? 'aevo-effect-notice--visible' : ''}`} role="status" aria-live="polite">
      {notice && <><strong>{notice.title}</strong><span>{notice.detail}</span></>}
    </div>
  );
}
