'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { sectionRevealScroll } from '@/lib/scrollScene';
import { EVENT_FOLDERS, eventImage } from '@/lib/projectMedia';
import ScrollOrnament from './ScrollOrnament';
import styles from './Services.module.scss';

const SERVICES = [
  {
    title: 'Creative Strategy & Experience Design',
    detail:
      'We shape the central idea, audience journey, spatial environment, and visual language from the ground up.',
    outcome:
      'Every creative decision is built around what people should feel, do, and remember.',
  },
  {
    title: 'Interactive Technology & Innovation',
    detail:
      'We integrate AI, AR/VR, projection mapping, generative content, and responsive systems into the experience.',
    outcome:
      'Technology is used with purpose—to deepen participation, not distract from the story.',
  },
  {
    title: 'Production, Build & Delivery',
    detail:
      'We engineer, fabricate, install, test, and operate every production layer with show-ready precision.',
    outcome:
      'From scenic build to lighting, sound, video, and live execution, we keep the original idea intact all the way to site.',
  },
  {
    title: 'Event Project Management',
    detail:
      'We manage timelines, budgets, vendors, permits, crews, logistics, and on-site operations from start to finish.',
    outcome:
      'One accountable team keeps every moving part aligned and every decision visible.',
  },
  {
    title: 'Digital Amplification & Content',
    detail:
      'We create screen content, live streams, social moments, event films, and post-event assets that extend the experience beyond the room.',
    outcome:
      'The live moment becomes the beginning of a longer story—not the end of it.',
  },
] as const;

const SERVICE_MEDIA = [
  {
    src: eventImage(EVENT_FOLDERS.lusail, 'Lusail_Opening-108.webp'),
    alt: 'Lusail stadium opening ceremony production',
  },
  {
    src: eventImage(EVENT_FOLDERS.redBullBasement, 'basement4.webp'),
    alt: 'Red Bull Basement immersive brand activation environment',
  },
  {
    src: eventImage(EVENT_FOLDERS.qatarLive, 'Qatar_Live-028.webp'),
    alt: 'Qatar Live festival stage and audience',
  },
] as const;

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const panels = Array.from(section.querySelectorAll<HTMLElement>('[data-service-panel]'));
    const mediaCards = Array.from(section.querySelectorAll<HTMLElement>('[data-service-media-card]'));
    const mediaImages = Array.from(section.querySelectorAll<HTMLElement>('[data-service-media-image]'));
    const words = Array.from(section.querySelectorAll<HTMLElement>('[data-service-word]'));
    const headline = section.querySelector<HTMLElement>('[data-services-headline]');
    const intro = section.querySelector<HTMLElement>('[data-services-intro]');
    const stripe = section.querySelector<HTMLElement>('[data-services-stripe]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([headline, intro, ...panels, ...mediaCards, ...words], {
          clearProps: 'all',
          autoAlpha: 1,
          y: 0,
          x: 0,
          xPercent: 0,
        });
        gsap.set(mediaImages, { yPercent: 0, scale: 1 });
        if (stripe) {
          gsap.set(stripe, { xPercent: 0 });
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isCompact = window.matchMedia('(max-width: 980px)').matches;

        gsap
          .timeline({
            scrollTrigger: sectionRevealScroll(section, 0.7),
          })
          .fromTo(
            headline,
            { y: 36, autoAlpha: 0.2 },
            { y: 0, autoAlpha: 1, ease: 'none', duration: 0.45 },
            0,
          )
          .fromTo(
            intro,
            { y: 32, autoAlpha: 0.2 },
            { y: 0, autoAlpha: 1, ease: 'none', duration: 0.5 },
            0.15,
          );

        panels.forEach((panel, index) => {
          const panelDirection = index % 2 === 0 ? -1 : 1;

          gsap.fromTo(
            panel,
            {
              y: 0,
              x: isCompact ? 0 : panelDirection * 180,
              rotateZ: isCompact ? 0 : panelDirection * 2,
              scale: 0.98,
              autoAlpha: 0.15,
              clipPath: 'inset(0% 100% 0% 0%)',
            },
            {
              y: 0,
              x: 0,
              rotateZ: 0,
              scale: 1,
              autoAlpha: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top 88%',
                end: 'top 42%',
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        mediaCards.forEach((card, index) => {
          const cardDirection = index % 2 === 0 ? -1 : 1;

          gsap.fromTo(
            card,
            {
              y: 64,
              x: isCompact ? 0 : cardDirection * 42,
              rotateZ: isCompact ? 0 : cardDirection * 3.5,
              autoAlpha: 0.2,
            },
            {
              y: 0,
              x: 0,
              rotateZ: isCompact ? 0 : cardDirection * 1.2,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                end: 'top 48%',
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        mediaImages.forEach((image, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          gsap.fromTo(
            image,
            { yPercent: -10 * direction, scale: 1.12 },
            {
              yPercent: 10 * direction,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });

        words.forEach((word, index) => {
          const drift = isCompact ? 0 : index % 2 === 0 ? 28 : -28;
          gsap.fromTo(
            word,
            { xPercent: -drift, yPercent: index === 0 ? -8 : 8 },
            {
              xPercent: drift,
              yPercent: index === 0 ? 8 : -8,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });

        if (stripe) {
          gsap.fromTo(
            stripe,
            { xPercent: -24 },
            {
              xPercent: 24,
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
      id="chapter-services"
      data-chapter="services"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Services"
    >
      <ScrollOrnament variant="glyph-light" position="tr" />
      <div className={styles.stripe} data-services-stripe aria-hidden="true" />
      <div className={styles.backgroundWords} aria-hidden="true">
        <span data-service-word>SERVICES</span>
        <span data-service-word>EXPERIENCE</span>
      </div>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 data-services-headline>EVERYTHING IT TAKES TO TAKE IT LIVE.</h2>
          <p className={styles.intro} data-services-intro>
            From strategy and design to technology, production, and show delivery, we bring every moving part
            together under one roof—so the idea lands exactly as intended.
          </p>
        </header>

        <div className={styles.mediaRail}>
          {SERVICE_MEDIA.map((item, index) => (
            <figure key={item.src} className={styles.mediaCard} data-service-media-card>
              <img src={item.src} alt={item.alt} loading="lazy" data-service-media-image />
              <figcaption>{`0${index + 1}`}</figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.panels}>
          {SERVICES.map((service, index) => (
            <article key={service.title} className={styles.panel} data-service-panel>
              <p className={styles.panelIndex}>{`0${index + 1}`}</p>
              <h3>{service.title}</h3>
              <p className={styles.panelDetail}>{service.detail}</p>
              <p className={styles.panelOutcome}>{service.outcome}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
