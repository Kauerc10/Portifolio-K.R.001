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
    if (kind === 'skills') {
      root.querySelectorAll<HTMLElement>('.editorial-skill-row').forEach(row => {
        row.querySelectorAll<HTMLAnchorElement>('.editorial-skill-row__links a').forEach(link => {
          const enter = () => row.classList.add('is-motion-linked');
          const leave = () => row.classList.remove('is-motion-linked');
          link.addEventListener('pointerenter', enter); link.addEventListener('focus', enter);
          link.addEventListener('pointerleave', leave); link.addEventListener('blur', leave);
          cleanups.push(() => { link.removeEventListener('pointerenter', enter); link.removeEventListener('focus', enter); link.removeEventListener('pointerleave', leave); link.removeEventListener('blur', leave); });
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
