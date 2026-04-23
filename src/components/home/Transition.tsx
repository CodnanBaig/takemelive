'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './Transition.module.scss';

const MESSAGE = 'NOT EVERYTHING NEEDS ATTENTION. YOUR BRAND DOES.';
const TEXT_RAIL = [MESSAGE];
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
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const curtain = curtainRef.current;
    const rail = railRef.current;
    const subLines = section?.querySelectorAll('[data-subline]');

    if (!section || !curtain || !rail || !subLines) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(curtain, { xPercent: -102 });
        gsap.set(rail, { autoAlpha: 1, x: 0 });
        gsap.set(subLines, { autoAlpha: 1, x: 0, y: 0, filter: 'blur(0px)' });
        document.documentElement.style.setProperty('--logo-invert', '0');
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const railTravel = window.innerWidth * 0.46;
        const sublineTravel = 260;
        gsap.set(curtain, { xPercent: 0 });
        gsap.set(rail, { autoAlpha: 0, x: railTravel });
        gsap.set(subLines, { autoAlpha: 0, x: 0, y: 12, filter: 'blur(6px)' });
        gsap.set(document.documentElement, { '--logo-invert': 1 });

        const getPinDistance = () => {
          const revealDistance = window.innerHeight * 0.9;
          const enterDistance = window.innerHeight * 1.1;
          const holdDistance = window.innerHeight * 0.35;
          const exitDistance = window.innerHeight * 1.1;
          return Math.round(revealDistance + enterDistance + holdDistance + exitDistance);
        };

        const holdStart = 0.96;
        const exitStart = holdStart + 0.24;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getPinDistance()}`,
            pin: true,
            scrub: true,
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
              duration: 0.34,
              ease: 'none',
            },
            0,
          )
          .to(
            document.documentElement,
            {
              '--logo-invert': 0,
              duration: 0.34,
              ease: 'none',
            },
            0,
          )
          .to(
            rail,
            {
              autoAlpha: 1,
              duration: 0.06,
              ease: 'none',
            },
            0.34,
          )
          .to(
            rail,
            {
              x: 0,
              duration: 0.5,
              ease: 'none',
            },
            0.34,
          )
          .fromTo(
            subLines,
            {
              x: (index: number) => (index % 2 === 0 ? sublineTravel : -sublineTravel),
              autoAlpha: 0,
              y: 12,
              filter: 'blur(6px)',
            },
            {
              x: 0,
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.42,
              ease: 'none',
              stagger: 0.06,
            },
            0.54,
          )
          .to(
            rail,
            {
              x: -railTravel,
              duration: 0.5,
              ease: 'none',
            },
            exitStart,
          )
          .to(
            rail,
            {
              autoAlpha: 0,
              duration: 0.06,
              ease: 'none',
            },
            exitStart + 0.44,
          )
          .to(
            subLines,
            {
              x: (index: number) => (index % 2 === 0 ? -sublineTravel : sublineTravel),
              autoAlpha: 0,
              y: 12,
              filter: 'blur(6px)',
              duration: 0.42,
              ease: 'none',
              stagger: 0.06,
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
      ref={sectionRef}
      className={styles.transition}
      aria-label="Horizontal text section"
    >
      <div className={styles.stage}>
        <div ref={curtainRef} className={styles.blackCurtain} aria-hidden />
        <div className={styles.textViewport}>
          <div ref={railRef} className={styles.textRail}>
            {TEXT_RAIL.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
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
