import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/projects/ProjectDetail';
import {
  FEATURED_PROJECTS,
  getAdjacentProjects,
  getFeaturedProjectBySlug,
} from '@/content/featuredProjects';
import { resolveProjectCover } from '@/lib/projectMedia';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);

  if (!project) {
    return { title: 'Project not found | Take Me Live' };
  }

  return {
    title: `${project.title} | Take Me Live`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [{ url: resolveProjectCover(project), alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);
  const adjacent = getAdjacentProjects(slug);

  if (!project || !adjacent) {
    notFound();
  }

  return <ProjectDetail project={project} adjacent={adjacent} />;
}
