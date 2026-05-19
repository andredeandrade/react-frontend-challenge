import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { SearchInput } from '@/shared/ui/search-input';

type ListFilterSearchInputProps = React.ComponentProps<typeof SearchInput>;

export function ListFilterSearchInput({
  className,
  ...props
}: ListFilterSearchInputProps) {
  return <SearchInput className={cn('w-full min-w-72', className)} {...props} />;
}