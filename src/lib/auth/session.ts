import 'server-only';

import { cookies } from 'next/headers';
import {
  SESSION_COOKIE,
  createSessionToken,
  getSessionPayloadFromToken,
  verifySessionToken,
} from '@/lib/auth/session-token';

const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

export { SESSION_COOKIE };

export async function createSession(email: string): Promise<void> {
  const cookieStore = await cookies();
  const token = await createSessionToken(email, SESSION_TTL_MS);

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token || !(await verifySessionToken(token))) {
    return null;
  }

  return getSessionPayloadFromToken(token)?.email ?? null;
}
