import type { FeaturedProject } from '@/content/featuredProjects';

/** Event folders under public/ — source of truth for project photography */
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

/** Build a URL for a file inside a public event folder */
export function eventImage(folder: string, filename: string): string {
  return `/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
}

/** @deprecated Use eventImage with EVENT_FOLDERS */
export function projectMediaPath(slug: string, filename: string): string {
  return `/assets/projects/${slug}/${filename}`;
}

/** @deprecated Use eventImage with EVENT_FOLDERS */
export function projectAsset(filename: string): string {
  return `/assets/projects/${encodeURI(filename)}`;
}

export function resolveProjectCover(project: FeaturedProject): string {
  return project.localCover ?? project.coverImage;
}

export function resolveProjectGallery(project: FeaturedProject): string[] {
  if (project.localGallery?.length) {
    return project.localGallery;
  }
  return project.gallery;
}
