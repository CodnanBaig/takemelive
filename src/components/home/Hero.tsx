'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { animateMaskReveal, setMaskHidden, setMaskVisible } from '@/lib/maskReveal';
import { sectionRevealScroll, sectionSpanScroll } from '@/lib/scrollScene';
import ScrollOrnament from './ScrollOrnament';
import styles from './Hero.module.scss';

const HERO_LINES = [
  ['EXPERIENCES', 'THAT'],
  ['MOVE', 'PEOPLE.'],
] as const;

const SUBHEADING_LINES = [
  'Creative experience studio designing live moments,',
  'immersive environments, and cultural impact.',
];

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
    const subLines = section.querySelectorAll('[data-subline]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        setMaskVisible([...words, ...subLines]);
        gsap.set(words, { yPercent: 0, clearProps: 'transform' });
        gsap.set(subLines, { clearProps: 'transform' });
        gsap.set(indicator, { autoAlpha: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isCompact = window.matchMedia('(max-width: 900px)').matches;

        setMaskHidden(words, 'bottom');
        setMaskHidden(subLines, 'bottom');
        gsap.set(indicator, { clipPath: 'inset(0% 0% 100% 0%)' });

        const loadTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

        loadTimeline
          .add(
            animateMaskReveal(words, 'bottom', {
              duration: 1.05,
              stagger: 0.09,
            }),
            0,
          )
          .add(
            animateMaskReveal(subLines, 'bottom', {
              duration: 0.82,
              stagger: 0.12,
            }),
            0.42,
          )
          .to(
            indicator,
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.7,
            },
            0.72,
          );

        gsap.to(indicator, {
          y: 12,
          repeat: -1,
          yoyo: true,
          duration: 0.85,
          ease: 'sine.inOut',
          delay: 1.1,
        });

        gsap
          .timeline({
            scrollTrigger: sectionSpanScroll(section, 0.5),
          })
          .to(
            words,
            {
              yPercent: (index) => -10 - index * 4,
              x: (index) => (isCompact ? 0 : index % 2 === 0 ? -14 : 14),
              scale: (index) => 1 - index * 0.012,
              ease: 'none',
              stagger: 0.04,
              duration: 1,
            },
            0,
          )
          .to(
            subLines,
            {
              yPercent: -120,
              ease: 'none',
              stagger: 0.05,
              duration: 1,
            },
            0,
          )
          .to(
            indicator,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
              y: 28,
              ease: 'none',
              duration: 0.65,
            },
            0,
          );

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.7),
          })
          .fromTo(
            words,
            { filter: 'blur(10px)' },
            { filter: 'blur(0px)', ease: 'none', stagger: 0.05, duration: 1 },
            0,
          );
      });

      mm.add('(pointer:fine) and (prefers-reduced-motion: no-preference)', () => {
        const spotXTo = gsap.quickTo(heading, '--spot-x', { duration: 1.45, ease: 'power3.out' });
        const spotYTo = gsap.quickTo(heading, '--spot-y', { duration: 1.45, ease: 'power3.out' });
        const spotOpacityTo = gsap.quickTo(heading, '--spot-opacity', {
          duration: 0.85,
          ease: 'power3.out',
        });

        const setPointer = (event: PointerEvent) => {
          const headingBounds = heading.getBoundingClientRect();
          spotXTo(event.clientX - headingBounds.left);
          spotYTo(event.clientY - headingBounds.top);
        };

        const handlePointerEnter = (event: PointerEvent) => {
          setPointer(event);
          spotOpacityTo(1);
        };

        const handlePointerMove = (event: PointerEvent) => setPointer(event);

        const handlePointerLeave = () => {
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
      data-scene="arrival"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Take Me Live hero"
    >
      <div className={styles.beam} aria-hidden="true" />
      <ScrollOrnament variant="glyph-light" position="tr" />
      <ScrollOrnament variant="glyph-dark" position="bl" />
      <div className={styles.inner}>
        <h1 ref={headingRef} className={styles.heading} data-scroll-shift>
          {HERO_LINES.map((line) => (
            <span key={line.join(' ')} className={styles.lineWrap}>
              {line.map((word) => (
                <span key={word} className={styles.wordWrap}>
                  <span data-word className={styles.word}>
                    {word}
                  </span>
                </span>
              ))}
            </span>
          ))}
          {/* Single spotlight overlay — same text, absolute over the base */}
          <span className={styles.spotlightOverlay} aria-hidden="true">
            {HERO_LINES.map((line) => (
              <span key={line.join(' ')} className={styles.lineWrap}>
                <span className={styles.spotlightText}>{line.join(' ')}</span>
              </span>
            ))}
          </span>
        </h1>
        <div className={styles.subheadingWrap}>
          {SUBHEADING_LINES.map((line) => (
            <p key={line} data-subline className={styles.subheading} data-scroll-shift>
              {line}
            </p>
          ))}
        </div>
      </div>
      <div ref={indicatorRef} className={styles.scrollIndicator} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.arrow}>↓</span>
      </div>
    </section>
  );
}
