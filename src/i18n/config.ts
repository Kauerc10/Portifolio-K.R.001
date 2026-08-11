export const locales = ['pt-BR', 'en-US'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-BR';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
