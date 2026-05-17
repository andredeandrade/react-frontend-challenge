export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

interface SessionCredentials {
  email: string;
  password: string;
}

function base64UrlEncode(value: string): string {
  const encoded = globalThis.btoa(value);

  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function formatNameFromEmail(email: string): string {
  const [localPart] = email.split('@');

  return localPart
    .split(/[._-]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function generateSessionToken(email: string): string {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: email,
      iat: Date.now(),
      iss: 'cinedash-local-auth',
    }),
  );
  const signature = base64UrlEncode(crypto.randomUUID());

  return `${header}.${payload}.${signature}`;
}

export async function createSession({
  email,
  password,
}: SessionCredentials): Promise<AuthSession> {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  if (!email || !password) {
    throw new Error('Credenciais invalidas.');
  }

  return {
    token: generateSessionToken(email),
    user: {
      id: crypto.randomUUID(),
      email,
      name: formatNameFromEmail(email),
    },
  };
}