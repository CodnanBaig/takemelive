import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/guard';
import { revalidateSiteContent } from '@/lib/admin/revalidate';
import { mergeProjectPayload } from '@/lib/content/normalizeProject';
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

  const project = mergeProjectPayload(undefined, { ...body, slug, title: body.title.trim() });

  writeFeaturedProjects([...projects, project]);
  revalidateSiteContent();

  return NextResponse.json({ project }, { status: 201 });
}
