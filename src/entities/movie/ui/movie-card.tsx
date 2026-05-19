import type { Movie } from '../model/movie.types';
import { useWatchlistStore } from '../model/watchlist.store';

import { buildImageUrl } from '@/shared/lib/tmdb';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = buildImageUrl(movie.poster_path, 'w342');
  const isInWatchlist = useWatchlistStore((state) => state.isInWatchlist(movie.id));
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);

  const detailsPath = `/filmes/${movie.id}`;

  return (
    <Card className="h-full border border-border/70 py-0">
      <Link
        to={detailsPath}
        aria-label={`Ver detalhes do filme ${movie.title}`}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster do filme ${movie.title}`}
            className="aspect-[2/3] w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="aspect-[2/3] w-full bg-muted" />
        )}
      </Link>

      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="line-clamp-1 text-base font-semibold">
          {movie.title}
        </CardTitle>
        <CardDescription>
          Lancamento: {movie.release_date || 'Nao informado'}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Nota: {movie.vote_average.toFixed(1)}
          </p>

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant={isInWatchlist ? 'secondary' : 'outline'}
              size="sm"
              className="cursor-pointer"
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(movie.id);
                  toast.info(`"${movie.title}" removido da sua lista.`);
                  return;
                }

                addToWatchlist(movie);
                toast.success(`"${movie.title}" adicionado na sua lista.`);
              }}
            >
              {isInWatchlist ? (
                <>
                  <CheckIcon className="size-4" />
                  Na lista
                </>
              ) : (
                <>
                  <PlusIcon className="size-4" />
                  Minha lista
                </>
              )}
            </Button>

            <Button asChild type="button" variant="outline" size="sm">
              <Link to={detailsPath}>Ver detalhes</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
