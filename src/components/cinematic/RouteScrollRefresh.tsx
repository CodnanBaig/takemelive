'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap';

export default function RouteScrollRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
