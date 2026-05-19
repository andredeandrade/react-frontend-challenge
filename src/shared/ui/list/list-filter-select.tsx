import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type ListFilterSelectProps = React.ComponentProps<'select'>;

export function ListFilterSelect({
  className,
  children,
  ...props
}: ListFilterSelectProps) {
  return (
    <select
      className={cn(
        'h-9 rounded-md border border-input bg-transparent px-2.5 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}