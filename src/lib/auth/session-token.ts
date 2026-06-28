const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ?? 'tml-dev-session-secret-change-in-production';

export const SESSION_COOKIE = 'tml_admin_session';

type SessionPayload = {
  email: string;
  exp: number;
};

function secretBytes(): Uint8Array {
  return new TextEncoder().encode(SESSION_SECRET);
}

function encodeBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function bytesToBase64Url(bytes: ArrayBuffer): string {
  const view = new Uint8Array(bytes);
  let binary = '';
  view.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function sign(body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    secretBytes() as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  return bytesToBase64Url(signature);
}

function decodePayload(body: string): SessionPayload | null {
  try {
    const payload = JSON.parse(decodeBase64Url(body)) as SessionPayload;
    if (!payload.email || !payload.exp || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function createSessionToken(email: string, ttlMs: number): Promise<string> {
  const body = encodeBase64Url(JSON.stringify({ email, exp: Date.now() + ttlMs }));
  const signature = await sign(body);
  return `${body}.${signature}`;
}

export function getSessionPayloadFromToken(token: string): SessionPayload | null {
  const [body] = token.split('.');
  if (!body) {
    return null;
  }
  return decodePayload(body);
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }

  const [body, signature] = token.split('.');
  if (!body || !signature) {
    return false;
  }

  const expected = await sign(body);
  if (expected.length !== signature.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  if (mismatch !== 0) {
    return false;
  }

  return decodePayload(body) !== null;
}
