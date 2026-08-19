import React from 'react';

export default function SkipLink({ label = 'Pular para o conteúdo principal' }: { label?: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono text-xs font-bold transition-all"
    >
      {label}
    </a>
  );
}
