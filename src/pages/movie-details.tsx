import { Link, useParams } from 'react-router-dom';

import { useMovieDetails } from '@/entities/movie';
import { buildImageUrl } from '@/shared/lib/tmdb';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

export function MovieDetailsPage() {
  const { movieId } = useParams();
  const parsedId = Number(movieId);
  const isValidId = Number.isFinite(parsedId) && parsedId > 0;

  const { data, isLoading, isError, error } = useMovieDetails(parsedId);

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
          <p className="text-sm text-muted-foreground">
            {data.tagline || 'Sem tagline'}
          </p>
          <p className="text-sm leading-6 text-foreground/90">
            {data.overview || 'Sem sinopse.'}
          </p>

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
        </div>
      </div>
    </section>
  );
}
