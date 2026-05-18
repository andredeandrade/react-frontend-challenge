import { useQuery } from '@tanstack/react-query';

import { searchMovies } from '../api/movie.api';
import type { MovieFilters } from '../model/movie-filters';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useMovieSearch(
  query: string,
  page = 1,
  filters?: MovieFilters,
) {
  return useQuery({
    queryKey: movieQueryKeys.search(query, page, filters),
    queryFn: () => searchMovies(query, page, filters),
    enabled: query.trim().length > 0,
  });
}
