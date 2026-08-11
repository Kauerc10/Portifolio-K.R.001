import type { Dictionary } from '@/i18n/types';

export default function Footer({ dict: d }: { dict: Dictionary['footer'] }) {

  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="mailto:kaue.ruon@gmail.com" className="footer__link">Email</a>
        <a href="https://www.linkedin.com/in/kauerc/" target="_blank" rel="noopener noreferrer" className="footer__link">LinkedIn</a>
        <a href="https://github.com/Kauerc10" target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
      </div>
      <p className="text-[11px] text-slate-500 font-mono mt-1">{d.copyright}</p>
    </footer>
  );
}
