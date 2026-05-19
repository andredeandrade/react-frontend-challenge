import { CheckIcon, PlusIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useMovieCredits, useMovieDetails, useMovieVideos } from '@/entities/movie';
import type { Movie } from '@/entities/movie/model/movie.types';
import { useWatchlistStore } from '@/entities/movie/model/watchlist.store';
import { buildImageUrl } from '@/shared/lib/tmdb';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

export function MovieDetailsPage() {
  const { movieId } = useParams();
  const parsedId = Number(movieId);
  const isValidId = Number.isFinite(parsedId) && parsedId > 0;

  const { data, isLoading, isError, error } = useMovieDetails(parsedId);
  const { data: creditsData } = useMovieCredits(parsedId);
  const { data: videosData } = useMovieVideos(parsedId);
  const isInWatchlist = useWatchlistStore((state) => state.isInWatchlist(parsedId));
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);

  if (!isValidId) {
    return (
      <section className="space-y-4 px-5 py-5">
        <p className="text-sm text-destructive">Filme invalido.</p>
        <Button asChild type="button" variant="outline" size="sm">
          <Link to="/descobrir">Voltar para descoberta</Link>
        </Button>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="space-y-4 px-5 py-5">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-5 md:grid-cols-[280px_1fr]">
          <Skeleton className="aspect-[2/3] w-full" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="space-y-4 px-5 py-5">
        <p className="text-sm text-destructive">
          Falha ao carregar detalhes:{' '}
          {error instanceof Error ? error.message : 'Erro desconhecido'}
        </p>
        <Button asChild type="button" variant="outline" size="sm">
          <Link to="/descobrir">Voltar para descoberta</Link>
        </Button>
      </section>
    );
  }

  const posterUrl = buildImageUrl(data.poster_path, 'w500');
  const topCast = (creditsData?.cast ?? [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .slice(0, 8);

  const trailer = (videosData?.results ?? []).find(
    (video) =>
      video.site.toLowerCase() === 'youtube' &&
      video.type.toLowerCase() === 'trailer',
  );

  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;

  const watchlistMovie: Movie = {
    id: data.id,
    title: data.title,
    original_title: data.original_title,
    overview: data.overview,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    release_date: data.release_date,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    popularity: data.popularity,
    genre_ids: data.genres.map((genre) => genre.id),
    adult: data.adult,
    original_language: data.original_language,
    video: data.video,
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(data.id);
      toast.info(`"${data.title}" removido da sua lista.`);
      return;
    }

    addToWatchlist(watchlistMovie);
    toast.success(`"${data.title}" adicionado na sua lista.`);
  };

  return (
    <section className="space-y-5 px-5 py-5">
      <Button asChild type="button" variant="outline" size="sm">
        <Link to="/descobrir">Voltar</Link>
      </Button>

      <div className="grid gap-5 md:grid-cols-[280px_1fr]">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster do filme ${data.title}`}
            className="aspect-[2/3] w-full rounded-lg object-cover"
          />
        ) : (
          <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
        )}

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {data.title}
          </h1>

          <Button
            type="button"
            variant={isInWatchlist ? 'secondary' : 'outline'}
            size="sm"
            className="w-fit"
            onClick={handleWatchlistToggle}
          >
            {isInWatchlist ? (
              <>
                <CheckIcon className="size-4" />
                Remover da minha lista
              </>
            ) : (
              <>
                <PlusIcon className="size-4" />
                Adicionar a minha lista
              </>
            )}
          </Button>

          <p className="text-sm text-muted-foreground">
            {data.tagline || 'Sem tagline'}
          </p>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Sinopse</h2>
            <p className="text-sm leading-6 text-foreground/90">
              {data.overview || 'Sem sinopse.'}
            </p>
          </div>

          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <strong>Lancamento:</strong>{' '}
              {data.release_date || 'Nao informado'}
            </p>
            <p>
              <strong>Duracao:</strong>{' '}
              {data.runtime ? `${data.runtime} min` : 'Nao informado'}
            </p>
            <p>
              <strong>Nota:</strong> {data.vote_average.toFixed(1)}
            </p>
            <p>
              <strong>Votos:</strong> {data.vote_count}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Elenco</h2>
            {topCast.length > 0 ? (
              <ul className="grid gap-2 text-sm sm:grid-cols-2">
                {topCast.map((castMember) => (
                  <li
                    key={castMember.id}
                    className="rounded-md border border-border/70 px-3 py-2"
                  >
                    <p className="font-medium">{castMember.name}</p>
                    <p className="text-muted-foreground">
                      {castMember.character || 'Sem personagem'}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Elenco nao informado.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Trailer</h2>
            {trailerUrl ? (
              <div className="overflow-hidden rounded-lg border border-border/70">
                <iframe
                  title={`Trailer do filme ${data.title}`}
                  src={trailerUrl}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Trailer nao disponivel.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
