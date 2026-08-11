'use client';

import { useEffect } from 'react';

let lastPointerX = -100;
let lastPointerY = -100;

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const dot = cursor?.querySelector('.cursor__dot') as HTMLElement;
    const ring = cursor?.querySelector('.cursor__ring') as HTMLElement;
    const label = document.getElementById('cursorLabel');

    if (!cursor || !dot || !ring) return;

    let mouseX = lastPointerX;
    let mouseY = lastPointerY;
    let ringX = lastPointerX;
    let ringY = lastPointerY;

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastPointerX = mouseX;
      lastPointerY = mouseY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Checar se o elemento sob o mouse é magnético
      const target = e.target as HTMLElement;
      const magneticEl = target.closest('[data-cursor]') as HTMLElement;

      if (magneticEl) {
        const text = magneticEl.getAttribute('data-cursor');
        if (label && text) {
          label.textContent = text;
          cursor.classList.add('has-label');
        }
      } else {
        if (label) label.textContent = '';
        cursor.classList.remove('has-label');
      }
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="cursor" id="cursor">
      <div className="cursor__dot" />
      <div className="cursor__ring" />
      <span className="cursor__label" id="cursorLabel" />
    </div>
  );
}
