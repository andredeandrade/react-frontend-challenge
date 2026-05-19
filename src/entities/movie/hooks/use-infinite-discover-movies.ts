import { useInfiniteQuery } from '@tanstack/react-query';

import { getDiscoveredMovies } from '../api/movie.api';
import type { MovieFilters } from '../model/movie-filters';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useInfiniteDiscoverMovies(filters?: MovieFilters) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: movieQueryKeys.discover(filters),
    queryFn: ({ pageParam }) => getDiscoveredMovies(pageParam, filters),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}
