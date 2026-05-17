import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../lib/auth-service');

import { createSession } from '../lib/auth-service';
import { useAuthStore } from './auth.store';

const mockCreateSession = vi.mocked(createSession);

const mockSession = {
  token: 'test-token-header.test-token-payload.test-token-sig',
  user: { id: 'user-uuid-1', email: 'user@example.com', name: 'User' },
};

function resetStore() {
  useAuthStore.setState({
    session: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  });
}

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStore();
    mockCreateSession.mockReset();
  });

  describe('initial state', () => {
    it('has the correct default values', () => {
      const state = useAuthStore.getState();

      expect(state.session).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.status).toBe('idle');
      expect(state.error).toBeNull();
    });
  });

  describe('login', () => {
    it('sets status to loading while request is in-flight', async () => {
      let resolveSession!: (value: typeof mockSession) => void;
      mockCreateSession.mockReturnValue(
        new Promise((resolve) => {
          resolveSession = resolve;
        }),
      );

      const loginPromise = useAuthStore
        .getState()
        .login({ email: 'user@example.com', password: 'pass123' });

      expect(useAuthStore.getState().status).toBe('loading');

      resolveSession(mockSession);
      await loginPromise;
    });

    it('sets session and isAuthenticated on success', async () => {
      mockCreateSession.mockResolvedValue(mockSession);

      await useAuthStore
        .getState()
        .login({ email: 'user@example.com', password: 'pass123' });

      const state = useAuthStore.getState();
      expect(state.session).toEqual(mockSession);
      expect(state.isAuthenticated).toBe(true);
      expect(state.status).toBe('authenticated');
      expect(state.error).toBeNull();
    });

    it('sets error state and keeps session null on failure', async () => {
      mockCreateSession.mockRejectedValue(new Error('Auth failed'));

      await useAuthStore
        .getState()
        .login({ email: 'user@example.com', password: 'pass123' });

      const state = useAuthStore.getState();
      expect(state.session).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.status).toBe('error');
      expect(state.error).toBe(
        'Nao foi possivel autenticar. Tente novamente.',
      );
    });
  });

  describe('logout', () => {
    it('clears session and resets all auth state', async () => {
      mockCreateSession.mockResolvedValue(mockSession);
      await useAuthStore
        .getState()
        .login({ email: 'user@example.com', password: 'pass123' });

      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.session).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.status).toBe('idle');
      expect(state.error).toBeNull();
    });
  });

  describe('clearError', () => {
    it('resets error and status back to idle', async () => {
      mockCreateSession.mockRejectedValue(new Error('Auth failed'));
      await useAuthStore
        .getState()
        .login({ email: 'user@example.com', password: 'pass123' });

      useAuthStore.getState().clearError();

      const state = useAuthStore.getState();
      expect(state.error).toBeNull();
      expect(state.status).toBe('idle');
    });
  });

  describe('session persistence', () => {
    it('persists session and isAuthenticated to localStorage after login', async () => {
      mockCreateSession.mockResolvedValue(mockSession);
      await useAuthStore
        .getState()
        .login({ email: 'user@example.com', password: 'pass123' });

      const stored = JSON.parse(
        localStorage.getItem('cinedash-auth-store') ?? '{}',
      );

      expect(stored.state.isAuthenticated).toBe(true);
      expect(stored.state.session).toEqual(mockSession);
    });

    it('does not persist status or error fields', async () => {
      mockCreateSession.mockRejectedValue(new Error('Auth failed'));
      await useAuthStore
        .getState()
        .login({ email: 'user@example.com', password: 'pass123' });

      const stored = JSON.parse(
        localStorage.getItem('cinedash-auth-store') ?? '{}',
      );

      expect(stored.state.status).toBeUndefined();
      expect(stored.state.error).toBeUndefined();
    });

    it('clears persisted session after logout', async () => {
      mockCreateSession.mockResolvedValue(mockSession);
      await useAuthStore
        .getState()
        .login({ email: 'user@example.com', password: 'pass123' });
      useAuthStore.getState().logout();

      const stored = JSON.parse(
        localStorage.getItem('cinedash-auth-store') ?? '{}',
      );

      expect(stored.state.isAuthenticated).toBe(false);
      expect(stored.state.session).toBeNull();
    });
  });
});
