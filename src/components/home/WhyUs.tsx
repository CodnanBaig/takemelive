'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { sectionRevealScroll } from '@/lib/scrollScene';
import ScrollOrnament from './ScrollOrnament';
import styles from './WhyUs.module.scss';

const POSTER_LINES = ['MORE THAN', 'A VENDOR.', 'A LIVE SYSTEM.'];

const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'Culture-Led Concepting',
    description: 'Ideas are built from audience behavior, not trend-chasing decks.',
  },
  {
    number: '02',
    title: 'One Team, Full Execution',
    description: 'Strategy, creative, production, and on-ground delivery stay under one roof.',
  },
  {
    number: '03',
    title: 'Technology That Serves Story',
    description: 'Interactive systems are designed to amplify emotion, not distract from it.',
  },
  {
    number: '04',
    title: 'Measured Impact',
    description: 'Every scene is engineered for lasting recall and trackable engagement.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const eyebrow = section.querySelector('[data-eyebrow]');
    const posterLines = section.querySelectorAll('[data-poster-line]');
    const lead = section.querySelector('[data-lead]');
    const watermark = section.querySelector('[data-watermark]');
    const spine = section.querySelector('[data-spine]');
    const steps = section.querySelectorAll('[data-step]');
    const connectors = section.querySelectorAll('[data-connector]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([eyebrow, posterLines, lead, watermark, spine, steps, connectors], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          scaleX: 1,
          scaleY: 1,
          clearProps: 'all',
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.72),
          })
          .fromTo(
            eyebrow,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: 'none', duration: 0.35 },
            0,
          )
          .fromTo(
            posterLines,
            { yPercent: 110, autoAlpha: 0.15 },
            {
              yPercent: 0,
              autoAlpha: 1,
              stagger: 0.06,
              ease: 'none',
              duration: 0.65,
            },
            0.08,
          )
          .fromTo(
            lead,
            { y: 28, autoAlpha: 0.2 },
            { y: 0, autoAlpha: 1, ease: 'none', duration: 0.55 },
            0.2,
          );

        if (watermark) {
          gsap.fromTo(
            watermark,
            { yPercent: 22, autoAlpha: 0.04 },
            {
              yPercent: -18,
              autoAlpha: 0.22,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.85,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (spine) {
          gsap.fromTo(
            spine,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 68%',
                end: 'bottom 28%',
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 58%',
              end: 'bottom 22%',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            steps,
            {
              xPercent: (index) => (index % 2 === 0 ? -18 : 18),
              autoAlpha: 0.25,
            },
            {
              xPercent: 0,
              autoAlpha: 1,
              stagger: 0.07,
              ease: 'none',
              duration: 1,
            },
            0,
          )
          .fromTo(
            connectors,
            {
              scaleX: 0,
              transformOrigin: (index) => (index % 2 === 0 ? 'right center' : 'left center'),
            },
            {
              scaleX: 1,
              stagger: 0.06,
              ease: 'none',
              duration: 1,
            },
            0.12,
          );
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-why-us"
      data-chapter="why-us"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Why Take Me Live"
    >
      <ScrollOrnament variant="glyph-light" position="br" />
      <div className={styles.inner}>
        <header className={styles.poster}>
          <p className={styles.kicker} data-eyebrow data-scroll-shift>
            WHY US
          </p>
          <div className={styles.posterGrid}>
            <div className={styles.posterCopy}>
              <h2 className={styles.heading}>
                {POSTER_LINES.map((line) => (
                  <span key={line} className={styles.lineWrap}>
                    <span data-poster-line>{line}</span>
                  </span>
                ))}
              </h2>
            </div>
            <p className={styles.lead} data-lead data-scroll-shift>
              We combine strategy, production, and live execution into one cohesive system, so the experience lands
              hard and feels intentional from first contact to final recall.
            </p>
          </div>
          <span className={styles.watermark} data-watermark aria-hidden="true">
            CULTURE
          </span>
        </header>

        <div className={styles.journey}>
          <div className={styles.spine} data-spine aria-hidden="true" />
          {DIFFERENTIATORS.map((item, index) => (
            <article
              key={item.number}
              data-step
              className={`${styles.step} ${index % 2 === 0 ? styles.stepLeft : styles.stepRight}`}
            >
              <div
                data-connector
                className={`${styles.connector} ${index % 2 === 0 ? styles.connectorLeft : styles.connectorRight}`}
                aria-hidden="true"
              />
              <div className={styles.stepCard}>
                <p className={styles.number}>{item.number}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
