'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { sectionRevealScroll } from '@/lib/scrollScene';
import ScrollOrnament from './ScrollOrnament';
import styles from './WhatWeDo.module.scss';

const LINES = [
  'Take Me Live creates bold, immersive environments where brands connect with people in real time.',
  'We combine creative thinking, spatial design, technology, and storytelling to turn ideas into experiences that capture attention and create lasting impact.',
  'From large-scale productions to intimate activations, every detail is designed to perform.',
  "Because powerful experiences don't just communicate — they stay with people.",
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section) {
      return;
    }

    const lines = section.querySelectorAll('[data-line]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(lines, { autoAlpha: 1, y: 0, x: 0, clipPath: 'inset(0% 0% 0% 0%)' });
        if (media) {
          gsap.set(media, { autoAlpha: 1, x: 0 });
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.8),
          })
          .fromTo(
            lines,
            {
              y: 32,
              x: (index: number) => (index % 2 === 0 ? -48 : 48),
              autoAlpha: 0.2,
              clipPath: 'inset(0% 0% 100% 0%)',
            },
            {
              y: 0,
              x: 0,
              autoAlpha: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              stagger: 0.08,
              ease: 'none',
              duration: 1,
            },
            0,
          );

        if (media) {
          gsap.fromTo(
            media,
            { x: 140, autoAlpha: 0.25, scale: 0.96 },
            {
              x: 0,
              autoAlpha: 1,
              scale: 1,
              ease: 'none',
              scrollTrigger: sectionRevealScroll(section, 0.85),
            },
          );
        }
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
      id="chapter-what-we-do"
      data-chapter="what-we-do"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="What we do"
    >
      <ScrollOrnament variant="glyph-dark" position="tl" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.kicker} data-scroll-shift>
              What We Do
            </p>
            <h2 data-scroll-shift>IMMERSIVE EXPERIENCES BUILT TO STAY WITH PEOPLE.</h2>
            <div className={styles.lines}>
              {LINES.map((line, index) => (
                <p key={line} data-line className={styles.lineCard}>
                  <span className={styles.lineIndex}>{`0${index + 1}`}</span>
                  <span>{line}</span>
                </p>
              ))}
            </div>
          </div>

          <div
            ref={mediaRef}
            className={styles.placeholderImage}
            data-scroll-depth
            aria-label="Section three image placeholder"
          >
            <span>Placeholder Image</span>
          </div>
        </div>
      </div>
    </section>
  );
}
