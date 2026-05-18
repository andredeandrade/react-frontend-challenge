import { useEffect, useMemo, useState } from 'react';

import { MovieCard, useTrendingMovies, type Movie } from '@/entities/movie';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

export function DiscoveryPage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  const { data, isLoading, isFetching, isError, error } = useTrendingMovies(
    'week',
    page,
  );

  useEffect(() => {
    if (!data?.results) return;

    setMovies((previous) => {
      const existingIds = new Set(previous.map((movie) => movie.id));
      const newMovies = data.results.filter(
        (movie) => !existingIds.has(movie.id),
      );
      return [...previous, ...newMovies];
    });
  }, [data]);

  const hasMore = useMemo(() => {
    if (!data) return false;
    return page < data.total_pages;
  }, [data, page]);

  const showInitialLoading = isLoading && movies.length === 0;
  const showEmptyState = !showInitialLoading && !isError && movies.length === 0;

  return (
    <section className="w-full space-y-6">
      <div className="px-5 py-5">
        <h1 className="text-3xl font-semibold tracking-tight">Descobrir</h1>
        <p className="text-sm text-muted-foreground">
          Filmes em tendencia da semana carregados via TMDB API.
        </p>
      </div>

      <div className="space-y-5">
        {showInitialLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="aspect-[2/3] w-full" />
            ))}
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-sm text-destructive">
              Falha ao carregar filmes:{' '}
              {error instanceof Error ? error.message : 'Erro desconhecido'}
            </p>
          </div>
        ) : null}

        {showEmptyState ? (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum filme encontrado no momento.
            </p>
          </div>
        ) : null}

        {movies.length > 0 ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPage((previous) => previous + 1)}
                disabled={!hasMore || isFetching}
              >
                {isFetching
                  ? 'Carregando...'
                  : hasMore
                    ? 'Carregar mais'
                    : 'Sem mais resultados'}
              </Button>
            </div>
          </div>
        ) : null}

        {isFetching && movies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="aspect-[2/3] w-full" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
