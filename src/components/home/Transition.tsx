'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { MASK_HIDDEN_BOTTOM, MASK_VISIBLE } from '@/lib/maskReveal';
import ScrollOrnament from './ScrollOrnament';
import styles from './Transition.module.scss';

const MANIFESTO_WORDS = [
  'NOT',
  'EVERYTHING',
  'NEEDS',
  'ATTENTION.',
  'YOUR',
  'BRAND',
  'DOES.',
];

const SUBHEADING_LINES = [
  'We create experiences designed to be seen, felt, and remembered.',
  'Moments that stop people.',
  'Spaces that pull them in.',
  'Stories that stay with them.',
  'Because when something happens live, it matters more.',
];

export default function Transition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const lightSweepRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const curtain = curtainRef.current;
    const lightSweep = lightSweepRef.current;
    const railWords = section?.querySelectorAll('[data-rail-word]');
    const subLines = section?.querySelectorAll('[data-subline]');

    if (!section || !curtain || !lightSweep || !railWords || !subLines) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(curtain, { xPercent: -102 });
        gsap.set(lightSweep, { xPercent: 120, autoAlpha: 0 });
        gsap.set(railWords, { clipPath: MASK_VISIBLE });
        gsap.set(subLines, { clipPath: MASK_VISIBLE, y: 0 });
        document.documentElement.style.setProperty('--logo-invert', '0');
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(curtain, { xPercent: 0 });
        gsap.set(lightSweep, { xPercent: -140, autoAlpha: 0.9 });
        gsap.set(railWords, { clipPath: MASK_HIDDEN_BOTTOM });
        gsap.set(subLines, { clipPath: MASK_HIDDEN_BOTTOM, y: 0 });
        gsap.set(document.documentElement, { '--logo-invert': 1 });

        const getPinDistance = () => {
          const revealDistance = window.innerHeight * 0.95;
          const manifestoDistance = window.innerHeight * 1.15;
          const holdDistance = window.innerHeight * 0.42;
          const exitDistance = window.innerHeight * 0.95;
          return Math.round(revealDistance + manifestoDistance + holdDistance + exitDistance);
        };

        const manifestoStart = 0.32;
        const sublineStart = 0.58;
        const holdStart = 0.94;
        const exitStart = holdStart + 0.22;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getPinDistance()}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            curtain,
            {
              xPercent: -102,
              duration: 0.28,
              ease: 'power2.inOut',
            },
            0,
          )
          .to(
            lightSweep,
            {
              xPercent: 160,
              autoAlpha: 0.35,
              duration: 0.28,
              ease: 'power2.inOut',
            },
            0,
          )
          .to(
            document.documentElement,
            {
              '--logo-invert': 0,
              duration: 0.28,
              ease: 'none',
            },
            0,
          )
          .to(
            lightSweep,
            {
              autoAlpha: 0,
              duration: 0.12,
              ease: 'none',
            },
            0.26,
          )
          .to(
            railWords,
            {
              clipPath: MASK_VISIBLE,
              duration: 0.38,
              ease: 'power3.out',
              stagger: 0.04,
            },
            manifestoStart,
          )
          .to(
            subLines,
            {
              clipPath: MASK_VISIBLE,
              duration: 0.32,
              ease: 'power3.out',
              stagger: 0.05,
            },
            sublineStart,
          )
          .to(
            railWords,
            {
              clipPath: MASK_HIDDEN_BOTTOM,
              duration: 0.28,
              ease: 'power2.in',
              stagger: 0.03,
            },
            exitStart,
          )
          .to(
            subLines,
            {
              clipPath: MASK_HIDDEN_BOTTOM,
              duration: 0.28,
              ease: 'power2.in',
              stagger: 0.04,
            },
            exitStart,
          );
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      document.documentElement.style.setProperty('--logo-invert', '1');
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-transition"
      data-chapter="transition"
      data-scene="manifesto"
      ref={sectionRef}
      data-logo-control="manual"
      className={styles.transition}
      aria-label="Manifesto"
    >
      <ScrollOrnament variant="glyph-light" position="tl" />
      <div className={styles.stage}>
        <div ref={curtainRef} className={styles.blackCurtain} aria-hidden>
          <div ref={lightSweepRef} className={styles.lightSweep} />
        </div>
        <div className={styles.textViewport}>
          <div className={styles.textRail} aria-label={MANIFESTO_WORDS.join(' ')}>
            {MANIFESTO_WORDS.map((word) => (
              <span key={word} className={styles.railWord} data-rail-word>
                <span className={styles.railWordInner}>{word}</span>
              </span>
            ))}
          </div>
          <div className={styles.subheading}>
            {SUBHEADING_LINES.map((line) => (
              <p key={line} className={styles.subLine} data-subline>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
