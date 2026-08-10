'use client';

import { useEffect, useState } from 'react';
import { GitCommit, GitPullRequest, ExternalLink, Activity, Lock, Unlock, ShieldCheck, Code, PieChart, Layers } from 'lucide-react';
import { GithubUserStats } from '@/types/github';
import ContributionGraph from './ContributionGraph';

export default function GithubLiveStats() {
  const [stats, setStats] = useState<GithubUserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(2026);

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
          <span>[TELEMETRIA CYBERDECK] Carregando matriz de contribuições e auditoria de repositórios...</span>
        </span>
      </div>
    );
  }

  if (!stats) return null;

  const currentContributions = selectedYear === 2026 ? stats.contributions2026 : stats.contributions2025;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1120]/95 border border-[var(--gold)]/40 backdrop-blur-2xl hover:border-[var(--gold)] hover:shadow-[0_0_35px_rgba(212,160,23,0.2)] transition-all duration-300 shadow-2xl font-mono text-white">
      {/* Header Principal Notarial */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src={stats.avatarUrl}
              alt={stats.username}
              className="w-13 h-13 rounded-2xl border-2 border-[var(--gold)] object-cover shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#0b1120] border border-[var(--gold)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
            </span>
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              @{stats.username}
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                HISTÓRICO AUDITADO
              </span>
            </h4>
            <p className="text-xs text-gray-400">Telemetria de Engenharia & Atividade de Código (GitHub REST / GraphQL)</p>
          </div>
        </div>

        {/* Seletor de Anos (2026 vs 2025) */}
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setSelectedYear(2026)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedYear === 2026
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            2026 ({stats.contributions2026})
          </button>
          <button
            onClick={() => setSelectedYear(2025)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedYear === 2025
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            2025 ({stats.contributions2025})
          </button>
        </div>
      </div>

      {/* Hero Metric Banner: Contribuições Totais do Ano Selecionado */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#0b1120] to-amber-950/40 border border-[var(--gold)]/30 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[var(--gold)] font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[var(--gold)]" />
            Contribuições Auditadas no GitHub ({selectedYear}):
          </span>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            {currentContributions} <span className="text-base font-normal text-gray-400">contribuições no último ano</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Total histórico acumulado: <strong className="text-[var(--gold)]">{stats.totalContributions}+ contribuições</strong> (849 em 2026 · 397 em 2025)
          </p>
        </div>

        <a
          href={`https://github.com/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-[var(--gold)] text-[#0b1120] hover:bg-amber-400 text-xs flex items-center gap-1.5 font-bold transition-all shadow-lg whitespace-nowrap self-start md:self-auto"
        >
          <span>ACESSAR REPOSITÓRIOS</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Matriz Heatmap de Contribuições (Quadradinhos Verdes) */}
      <div className="mb-6">
        <ContributionGraph year={selectedYear} />
      </div>

      {/* Activity Overview: Gráfico de Barra & Proporções das Imagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Lado Esquerdo: Activity Overview % (89% Commits, 10% PRs, 1% Issues) */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <h5 className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-3">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>OVERVIEW DE ATIVIDADES ({selectedYear}):</span>
            </h5>

            {/* Barra Visual de Proporção */}
            <div className="w-full h-3.5 rounded-full bg-gray-800 overflow-hidden flex mb-4 border border-white/10">
              <div style={{ width: `${stats.commitsPercent}%` }} className="bg-emerald-500 h-full" title={`Commits: ${stats.commitsPercent}%`} />
              <div style={{ width: `${stats.prsPercent}%` }} className="bg-purple-500 h-full" title={`Pull Requests: ${stats.prsPercent}%`} />
              <div style={{ width: `${stats.issuesPercent}%` }} className="bg-blue-500 h-full" title={`Issues: ${stats.issuesPercent}%`} />
            </div>

            {/* Legenda de Porcentagem */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-[10px] text-gray-400 block">Commits</span>
                <span className="text-sm font-bold text-emerald-400">{stats.commitsPercent}%</span>
              </div>
              <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
                <span className="text-[10px] text-gray-400 block">Pull Requests</span>
                <span className="text-sm font-bold text-purple-400">{stats.prsPercent}%</span>
              </div>
              <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/30">
                <span className="text-[10px] text-gray-400 block">Issues</span>
                <span className="text-sm font-bold text-blue-400">{stats.issuesPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Repositórios Com Maior Volume de Contribuição */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <h5 className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-3">
              <Code className="w-4 h-4 text-[var(--gold)]" />
              <span>REPOSITÓRIOS COM MAIOR ATIVIDADE:</span>
            </h5>

            <div className="space-y-2">
              {stats.topRepositories.map((repo, idx) => (
                <a
                  key={idx}
                  href={`https://github.com/${repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-[var(--gold)]/10 border border-white/5 hover:border-[var(--gold)]/30 transition-all text-xs group"
                >
                  <span className="font-bold text-blue-400 group-hover:text-[var(--gold)]">
                    📦 {repo}
                  </span>
                  <span className="text-[10px] text-gray-400 group-hover:text-white flex items-center gap-1">
                    <span>Auditado</span> ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de 4 Cards de Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6 text-xs">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-blue-400/60 transition-colors">
          <div className="flex items-center justify-center gap-1 text-blue-400 text-[10px] uppercase font-bold mb-1">
            <Unlock className="w-3.5 h-3.5" />
            <span>Públicos</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.publicRepos}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">Repositórios</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[var(--gold)]/60 transition-colors">
          <div className="flex items-center justify-center gap-1 text-[var(--gold)] text-[10px] uppercase font-bold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Privados</span>
          </div>
          <p className="text-2xl font-extrabold text-[var(--gold)]">{stats.privateRepos}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">Auditados Cartório</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-emerald-400/60 transition-colors">
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-[10px] uppercase font-bold mb-1">
            <GitCommit className="w-3.5 h-3.5" />
            <span>Commits</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">+{stats.totalCommits}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">Commits Registrados</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-purple-400/60 transition-colors">
          <div className="flex items-center justify-center gap-1 text-purple-400 text-[10px] uppercase font-bold mb-1">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Pull Requests</span>
          </div>
          <p className="text-2xl font-extrabold text-purple-400">+{stats.totalPRs}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">PRs Criados</p>
        </div>
      </div>

      {/* Feed de Commits Recentes Auditados */}
      {stats.recentCommits && stats.recentCommits.length > 0 && (
        <div className="space-y-2 border-t border-white/10 pt-5">
          <p className="text-xs text-gray-300 flex items-center justify-between mb-3 font-bold">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--gold)]" />
              <span>ÚLTIMAS ATIVIDADES NO GITHUB:</span>
            </span>
            <span className="text-[10px] text-gray-400 font-normal">Event Stream Ativo</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {stats.recentCommits.map((commit, idx) => (
              <a
                key={idx}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[var(--gold)]/50 transition-all text-xs group"
              >
                <div className="flex items-center justify-between text-gray-300 group-hover:text-[var(--gold)] mb-1">
                  <span className="font-bold text-[11px] text-blue-400 truncate max-w-[200px]">
                    [{commit.repoName}]
                  </span>
                  <span className="text-[10px] text-gray-400">{commit.date}</span>
                </div>
                <p className="text-[11px] text-gray-300 truncate">{commit.message}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
