import type { Metadata } from 'next';
import ProjectsCarousel from '@/components/projects/ProjectsCarousel';
import { getFeaturedProjects } from '@/lib/content/store';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Our Projects | Take Me Live',
  description:
    'Browse Take Me Live productions — stadium tours, festivals, brand worlds, and ceremonial live experiences.',
};

export const dynamic = 'force-dynamic';

export default function OurProjectsPage() {
  const projects = getFeaturedProjects();

  return (
    <main id="main-content" className={styles.page} tabIndex={-1}>
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
