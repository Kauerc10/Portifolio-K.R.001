import type { LocalizedProjectContent } from './pt-BR';

export const PROJECTS_EN_US: Record<string, LocalizedProjectContent> = {
  docfacil: {
    title: 'DocFácil — Notarial Automation with Generative AI',
    shortTitle: 'DocFácil',
    summary: 'Advanced web platform for notary offices reducing legal draft creation time by up to 70% using provider-agnostic AI and strict validation.',
    problem: 'Drafting notarial powers of attorney and deeds requires exhaustive manual cross-referencing, causing bottlenecks and risk of material errors under high volume.',
    solution: 'Smart legal draft generator powered by a provider-agnostic LLM architecture, real-time business rule validation, and error-free document export.',
    role: 'Software Architect & Full-Stack Engineer',
    status: 'Production SaaS · Live Demo',
    capabilities: [
      'Legal Deed & Draft Generation',
      'Agnostic Multi-LLM Architecture',
      'Real-Time Notarial Business Rules Validation',
      'Document Export & Audit Trail',
    ],
    metrics: [
      { label: 'Time Reduction', value: '70%', source: 'Notary office test benchmarks' },
      { label: 'Structural Accuracy', value: '100%', source: 'Schema validation' },
    ],
    links: [
      { key: 'demo', label: 'Live Demo' },
      { key: 'repo', label: 'GitHub Repository' },
    ],
  },
  'ckf-manutencao': {
    title: 'CKF Manutenção — Operational Budget & Reporting System',
    shortTitle: 'CKF Manutenção',
    summary: 'Responsive web application for operational ticket tracking, automated budget quote generation, and technical maintenance reports in production.',
    problem: 'Quote management and work orders relied on manual spreadsheets and fragmented communication, hindering timeline tracking and maintenance history.',
    solution: 'Integrated platform with secure authentication, automatic cost calculations, instant PDF proposal generation, and unified client history.',
    role: 'Full-Stack Developer & UI Designer',
    status: 'In Production for Client',
    client: 'CKF Manutenção Industrial',
    capabilities: [
      'Service Order Workflow Management',
      'Automated Quotation Generation',
      'Technical PDF Report Export',
      'Real-Time Operation Dashboard',
    ],
    metrics: [
      { label: 'Proposal Turnaround', value: '3x faster', source: 'Client operational workflow' },
      { label: 'Uptime', value: '99.9%', source: 'Supabase / Vercel' },
    ],
    links: [
      { key: 'demo', label: 'Live Production App' },
      { key: 'repo', label: 'Source Repository' },
    ],
  },
  'atlas-notarial': {
    title: 'Atlas Notarial — Deed Automation & DMV Integration Engine',
    shortTitle: 'Atlas Notarial',
    summary: 'High-speed notarial automation engine in production at Cartório Gaya for vehicle data retrieval, validation, and batch legal deed generation.',
    problem: 'Querying individual vehicle databases and manually composing vehicle powers of attorney consumed critical time during customer counter service.',
    solution: 'Integration engine that queries vehicle databases, sanitizes data, and compiles notarial deeds in milliseconds with zero-tolerance validation.',
    role: 'Automation Engineer & Notary Officer',
    status: 'In Production at Cartório Gaya',
    client: 'Cartório Gaya (Blumenau/SC)',
    capabilities: [
      'Vehicle API Integration',
      'Batch Legal Deed Compilation',
      'Data Sanitization & Legal Validation',
      'Zero-Tolerance Operations',
    ],
    metrics: [
      { label: 'Drafting Time', value: '< 1 second', source: 'Production average execution' },
      { label: 'Daily Adoption', value: '100% active', source: 'Cartório Gaya operations' },
    ],
    links: [],
  },
  foli: {
    title: 'Foli Lib — TypeScript Layout Engine & WebGL Shaders',
    shortTitle: 'Foli',
    summary: 'Open-source layout engine and GPU-accelerated WebGL shaders designed for fluid 60 FPS 3D visual experiences with minimal memory overhead.',
    problem: 'Traditional graphics libraries often introduce excessive bundle bloat or complex dependencies to render interactive visual effects on the web.',
    solution: 'Minimalist TypeScript engine focused on mathematical precision, 60 FPS GPU rendering, and modular visual components.',
    role: 'Creator & Open Source Maintainer',
    status: 'Open Source Library',
    capabilities: [
      'Modular Layout Engine',
      'Custom GLSL Shaders',
      'Zero Heavy Dependencies',
      '60 FPS GPU Acceleration',
    ],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS', source: 'WebGL benchmarks' },
      { label: 'Bundle Size', value: '< 15 kB', source: 'Gzip' },
    ],
    links: [
      { key: 'repo', label: 'GitHub Repository' },
    ],
  },
};
