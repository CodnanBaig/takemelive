'use client';

import { useEffect, useRef } from 'react';
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
        const ripple = getRippleState(event);
        const itemRect = item.getBoundingClientRect();
        const tooltipHeight = tooltip.offsetHeight || 72;
        const isCompact = window.innerWidth <= 840;
        const needsBelow =
          isCompact || itemRect.top < tooltipHeight + 96;
        item.dataset.tooltipPlacement = needsBelow ? 'below' : 'above';

        if (!event) {
          gsap.set(item, {
            '--ripple-x': ripple.x,
            '--ripple-y': ripple.y,
          });
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
        delete item.dataset.tooltipPlacement;
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
    </section>
  );
}
