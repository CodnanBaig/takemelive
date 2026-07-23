import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_ICONS, SITE_NAME } from '@/lib/seo/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Take Me Live',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#0e0e0e',
    theme_color: '#0e0e0e',
    lang: 'en',
    icons: [
      {
        src: SITE_ICONS.icon,
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
