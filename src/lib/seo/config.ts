export const SITE_NAME = 'Take Me Live';

export const SITE_DESCRIPTION =
  'Live experience studio designing immersive productions, cultural moments, and stadium-scale spectacle across the Middle East and beyond.';

const FALLBACK_SITE_URL = 'https://www.takemelive.com';

function normalizeSiteUrl(value: string | undefined): string {
  const candidate = value?.trim();
  if (!candidate) {
    return FALLBACK_SITE_URL;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return FALLBACK_SITE_URL;
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL,
);

export const SITE_LOCALE = 'en_US';

export const CONTACT_EMAIL = 'mg@takemelive.com';

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/takemelive',
  linkedin: 'https://www.linkedin.com/company/takemelive',
} as const;

/** Generated 1200×630 brand share image used by non-project routes. */
export const DEFAULT_OG_IMAGE = '/opengraph-image';

export const SITE_LOGO = '/assets/ImageToStl.com_TML-primary-logo.png';

export const SITE_ICONS = {
  icon: '/assets/website-fevicon.png',
  apple: '/assets/website-fevicon.png',
} as const;

export const PUBLIC_ROUTES = ['/', '/our-projects', '/our-culture', '/contact'] as const;
