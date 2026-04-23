'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './WhoWeAre.module.scss';

const HEADLINE_WORDS = ["WE'RE", 'A', 'CREW', 'OF', 'CREATORS,', 'DREAMERS,', 'AND', 'DOERS.'];

const ROLE_TITLES = [
  'Visionary designers.',
  'Technologists.',
  'Cultural strategists.',
  'Execution experts.',
];

const BODY_LINES = [
  'We bring together creativity, technology, and real-world production to build experiences that connect brands with people in meaningful ways.',
  'Every idea is approached with curiosity, precision, and the ambition to create something that feels relevant, engaging, and memorable.',
  "Because great work doesn't just communicate - it creates emotion.",
];

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const headlineWords = section.querySelectorAll('[data-headline-word]');
    const roles = section.querySelectorAll('[data-role]');
    const bodyLines = section.querySelectorAll('[data-body-line]');
    const studioLine = section.querySelector('[data-studio-line]');
    const syncLogoContrast = () =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        end: 'bottom 28%',
        onEnter: () => document.documentElement.style.setProperty('--logo-invert', '0'),
        onEnterBack: () => document.documentElement.style.setProperty('--logo-invert', '0'),
        onLeaveBack: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onRefresh: (self) => {
          if (self.isActive) {
            document.documentElement.style.setProperty('--logo-invert', '0');
          }
        },
      });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([headlineWords, roles, bodyLines], { autoAlpha: 1, x: 0, y: 0, scale: 1 });
        if (studioLine) {
          gsap.set(studioLine, { autoAlpha: 1, y: 0, letterSpacing: '0.24em' });
        }
        const logoTrigger = syncLogoContrast();
        return () => {
          logoTrigger.kill();
        };
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const logoTrigger = syncLogoContrast();

        if (studioLine) {
          gsap.fromTo(
            studioLine,
            { autoAlpha: 0, y: 18, letterSpacing: '0.34em' },
            {
              autoAlpha: 1,
              y: 0,
              letterSpacing: '0.24em',
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 74%',
              },
            },
          );
        }

        gsap.fromTo(
          headlineWords,
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.06,
            duration: 0.84,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
          },
        );

        gsap.fromTo(
          roles,
          {
            x: () => gsap.utils.random(-100, 100),
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
          },
        );

        gsap.fromTo(
          bodyLines,
          { y: 24, autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0%)' },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            stagger: 0.12,
            duration: 0.78,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 58%',
            },
          },
        );

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
      id="chapter-who-we-are"
      data-chapter="who-we-are"
      ref={sectionRef}
      className={styles.section}
      aria-label="Who we are"
    >
      <div className={styles.inner}>
        <p className={styles.kicker}>WHO WE ARE</p>
        <p className={styles.studioLine} data-studio-line>
          A CREATIVE EXPERIENCE STUDIO
        </p>

        <div className={styles.heroBlock}>
          <h2 className={styles.heading}>
            {HEADLINE_WORDS.map((word) => (
              <span key={word} className={styles.wordWrap}>
                <span data-headline-word>{word}</span>
              </span>
            ))}
          </h2>

          <div className={styles.roles}>
            {ROLE_TITLES.map((role) => (
              <p key={role} data-role className={styles.role}>
                {role}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.bodyCopy}>
          {BODY_LINES.map((line) => (
            <p key={line} data-body-line>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
