import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';

type ListFilterNumberInputProps = React.ComponentProps<typeof Input>;

export function ListFilterNumberInput({
  className,
  type,
  ...props
}: ListFilterNumberInputProps) {
  return <Input type={type ?? 'number'} className={cn('w-full', className)} {...props} />;
}