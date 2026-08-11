import 'server-only';
import type { Locale } from './config';
import type { Dictionary } from './types';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'pt-BR': () => import('./locales/pt-BR.json').then((module) => module.default as Dictionary),
  'en-US': () => import('./locales/en-US.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale] || dictionaries['pt-BR'];
  return loader();
};
