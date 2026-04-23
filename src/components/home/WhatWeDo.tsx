'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
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
    const syncLogoContrast = () =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        end: 'bottom 28%',
        onEnter: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onEnterBack: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onLeaveBack: () => document.documentElement.style.setProperty('--logo-invert', '0'),
        onRefresh: (self) => {
          if (self.isActive) {
            document.documentElement.style.setProperty('--logo-invert', '1');
          }
        },
      });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(lines, { autoAlpha: 1, y: 0, x: 0, clipPath: 'inset(0% 0% 0% 0%)' });
        if (media) {
          gsap.set(media, { autoAlpha: 1, x: 0 });
        }

        const logoTrigger = syncLogoContrast();
        return () => {
          logoTrigger.kill();
        };
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const logoTrigger = syncLogoContrast();

        gsap.fromTo(
          lines,
          {
            y: 24,
            x: (index: number) => (index % 2 === 0 ? -34 : 34),
            autoAlpha: 0,
            clipPath: 'inset(0% 0% 100% 0%)',
          },
          {
            y: 0,
            x: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            stagger: 0.12,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 62%',
            },
          },
        );

        if (media) {
          gsap.fromTo(
            media,
            { autoAlpha: 0, x: 220 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 62%',
              },
            },
          );
        }

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
      id="chapter-what-we-do"
      data-chapter="what-we-do"
      ref={sectionRef}
      className={styles.section}
      aria-label="What we do"
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.kicker}>What We Do</p>
            <h2>IMMERSIVE EXPERIENCES BUILT TO STAY WITH PEOPLE.</h2>
            <div className={styles.lines}>
              {LINES.map((line, index) => (
                <p key={line} data-line className={styles.lineCard}>
                  <span className={styles.lineIndex}>{`0${index + 1}`}</span>
                  <span>{line}</span>
                </p>
              ))}
            </div>
          </div>

          <div ref={mediaRef} className={styles.placeholderImage} aria-label="Section three image placeholder">
            <span>Placeholder Image</span>
          </div>
        </div>
      </div>
    </section>
  );
}
