'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap';
import { scrollToTop } from '@/lib/smoothScroll';

export default function RouteScrollRefresh() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const previous = previousPathname.current;
    previousPathname.current = pathname;

    const frame = requestAnimationFrame(() => {
      if (previous !== pathname && !window.location.hash) {
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
