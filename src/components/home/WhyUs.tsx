'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './WhyUs.module.scss';

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

    const items = section.querySelectorAll('[data-item]');
    const lines = section.querySelectorAll('[data-line]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([items, lines], { autoAlpha: 1, x: 0, scaleX: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          items,
          { x: -80, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.16,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
          },
        );

        gsap.fromTo(
          lines,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            stagger: 0.12,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 68%',
            },
          },
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
      ref={sectionRef}
      className={styles.section}
      aria-label="Why Take Me Live"
    >
      <div className={styles.inner}>
        <h2>WE ARE A STUDIO THAT MOVES CULTURE.</h2>
        <div className={styles.list}>
          {DIFFERENTIATORS.map((item) => (
            <article key={item.number} data-item className={styles.item}>
              <p className={styles.number}>{item.number}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span data-line className={styles.line} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
