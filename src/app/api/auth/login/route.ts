import { NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/lib/auth/credentials';
import { createSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email = body.email?.trim() ?? '';
  const password = body.password ?? '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  await createSession(email);
  return NextResponse.json({ ok: true });
}
