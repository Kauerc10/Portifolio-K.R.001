'use client';

import { useEffect, type RefObject } from 'react';
import type { Locale } from '@/i18n/config';
import type { CaseDefinition } from './case-model';
import { restoreCaseReturnPosition } from './case-return-position';

/** Scroll owns the scene; offscreen and hidden previews do no animation work. */
export function useProjectPreview(root: RefObject<HTMLElement | null>, locale: Locale, project: CaseDefinition, property: string, title: string) {
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const showcase = element.closest('[data-project-reading]');
    let frame = 0;
    let restoreFrame = 0;
    let near = true;
    let disposed = false;
    const update = () => {
      frame = 0;
      if (disposed || document.hidden || !near) return;
      const travel = element.offsetHeight - innerHeight + 80;
      const staticMode = reduced?.matches || showcase?.getAttribute('data-project-reading') === 'quick' || innerHeight <= 700 || travel <= 0;
      const progress = staticMode ? 1 : Math.max(0, Math.min(1, (80 - element.getBoundingClientRect().top) / travel));
      element.style.setProperty(property, String(progress));
      element.dataset.previewMotion = staticMode ? 'static' : 'scroll';
      if (project.slug === 'viodigital') element.dataset.vioStage = progress < .25 ? 'document' : progress < .65 ? 'reading' : 'data';
      if (project.slug === 'ckf') element.dataset.ckfFocus = progress < .5 ? 'site' : 'system';
    };
    const schedule = () => { if (!frame && near && !document.hidden) frame = requestAnimationFrame(update); };
    const restore = () => {
      cancelAnimationFrame(restoreFrame);
      if (location.hash && location.hash !== `#project-${project.slug}`) return;
      // Let the persisted reading mode settle before consuming the return record.
      // Otherwise browser scroll anchoring can adjust the restored position again.
      restoreFrame = requestAnimationFrame(() => { restoreFrame = requestAnimationFrame(() => {
        restoreCaseReturnPosition({ locale, caseSlug: project.slug, homePath: project.homePath(locale) }, {
          scrollTo: position => scrollTo(position),
          focus: () => element.querySelector<HTMLElement>(`#${title}`)?.focus({ preventScroll: true }),
        });
        schedule();
      }); });
    };
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else schedule(); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      near = entries[0].isIntersecting;
      if (!near) { cancelAnimationFrame(frame); frame = 0; } else schedule();
    }, { rootMargin: '100% 0px' });
    observer?.observe(element);
    const mode = typeof MutationObserver === 'undefined' ? null : new MutationObserver(() => {
      // Update static state even for a preview outside the observation margin.
      const wasNear = near; near = true; update(); near = wasNear;
    });
    if (showcase) mode?.observe(showcase, { attributes: true, attributeFilter: ['data-project-reading'] });
    update(); restore();
    addEventListener('pageshow', restore);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', visibility);
    reduced?.addEventListener('change', schedule);
    return () => {
      disposed = true; cancelAnimationFrame(frame); cancelAnimationFrame(restoreFrame);
      observer?.disconnect(); mode?.disconnect();
      removeEventListener('pageshow', restore); removeEventListener('scroll', schedule); removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', visibility); reduced?.removeEventListener('change', schedule);
    };
  }, [root, locale, project, property, title]);
}
