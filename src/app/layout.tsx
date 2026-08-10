import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import AevoWidget from '@/components/ai/AevoWidget';
import BreachModal from '@/components/ui/BreachModal';
import HeroCanvas3D from '@/components/3d/HeroCanvas3D';

export const metadata: Metadata = {
  title: 'Kauê Ruon Cardoso — AI Engineer',
  description:
    'Portfólio de Kauê Ruon Cardoso. Construo software guiando IA generativa — de protótipos com LLM a back-end e front-end.',
  keywords: ['AI Engineer', 'TypeScript', 'Next.js', 'LLM', 'Cartório', 'Blumenau'],
  authors: [{ name: 'Kauê Ruon Cardoso' }],
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/favicon.svg',
    apple: '/assets/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="has-noise">
        {/* NOISE OVERLAY */}
        <div className="noise-overlay" />

        {/* GLOBAL 3D BACKGROUND */}
        <HeroCanvas3D />

        {/* SCROLL PROGRESS */}
        <ScrollProgress />

        {/* CUSTOM CURSOR */}
        <CustomCursor />

        {/* MAIN CONTENT */}
        {children}

        {/* AGENTE ÆVO & BREACH PROTOCOL */}
        <AevoWidget />
        <BreachModal />
      </body>
    </html>
  );
}
