'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, type MouseEvent } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { FEATURED_PROJECTS } from '@/content/featuredProjects';
import styles from './FeaturedProjects.module.scss';

const FALLBACK_IMAGE_SRC = FEATURED_PROJECTS[0]?.coverImage ?? '';

type StackMetrics = {
  cardWidth: number;
  startX: number;
  startY: number;
  stepX: number;
  stepY: number;
  exitTravel: number;
};

/** Heritage-style finite conveyor: all real cards travel diagonally off-screen, then release. */
function computeStackMetrics(
  stageWidth: number,
  stageHeight: number,
  count: number,
  stackStartX: number,
): StackMetrics {
  const cardWidth = Math.min(300, Math.max(170, stageWidth * 0.165));
  const visibleSteps = Math.max(1, count - 1);
  const stepX = cardWidth * 0.96;
  const stepY = Math.min(stageHeight * 0.15, 110);
  const startY = stageHeight * 0.08;
  const exitTravel = visibleSteps + (stackStartX + cardWidth * 1.35) / Math.max(1, stepX);

  return {
    cardWidth,
    startX: stackStartX,
    startY,
    stepX,
    stepY,
    exitTravel,
  };
}

function computeMobileStackMetrics(stageWidth: number, stageHeight: number, count: number): StackMetrics {
  const cardWidth = Math.min(250, Math.max(200, stageWidth * 0.62));
  const stepX = cardWidth * 0.56;
  const stepY = Math.min(86, stageHeight * 0.105);
  const startX = stageWidth * 0.1;
  const visibleSteps = Math.max(1, count - 1);
  const exitTravel = visibleSteps + (startX + cardWidth * 1.4) / Math.max(1, stepX);

  return {
    cardWidth,
    startX,
    startY: stageHeight * 0.16,
    stepX,
    stepY,
    exitTravel,
  };
}

export default function FeaturedProjects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const metricsRef = useRef<StackMetrics | null>(null);
  const pullingCardRef = useRef(false);
  const selectedCardRef = useRef<HTMLAnchorElement | null>(null);
  const selectedHrefRef = useRef<string | null>(null);
  const projectCount = FEATURED_PROJECTS.length;

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const stack = stackRef.current;
    if (!section || !stage || !stack) {
      return;
    }

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('[data-project-card]'));
    const frames = Array.from(stack.querySelectorAll<HTMLElement>('[data-card-frame]'));
    const images = Array.from(stack.querySelectorAll<HTMLElement>('[data-card-image]'));

    const getStackStartX = () => {
      const header = headerRef.current;
      if (!header) {
        return Math.max(280, stage.clientWidth * 0.36);
      }

      const stageRect = stage.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      const gap = Math.max(20, stage.clientWidth * 0.02);
      return Math.max(gap, headerRect.right - stageRect.left + gap);
    };

    const refreshMetrics = () => {
      metricsRef.current = computeStackMetrics(
        stage.clientWidth,
        stage.clientHeight,
        projectCount,
        getStackStartX(),
      );
      const { cardWidth } = metricsRef.current;
      stack.style.setProperty('--stack-card-width', `${cardWidth}px`);
      ScrollTrigger.refresh();
    };

    const applyStackLayout = (progress: number, waveTime = 0) => {
      if (pullingCardRef.current || selectedHrefRef.current) {
        return;
      }

      const metrics = metricsRef.current;
      if (!metrics) {
        return;
      }

      const travel = gsap.utils.clamp(0, 1, progress) * metrics.exitTravel;

      cards.forEach((card, index) => {
        const slot = index - travel;
        const wave = Math.sin(slot * 0.86 + waveTime * 0.0016);

        gsap.set(card, {
          x: metrics.startX + slot * metrics.stepX,
          y: -(metrics.startY + slot * metrics.stepY + wave * metrics.stepY * 0.22),
          rotationY: 0,
          rotationZ: -2.4,
          scale: 1,
          zIndex: projectCount - index,
          transformOrigin: '0% 100%',
        });
      });

      frames.forEach((frame) => {
        gsap.set(frame, {
          rotationY: -18,
          transformOrigin: '0% 50%',
          transformPerspective: 1400,
        });
      });

      images.forEach((image) => {
        gsap.set(image, {
          scale: 1.08,
          yPercent: 0,
        });
      });
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        refreshMetrics();
        applyStackLayout(1);
      });

      mm.add('(max-width: 899px)', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.set(cards, { clearProps: 'all' });
          gsap.set(images, { clearProps: 'all' });
          stack.style.removeProperty('--stack-card-width');
          return;
        }

        const refreshMobileMetrics = () => {
          metricsRef.current = computeMobileStackMetrics(
            stage.clientWidth,
            stage.clientHeight,
            projectCount,
          );
          const { cardWidth } = metricsRef.current;
          stack.style.setProperty('--stack-card-width', `${cardWidth}px`);
          ScrollTrigger.refresh();
        };

        refreshMobileMetrics();

        let targetProgress = 0;
        let currentProgress = targetProgress;
        applyStackLayout(currentProgress, gsap.ticker.time * 1000);

        const renderLoop = () => {
          currentProgress = gsap.utils.interpolate(
            currentProgress,
            targetProgress,
            0.14,
          );
          applyStackLayout(currentProgress, gsap.ticker.time * 1000);
        };

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 1.45, projectCount * 170)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetProgress = self.progress;
          },
        });
        gsap.ticker.add(renderLoop);

        const resizeObserver = new ResizeObserver(() => {
          refreshMobileMetrics();
          applyStackLayout(trigger.progress, gsap.ticker.time * 1000);
        });
        resizeObserver.observe(stage);

        return () => {
          gsap.ticker.remove(renderLoop);
          resizeObserver.disconnect();
        };
      });

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        refreshMetrics();
        let targetProgress = 0;
        let currentProgress = targetProgress;
        applyStackLayout(currentProgress, gsap.ticker.time * 1000);

        const renderLoop = () => {
          currentProgress = gsap.utils.interpolate(
            currentProgress,
            targetProgress,
            0.12,
          );
          applyStackLayout(currentProgress, gsap.ticker.time * 1000);
        };

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 1.9, projectCount * 220)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetProgress = self.progress;
          },
        });
        gsap.ticker.add(renderLoop);

        const resizeObserver = new ResizeObserver(() => {
          refreshMetrics();
          applyStackLayout(trigger.progress, gsap.ticker.time * 1000);
        });
        resizeObserver.observe(stage);
        const header = headerRef.current;
        if (header) {
          resizeObserver.observe(header);
        }

        const cleanups = cards.map((card) => {
          const image = card.querySelector<HTMLElement>('[data-card-image]');

          const enter = () => {
            if (image) {
              gsap.to(image, { scale: 1.14, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
            }
          };

          const leave = () => {
            if (image) {
              gsap.to(image, { scale: 1.08, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
            }
          };

          card.addEventListener('pointerenter', enter);
          card.addEventListener('pointerleave', leave);

          return () => {
            card.removeEventListener('pointerenter', enter);
            card.removeEventListener('pointerleave', leave);
          };
        });

        return () => {
          gsap.ticker.remove(renderLoop);
          resizeObserver.disconnect();
          cleanups.forEach((cleanup) => cleanup());
        };
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [projectCount]);

  const handleProjectClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const stage = stageRef.current;
    const card = event.currentTarget;
    const isSelectedCard = selectedCardRef.current === card && selectedHrefRef.current === href;

    if (isSelectedCard) {
      event.preventDefault();
      router.push(href);
      return;
    }

    if (pullingCardRef.current || selectedHrefRef.current) {
      event.preventDefault();
      return;
    }

    if (!stage) {
      return;
    }

    event.preventDefault();
    pullingCardRef.current = true;

    const image = card.querySelector<HTMLElement>('[data-card-image]');
    const frame = card.querySelector<HTMLElement>('[data-card-frame]');
    const cardRect = card.getBoundingClientRect();
    const targetX = (window.innerWidth - cardRect.width) * 0.5 - cardRect.left;
    const targetY = (window.innerHeight - cardRect.height) * 0.5 - cardRect.top;
    const maxPopupScale = window.innerWidth < 900 ? 1.2 : 1.34;
    const popupScale = Math.min(
      maxPopupScale,
      (window.innerWidth * 0.72) / cardRect.width,
      (window.innerHeight * 0.74) / cardRect.height,
    );

    gsap.killTweensOf([card, frame, image]);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(card, {
        position: 'fixed',
        left: cardRect.left,
        top: cardRect.top,
        bottom: 'auto',
        width: cardRect.width,
        height: cardRect.height,
        x: targetX,
        y: targetY,
        rotationY: 0,
        rotationZ: 0,
        scale: popupScale,
        z: 180,
        zIndex: 20000,
        transformOrigin: '50% 50%',
        transformPerspective: 1800,
      });
      gsap.set(frame, { rotationY: 0 });
      gsap.set(image, { scale: 1.02, yPercent: 0 });
      selectedCardRef.current = card;
      selectedHrefRef.current = href;
      pullingCardRef.current = false;
      return;
    }

    gsap
      .timeline({
        defaults: { overwrite: 'auto' },
        onComplete: () => {
          selectedCardRef.current = card;
          selectedHrefRef.current = href;
          pullingCardRef.current = false;
        },
      })
      .set(card, {
        position: 'fixed',
        left: cardRect.left,
        top: cardRect.top,
        bottom: 'auto',
        width: cardRect.width,
        height: cardRect.height,
        x: 0,
        y: 0,
        z: 0,
        zIndex: 20000,
        transformOrigin: '50% 50%',
        transformPerspective: 1400,
      })
      .to(card, {
        keyframes: [
          {
            y: -118,
            z: 90,
            rotationZ: -5,
            scale: 1.04,
            duration: 0.24,
            ease: 'power2.out',
          },
          {
            x: targetX,
            y: targetY,
            z: 180,
            rotationY: 0,
            rotationZ: 0,
            scale: popupScale,
            duration: 0.62,
            ease: 'power3.inOut',
          },
        ],
      })
      .to(
        frame,
        {
          rotationY: 0,
          duration: 0.58,
          ease: 'power3.inOut',
        },
        0.24,
      )
      .to(
        image,
        {
          scale: 1.02,
          yPercent: 0,
          duration: 0.58,
          ease: 'power3.inOut',
        },
        0.24,
      );
  };

  return (
    <section
      id="chapter-featured-projects"
      data-chapter="featured-projects"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.section}
      aria-label="Featured projects"
    >
      <div className={styles.inner}>
        <header className={styles.header} ref={headerRef}>
          <p className={styles.kicker}>Selected work</p>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>Featured</span>
            <span className={styles.titleLine}>
              Projects
              <sup className={styles.count}>({String(projectCount).padStart(2, '0')})</sup>
            </span>
          </h2>
        </header>

        <div className={styles.stage} ref={stageRef}>
          <div className={styles.stack} ref={stackRef}>
            {FEATURED_PROJECTS.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={styles.card}
                data-project-card
                data-cursor="link"
                aria-label={`Open ${project.title} project`}
                onClick={(event) => handleProjectClick(event, `/projects/${project.slug}`)}
              >
                <span className={styles.cardIndex}>{String(index).padStart(2, '0')}</span>
                <div className={styles.cardFrame} data-card-frame>
                  <img
                    src={project.coverImage}
                    alt={project.summary}
                    className={styles.cardImage}
                    data-card-image
                    loading={index < 2 ? 'eager' : 'lazy'}
                    onError={(event) => {
                      const target = event.currentTarget;
                      if (target.src !== FALLBACK_IMAGE_SRC) {
                        target.src = FALLBACK_IMAGE_SRC;
                      }
                    }}
                  />
                  <div className={styles.overlay}>
                    <h3>{project.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className={styles.scrollHint}>Scroll to surf</p>
        </div>
      </div>
    </section>
  );
}
