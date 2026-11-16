export const languageTransitionKey = 'portfolio-language-transition';

export type LanguageTransition = {
  target: string;
  locale: 'pt-BR' | 'en-US';
  expires: number;
  section?: string;
  offset: number;
  scrollY: number;
};

// Run before paint so a document navigation can continue the outgoing cover.
export const languageTransitionBootstrap = `
(() => {
  try {
    const record = JSON.parse(sessionStorage.getItem('${languageTransitionKey}') || 'null');
    const target = location.pathname + location.search + location.hash;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!record || record.target !== target || record.expires <= Date.now() || reducedMotion) return;

    const root = document.documentElement;
    root.dataset.languagePhase = 'covered';
    root.dataset.languageDirection = record.locale === 'en-US' ? 'forward' : 'backward';
    setTimeout(() => {
      delete root.dataset.languagePhase;
      delete root.dataset.languageDirection;
    }, 4000);
  } catch {
    // A normal page render remains available if session storage is blocked.
  }
})()
`;
