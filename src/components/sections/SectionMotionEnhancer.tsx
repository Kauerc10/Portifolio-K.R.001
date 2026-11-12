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
    const reveal = (element: Element | null, keyframes: Keyframe[], options: KeyframeAnimationOptions = {}) => {
      if (!element) return;
      cleanups.push(scope.onEnter(element, () => { scope.animate(element, keyframes, { duration: 650, ...options }); }));
    };
    if (kind === 'sobre') {
      reveal(root.querySelector('[data-motion-art]'), [{ clipPath: 'inset(0 100% 0 0 round 10rem)' }, { clipPath: 'inset(0 0% 0 0 round 10rem)' }], { duration: 850 });
      root.querySelectorAll('[data-motion-pillar-accent]').forEach((accent, index) => reveal(accent, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 420, delay: index * 80 }));
    }
    if (kind === 'experiencia') {
      root.querySelectorAll<HTMLElement>('[data-motion-experience-item]').forEach((item, index) => {
        reveal(item.querySelector('[data-motion-segment]'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 450 });
        reveal(item.querySelector('[data-motion-dot]'), [{ transform: 'scale(.55)', opacity: .55 }, { transform: 'scale(1)', opacity: 1 }], { duration: 260, delay: 470 });
        reveal(item.querySelector('[data-motion-period]'), [{ backgroundColor: 'transparent' }, { backgroundColor: 'color-mix(in srgb, var(--editorial-violet) 16%, transparent)' }], { duration: 300, delay: 540 });
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
      root.querySelectorAll('[data-motion-skill-rule]').forEach((rule, index) => reveal(rule, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 420, delay: index * 70 }));
    }
    if (kind === 'conquistas') root.querySelectorAll('[data-motion-medal-sweep]').forEach((sweep, index) => reveal(sweep, [{ transform: 'translateX(-110%)' }, { transform: 'translateX(110%)' }], { duration: 850, delay: index * 110 }));
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
