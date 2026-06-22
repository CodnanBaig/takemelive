import type { FeaturedProject } from '@/content/featuredProjects';

/** Path convention for production photography dropped into the repo */
export function projectMediaPath(slug: string, filename: string): string {
  return `/assets/projects/${slug}/${filename}`;
}

/** Flat files under public/assets/projects/ (encodes spaces and special chars) */
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
