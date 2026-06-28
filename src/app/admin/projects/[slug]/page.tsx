import { notFound } from 'next/navigation';
import ProjectEditor from '@/components/admin/ProjectEditor';
import { getFeaturedProjectBySlug } from '@/lib/content/store';

type AdminProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminProjectPage({ params }: AdminProjectPageProps) {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectEditor mode="edit" initialProject={project} />;
}
