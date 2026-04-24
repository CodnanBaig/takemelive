'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './WhoWeAre.module.scss';

const PORTRAIT_IMAGE = {
  src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
  alt: 'Creative team in a live production environment',
  speed: 16,
};

const FALLBACK_IMAGE_SRC =
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80';

const HEADLINE_LINES = [
  "Squad",
  'of creators,',
  'dreamers, and doers.',
];

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

    const eyebrow = section.querySelector('[data-eyebrow]');
    const headingLines = section.querySelectorAll('[data-heading-line]');
    const roles = section.querySelectorAll('[data-role]');
    const bodyLines = section.querySelectorAll('[data-body-line]');
    const accent = section.querySelector('[data-accent]');
    const mediaCard = section.querySelector('[data-media-card]');
    const mediaImage = section.querySelector<HTMLElement>('[data-parallax-image]');
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
        gsap.set([eyebrow, headingLines, roles, bodyLines, accent, mediaCard], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          clearProps: 'all',
        });
        if (mediaImage) {
          gsap.set(mediaImage, { yPercent: 0, scale: 1.14 });
        }
        if (accent) {
          gsap.set(accent, { scaleX: 1, transformOrigin: 'left center' });
        }
        const logoTrigger = syncLogoContrast();
        return () => {
          logoTrigger.kill();
        };
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const logoTrigger = syncLogoContrast();

        if (mediaCard) {
          const mediaTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });

          mediaTimeline
            .fromTo(
              mediaCard,
              {
                xPercent: 30,
                autoAlpha: 0.45,
              },
              {
                xPercent: 0,
                autoAlpha: 1,
                ease: 'none',
                duration: 0.34,
              },
            )
            .to(
              mediaCard,
              {
                xPercent: 0,
                autoAlpha: 1,
                ease: 'none',
                duration: 0.32,
              },
            )
            .to(
              mediaCard,
              {
                xPercent: -34,
                autoAlpha: 0.72,
                ease: 'none',
                duration: 0.34,
              },
            );
        }

        if (mediaImage) {
          gsap.set(mediaImage, { scale: 1.14 });
        }

        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 74%',
              },
            },
          );
        }

        if (accent) {
          gsap.fromTo(
            accent,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 72%',
              },
            },
          );
        }

        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top 68%',
          },
        });

        timeline
          .fromTo(
            headingLines,
            { yPercent: 110, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.09,
            },
          )
          .fromTo(
            roles,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.08,
            },
            '-=0.34',
          )
          .fromTo(
            bodyLines,
            { y: 22, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.68,
              stagger: 0.1,
            },
            '-=0.26',
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
        <div className={styles.grid}>
          <div className={styles.leftRail}>
            <div className={styles.meta}>
              <p className={styles.kicker} data-eyebrow>
                WHO WE ARE
              </p>
              <p className={styles.studioLine}>A creative experience studio</p>
            </div>

            <figure className={styles.mediaCard} data-media-card>
              <img
                src={PORTRAIT_IMAGE.src}
                alt={PORTRAIT_IMAGE.alt}
                loading="lazy"
                className={styles.mediaImage}
                data-parallax-image
                data-speed={PORTRAIT_IMAGE.speed}
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
                <span key={line} className={styles.lineWrap}>
                  <span data-heading-line>{line}</span>
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
