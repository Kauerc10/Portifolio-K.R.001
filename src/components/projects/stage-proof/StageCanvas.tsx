'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import styles from './StageProof.module.css';

/** Fit the complete composition; animation transforms belong to its children. */
export default function StageCanvas({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = host.current;
    if (!element) return;
    const fit = () => {
      const parent = element.parentElement;
      if (!parent) return;
      const fitRatio = Math.min((parent.clientWidth || 660) / 660, (parent.clientHeight || 590) / 590);
      element.style.setProperty('--stage-fit', String(fitRatio > 0 ? fitRatio : 1));
    };
    fit();
    if (typeof ResizeObserver === 'undefined') return;
    const parent = element.parentElement;
    if (!parent) return;
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className={styles.canvas} data-stage-canvas>{children}</div>;
}
