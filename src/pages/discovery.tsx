import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  MovieCard,
  useInfiniteDiscoverMovies,
  useInfiniteMovieSearch,
  useMovieGenres,
  type MovieFilters,
  type Movie,
} from '@/entities/movie';
import { Input } from '@/shared/ui/input';
import { SearchInput } from '@/shared/ui/search-input';
import { Skeleton } from '@/shared/ui/skeleton';

function parseParamNumber(value: string | null): number | undefined {
  if (!value) return undefined;

  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue)) return undefined;

  return parsedValue;
}

export function DiscoveryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get('q') ?? '');
  const [debouncedSearch, setDebouncedSearch] = useState(() =>
    (searchParams.get('q') ?? '').trim(),
  );
  const [selectedGenreId, setSelectedGenreId] = useState(
    () => searchParams.get('genre') ?? '',
  );
  const [year, setYear] = useState(() => searchParams.get('year') ?? '');
  const [minRating, setMinRating] = useState(
    () => searchParams.get('rating') ?? '',
  );
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filters = useMemo<MovieFilters>(
    () => ({
      genreId: parseParamNumber(selectedGenreId),
      year: parseParamNumber(year),
      minRating: parseParamNumber(minRating),
    }),
    [selectedGenreId, year, minRating],
  );

  const discoverQuery = useInfiniteDiscoverMovies(filters);
  const searchQuery = useInfiniteMovieSearch(debouncedSearch, filters);
  const genresQuery = useMovieGenres();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    const nextSearchParams = new URLSearchParams();

    if (debouncedSearch) {
      nextSearchParams.set('q', debouncedSearch);
    }

    if (selectedGenreId) {
      nextSearchParams.set('genre', selectedGenreId);
    }

    if (year) {
      nextSearchParams.set('year', year);
    }

    if (minRating) {
      nextSearchParams.set('rating', minRating);
    }

    setSearchParams(nextSearchParams, { replace: true });
  }, [debouncedSearch, selectedGenreId, year, minRating, setSearchParams]);

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
    const genreIdValue = parseParamNumber(selectedGenreId);
    const yearValue = parseParamNumber(year);
    const minRatingValue = parseParamNumber(minRating);

    return movies.filter((movie) => {
      if (genreIdValue && !movie.genre_ids.includes(genreIdValue)) {
        return false;
      }

      if (yearValue) {
        const movieYear = Number(movie.release_date?.slice(0, 4));
        if (movieYear !== yearValue) {
          return false;
        }
      }

      if (minRatingValue && movie.vote_average < minRatingValue) {
        return false;
      }

      return true;
    });
  }, [movies, selectedGenreId, year, minRating]);

  const showInitialLoading = isLoading && movies.length === 0;
  const showNextPageLoading = isFetchingNextPage && movies.length > 0;
  const showEmptyState =
    !showInitialLoading && !isError && filteredMovies.length === 0;

  const filterInputClassName =
    'h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30';

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      {
        rootMargin: '240px 0px',
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className="w-full space-y-6">
      <div className="space-y-4 px-5 py-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Descobrir</h1>
          <p className="text-sm text-muted-foreground">
            Descubra filmes e adicione os favoritos em Minha Lista.
          </p>
        </div>

        <SearchInput
          className="max-w-xl"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar filmes por titulo..."
          aria-label="Buscar filmes por titulo"
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <select
            value={selectedGenreId}
            onChange={(event) => setSelectedGenreId(event.target.value)}
            className={filterInputClassName}
            aria-label="Filtrar por genero"
          >
            <option value="">Todos os generos</option>
            {(genresQuery.data?.genres ?? []).map((genre) => (
              <option key={genre.id} value={String(genre.id)}>
                {genre.name}
              </option>
            ))}
          </select>

          <Input
            type="number"
            min={1900}
            max={2100}
            value={year}
            onChange={(event) => setYear(event.target.value)}
            placeholder="Ano (ex: 2024)"
            aria-label="Filtrar por ano"
          />

          <select
            value={minRating}
            onChange={(event) => setMinRating(event.target.value)}
            className={filterInputClassName}
            aria-label="Filtrar por nota minima"
          >
            <option value="">Nota minima</option>
            <option value="5">5.0+</option>
            <option value="6">6.0+</option>
            <option value="7">7.0+</option>
            <option value="8">8.0+</option>
            <option value="9">9.0+</option>
          </select>
        </div>
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

        {filteredMovies.length > 0 ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div
              ref={loadMoreRef}
              className="flex min-h-10 items-center justify-center"
            >
              {!hasNextPage && !isFetchingNextPage ? (
                <p className="text-sm text-muted-foreground">
                  Sem mais resultados.
                </p>
              ) : null}
            </div>
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
    </section>
  );
}
