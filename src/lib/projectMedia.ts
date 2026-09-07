import type { FeaturedProject } from '@/content/featuredProjects';

/**
 * Keep heavyweight production media on a dedicated origin instead of bundling it
 * into every frontend deployment. This can later be switched to Vercel Blob/R2
 * through NEXT_PUBLIC_MEDIA_ORIGIN without changing content data.
 */
export const PUBLIC_MEDIA_ORIGIN =
  process.env.NEXT_PUBLIC_MEDIA_ORIGIN?.replace(/\/$/, '') || 'https://takemelive.netlify.app';

export function resolveMediaUrl(src: string): string {
  const value = src.trim();
  if (!value || /^(https?:|data:|blob:)/i.test(value)) {
    return value;
  }

  return `${PUBLIC_MEDIA_ORIGIN}${value.startsWith('/') ? '' : '/'}${value}`;
}

/** Event folders under the media origin — source of truth for project photography */
export const EVENT_FOLDERS = {
  blackPink: 'Black Pink Concert',
  cinemaMedley: 'Cinema Medley',
  dubaiMedia: 'Dubai Media Annual Gala',
  ioNet: 'IO Net',
  lusail: 'Lusail Super Cup',
  maraya: 'Maraya Concert Series',
  qatarLive: 'Qatar Live 2021',
  redBullBasement: 'Red Bull Basement UAE National Finals',
  redBullEnergy: 'Red Bull Energy Lounge',
} as const;

/** Build a URL for a file inside an event folder */
export function eventImage(folder: string, filename: string): string {
  return resolveMediaUrl(`/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`);
}

/** @deprecated Use eventImage with EVENT_FOLDERS */
export function projectMediaPath(slug: string, filename: string): string {
  return resolveMediaUrl(`/assets/projects/${slug}/${filename}`);
}

/** @deprecated Use eventImage with EVENT_FOLDERS */
export function projectAsset(filename: string): string {
  return resolveMediaUrl(`/assets/projects/${encodeURI(filename)}`);
}

export function resolveProjectCover(project: FeaturedProject): string {
  return resolveMediaUrl(project.localCover ?? project.coverImage);
}

export function resolveProjectGallery(project: FeaturedProject): string[] {
  const gallery = project.localGallery?.length ? project.localGallery : project.gallery;
  return gallery.map(resolveMediaUrl);
}
