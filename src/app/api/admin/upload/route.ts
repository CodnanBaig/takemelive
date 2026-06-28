import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/guard';

const MAX_BYTES = 80 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const ALLOWED_VIDEO_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime']);

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function POST(request: Request) {
  const denied = await requireAdminSession();
  if (denied) {
    return denied;
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form data.' }, { status: 400 });
  }

  const file = formData.get('file');
  const scope = String(formData.get('scope') ?? 'project');
  const slug = String(formData.get('slug') ?? '').trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File exceeds 80MB limit.' }, { status: 400 });
  }

  const isVideo = ALLOWED_VIDEO_TYPES.has(file.type);
  const isImage = ALLOWED_IMAGE_TYPES.has(file.type);

  if (!isVideo && !isImage) {
    return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });
  }

  const safeName = sanitizeFilename(file.name || (isVideo ? 'upload.mp4' : 'upload.webp'));
  let publicPath = '';

  if (scope === 'showreel' && isVideo) {
    publicPath = '/assets/showreel.mp4';
  } else if (scope === 'project' && slug) {
    const dir = path.join(process.cwd(), 'public', 'assets', 'projects', slug);
    await mkdir(dir, { recursive: true });
    publicPath = `/assets/projects/${slug}/${safeName}`;
    await writeFile(path.join(dir, safeName), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ path: publicPath, kind: isVideo ? 'video' : 'image' });
  } else if (scope === 'assets') {
    const dir = path.join(process.cwd(), 'public', 'assets', 'uploads');
    await mkdir(dir, { recursive: true });
    publicPath = `/assets/uploads/${safeName}`;
    await writeFile(path.join(dir, safeName), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ path: publicPath, kind: isVideo ? 'video' : 'image' });
  }

  if (!publicPath) {
    return NextResponse.json({ error: 'Invalid upload scope or file type.' }, { status: 400 });
  }

  const absolutePath = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ path: publicPath, kind: isVideo ? 'video' : 'image' });
}
