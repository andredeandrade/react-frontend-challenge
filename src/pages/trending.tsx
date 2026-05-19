import { ListPageDescription, ListPageTitle } from '@/shared/ui/list';
import { TrendingMovieCardsList } from '@/widgets/trending-list';

export function TrendingPage() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-4 px-5 py-2">
        <div>
          <ListPageTitle>Em Alta</ListPageTitle>
          <ListPageDescription>
            Filmes que estão em destaque nesta semana.
          </ListPageDescription>
        </div>
      </div>

      <TrendingMovieCardsList />
    </section>
  );
}