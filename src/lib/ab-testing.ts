export type Variant = 'A' | 'B';

export interface ABExperiment {
  id: string;
  name: string;
  variants: Variant[];
}

export const EXPERIMENTS: Record<string, ABExperiment> = {
  HERO_CTA_EXPERIMENT: {
    id: 'hero_cta_v1',
    name: 'Hero Call To Action Experiment',
    variants: ['A', 'B'], // A: Explorar Projetos, B: Falar com Agente ÆVO
  },
  AEVO_WIDGET_THEME: {
    id: 'aevo_theme_v1',
    name: 'ÆVO Widget Initial State Experiment',
    variants: ['A', 'B'], // A: Minimized, B: Pulse Alert
  },
};

export function getVariant(experimentId: string): Variant {
  if (typeof window === 'undefined') return 'A';

  const storageKey = `ab_exp_${experimentId}`;
  const existing = localStorage.getItem(storageKey);

  if (existing === 'A' || existing === 'B') {
    return existing as Variant;
  }

  // Atribuição aleatória determinística 50/50
  const assignedVariant: Variant = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(storageKey, assignedVariant);

  return assignedVariant;
}

export function trackABEvent(experimentId: string, variant: Variant, eventName: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[A/B Test Event] Exp: ${experimentId} | Variant: ${variant} | Event: ${eventName}`);
  }
}
