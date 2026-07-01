'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import ScrollOrnament from './ScrollOrnament';
import styles from './Industries.module.scss';

const INDUSTRIES = [
  { label: 'Culture', tease: 'Where goosebumps are a deliverable.' },
  { label: 'Luxury', tease: 'If it is not premium, it is not done.' },
  { label: 'Sports', tease: 'Stadium energy, precision timing.' },
  { label: 'Entertainment', tease: 'Chaos, choreographed perfectly.' },
  { label: 'Media', tease: 'Built for replay, reaction, and reach.' },
  { label: 'Automotive', tease: 'Horsepower with cinematic drama.' },
  { label: 'Corporate', tease: 'Boardroom smart, showtime sharp.' },
  { label: 'Tourism', tease: 'Destinations turned into plot twists.' },
  { label: 'Technology', tease: 'Future-forward, human-friendly.' },
  { label: 'Government', tease: 'Big scale, zero room for guesswork.' },
  { label: 'Fashion', tease: 'Runway mood with production muscle.' },
  { label: 'Music', tease: 'Bass, lights, and core memories.' },
  { label: 'Crypto', tease: 'Web3 ideas, real-world wow.' },
  { label: 'Esports', tease: 'Low latency, high adrenaline.' },
] as const;

const COMPACT_QUERY = '(max-width: 840px)';

function getRippleState(item: HTMLElement, event?: { clientX: number; clientY: number }) {
  const rect = item.getBoundingClientRect();
  const fallbackX = rect.width * 0.5;
  const fallbackY = rect.height * 0.5;
  const x = event ? gsap.utils.clamp(0, event.clientX - rect.left, rect.width) : fallbackX;
  const y = event ? gsap.utils.clamp(0, event.clientY - rect.top, rect.height) : fallbackY;

  const farthestX = Math.max(x, rect.width - x);
  const farthestY = Math.max(y, rect.height - y);
  const size = Math.ceil(Math.hypot(farthestX, farthestY));

  return { x: `${x}px`, y: `${y}px`, size: `${size}px` };
}

export default function Industries() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const activeIndexRef = useRef<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const media = window.matchMedia(COMPACT_QUERY);
    const sync = () => {
      setIsCompact(media.matches);
      if (!media.matches) {
        setActiveIndex(null);
      }
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const playRipple = useCallback((item: HTMLElement, event?: { clientX: number; clientY: number }) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ripple = getRippleState(item, event);

    gsap.killTweensOf(item);
    gsap.to(item, {
      '--ripple-x': ripple.x,
      '--ripple-y': ripple.y,
      '--ripple-size': ripple.size,
      duration: reduceMotion ? 0 : 0.36,
      ease: 'power3.out',
      overwrite: true,
    });
  }, []);

  const resetRipple = useCallback((item: HTMLElement) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.killTweensOf(item);
    gsap.to(item, {
      '--ripple-size': '0px',
      duration: reduceMotion ? 0 : 0.24,
      ease: 'power2.inOut',
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isCompact) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-industry-item]'));

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
        xPercent: -50,
        y: 14,
        scale: 0.86,
        rotateX: -16,
      });

      const show = (event?: MouseEvent) => {
        playRipple(item, event);

        gsap.to(tooltip, {
          autoAlpha: 1,
          xPercent: -50,
          y: -6,
          scale: 1,
          rotateX: 0,
          duration: reduceMotion ? 0 : 0.34,
          ease: 'back.out(1.8)',
          overwrite: true,
        });
      };

      const hide = () => {
        resetRipple(item);
        gsap.killTweensOf(tooltip);
        gsap.to(tooltip, {
          autoAlpha: 0,
          xPercent: -50,
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

      return () => {
        if (canHover) {
          item.removeEventListener('mouseenter', show);
          item.removeEventListener('mouseleave', hide);
        }
        item.removeEventListener('focusin', onFocusIn);
        item.removeEventListener('focusout', hide);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [isCompact, playRipple, resetRipple]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isCompact) {
      return;
    }

    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-industry-item]'));
    items.forEach((item) => {
      gsap.set(item, {
        '--ripple-x': '50%',
        '--ripple-y': '50%',
        '--ripple-size': '0px',
      });
    });
  }, [isCompact]);

  const handleItemActivate = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isCompact) {
      return;
    }

    const item = event.currentTarget;
    const nextIndex = activeIndexRef.current === index ? null : index;

    itemsResetRipples(sectionRef.current, nextIndex, resetRipple);
    setActiveIndex(nextIndex);

    if (nextIndex === index) {
      playRipple(item, event.nativeEvent);
    }
  };

  const activeIndustry = activeIndex !== null ? INDUSTRIES[activeIndex] : null;

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
        <div
          className={`${styles.tooltipDock} ${activeIndustry ? styles.tooltipDockVisible : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {activeIndustry ? (
            <p className={styles.tooltipDockText}>
              <span className={styles.tooltipDockLabel}>{activeIndustry.label}</span>
              {activeIndustry.tease}
            </p>
          ) : (
            <p className={styles.tooltipDockHint}>Tap an industry to read the line.</p>
          )}
        </div>

        <div className={styles.block}>
          {INDUSTRIES.map((industry, index) => (
            <button
              key={industry.label}
              type="button"
              className={`${styles.item} ${activeIndex === index ? styles.itemActive : ''}`}
              data-industry-item
              data-industry-index={index}
              aria-pressed={isCompact ? activeIndex === index : undefined}
              onClick={(event) => handleItemActivate(index, event)}
            >
              <span className={styles.word}>{industry.label}</span>
              <span className={styles.reveal} data-industry-reveal aria-hidden="true">
                {industry.label}
              </span>
              <span className={styles.tooltip} data-industry-tooltip role="status" aria-hidden="true">
                {industry.tease}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function itemsResetRipples(
  section: HTMLElement | null,
  nextIndex: number | null,
  resetRipple: (item: HTMLElement) => void,
) {
  if (!section) {
    return;
  }

  section.querySelectorAll<HTMLElement>('[data-industry-item]').forEach((item) => {
    const itemIndex = Number(item.dataset.industryIndex);
    if (itemIndex !== nextIndex) {
      resetRipple(item);
    }
  });
}
