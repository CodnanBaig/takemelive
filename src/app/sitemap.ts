import type { MetadataRoute } from 'next';
import { PUBLIC_ROUTES } from '@/lib/seo/config';
import { getFeaturedProjects } from '@/lib/content/store';
import { absoluteUrl } from '@/lib/seo/metadata';

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getFeaturedProjects();

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((path) => ({
    url: absoluteUrl(path),
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
  }));

  return [...staticEntries, ...projectEntries];
}
