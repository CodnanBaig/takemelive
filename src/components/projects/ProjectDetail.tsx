'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import {
  MASK_HIDDEN_BOTTOM,
  MASK_VISIBLE,
  animateMaskReveal,
  setMaskHidden,
} from '@/lib/maskReveal';
import { sectionRevealScroll } from '@/lib/scrollScene';
import type { AdjacentProjects, FeaturedProject } from '@/content/featuredProjects';
import { getPosterTitle } from '@/content/featuredProjects';
import { resolveProjectCover, resolveProjectGallery } from '@/lib/projectMedia';
import ProjectGallery from '@/components/projects/ProjectGallery';
import styles from './ProjectDetail.module.scss';

type ProjectDetailProps = {
  project: FeaturedProject;
  adjacent: AdjacentProjects;
};

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=80';

export default function ProjectDetail({ project, adjacent }: ProjectDetailProps) {
  const pageRef = useRef<HTMLElement | null>(null);
  const coverSrc = resolveProjectCover(project);
  const galleryImages = resolveProjectGallery(project);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) {
      return;
    }

    const poster = page.querySelector<HTMLElement>('[data-detail-poster]');
    const tagline = page.querySelector<HTMLElement>('[data-detail-tagline]');
    const leadLines = page.querySelectorAll<HTMLElement>('[data-detail-lead]');
    const figures = page.querySelectorAll<HTMLElement>('[data-detail-figure]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([poster, tagline, ...leadLines, ...figures].filter(Boolean), {
          clipPath: MASK_VISIBLE,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const heroTargets = [poster, tagline].filter(Boolean) as HTMLElement[];
        setMaskHidden(heroTargets);

        if (poster) {
          animateMaskReveal(poster, 'bottom', { duration: 0.82, delay: 0.05 });
        }
        if (tagline) {
          animateMaskReveal(tagline, 'bottom', { duration: 0.62, delay: 0.15 });
        }

        gsap.set(leadLines, { clipPath: MASK_HIDDEN_BOTTOM });
        gsap.set(figures, { clipPath: MASK_HIDDEN_BOTTOM });

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(page.querySelector('[data-detail-body]') ?? page, 0.82),
          })
          .to(
            leadLines,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.08,
              duration: 0.62,
              ease: 'power3.out',
            },
            0,
          )
          .to(
            figures,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.07,
              duration: 0.68,
              ease: 'power3.out',
            },
            0.12,
          );
      });
    }, page);

    return () => {
      ctx.revert();
    };
  }, [project.slug]);

  return (
    <main id="main-content" className={styles.page} ref={pageRef} tabIndex={-1}>
      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <img
            src={coverSrc}
            alt=""
            className={styles.heroImage}
            fetchPriority="high"
            onError={(event) => {
              const target = event.currentTarget;
              if (target.src !== FALLBACK_IMAGE) {
                target.src = FALLBACK_IMAGE;
              }
            }}
          />
        </div>
        <div className={styles.heroContent}>
          <Link href="/#chapter-featured-projects" className={styles.backLink}>
            Back to projects
          </Link>
          <h1 className={styles.posterTitle} data-detail-poster>
            {getPosterTitle(project)}
          </h1>
          <p className={styles.tagline} data-detail-tagline>
            {project.tagline}
          </p>
        </div>
      </header>

      <div className={styles.body} data-detail-body>
        <div className={styles.editorial}>
          <dl className={styles.meta}>
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>{project.services}</dd>
            </div>
          </dl>

          <section className={styles.writeup} aria-label="Project writeup">
            <div className={styles.writeupBlock}>
              <h2 className={styles.writeupHeading}>Concept</h2>
              {project.concept.split(/\n\n+/).map((paragraph, index) => (
                <p key={`concept-${index}`} data-detail-lead>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className={styles.writeupBlock}>
              <h2 className={styles.writeupHeading}>Story</h2>
              {project.story.split(/\n\n+/).map((paragraph, index) => (
                <p key={`story-${index}`} data-detail-lead>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </div>

        <ProjectGallery
          key={galleryImages.join('|')}
          images={galleryImages}
          projectTitle={project.title}
        />

        <nav className={styles.nav} aria-label="Project navigation">
          <Link href={`/projects/${adjacent.prev.slug}`} className={styles.navLink}>
            <span>Previous</span>
            <strong>{getPosterTitle(adjacent.prev)}</strong>
          </Link>
          <Link href={`/projects/${adjacent.next.slug}`} className={`${styles.navLink} ${styles.navLinkNext}`}>
            <span>Next</span>
            <strong>{getPosterTitle(adjacent.next)}</strong>
          </Link>
        </nav>
      </div>
    </main>
  );
}
