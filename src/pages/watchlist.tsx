import { WatchlistMoviesTable } from '@/widgets/watchlist-table';

export function WatchlistPage() {
  return (
    <section className="w-full space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">Minha Lista</h1>
      <WatchlistMoviesTable />
    </section>
  );
}
