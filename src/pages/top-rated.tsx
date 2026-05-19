import { ListPageDescription, ListPageTitle } from '@/shared/ui/list';
import { TopRatedMovieCardsList } from '@/widgets/top-rated-list';

export function TopRatedPage() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-4 px-5 py-2">
        <div>
          <ListPageTitle>Mais Bem Avaliados</ListPageTitle>
          <ListPageDescription>
            Filmes com as melhores avaliacoes para voce descobrir.
          </ListPageDescription>
        </div>
      </div>

      <TopRatedMovieCardsList />
    </section>
  );
}