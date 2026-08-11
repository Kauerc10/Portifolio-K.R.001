export interface GithubUserStats {
  username: string;
  avatarUrl: string;
  publicRepos: number;
  privateRepos: number;
  totalCommits: number;
  totalPRs: number;
  contributions2026: number;
  contributions2025: number;
  totalContributions: number;
  commitsPercent: number;
  prsPercent: number;
  issuesPercent: number;
  topRepositories: string[];
  stars: number;
  followers: number;
  following: number;
  recentCommits: Array<{
    repoName: string;
    message: string;
    date: string;
    url: string;
  }>;
}
