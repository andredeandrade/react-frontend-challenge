import {
  DiscoveryListFilters,
  DiscoveryMovieCardsList,
  ListProvider,
} from '@/widgets/discovery-list';

import { ListPageDescription, ListPageTitle } from '@/shared/ui/list';

export function DiscoveryPage() {
  return (
    <ListProvider>
      <section className="w-full space-y-6">
        <div className="space-y-4 px-5 py-2">
          <div>
            <ListPageTitle>Descobrir</ListPageTitle>
            <ListPageDescription>
              Descubra filmes e adicione os favoritos em Minha Lista.
            </ListPageDescription>
          </div>

          <DiscoveryListFilters />
        </div>

        <DiscoveryMovieCardsList />
      </section>
    </ListProvider>
  );
}
