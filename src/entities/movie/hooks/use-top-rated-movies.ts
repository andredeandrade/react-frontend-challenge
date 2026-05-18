import { useQuery } from '@tanstack/react-query';

import { getTopRatedMovies } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: movieQueryKeys.topRated(page),
    queryFn: () => getTopRatedMovies(page),
  });
}
