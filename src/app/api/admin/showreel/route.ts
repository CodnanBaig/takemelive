import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/guard';
import { revalidateSiteContent } from '@/lib/admin/revalidate';
import { getShowreelConfig, writeShowreelConfig, type ShowreelConfig } from '@/lib/content/store';

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  return NextResponse.json({ showreel: getShowreelConfig() });
}

export async function PUT(request: Request) {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  let body: Partial<ShowreelConfig>;
  try {
    body = (await request.json()) as Partial<ShowreelConfig>;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const current = getShowreelConfig();
  const updated: ShowreelConfig = {
    localSrc: body.localSrc?.trim() || current.localSrc,
    primaryVideo: body.primaryVideo?.trim() ?? current.primaryVideo,
    fallbackVideos: body.fallbackVideos ?? current.fallbackVideos,
    poster: body.poster?.trim() || current.poster,
    useRandomFallback: body.useRandomFallback ?? current.useRandomFallback,
  };

  writeShowreelConfig(updated);
  revalidateSiteContent();

  return NextResponse.json({ showreel: updated });
}
