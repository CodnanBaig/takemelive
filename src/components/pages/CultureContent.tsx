'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import {
  MASK_HIDDEN_BOTTOM,
  MASK_VISIBLE,
  animateMaskReveal,
  setMaskHidden,
} from '@/lib/maskReveal';
import { sectionRevealScroll } from '@/lib/scrollScene';
import styles from './CultureContent.module.scss';

const CULTURE_POINTS = [
  {
    title: 'Collaborative by design',
    detail:
      'Strategists, designers, technologists, and producers work as one unit from first sketch to final show call.',
  },
  {
    title: 'Precision under pressure',
    detail:
      'We operate with technical discipline and production rigor so bold creative ideas stay reliable in the real world.',
  },
  {
    title: 'Purpose-driven craft',
    detail:
      'Every decision is anchored to audience impact — creating moments that are remembered beyond the event itself.',
  },
] as const;

export default function CultureContent() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) {
      return;
    }

    const title = page.querySelector<HTMLElement>('[data-culture-title]');
    const lead = page.querySelector<HTMLElement>('[data-culture-lead]');
    const cards = page.querySelectorAll<HTMLElement>('[data-culture-card]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([title, lead, ...cards].filter(Boolean), { clipPath: MASK_VISIBLE });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const heroTargets = [title, lead].filter(Boolean) as HTMLElement[];
        setMaskHidden(heroTargets);
        if (title) {
          animateMaskReveal(title, 'bottom', { duration: 0.78, delay: 0.04 });
        }
        if (lead) {
          animateMaskReveal(lead, 'bottom', { duration: 0.62, delay: 0.14 });
        }

        gsap.set(cards, { clipPath: MASK_HIDDEN_BOTTOM });
        gsap.to(cards, {
          clipPath: MASK_VISIBLE,
          stagger: 0.09,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: sectionRevealScroll(page.querySelector('[data-culture-grid]') ?? page, 0.8),
        });
      });
    }, page);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main id="main-content" className={styles.page} ref={pageRef} tabIndex={-1}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <h1 className={styles.title} data-culture-title>
            Our culture
          </h1>
          <p className={styles.lead} data-culture-lead>
            The way we work is as intentional as what we build: collaborative, detail-focused, and
            relentlessly committed to meaningful outcomes.
          </p>
        </header>

        <section className={styles.grid} data-culture-grid aria-label="Culture principles">
          {CULTURE_POINTS.map((point) => (
            <article key={point.title} className={styles.card} data-culture-card>
              <h2>{point.title}</h2>
              <p>{point.detail}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
