'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './HowItWorks.module.scss';

const PHASES = [
  {
    title: 'DISCOVER',
    description: 'Align on intent, audience behavior, and what success should feel like in-room.',
  },
  {
    title: 'DESIGN',
    description: 'Shape narrative, visual language, and interaction systems into one coherent experience.',
  },
  {
    title: 'BUILD',
    description: 'Produce assets, environments, and technical layers with production-grade reliability.',
  },
  {
    title: 'GO LIVE',
    description: 'Launch, operate, and optimize in real time with a single accountable execution team.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-card]'));
    if (!cards.length) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        yPercent: (index) => (index === 0 ? 0 : 115),
        autoAlpha: (index) => (index === 0 ? 1 : 0),
        zIndex: (index) => cards.length - index,
      });

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { yPercent: 0, autoAlpha: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 24%',
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextIndex = Math.min(
                cards.length - 1,
                Math.floor(self.progress * cards.length + 0.001),
              );
              setActiveIndex(nextIndex);
            },
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) {
            return;
          }

          timeline.to(
            card,
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: 'none',
              duration: 1,
            },
            index - 0.2,
          );

          timeline.to(
            cards.slice(0, index),
            {
              scale: 0.96,
              yPercent: -7,
              opacity: 0.55,
              stagger: 0.05,
              duration: 0.85,
              ease: 'none',
            },
            index - 0.2,
          );
        });
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
      id="chapter-how-it-works"
      data-chapter="how-it-works"
      ref={sectionRef}
      className={styles.section}
      aria-label="How it works"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p>How It Works</p>
          <h2>DISCOVER TO GO LIVE, BUILT AS ONE CONTINUOUS SYSTEM.</h2>
        </header>

        <div className={styles.stack}>
          {PHASES.map((phase) => (
            <article key={phase.title} data-card className={styles.card}>
              <h3>{phase.title}</h3>
              <p>{phase.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.progress} aria-hidden="true">
          {PHASES.map((phase, index) => (
            <span
              key={phase.title}
              className={index === activeIndex ? styles.dotActive : styles.dot}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
