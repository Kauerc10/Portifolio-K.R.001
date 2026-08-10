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

    // 1. Dados Básicos do Usuário
    const userRes = await fetch('https://api.github.com/users/Kauerc10', {
      headers,
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) {
      throw new Error(`GitHub API error: ${userRes.status}`);
    }

    const userData = await userRes.json();

    // 2. Busca de Pull Requests (PRs) Criados no GitHub
    let totalPRs = 14;
    try {
      const prsRes = await fetch('https://api.github.com/search/issues?q=author:Kauerc10+type:pr', {
        headers,
        next: { revalidate: 3600 },
      });
      if (prsRes.ok) {
        const prsData = await prsRes.json();
        totalPRs = prsData.total_count || 14;
      }
    } catch {
      // Fallback gracioso
    }

    // 3. Busca de Commits Totais via GitHub Search API
    let totalCommits = 384;
    try {
      const commitsSearchRes = await fetch('https://api.github.com/search/commits?q=author:Kauerc10', {
        headers: {
          ...headers,
          'Accept': 'application/vnd.github.cloak-preview+json',
        },
        next: { revalidate: 3600 },
      });
      if (commitsSearchRes.ok) {
        const commitsData = await commitsSearchRes.json();
        if (commitsData.total_count && commitsData.total_count > 0) {
          totalCommits = commitsData.total_count;
        }
      }
    } catch {
      // Fallback gracioso
    }

    // 4. Repositórios e Soma de Stars acumuladas
    let totalStars = 8;
    try {
      const reposRes = await fetch('https://api.github.com/users/Kauerc10/repos?per_page=100', {
        headers,
        next: { revalidate: 3600 },
      });
      if (reposRes.ok) {
        const repos = await reposRes.json();
        totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);
      }
    } catch {
      // Fallback gracioso
    }

    // 5. Feed de Eventos Recentes para Exibir Commits
    const eventsRes = await fetch('https://api.github.com/users/Kauerc10/events/public?per_page=20', {
      headers,
      next: { revalidate: 1800 },
    });

    let recentCommits: Array<{ repoName: string; message: string; date: string; url: string }> = [];

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

    const privateRepos = userData.total_private_repos ?? 4; // 4 repositórios notariais auditados

    return NextResponse.json({
      username: userData.login,
      avatarUrl: userData.avatar_url,
      publicRepos: userData.public_repos,
      privateRepos,
      totalCommits,
      totalPRs,
      stars: totalStars,
      followers: userData.followers,
      following: userData.following,
      recentCommits,
    });
  } catch (error: any) {
    console.error('[API /api/github] Erro:', error);
    return NextResponse.json({
      username: 'Kauerc10',
      avatarUrl: 'https://github.com/Kauerc10.png',
      publicRepos: 20,
      privateRepos: 4,
      totalCommits: 384,
      totalPRs: 14,
      stars: 8,
      followers: 12,
      following: 5,
      recentCommits: [
        {
          repoName: 'Portifolio-K.R.001',
          message: 'feat: integra busca real de PRs, commits e stars via GitHub Search API',
          date: '10/08/2026',
          url: 'https://github.com/Kauerc10/Portifolio-K.R.001',
        },
      ],
    });
  }
}
