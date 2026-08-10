'use client';

import { useEffect, useState, useRef } from 'react';
import { GithubUserStats } from '@/types/github';

// Animated count-up hook — starts when triggered
function useCountUp(target: number, duration: number = 1800, active: boolean = false) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!active || target === 0) { setValue(target); return; }
    setValue(0);
    startTime.current = null;

    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      }
    };
    rafId.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId.current);
  }, [target, duration, active]);

  return value;
}

export default function GithubLiveStats() {
  const [stats, setStats] = useState<GithubUserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState<2026 | 2025>(2026);
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Trigger animations AFTER data loads + element is in viewport
  useEffect(() => {
    if (!stats || loading) return;

    const el = containerRef.current;
    if (!el) return;

    // Check immediately if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Small delay so the initial render is painted first
      const t = setTimeout(() => setAnimate(true), 100);
      return () => clearTimeout(t);
    }

    // Otherwise observe scroll
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stats, loading]);

  const contributions = stats ? (activeYear === 2026 ? stats.contributions2026 : stats.contributions2025) : 0;
  const animatedContributions = useCountUp(contributions, 2000, animate);
  const animatedTotal = useCountUp(stats?.totalContributions || 0, 2400, animate);
  const animatedRepos = useCountUp(stats?.publicRepos || 0, 1200, animate);
  const animatedFollowers = useCountUp(stats?.followers || 0, 1000, animate);

  if (loading || !stats) {
    return (
      <div style={{
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

  // SVG ring
  const ringSize = 140;
  const strokeWidth = 6;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const commitsDash = (stats.commitsPercent / 100) * circumference;
  const prsDash = (stats.prsPercent / 100) * circumference;

  // Animation helper — staggered fade+slide
  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '2.5rem',
        alignItems: 'center',
        padding: '2rem 0',
      }}
    >
      {/* Left: Numbers & Identity */}
      <div>
        {/* Username line */}
        <div style={{ ...fadeStyle(0.1), display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <img
            src={stats.avatarUrl}
            alt={stats.username}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '2px solid var(--gold, #d4a017)', objectFit: 'cover',
            }}
          />
          <div>
            <a
              href={`https://github.com/${stats.username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem',
                color: 'var(--gold, #d4a017)', textDecoration: 'none',
                letterSpacing: '0.05em', fontWeight: 700,
              }}
            >
              github.com/{stats.username} ↗
            </a>
            <div style={{
              fontFamily: 'var(--font-mono, monospace)', fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', marginTop: '0.15rem',
            }}>
              {animatedRepos} REPOS PÚBLICOS · {animatedFollowers} SEGUIDORES
            </div>
          </div>
        </div>

        {/* Big contribution number */}
        <div style={{ ...fadeStyle(0.25), marginBottom: '1rem' }}>
          <div style={{
            fontFamily: 'var(--font-heading, Syne, sans-serif)',
            fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: 900,
            color: 'white', lineHeight: 1, letterSpacing: '-0.03em',
          }}>
            {animatedContributions}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginTop: '0.35rem',
          }}>
            CONTRIBUIÇÕES EM {activeYear}
          </div>
        </div>

        {/* Year tabs */}
        <div style={{ ...fadeStyle(0.4), display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
          {([2026, 2025] as const).map((yr) => (
            <button
              key={yr}
              onClick={() => setActiveYear(yr)}
              style={{
                fontFamily: 'var(--font-mono, monospace)', fontSize: '0.65rem',
                padding: '0.35rem 0.75rem',
                border: activeYear === yr ? '1px solid var(--gold, #d4a017)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                background: activeYear === yr ? 'rgba(212,160,23,0.08)' : 'transparent',
                color: activeYear === yr ? 'var(--gold, #d4a017)' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer', letterSpacing: '0.1em',
                fontWeight: activeYear === yr ? 700 : 400, transition: 'all 0.3s ease',
              }}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Activity bar */}
        <div style={fadeStyle(0.55)}>
          <div style={{
            height: 3, borderRadius: 2, overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: '0.5rem',
          }}>
            <div style={{
              display: 'flex', height: '100%', width: '100%',
              transform: animate ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.6s',
            }}>
              <div style={{ width: `${stats.commitsPercent}%`, background: '#39d353' }} />
              <div style={{ width: `${stats.prsPercent}%`, background: 'var(--gold, #d4a017)' }} />
              <div style={{ width: `${stats.issuesPercent}%`, background: '#768390' }} />
            </div>
          </div>
          <div style={{
            display: 'flex', gap: '1.25rem',
            fontFamily: 'var(--font-mono, monospace)', fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em',
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
      </div>

      {/* Right: Activity ring */}
      <div style={fadeStyle(0.7)}>
        <div style={{ position: 'relative', width: ringSize, height: ringSize }}>
          <svg
            width={ringSize}
            height={ringSize}
            viewBox={`0 0 ${ringSize} ${ringSize}`}
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Background ring */}
            <circle
              cx={ringSize / 2} cy={ringSize / 2} r={radius}
              fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={strokeWidth}
            />
            {/* Commits arc (green) */}
            <circle
              cx={ringSize / 2} cy={ringSize / 2} r={radius}
              fill="none" stroke="#39d353" strokeWidth={strokeWidth}
              strokeDasharray={`${animate ? commitsDash : 0} ${circumference}`}
              strokeDashoffset={0} strokeLinecap="round"
              style={{
                transition: 'stroke-dasharray 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
                filter: 'drop-shadow(0 0 6px rgba(57,211,83,0.4))',
              }}
            />
            {/* PRs arc (gold) */}
            <circle
              cx={ringSize / 2} cy={ringSize / 2} r={radius}
              fill="none" stroke="var(--gold, #d4a017)" strokeWidth={strokeWidth}
              strokeDasharray={`${animate ? prsDash : 0} ${circumference}`}
              strokeDashoffset={animate ? -commitsDash : 0}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dasharray 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.9s, stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.9s',
                filter: 'drop-shadow(0 0 4px rgba(212,160,23,0.3))',
              }}
            />
          </svg>

          {/* Center label */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              fontFamily: 'var(--font-heading, Syne, sans-serif)',
              fontSize: '1.5rem', fontWeight: 800, color: 'white', lineHeight: 1,
            }}>
              {animatedTotal}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em', marginTop: '0.15rem',
            }}>
              TOTAL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
