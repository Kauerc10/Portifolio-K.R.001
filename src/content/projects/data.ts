export type ProjectAudience = 'business' | 'engineering' | 'both';
export type ProjectKind = 'client' | 'internal' | 'product' | 'open-source';

export interface ProjectMetric {
  label: string;
  value: string;
  source?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  type: 'demo' | 'repo' | 'case' | 'external';
}

export interface BaseProjectData {
  slug: string;
  audience: ProjectAudience;
  kind: ProjectKind;
  stack: string[];
  featured: boolean;
  order: number;
  screenshots: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  linkDefs: {
    type: 'demo' | 'repo' | 'case' | 'external';
    href: string;
    key: string;
  }[];
}

export const BASE_PROJECTS: BaseProjectData[] = [
  {
    slug: 'docfacil',
    audience: 'both',
    kind: 'product',
    stack: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel AI SDK'],
    featured: true,
    order: 1,
    screenshots: [
      {
        src: '/assets/krc-logo-512.webp',
        alt: 'DocFácil — Automação Notarial com IA',
        width: 1200,
        height: 675,
      },
    ],
    linkDefs: [
      { type: 'demo', href: 'https://docfacil-indol.vercel.app', key: 'demo' },
      { type: 'repo', href: 'https://github.com/khub-solucoes/docfacil', key: 'repo' },
    ],
  },
  {
    slug: 'ckf-manutencao',
    audience: 'business',
    kind: 'client',
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    featured: true,
    order: 2,
    screenshots: [
      {
        src: '/assets/krc-logo-512.webp',
        alt: 'CKF Manutenção — Sistema Operacional de Orçamentos',
        width: 1200,
        height: 675,
      },
    ],
    linkDefs: [
      { type: 'demo', href: 'https://ckf-manutencao-orcamentos.vercel.app', key: 'demo' },
      { type: 'repo', href: 'https://github.com/Kauerc10/ckf-manutencao-orcamentos', key: 'repo' },
    ],
  },
  {
    slug: 'atlas-notarial',
    audience: 'engineering',
    kind: 'internal',
    stack: ['Node.js', 'TypeScript', 'Express', 'APIs REST', 'Integrations'],
    featured: true,
    order: 3,
    screenshots: [
      {
        src: '/assets/krc-logo-512.webp',
        alt: 'Atlas Notarial — Automação Notarial & Detran',
        width: 1200,
        height: 675,
      },
    ],
    linkDefs: [],
  },
  {
    slug: 'foli',
    audience: 'engineering',
    kind: 'open-source',
    stack: ['TypeScript', 'WebGL', 'GLSL Shaders', 'Three.js', 'Layout Engine'],
    featured: true,
    order: 4,
    screenshots: [
      {
        src: '/assets/krc-logo-512.webp',
        alt: 'Foli Lib — Layout Engine & Shaders WebGL',
        width: 1200,
        height: 675,
      },
    ],
    linkDefs: [
      { type: 'repo', href: 'https://github.com/Kauerc10/foli', key: 'repo' },
    ],
  },
];
