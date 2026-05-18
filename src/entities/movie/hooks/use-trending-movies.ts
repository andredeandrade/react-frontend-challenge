import { useQuery } from '@tanstack/react-query';

import { getTrendingMovies } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';
import type { TimeWindow } from '../model/movie.types';

export function useTrendingMovies(timeWindow: TimeWindow = 'week') {
  return useQuery({
    queryKey: movieQueryKeys.trending(timeWindow),
    queryFn: () => getTrendingMovies(timeWindow),
  });
}
