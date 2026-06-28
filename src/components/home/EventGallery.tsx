'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  MASK_HIDDEN_BOTTOM,
  MASK_VISIBLE,
  animateMaskReveal,
  setMaskHidden,
} from '@/lib/maskReveal';
import { sectionRevealScroll } from '@/lib/scrollScene';
import styles from './EventGallery.module.scss';

const IMAGE_ITEMS = [
  {
    src: '/assets/BlackPink_MiddleEast-005.webp',
    alt: 'BLACKPINK stadium production in the Middle East',
    variant: 'topLeft',
    speed: 18,
  },
  {
    src: '/assets/Qatar_Live-026.webp',
    alt: 'Qatar Live festival stage and crowd',
    variant: 'topCenter',
    speed: 14,
  },
  {
    src: '/assets/Lusail_Opening-182.webp',
    alt: 'Lusail stadium opening ceremony',
    variant: 'topRight',
    speed: 22,
  },
  {
    src: '/assets/Maraya_One_Republic-025.webp',
    alt: 'OneRepublic live at Maraya Concert Hall',
    variant: 'midLeft',
    speed: 16,
  },
  {
    src: '/assets/PHNTM%20DMO-03.webp',
    alt: 'PHNTM immersive brand activation',
    variant: 'midCenter',
    speed: 20,
  },
  {
    src: '/assets/maraya_john_legend-033.webp',
    alt: 'John Legend performance at Maraya',
    variant: 'midRight',
    speed: 19,
  },
  {
    src: '/assets/QatarLive_21_MAJIDA-064.webp',
    alt: 'Majida El Roumi at Qatar Live',
    variant: 'bottomLeft',
    speed: 15,
  },
  {
    src: '/assets/Lusail_Opening-159.webp',
    alt: 'Lusail opening night production visuals',
    variant: 'bottomRight',
    speed: 21,
  },
] as const;

const FALLBACK_IMAGE_SRC = '/assets/Qatar_Live-024.webp';

export default function EventGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const cards = section.querySelectorAll<HTMLElement>('[data-parallax-item]');
    const images = section.querySelectorAll<HTMLElement>('[data-parallax-image]');
    const backgroundWords = section.querySelectorAll<HTMLElement>('[data-bg-word]');
    const titleLines = section.querySelectorAll<HTMLElement>('[data-title-line]');
    const stage = section.querySelector<HTMLElement>('[data-gallery-stage]');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([...cards, ...titleLines].filter(Boolean), {
          clipPath: MASK_VISIBLE,
        });
        gsap.set(images, { yPercent: 0, scale: 1.16 });
        gsap.set(backgroundWords, { yPercent: 0, xPercent: 0 });
        if (stage) {
          gsap.set(stage, { opacity: 1, y: 0 });
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (titleLines.length) {
          setMaskHidden(titleLines);
        }
        gsap.set(cards, { clipPath: MASK_HIDDEN_BOTTOM });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            if (titleLines.length) {
              animateMaskReveal(titleLines, 'bottom', {
                duration: 0.78,
                stagger: 0.08,
              });
            }
          },
        });

        gsap.to(cards, {
          clipPath: MASK_VISIBLE,
          stagger: 0.055,
          ease: 'power3.out',
          duration: 0.72,
          scrollTrigger: sectionRevealScroll(section, 0.88),
        });

        images.forEach((image, index) => {
          const speed = Number(image.dataset.speed ?? 16);
          const direction = index % 2 === 0 ? 1 : -1;
          const shift = Math.max(22, speed * 1.35) * direction;
          gsap.fromTo(
            image,
            { yPercent: -shift, scale: 1.18 },
            {
              yPercent: shift,
              scale: 1.18,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        backgroundWords.forEach((word, index) => {
          const drift = index % 2 === 0 ? 56 : -56;
          gsap.fromTo(
            word,
            { yPercent: 0, xPercent: index % 2 === 0 ? -drift : drift },
            {
              yPercent: 0,
              xPercent: index % 2 === 0 ? drift : -drift,
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

        if (stage) {
          gsap.fromTo(
            stage,
            { y: 0, filter: 'brightness(1)' },
            {
              y: 16,
              filter: 'brightness(0.72)',
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'bottom 92%',
                end: 'bottom 20%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      return () => {
        mm.revert();
      };
    }, section);

    const refreshParallax = () => {
      ScrollTrigger.refresh();
    };

    section.querySelectorAll<HTMLImageElement>('[data-parallax-image]').forEach((image) => {
      if (image.complete) {
        return;
      }
      image.addEventListener('load', refreshParallax, { once: true });
    });

    requestAnimationFrame(refreshParallax);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-event-gallery"
      data-chapter="event-gallery"
      data-scene="scale"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Event gallery"
    >
      <div className={styles.inner} data-gallery-stage>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleLineWrap}>
              <span className={styles.titleLine} data-title-line>
                Live at
              </span>
            </span>
            <span className={styles.titleLineWrap}>
              <span className={styles.titleLine} data-title-line>
                scale
              </span>
            </span>
          </h2>
        </header>

        <div className={styles.backgroundWords} aria-hidden="true">
          <span data-bg-word>TAKE</span>
          <span data-bg-word>ME LIVE</span>
        </div>
        <div className={styles.galleryGrid}>
          {IMAGE_ITEMS.map((item) => (
            <figure
              key={item.src}
              className={`${styles.card} ${styles[item.variant]}`}
              data-parallax-item
              data-speed={item.speed}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className={styles.image}
                data-parallax-image
                data-speed={item.speed}
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.src !== FALLBACK_IMAGE_SRC) {
                    target.src = FALLBACK_IMAGE_SRC;
                  }
                }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
