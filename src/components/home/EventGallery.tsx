'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './EventGallery.module.scss';

const IMAGE_ITEMS = [
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1100&q=80',
    alt: 'Crowd at a live concert with lights',
    variant: 'topLeft',
    speed: 18,
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
    alt: 'Stage production setup with audience',
    variant: 'topCenter',
    speed: 14,
  },
  {
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80',
    alt: 'Event crowd hands raised under lights',
    variant: 'topRight',
    speed: 22,
  },
  {
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    alt: 'DJ performance with colorful smoke and lighting',
    variant: 'midLeft',
    speed: 16,
  },
  {
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Festival crowd and stage visuals at night',
    variant: 'midCenter',
    speed: 20,
  },
  {
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
    alt: 'Packed live show with bright stage lights',
    variant: 'midRight',
    speed: 19,
  },
  {
    src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1400&q=80',
    alt: 'Large audience at a night event',
    variant: 'bottomLeft',
    speed: 15,
  },
  {
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1400&q=80',
    alt: 'Concert production visuals and stage beams',
    variant: 'bottomRight',
    speed: 21,
  },
] as const;

const FALLBACK_IMAGE_SRC =
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80';

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
    const syncLogoContrast = () =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        end: 'bottom 28%',
        onEnter: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onEnterBack: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onLeave: () => document.documentElement.style.setProperty('--logo-invert', '0'),
        onLeaveBack: () => document.documentElement.style.setProperty('--logo-invert', '1'),
        onRefresh: (self) => {
          if (self.isActive) {
            document.documentElement.style.setProperty('--logo-invert', '1');
          }
        },
      });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { autoAlpha: 1, y: 0, yPercent: 0 });
        gsap.set(images, { yPercent: 0, scale: 1.16 });
        gsap.set(backgroundWords, { yPercent: 0, xPercent: 0 });
        const logoTrigger = syncLogoContrast();
        return () => {
          logoTrigger.kill();
        };
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const logoTrigger = syncLogoContrast();

        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.84,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          },
        );

        images.forEach((image, index) => {
          const speed = Number(image.dataset.speed ?? 16);
          const direction = index % 2 === 0 ? 1 : -1;
          const shift = Math.max(20, speed * 1.2) * direction;
          gsap.fromTo(
            image,
            { yPercent: -shift, scale: 1.16 },
            {
              yPercent: shift,
              scale: 1.16,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        backgroundWords.forEach((word, index) => {
          const drift = index % 2 === 0 ? 48 : -48;
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
      id="chapter-event-gallery"
      data-chapter="event-gallery"
      ref={sectionRef}
      className={styles.section}
      aria-label="Event gallery"
    >
      <div className={styles.inner}>
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
