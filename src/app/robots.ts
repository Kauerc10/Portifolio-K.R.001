import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Bytespider',
          'CCBot',
          'Applebot-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://kaueruon.dev/sitemap.xml',
    host: 'https://kaueruon.dev',
  };
}
