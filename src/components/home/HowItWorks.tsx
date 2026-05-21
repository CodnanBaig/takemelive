'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { sectionRevealScroll } from '@/lib/scrollScene';
import ScrollOrnament from './ScrollOrnament';
import styles from './HowItWorks.module.scss';

const PHASES = [
  {
    title: 'DISCOVER',
    shortTitle: 'Discover',
    description: 'Align on intent, audience behavior, and what success should feel like in the room.',
    detail: 'We map the audience, the objective, and the emotional outcome before design decisions start.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    alt: 'Creative team mapping experience strategy on a wall of notes',
  },
  {
    title: 'DESIGN',
    shortTitle: 'Design',
    description: 'Shape narrative, visual language, and interaction systems into one coherent experience.',
    detail: 'Story, scenography, digital touchpoints, and flow get built as one visual language.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
    alt: 'Design team reviewing immersive environment concepts in studio',
  },
  {
    title: 'BUILD',
    shortTitle: 'Build',
    description: 'Produce assets, environments, and technical layers with production-grade reliability.',
    detail: 'Fabrication, content, staging, and technical systems are assembled with execution in mind.',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
    alt: 'Production crew working across lighting and technical equipment',
  },
  {
    title: 'GO LIVE',
    shortTitle: 'Go Live',
    description: 'Launch, operate, and optimize in real time with a single accountable execution team.',
    detail: 'The final experience goes live with on-ground control, iteration, and measurable delivery.',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
    alt: 'Live event atmosphere with audience and stage lights in motion',
  },
] as const;

const FALLBACK_IMAGE_SRC =
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-step]'));
    const lines = Array.from(section.querySelectorAll<HTMLElement>('[data-step-line]'));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(steps, { autoAlpha: 1, y: 0, x: 0 });
        gsap.set(lines, { scaleX: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isCompact = window.matchMedia('(max-width: 900px)').matches;

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.75),
          })
          .fromTo(
            steps,
            {
              y: 48,
              x: (index) => (isCompact ? 0 : index % 2 === 0 ? -32 : 32),
              autoAlpha: 0.2,
            },
            {
              y: 0,
              x: 0,
              autoAlpha: 1,
              stagger: 0.09,
              ease: 'none',
              duration: 1,
            },
            0,
          )
          .fromTo(
            lines,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              stagger: 0.08,
              ease: 'none',
              duration: 1,
            },
            0.1,
          );

        const triggers = steps.map((step, index) =>
          ScrollTrigger.create({
            trigger: step,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          }),
        );

        return () => {
          triggers.forEach((trigger) => trigger.kill());
        };
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const featured = featuredRef.current;
    if (!featured) {
      return;
    }

    const image = featured.querySelector('[data-featured-image]');
    const copy = featured.querySelectorAll('[data-featured-copy]');

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.12, yPercent: -4, autoAlpha: 0.5 },
        {
          scale: 1,
          yPercent: 4,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: featured,
            start: 'top 78%',
            end: 'bottom 32%',
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        copy,
        { y: 32, autoAlpha: 0.25 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: featured,
            start: 'top 76%',
            end: 'top 40%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [activeIndex]);

  const activePhase = PHASES[activeIndex];

  return (
    <section
      id="chapter-how-it-works"
      data-chapter="how-it-works"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="How it works"
    >
      <ScrollOrnament variant="glyph-dark" position="br" />
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.kicker}>How It Works</p>
          <h2 className={styles.heading}>DISCOVER TO GO LIVE, BUILT AS ONE CONTINUOUS SYSTEM.</h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.featured} ref={featuredRef}>
            <div className={styles.featuredMedia}>
              <img
                key={activePhase.image}
                src={activePhase.image}
                alt={activePhase.alt}
                loading="lazy"
                className={styles.featuredImage}
                data-featured-image
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.src !== FALLBACK_IMAGE_SRC) {
                    target.src = FALLBACK_IMAGE_SRC;
                  }
                }}
              />
            </div>

            <div className={styles.featuredCopy}>
              <p className={styles.featuredIndex} data-featured-copy>
                {String(activeIndex + 1).padStart(2, '0')}
              </p>
              <h3 data-featured-copy>{activePhase.shortTitle}</h3>
              <p data-featured-copy>{activePhase.detail}</p>
            </div>
          </div>

          <div className={styles.steps}>
            {PHASES.map((phase, index) => (
              <article
                key={phase.title}
                data-step
                className={index === activeIndex ? styles.stepActive : styles.step}
              >
                <div className={styles.stepTop}>
                  <span className={styles.stepIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.stepLine} data-step-line aria-hidden="true" />
                </div>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
