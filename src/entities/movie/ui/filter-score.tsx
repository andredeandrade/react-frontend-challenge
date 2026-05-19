import { ListFilterSelect } from '@/shared/ui/list';

type FilterScoreProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
  placeholderLabel?: string;
};

const defaultScoreOptions = ['5', '6', '7', '8', '9'];

export function FilterScore({
  value,
  onChange,
  className,
  ariaLabel = 'Filtrar por nota minima',
  placeholderLabel = 'Nota minima',
}: FilterScoreProps) {
  return (
    <ListFilterSelect
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={className}
      aria-label={ariaLabel}
    >
      <option value="">{placeholderLabel}</option>
      {defaultScoreOptions.map((score) => (
        <option key={score} value={score}>
          {score}.0+
        </option>
      ))}
    </ListFilterSelect>
  );
}