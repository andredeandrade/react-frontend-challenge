import { useQuery } from '@tanstack/react-query';

import { getDiscoveredMovies, getMovieGenres } from '../api/movie.api';
import type { MovieFilters } from '../model/movie-filters';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useDiscoverMovies(page = 1, filters?: MovieFilters) {
  return useQuery({
    queryKey: movieQueryKeys.discoverPage(page, filters),
    queryFn: () => getDiscoveredMovies(page, filters),
  });
}

export function useMovieGenres() {
  return useQuery({
    queryKey: [...movieQueryKeys.all, 'genres'] as const,
    queryFn: () => getMovieGenres(),
  });
}
