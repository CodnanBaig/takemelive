import ContactContent from '@/components/pages/ContactContent';
import { getFeaturedProjects } from '@/lib/content/store';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Take Me Live to plan live experiences, immersive environments, and culture-moving productions.',
  path: '/contact',
});

export const revalidate = 60;

export default function ContactPage() {
  const projects = getFeaturedProjects();

  return <ContactContent projects={projects} />;
}
