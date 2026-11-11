export function splitAccentTitle(title: string): [lead: string, accent: string] {
  const breakIndex = title.lastIndexOf(' ');
  if (breakIndex === -1) return ['', title];
  return [title.slice(0, breakIndex), title.slice(breakIndex + 1)];
}

export const DIRECT_CONTACT_LINKS = {
  email: 'mailto:kaue.ruon@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kauerc/',
  github: 'https://github.com/Kauerc10',
} as const;

export const SHARED_FORMATION_META: Record<
  string,
  { institution?: string; hours?: string; year?: string }
> = {
  ads: {},
  gestao: { institution: 'VisualMídia', hours: '156 h', year: '2020' },
  operador: { institution: 'VisualMídia', hours: '92 h', year: '2017' },
  games: { institution: 'VisualMídia', hours: '40 h', year: '2017' },
  max: { institution: 'VisualMídia', hours: '32 h', year: '2018' },
  'high-school': { institution: 'EEB Cel. Pedro Christiano Feddersen' },
};
