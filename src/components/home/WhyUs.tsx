'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './WhyUs.module.scss';

const HEADLINE_LINES = ['BUILT TO', 'MOVE CULTURE', 'WITH INTENT.'];

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
    const headingLines = section.querySelectorAll('[data-heading-line]');
    const lead = section.querySelector('[data-lead]');
    const cards = section.querySelectorAll('[data-card]');
    const cardLines = section.querySelectorAll('[data-card-line]');
    const signalLines = section.querySelectorAll<HTMLElement>('[data-signal-line]');
    const syncLogoContrast = () =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        end: 'bottom 28%',
        onEnter: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onEnterBack: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onLeave: () => document.documentElement.style.setProperty('--logo-invert', '0'),
        onLeaveBack: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onRefresh: (self) => {
          if (self.isActive) {
            document.documentElement.style.setProperty('--logo-invert', '1');
          }
        },
      });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([eyebrow, headingLines, lead, cards, cardLines, signalLines], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          clearProps: 'all',
        });
        const logoTrigger = syncLogoContrast();
        return () => {
          logoTrigger.kill();
        };
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const logoTrigger = syncLogoContrast();

        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 76%',
              },
            },
          );
        }

        const introTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top 68%',
          },
        });

        introTimeline
          .fromTo(
            headingLines,
            { yPercent: 110, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.84,
              stagger: 0.08,
            },
          )
          .fromTo(
            lead,
            { y: 26, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
            },
            '-=0.28',
          );

        gsap.fromTo(
          cards,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.74,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 56%',
            },
          },
        );

        gsap.fromTo(
          cardLines,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 58%',
            },
          },
        );

        signalLines.forEach((line, index) => {
          const axis = line.dataset.axis ?? 'x';
          const direction = index % 2 === 0 ? 1 : -1;

          gsap.fromTo(
            line,
            axis === 'x'
              ? { scaleX: 0.18, xPercent: -18 * direction, autoAlpha: 0.22 }
              : { scaleY: 0.14, yPercent: 18 * direction, autoAlpha: 0.18 },
            axis === 'x'
              ? {
                  scaleX: 1,
                  xPercent: 22 * direction,
                  autoAlpha: 0.9,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                  },
                }
              : {
                  scaleY: 1,
                  yPercent: -20 * direction,
                  autoAlpha: 0.72,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                  },
                },
          );
        });

        return () => {
          logoTrigger.kill();
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

  return (
    <section
      id="chapter-why-us"
      data-chapter="why-us"
      ref={sectionRef}
      className={styles.section}
      aria-label="Why Take Me Live"
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <aside className={styles.meta}>
            <p className={styles.kicker} data-eyebrow>
              WHY US
            </p>
            <p className={styles.metaCopy}>Creative systems for brands that need energy, precision, and recall.</p>
          </aside>

          <div className={styles.stage}>
            <div className={styles.signalField} aria-hidden="true">
              <span className={`${styles.signalLine} ${styles.signalLineH1}`} data-signal-line data-axis="x" />
              <span className={`${styles.signalLine} ${styles.signalLineH2}`} data-signal-line data-axis="x" />
              <span className={`${styles.signalLine} ${styles.signalLineH3}`} data-signal-line data-axis="x" />
              <span className={`${styles.signalLine} ${styles.signalLineV1}`} data-signal-line data-axis="y" />
              <span className={`${styles.signalLine} ${styles.signalLineV2}`} data-signal-line data-axis="y" />
              <span className={`${styles.signalLine} ${styles.signalLineV3}`} data-signal-line data-axis="y" />
            </div>

            <header className={styles.intro}>
              <h2 className={styles.heading}>
                {HEADLINE_LINES.map((line) => (
                  <span key={line} className={styles.lineWrap}>
                    <span data-heading-line>{line}</span>
                  </span>
                ))}
              </h2>
              <p className={styles.lead} data-lead>
                We blend strategy, production, and interactive thinking into one live system, so the final work
                lands with clarity instead of chaos.
              </p>
            </header>

            <div className={styles.list}>
              {DIFFERENTIATORS.map((item) => (
                <article key={item.number} data-card className={styles.card}>
                  <div className={styles.cardTop}>
                    <p className={styles.number}>{item.number}</p>
                    <span data-card-line className={styles.cardLine} aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
