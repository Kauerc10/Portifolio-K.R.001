'use client';

import { useEffect, useState } from 'react';
import { GitCommit, GitPullRequest, ExternalLink, Activity, Lock, Unlock, Star, ShieldCheck } from 'lucide-react';
import { GithubUserStats } from '@/types/github';

export default function GithubLiveStats() {
  const [stats, setStats] = useState<GithubUserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar GitHub stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-[#0b1120]/90 border border-[var(--gold)]/30 animate-pulse text-xs text-[var(--gold)] font-mono flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Activity className="w-4 h-4 animate-spin text-[var(--gold)]" />
          <span>[TELEMETRIA CYBERDECK] Auditando repositórios e Pull Requests no GitHub...</span>
        </span>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 rounded-2xl bg-[#0b1120]/95 border border-[var(--gold)]/40 backdrop-blur-2xl hover:border-[var(--gold)] hover:shadow-[0_0_30px_rgba(212,160,23,0.15)] transition-all duration-300 shadow-2xl font-mono">
      {/* Header com Telemetria Cyberdeck Notarial */}
      <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={stats.avatarUrl}
              alt={stats.username}
              className="w-12 h-12 rounded-xl border-2 border-[var(--gold)] object-cover shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#0b1120] border border-[var(--gold)]">
              <ShieldCheck className="w-3 h-3 text-[var(--gold)]" />
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              @{stats.username}
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE AUDIT
              </span>
            </h4>
            <p className="text-[11px] text-gray-400">Telemetria de Engenharia & Pull Requests (GitHub REST API)</p>
          </div>
        </div>

        <a
          href={`https://github.com/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/40 hover:bg-[var(--gold)] hover:text-[#0b1120] text-xs flex items-center gap-1.5 font-bold transition-all duration-300 shadow-lg"
        >
          <span>VER GITHUB</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid de 4 Métricas Reais Exigidas: Repos Públicos, Privados, Commits e PRs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-5 text-xs">
        {/* Repos Públicos */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center hover:border-blue-400/60 transition-colors group">
          <div className="flex items-center justify-center gap-1 text-blue-400 text-[10px] uppercase font-bold mb-1">
            <Unlock className="w-3 h-3" />
            <span>PÚBLICOS</span>
          </div>
          <p className="text-2xl font-extrabold text-white group-hover:scale-105 transition-transform">{stats.publicRepos}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">Repositórios</p>
        </div>

        {/* Repos Privados */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center hover:border-[var(--gold)]/60 transition-colors group">
          <div className="flex items-center justify-center gap-1 text-[var(--gold)] text-[10px] uppercase font-bold mb-1">
            <Lock className="w-3 h-3" />
            <span>PRIVADOS</span>
          </div>
          <p className="text-2xl font-extrabold text-[var(--gold)] group-hover:scale-105 transition-transform">{stats.privateRepos}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">Auditados / Cartório</p>
        </div>

        {/* Total de Commits */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center hover:border-emerald-400/60 transition-colors group">
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-[10px] uppercase font-bold mb-1">
            <GitCommit className="w-3 h-3" />
            <span>COMMITS</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 group-hover:scale-105 transition-transform">+{stats.totalCommits}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">Total Registrado</p>
        </div>

        {/* Pull Requests (PRs) */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center hover:border-purple-400/60 transition-colors group">
          <div className="flex items-center justify-center gap-1 text-purple-400 text-[10px] uppercase font-bold mb-1">
            <GitPullRequest className="w-3 h-3" />
            <span>PULL REQUESTS</span>
          </div>
          <p className="text-2xl font-extrabold text-purple-400 group-hover:scale-105 transition-transform">+{stats.totalPRs}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">PRs Criados</p>
        </div>
      </div>

      {/* Indicador de Stars acumuladas */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs mb-4">
        <span className="text-gray-400 flex items-center gap-1.5 text-[11px]">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Reconhecimento da Comunidade:</span>
        </span>
        <span className="font-bold text-amber-400">{stats.stars} Stars Acumuladas</span>
      </div>

      {/* Feed de Commits Recentes Auditados */}
      {stats.recentCommits && stats.recentCommits.length > 0 && (
        <div className="space-y-2 border-t border-white/10 pt-4">
          <p className="text-xs text-gray-300 flex items-center justify-between mb-2 font-bold">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>COMMITS RECENTES AUDITADOS:</span>
            </span>
            <span className="text-[10px] text-gray-500 font-normal">Sincronização Ativa</span>
          </p>

          <div className="space-y-2">
            {stats.recentCommits.map((commit, idx) => (
              <a
                key={idx}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[var(--gold)]/50 transition-all text-xs group"
              >
                <div className="flex items-center justify-between text-gray-300 group-hover:text-[var(--gold)]">
                  <span className="font-bold text-[11px] text-blue-400 flex items-center gap-1">
                    <span>repo:</span> {commit.repoName}
                  </span>
                  <span className="text-[10px] text-gray-400">{commit.date}</span>
                </div>
                <p className="text-[11px] text-gray-300 truncate mt-1">{commit.message}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
