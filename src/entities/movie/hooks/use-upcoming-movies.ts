import { useQuery } from '@tanstack/react-query';

import { getUpcomingMovies } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: movieQueryKeys.upcoming(page),
    queryFn: () => getUpcomingMovies(page),
  });
}
