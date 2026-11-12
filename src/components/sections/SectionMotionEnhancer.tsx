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
      reveal(root.querySelector('[data-motion-pillars]'), [{ opacity: .72, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 520 });
    }
    if (kind === 'experiencia') {
      root.querySelectorAll<HTMLElement>('[data-motion-experience-item]').forEach((item, index) => {
        reveal(item.querySelector('[data-motion-dot]'), [{ transform: 'scale(.55)', opacity: .55 }, { transform: 'scale(1)', opacity: 1 }], { duration: 460, delay: index * 100 });
        reveal(item.querySelector('[data-motion-period]'), [{ opacity: .45, transform: 'translateX(-8px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 430, delay: 120 + index * 100 });
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
      root.querySelectorAll('[data-motion-skill-row]').forEach((row, index) => reveal(row, [{ opacity: .72, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 500, delay: index * 70 }));
    }
    if (kind === 'conquistas') root.querySelectorAll('[data-motion-medal]').forEach((medal, index) => reveal(medal, [{ filter: 'brightness(.96)', transform: 'scale(.97)' }, { filter: 'brightness(1.08)', transform: 'scale(1.015)', offset: .72 }, { filter: 'brightness(1)', transform: 'scale(1)' }], { duration: 900, delay: index * 110 }));
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
