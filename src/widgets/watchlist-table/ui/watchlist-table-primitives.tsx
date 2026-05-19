import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type PropsWithChildren = {
  children: ReactNode;
};

export function WatchlistTable({ children }: PropsWithChildren) {
  return <table className="min-w-full divide-y divide-border">{children}</table>;
}

export function WatchlistTableHeader({ children }: PropsWithChildren) {
  return <thead className="bg-muted/40">{children}</thead>;
}

export function WatchlistTableBody({ children }: PropsWithChildren) {
  return <tbody className="divide-y divide-border bg-background">{children}</tbody>;
}

export function WatchlistTableRow({ children }: PropsWithChildren) {
  return <tr className="transition-colors hover:bg-muted/30">{children}</tr>;
}

export function WatchlistTableHead({
  children,
  className,
  ...props
}: ComponentProps<'th'>) {
  return (
    <th
      className={cn(
        'px-3 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase sm:px-6',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function WatchlistTableCell({
  children,
  className,
  ...props
}: ComponentProps<'td'>) {
  return (
    <td
      className={cn('px-3 py-4 text-sm text-foreground align-top sm:px-6', className)}
      {...props}
    >
      {children}
    </td>
  );
}