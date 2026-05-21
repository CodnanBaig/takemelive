'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import ScrollOrnament from './ScrollOrnament';
import styles from './Industries.module.scss';

const INDUSTRIES = [
  {
    label: 'Culture',
    tease: 'Where goosebumps are a deliverable.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Luxury',
    tease: 'If it is not premium, it is not done.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Sports',
    tease: 'Stadium energy, precision timing.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Entertainment',
    tease: 'Chaos, choreographed perfectly.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Media',
    tease: 'Built for replay, reaction, and reach.',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Automotive',
    tease: 'Horsepower with cinematic drama.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Corporate',
    tease: 'Boardroom smart, showtime sharp.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Tourism',
    tease: 'Destinations turned into plot twists.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Technology',
    tease: 'Future-forward, human-friendly.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Government',
    tease: 'Big scale, zero room for guesswork.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Fashion',
    tease: 'Runway mood with production muscle.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Music',
    tease: 'Bass, lights, and core memories.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    label: 'Crypto',
    tease: 'Web3 ideas, real-world wow.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Esports',
    tease: 'Low latency, high adrenaline.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
  },
] as const;

export default function Industries() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-industry-item]'));
    const previews = Array.from(section.querySelectorAll<HTMLElement>('[data-industry-preview]'));
    const previewShell = section.querySelector<HTMLElement>('[data-industry-preview-shell]');

    if (!previewShell) {
      return;
    }

    gsap.set(previewShell, { autoAlpha: 0, x: -28, scale: 0.985 });
    gsap.set(previews, { autoAlpha: 0, x: -36, scale: 0.98 });

    const showPreview = (index: number) => {
      gsap.killTweensOf(previewShell);
      gsap.to(previewShell, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: reduceMotion ? 0 : 0.3,
        ease: 'power3.out',
        overwrite: true,
      });
      previews.forEach((preview, previewIndex) => {
        gsap.killTweensOf(preview);
        if (previewIndex === index) {
          gsap.to(preview, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: reduceMotion ? 0 : 0.34,
            ease: 'power3.out',
            overwrite: true,
          });
          return;
        }
        gsap.to(preview, {
          autoAlpha: 0,
          x: -26,
          scale: 0.98,
          duration: reduceMotion ? 0 : 0.2,
          ease: 'power2.inOut',
          overwrite: true,
        });
      });
    };

    const hidePreview = () => {
      gsap.killTweensOf(previewShell);
      gsap.to(previewShell, {
        autoAlpha: 0,
        x: -22,
        scale: 0.985,
        duration: reduceMotion ? 0 : 0.2,
        ease: 'power2.inOut',
        overwrite: true,
      });
      previews.forEach((preview) => {
        gsap.killTweensOf(preview);
        gsap.to(preview, {
          autoAlpha: 0,
          x: -26,
          scale: 0.98,
          duration: reduceMotion ? 0 : 0.2,
          ease: 'power2.inOut',
          overwrite: true,
        });
      });
    };

    const itemStates: Array<{ show: () => void; hide: () => void }> = [];

    const cleanups = items.map((item) => {
      const reveal = item.querySelector<HTMLElement>('[data-industry-reveal]');
      const tooltip = item.querySelector<HTMLElement>('[data-industry-tooltip]');
      if (!reveal || !tooltip) {
        return () => {};
      }

      gsap.set(item, {
        '--ripple-x': '50%',
        '--ripple-y': '50%',
        '--ripple-size': '0px',
      });
      gsap.set(reveal, { autoAlpha: 1 });
      gsap.set(tooltip, {
        autoAlpha: 0,
        y: 14,
        scale: 0.86,
        rotateX: -16,
      });

      const getRippleState = (event?: MouseEvent) => {
        const rect = item.getBoundingClientRect();
        const fallbackX = rect.width * 0.5;
        const fallbackY = rect.height * 0.5;
        const x = event ? gsap.utils.clamp(0, event.clientX - rect.left, rect.width) : fallbackX;
        const y = event ? gsap.utils.clamp(0, event.clientY - rect.top, rect.height) : fallbackY;

        const farthestX = Math.max(x, rect.width - x);
        const farthestY = Math.max(y, rect.height - y);
        const size = Math.ceil(Math.hypot(farthestX, farthestY));

        return { x: `${x}px`, y: `${y}px`, size: `${size}px` };
      };

      const show = (event?: MouseEvent) => {
        const itemIndex = Number(item.dataset.industryIndex ?? -1);
        const ripple = getRippleState(event);
        if (!event) {
          gsap.set(item, {
            '--ripple-x': ripple.x,
            '--ripple-y': ripple.y,
          });
        }
        if (itemIndex >= 0) {
          showPreview(itemIndex);
        }
        gsap.killTweensOf(item);
        gsap.to(item, {
          '--ripple-x': ripple.x,
          '--ripple-y': ripple.y,
          '--ripple-size': ripple.size,
          duration: reduceMotion ? 0 : 0.36,
          ease: 'power3.out',
          overwrite: true,
        });
        gsap.to(tooltip, {
          autoAlpha: 1,
          y: -6,
          scale: 1,
          rotateX: 0,
          duration: reduceMotion ? 0 : 0.34,
          ease: 'back.out(1.8)',
          overwrite: true,
        });
      };

      const hide = () => {
        hidePreview();
        gsap.killTweensOf(item);
        gsap.killTweensOf(tooltip);
        gsap.to(item, {
          '--ripple-size': '0px',
          duration: reduceMotion ? 0 : 0.24,
          ease: 'power2.inOut',
          overwrite: true,
        });
        gsap.to(tooltip, {
          autoAlpha: 0,
          y: 14,
          scale: 0.86,
          rotateX: -16,
          duration: reduceMotion ? 0 : 0.22,
          ease: 'power2.inOut',
          overwrite: true,
        });
      };

      const onFocusIn = () => show();
      if (canHover) {
        item.addEventListener('mouseenter', show);
        item.addEventListener('mouseleave', hide);
      }
      item.addEventListener('focusin', onFocusIn);
      item.addEventListener('focusout', hide);

      itemStates.push({ show: () => show(), hide });

      return () => {
        if (canHover) {
          item.removeEventListener('mouseenter', show);
          item.removeEventListener('mouseleave', hide);
        }
        item.removeEventListener('focusin', onFocusIn);
        item.removeEventListener('focusout', hide);
      };
    });

    let autoplayTimer: number | null = null;
    let activeIndex = -1;

    if (itemStates.length > 0) {
      const activateAt = (index: number) => {
        if (activeIndex === index) {
          return;
        }
        if (activeIndex >= 0) {
          itemStates[activeIndex]?.hide();
        }
        activeIndex = index;
        itemStates[activeIndex]?.show();
      };

      activateAt(0);

      autoplayTimer = window.setInterval(() => {
        const nextIndex = (activeIndex + 1) % itemStates.length;
        activateAt(nextIndex);
      }, reduceMotion ? 1800 : 2200);
    }

    return () => {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
      }
      cleanups.forEach((cleanup) => cleanup());
      hidePreview();
    };
  }, []);

  return (
    <section
      id="chapter-industries"
      data-chapter="industries"
      data-logo-invert="0"
      ref={sectionRef}
      className={styles.section}
      aria-label="Industries we serve"
    >
      <ScrollOrnament variant="glyph-dark" position="bl" />
      <div className={styles.inner}>
        <p className={styles.kicker}>Industries We Serve</p>
        <div className={styles.columns}>
          <div className={styles.intro}>
            <p className={styles.lead}>CULTURE DOESN&apos;T BELONG TO ONE INDUSTRY.</p>
            <p>
              We collaborate with brands, organizations, and creators across a wide range of
              sectors designing experiences that connect with audiences in meaningful ways.
            </p>
            <p>
              Every industry has a story to tell.
              <br />
              We help bring it to life.
            </p>
            <div className={styles.preview} data-industry-preview-shell aria-hidden="true">
              {INDUSTRIES.map((industry) => (
                <div key={`${industry.label}-preview`} className={styles.previewItem} data-industry-preview>
                  <img src={industry.image} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.block}>
            {INDUSTRIES.map((industry, index) => (
              <span
                key={industry.label}
                className={styles.item}
                data-industry-item
                data-industry-index={index}
                tabIndex={0}
              >
                <span className={styles.word}>{industry.label}</span>
                <span className={styles.reveal} data-industry-reveal aria-hidden="true">
                  {industry.label}
                </span>
                <span className={styles.tooltip} data-industry-tooltip role="status">
                  {industry.tease}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
