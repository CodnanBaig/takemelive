'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import {
  MASK_HIDDEN_BOTTOM,
  MASK_VISIBLE,
} from '@/lib/maskReveal';
import { sectionRevealScroll } from '@/lib/scrollScene';
import { EVENT_FOLDERS, eventImage } from '@/lib/projectMedia';
import styles from './Team.module.scss';

const HERO_IMAGE = eventImage(EVENT_FOLDERS.redBullEnergy, 'el2.webp');

const TEAM_ROLES = [
  {
    code: '01',
    value: 'Design intent',
    title: 'Designers',
    field: 'Concept and space',
    note: 'Translate brand intent into visual and spatial systems that feel immediate.',
    tags: ['Concept', 'Visual language', 'Environment'],
    image: eventImage(EVENT_FOLDERS.maraya, 'Maraya_One_Republic-020.webp'),
  },
  {
    code: '02',
    value: 'Technical direction',
    title: 'Technologists',
    field: 'Interaction layer',
    note: 'Build interactions and intelligence that make ambitious ideas truly perform.',
    tags: ['Interactive', 'AI moments', 'Show control'],
    image: eventImage(EVENT_FOLDERS.ioNet, 'io2.webp'),
  },
  {
    code: '03',
    value: 'Live delivery',
    title: 'Producers',
    field: 'Delivery control',
    note: 'Orchestrate execution with precision from first concept through showtime.',
    tags: ['Crew', 'Vendors', 'Run of show'],
    image: eventImage(EVENT_FOLDERS.lusail, 'Lusail_Opening-252.webp'),
  },
] as const;

export default function Team() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const headlineLines = Array.from(section.querySelectorAll<HTMLElement>('[data-team-line]'));
    const board = section.querySelector<HTMLElement>('[data-team-board]');
    const heroMedia = section.querySelector<HTMLElement>('[data-team-hero-media]');
    const heroImage = section.querySelector<HTMLElement>('[data-team-hero-image]');
    const roles = Array.from(section.querySelectorAll<HTMLElement>('[data-team-role]'));
    const roleImages = Array.from(section.querySelectorAll<HTMLElement>('[data-team-role-image]'));
    const hoverCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [...headlineLines, board, heroMedia, ...roles, ...roleImages].filter(Boolean),
          { clipPath: MASK_VISIBLE, x: 0, y: 0, scale: 1, rotateY: 0 },
        );
        if (heroImage) {
          gsap.set(heroImage, { yPercent: 0, scale: 1 });
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(headlineLines, {
          clipPath: MASK_HIDDEN_BOTTOM,
        });
        gsap.set([board, heroMedia, ...roles].filter(Boolean), {
          clipPath: MASK_HIDDEN_BOTTOM,
        });
        gsap.set(roles, {
          transformPerspective: 1200,
          transformOrigin: '50% 50%',
        });

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.78),
          })
          .to(
            headlineLines,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.07,
              duration: 0.62,
              ease: 'power3.out',
            },
            0,
          )
          .to(board, { clipPath: MASK_VISIBLE, duration: 0.58, ease: 'power3.out' }, 0.2)
          .to(heroMedia, { clipPath: MASK_VISIBLE, duration: 0.55, ease: 'power3.out' }, 0.34)
          .to(
            roles,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.07,
              duration: 0.52,
              ease: 'power3.out',
            },
            0.4,
          )
          .to(
            roleImages,
            { scale: 1, duration: 0.42, ease: 'power3.out', stagger: 0.06 },
            0.46,
          );

        gsap.set(roleImages, { scale: 1.1 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
          .to(heroImage, { yPercent: -9, ease: 'none', duration: 1 }, 0)
          .to(roles, { y: (index) => (index - 1) * -10, ease: 'none', stagger: 0.02, duration: 1 }, 0);

        roles.forEach((role, index) => {
          const cardMedia = roleImages[index];
          const enter = () => {
            gsap.to(role, {
              x: 8,
              y: -4,
              rotateY: index % 2 === 0 ? 1.2 : -1.2,
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
            gsap.to(role, {
              x: 0,
              y: 0,
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
          role.addEventListener('mouseenter', enter);
          role.addEventListener('mouseleave', leave);
          hoverCleanups.push(() => {
            role.removeEventListener('mouseenter', enter);
            role.removeEventListener('mouseleave', leave);
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
      data-scene="showreel"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Team"
    >
      <div className={styles.inner}>
        <header className={styles.masthead}>
          <h2 data-team-headline className={styles.headline}>
            <span data-team-line className={styles.headlineLine}>
              People behind
            </span>
            <span data-team-line className={styles.headlineLine}>
              the live moment.
            </span>
          </h2>
        </header>

        <div className={styles.board} data-team-board>
          <figure className={styles.heroMedia} data-team-hero-media>
            <img src={HERO_IMAGE} alt="" loading="lazy" data-team-hero-image />
            <figcaption>
              <span>One crew</span>
              <span>From concept to showtime</span>
            </figcaption>
          </figure>

          <div className={styles.roleStack}>
            {TEAM_ROLES.map((role) => (
              <article key={role.title} className={styles.roleCard} data-team-role>
                <div className={styles.roleLead}>
                  <span className={styles.roleIndex}>{role.code}</span>
                  <span className={styles.roleValue}>{role.value}</span>
                </div>
                <div className={styles.roleBody}>
                  <p className={styles.roleField}>{role.field}</p>
                  <h3>{role.title}</h3>
                  <p className={styles.roleNote}>{role.note}</p>
                  <ul className={styles.tagList} aria-label={`${role.title} capabilities`}>
                    {role.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <figure className={styles.roleImage}>
                  <img src={role.image} alt="" loading="lazy" data-team-role-image />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
