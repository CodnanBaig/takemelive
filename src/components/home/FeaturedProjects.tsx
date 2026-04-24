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

// Triplicate for seamless feel during long scroll
const INFINITE_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) {
      return;
    }

    const cards = container.querySelectorAll<HTMLElement>(`.${styles.card}`);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${INFINITE_PROJECTS.length * 80}%`, // Very long scroll
          pin: true,
          scrub: 1.5, // High scrub for "infinite smooth" feel
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        // Each card has a "life cycle" in the stack
        // We start them hidden and then they enter the "waiting" slots
        
        // Initial state: hidden top-right
        gsap.set(card, {
          xPercent: 60,
          yPercent: -60,
          opacity: 0,
          scale: 0.7,
          rotateZ: 10,
          zIndex: 1,
        });

        // Entrance to the back of the visible stack (Position 2)
        tl.to(card, {
          xPercent: 12,
          yPercent: 12,
          opacity: 0.3,
          scale: 0.8,
          rotateZ: 4,
          zIndex: 5,
          duration: 1,
        }, i * 1);

        // Move to middle of the stack (Position 1)
        tl.to(card, {
          xPercent: 6,
          yPercent: 6,
          opacity: 0.6,
          scale: 0.9,
          rotateZ: 2,
          zIndex: 10,
          duration: 1,
        }, `>`);

        // Move to the front (Active / Position 0)
        tl.to(card, {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          zIndex: 20,
          duration: 1,
        }, `>`);

        // Stay active for a bit
        tl.to(card, {
          scale: 1.02,
          duration: 0.5,
        }, `>`);

        // Exit diagonally to bottom-left
        tl.to(card, {
          xPercent: -140,
          yPercent: 140,
          opacity: 0,
          scale: 0.8,
          rotateZ: -15,
          duration: 1.5,
          ease: 'power2.in',
        }, `>`);
      });
    }, section);

    return () => {
      ctx.revert();
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
          {INFINITE_PROJECTS.map((project, index) => (
            <Link
              key={`${project.slug}-${index}`}
              href={`/projects/${project.slug}`}
              className={styles.card}
              data-project-card
              data-cursor="link"
              aria-label={`Open ${project.title} project`}
            >
              <div className={styles.cardIndex}>
                {(index % PROJECTS.length).toString().padStart(2, '0')}
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
