'use client';

import { useRef, useState } from 'react';
import styles from './VioDigital.module.css';

export type CaseGalleryItem = { id: string; src: string; alt: string; caption: string; width: number; height: number; className: string };

export default function CaseGallery({ items, enlarge, close, naming, mediaUnavailable = 'A imagem está indisponível no momento.', openOriginal = 'Abrir captura original' }: { items: readonly CaseGalleryItem[]; enlarge: string; close: string; naming: string; mediaUnavailable?: string; openOriginal?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState(items[0]);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  return <>
    <div className={styles.galleryGrid}>
      {items.map((item) => <figure key={item.id} className={item.className}>
        <button type="button" aria-label={`${enlarge}: ${item.caption}`} onClick={(event) => {
          trigger.current = event.currentTarget;
          setSelected(item);
          dialog.current?.showModal();
        }}>{failed[item.id] ? <span role="img" aria-label={item.alt} className={styles.mediaFallback}>{mediaUnavailable}</span> : <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" onError={() => setFailed((current) => ({ ...current, [item.id]: true }))} />}<span className={styles.zoomLabel}>{enlarge} ↗</span></button>
        <figcaption>{item.caption}</figcaption>
        {failed[item.id] && <a href={item.src} target="_blank" rel="noopener noreferrer">{openOriginal}</a>}
        <noscript><a href={item.src}>{openOriginal}: {item.caption}</a></noscript>
      </figure>)}
    </div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={enlarge} onClose={() => trigger.current?.focus()} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className={styles.lightboxToolbar}><span>{naming}</span><button type="button" autoFocus onClick={() => dialog.current?.close()}>{close} ×</button></div>
      {failed[selected.id] ? <p className={styles.mediaFallback}>{mediaUnavailable} <a href={selected.src} target="_blank" rel="noopener noreferrer">{openOriginal}</a></p> : <img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} onError={() => setFailed((current) => ({ ...current, [selected.id]: true }))} />}
    </dialog>
  </>;
}
