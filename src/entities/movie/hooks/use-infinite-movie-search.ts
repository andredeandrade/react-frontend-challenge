import { useInfiniteQuery } from '@tanstack/react-query';

import { searchMovies } from '../api/movie.api';
import type { MovieFilters } from '../model/movie-filters';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useInfiniteMovieSearch(query: string, filters?: MovieFilters) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: movieQueryKeys.search(query, filters),
    queryFn: ({ pageParam }) => searchMovies(query, pageParam, filters),
    enabled: query.trim().length > 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}
