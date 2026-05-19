import { useMemo } from 'react';

import { useMovieGenres } from '@/entities/movie';
import type { Movie } from '@/entities/movie/model/movie.types';
import { useWatchlistStore } from '@/entities/movie/model/watchlist.store';

export type WatchlistRow = Movie & {
  genreLabel: string;
};

export function useWatchlistRows() {
  const watchlist = useWatchlistStore((state) => state.watchlist);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);
  const genresQuery = useMovieGenres();

  const genreMap = useMemo(
    () =>
      new Map((genresQuery.data?.genres ?? []).map((genre) => [genre.id, genre.name] as const)),
    [genresQuery.data?.genres],
  );

  const rows = useMemo<WatchlistRow[]>(() => {
    return watchlist.map((movie) => {
      const genreNames = movie.genre_ids
        .map((genreId) => genreMap.get(genreId))
        .filter((name): name is string => Boolean(name));

      return {
        ...movie,
        genreLabel: genreNames.join(', ') || 'Sem genero',
      };
    });
  }, [watchlist, genreMap]);

  return {
    rows,
    isLoadingGenres: genresQuery.isLoading,
    removeFromWatchlist,
  };
}