import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';
import AevoWidget from '@/components/ai/AevoWidget';
import BreachModal from '@/components/ui/BreachModal';
import HeroCanvas3D from '@/components/3d/HeroCanvas3D';

export const metadata: Metadata = {
  title: 'Kauê Ruon Cardoso — AI Engineer',
  description:
    'Portfólio de Kauê Ruon Cardoso. Construo software guiando IA generativa — de protótipos com LLM a back-end e front-end com o Agente de IA ÆVO.',
  keywords: ['AI Engineer', 'TypeScript', 'Next.js', 'LLM', 'RAG', 'Cartório', 'Blumenau'],
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
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bgDark text-gray-200 antialiased selection:bg-cyanNeon selection:text-bgDark">
        <div className="noise-overlay" />
        <HeroCanvas3D />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <AevoWidget />
        <BreachModal />
      </body>
    </html>
  );
}
