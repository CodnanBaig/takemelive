'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import styles from './HomeSplineSection.module.scss';

const SplineScene = dynamic(() => import('./SplineScene'), {
  ssr: false,
  loading: () => <div className={styles.loading} aria-hidden="true" />,
});

export default function HomeSplineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();

    if (mq.matches) {
      mq.addEventListener('change', syncMotion);
      return () => mq.removeEventListener('change', syncMotion);
    }

    const section = sectionRef.current;
    if (!section) {
      mq.addEventListener('change', syncMotion);
      return () => mq.removeEventListener('change', syncMotion);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(section);
    mq.addEventListener('change', syncMotion);

    return () => {
      observer.disconnect();
      mq.removeEventListener('change', syncMotion);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chapter-spline"
      data-chapter="spline"
      data-logo-invert="1"
      className={styles.section}
      aria-label="3D experience"
    >
      <div className={styles.viewport}>
        {reducedMotion ? (
          <div className={styles.reducedMotionFallback} aria-hidden="true" />
        ) : shouldMount ? (
          <SplineScene />
        ) : (
          <div className={styles.loading} aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
