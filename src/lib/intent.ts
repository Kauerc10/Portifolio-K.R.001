export type VisitorIntent = 'business' | 'career' | null;

export function parseVisitorIntent(value: string | string[] | undefined): VisitorIntent {
  if (value === 'business' || value === 'career') return value;
  return null;
}
