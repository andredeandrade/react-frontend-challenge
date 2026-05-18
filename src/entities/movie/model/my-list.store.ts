import { createPersistedStore } from '@/shared/store/base/create-persisted-store';

interface MyListState {
  movieIds: number[];
}

interface MyListActions {
  addMovie: (movieId: number) => void;
  removeMovie: (movieId: number) => void;
  toggleMovie: (movieId: number) => void;
}

type MyListStore = MyListState & MyListActions;

export const useMyListStore = createPersistedStore<MyListStore, MyListState>(
  (set, get) => ({
    movieIds: [],
    addMovie: (movieId) => {
      const ids = get().movieIds;
      if (ids.includes(movieId)) return;
      set({ movieIds: [...ids, movieId] });
    },
    removeMovie: (movieId) => {
      set((state) => ({
        movieIds: state.movieIds.filter((id) => id !== movieId),
      }));
    },
    toggleMovie: (movieId) => {
      const ids = get().movieIds;
      if (ids.includes(movieId)) {
        set({ movieIds: ids.filter((id) => id !== movieId) });
        return;
      }

      set({ movieIds: [...ids, movieId] });
    },
  }),
  {
    name: 'cinedash-my-list-store',
    partialize: (state) => ({
      movieIds: state.movieIds,
    }),
  },
);
