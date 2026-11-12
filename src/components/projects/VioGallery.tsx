'use client';

import { useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import { vioCopy } from './viodigital-copy';
import styles from './VioDigital.module.css';

export default function VioGallery({ locale }: { locale: Locale }) {
  const copy = vioCopy(locale);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [image, setImage] = useState<'desktop' | 'mobile'>('desktop');
  const sources = { desktop: '/assets/projects/viodigital/interface-desktop.png', mobile: '/assets/projects/viodigital/interface-mobile.png' };
  return <>
    <div className={styles.galleryGrid}>
      {(['desktop', 'mobile'] as const).map((kind) => <figure key={kind} className={kind === 'desktop' ? styles.desktopShot : styles.mobileShot}>
        <button type="button" aria-label={`${copy.enlarge}: ${kind === 'desktop' ? copy.desktopCaption : copy.mobileCaption}`} onClick={event => {
          trigger.current = event.currentTarget;
          setImage(kind);
          dialog.current?.showModal();
        }}><img src={sources[kind]} alt={kind === 'desktop' ? copy.screenAlt : copy.mobileAlt} width={kind === 'desktop' ? 1440 : 390} height={kind === 'desktop' ? 1000 : 844} loading="lazy" /><span className={styles.zoomLabel}>{copy.enlarge} ↗</span></button>
        <figcaption>{kind === 'desktop' ? copy.desktopCaption : copy.mobileCaption}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={copy.enlarge} onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className={styles.lightboxToolbar}><span>{copy.naming}</span><button type="button" autoFocus onClick={() => dialog.current?.close()}>{copy.close} ×</button></div>
      <img src={sources[image]} alt={image === 'desktop' ? copy.screenAlt : copy.mobileAlt} width={image === 'desktop' ? 1440 : 390} height={image === 'desktop' ? 1000 : 844} />
    </dialog>
  </>;
}
