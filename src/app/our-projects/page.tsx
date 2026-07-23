import ProjectsCarousel from '@/components/projects/ProjectsCarousel';
import { getFeaturedProjects } from '@/lib/content/store';
import { createPageMetadata } from '@/lib/seo/metadata';
import styles from './page.module.scss';

export const metadata = createPageMetadata({
  title: 'Our Projects',
  description:
    'Browse Take Me Live productions — stadium tours, festivals, brand worlds, and ceremonial live experiences.',
  path: '/our-projects',
});

export const revalidate = 60;

export default function OurProjectsPage() {
  const projects = getFeaturedProjects();

  return (
    <main id="main-content" className={styles.page} tabIndex={-1}>
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
