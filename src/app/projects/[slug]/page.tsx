import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FEATURED_PROJECTS, getFeaturedProjectBySlug } from '@/content/featuredProjects';
import styles from './page.module.scss';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.backLink}>
          Back to home
        </Link>

        <header className={styles.header}>
          <p>{project.event}</p>
          <h1>{project.title}</h1>
          <h2>{project.client}</h2>
        </header>

        <section className={styles.lead}>
          <p>{project.summary}</p>
          <p>{project.description}</p>
        </section>

        <section className={styles.gallery} aria-label={`${project.title} gallery`}>
          {project.gallery.map((image) => (
            <figure key={image} className={styles.figure}>
              <img src={image} alt={`${project.title} visual`} loading="lazy" />
            </figure>
          ))}
        </section>
      </div>
    </main>
  );
}
