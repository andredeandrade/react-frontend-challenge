import { MovieCard, useTrendingMovies } from '@/entities/movie';
import { Skeleton } from '@/shared/ui/skeleton';

export function TrendingMovieCardsList() {
  const { data, isLoading, isError, error } = useTrendingMovies('week', 1);

  const movies = data?.results ?? [];

  return (
    <div className="space-y-5">
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[2/3] w-full" />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">
            Falha ao carregar filmes em alta:{' '}
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </p>
        </div>
      ) : null}

      {!isLoading && !isError && movies.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum filme em alta encontrado no momento.
          </p>
        </div>
      ) : null}

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : null}
    </div>
  );
}