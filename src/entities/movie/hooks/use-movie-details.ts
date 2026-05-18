import { useQuery } from '@tanstack/react-query';

import { getMovieDetails } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: movieQueryKeys.detail(id),
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });
}
