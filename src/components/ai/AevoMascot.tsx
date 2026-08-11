import { useId } from 'react';

type AevoMascotProps = {
  className?: string;
  decorative?: boolean;
};

/**
 * ÆVO's visual signature: an angular notarial sentinel with an AI visor.
 * The silhouette stays recognizable at 16px; internal detail scales at larger sizes.
 */
export default function AevoMascot({ className = 'h-8 w-8', decorative = false }: AevoMascotProps) {
  const titleId = useId();

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : titleId}
    >
      {!decorative && <title id={titleId}>Mascote ÆVO</title>}

      {/* One strong silhouette: part notarial seal, part machine sentinel. */}
      <path
        d="M32 4 49 12 57 28 53 47 40 59H24L11 47 7 28l8-16L32 4Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Crown/antenna keeps the character identifiable when rendered small. */}
      <path d="M32 4V1M27 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="2" r="2" fill="#3b82f6" />

      {/* Visor is shaped as a subtle Æ monogram rather than a generic robot face. */}
      <path
        d="M16 24 25 18h14l9 6-2 15-8 7H26l-8-7-2-15Z"
        fill="#08101f"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M22 32h20M27 24l-5 15M27 24l6 15M25 34h7M33 24h9M33 31h7M33 39h9" stroke="#60a5fa" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />

      {/* Two signal nodes give the mascot life without using a literal smiley face. */}
      <circle cx="20" cy="29" r="1.75" fill="currentColor" />
      <circle cx="44" cy="29" r="1.75" fill="currentColor" />
      <path d="m27 51 5 3 5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Sparse circuit terminals preserve clarity and avoid decorative noise. */}
      <path d="M10 34H3m51 0h7M14 47l-5 5m41-5 5 5" stroke="#3b82f6" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="2" cy="34" r="1.5" fill="#3b82f6" />
      <circle cx="62" cy="34" r="1.5" fill="#3b82f6" />
    </svg>
  );
}
