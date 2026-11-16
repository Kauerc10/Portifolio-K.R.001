'use client';

import { useEffect } from 'react';
import { createMotionScope } from '@/lib/section-motion';

type Props = { sectionId: string; kind: 'sobre' | 'experiencia' | 'skills' | 'formacao' | 'conquistas' };

export default function SectionMotionEnhancer({ sectionId, kind }: Props) {
  useEffect(() => {
    const root = document.getElementById(sectionId);
    if (!root) return;
    const scope = createMotionScope(root);
    const cleanups: Array<() => void> = [];
    const reveal = (element: Element | null, keyframes: Keyframe[], options: { anchor?: Element; from?: number; to?: number } = {}) => {
      cleanups.push(scope.scrub(element, keyframes, options));
    };
    if (kind === 'sobre') {
      reveal(root.querySelector('[data-motion-art]'), [{ clipPath: 'inset(0 100% 0 0 round 10rem)' }, { clipPath: 'inset(0 0% 0 0 round 0)' }]);
      root.querySelectorAll('[data-motion-pillar-accent]').forEach(accent => reveal(accent, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }]));
    }
    if (kind === 'experiencia') {
      root.querySelectorAll<HTMLElement>('[data-motion-experience-item]').forEach((item) => {
        reveal(item.querySelector('[data-motion-segment]'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { anchor: item, to: .55 });
        reveal(item.querySelector('[data-motion-dot]'), [{ transform: 'scale(.55)', opacity: .55 }, { transform: 'scale(1)', opacity: 1 }], { anchor: item, from: .35, to: .75 });
        reveal(item.querySelector('[data-motion-period]'), [{ backgroundColor: 'transparent' }, { backgroundColor: 'color-mix(in srgb, var(--editorial-violet) 16%, transparent)', offset: .5 }, { backgroundColor: 'transparent' }], { anchor: item, from: .55 });
      });
    }
    const mobile = window.matchMedia?.('(max-width: 600px)')?.matches ?? false;
    root.querySelectorAll<SVGElement>('[data-motion-wave]').forEach(plane => {
      const near = plane.dataset.motionWave === 'near';
      const offset = (near ? 4 : -2.5) * (mobile ? .4 : 1);
      cleanups.push(scope.scrub(plane, [
        { transform: `translate3d(${offset}%, ${near ? 5 : -3}%, 0) rotate(${near ? -2 : 1}deg)` },
        { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
      ], { anchor: root, travel: 'section' }));
    });

    if (kind === 'skills') {
      root.querySelectorAll<HTMLElement>('.editorial-skill-row').forEach((row, index) => {
        // One local composition per group; text itself stays sharp and in place.
        scope.onEnter(row, () => {
          scope.animate(row.querySelector('.editorial-skill-row__icon-plate'), [
            { transform: 'translateY(10px) scale(.92)', backgroundColor: 'transparent' },
            { transform: 'translateY(0) scale(1)' },
          ], { duration: 480, delay: index * 70 });
          scope.animate(row.querySelector('.editorial-skill-row__chips'), [
            { transform: `translateX(${mobile ? 4 : 12}px)`, opacity: .65 },
            { transform: 'translateX(0)', opacity: 1 },
          ], { duration: 560, delay: index * 70 + 60 });
        });

      });
      root.querySelectorAll('[data-motion-skill-rule]').forEach(rule => reveal(rule, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }]));
    }
    if (kind === 'conquistas') root.querySelectorAll('[data-motion-medal-sweep]').forEach(sweep => reveal(sweep, [{ transform: 'translateX(-110%)' }, { transform: 'translateX(110%)' }]));
    if (kind === 'formacao') {
      root.querySelectorAll<HTMLDetailsElement>('details.formacao-editorial__more').forEach(details => {
        // The native details-content transition in refinement-micro.css owns the
        // intrinsic height. Keep this scope aware of toggles so any other local
        // sequence is cancelled, without competing max-height animations.
        const toggle = () => { if (details.open) scope.cancel(); };
        details.addEventListener('toggle', toggle);
        cleanups.push(() => details.removeEventListener('toggle', toggle));
      });
    }
    return () => { cleanups.forEach(cleanup => cleanup()); scope.dispose(); };
  }, [kind, sectionId]);
  return null;
}
