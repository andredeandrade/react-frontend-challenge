import { useMemo, useState } from 'react';
import {
  flexRender,
  type Column,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

import { buildImageUrl } from '@/shared/lib/tmdb';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { type WatchlistRow, useWatchlistRows } from '../model/use-watchlist-rows';
import {
  WatchlistTable,
  WatchlistTableBody,
  WatchlistTableCell,
  WatchlistTableHead,
  WatchlistTableHeader,
  WatchlistTableRow,
} from './watchlist-table-primitives';

function SortIndicator({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (sorted === 'asc') {
    return <ArrowUpIcon className="size-4" aria-hidden />;
  }

  if (sorted === 'desc') {
    return <ArrowDownIcon className="size-4" aria-hidden />;
  }

  return <ArrowUpDownIcon className="size-4 opacity-70" aria-hidden />;
}

function SortableHeader({
  label,
  column,
}: {
  label: string;
  column: Column<WatchlistRow, unknown>;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-auto gap-1 px-0 font-semibold uppercase"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {label}
      <SortIndicator sorted={column.getIsSorted()} />
    </Button>
  );
}

export function WatchlistMoviesTable() {
  const { rows, isLoadingGenres, removeFromWatchlist } = useWatchlistRows();
  const [sorting, setSorting] = useState<SortingState>([]);
  const hiddenOnMobileColumnIds = new Set(['genreLabel', 'release_date']);

  const columns = useMemo<ColumnDef<WatchlistRow>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => <SortableHeader label="Titulo" column={column} />,
        cell: ({ row }) => {
          const movie = row.original;
          const posterUrl = buildImageUrl(movie.poster_path, 'w154');

          return (
            <Link
              to={`/filmes/${movie.id}`}
              className="group flex min-w-0 items-center gap-3"
              aria-label={`Ver detalhes do filme ${movie.title}`}
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`Poster do filme ${movie.title}`}
                  className="h-12 w-9 shrink-0 rounded-sm object-cover sm:h-14 sm:w-10"
                  loading="lazy"
                />
              ) : (
                <div className="h-12 w-9 shrink-0 rounded-sm bg-muted sm:h-14 sm:w-10" aria-hidden />
              )}

              <span className="line-clamp-2 font-medium text-foreground group-hover:underline">
                {movie.title}
              </span>
            </Link>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: 'genreLabel',
        header: ({ column }) => <SortableHeader label="Genero" column={column} />,
        cell: ({ row }) => row.original.genreLabel,
        enableSorting: true,
      },
      {
        accessorKey: 'release_date',
        header: 'Data de Lançamento',
        cell: ({ row }) => row.original.release_date || '-',
        enableSorting: false,
      },
      {
        accessorKey: 'vote_average',
        header: ({ column }) => <SortableHeader label="Rating" column={column} />,
        cell: ({ row }) => row.original.vote_average.toFixed(1),
        enableSorting: true,
      },
      {
        id: 'actions',
        header: 'Ações',
        cell: ({ row }) => (
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => {
              removeFromWatchlist(row.original.id);
              toast.info(`"${row.original.title}" removido da sua lista.`);
            }}
          >
            Remover
          </Button>
        ),
        enableSorting: false,
      },
    ],
    [removeFromWatchlist],
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
      <div className="overflow-x-auto">
        <WatchlistTable>
          <WatchlistTableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <WatchlistTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <WatchlistTableHead
                    key={header.id}
                    className={cn(
                      hiddenOnMobileColumnIds.has(header.column.id) && 'hidden sm:table-cell',
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </WatchlistTableHead>
                ))}
              </WatchlistTableRow>
            ))}
          </WatchlistTableHeader>

          <WatchlistTableBody>
            {table.getRowModel().rows.length === 0 ? (
              <WatchlistTableRow>
                <WatchlistTableCell colSpan={columns.length}>
                  {isLoadingGenres ? 'Carregando watchlist...' : 'Nenhum filme adicionado a minha lista.'}
                </WatchlistTableCell>
              </WatchlistTableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <WatchlistTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <WatchlistTableCell
                      key={cell.id}
                      className={cn(
                        hiddenOnMobileColumnIds.has(cell.column.id) && 'hidden sm:table-cell',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </WatchlistTableCell>
                  ))}
                </WatchlistTableRow>
              ))
            )}
          </WatchlistTableBody>
        </WatchlistTable>
      </div>
    </div>
  );
}