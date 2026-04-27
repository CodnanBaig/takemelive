'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { FEATURED_PROJECTS } from '@/content/featuredProjects';
import styles from './FeaturedProjects.module.scss';

const FALLBACK_IMAGE_SRC = FEATURED_PROJECTS[0]?.coverImage ?? '';

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

  const marqueeItems = useMemo(() => Array.from({ length: 12 }, () => 'Featured Projects'), []);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;
    const marqueeTrack = marqueeTrackRef.current;
    if (!section || !viewport || !rail || !marqueeTrack) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-project-card]'));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${FEATURED_PROJECTS.length * 90}%`,
          pin: true,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        rail,
        { x: 0 },
        {
          x: () => -Math.max(0, rail.scrollWidth - viewport.clientWidth),
          ease: 'none',
          duration: 1,
        },
        0,
      );

      cards.forEach((card, index) => {
        const image = card.querySelector<HTMLElement>('[data-card-image]');
        const overlay = card.querySelector<HTMLElement>('[data-card-overlay]');

        tl.fromTo(
          card,
          {
            y: index % 2 === 0 ? 14 : -14,
            rotateZ: index % 2 === 0 ? -1 : 1,
            opacity: 0.62,
          },
          {
            y: index % 2 === 0 ? -14 : 14,
            rotateZ: index % 2 === 0 ? 1 : -1,
            opacity: 1,
            ease: 'none',
            duration: 1,
          },
          0,
        );

        const enter = () => {
          if (image) {
            gsap.to(image, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
          }
          if (overlay) {
            gsap.to(overlay, { opacity: 0.45, duration: 0.4, ease: 'power2.out' });
          }
        };

        const leave = () => {
          if (image) {
            gsap.to(image, { scale: 1, duration: 0.4, ease: 'power2.out' });
          }
          if (overlay) {
            gsap.to(overlay, { opacity: 0.72, duration: 0.4, ease: 'power2.out' });
          }
        };

        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);

        ScrollTrigger.create({
          trigger: card,
          containerAnimation: tl,
          start: 'left 72%',
          end: 'right 28%',
          onEnter: () => gsap.to(card, { opacity: 1, duration: 0.22 }),
          onEnterBack: () => gsap.to(card, { opacity: 1, duration: 0.22 }),
          onLeave: () => gsap.to(card, { opacity: 0.52, duration: 0.22 }),
          onLeaveBack: () => gsap.to(card, { opacity: 0.52, duration: 0.22 }),
        });
      });

      let marqueeX = 0;

      const ticker = () => {
        const loopWidth = marqueeTrack.scrollWidth / 2;
        if (!loopWidth) {
          return;
        }
        marqueeX -= 1.2;
        marqueeX = gsap.utils.wrap(-loopWidth, 0, marqueeX);
        gsap.set(marqueeTrack, { x: marqueeX });
      };
      gsap.ticker.add(ticker);

      return () => {
        gsap.ticker.remove(ticker);
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-featured-projects"
      data-chapter="featured-projects"
      data-logo-invert="0"
      ref={sectionRef}
      className={styles.section}
      aria-label="Featured projects"
    >
      <div className={styles.inner}>
        <div className={styles.marqueeShell} aria-hidden="true">
          <div className={styles.marqueeTrack} ref={marqueeTrackRef}>
            {marqueeItems.map((label, index) => (
              <span key={`${label}-${index}`} className={styles.marqueeItem}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.rail} ref={railRef}>
            {FEATURED_PROJECTS.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={styles.card}
                data-project-card
                data-cursor="link"
                aria-label={`Open ${project.title} project`}
              >
                <div className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.cardImageWrapper}>
                  <img
                    src={project.coverImage}
                    alt={project.summary}
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
                  <div className={styles.overlay} data-card-overlay>
                    <h3>{project.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
