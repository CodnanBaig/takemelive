import type { FeaturedProject } from '@/lib/content/types';
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/seo/config';
import { absoluteUrl } from '@/lib/seo/metadata';

function normalizeProjectYear(value: string): string | undefined {
  const years = [...new Set(value.match(/\b(?:19|20)\d{2}\b/g) ?? [])];
  return years.length === 1 ? years[0] : undefined;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(SITE_LOGO),
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: absoluteUrl(SITE_LOGO),
    },
  };
}

export function projectJsonLd(project: FeaturedProject, coverImage: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.tagline,
    description: project.concept || project.summary,
    image: absoluteUrl(coverImage),
    url: absoluteUrl(`/projects/${project.slug}`),
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(project.client
      ? {
          about: {
            '@type': 'Organization',
            name: project.client,
          },
        }
      : {}),
    ...(project.location
      ? {
          contentLocation: {
            '@type': 'Place',
            name: project.location,
          },
        }
      : {}),
    ...(project.year ? { temporalCoverage: project.year } : {}),
    ...(normalizeProjectYear(project.year)
      ? { dateCreated: normalizeProjectYear(project.year) }
      : {}),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
