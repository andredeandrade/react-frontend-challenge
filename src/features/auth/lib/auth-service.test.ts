import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createSession, generateSessionToken } from './auth-service';

describe('generateSessionToken', () => {
  it('returns a string with 3 JWT-like parts', () => {
    const token = generateSessionToken('user@example.com');
    const parts = token.split('.');

    expect(parts).toHaveLength(3);
  });

  it('encodes the email as the sub claim in the payload', () => {
    const token = generateSessionToken('user@example.com');
    const [, payloadB64] = token.split('.');
    const payload = JSON.parse(
      atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')),
    );

    expect(payload.sub).toBe('user@example.com');
    expect(payload.iss).toBe('cinedash-local-auth');
  });

  it('generates unique tokens for the same email', () => {
    const token1 = generateSessionToken('user@example.com');
    const token2 = generateSessionToken('user@example.com');

    expect(token1).not.toBe(token2);
  });
});

describe('createSession', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves with a session containing token and user', async () => {
    const promise = createSession({
      email: 'user@example.com',
      password: 'secret123',
    });

    await vi.runAllTimersAsync();
    const session = await promise;

    expect(session.token).toBeDefined();
    expect(session.user.email).toBe('user@example.com');
    expect(session.user.id).toBeDefined();
  });

  it('formats the user name from email local part', async () => {
    const promise = createSession({
      email: 'john.doe@example.com',
      password: 'secret123',
    });

    await vi.runAllTimersAsync();
    const session = await promise;

    expect(session.user.name).toBe('John Doe');
  });

  it('capitalizes each segment separated by dots, underscores or dashes', async () => {
    const promise = createSession({
      email: 'ana_maria-silva@example.com',
      password: 'secret123',
    });

    await vi.runAllTimersAsync();
    const session = await promise;

    expect(session.user.name).toBe('Ana Maria Silva');
  });

  it('throws when email is empty', async () => {
    const promise = createSession({ email: '', password: 'secret123' });

    await Promise.all([
      vi.runAllTimersAsync(),
      expect(promise).rejects.toThrow('Credenciais invalidas.'),
    ]);
  });

  it('throws when password is empty', async () => {
    const promise = createSession({ email: 'user@example.com', password: '' });

    await Promise.all([
      vi.runAllTimersAsync(),
      expect(promise).rejects.toThrow('Credenciais invalidas.'),
    ]);
  });
});
