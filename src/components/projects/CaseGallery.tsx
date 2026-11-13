'use client';

import { useRef, useState } from 'react';
import styles from './VioDigital.module.css';

export type CaseGalleryItem = { id: string; src: string; alt: string; caption: string; width: number; height: number; className: string };

export default function CaseGallery({ items, enlarge, close, naming }: { items: readonly CaseGalleryItem[]; enlarge: string; close: string; naming: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState(items[0]);
  return <>
    <div className={styles.galleryGrid}>
      {items.map((item) => <figure key={item.id} className={item.className}>
        <button type="button" aria-label={`${enlarge}: ${item.caption}`} onClick={(event) => {
          trigger.current = event.currentTarget;
          setSelected(item);
          dialog.current?.showModal();
        }}><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" /><span className={styles.zoomLabel}>{enlarge} ↗</span></button>
        <figcaption>{item.caption}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={enlarge} onClose={() => trigger.current?.focus()} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className={styles.lightboxToolbar}><span>{naming}</span><button type="button" autoFocus onClick={() => dialog.current?.close()}>{close} ×</button></div>
      <img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} />
    </dialog>
  </>;
}
