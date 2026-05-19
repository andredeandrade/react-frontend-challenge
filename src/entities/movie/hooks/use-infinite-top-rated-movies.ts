import { useInfiniteQuery } from '@tanstack/react-query';

import { getTopRatedMovies } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useInfiniteTopRatedMovies() {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: movieQueryKeys.topRated(),
    queryFn: ({ pageParam }) => getTopRatedMovies(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}