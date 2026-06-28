import 'server-only';

import { revalidatePath } from 'next/cache';

export function revalidateSiteContent(): void {
  revalidatePath('/');
  revalidatePath('/our-projects');
  revalidatePath('/projects', 'layout');
}

export function revalidateProject(slug: string): void {
  revalidatePath(`/projects/${slug}`);
  revalidateSiteContent();
}
