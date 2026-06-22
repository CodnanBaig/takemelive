'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { FEATURED_PROJECTS } from '@/content/featuredProjects';
import { resolveProjectCover } from '@/lib/projectMedia';
import styles from './ProjectsGallery.module.scss';

export default function ProjectsGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('[data-project-card]');

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const image = card.querySelector('[data-card-image]');
        
        // Parallax image within card
        gsap.fromTo(
          image,
          { yPercent: 20 },
          {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              scrub: true,
              start: 'top bottom',
              end: 'bottom top',
            },
          }
        );

        // Card entry animation
        gsap.fromTo(
          card,
          { autoAlpha: 0, scale: 0.95 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.gallery}>
      {FEATURED_PROJECTS.map((project, index) => (
        <div key={project.slug} className={styles.card} data-project-card>
          <div className={styles.imageWrap}>
            <img src={resolveProjectCover(project)} alt={project.title} data-card-image />
          </div>
          <div className={styles.content}>
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.tagline}>{project.tagline}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
