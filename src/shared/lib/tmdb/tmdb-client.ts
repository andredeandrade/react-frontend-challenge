import { tmdbConfig } from './tmdb-config';

export class TmdbApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'TmdbApiError';
  }
}

async function tmdbFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${tmdbConfig.baseUrl}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${tmdbConfig.token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const body = await response
      .json()
      .catch(() => ({ status_message: response.statusText }));

    throw new TmdbApiError(
      response.status,
      body.status_message ?? 'TMDB API error',
    );
  }

  return response.json() as Promise<T>;
}

export const tmdbClient = {
  get: tmdbFetch,
};
