import type { LoginFormValues } from '@/shared/lib/validation/login-schema';
import { createPersistedStore } from '@/shared/store/base/create-persisted-store';

import {
  createSession,
  type AuthSession,
} from '../lib/auth-service';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

interface AuthStoreState {
  session: AuthSession | null;
  isAuthenticated: boolean;
  status: AuthStatus;
  error: string | null;
}

interface AuthStoreActions {
  login: (credentials: LoginFormValues) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export type AuthStore = AuthStoreState & AuthStoreActions;
type PersistedAuthState = Pick<AuthStoreState, 'session' | 'isAuthenticated'>;

export const useAuthStore = createPersistedStore<AuthStore, PersistedAuthState>(
  (set) => ({
    session: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
    login: async ({ email, password }) => {
      set({ status: 'loading', error: null });

      try {
        const session = await createSession({ email, password });

        set({
          session,
          isAuthenticated: true,
          status: 'authenticated',
          error: null,
        });
      } catch {
        set({
          session: null,
          isAuthenticated: false,
          status: 'error',
          error: 'Nao foi possivel autenticar. Tente novamente.',
        });
      }
    },
    logout: () => {
      set({
        session: null,
        isAuthenticated: false,
        status: 'idle',
        error: null,
      });
    },
    clearError: () => {
      set({ error: null, status: 'idle' });
    },
  }),
  {
    name: 'cinedash-auth-store',
    partialize: (state) => ({
      session: state.session,
      isAuthenticated: state.isAuthenticated,
    }),
  },
);

export const useAuthStatus = () => useAuthStore((state) => state.status);
export const useAuthenticatedUser = () =>
  useAuthStore((state) => state.session?.user ?? null);
export const useAuthToken = () =>
  useAuthStore((state) => state.session?.token ?? null);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);