import type { Metadata } from 'next';
import { adminMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Admin',
  ...adminMetadata,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
