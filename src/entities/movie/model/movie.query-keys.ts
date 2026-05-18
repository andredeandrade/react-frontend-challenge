import type { TimeWindow } from './movie.types';
import type { MovieFilters } from './movie-filters';

function serializeFilters(filters?: MovieFilters) {
  return {
    genreId: filters?.genreId ?? null,
    year: filters?.year ?? null,
    minRating: filters?.minRating ?? null,
  };
}

export const movieQueryKeys = {
  all: ['movies'] as const,
  discover: (page = 1, filters?: MovieFilters) =>
    [
      ...movieQueryKeys.all,
      'discover',
      { page, ...serializeFilters(filters) },
    ] as const,
  popular: (page = 1) => [...movieQueryKeys.all, 'popular', { page }] as const,
  trending: (timeWindow: TimeWindow = 'week', page = 1) =>
    [...movieQueryKeys.all, 'trending', timeWindow, { page }] as const,
  topRated: (page = 1) =>
    [...movieQueryKeys.all, 'top-rated', { page }] as const,
  upcoming: (page = 1) =>
    [...movieQueryKeys.all, 'upcoming', { page }] as const,
  search: (query: string, page = 1, filters?: MovieFilters) =>
    [
      ...movieQueryKeys.all,
      'search',
      { query, page, ...serializeFilters(filters) },
    ] as const,
  detail: (id: number) => [...movieQueryKeys.all, 'detail', id] as const,
};
