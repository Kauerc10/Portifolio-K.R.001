import type { Metadata } from 'next';
import Script from 'next/script';
import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import AevoWidget from '@/components/ai/AevoWidget';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

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
  openGraph: {
    title: 'Kauê Ruon Cardoso — AI Engineer',
    description: 'Portfólio de Kauê Ruon Cardoso. Construo software guiando IA generativa.',
    type: 'website',
    url: 'https://portifolio-k-r-001.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="has-noise">
        {/* NOISE OVERLAY */}
        <div className="noise-overlay" />

        {/* GLOBAL 3D BACKGROUND CANVAS */}
        <canvas id="heroCanvas" className="global-3d-bg" />

        {/* LOADING SCREEN */}
        <div id="loader" className="loader">
          <div className="loader__content">
            <p className="loader__title">KAUÊ RUON CARDOSO</p>
            <div className="loader__divider" />
            <p className="loader__case">AI Engineer · Blumenau / SC</p>
            <div className="loader__bars">
              <div className="loader__bar-row" data-target="74">
                <div className="loader__bar">
                  <div className="loader__bar-fill" id="bar1" />
                </div>
                <span className="loader__percent" id="pct1">0%</span>
                <span className="loader__label">carregando shaders...</span>
              </div>
              <div className="loader__bar-row" data-target="82">
                <div className="loader__bar">
                  <div className="loader__bar-fill" id="bar2" />
                </div>
                <span className="loader__percent" id="pct2">0%</span>
                <span className="loader__label">inicializando cena 3D...</span>
              </div>
              <div className="loader__bar-row" data-target="100">
                <div className="loader__bar">
                  <div className="loader__bar-fill" id="bar3" />
                </div>
                <span className="loader__percent" id="pct3">0%</span>
                <span className="loader__label">pronto. role pra explorar.</span>
              </div>
            </div>
            <p className="loader__hint">↓ role para navegar</p>
          </div>
          <div className="loader__curtain loader__curtain--left" />
          <div className="loader__curtain loader__curtain--right" />
        </div>

        {/* CURSOR TRAIL CANVAS */}
        <canvas id="cursorTrail" className="cursor-trail" />

        {/* CUSTOM CURSOR */}
        <div className="cursor" id="cursor">
          <div className="cursor__dot" />
          <div className="cursor__ring" />
          <span className="cursor__label" id="cursorLabel" />
        </div>

        {/* ALERT BAR */}
        <div className="breach-alert" id="breachAlert">
          <span className="breach-alert__text">[ ABERTO A PROPOSTAS — IA / FULL-STACK ]</span>
        </div>

        {/* SCROLL PROGRESS BAR */}
        <div className="scroll-progress" id="scrollProgress" />

        {/* MAIN PAGE CONTENT */}
        {children}

        {/* AGENTE ÆVO AGENT (Vercel AI SDK + RAG + Tool Use) */}
        <AevoWidget />

        {/* EXTERNAL SCRIPTS WITH NEXT.JS <Script> BEST PRACTICES */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="/js/loader.js?v=3.0" strategy="afterInteractive" />
        <Script src="/js/cursor.js?v=3.0" strategy="afterInteractive" />
        <Script src="/js/three-scene.js?v=3.0" strategy="afterInteractive" />
        <Script src="/js/animations.js?v=3.0" strategy="afterInteractive" />
        <Script src="/js/easter-eggs.js?v=3.0" strategy="afterInteractive" />
        <Script src="/js/cipher-decode.js?v=3.0" strategy="afterInteractive" />
        <Script src="/js/breach-protocol.js?v=3.0" strategy="afterInteractive" />
        <Script src="/js/main.js?v=3.0" strategy="afterInteractive" />
      </body>
    </html>
  );
}
