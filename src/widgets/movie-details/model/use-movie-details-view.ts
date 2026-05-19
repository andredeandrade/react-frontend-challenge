import { useMemo } from 'react';
import { toast } from 'sonner';

import { useMovieCredits, useMovieDetails, useMovieVideos } from '@/entities/movie';
import type { Movie } from '@/entities/movie/model/movie.types';
import { useWatchlistStore } from '@/entities/movie/model/watchlist.store';
import { buildImageUrl } from '@/shared/lib/tmdb';

type TopCastMember = {
  id: number;
  name: string;
  character: string;
};

export function useMovieDetailsView(movieId: number) {
  const detailsQuery = useMovieDetails(movieId);
  const creditsQuery = useMovieCredits(movieId);
  const videosQuery = useMovieVideos(movieId);

  const isInWatchlist = useWatchlistStore((state) => state.isInWatchlist(movieId));
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);

  const topCast = useMemo<TopCastMember[]>(() => {
    const cast = creditsQuery.data?.cast ?? [];

    return cast
      .slice()
      .sort((a, b) => a.order - b.order)
      .slice(0, 8)
      .map((member) => ({
        id: member.id,
        name: member.name,
        character: member.character || 'Sem personagem',
      }));
  }, [creditsQuery.data?.cast]);

  const trailerUrl = useMemo(() => {
    const trailer = (videosQuery.data?.results ?? []).find(
      (video) =>
        video.site.toLowerCase() === 'youtube' &&
        video.type.toLowerCase() === 'trailer',
    );

    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  }, [videosQuery.data?.results]);

  const posterUrl = useMemo(
    () => buildImageUrl(detailsQuery.data?.poster_path ?? null, 'w500'),
    [detailsQuery.data?.poster_path],
  );

  const handleWatchlistToggle = () => {
    const movie = detailsQuery.data;

    if (!movie) {
      return;
    }

    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
      toast.info(`"${movie.title}" removido da sua lista.`);
      return;
    }

    const watchlistMovie: Movie = {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      genre_ids: movie.genres.map((genre) => genre.id),
      adult: movie.adult,
      original_language: movie.original_language,
      video: movie.video,
    };

    addToWatchlist(watchlistMovie);
    toast.success(`"${movie.title}" adicionado na sua lista.`);
  };

  return {
    detailsQuery,
    topCast,
    trailerUrl,
    posterUrl,
    isInWatchlist,
    handleWatchlistToggle,
  };
}
