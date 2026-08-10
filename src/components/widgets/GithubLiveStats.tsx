'use client';

import { useEffect, useState, useRef } from 'react';
import { GithubUserStats } from '@/types/github';

export default function GithubLiveStats() {
  const [stats, setStats] = useState<GithubUserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState<2026 | 2025>(2026);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="github-pulse" style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.7rem',
        color: 'var(--gold, #d4a017)',
        letterSpacing: '0.15em',
        opacity: 0.6,
      }}>
        ▪ AUDITANDO REGISTROS DE CONTRIBUIÇÃO...
      </div>
    );
  }

  if (!stats) return null;

  const contributions = activeYear === 2026 ? stats.contributions2026 : stats.contributions2025;

  // SVG ring dimensions
  const ringSize = 140;
  const strokeWidth = 6;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const commitsDash = (stats.commitsPercent / 100) * circumference;
  const prsDash = (stats.prsPercent / 100) * circumference;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '2.5rem',
      alignItems: 'center',
      padding: '2rem 0',
    }}>
      {/* Left: Numbers & Identity */}
      <div>
        {/* Username line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          <img
            src={stats.avatarUrl}
            alt={stats.username}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '2px solid var(--gold, #d4a017)',
              objectFit: 'cover',
            }}
          />
          <div>
            <a
              href={`https://github.com/${stats.username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                color: 'var(--gold, #d4a017)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                fontWeight: 700,
              }}
            >
              github.com/{stats.username} ↗
            </a>
            <div style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.12em',
              marginTop: '0.15rem',
            }}>
              {stats.publicRepos} REPOS PÚBLICOS · {stats.followers} SEGUIDORES
            </div>
          </div>
        </div>

        {/* Big contribution number */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontFamily: 'var(--font-heading, Syne, sans-serif)',
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>
            {contributions}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.15em',
            marginTop: '0.35rem',
          }}>
            CONTRIBUIÇÕES EM {activeYear}
          </div>
        </div>

        {/* Year tabs */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '1.5rem',
        }}>
          {([2026, 2025] as const).map((yr) => (
            <button
              key={yr}
              onClick={() => setActiveYear(yr)}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.65rem',
                padding: '0.35rem 0.75rem',
                border: activeYear === yr ? '1px solid var(--gold, #d4a017)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                background: activeYear === yr ? 'rgba(212,160,23,0.08)' : 'transparent',
                color: activeYear === yr ? 'var(--gold, #d4a017)' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                fontWeight: activeYear === yr ? 700 : 400,
                transition: 'all 0.2s ease',
              }}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Breakdown — clean horizontal bar */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{
            display: 'flex',
            height: 3,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.06)',
            marginBottom: '0.5rem',
          }}>
            <div style={{ width: `${stats.commitsPercent}%`, background: '#39d353', transition: 'width 0.6s ease' }} />
            <div style={{ width: `${stats.prsPercent}%`, background: 'var(--gold, #d4a017)', transition: 'width 0.6s ease' }} />
            <div style={{ width: `${stats.issuesPercent}%`, background: '#768390', transition: 'width 0.6s ease' }} />
          </div>
          <div style={{
            display: 'flex',
            gap: '1.25rem',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.08em',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#39d353', display: 'inline-block' }} />
              {stats.commitsPercent}% Commits
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold, #d4a017)', display: 'inline-block' }} />
              {stats.prsPercent}% Pull Requests
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#768390', display: 'inline-block' }} />
              {stats.issuesPercent}% Issues
            </span>
          </div>
        </div>

        {/* Recent commits — minimal */}
        {stats.recentCommits && stats.recentCommits.length > 0 && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '1rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.55rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.15em',
              marginBottom: '0.6rem',
            }}>
              ATIVIDADE RECENTE
            </div>
            {stats.recentCommits.slice(0, 3).map((commit, idx) => (
              <a
                key={idx}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  padding: '0.3rem 0',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold, #d4a017)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>▸</span>
                <span style={{ color: 'rgba(57,211,83,0.7)', flexShrink: 0 }}>{commit.repoName}</span>
                <span style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {commit.message}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Right: Activity ring — single elegant SVG */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background ring */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={strokeWidth}
          />
          {/* Commits arc (green) */}
          <circle
            ref={ringRef}
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke="#39d353"
            strokeWidth={strokeWidth}
            strokeDasharray={`${commitsDash} ${circumference - commitsDash}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease', filter: 'drop-shadow(0 0 6px rgba(57,211,83,0.4))' }}
          />
          {/* PRs arc (gold) */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke="var(--gold, #d4a017)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${prsDash} ${circumference - prsDash}`}
            strokeDashoffset={-commitsDash}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease', filter: 'drop-shadow(0 0 4px rgba(212,160,23,0.3))' }}
          />
        </svg>

        {/* Center label overlaid on ring */}
        <div style={{
          marginTop: `-${ringSize * 0.65}px`,
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'var(--font-heading, Syne, sans-serif)',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1,
          }}>
            {stats.totalContributions}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.5rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
            marginTop: '0.15rem',
          }}>
            TOTAL
          </div>
        </div>

        {/* Space to push below the ring */}
        <div style={{ height: `${ringSize * 0.25}px` }} />

        {/* Key repos underneath the ring */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
          alignItems: 'center',
        }}>
          {stats.topRepositories.slice(0, 3).map((repo, idx) => (
            <a
              key={idx}
              href={`https://github.com/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.55rem',
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold, #d4a017)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              {repo.replace('Kauerc10/', '')} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
