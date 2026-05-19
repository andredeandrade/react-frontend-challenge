import {
  create,
  type Mutate,
  type StateCreator,
  type StoreApi,
  type UseBoundStore,
} from 'zustand';
import {
  createJSONStorage,
  persist,
  type PersistOptions,
} from 'zustand/middleware';

type PersistedStoreOptions<T extends object, PersistedState> = Omit<
  PersistOptions<T, PersistedState>,
  'storage'
>;

export function createPersistedStore<T extends object, PersistedState = T>(
  initializer: StateCreator<T, [], []>,
  options: PersistedStoreOptions<T, PersistedState>,
): UseBoundStore<
  Mutate<StoreApi<T>, [['zustand/persist', PersistedState]]>
> {
  return create<T>()(
    persist<T, [], [], PersistedState>(initializer, {
      storage: createJSONStorage(() => localStorage),
      ...options,
    }),
  );
}
