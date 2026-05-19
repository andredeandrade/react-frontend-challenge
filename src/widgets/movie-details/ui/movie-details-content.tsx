import { MovieDetailsCastSection } from './movie-details-cast-section';
import { MovieDetailsHeader } from './movie-details-header';
import { MovieDetailsInvalidState } from './movie-details-invalid-state';
import { MovieDetailsSkeleton } from './movie-details-skeleton';
import { MovieDetailsTrailerSection } from './movie-details-trailer-section';

import { useMovieDetailsView } from '../model/use-movie-details-view';

type MovieDetailsContentProps = {
  movieId: number;
};

export function MovieDetailsContent({ movieId }: MovieDetailsContentProps) {
  const { detailsQuery, topCast, trailerUrl, posterUrl, isInWatchlist, handleWatchlistToggle } =
    useMovieDetailsView(movieId);

  if (detailsQuery.isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (detailsQuery.isError || !detailsQuery.data) {
    return (
      <MovieDetailsInvalidState
        message={`Falha ao carregar detalhes: ${detailsQuery.error instanceof Error ? detailsQuery.error.message : 'Erro desconhecido'}`}
      />
    );
  }

  const movie = detailsQuery.data;

  return (
    <section className="space-y-5 px-5 py-5">
      <MovieDetailsHeader
        title={movie.title}
        isInWatchlist={isInWatchlist}
        onToggleWatchlist={handleWatchlistToggle}
      />

      <div className="grid gap-5 md:grid-cols-[280px_1fr]">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster do filme ${movie.title}`}
            className="aspect-[2/3] w-full rounded-lg object-cover"
          />
        ) : (
          <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
        )}

        <div className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Sinopse</h2>
            <p className="text-sm leading-6 text-foreground/90">{movie.overview || 'Sem sinopse.'}</p>
          </div>

          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <strong>Lancamento:</strong> {movie.release_date || 'Nao informado'}
            </p>
            <p>
              <strong>Duracao:</strong> {movie.runtime ? `${movie.runtime} min` : 'Nao informado'}
            </p>
            <p>
              <strong>Nota:</strong> {movie.vote_average.toFixed(1)}
            </p>
            <p>
              <strong>Votos:</strong> {movie.vote_count}
            </p>
          </div>

          <MovieDetailsCastSection cast={topCast} />
          <MovieDetailsTrailerSection title={movie.title} trailerUrl={trailerUrl} />
        </div>
      </div>
    </section>
  );
}
