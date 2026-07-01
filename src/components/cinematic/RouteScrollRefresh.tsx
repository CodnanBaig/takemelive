'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap';
import { scrollToTop } from '@/lib/smoothScroll';

export default function RouteScrollRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/contact') {
      scrollToTop();
    }

    const frame = requestAnimationFrame(() => {
      if (pathname === '/contact') {
        scrollToTop();
      }
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
