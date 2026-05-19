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
        'grid w-full grid-cols-3 gap-3 lg:flex lg:items-center lg:gap-3 lg:overflow-x-auto lg:pb-1',
        className,
      )}
      {...props}
    />
  );
}