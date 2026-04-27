'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './Services.module.scss';

const SERVICES = [
  {
    title: 'Creative Strategy & Experience Design',
    detail:
      'Concept development, creative direction, spatial design, narrative planning, and visual storytelling.',
    outcome: 'Designing experiences that communicate clearly and feel considered.',
  },
  {
    title: 'Interactive Technology & Innovation',
    detail:
      'Interactive installations, AI-powered experiences, AR/VR environments, projection mapping, and generative visuals.',
    outcome: 'Integrating technology to enhance engagement and create immersive environments.',
  },
  {
    title: 'Production, Build & Delivery',
    detail:
      'Stage and scenic fabrication, technical production, lighting and sound engineering, show execution, and on-site delivery.',
    outcome: 'Ensuring ideas are executed with precision and reliability.',
  },
  {
    title: 'Event Project Management',
    detail:
      'Planning and coordination, vendor and crew management, budget and timeline control, and operational oversight.',
    outcome: 'Delivering projects through structured and efficient management.',
  },
  {
    title: 'Digital Amplification & Content',
    detail:
      'Live streaming, content creation, social media integration, post-event media, and performance insights.',
    outcome: 'Extending the life of the experience beyond the moment itself.',
  },
] as const;

const SERVICE_MEDIA = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1300&q=80',
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
        if (headline) {
          gsap.fromTo(
            headline,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 72%',
              },
            },
          );
        }

        if (intro) {
          gsap.fromTo(
            intro,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 66%',
              },
            },
          );
        }

        panels.forEach((panel, index) => {
          gsap.fromTo(
            panel,
            {
              y: 0,
              x: index % 2 === 0 ? -180 : 180,
              rotateZ: index % 2 === 0 ? -2 : 2,
              scale: 0.98,
              autoAlpha: 0,
              clipPath: 'inset(0% 100% 0% 0%)',
            },
            {
              y: 0,
              x: 0,
              rotateZ: 0,
              scale: 1,
              autoAlpha: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.05,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 84%',
              },
            },
          );
        });

        mediaCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 64,
              x: index % 2 === 0 ? -42 : 42,
              rotateZ: index % 2 === 0 ? -3.5 : 3.5,
              autoAlpha: 0,
            },
            {
              y: 0,
              x: 0,
              rotateZ: index % 2 === 0 ? -1.2 : 1.2,
              autoAlpha: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 68%',
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
          const drift = index % 2 === 0 ? 28 : -28;
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
      <div className={styles.stripe} data-services-stripe aria-hidden="true" />
      <div className={styles.backgroundWords} aria-hidden="true">
        <span data-service-word>SERVICES</span>
        <span data-service-word>EXPERIENCE</span>
      </div>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>Services</p>
          <h2 data-services-headline>END-TO-END EXPERIENCE CREATION.</h2>
          <p className={styles.intro} data-services-intro>
            From concept to execution, we design and deliver experiences that connect brands with people in meaningful ways.
            Each project combines creative thinking, technical expertise, and precise delivery to ensure every detail performs
            as intended.
          </p>
        </header>

        <div className={styles.mediaRail}>
          {SERVICE_MEDIA.map((src, index) => (
            <figure key={src} className={styles.mediaCard} data-service-media-card>
              <img src={src} alt="Services showcase visual" loading="lazy" data-service-media-image />
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
