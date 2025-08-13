import { Octokit } from '@octokit/rest';

class GitHubService {
  constructor() {
    this.octokit = null;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    this.octokit = new Octokit({
      auth: token,
    });
  }

  isAuthenticated() {
    return !!this.token;
  }

  async searchRepositories(query, options = {}) {
    if (!this.octokit) {
      // Use unauthenticated requests for basic functionality
      this.octokit = new Octokit();
    }

    try {
      const { data } = await this.octokit.rest.search.repos({
        q: query,
        sort: options.sort || 'stars',
        order: options.order || 'desc',
        per_page: options.perPage || 10,
        page: options.page || 1,
      });

      return {
        items: data.items.map(repo => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          owner: {
            login: repo.owner.login,
            avatarUrl: repo.owner.avatar_url,
          },
          topics: repo.topics || [],
        })),
        totalCount: data.total_count,
        hasNextPage: data.items.length === (options.perPage || 10),
      };
    } catch (error) {
      console.error('GitHub search error:', error);
      throw new Error('Failed to search repositories');
    }
  }

  async getRepository(owner, repo) {
    if (!this.octokit) {
      this.octokit = new Octokit();
    }

    try {
      const { data } = await this.octokit.rest.repos.get({
        owner,
        repo,
      });

      return {
        id: data.id,
        name: data.name,
        fullName: data.full_name,
        description: data.description,
        url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        size: data.size,
        defaultBranch: data.default_branch,
        owner: {
          login: data.owner.login,
          avatarUrl: data.owner.avatar_url,
        },
        topics: data.topics || [],
        license: data.license?.name,
      };
    } catch (error) {
      console.error('GitHub repository fetch error:', error);
      throw new Error('Failed to fetch repository');
    }
  }

  async getTrendingRepositories(timeframe = 'daily') {
    const since = this.getDateRange(timeframe);
    const query = `created:>${since} stars:>10`;
    
    return this.searchRepositories(query, {
      sort: 'stars',
      order: 'desc',
      perPage: 20,
    });
  }

  async getRepositoriesByLanguage(language, options = {}) {
    const query = `language:${language} stars:>10`;
    
    return this.searchRepositories(query, {
      sort: 'stars',
      order: 'desc',
      ...options,
    });
  }

  getDateRange(timeframe) {
    const now = new Date();
    const dates = {
      daily: new Date(now.setDate(now.getDate() - 1)),
      weekly: new Date(now.setDate(now.getDate() - 7)),
      monthly: new Date(now.setMonth(now.getMonth() - 1)),
    };
    
    return dates[timeframe]?.toISOString().split('T')[0] || dates.daily.toISOString().split('T')[0];
  }
}

export default new GitHubService();