'use client';

import { useEffect, useState } from 'react';
import { GitCommit, GitPullRequest, ExternalLink, Activity, Lock, Unlock } from 'lucide-react';
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
      <div className="p-6 rounded-2xl bg-[#0b1120]/80 border border-white/10 animate-pulse text-xs text-gray-400 font-mono">
        Carregando auditoria de código e estatísticas ao vivo do GitHub...
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 rounded-2xl bg-[#0b1120]/90 border border-[var(--gold)]/30 backdrop-blur-md hover:border-[var(--gold)]/60 transition-all duration-300 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <img
            src={stats.avatarUrl}
            alt={stats.username}
            className="w-11 h-11 rounded-full border-2 border-[var(--gold)]"
          />
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              @{stats.username}
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </h4>
            <p className="text-[11px] text-gray-400 font-mono">Auditoria de Engenharia em Tempo Real (GitHub REST API)</p>
          </div>
        </div>

        <a
          href={`https://github.com/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 hover:bg-[var(--gold)]/20 text-xs flex items-center gap-1.5 font-mono font-bold transition-all"
        >
          <span>VER PERFIL</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid de 4 Métricas Chave Exigidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 font-mono text-xs">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-center gap-1 text-blue-400 text-[10px] uppercase font-bold mb-1">
            <Unlock className="w-3 h-3" />
            <span>Públicos</span>
          </div>
          <p className="text-xl font-bold text-white">{stats.publicRepos}</p>
          <p className="text-[9px] text-gray-400">Repositórios</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center hover:border-amber-500/50 transition-colors">
          <div className="flex items-center justify-center gap-1 text-[var(--gold)] text-[10px] uppercase font-bold mb-1">
            <Lock className="w-3 h-3" />
            <span>Privados</span>
          </div>
          <p className="text-xl font-bold text-[var(--gold)]">{stats.privateRepos}</p>
          <p className="text-[9px] text-gray-400">Auditados / Cartório</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-[10px] uppercase font-bold mb-1">
            <GitCommit className="w-3 h-3" />
            <span>Commits</span>
          </div>
          <p className="text-xl font-bold text-emerald-400">+{stats.totalCommits}</p>
          <p className="text-[9px] text-gray-400">Total de Commits</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center hover:border-cyan-500/50 transition-colors">
          <div className="flex items-center justify-center gap-1 text-cyan-400 text-[10px] uppercase font-bold mb-1">
            <GitPullRequest className="w-3 h-3" />
            <span>Pushes</span>
          </div>
          <p className="text-xl font-bold text-cyan-400">+{stats.totalPushes}</p>
          <p className="text-[9px] text-gray-400">Total de Pushes</p>
        </div>
      </div>

      {/* Feed de Commits Recentes */}
      {stats.recentCommits && stats.recentCommits.length > 0 && (
        <div className="space-y-2 border-t border-white/10 pt-4">
          <p className="text-xs font-mono text-gray-300 flex items-center gap-1.5 mb-2 font-bold">
            <Activity className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>ÚLTIMOS COMMITS AUDITADOS:</span>
          </p>

          <div className="space-y-2">
            {stats.recentCommits.map((commit, idx) => (
              <a
                key={idx}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[var(--gold)]/40 transition-all text-xs font-mono group"
              >
                <div className="flex items-center justify-between text-gray-300 group-hover:text-[var(--gold)]">
                  <span className="font-bold text-[11px] text-blue-400">[{commit.repoName}]</span>
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
