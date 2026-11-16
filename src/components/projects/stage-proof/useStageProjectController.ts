'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import type { Locale } from '@/i18n/config';
import { restoreCaseReturnPosition } from '../case-return-position';
import { playStageEntrance } from './stage-entrance';
import type { StageProject, StageProjectSlug } from './stage-projects';

type Engine = (direction: number) => void;

export function useStageProjectController({
  root,
  locale,
  embedded,
  projects,
}: {
  root: RefObject<HTMLDivElement | null>;
  locale: Locale;
  embedded: boolean;
  projects: readonly StageProject[];
}) {
  const engine = useRef<Engine | null>(null);
  const [active, setActive] = useState<StageProjectSlug>(projects[0].slug);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const panels = Array.from(el.querySelectorAll<HTMLElement>('[data-panel]'));
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? { matches: true, addEventListener() {}, removeEventListener() {} };
    const canAnimate = typeof el.animate === 'function';
    let current = 0, generation = 0, visible = !embedded;
    let animations: Animation[] = []; let story: Animation[] = []; let storyRun = 0; let storyFrozen = false; let prepared: Animation[] = [];
    const identity = 'translate3d(0px,0px,0px) rotate(0deg) scale(1)';
    const layers = panels.map(panel => Array.from(panel.querySelectorAll<HTMLElement>('[data-layer]')));
    const settle = () => {
      generation++;
      animations.forEach(animation => animation.cancel()); animations = [];
      layers.forEach((items, index) => items.forEach(item => {
        item.style.transform = identity; item.style.opacity = index === current ? '1' : '0';
        item.style.willChange = 'auto';
      }));
      el.dataset.motion = 'rest';
    };
    const syncVisibility = () => [...animations, ...(storyFrozen ? [] : story)].forEach(animation => {
      if (!visible || document.hidden) animation.pause();
      else if (animation.playState === 'paused') animation.play();
    });
    const present = () => {
      storyFrozen = false;
      story.forEach(animation => animation.cancel()); story = [];
      const run = ++storyRun;
      if (reduced.matches || !canAnimate) return;
      el.dataset.motion = 'presenting';
      const project = projects[current];
      story = prepared.length ? prepared : playStageEntrance(panels[current], project.story); prepared = []; story.forEach(animation => animation.play());
      syncVisibility();
      void Promise.all(story.map(animation => animation.finished.catch(() => undefined))).then(() => {
        if (run !== storyRun) return;
        story.forEach(animation => animation.cancel()); story = [];
        el.dataset.motion = 'rest';
      });
    };
    engine.current = direction => {
      storyRun++; storyFrozen = true;
      story.forEach(animation => animation.pause());
      const interrupted = el.dataset.motion === 'moving';
      const next = (current + direction + panels.length) % panels.length;
      const snapshots = layers.map(items => items.map(item => {
        const style = getComputedStyle(item);
        return { transform: style.transform, opacity: style.opacity };
      }));
      animations.forEach(animation => animation.cancel()); animations = [];
      current = next; setActive(projects[next].slug);
      if (embedded) {
        try { sessionStorage.setItem('ruon:stage-project', projects[next].slug); } catch {}
        history.replaceState(history.state, '', '#project-' + projects[next].slug);
      }
      el.dataset.active = projects[next].slug;
      el.dataset.direction = direction > 0 ? 'next' : 'previous';
      panels.forEach((panel, i) => { panel.inert = i !== next; });
      prepared.forEach(animation => animation.cancel()); prepared = [];
      if (!reduced.matches && canAnimate) {
        prepared = playStageEntrance(panels[next], projects[next].story);
        prepared.forEach(animation => { animation.pause(); animation.currentTime = 0; });
      }
      const run = ++generation;
      if (reduced.matches || !canAnimate) { settle(); return; }
      el.dataset.motion = 'moving';
      const width = el.clientWidth;
      layers.forEach((items, panelIndex) => items.forEach((item, index) => {
        const incoming = panelIndex === next;
        if (!incoming && snapshots[panelIndex].every(pose => Number(pose.opacity) < .001)) return;
        const depth = Number(item.dataset.layer);
        const scene = item.closest<HTMLElement>('[data-stage-canvas]');
        const scale = scene ? scene.getBoundingClientRect().width / scene.offsetWidth : 1;
        const distance = width * (1.18 + depth * .12) / Math.max(scale, .1);
        const offstage = (sign: number) => `translate3d(${sign * distance}px,${depth > 1 ? 22 : 0}px,0px) rotate(${sign * (depth > 1 ? 9 : 0)}deg) scale(${depth > 1 ? .92 : .98})`;
        const start = incoming && !interrupted ? { transform: offstage(direction), opacity: '1' } : snapshots[panelIndex][index];
        const end = { transform: incoming ? identity : offstage(-direction), opacity: '1' };
        item.style.transform = end.transform; item.style.opacity = end.opacity; item.style.willChange = 'transform, opacity';
        const artwork = depth > 1;
        const duration = interrupted ? 850 : incoming ? (artwork ? 1350 : 950) : (artwork ? 900 : 820);
        const animation = item.animate([start, end], {
          duration, delay: interrupted ? 0 : incoming ? (artwork ? 60 + Math.max(0, index - 5) * 24 : 310 + index * 24) : index * 8,
          easing: incoming ? 'cubic-bezier(.16,1,.3,1)' : 'cubic-bezier(.4,0,.2,1)', fill: 'both',
        });
        animations.push(animation);
      }));
      syncVisibility();
      void Promise.all(animations.map(animation => animation.finished.catch(() => undefined))).then(() => {
        if (run === generation) { settle(); present(); }
      });
    };
    el.dataset.interactive = 'true';
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncVisibility(); });
    if (observer) observer.observe(el); else visible = true;
    const preference = () => { if (reduced.matches) { storyRun++; [...story, ...prepared].forEach(animation => animation.cancel()); story = []; prepared = []; settle(); } };
    reduced.addEventListener('change', preference);
    document.addEventListener('visibilitychange', syncVisibility);
    let restoreFrame = 0;
    const alias: Record<string,string> = {'project-atlas':'atlas-notarial','project-docfacil-legacy':'docfacil','project-ckf-legacy':'ckf'};
    const restore = () => {
      if (!embedded) return;
      cancelAnimationFrame(restoreFrame);
      const hash = location.hash.slice(1);
      let slug = alias[hash] || (hash.startsWith('project-') ? hash.slice(8) : '');
      if (!slug) try { slug = sessionStorage.getItem('ruon:stage-project') || ''; } catch {}
      const index = projects.findIndex(project => project.slug === slug);
      if (index >= 0 && index !== current) {
        storyRun++; [...story,...prepared].forEach(animation=>animation.cancel()); story=[]; prepared=[];
        current=index; setActive(projects[index].slug); el.dataset.active=projects[index].slug;
        panels.forEach((panel,i)=>{panel.inert=i!==index;}); settle(); present();
      }
      restoreFrame=requestAnimationFrame(()=>{restoreFrame=requestAnimationFrame(()=>{
        restoreCaseReturnPosition({locale,caseSlug:projects[current].slug,homePath:`/${locale}`},{focus:()=>panels[current].querySelector<HTMLElement>('h3')?.focus({preventScroll:true})});
      });});
    };
    restore(); present();
    if(embedded){addEventListener('hashchange',restore);addEventListener('pageshow',restore);}
    return () => {
      cancelAnimationFrame(restoreFrame); removeEventListener('hashchange',restore); removeEventListener('pageshow',restore);
      generation++; storyRun++; [...animations, ...story, ...prepared].forEach(animation => animation.cancel()); observer?.disconnect();
      reduced.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', syncVisibility); engine.current = null;
    };
  }, [embedded, locale, projects, root]);

  return { active, engine };
}

