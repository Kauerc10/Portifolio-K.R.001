import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/users/Kauerc10', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Kaue-Portfolio-App',
      },
      next: { revalidate: 3600 }, // Cache por 1 hora
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const userData = await res.json();

    // Fetch últimos eventos/commits públicos
    const eventsRes = await fetch('https://api.github.com/users/Kauerc10/events/public?per_page=5', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Kaue-Portfolio-App',
      },
      next: { revalidate: 1800 },
    });

    let recentCommits: Array<{ repoName: string; message: string; date: string; url: string }> = [];

    if (eventsRes.ok) {
      const events = await eventsRes.json();
      const pushEvents = events.filter((e: any) => e.type === 'PushEvent');
      
      for (const event of pushEvents) {
        for (const commit of event.payload?.commits || []) {
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

    return NextResponse.json({
      username: userData.login,
      avatarUrl: userData.avatar_url,
      publicRepos: userData.public_repos,
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
      followers: 12,
      following: 5,
      recentCommits: [
        {
          repoName: 'Portifolio-K.R.001',
          message: 'perf: camada de otimização WebGL e agente de IA ÆVO',
          date: '10/08/2026',
          url: 'https://github.com/Kauerc10/Portifolio-K.R.001',
        },
      ],
    });
  }
}
