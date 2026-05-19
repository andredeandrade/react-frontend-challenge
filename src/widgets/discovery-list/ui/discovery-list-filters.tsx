import { FilterGenre, FilterScore, FilterYear } from '@/entities/movie';
import { ListFilterSearchInput, ListFiltersContainer } from '@/shared/ui/list';

import { useList } from '@/shared/ui/list/model/list-provider';

export function DiscoveryListFilters() {
  const {
    search,
    setSearch,
    selectedGenreId,
    setSelectedGenreId,
    year,
    setYear,
    minRating,
    setMinRating,
  } = useList();

  return (
    <ListFiltersContainer>
      <ListFilterSearchInput
        className="col-span-full w-full min-w-0 lg:flex-[1.6]"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar filmes por titulo..."
        aria-label="Buscar filmes por titulo"
      />

      <FilterGenre
        value={selectedGenreId}
        onChange={setSelectedGenreId}
        className="w-full min-w-0 lg:flex-1"
      />

      <FilterYear
        value={year}
        onChange={setYear}
        className="w-full min-w-0 lg:flex-1"
      />

      <FilterScore
        value={minRating}
        onChange={setMinRating}
        className="w-full min-w-0 lg:flex-1"
      />
    </ListFiltersContainer>
  );
}