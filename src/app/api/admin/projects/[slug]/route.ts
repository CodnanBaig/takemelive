import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/guard';
import { revalidateProject } from '@/lib/admin/revalidate';
import {
  getFeaturedProjects,
  slugifyTitle,
  writeFeaturedProjects,
  type FeaturedProject,
} from '@/lib/content/store';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  const { slug } = await context.params;
  const project = getFeaturedProjects().find((item) => item.slug === slug);

  if (!project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  const { slug } = await context.params;
  const projects = getFeaturedProjects();
  const index = projects.findIndex((item) => item.slug === slug);

  if (index < 0) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  let body: Partial<FeaturedProject>;
  try {
    body = (await request.json()) as Partial<FeaturedProject>;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const nextSlug = body.slug?.trim() || slug;
  if (nextSlug !== slug && projects.some((item) => item.slug === nextSlug)) {
    return NextResponse.json({ error: 'Another project already uses this slug.' }, { status: 409 });
  }

  const current = projects[index];
  const updated: FeaturedProject = {
    ...current,
    ...body,
    slug: nextSlug,
    title: body.title?.trim() ?? current.title,
    posterTitle: body.posterTitle?.trim() || undefined,
    tagline: body.tagline?.trim() ?? current.tagline,
    event: body.event?.trim() ?? current.event,
    client: body.client?.trim() ?? current.client,
    year: body.year?.trim() ?? current.year,
    location: body.location?.trim() ?? current.location,
    summary: body.summary?.trim() ?? current.summary,
    description: body.description?.trim() ?? current.description,
    coverImage: body.coverImage?.trim() ?? current.coverImage,
    localCover: body.localCover?.trim() || undefined,
    gallery: body.gallery ?? current.gallery,
    localGallery: body.localGallery?.length ? body.localGallery : undefined,
    videos: body.videos ?? current.videos ?? [],
    localVideos: body.localVideos?.length ? body.localVideos : undefined,
  };

  const nextProjects = [...projects];
  nextProjects[index] = updated;
  writeFeaturedProjects(nextProjects);
  revalidateProject(updated.slug);
  if (nextSlug !== slug) {
    revalidateProject(slug);
  }

  return NextResponse.json({ project: updated });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  const { slug } = await context.params;
  const projects = getFeaturedProjects();
  const nextProjects = projects.filter((item) => item.slug !== slug);

  if (nextProjects.length === projects.length) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  writeFeaturedProjects(nextProjects);
  revalidateProject(slug);

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  const { slug } = await context.params;
  let body: { title?: string };
  try {
    body = (await request.json()) as { title?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body.title?.trim()) {
    return NextResponse.json({ error: 'Title is required to duplicate.' }, { status: 400 });
  }

  const projects = getFeaturedProjects();
  const source = projects.find((item) => item.slug === slug);
  if (!source) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  let duplicateSlug = slugifyTitle(body.title);
  let suffix = 2;
  while (projects.some((item) => item.slug === duplicateSlug)) {
    duplicateSlug = `${slugifyTitle(body.title)}-${suffix}`;
    suffix += 1;
  }

  const duplicate: FeaturedProject = {
    ...source,
    slug: duplicateSlug,
    title: body.title.trim(),
    posterTitle: source.posterTitle,
  };

  writeFeaturedProjects([...projects, duplicate]);
  revalidateProject(duplicate.slug);

  return NextResponse.json({ project: duplicate }, { status: 201 });
}
