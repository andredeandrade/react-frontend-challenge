import { useInfiniteQuery } from '@tanstack/react-query';

import { getTrendingMovies } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';
import type { TimeWindow } from '../model/movie.types';

export function useInfiniteTrendingMovies(timeWindow: TimeWindow = 'week') {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: movieQueryKeys.trending(timeWindow),
    queryFn: ({ pageParam }) => getTrendingMovies(timeWindow, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}