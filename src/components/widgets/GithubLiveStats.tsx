'use client';

import { useEffect, useState } from 'react';
import { GitCommit, GitFork, Star, Users, ExternalLink, Activity } from 'lucide-react';
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
      <div className="p-6 rounded-2xl bg-cardBg/60 border border-white/10 animate-pulse text-xs text-gray-400">
        Carregando estatísticas ao vivo do GitHub...
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 rounded-2xl bg-cardBg/80 border border-white/10 backdrop-blur-md hover:border-cyanNeon/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={stats.avatarUrl}
            alt={stats.username}
            className="w-10 h-10 rounded-full border border-cyanNeon/40"
          />
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
              @{stats.username}
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h4>
            <p className="text-[11px] text-gray-400">Atividade em tempo real (GitHub REST API)</p>
          </div>
        </div>

        <a
          href={`https://github.com/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-cyanNeon hover:underline flex items-center gap-1 font-mono"
        >
          <span>Perfil</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 mb-4 font-mono text-xs">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
          <p className="text-gray-400 text-[10px]">Repositórios</p>
          <p className="text-lg font-bold text-cyanNeon">{stats.publicRepos}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
          <p className="text-gray-400 text-[10px]">Seguidores</p>
          <p className="text-lg font-bold text-goldAccent">{stats.followers}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
          <p className="text-gray-400 text-[10px]">Seguindo</p>
          <p className="text-lg font-bold text-blueAccent">{stats.following}</p>
        </div>
      </div>

      {/* Recent Commits Feed */}
      {stats.recentCommits && stats.recentCommits.length > 0 && (
        <div className="space-y-2 border-t border-white/10 pt-3">
          <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5 mb-2">
            <Activity className="w-3.5 h-3.5 text-cyanNeon" />
            <span>Últimos Commits Públicos:</span>
          </p>

          <div className="space-y-1.5">
            {stats.recentCommits.map((commit, idx) => (
              <a
                key={idx}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-mono group"
              >
                <div className="flex items-center justify-between text-gray-300 group-hover:text-cyanNeon">
                  <span className="font-bold text-[11px]">[{commit.repoName}]</span>
                  <span className="text-[10px] text-gray-500">{commit.date}</span>
                </div>
                <p className="text-[11px] text-gray-400 truncate mt-0.5">{commit.message}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
