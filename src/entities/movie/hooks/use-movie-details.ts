import { useQuery } from '@tanstack/react-query';

import { getMovieCredits, getMovieDetails, getMovieVideos } from '../api/movie.api';
import { movieQueryKeys } from '../model/movie.query-keys';

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: movieQueryKeys.detail(id),
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });
}

export function useMovieCredits(id: number) {
  return useQuery({
    queryKey: movieQueryKeys.credits(id),
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
}

export function useMovieVideos(id: number) {
  return useQuery({
    queryKey: movieQueryKeys.videos(id),
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
  });
}
