import { ListPageDescription, ListPageTitle } from '@/shared/ui/list';
import { UpcomingMovieCardsList } from '@/widgets/upcoming-list';

export function UpcomingPage() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-4 px-5 py-2">
        <div>
          <ListPageTitle>Em Breve</ListPageTitle>
          <ListPageDescription>
            Filmes com lançamento proximo para voce acompanhar.
          </ListPageDescription>
        </div>
      </div>

      <UpcomingMovieCardsList />
    </section>
  );
}
