'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { sectionRevealScroll } from '@/lib/scrollScene';
import ScrollOrnament from './ScrollOrnament';
import styles from './WhatWeDo.module.scss';

const LINES = [
  'Take Me Live creates bold, immersive environments where brands connect with people in real time.',
  'We combine creative thinking, spatial design, technology, and storytelling to turn ideas into experiences that capture attention and create lasting impact.',
  'From large-scale productions to intimate activations, every detail is designed to perform.',
  "Because powerful experiences don't just communicate, they stay with people.",
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLElement | null>(null);

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
        const isCompact = window.matchMedia('(max-width: 900px)').matches;

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.8),
          })
          .fromTo(
            lines,
            {
              y: 32,
              x: (index: number) => (isCompact ? 0 : index % 2 === 0 ? -48 : 48),
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
            { x: isCompact ? 0 : 140, autoAlpha: 0.25, scale: 0.96 },
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

          <figure
            ref={mediaRef}
            className={styles.placeholderImage}
            data-scroll-depth
            aria-label="Live production planning table"
          >
            <Image
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
              alt="Crowd at a live concert with stage lights and raised hands"
              fill
              sizes="(max-width: 960px) 92vw, 38vw"
            />
            <figcaption>Show energy, engineered</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
