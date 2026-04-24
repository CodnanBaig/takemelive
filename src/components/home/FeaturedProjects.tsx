'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './FeaturedProjects.module.scss';

const PROJECTS = [
  {
    title: 'Neon Pulse Festival',
    slug: 'neon-pulse-festival',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    alt: 'Festival crowd with stage lights and smoke',
  },
  {
    title: 'Afterglow Brand Launch',
    slug: 'afterglow-brand-launch',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
    alt: 'Modern brand launch event with audience and stage',
  },
  {
    title: 'Momentum Summit',
    slug: 'momentum-summit',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
    alt: 'Conference stage setup with cinematic lighting',
  },
  {
    title: 'Orbit Fan Convention',
    slug: 'orbit-fan-convention',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80',
    alt: 'Packed audience at a live fan convention',
  },
] as const;

const FALLBACK_IMAGE_SRC =
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80';
const SWIPER_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS] as const;

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const swiperTrackRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);

  const marqueeItems = useMemo(
    () => Array.from({ length: 14 }, () => 'Featured Projects'),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const marqueeTrack = marqueeTrackRef.current;
    const swiperTrack = swiperTrackRef.current;
    if (!section || !marqueeTrack || !swiperTrack) {
      return;
    }

    const handleScroll = () => {
      const nextY = window.scrollY;
      scrollDelta.current = nextY - lastScrollY.current;
      lastScrollY.current = nextY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    let currentVelocity = 0;
    let marqueeX = 0;
    let swiperX = 0;

    const ticker = () => {
      const marqueeLoopWidth = marqueeTrack.scrollWidth / 2;
      const swiperLoopWidth = swiperTrack.scrollWidth / 3;
      if (!marqueeLoopWidth || !swiperLoopWidth) {
        return;
      }

      currentVelocity = gsap.utils.interpolate(currentVelocity, scrollDelta.current, 0.12);
      scrollDelta.current *= 0.88;

      const velocityInfluence = gsap.utils.clamp(-8, 8, currentVelocity * 0.06);

      const marqueeDirection = currentVelocity >= 0 ? -1 : 1;
      const marqueeSpeed = 0.55 + Math.min(Math.abs(currentVelocity) * 0.08, 7.5);
      marqueeX += marqueeDirection * marqueeSpeed;
      marqueeX = gsap.utils.wrap(-marqueeLoopWidth, 0, marqueeX);
      gsap.set(marqueeTrack, { x: marqueeX });

      const swiperSpeed = 1.4 + Math.abs(velocityInfluence) * 0.22;
      swiperX -= swiperSpeed;
      swiperX = gsap.utils.wrap(-swiperLoopWidth, 0, swiperX);
      gsap.set(swiperTrack, { x: swiperX });
    };

    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="chapter-featured-projects"
      data-chapter="featured-projects"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Featured projects"
    >
      <div className={styles.inner}>
        <div className={styles.marqueeShell} aria-hidden="true">
          <div className={styles.marqueeTrack} ref={marqueeTrackRef}>
            {marqueeItems.map((title, index) => (
              <span key={`${title}-${index}`} className={styles.marqueeItem}>
                {title}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.swiperViewport}>
          <div className={styles.swiperTrack} ref={swiperTrackRef}>
            {SWIPER_PROJECTS.map((project, index) => (
            <Link
              key={`${project.slug}-${index}`}
              href={`/projects/${project.slug}`}
              className={styles.card}
              data-project-card
              data-cursor="link"
              aria-label={`Open ${project.title} project`}
            >
              <img
                src={project.image}
                alt={project.alt}
                className={styles.cardImage}
                data-card-image
                loading="lazy"
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.src !== FALLBACK_IMAGE_SRC) {
                    target.src = FALLBACK_IMAGE_SRC;
                  }
                }}
              />
              <div className={styles.overlay}>
                <h3>{project.title}</h3>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
