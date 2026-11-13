import type { Locale } from '@/i18n/config';

export type CaseDelivery = {
  id: string;
  label: Record<Locale, string>;
  kind: 'product' | 'service' | 'open-source';
};

export type CaseDefinition = {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  nature: 'own-product' | 'on-demand' | 'open-source';
  deliveries: readonly CaseDelivery[];
  links: { home: Record<Locale, string>; case: Record<Locale, string> };
  homePath: (locale: Locale) => string;
  casePath: (locale: Locale) => string;
};

/**
 * Editorial identity shared by the Vio home preview and its dedicated page.
 * Future cases can add deliveries without creating a route or fake content.
 */
export const vioDigitalCase: CaseDefinition = {
  id: 'viodigital',
  slug: 'viodigital',
  title: { 'pt-BR': 'VioDigital', 'en-US': 'VioDigital' },
  nature: 'open-source',
  deliveries: [{ id: 'web-app', label: { 'pt-BR': 'Aplicação web VioDigital', 'en-US': 'VioDigital web app' }, kind: 'open-source' }],
  links: {
    home: { 'pt-BR': '/pt-BR#project-viodigital', 'en-US': '/en-US#project-viodigital' },
    case: { 'pt-BR': '/pt-BR/projetos/viodigital', 'en-US': '/en-US/projetos/viodigital' },
  },
  homePath: (locale) => `/${locale}`,
  casePath: (locale) => `/${locale}/projetos/viodigital`,
};

export const vecomCase: CaseDefinition = {
  id: 'vecom',
  slug: 'vecom',
  title: { 'pt-BR': 'VECOM Ficha Fácil', 'en-US': 'VECOM Ficha Fácil' },
  nature: 'on-demand',
  deliveries: [{ id: 'ficha-facil', label: { 'pt-BR': 'Sistema Ficha Fácil', 'en-US': 'Ficha Fácil system' }, kind: 'service' }],
  links: {
    home: { 'pt-BR': '/pt-BR#project-vecom', 'en-US': '/en-US#project-vecom' },
    case: { 'pt-BR': '/pt-BR/projetos/vecom', 'en-US': '/en-US/projetos/vecom' },
  },
  homePath: (locale) => `/${locale}`,
  casePath: (locale) => `/${locale}/projetos/vecom`,
};
