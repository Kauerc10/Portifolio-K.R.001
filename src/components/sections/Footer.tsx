import type { Dictionary } from '@/i18n/types';

export default function Footer({ dict }: { dict?: Dictionary['footer'] }) {
  const d = dict || {
    builtWith: 'Construído com Next.js 15, TypeScript & Agente ÆVO AI.',
    copyright: '© 2026 Kauê Ruon Cardoso. Todos os direitos reservados. Precisão Notarial & Engenharia de Software.',
  };

  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="mailto:kaue.ruon@gmail.com" className="footer__link">Email</a>
        <a href="https://www.linkedin.com/in/kauerc/" target="_blank" rel="noopener noreferrer" className="footer__link">LinkedIn</a>
        <a href="https://github.com/Kauerc10" target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
      </div>
      <p className="text-xs text-slate-400 font-mono mt-2">{d.builtWith}</p>
      <p className="text-[11px] text-slate-500 font-mono mt-1">{d.copyright}</p>
    </footer>
  );
}
