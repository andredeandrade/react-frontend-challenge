import type { MovieFilters } from '@/entities/movie';

export type ListContextValue = {
  search: string;
  setSearch: (value: string) => void;
  debouncedSearch: string;
  selectedGenreId: string;
  setSelectedGenreId: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  minRating: string;
  setMinRating: (value: string) => void;
  filters: MovieFilters;
};
