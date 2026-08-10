'use client';

import { Activity } from 'lucide-react';

interface Props {
  status?: 'online' | 'building' | 'private';
  label?: string;
}

export default function ProjectStatusBadge({ status = 'online', label }: Props) {
  if (status === 'private') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-400">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        <span>{label || 'Produção Privada (Cartório Gaya)'}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>{label || 'Online em Produção (Vercel)'}</span>
    </span>
  );
}
