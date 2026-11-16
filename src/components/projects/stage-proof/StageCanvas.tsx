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
      const parent = element.parentElement!;
      element.style.setProperty('--stage-fit', String(Math.min(parent.clientWidth / 660, parent.clientHeight / 590)));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element.parentElement!);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className={styles.canvas} data-stage-canvas>{children}</div>;
}
