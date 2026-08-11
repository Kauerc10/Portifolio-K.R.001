import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Kaue-Portfolio-App',
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // 1. Dados do Usuário
    const userRes = await fetch('https://api.github.com/users/Kauerc10', {
      headers,
      next: { revalidate: 3600 },
    });

    const userData = userRes.ok ? await userRes.json() : { login: 'Kauerc10', avatar_url: 'https://github.com/Kauerc10.png', public_repos: 20, followers: 12, following: 5 };

    // 2. Feed de Eventos Recentes para Exibir Commits
    let recentCommits: Array<{ repoName: string; message: string; date: string; url: string }> = [];
    try {
      const eventsRes = await fetch('https://api.github.com/users/Kauerc10/events/public?per_page=20', {
        headers,
        next: { revalidate: 1800 },
      });

      if (eventsRes.ok) {
        const events = await eventsRes.json();
        const pushEvents = events.filter((e: any) => e.type === 'PushEvent');

        for (const event of pushEvents) {
          const commits = event.payload?.commits || [];
          for (const commit of commits) {
            recentCommits.push({
              repoName: event.repo?.name?.replace('Kauerc10/', '') || 'Portifolio',
              message: commit.message,
              date: new Date(event.created_at).toLocaleDateString('pt-BR'),
              url: `https://github.com/${event.repo?.name}/commit/${commit.sha}`,
            });
            if (recentCommits.length >= 4) break;
          }
          if (recentCommits.length >= 4) break;
        }
      }
    } catch {
      // Fallback
    }

    if (recentCommits.length === 0) {
      recentCommits = [
        {
          repoName: 'Atlas_Notarial',
          message: 'feat: automação de procurações de veículo via API Detran-RS',
          date: '10/08/2026',
          url: 'https://github.com/Kauerc10/Atlas_Notarial',
        },
        {
          repoName: 'ckf-manutencao-orcamentos',
          message: 'feat: suíte de testes unitários com Vitest e exportação XLSX',
          date: '08/08/2026',
          url: 'https://github.com/Kauerc10/ckf-manutencao-orcamentos',
        },
        {
          repoName: 'Portifolio-K.R.001',
          message: 'feat: telemetria de código, heatmap de contribuições e agente ÆVO',
          date: '10/08/2026',
          url: 'https://github.com/Kauerc10/Portifolio-K.R.001',
        },
      ];
    }

    return NextResponse.json({
      username: userData.login || 'Kauerc10',
      avatarUrl: userData.avatar_url || 'https://github.com/Kauerc10.png',
      publicRepos: userData.public_repos || 20,
      privateRepos: 4,
      totalCommits: 1109, // ~89% das 1.246 contribuições
      totalPRs: 125, // ~10% das 1.246 contribuições
      contributions2026: 849, // Exato do print do usuário
      contributions2025: 397, // Exato do print do usuário
      totalContributions: 1246, // Exato do print (849 + 397)
      commitsPercent: 89, // Exato do print (89% Commits)
      prsPercent: 10, // Exato do print (10% Pull Requests)
      issuesPercent: 1, // Exato do print (1% Issues)
      topRepositories: [
        'Kauerc10/Atlas_Notarial',
        'Kauerc10/ckf-manutencao-orcamentos',
        'Kauerc10/nimbo-launcher',
        'Kauerc10/docfacil',
        'Kauerc10/foli',
      ],
      stars: 12,
      followers: userData.followers || 12,
      following: userData.following || 5,
      recentCommits,
    });
  } catch (error: any) {
    console.error('[API /api/github] Erro:', error);
    return NextResponse.json({
      username: 'Kauerc10',
      avatarUrl: 'https://github.com/Kauerc10.png',
      publicRepos: 20,
      privateRepos: 4,
      totalCommits: 1109,
      totalPRs: 125,
      contributions2026: 849,
      contributions2025: 397,
      totalContributions: 1246,
      commitsPercent: 89,
      prsPercent: 10,
      issuesPercent: 1,
      topRepositories: [
        'Kauerc10/Atlas_Notarial',
        'Kauerc10/ckf-manutencao-orcamentos',
        'Kauerc10/nimbo-launcher',
        'Kauerc10/docfacil',
        'Kauerc10/foli',
      ],
      stars: 12,
      followers: 12,
      following: 5,
      recentCommits: [
        {
          repoName: 'Atlas_Notarial',
          message: 'feat: automação de procurações de veículo via API Detran-RS',
          date: '10/08/2026',
          url: 'https://github.com/Kauerc10/Atlas_Notarial',
        },
      ],
    });
  }
}
