import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/guard';
import { revalidateSiteContent } from '@/lib/admin/revalidate';
import {
  getFeaturedProjects,
  slugifyTitle,
  writeFeaturedProjects,
  type FeaturedProject,
} from '@/lib/content/store';

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  return NextResponse.json({ projects: getFeaturedProjects() });
}

export async function POST(request: Request) {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  let body: Partial<FeaturedProject> & { title?: string };
  try {
    body = (await request.json()) as Partial<FeaturedProject> & { title?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body.title?.trim()) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
  }

  const projects = getFeaturedProjects();
  const slug = body.slug?.trim() || slugifyTitle(body.title);

  if (!slug) {
    return NextResponse.json({ error: 'Could not generate a valid slug.' }, { status: 400 });
  }

  if (projects.some((project) => project.slug === slug)) {
    return NextResponse.json({ error: 'A project with this slug already exists.' }, { status: 409 });
  }

  const project: FeaturedProject = {
    slug,
    title: body.title.trim(),
    posterTitle: body.posterTitle?.trim() || undefined,
    tagline: body.tagline?.trim() ?? '',
    event: body.event?.trim() ?? '',
    client: body.client?.trim() ?? '',
    year: body.year?.trim() ?? '',
    location: body.location?.trim() ?? '',
    services: body.services?.trim() ?? '',
    concept: body.concept?.trim() ?? body.summary?.trim() ?? '',
    story: body.story?.trim() ?? body.description?.trim() ?? '',
    summary: body.concept?.trim() ?? body.summary?.trim() ?? '',
    description: body.story?.trim() ?? body.description?.trim() ?? '',
    coverImage: body.coverImage?.trim() ?? '',
    localCover: body.localCover?.trim() || undefined,
    gallery: body.gallery ?? [],
    localGallery: body.localGallery?.length ? body.localGallery : undefined,
    videos: body.videos ?? [],
    localVideos: body.localVideos?.length ? body.localVideos : undefined,
  };

  writeFeaturedProjects([...projects, project]);
  revalidateSiteContent();

  return NextResponse.json({ project }, { status: 201 });
}
