import 'server-only';

import { NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/auth/session';

export async function requireAdminSession(): Promise<NextResponse | null> {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
