import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type ListFiltersContainerProps = React.ComponentProps<'div'>;

export function ListFiltersContainer({
  className,
  ...props
}: ListFiltersContainerProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 overflow-x-auto pb-1',
        className,
      )}
      {...props}
    />
  );
}