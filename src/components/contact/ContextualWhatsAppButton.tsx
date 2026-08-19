import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/contact';

interface ContextualWhatsAppButtonProps {
  message?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'pill';
  className?: string;
}

export default function ContextualWhatsAppButton({
  message = 'Olá, Kauê! Acessei seu portfólio e gostaria de conversar.',
  label = 'Conversar no WhatsApp',
  variant = 'primary',
  className = '',
}: ContextualWhatsAppButtonProps) {
  const url = buildWhatsAppUrl(message);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20';
      case 'secondary':
        return 'bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10';
      case 'pill':
        return 'bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20';
      default:
        return 'bg-emerald-600 hover:bg-emerald-700 text-white';
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider transition-all hover:scale-[1.02] ${getVariantStyles()} ${className}`}
    >
      <MessageSquare className="w-4 h-4 text-inherit" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
