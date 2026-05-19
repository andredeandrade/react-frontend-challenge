import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '../model/movie.types';

interface WatchlistState {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (movie: Movie) => {
        set((state: WatchlistState) => {
          if (state.watchlist.some((item: Movie) => item.id === movie.id)) {
            return state;
          }

          return {
            watchlist: [...state.watchlist, movie],
          };
        });
      },
      removeFromWatchlist: (movieId: number) => {
        set((state: WatchlistState) => ({
          watchlist: state.watchlist.filter((movie: Movie) => movie.id !== movieId),
        }));
      },
      isInWatchlist: (movieId: number) => {
        return get().watchlist.some((movie: Movie) => movie.id === movieId);
      },
    }),
    {
      name: 'watchlist-storage', // Key for localStorage
    }
  )
);