'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
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

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(words, { y: 0, autoAlpha: 1 });
        gsap.set(indicator, { autoAlpha: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
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
          '[data-subheading]',
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
      });

      mm.add('(pointer:fine) and (prefers-reduced-motion: no-preference)', () => {
        const spotXTo = gsap.quickTo(heading, '--spot-x', { duration: 0.45, ease: 'power2.out' });
        const spotYTo = gsap.quickTo(heading, '--spot-y', { duration: 0.45, ease: 'power2.out' });
        const spotSizeTo = gsap.quickTo(heading, '--spot-size', { duration: 0.55, ease: 'power2.out' });
        const spotOpacityTo = gsap.quickTo(heading, '--spot-opacity', {
          duration: 0.32,
          ease: 'power2.out',
        });

        const setPointer = (event: PointerEvent) => {
          const bounds = heading.getBoundingClientRect();
          spotXTo(event.clientX - bounds.left);
          spotYTo(event.clientY - bounds.top);
        };

        const handlePointerEnter = (event: PointerEvent) => {
          setPointer(event);
          spotSizeTo(280);
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
      <div className={styles.inner}>
        <h1 ref={headingRef} className={styles.heading}>
          {HERO_WORDS.map((word) => (
            <span key={word} className={styles.wordWrap}>
              <span data-word className={styles.word}>
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p data-subheading className={styles.subheading}>
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
