import { useMemo } from 'react';

import {
  MovieCard,
  useInfiniteDiscoverMovies,
  useInfiniteMovieSearch,
  type Movie,
} from '@/entities/movie';
import { Skeleton } from '@/shared/ui/skeleton';

import { InfiniteScrollTrigger } from '@/shared/ui/infinite-scroll-trigger';

import { useList } from '@/shared/ui/list/model/list-provider';

export function DiscoveryMovieCardsList() {
  const { debouncedSearch, filters } = useList();

  const discoverQuery = useInfiniteDiscoverMovies(filters);
  const searchQuery = useInfiniteMovieSearch(debouncedSearch, filters);

  const activeQuery = debouncedSearch ? searchQuery : discoverQuery;
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = activeQuery;

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

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      if (filters.genreId && !movie.genre_ids.includes(filters.genreId)) {
        return false;
      }

      if (filters.year) {
        const movieYear = Number(movie.release_date?.slice(0, 4));
        if (movieYear !== filters.year) {
          return false;
        }
      }

      if (filters.minRating && movie.vote_average < filters.minRating) {
        return false;
      }

      return true;
    });
  }, [movies, filters]);

  const showInitialLoading = isLoading && movies.length === 0;
  const showNextPageLoading = isFetchingNextPage && movies.length > 0;
  const showEmptyState =
    !showInitialLoading && !isError && filteredMovies.length === 0;


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

      {filteredMovies.length > 0 ? (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {filteredMovies.map((movie) => (
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