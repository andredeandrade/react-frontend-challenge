import { createPersistedStore } from './base/create-persisted-store';

export type ThemeMode = 'light' | 'dark' | 'system';

interface AppStoreState {
  theme: ThemeMode;
  sidebarOpen: boolean;
}

interface AppStoreActions {
  setTheme: (theme: ThemeMode) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export type AppStore = AppStoreState & AppStoreActions;

export const useAppStore = createPersistedStore<AppStore, AppStoreState>(
  (set) => ({
    theme: 'system',
    sidebarOpen: true,
    setTheme: (theme) => set({ theme }),
    setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  }),
  {
    name: 'cinedash-app-store',
    partialize: (state) => ({
      theme: state.theme,
      sidebarOpen: state.sidebarOpen,
    }),
  },
);

export const useThemeMode = () => useAppStore((state) => state.theme);
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen);
