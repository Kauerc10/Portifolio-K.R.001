export interface GithubUserStats {
  username: string;
  avatarUrl: string;
  publicRepos: number;
  privateRepos: number;
  totalCommits: number;
  totalPushes: number;
  followers: number;
  following: number;
  recentCommits: Array<{
    repoName: string;
    message: string;
    date: string;
    url: string;
  }>;
}
