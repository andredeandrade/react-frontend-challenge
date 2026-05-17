import { describe, expect, it } from 'vitest';

import { loginSchema } from './login-schema';

describe('loginSchema', () => {
  it('validates valid credentials', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'secret123',
    });

    expect(result.success).toBe(true);
  });

  it('trims whitespace from email', () => {
    const result = loginSchema.safeParse({
      email: '  user@example.com  ',
      password: 'secret123',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('user@example.com');
    }
  });

  it('rejects invalid email format', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'secret123',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Informe um e-mail valido.');
  });

  it('rejects empty email', () => {
    const result = loginSchema.safeParse({ email: '', password: 'secret123' });

    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 6 characters', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '123',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'A senha deve ter pelo menos 6 caracteres.',
    );
  });

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '',
    });

    expect(result.success).toBe(false);
  });

  it('reports all field errors when both are invalid', () => {
    const result = loginSchema.safeParse({ email: 'bad', password: '123' });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toHaveLength(2);
  });
});
