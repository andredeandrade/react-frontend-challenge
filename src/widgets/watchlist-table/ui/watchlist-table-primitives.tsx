import type { ComponentProps, ReactNode } from 'react';

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

export function WatchlistTableHead({ children }: PropsWithChildren) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
      {children}
    </th>
  );
}

export function WatchlistTableCell({ children, ...props }: ComponentProps<'td'>) {
  return (
    <td className="px-6 py-4 text-sm whitespace-nowrap text-foreground" {...props}>
      {children}
    </td>
  );
}