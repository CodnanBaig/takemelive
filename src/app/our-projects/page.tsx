import type { Metadata } from 'next';
import ProjectsGlobe from '@/components/projects/ProjectsGlobe';
import ProjectsIndex from '@/components/projects/ProjectsIndex';
import ProjectsIntro from '@/components/projects/ProjectsIntro';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Our Projects | Take Me Live',
  description:
    'Browse Take Me Live productions — stadium tours, festivals, brand worlds, and ceremonial live experiences.',
};

export default function OurProjectsPage() {
  return (
    <main id="main-content" className={styles.page} tabIndex={-1}>
      <ProjectsIntro />
      <ProjectsGlobe />
      <ProjectsIndex />
    </main>
  );
}
