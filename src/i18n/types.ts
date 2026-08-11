import ptBR from './locales/pt-BR.json';
import enUSRaw from './locales/en-US.json';

export type Dictionary = typeof ptBR;

// Validação em compile-time no TypeScript: se faltar qualquer chave no en-US, o build falha!
export const enUS: Dictionary = enUSRaw;
export const ptBRDict: Dictionary = ptBR;
