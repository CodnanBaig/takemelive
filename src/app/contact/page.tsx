import type { Metadata } from 'next';
import ContactContent from '@/components/pages/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us | Take Me Live',
  description:
    'Get in touch with Take Me Live to plan live experiences, immersive environments, and culture-moving productions.',
};

export default function ContactPage() {
  return <ContactContent />;
}
