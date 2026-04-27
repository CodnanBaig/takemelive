'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './Team.module.scss';

const TEAM_ROLES = [
  {
    title: 'Designers',
    note: 'Translate brand intent into visual and spatial systems that feel immediate.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Technologists',
    note: 'Build interactions and intelligence that make ambitious ideas truly perform.',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Producers',
    note: 'Orchestrate execution with precision from first concept through showtime.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
  },
] as const;

const VALUES = ['Collaborative', 'Detail-focused', 'Purpose-driven'] as const;

export default function Team() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const headline = section.querySelector<HTMLElement>('[data-team-headline]');
    const intro = section.querySelector<HTMLElement>('[data-team-intro]');
    const kicker = section.querySelector<HTMLElement>('[data-team-kicker]');
    const left = section.querySelector<HTMLElement>('[data-team-left]');
    const right = section.querySelector<HTMLElement>('[data-team-right]');
    const chips = Array.from(section.querySelectorAll<HTMLElement>('[data-team-chip]'));
    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-team-card]'));
    const media = Array.from(section.querySelectorAll<HTMLElement>('[data-team-media]'));
    const cardBodies = Array.from(section.querySelectorAll<HTMLElement>('[data-team-card-body]'));
    const divider = section.querySelector<HTMLElement>('[data-team-divider]');
    const hoverCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([kicker, headline, intro, ...chips, ...cards, divider, ...media, ...cardBodies], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(cards, {
          transformPerspective: 1200,
          transformOrigin: '50% 50%',
        });

        if (divider) {
          gsap.fromTo(
            divider,
            { scaleY: 0, transformOrigin: 'top center', autoAlpha: 0 },
            {
              scaleY: 1,
              autoAlpha: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                once: true,
              },
            },
          );
        }

        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        });

        introTl
          .fromTo(
            left,
            { autoAlpha: 0, x: -70, y: 24, rotateY: -10 },
            { autoAlpha: 1, x: 0, y: 0, rotateY: 0, duration: 0.78, ease: 'power3.out' },
          )
          .fromTo(
            [kicker, headline],
            { autoAlpha: 0, yPercent: 120, skewY: 8 },
            {
              autoAlpha: 1,
              yPercent: 0,
              skewY: 0,
              duration: 0.72,
              stagger: 0.08,
              ease: 'power4.out',
            },
            '-=0.58',
          )
          .fromTo(
            intro,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 0.56, ease: 'power3.out' },
            '-=0.42',
          )
          .fromTo(
            chips,
            { autoAlpha: 0, y: 30, scale: 0.88, rotateX: -24 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.55,
              stagger: 0.09,
              ease: 'back.out(1.6)',
            },
            '-=0.28',
          );

        gsap.fromTo(
          right,
          { autoAlpha: 0, x: 90, y: 24 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.84,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          },
        );

        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 86, rotateX: 18, rotateY: -12, scale: 0.88 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.86,
            stagger: 0.14,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 74%',
              once: true,
            },
          },
        );

        gsap.fromTo(
          media,
          { scale: 1.2, autoAlpha: 0.3 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 74%',
              once: true,
            },
          },
        );

        gsap.fromTo(
          cardBodies,
          { autoAlpha: 0, x: 26 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.62,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
              once: true,
            },
          },
        );

        cards.forEach((card, index) => {
          const cardMedia = media[index];
          const enter = () => {
            gsap.to(card, {
              y: -8,
              rotateX: -2,
              rotateY: index % 2 === 0 ? 2 : -2,
              duration: 0.28,
              ease: 'power2.out',
              overwrite: true,
            });
            if (cardMedia) {
              gsap.to(cardMedia, {
                scale: 1.06,
                duration: 0.34,
                ease: 'power2.out',
                overwrite: true,
              });
            }
          };
          const leave = () => {
            gsap.to(card, {
              y: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 0.28,
              ease: 'power2.out',
              overwrite: true,
            });
            if (cardMedia) {
              gsap.to(cardMedia, {
                scale: 1,
                duration: 0.34,
                ease: 'power2.out',
                overwrite: true,
              });
            }
          };
          card.addEventListener('mouseenter', enter);
          card.addEventListener('mouseleave', leave);
          hoverCleanups.push(() => {
            card.removeEventListener('mouseenter', enter);
            card.removeEventListener('mouseleave', leave);
          });
        });
      });
    }, section);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-team"
      data-chapter="team"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Team"
    >
      <div className={styles.inner}>
        <div className={styles.left} data-team-left>
          <p className={styles.kicker} data-team-kicker>
            Team
          </p>
          <h2 data-team-headline className={styles.headline}>
            PEOPLE BEHIND THE EXPERIENCES.
          </h2>
          <p data-team-intro className={styles.intro}>
            Designers, technologists, and producers working together to turn ambitious ideas into
            real-world moments.
          </p>
          <div className={styles.values}>
            {VALUES.map((value) => (
              <span key={value} className={styles.valueChip} data-team-chip>
                {value}
              </span>
            ))}
          </div>
        </div>

        <span className={styles.divider} data-team-divider aria-hidden="true" />

        <div className={styles.right} data-team-right>
          {TEAM_ROLES.map((role) => (
            <article key={role.title} className={styles.card} data-team-card>
              <div className={styles.media} data-team-media>
                <img src={role.image} alt="" loading="lazy" />
              </div>
              <div className={styles.cardBody} data-team-card-body>
                <h3>{role.title}</h3>
                <p>{role.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
