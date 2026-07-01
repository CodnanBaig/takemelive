'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  MASK_HIDDEN_BOTTOM,
  MASK_HIDDEN_RIGHT,
  MASK_VISIBLE,
} from '@/lib/maskReveal';
import { sectionRevealScroll } from '@/lib/scrollScene';
import { EVENT_FOLDERS, eventImage } from '@/lib/projectMedia';
import styles from './WhoWeAre.module.scss';

const GROUP_IMAGE = {
  src: eventImage(EVENT_FOLDERS.redBullEnergy, 'el3.webp'),
  alt: 'Take Me Live crew on a large-scale live production',
  speed: 16,
};

const FALLBACK_IMAGE_SRC = eventImage(EVENT_FOLDERS.dubaiMedia, 'dm2.webp');

const HEADLINE_LINES = [
  { id: 'lead', text: 'Squad of' },
  { id: 'creators', text: 'Creators,' },
  { id: 'dreamers', text: 'Dreamers,' },
  { id: 'doers', text: '&\u00a0Doers.' },
] as const;

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

    const headingLines = section.querySelectorAll('[data-heading-line]');
    const roles = section.querySelectorAll('[data-role]');
    const bodyLines = section.querySelectorAll('[data-body-line]');
    const accent = section.querySelector('[data-accent]');
    const mediaCard = section.querySelector('[data-media-card]');
    const mediaImage = section.querySelector<HTMLElement>('[data-parallax-image]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([...headingLines, ...roles, ...bodyLines].filter(Boolean), {
          clipPath: MASK_VISIBLE,
          clearProps: 'transform,opacity',
        });
        if (mediaCard) {
          gsap.set(mediaCard, { clipPath: MASK_VISIBLE, opacity: 1, clearProps: 'transform' });
        }
        if (mediaImage) {
          gsap.set(mediaImage, { yPercent: 0, scale: 1.14 });
        }
        if (accent) {
          gsap.set(accent, { scaleX: 1, transformOrigin: 'left center' });
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isCompact = window.matchMedia('(max-width: 900px)').matches;

        gsap.set(headingLines, { clipPath: MASK_HIDDEN_BOTTOM });
        gsap.set(roles, { clipPath: MASK_HIDDEN_BOTTOM });
        gsap.set(bodyLines, { clipPath: MASK_HIDDEN_BOTTOM });
        if (accent) {
          gsap.set(accent, { scaleX: 0, transformOrigin: 'left center' });
        }
        if (mediaCard) {
          gsap.set(mediaCard, {
            clipPath: isCompact ? MASK_HIDDEN_BOTTOM : MASK_HIDDEN_RIGHT,
            opacity: 0,
          });
        }

        if (mediaImage) {
          gsap.set(mediaImage, { scale: 1.14 });
          gsap.fromTo(
            mediaImage,
            { yPercent: -14 },
            {
              yPercent: 14,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }

        const revealTimeline = gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.8),
          })
          .to(
            accent,
            { scaleX: 1, duration: 0.5, ease: 'power3.out' },
            0,
          )
          .to(
            headingLines,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.07,
              duration: 0.62,
              ease: 'power3.out',
            },
            0.1,
          )
          .to(
            mediaCard,
            {
              clipPath: MASK_VISIBLE,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
            },
            0.14,
          )
          .to(
            roles,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.06,
              duration: 0.55,
              ease: 'power3.out',
            },
            0.26,
          )
          .to(
            bodyLines,
            {
              clipPath: MASK_VISIBLE,
              stagger: 0.07,
              duration: 0.55,
              ease: 'power3.out',
            },
            0.38,
          );

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          const st = revealTimeline.scrollTrigger;
          if (st) {
            revealTimeline.progress(st.progress);
          }
        });
      });

      return () => {
        mm.revert();
      };
    }, section);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-who-we-are"
      data-chapter="who-we-are"
      data-scene="scale"
      data-logo-invert="0"
      ref={sectionRef}
      className={styles.section}
      aria-label="Who we are"
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.leftRail}>
            <figure className={styles.mediaCard} data-media-card data-scroll-depth>
              <img
                src={GROUP_IMAGE.src}
                alt={GROUP_IMAGE.alt}
                loading="lazy"
                className={styles.mediaImage}
                data-parallax-image
                data-speed={GROUP_IMAGE.speed}
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.src !== FALLBACK_IMAGE_SRC) {
                    target.src = FALLBACK_IMAGE_SRC;
                  }
                }}
              />
            </figure>
          </div>

          <div className={styles.content}>
            <div className={styles.accent} data-accent aria-hidden="true" />
            <h2 className={styles.heading}>
              {HEADLINE_LINES.map((line) => (
                <span key={line.id} className={styles.lineWrap}>
                  <span
                    data-heading-line
                    className={
                      line.id === 'lead' ? styles.headlineLead : styles.headlineEmphasis
                    }
                  >
                    {line.text}
                  </span>
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

            <div className={styles.bodyCopy}>
              {BODY_LINES.map((line) => (
                <p key={line} data-body-line>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
