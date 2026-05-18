import * as React from 'react';
import { SearchIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';

function SearchInput({
  className,
  inputClassName,
  ...props
}: React.ComponentProps<'input'> & {
  inputClassName?: string;
}) {
  return (
    <div className={cn('relative w-full', className)}>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input {...props} type="search" className={cn('pl-8', inputClassName)} />
    </div>
  );
}

export { SearchInput };
