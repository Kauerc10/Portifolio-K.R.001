'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
          bar.style.transform = `scaleX(${pct})`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyanNeon to-goldAccent z-50 origin-left transform scale-x-0 transition-transform duration-75"
    />
  );
}
