'use client';

import type { Locale } from '@/i18n/config';
import { vioCopy } from './viodigital-copy';
import CaseGallery from './CaseGallery';
import styles from './VioDigital.module.css';

export default function VioGallery({ locale }: { locale: Locale }) {
  const copy = vioCopy(locale);
  return <CaseGallery enlarge={copy.enlarge} close={copy.close} naming={copy.naming} items={[
    { id: 'desktop', src: '/assets/projects/viodigital/interface-desktop.png', alt: copy.screenAlt, caption: copy.desktopCaption, width: 1440, height: 1000, className: styles.desktopShot },
    { id: 'mobile', src: '/assets/projects/viodigital/interface-mobile.png', alt: copy.mobileAlt, caption: copy.mobileCaption, width: 390, height: 844, className: styles.mobileShot },
  ]} />;
}
