import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kauê Ruon Cardoso — Software Architect & SaaS Developer',
    short_name: 'Kauê Ruon',
    description:
      'Portfólio de Engenharia de Software, Arquitetura de IA Generativa e Automação SaaS por Kauê Ruon Cardoso.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1120',
    theme_color: '#d4a017',
    icons: [
      {
        src: '/assets/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/android-chrome-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
