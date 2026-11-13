import type { CSSProperties } from 'react';
import styles from './Vecom.module.css';

type VecomCompositionProps = {
  label?: string;
  progress?: string;
};

/** Shared visual object for the home preview and the case hero. */
export default function VecomComposition({ label = 'VECOM Ficha Fácil', progress = '0' }: VecomCompositionProps) {
  return (
    <div className={styles.art} data-vecom-art aria-label={label} style={progress === undefined ? undefined : { '--vecom-progress': progress } as CSSProperties}>
      <div className={styles.folder} data-vecom-layer="folder" />
      <div className={styles.cards} aria-hidden="true" />
      <div className={styles.laptop}>
        <img className={styles.desktopInterface} src="/assets/projects/vecom/interface-desktop-device.png" alt="" />
      </div>
      <div className={styles.phone}>
        <img className={styles.mobileInterface} src="/assets/projects/vecom/interface-mobile-device.png" alt="" />
      </div>
      <div className={styles.plinth} aria-hidden="true" />
    </div>
  );
}
