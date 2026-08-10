import type { Metadata } from 'next';
import Script from 'next/script';
import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import AevoWidget from '@/components/ai/AevoWidget';
import JsonLd from '@/components/seo/json-ld';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

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
  metadataBase: new URL('https://kaueruon.dev'),
  title: 'Kauê Ruon Cardoso — Software Architect & SaaS Developer',
  description:
    'Software Architect e AI Engineer em Blumenau/SC. Desenvolvo aplicações SaaS de alta performance com Next.js 16, TypeScript, IA Generativa (RAG) e automação de processos notariais.',
  keywords: [
    'Next.js',
    'TypeScript',
    'SaaS',
    'Atlas Notarial',
    'DocFacil',
    'Foli Lib',
    'Software Architect',
    'Full Stack Developer',
    'AI Engineer',
    'Generative AI',
    'Cartório Gaya',
    'Blumenau',
  ],
  authors: [{ name: 'Kauê Ruon Cardoso', url: 'https://kaueruon.dev' }],
  creator: 'Kauê Ruon Cardoso',
  publisher: 'K-HUB Soluções',
  alternates: {
    canonical: 'https://kaueruon.dev',
  },
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/favicon.svg',
    apple: '/assets/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Kauê Ruon Cardoso — Software Architect & SaaS Developer',
    description:
      'Software Architect e AI Engineer em Blumenau/SC. Desenvolvo aplicações SaaS com Next.js 16, TypeScript, IA Generativa e automação de processos.',
    url: 'https://kaueruon.dev',
    siteName: 'Kauê Ruon Cardoso',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://github.com/Kauerc10.png',
        width: 1200,
        height: 630,
        alt: 'Kauê Ruon Cardoso — Software Architect & SaaS Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kauê Ruon Cardoso — Software Architect & SaaS Developer',
    description:
      'Software Architect e AI Engineer em Blumenau/SC. Desenvolvo aplicações SaaS de alta performance com Next.js 16, TypeScript e IA Generativa.',
    images: ['https://github.com/Kauerc10.png'],
    creator: '@kauerc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="llms" href="/llms.txt" />
      </head>
      <body className="has-noise transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* DADOS ESTRUTURADOS JSON-LD PARA SEO E AI READINESS */}
          <JsonLd />

          {/* NOISE OVERLAY */}
          <div className="noise-overlay" />

          {/* GLOBAL 3D BACKGROUND CANVAS */}
          <canvas id="heroCanvas" className="global-3d-bg" />

          {/* LOADING SCREEN */}
          <div id="loader" className="loader">
            <div className="loader__content">
              <p className="loader__title">KAUÊ RUON CARDOSO</p>
              <div className="loader__divider" />
              <p className="loader__case">Software Architect · SaaS & IA Generativa</p>
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

          {/* BREACH ALERT BAR */}
          <div id="breachAlert" className="breach-alert">
            <span className="breach-alert__text">⚠ BREACH PROTOCOL ACTIVATED — ACCESS LOGGED</span>
          </div>

          {/* CURSOR TRAIL CANVAS */}
          <canvas id="cursorTrail" className="cursor-trail" />

          {/* CUSTOM CURSOR */}
          <div className="cursor" id="cursor">
            <div className="cursor__dot" />
            <div className="cursor__ring" />
            <div className="cursor__label" id="cursorLabel" />
          </div>

          {/* MAIN CONTENT */}
          <main>{children}</main>

          {/* WIDGET DO AGENTE ÆVO AI */}
          <AevoWidget />

          {/* ENGINE DE SCRIPTS 3D & GSAP */}
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
          <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js" strategy="beforeInteractive" />

          <Script src="/js/three-scene.js" strategy="afterInteractive" />
          <Script src="/js/animations.js" strategy="afterInteractive" />
          <Script src="/js/loader.js" strategy="afterInteractive" />
          <Script src="/js/cursor.js" strategy="afterInteractive" />
          <Script src="/js/cipher-decode.js" strategy="afterInteractive" />
          <Script src="/js/easter-eggs.js" strategy="afterInteractive" />
          <Script src="/js/breach-protocol.js" strategy="afterInteractive" />
          <Script src="/js/main.js" strategy="afterInteractive" />
        </ThemeProvider>
      </body>
    </html>
  );
}
