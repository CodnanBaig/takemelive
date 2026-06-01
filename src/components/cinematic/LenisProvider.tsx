'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/motionPrefs';

type LenisProviderProps = {
  children: React.ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;
    let onRefresh: (() => void) | null = null;

    const teardown = () => {
      if (onRefresh) {
        ScrollTrigger.removeEventListener('refresh', onRefresh);
        onRefresh = null;
      }
      if (ticker) {
        gsap.ticker.remove(ticker);
        ticker = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };

    const setup = () => {
      if (prefersReducedMotion() || lenis) {
        return;
      }

      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
      });

      lenis.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (!lenis) {
            return 0;
          }
          if (typeof value === 'number') {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      onRefresh = () => lenis?.resize();
      ScrollTrigger.addEventListener('refresh', onRefresh);

      ticker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    };

    setup();

    const unsubscribe = subscribeMotionPreference((reduced) => {
      if (reduced) {
        teardown();
      } else {
        setup();
      }
    });

    return () => {
      unsubscribe();
      teardown();
    };
  }, []);

  return children;
}
