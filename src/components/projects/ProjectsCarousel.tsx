'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGesture } from '@use-gesture/react';
import { gsap } from '@/lib/gsap';
import { getPosterTitle, type FeaturedProject } from '@/content/featuredProjects';
import { resolveProjectCover } from '@/lib/projectMedia';
import { prefersReducedMotion } from '@/lib/motionPrefs';
import styles from './ProjectsCarousel.module.scss';

const GLOB_RADIUS = 318;
const FRONT_OFFSET = 180;
const THUMB_OUTSET = 56;
const THUMB_SIZE_MAX = 68;
const LAYOUT_TOP_RESERVE = 76;
const LAYOUT_BOTTOM_RESERVE = 148;
const LAYOUT_SIDE_RESERVE = 20;

type ProjectsCarouselProps = {
  projects: FeaturedProject[];
};

function wrapIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}

function splitTitleChars(text: string) {
  return text.split('').map((char, index) => (
    <span key={`${text}-${index}`} className={styles.char}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}

function getCategoryLabel(project: FeaturedProject): string {
  return `${project.event.toUpperCase()} · ${project.year}`;
}

function computeDirection(from: number, to: number, total: number): 1 | -1 {
  if (from === to) return 1;
  const diff = to - from;
  if (Math.abs(diff) <= total / 2) {
    return diff > 0 ? 1 : -1;
  }
  return diff > 0 ? -1 : 1;
}

function getGlobThumbStep(total: number): number {
  return total <= 0 ? 0 : 360 / total;
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const total = projects.length;
  const router = useRouter();
  const [activeIndex, setActiveIndexState] = useState(0);

  const carouselRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const ticksRef = useRef<SVGSVGElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const counterRef = useRef<HTMLParagraphElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);
  const categoryRef = useRef<HTMLParagraphElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const ctaArrowRef = useRef<HTMLSpanElement | null>(null);
  const globInnerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragSurfaceRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const jiggleStateRef = useRef({ amp: 0, targetAmp: 0, phase: 0 });
  const transitionRef = useRef<gsap.core.Timeline | null>(null);
  const entranceRef = useRef<gsap.core.Timeline | null>(null);
  const isTransitioningRef = useRef(false);
  const isDraggingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const ringRotationRef = useRef(0);
  const dragStartRotationRef = useRef(0);
  const shouldAnimateInRef = useRef(false);
  const slideDirectionRef = useRef<1 | -1>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [globRadius, setGlobRadius] = useState(GLOB_RADIUS);

  const thumbStep = useMemo(() => getGlobThumbStep(total), [total]);

  const setActiveIndex = useCallback((index: number) => {
    const wrapped = wrapIndex(index, total);
    activeIndexRef.current = wrapped;
    setActiveIndexState(wrapped);
  }, [total]);

  const project = projects[activeIndex] ?? projects[0];
  const posterTitle = useMemo(() => getPosterTitle(project), [project]);
  const categoryLabel = useMemo(() => getCategoryLabel(project), [project]);

  const killTimeline = useCallback(() => {
    if (!transitionRef.current) return;
    transitionRef.current.kill();
    transitionRef.current = null;
    isTransitioningRef.current = false;
  }, []);

  const animateTitleIn = useCallback(() => {
    const chars = titleRef.current?.querySelectorAll(`.${styles.char}`);
    if (!chars?.length) return;
    gsap.fromTo(
      chars,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.02, ease: 'power2.out' },
    );
  }, []);

  const animateTaglineIn = useCallback((fromX = 40) => {
    const category = categoryRef.current;
    const tagline = taglineRef.current?.querySelector(`.${styles.tagline}`);
    if (!category && !tagline) return;

    if (category) {
      gsap.fromTo(
        category,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 0.5, duration: 0.4, ease: 'power2.out' },
      );
    }
    if (tagline) {
      gsap.fromTo(
        tagline,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, delay: 0.06, ease: 'power2.out' },
      );
    }
  }, []);

  const runEntrance = useCallback(() => {
    entranceRef.current?.kill();

    const uiTargets = [
      ticksRef.current,
      counterRef.current,
      titleRef.current,
      categoryRef.current,
      taglineRef.current,
      prevRef.current,
      nextRef.current,
      ctaRef.current,
      globInnerRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion()) {
      gsap.set(uiTargets, { clearProps: 'all' });
      gsap.set(heroImageRef.current, { clearProps: 'all' });
      return;
    }

    const entrance = gsap.timeline({ defaults: { ease: 'power2.out' } });
    entranceRef.current = entrance;

    entrance
      .from(
        heroImageRef.current,
        { scale: 0.92, opacity: 0, duration: 0.7, immediateRender: false },
        0,
      )
      .from(
        uiTargets,
        { opacity: 0, y: 20, duration: 0.6, stagger: 0.08, immediateRender: false },
        0.12,
      );

    const chars = titleRef.current?.querySelectorAll(`.${styles.char}`);
    if (chars?.length) {
      entrance.from(
        chars,
        { y: 24, opacity: 0, duration: 0.5, stagger: 0.02, ease: 'power2.out', immediateRender: false },
        0.28,
      );
    }

    if (categoryRef.current) {
      entrance.from(
        categoryRef.current,
        { x: 40, opacity: 0, duration: 0.45, ease: 'power2.out', immediateRender: false },
        0.34,
      );
    }

    const taglineEl = taglineRef.current?.querySelector(`.${styles.tagline}`);
    if (taglineEl) {
      entrance.from(
        taglineEl,
        { x: 40, opacity: 0, duration: 0.45, ease: 'power2.out', immediateRender: false },
        0.4,
      );
    }
  }, []);

  const runSlideIn = useCallback(
    (direction: 1 | -1) => {
      const textInTargets = [
        categoryRef.current,
        taglineRef.current?.querySelector(`.${styles.tagline}`),
      ].filter(Boolean);

      gsap.set(heroImageRef.current, { scale: 1.08, opacity: 0 });
      gsap.set(textInTargets, { x: direction * 28, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioningRef.current = false;
        },
        onInterrupt: () => {
          isTransitioningRef.current = false;
        },
      });
      transitionRef.current = tl;

      tl.to(heroImageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
        .call(() => {
          animateTitleIn();
          animateTaglineIn(direction * 40);
        }, undefined, '-=0.18');

      if (counterRef.current) {
        tl.fromTo(
          counterRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
          '-=0.32',
        );
      }
    },
    [animateTaglineIn, animateTitleIn],
  );

  const runSlideOut = useCallback(
    (direction: 1 | -1, onComplete: () => void) => {
      const oldChars = titleRef.current?.querySelectorAll(`.${styles.char}`);
      const textOutTargets = [
        counterRef.current,
        categoryRef.current,
        taglineRef.current?.querySelector(`.${styles.tagline}`),
      ].filter(Boolean);

      if (!heroImageRef.current) {
        onComplete();
        return;
      }

      const tl = gsap.timeline({ onComplete });
      tl.to(heroImageRef.current, {
        scale: 0.88,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      });

      if (textOutTargets.length) {
        tl.to(
          textOutTargets,
          {
            x: direction * -28,
            opacity: 0,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.in',
          },
          0.05,
        );
      }

      if (oldChars?.length) {
        tl.to(
          oldChars,
          {
            y: -24,
            opacity: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.in',
          },
          0.05,
        );
      }

      transitionRef.current = tl;
    },
    [],
  );

  const commitSlide = useCallback(
    (nextIndex: number, direction: 1 | -1) => {
      slideDirectionRef.current = direction;
      shouldAnimateInRef.current = true;
      setActiveIndex(nextIndex);
    },
    [setActiveIndex],
  );

  const animateRingToIndex = useCallback(
    (index: number, duration = 0.55) => {
      if (!globInnerRef.current || thumbStep === 0) return;
      const target = -index * thumbStep;
      ringRotationRef.current = target;
      if (prefersReducedMotion() || duration === 0) {
        gsap.set(globInnerRef.current, { rotation: target });
        return;
      }
      gsap.to(globInnerRef.current, {
        rotation: target,
        duration,
        ease: 'power2.out',
      });
    },
    [thumbStep],
  );

  const getIndexFromRotation = useCallback(
    (rotation: number) => {
      if (thumbStep === 0) return 0;
      return wrapIndex(Math.round(-rotation / thumbStep), total);
    },
    [thumbStep, total],
  );

  const goToIndex = useCallback(
    (targetIndex: number, options: { instant?: boolean; direction?: 1 | -1 } = {}) => {
      const current = activeIndexRef.current;
      const nextIndex = wrapIndex(targetIndex, total);
      if (nextIndex === current) return;

      killTimeline();

      const direction =
        options.direction ??
        (nextIndex === wrapIndex(current + 1, total) ? 1 : nextIndex === wrapIndex(current - 1, total) ? -1 : 1);

      animateRingToIndex(nextIndex, options.instant || prefersReducedMotion() ? 0 : 0.55);

      if (options.instant || prefersReducedMotion()) {
        slideDirectionRef.current = direction;
        setActiveIndex(nextIndex);
        gsap.set(heroImageRef.current, { scale: 1, opacity: 1, clearProps: 'transform' });
        requestAnimationFrame(() => {
          animateTitleIn();
          animateTaglineIn(24);
        });
        return;
      }

      isTransitioningRef.current = true;
      runSlideOut(direction, () => commitSlide(nextIndex, direction));
    },
    [animateRingToIndex, animateTaglineIn, animateTitleIn, commitSlide, killTimeline, runSlideOut, setActiveIndex, total],
  );

  const handlePrev = useCallback(() => {
    goToIndex(activeIndexRef.current - 1, { direction: -1 });
  }, [goToIndex]);

  const handleNext = useCallback(() => {
    goToIndex(activeIndexRef.current + 1, { direction: 1 });
  }, [goToIndex]);

  const handleThumbSelect = useCallback(
    (index: number) => {
      if (index === activeIndexRef.current) return;
      goToIndex(index, {
        direction: computeDirection(activeIndexRef.current, index, total),
      });
    },
    [goToIndex, total],
  );

  const handleCtaEnter = useCallback(() => {
    if (prefersReducedMotion()) return;
    gsap.to(ctaRef.current, { scale: 1.12, duration: 0.32, ease: 'power2.out' });
    gsap.to(ctaArrowRef.current, { rotation: 15, duration: 0.32, ease: 'power2.out' });
  }, []);

  const handleCtaLeave = useCallback(() => {
    gsap.to(ctaRef.current, { scale: 1, duration: 0.32, ease: 'power2.out' });
    gsap.to(ctaArrowRef.current, { rotation: 0, duration: 0.32, ease: 'power2.out' });
  }, []);

  const handleCtaClick = useCallback(() => {
    router.push(`/projects/${projects[activeIndexRef.current]?.slug ?? ''}`);
  }, [projects, router]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHeight = document.documentElement.style.height;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100dvh';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.height = previousHeight;
      killTimeline();
      entranceRef.current?.kill();
    };
  }, [killTimeline]);

  useLayoutEffect(() => {
    if (!shouldAnimateInRef.current) return;
    shouldAnimateInRef.current = false;
    runSlideIn(slideDirectionRef.current);
  }, [activeIndex, runSlideIn]);

  useEffect(() => {
    const root = carouselRef.current;
    if (!root) return;

    const syncLayout = () => {
      const container = root.getBoundingClientRect();
      const thumbHalf = Math.min(
        THUMB_SIZE_MAX,
        Math.max(52, container.width * 0.068),
      ) / 2;

      const maxGlobRadius = Math.min(
        container.width / 2 - LAYOUT_SIDE_RESERVE - thumbHalf,
        (container.height - LAYOUT_TOP_RESERVE - LAYOUT_BOTTOM_RESERVE) / 2 - thumbHalf,
      );

      const globRadius = Math.max(140, maxGlobRadius);
      const heroRadius = Math.max(96, globRadius - THUMB_OUTSET);
      const heroDiameter = heroRadius * 2;

      setGlobRadius(globRadius);
      root.style.setProperty('--hero-diameter', `${heroDiameter}px`);
      root.style.setProperty('--hero-radius', `${heroRadius}px`);
      root.style.setProperty('--glob-radius', `${globRadius}px`);
      root.style.setProperty('--glob-diameter', `${globRadius * 2}px`);
    };

    syncLayout();
    window.addEventListener('resize', syncLayout);

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(syncLayout)
      : null;
    observer?.observe(root);

    return () => {
      window.removeEventListener('resize', syncLayout);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isDragging || prefersReducedMotion()) {
      thumbRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { x: 0, y: 0, rotation: 0 });
      });
      jiggleStateRef.current = { amp: 0, targetAmp: 0, phase: 0 };
      return;
    }

    const tick = () => {
      const state = jiggleStateRef.current;
      state.amp += (state.targetAmp - state.amp) * 0.2;
      state.phase += 0.045 + state.amp * 0.04;

      thumbRefs.current.forEach((el, index) => {
        if (!el) return;
        if (index === activeIndexRef.current) {
          gsap.set(el, { x: 0, y: 0, rotation: 0 });
          return;
        }

        const t = state.phase + index * 0.82;
        const wobble = 10 * state.amp;
        gsap.set(el, {
          x: Math.sin(t * 1.55) * wobble,
          y: Math.cos(t * 1.25) * wobble * 0.85,
          rotation: Math.sin(t * 0.95) * 5 * state.amp,
        });
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      thumbRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { x: 0, y: 0, rotation: 0 });
      });
    };
  }, [isDragging]);

  useLayoutEffect(() => {
    if (!globInnerRef.current || thumbStep === 0) return;
    const target = -activeIndexRef.current * thumbStep;
    ringRotationRef.current = target;
    gsap.set(globInnerRef.current, { rotation: target });
  }, [thumbStep, globRadius]);

  useGesture(
    {
      onDragStart: () => {
        isDraggingRef.current = true;
        setIsDragging(true);
        dragStartRotationRef.current = ringRotationRef.current;
        jiggleStateRef.current.targetAmp = 1;
        killTimeline();
      },
      onDrag: ({ movement: [mx], velocity: [vx], pinching }) => {
        if (pinching || !globInnerRef.current) return;
        const nextRotation = dragStartRotationRef.current + mx * 0.42;
        ringRotationRef.current = nextRotation;
        gsap.set(globInnerRef.current, { rotation: nextRotation });
        jiggleStateRef.current.targetAmp = Math.min(1, Math.abs(vx) * 0.004 + Math.abs(mx) * 0.0018 + 0.35);
        if (heroImageRef.current && !prefersReducedMotion()) {
          gsap.set(heroImageRef.current, { rotation: mx * 0.018 });
        }
      },
      onDragEnd: ({ movement: [mx], velocity: [vx] }) => {
        isDraggingRef.current = false;
        setIsDragging(false);
        jiggleStateRef.current.targetAmp = 0;
        gsap.set(heroImageRef.current, { clearProps: 'rotation' });

        const projected =
          ringRotationRef.current + (-vx * 0.035 + (Math.abs(mx) < 12 ? 0 : -Math.sign(mx) * 0.001));
        const targetIndex = getIndexFromRotation(projected);

        if (targetIndex !== activeIndexRef.current) {
          goToIndex(targetIndex, {
            direction: computeDirection(activeIndexRef.current, targetIndex, total),
          });
          return;
        }

        animateRingToIndex(activeIndexRef.current);
      },
      onWheel: ({ delta: [, dy], event }) => {
        event.preventDefault();
        const direction = dy > 0 ? 1 : -1;
        goToIndex(activeIndexRef.current + direction, { direction });
      },
    },
    {
      target: dragSurfaceRef,
      eventOptions: { passive: false },
      drag: {
        filterTaps: true,
        threshold: 10,
        pointer: { touch: true },
      },
    },
  );

  useLayoutEffect(() => {
    const root = carouselRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      runEntrance();
    }, root);

    return () => ctx.revert();
  }, [runEntrance]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrev();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      ref={carouselRef}
      className={styles.carousel}
      aria-label="Featured projects globe"
      aria-roledescription="draggable project globe"
    >
      <div
        ref={dragSurfaceRef}
        className={`${styles.dragSurface}${isDragging ? ` ${styles.dragSurfaceActive}` : ''}`}
        aria-hidden="true"
      />

      <div className={styles.globRing} aria-label="Project thumbnails">
        <div className={styles.globPivot}>
          <div className={styles.globTrack} aria-hidden="true" />
          <div ref={globInnerRef} className={styles.globInner}>
          {projects.map((item, index) => {
            const isActive = index === activeIndex;
            const step = thumbStep * index + FRONT_OFFSET;
            return (
              <div
                key={item.slug}
                className={styles.globThumbMount}
                style={{
                  transform: `rotate(${step}deg) translateY(calc(-1 * var(--glob-radius, ${globRadius}px)))`,
                }}
              >
                <button
                  type="button"
                  className={`${styles.globThumb}${isActive ? ` ${styles.globThumbActive}` : ''}`}
                  style={{ transform: `rotate(${-step}deg)` }}
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => handleThumbSelect(index)}
                >
                  <span
                    ref={(el) => {
                      thumbRefs.current[index] = el;
                    }}
                    className={styles.globThumbInner}
                  >
                    <Image
                      src={resolveProjectCover(item)}
                      alt=""
                      width={64}
                      height={64}
                      className={styles.globImage}
                    />
                  </span>
                </button>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      <p className={styles.dragHint} aria-hidden="true">
        Drag to explore
      </p>

      <div className={styles.heroStage} aria-hidden="true">
        <div ref={frameRef} className={styles.frame}>
          <svg
            ref={ticksRef}
            className={styles.ticks}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className={styles.tick} d="M 2 18 V 2 H 18" />
            <path className={styles.tick} d="M 82 2 H 98 V 18" />
            <path className={styles.tick} d="M 98 82 V 98 H 82" />
            <path className={styles.tick} d="M 18 98 H 2 V 82" />
          </svg>

          <div ref={heroImageRef} className={styles.imageWrap}>
            <Image
              src={resolveProjectCover(project)}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 640px) 84vw, (max-width: 900px) 78vw, 680px"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>

      <div className={styles.bottomUi}>
        <button
          ref={prevRef}
          type="button"
          className={`${styles.navArrow} ${styles.navPrev}`}
          aria-label="Previous project"
          onClick={handlePrev}
        >
          ‹
        </button>

        <div className={styles.bottomLeft}>
          <p ref={counterRef} className={styles.counter} aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')}
          </p>
          <h2 ref={titleRef} className={styles.title}>
            {splitTitleChars(posterTitle)}
          </h2>
        </div>

        <button
          ref={ctaRef}
          type="button"
          className={styles.cta}
          aria-label={`Open ${project.title} case study`}
          onClick={handleCtaClick}
          onMouseEnter={handleCtaEnter}
          onMouseLeave={handleCtaLeave}
          onFocus={handleCtaEnter}
          onBlur={handleCtaLeave}
        >
          <span ref={ctaArrowRef} className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </button>

        <div ref={taglineRef} className={styles.taglineCard}>
          <p className={styles.mobileClient}>{project.client}</p>
          <p ref={categoryRef} className={styles.category}>
            {categoryLabel}
          </p>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>

        <button
          ref={nextRef}
          type="button"
          className={`${styles.navArrow} ${styles.navNext}`}
          aria-label="Next project"
          onClick={handleNext}
        >
          ›
        </button>
      </div>

      <p className={styles.srOnly} aria-live="polite">
        {project.client}. {project.event}. {project.year}. {project.tagline}
      </p>
    </section>
  );
}
