import { usePopularMovies } from '@/entities/movie';
import { buildImageUrl } from '@/shared/lib/tmdb';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export function DashboardPage() {
  const { data, isLoading, isError, error } = usePopularMovies(1);

  const movies = data?.results ?? [];

  return (
    <Card className="w-full border border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold tracking-tight">
          Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 border-t border-border/60 pt-4">
          <h2 className="text-lg font-semibold">Filmes Populares (TMDB)</h2>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : null}

          {isError ? (
            <p className="text-sm text-destructive">
              Falha ao carregar filmes:{' '}
              {error instanceof Error ? error.message : 'Erro desconhecido'}
            </p>
          ) : null}

          {!isLoading && !isError && movies.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum filme encontrado.
            </p>
          ) : null}

          {!isLoading && !isError && movies.length > 0 ? (
            <ul className="space-y-2">
              {movies.slice(0, 8).map((movie) => {
                const posterUrl = buildImageUrl(movie.poster_path, 'w92');

                return (
                  <li
                    key={movie.id}
                    className="flex items-center gap-3 rounded-md border border-border/60 p-2"
                  >
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={`Poster do filme ${movie.title}`}
                        className="h-12 w-8 rounded object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-12 w-8 rounded bg-muted" />
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {movie.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Nota: {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
