import type { Metadata } from 'next';
import CultureContent from '@/components/pages/CultureContent';

export const metadata: Metadata = {
  title: 'Our Culture | Take Me Live',
  description:
    'How Take Me Live works: collaborative crews, precision under pressure, and purpose-driven live experience craft.',
};

export default function OurCulturePage() {
  return <CultureContent />;
}
