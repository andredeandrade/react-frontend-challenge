import { useQuery } from '@tanstack/react-query';

import { getPopularMovies } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: movieQueryKeys.popular(page),
    queryFn: () => getPopularMovies(page),
  });
}
