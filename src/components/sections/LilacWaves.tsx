import './LilacWaves.css';
/** Lightweight decorative planes shared by the editorial sections as they adopt this direction. */
export default function LilacWaves() {
  return (
    <div className="lilac-waves" aria-hidden="true">
      <svg className="lilac-waves__plane lilac-waves__plane--far" data-motion-wave="far" viewBox="0 0 1600 1000" preserveAspectRatio="none" focusable="false">
        <path d="M-160 640C80 590 110 805 340 825S660 980 950 1080H-160Z" />
        <path d="M1050-100C1190 280 1390 280 1760 65V-100Z" />
      </svg>
      <svg className="lilac-waves__plane lilac-waves__plane--near" data-motion-wave="near" viewBox="0 0 1600 1000" preserveAspectRatio="none" focusable="false">
        <path d="M-160 730C70 690 140 895 410 920S700 1080 1050 1160H-160Z" />
        <path d="M1230-120C1350 190 1510 240 1760 45V-120Z" />
      </svg>
    </div>
  );
}
