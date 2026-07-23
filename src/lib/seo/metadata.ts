import type { Metadata } from 'next';
import {
  CONTACT_EMAIL,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_ICONS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/seo/config';

export function absoluteUrl(path = '/'): string {
  const value = path.trim();

  try {
    const parsed = new URL(value);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    // Resolve relative paths against the configured canonical origin below.
  }

  const normalized = value.startsWith('/') ? value : `/${value}`;
  return new URL(normalized, SITE_URL).toString();
}

function buildOpenGraphImage(image: string, alt: string): NonNullable<Metadata['openGraph']>['images'] {
  return [
    {
      url: image,
      alt,
    },
  ];
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: SITE_ICONS,
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: '/',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: buildOpenGraphImage(DEFAULT_OG_IMAGE, SITE_NAME),
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'entertainment',
  other: {
    'contact:email': CONTACT_EMAIL,
    'contact:instagram': SOCIAL_LINKS.instagram,
  },
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noIndex = false,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const ogAlt = imageAlt ?? title;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type,
      images: buildOpenGraphImage(image, ogAlt),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
            googleBot: {
              index: false,
              follow: false,
            },
          },
        }
      : {}),
  };
}

export const adminMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
