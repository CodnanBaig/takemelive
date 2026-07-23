import CultureContent from '@/components/pages/CultureContent';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Our Culture',
  description:
    'How Take Me Live works: collaborative crews, precision under pressure, and purpose-driven live experience craft.',
  path: '/our-culture',
});

export default function OurCulturePage() {
  return <CultureContent />;
}
