'use client';

import { usePathname } from 'next/navigation';
import SiteNav from './SiteNav';

export default function SiteNavWrapper() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return <SiteNav />;
}
