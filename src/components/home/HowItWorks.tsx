'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
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
        gsap.fromTo(
          steps,
          {
            y: 42,
            x: (index) => (index % 2 === 0 ? -24 : 24),
            autoAlpha: 0,
          },
          {
            y: 0,
            x: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
            },
          },
        );

        gsap.fromTo(
          lines,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 68%',
            },
          },
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.08, autoAlpha: 0.75 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.72,
          ease: 'power3.out',
        },
      );

      gsap.fromTo(
        copy,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.62,
          stagger: 0.06,
          ease: 'power3.out',
        },
      );
    }, featured);

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
