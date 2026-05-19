import { ListFilterNumberInput } from '@/shared/ui/list';

type FilterYearProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  ariaLabel?: string;
};

export function FilterYear({
  value,
  onChange,
  className,
  min = 1900,
  max = 2100,
  placeholder = 'Ano (ex: 2024)',
  ariaLabel = 'Filtrar por ano',
}: FilterYearProps) {
  return (
    <ListFilterNumberInput
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={className}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
}