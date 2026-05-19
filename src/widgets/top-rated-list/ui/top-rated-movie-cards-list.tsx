import { useMemo } from 'react';

import { MovieCard, useInfiniteTopRatedMovies, type Movie } from '@/entities/movie';
import { InfiniteScrollTrigger } from '@/shared/ui/infinite-scroll-trigger';
import { Skeleton } from '@/shared/ui/skeleton';

export function TopRatedMovieCardsList() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteTopRatedMovies();

  const movies = useMemo<Movie[]>(() => {
    const pages = data?.pages ?? [];
    const seenMovieIds = new Set<number>();

    return pages.flatMap((page) =>
      page.results.filter((movie) => {
        if (seenMovieIds.has(movie.id)) {
          return false;
        }

        seenMovieIds.add(movie.id);
        return true;
      }),
    );
  }, [data]);

  const showInitialLoading = isLoading && movies.length === 0;
  const showNextPageLoading = isFetchingNextPage && movies.length > 0;

  return (
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
            Falha ao carregar filmes mais bem avaliados:{' '}
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </p>
        </div>
      ) : null}

      {!isLoading && !isError && movies.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum filme mais bem avaliado encontrado no momento.
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

          <InfiniteScrollTrigger
            enabled={!!hasNextPage}
            loading={isFetchingNextPage}
            onLoadMore={fetchNextPage}
            className="flex min-h-10 items-center justify-center"
          />
          {!hasNextPage && !isFetchingNextPage ? (
            <p className="text-sm text-muted-foreground text-center">Sem mais resultados.</p>
          ) : null}
        </div>
      ) : null}

      {showNextPageLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[2/3] w-full" />
          ))}
        </div>
      ) : null}
    </div>
  );
}