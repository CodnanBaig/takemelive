import { NextResponse } from 'next/server';
import { getFeaturedProjects } from '@/lib/content/store';
import { getShowreelConfig } from '@/lib/content/store';

export async function GET() {
  return NextResponse.json({
    projects: getFeaturedProjects(),
    showreel: getShowreelConfig(),
  });
}
