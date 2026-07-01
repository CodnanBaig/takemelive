import type { Metadata } from 'next';
import ContactContent from '@/components/pages/ContactContent';
import { getFeaturedProjects } from '@/lib/content/store';

export const metadata: Metadata = {
  title: 'Contact Us | Take Me Live',
  description:
    'Get in touch with Take Me Live to plan live experiences, immersive environments, and culture-moving productions.',
};

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const projects = getFeaturedProjects();

  return <ContactContent projects={projects} />;
}
