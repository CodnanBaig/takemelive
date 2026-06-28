import Link from 'next/link';
import { getPosterTitle } from '@/content/featuredProjects';
import { getFeaturedProjects } from '@/lib/content/store';
import { resolveProjectCover } from '@/lib/projectMedia';
import styles from './ProjectsIndex.module.scss';

export default function ProjectsIndex() {
  const projects = getFeaturedProjects();
  return (
    <section className={styles.section} aria-label="All projects">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>All projects</h2>
          <p className={styles.lead}>
            Every engagement below links to a full case study with production stills and scope
            notes.
          </p>
        </header>

        <ol className={styles.list}>
          {projects.map((project, index) => (
            <li key={project.slug} className={styles.item}>
              <Link href={`/projects/${project.slug}`} className={styles.link}>
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.copy}>
                  <p className={styles.name}>{getPosterTitle(project)}</p>
                  <p className={styles.tagline}>{project.tagline}</p>
                </div>
                <figure className={styles.thumb}>
                  <img src={resolveProjectCover(project)} alt="" loading="lazy" />
                </figure>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
