'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import {
  MASK_HIDDEN_BOTTOM,
  MASK_VISIBLE,
} from '@/lib/maskReveal';
import { sectionRevealScroll } from '@/lib/scrollScene';
import styles from './Team.module.scss';

const TEAM_ROLES = [
  {
    code: '01',
    title: 'Designers',
    field: 'Concept and space',
    note: 'Translate brand intent into visual and spatial systems that feel immediate.',
    tags: ['Concept', 'Visual language', 'Environment'],
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    code: '02',
    title: 'Technologists',
    field: 'Interaction layer',
    note: 'Build interactions and intelligence that make ambitious ideas truly perform.',
    tags: ['Interactive', 'AI moments', 'Show control'],
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    code: '03',
    title: 'Producers',
    field: 'Delivery control',
    note: 'Orchestrate execution with precision from first concept through showtime.',
    tags: ['Crew', 'Vendors', 'Run of show'],
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
  },
] as const;

const VALUES = ['Design intent', 'Technical direction', 'Live delivery'] as const;

export default function Team() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const headlineLines = Array.from(section.querySelectorAll<HTMLElement>('[data-team-line]'));
    const intro = section.querySelector<HTMLElement>('[data-team-intro]');
    const board = section.querySelector<HTMLElement>('[data-team-board]');
    const heroMedia = section.querySelector<HTMLElement>('[data-team-hero-media]');
    const heroImage = section.querySelector<HTMLElement>('[data-team-hero-image]');
    const chips = Array.from(section.querySelectorAll<HTMLElement>('[data-team-chip]'));
    const roles = Array.from(section.querySelectorAll<HTMLElement>('[data-team-role]'));
    const roleImages = Array.from(section.querySelectorAll<HTMLElement>('[data-team-role-image]'));
    const hoverCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [...headlineLines, intro, board, heroMedia, ...chips, ...roles, ...roleImages].filter(
            Boolean,
          ),
          { clipPath: MASK_VISIBLE, x: 0, y: 0, scale: 1, rotateY: 0 },
        );
        if (heroImage) {
          gsap.set(heroImage, { yPercent: 0, scale: 1 });
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set([...headlineLines, intro, ...chips].filter(Boolean), {
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
          .to(intro, { clipPath: MASK_VISIBLE, duration: 0.5, ease: 'power3.out' }, 0.14)
          .to(
            chips,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.06,
              duration: 0.45,
              ease: 'power3.out',
            },
            0.3,
          )
          .to(board, { clipPath: MASK_VISIBLE, duration: 0.58, ease: 'power3.out' }, 0.28)
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
              x: 10,
              y: -6,
              rotateY: index % 2 === 0 ? 1.5 : -1.5,
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
        <div className={styles.masthead}>
          <h2 data-team-headline className={styles.headline}>
            <span data-team-line>People behind</span>
            <span data-team-line>the live moment.</span>
          </h2>
          <p data-team-intro className={styles.intro}>
            Designers, technologists, and producers working as one crew from first idea to final
            show call.
          </p>
        </div>

        <div className={styles.values} aria-label="Team strengths">
          {VALUES.map((value) => (
            <span key={value} className={styles.valueChip} data-team-chip>
              {value}
            </span>
          ))}
        </div>

        <div className={styles.board} data-team-board>
          <figure className={styles.heroMedia} data-team-hero-media>
            <img src={TEAM_ROLES[1].image} alt="" loading="lazy" data-team-hero-image />
            <figcaption>
              <span>One crew</span>
              <span>From concept to showtime</span>
            </figcaption>
          </figure>

          <div className={styles.roleStack}>
            {TEAM_ROLES.map((role) => (
              <article key={role.title} className={styles.roleCard} data-team-role>
                <figure className={styles.roleImage}>
                  <img src={role.image} alt="" loading="lazy" data-team-role-image />
                </figure>
                <div className={styles.roleMeta}>
                  <span>{role.code}</span>
                  <span>{role.field}</span>
                </div>
                <div className={styles.roleCopy}>
                  <h3>{role.title}</h3>
                  <p>{role.note}</p>
                  <ul className={styles.tagList} aria-label={`${role.title} capabilities`}>
                    {role.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
