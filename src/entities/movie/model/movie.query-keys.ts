import type { TimeWindow } from './movie.types';

export const movieQueryKeys = {
  all: ['movies'] as const,
  popular: (page = 1) => [...movieQueryKeys.all, 'popular', { page }] as const,
  trending: (timeWindow: TimeWindow = 'week', page = 1) =>
    [...movieQueryKeys.all, 'trending', timeWindow, { page }] as const,
  topRated: (page = 1) =>
    [...movieQueryKeys.all, 'top-rated', { page }] as const,
  upcoming: (page = 1) =>
    [...movieQueryKeys.all, 'upcoming', { page }] as const,
  search: (query: string, page = 1) =>
    [...movieQueryKeys.all, 'search', { query, page }] as const,
  detail: (id: number) => [...movieQueryKeys.all, 'detail', id] as const,
};
