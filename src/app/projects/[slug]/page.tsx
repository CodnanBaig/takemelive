import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/projects/ProjectDetail';
import JsonLd from '@/components/seo/JsonLd';
import {
  getAdjacentProjects,
  getFeaturedProjectBySlug,
  getFeaturedProjects,
} from '@/lib/content/store';
import { resolveProjectCover } from '@/lib/projectMedia';
import { breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld';
import { createPageMetadata } from '@/lib/seo/metadata';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return getFeaturedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  const coverImage = resolveProjectCover(project);
  const description = project.concept || project.summary;

  return createPageMetadata({
    title: project.title,
    description,
    path: `/projects/${project.slug}`,
    image: coverImage,
    imageAlt: project.title,
    type: 'article',
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);
  const adjacent = getAdjacentProjects(slug);

  if (!project || !adjacent) {
    notFound();
  }

  const coverImage = resolveProjectCover(project);

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd(project, coverImage),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Our Projects', path: '/our-projects' },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectDetail project={project} adjacent={adjacent} />
    </>
  );
}
