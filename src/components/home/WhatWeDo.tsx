'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { MASK_HIDDEN_BOTTOM, MASK_HIDDEN_RIGHT, MASK_VISIBLE } from '@/lib/maskReveal';
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
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const title = titleRef.current;
    if (!section || !title) {
      return;
    }

    const lines = section.querySelectorAll('[data-line]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([title, ...lines], { clipPath: MASK_VISIBLE });
        if (media) {
          gsap.set(media, { clipPath: MASK_VISIBLE, x: 0 });
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(title, { clipPath: MASK_HIDDEN_BOTTOM });
        gsap.set(lines, { clipPath: MASK_HIDDEN_BOTTOM });
        if (media) {
          gsap.set(media, { clipPath: MASK_HIDDEN_RIGHT, x: 0 });
        }

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.82),
          })
          .to(
            title,
            {
              clipPath: MASK_VISIBLE,
              duration: 0.55,
              ease: 'power3.out',
            },
            0,
          )
          .to(
            lines,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.08,
              duration: 0.48,
              ease: 'power3.out',
            },
            0.12,
          );

        if (media) {
          gsap.to(media, {
            clipPath: MASK_VISIBLE,
            ease: 'power3.out',
            duration: 0.7,
            scrollTrigger: sectionRevealScroll(section, 0.88),
          });
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
      data-scene="manifesto"
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
              Manifesto
            </p>
            <h2 ref={titleRef} data-scroll-shift>
              IMMERSIVE EXPERIENCES BUILT TO STAY WITH PEOPLE.
            </h2>
            <div className={styles.lines}>
              {LINES.map((line, index) => (
                <p key={line} data-line className={styles.lineRow}>
                  <span className={styles.lineIndex}>{`0${index + 1}`}</span>
                  <span className={styles.lineText}>{line}</span>
                </p>
              ))}
            </div>
          </div>

          <figure
            ref={mediaRef}
            className={styles.media}
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
