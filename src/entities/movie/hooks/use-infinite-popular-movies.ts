import { useInfiniteQuery } from '@tanstack/react-query';

import { getPopularMovies } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useInfinitePopularMovies() {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: movieQueryKeys.popular(),
    queryFn: ({ pageParam }) => getPopularMovies(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}