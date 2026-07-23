import 'server-only';

import { timingSafeEqual } from 'crypto';

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return false;
  }
  const normalizedEmail = email.trim().toLowerCase();
  const expectedEmail = ADMIN_EMAIL.trim().toLowerCase();
  return safeEqual(normalizedEmail, expectedEmail) && safeEqual(password, ADMIN_PASSWORD);
}
