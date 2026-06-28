export type FeaturedProject = {
  slug: string;
  title: string;
  posterTitle?: string;
  tagline: string;
  event: string;
  client: string;
  year: string;
  location: string;
  summary: string;
  description: string;
  coverImage: string;
  localCover?: string;
  gallery: string[];
  localGallery?: string[];
  videos?: string[];
  localVideos?: string[];
};

export type AdjacentProjects = {
  prev: FeaturedProject;
  next: FeaturedProject;
  index: number;
  total: number;
};

export type ShowreelConfig = {
  localSrc: string;
  primaryVideo: string;
  fallbackVideos: string[];
  poster: string;
  useRandomFallback: boolean;
};

export function getPosterTitle(project: FeaturedProject): string {
  return (project.posterTitle ?? project.title).toUpperCase();
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
