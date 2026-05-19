import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type ListPageDescriptionProps = React.ComponentProps<'p'>;

export function ListPageDescription({
  className,
  ...props
}: ListPageDescriptionProps) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
}