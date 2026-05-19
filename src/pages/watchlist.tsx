import { type ReactNode, useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useMovieGenres } from '@/entities/movie';
import type { Movie } from '@/entities/movie/model/movie.types';
import { useWatchlistStore } from '@/entities/movie/model/watchlist.store';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';

const Table = ({ children }: { children: ReactNode }) => (
  <table className="min-w-full divide-y divide-gray-200">{children}</table>
);

const TableHeader = ({ children }: { children: ReactNode }) => (
  <thead className="bg-gray-50">{children}</thead>
);

const TableBody = ({ children }: { children: ReactNode }) => (
  <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
);

const TableRow = ({ children }: { children: ReactNode }) => <tr>{children}</tr>;

const TableHead = ({ children }: { children: ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
    {children}
  </th>
);

const TableCell = ({ children }: { children: ReactNode }) => (
  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{children}</td>
);

type WatchlistRow = Movie & {
  genreLabel: string;
};

export function WatchlistPage() {
  const watchlist = useWatchlistStore((state) => state.watchlist);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);
  const genresQuery = useMovieGenres();
  const [sorting, setSorting] = useState<SortingState>([]);

  const genreMap = useMemo(
    () =>
      new Map((genresQuery.data?.genres ?? []).map((genre) => [genre.id, genre.name] as const)),
    [genresQuery.data?.genres]
  );

  const tableRows = useMemo<WatchlistRow[]>(() => {
    return watchlist.map((movie) => {
      const genreNames = movie.genre_ids
        .map((genreId) => genreMap.get(genreId))
        .filter((name): name is string => Boolean(name));

      return {
        ...movie,
        genreLabel: genreNames.join(', ') || 'Sem genero',
      };
    });
  }, [watchlist, genreMap]);

  const columns = useMemo<ColumnDef<WatchlistRow>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto px-0 font-semibold uppercase"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Título
          </Button>
        ),
        cell: ({ row }) => row.original.title,
        enableSorting: true,
      },
      {
        accessorKey: 'genreLabel',
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto px-0 font-semibold uppercase"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Gênero
          </Button>
        ),
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
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto px-0 font-semibold uppercase"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Rating
          </Button>
        ),
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
    [removeFromWatchlist]
  );

  const table = useReactTable({
    data: tableRows,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Minha Watchlist</h1>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell>
                {genresQuery.isLoading ? 'Carregando watchlist...' : 'Nenhum filme na watchlist.'}
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
