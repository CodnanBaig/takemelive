import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/projects/ProjectDetail';
import {
  getAdjacentProjects,
  getFeaturedProjectBySlug,
  getFeaturedProjects,
} from '@/lib/content/store';
import { resolveProjectCover } from '@/lib/projectMedia';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return getFeaturedProjects().map((project) => ({ slug: project.slug }));
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
