import { ListPageDescription, ListPageTitle } from '@/shared/ui/list';
import { PopularMovieCardsList } from '@/widgets/popular-list';

export function PopularPage() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-4 px-5 py-2">
        <div>
          <ListPageTitle>Populares</ListPageTitle>
          <ListPageDescription>
            Filmes populares para voce descobrir agora.
          </ListPageDescription>
        </div>
      </div>

      <PopularMovieCardsList />
    </section>
  );
}