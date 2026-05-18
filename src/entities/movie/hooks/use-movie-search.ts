import { useQuery } from '@tanstack/react-query';

import { searchMovies } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useMovieSearch(query: string, page = 1) {
  return useQuery({
    queryKey: movieQueryKeys.search(query, page),
    queryFn: () => searchMovies(query, page),
    enabled: query.trim().length > 0,
  });
}
