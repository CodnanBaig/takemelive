'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
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

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) {
      return;
    }

    const cards = container.querySelectorAll<HTMLElement>(`.${styles.card}`);
    
    const handleScroll = () => {
      const nextY = window.scrollY;
      scrollDelta.current = nextY - lastScrollY.current;
      lastScrollY.current = nextY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    let currentVelocity = 0;

    const ticker = () => {
      currentVelocity = gsap.utils.interpolate(currentVelocity, scrollDelta.current, 0.1);
      scrollDelta.current *= 0.9;

      const baseSpeed = 0.002; // Slower base speed for elegance
      const velocityInfluence = Math.abs(currentVelocity) * 0.0005;
      phaseRef.current = (phaseRef.current + baseSpeed + velocityInfluence) % 1;

      cards.forEach((card, index) => {
        // Calculate card-specific phase
        const cardPhase = (phaseRef.current + index / PROJECTS.length) % 1;
        
        // Diagonal Path Logic: Top-Right (0) -> Center (0.5) -> Bottom-Left (1)
        // We map the 0-1 phase to a cinematic curve
        
        // Progress within the swap: 0 (start) to 1 (end)
        const p = cardPhase;
        
        // X and Y travel: 120% to -120%
        // We use a power curve to make it linger in the center
        const easedP = gsap.parseEase('power2.inOut')(p);
        const x = (1 - easedP * 2) * 100; // 100% to -100%
        const y = (easedP * 2 - 1) * 100; // -100% to 100%
        
        // Scale: 0.8 -> 1.0 -> 0.8
        const scale = 1 - Math.abs(p - 0.5) * 0.4;
        
        // Opacity: Fade in and out at edges
        const opacity = Math.sin(p * Math.PI);
        
        // Rotation: Slight tilt during travel
        const rotation = (0.5 - p) * 30;

        // Z-Index: Active card (center) should be on top
        const zIndex = Math.floor(opacity * 100);

        gsap.set(card, {
          xPercent: x,
          yPercent: y,
          scale: scale,
          autoAlpha: opacity,
          rotateZ: rotation,
          zIndex: zIndex,
        });
      });
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
        <div className={styles.stackContainer} ref={containerRef}>
          {PROJECTS.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.card}
              data-project-card
              data-cursor="link"
              aria-label={`Open ${project.title} project`}
            >
              <div className={styles.cardIndex}>
                {index.toString().padStart(2, '0')}
              </div>
              <div className={styles.cardImageWrapper}>
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
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>SCROLL TO SURF</span>
        </div>
      </div>
    </section>
  );
}
