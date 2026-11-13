'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './Vecom.module.css';

function PreparedImage({ src, className, width, height }: { src: string; className: string; width: number; height: number }) {
  const image = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (image.current?.complete && !image.current.naturalWidth) setFailed(true);
  }, []);
  return failed ? null : <img ref={image} src={src} className={className} alt="" width={width} height={height} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

export function VecomBrand() {
  return <PreparedImage src="/assets/projects/vecom/logo-ficha-facil.png" className={styles.brand} width={220} height={80} />;
}

/** The prepared screens are still images; folder and devices are decorative layers. */
export default function VecomComposition({ label, progress }: { label: string; progress?: number }) {
  const style = progress === undefined ? undefined : { '--vecom-progress': progress } as CSSProperties;
  return <div className={styles.art} data-vecom-art role="img" aria-label={label} style={style}>
    <div className={styles.folder} data-vecom-layer="folder" />
    <div className={styles.cards} aria-hidden="true"><i /><i /><i /></div>
    <div className={styles.laptop}>
      <PreparedImage className={styles.desktopInterface} src="/assets/projects/vecom/interface-desktop-device.png" width={1440} height={1000} />
    </div>
    <div className={styles.phone}>
      <PreparedImage className={styles.mobileInterface} src="/assets/projects/vecom/interface-mobile-device.png" width={390} height={844} />
    </div>
    <div className={styles.plinth} aria-hidden="true" />
  </div>;
}
