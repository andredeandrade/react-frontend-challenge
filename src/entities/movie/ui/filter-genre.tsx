import { useMovieGenres } from '../hooks/use-discover-movies';
import { ListFilterSelect } from '@/shared/ui/list';

type FilterGenreProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
  allGenresLabel?: string;
};

export function FilterGenre({
  value,
  onChange,
  className,
  ariaLabel = 'Filtrar por genero',
  allGenresLabel = 'Todos os generos',
}: FilterGenreProps) {
  const genresQuery = useMovieGenres();

  return (
    <ListFilterSelect
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={className}
      aria-label={ariaLabel}
    >
      <option value="">{allGenresLabel}</option>
      {(genresQuery.data?.genres ?? []).map((genre) => (
        <option key={genre.id} value={String(genre.id)}>
          {genre.name}
        </option>
      ))}
    </ListFilterSelect>
  );
}