import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type ListPageTitleProps = React.ComponentProps<'h1'>;

export function ListPageTitle({ className, ...props }: ListPageTitleProps) {
  return (
    <h1
      className={cn('text-3xl font-semibold tracking-tight', className)}
      {...props}
    />
  );
}