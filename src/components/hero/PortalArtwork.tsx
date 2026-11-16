'use client';
import type { ReactNode } from 'react';
export default function PortalArtwork({children}:{children?:ReactNode}) {
  return <div className="portal-artwork">
    <div className="portal-artwork-plane">
      <picture>
        <source type="image/avif" srcSet="/images/portals/portals-640.avif 640w, /images/portals/portals-1024.avif 1024w, /images/portals/portals-1672.avif 1672w" sizes="100vw" />
        <source type="image/webp" srcSet="/images/portals/portals-640.webp 640w, /images/portals/portals-1024.webp 1024w, /images/portals/portals-1672.webp 1672w" sizes="100vw" />
        {/* Decorative artwork: all destinations and information also exist in HTML. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/portals/portals-1672.webp" alt="" width={1672} height={941} fetchPriority="high" decoding="async" />
      </picture>
      {children}
    </div>
  </div>;
}
