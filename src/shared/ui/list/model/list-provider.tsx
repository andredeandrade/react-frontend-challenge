import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseParamNumber } from '@/widgets/discovery-list/model/parse-param-number';
import type { ListContextValue } from '../types/list-context';

export type ListProviderProps = {
  children: ReactNode;
};

const ListContext = createContext<ListContextValue | null>(null);

export function ListProvider({ children }: ListProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get('q') ?? '');
  const [debouncedSearch, setDebouncedSearch] = useState(() =>
    (searchParams.get('q') ?? '').trim(),
  );
  const [selectedGenreId, setSelectedGenreId] = useState(
    () => searchParams.get('genre') ?? '',
  );
  const [year, setYear] = useState(() => searchParams.get('year') ?? '');
  const [minRating, setMinRating] = useState(
    () => searchParams.get('rating') ?? '',
  );

  const filters = useMemo(
    () => ({
      genreId: parseParamNumber(selectedGenreId),
      year: parseParamNumber(year),
      minRating: parseParamNumber(minRating),
    }),
    [selectedGenreId, year, minRating],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);
    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const nextSearchParams = new URLSearchParams();
    if (debouncedSearch) nextSearchParams.set('q', debouncedSearch);
    if (selectedGenreId) nextSearchParams.set('genre', selectedGenreId);
    if (year) nextSearchParams.set('year', year);
    if (minRating) nextSearchParams.set('rating', minRating);
    setSearchParams(nextSearchParams, { replace: true });
  }, [debouncedSearch, selectedGenreId, year, minRating, setSearchParams]);

  const value = useMemo<ListContextValue>(
    () => ({
      search,
      setSearch,
      debouncedSearch,
      selectedGenreId,
      setSelectedGenreId,
      year,
      setYear,
      minRating,
      setMinRating,
      filters,
    }),
    [search, debouncedSearch, selectedGenreId, year, minRating, filters],
  );

  return (
    <ListContext.Provider value={value}>{children}</ListContext.Provider>
  );
}

export function useList() {
  const context = useContext(ListContext);
  if (!context) throw new Error('useList must be used within ListProvider');
  return context;
}
