'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { sectionRevealScroll, sectionSpanScroll } from '@/lib/scrollScene';
import ScrollOrnament from './ScrollOrnament';
import styles from './Hero.module.scss';

const HERO_WORDS = ['EXPERIENCES', 'THAT', 'MOVE', 'PEOPLE.'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const indicator = indicatorRef.current;

    if (!section || !heading || !indicator) {
      return;
    }

    const words = heading.querySelectorAll('[data-word]');
    const wordElements = Array.from(words) as HTMLElement[];
    const subheading = section.querySelector('[data-subheading]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(words, { y: 0, autoAlpha: 1, yPercent: 0 });
        gsap.set(subheading, { autoAlpha: 1, y: 0 });
        gsap.set(indicator, { autoAlpha: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isCompact = window.matchMedia('(max-width: 900px)').matches;

        gsap.fromTo(
          words,
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: 'power4.out',
            duration: 0.9,
            stagger: 0.08,
          },
        );

        gsap.fromTo(
          subheading,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, delay: 0.6, duration: 0.8, ease: 'power2.out' },
        );

        gsap.to(indicator, {
          y: 12,
          repeat: -1,
          yoyo: true,
          duration: 0.85,
          ease: 'sine.inOut',
        });

        gsap
          .timeline({
            scrollTrigger: sectionSpanScroll(section, 0.45),
          })
          .to(
            words,
            {
              yPercent: (index) => -8 - index * 4,
              x: (index) => (isCompact ? 0 : index % 2 === 0 ? -12 : 12),
              ease: 'none',
              stagger: 0.04,
              duration: 1,
            },
            0,
          )
          .to(
            subheading,
            {
              y: -48,
              autoAlpha: 0.15,
              ease: 'none',
              duration: 1,
            },
            0,
          )
          .to(
            indicator,
            {
              autoAlpha: 0,
              y: 28,
              ease: 'none',
              duration: 1,
            },
            0,
          );

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.65),
          })
          .fromTo(
            words,
            { filter: 'blur(6px)' },
            { filter: 'blur(0px)', ease: 'none', stagger: 0.06, duration: 1 },
            0,
          );
      });

      mm.add('(pointer:fine) and (prefers-reduced-motion: no-preference)', () => {
        const spotXTo = gsap.quickTo(heading, '--spot-x', { duration: 0.34, ease: 'power2.out' });
        const spotYTo = gsap.quickTo(heading, '--spot-y', { duration: 0.34, ease: 'power2.out' });
        const spotSizeTo = gsap.quickTo(heading, '--spot-size', { duration: 0.5, ease: 'power2.out' });
        const spotOpacityTo = gsap.quickTo(heading, '--spot-opacity', {
          duration: 0.32,
          ease: 'power2.out',
        });

        const setPointer = (event: PointerEvent) => {
          const headingBounds = heading.getBoundingClientRect();
          spotXTo(event.clientX - headingBounds.left);
          spotYTo(event.clientY - headingBounds.top);

          wordElements.forEach((word) => {
            const bounds = word.getBoundingClientRect();
            gsap.to(word, {
              '--spot-x': event.clientX - bounds.left,
              '--spot-y': event.clientY - bounds.top,
              duration: 0.28,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        };

        const handlePointerEnter = (event: PointerEvent) => {
          setPointer(event);
          spotSizeTo(380);
          spotOpacityTo(1);
        };

        const handlePointerMove = (event: PointerEvent) => setPointer(event);

        const handlePointerLeave = () => {
          spotSizeTo(120);
          spotOpacityTo(0);
        };

        heading.addEventListener('pointerenter', handlePointerEnter);
        heading.addEventListener('pointermove', handlePointerMove);
        heading.addEventListener('pointerleave', handlePointerLeave);

        return () => {
          heading.removeEventListener('pointerenter', handlePointerEnter);
          heading.removeEventListener('pointermove', handlePointerMove);
          heading.removeEventListener('pointerleave', handlePointerLeave);
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
      id="chapter-hero"
      data-chapter="hero"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Take Me Live hero"
    >
      <ScrollOrnament variant="glyph-light" position="tr" />
      <ScrollOrnament variant="glyph-dark" position="bl" />
      <div className={styles.inner}>
        <h1 ref={headingRef} className={styles.heading} data-scroll-shift>
          {HERO_WORDS.map((word) => (
            <span key={word} className={styles.wordWrap}>
              <span data-word className={styles.word}>
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p data-subheading className={styles.subheading} data-scroll-shift>
          Creative experience studio designing live moments, immersive environments, and cultural
          impact.
        </p>
      </div>
      <div ref={indicatorRef} className={styles.scrollIndicator} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.arrow}>↓</span>
      </div>
    </section>
  );
}
