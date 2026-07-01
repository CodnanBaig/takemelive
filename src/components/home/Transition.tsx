'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { MASK_HIDDEN_BOTTOM, MASK_VISIBLE } from '@/lib/maskReveal';
import ScrollOrnament from './ScrollOrnament';
import styles from './Transition.module.scss';

const MANIFESTO_LINES = [
  'NOT EVERYTHING NEEDS ATTENTION.',
  'YOUR BRAND DOES.',
] as const;

const SUBHEADING_LINES = [
  'We create experiences designed to be seen, felt, and remembered.',
  'Moments that stop people.',
  'Spaces that pull them in.',
  'Stories that stay with them.',
  'Because when something happens live, it matters more.',
];

type SpotPoint = { x: number; y: number };

const FALLBACK_SPOT_PATH: SpotPoint[] = [
  { x: 50, y: 58 },
  { x: 50, y: 63 },
  { x: 50, y: 68 },
  { x: 50, y: 73 },
  { x: 50, y: 78 },
];

function buildSpotPath(
  stage: HTMLElement,
  railLines: NodeListOf<Element>,
  subLines: NodeListOf<Element>,
): SpotPoint[] {
  const stageRect = stage.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) {
    return FALLBACK_SPOT_PATH;
  }

  const toPct = (clientX: number, clientY: number): SpotPoint => ({
    x: ((clientX - stageRect.left) / stageRect.width) * 100,
    y: ((clientY - stageRect.top) / stageRect.height) * 100,
  });

  const path: SpotPoint[] = [];

  railLines.forEach((line) => {
    const rect = line.getBoundingClientRect();
    if (!rect.width) return;

    path.push(toPct(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5));
  });

  subLines.forEach((line, lineIndex) => {
    const rect = line.getBoundingClientRect();
    if (!rect.width) return;

    const midY = rect.top + rect.height * 0.5;
    const fractions = lineIndex % 2 === 0 ? [0.22, 0.5, 0.78] : [0.78, 0.5, 0.22];

    fractions.forEach((fraction) => {
      path.push(toPct(rect.left + rect.width * fraction, midY));
    });
  });

  return path.length > 0 ? path : FALLBACK_SPOT_PATH;
}

export default function Transition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const lightSweepRef = useRef<HTMLDivElement | null>(null);
  const spotlightVeilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const curtain = curtainRef.current;
    const lightSweep = lightSweepRef.current;
    const spotlightVeil = spotlightVeilRef.current;
    const railLines = section?.querySelectorAll('[data-rail-line]');
    const subLines = section?.querySelectorAll('[data-subline]');
    const stage = section?.querySelector(`.${styles.stage}`) as HTMLElement | null;

    if (!section || !curtain || !lightSweep || !spotlightVeil || !railLines || !subLines || !stage) {
      return;
    }

    const getSpotPath = () => buildSpotPath(stage, railLines, subLines);

    const getSpotRadius = (pointIndex = 0) => {
      const path = getSpotPath();
      const point = path[pointIndex];
      const manifestoLine = railLines[Math.min(pointIndex, railLines.length - 1)] as
        | HTMLElement
        | undefined;

      if (manifestoLine && pointIndex < railLines.length) {
        const rect = manifestoLine.getBoundingClientRect();
        if (rect.width && rect.height) {
          return Math.min(Math.max(rect.width * 0.28, rect.height * 1.35, 220), 420);
        }
      }

      if (point) {
        const subheading = stage.querySelector(`.${styles.subheading}`) as HTMLElement | null;
        if (subheading) {
          const rect = subheading.getBoundingClientRect();
          if (rect.width && rect.height) {
            return Math.min(Math.max(rect.width * 0.48, rect.height * 0.68), 300);
          }
        }
      }

      return Math.min(window.innerWidth * 0.22, 260);
    };

    const getBloomCenter = (): SpotPoint => {
      const stageRect = stage.getBoundingClientRect();
      const headlineStack = stage.querySelector(`.${styles.headlineStack}`) as HTMLElement | null;
      const subheading = stage.querySelector(`.${styles.subheading}`) as HTMLElement | null;

      if (!stageRect.width || !stageRect.height || !headlineStack || !subheading) {
        return { x: 50, y: 50 };
      }

      const headlineRect = headlineStack.getBoundingClientRect();
      const subRect = subheading.getBoundingClientRect();
      const centerY = (headlineRect.top + subRect.bottom) * 0.5;

      return {
        x: 50,
        y: ((centerY - stageRect.top) / stageRect.height) * 100,
      };
    };

    const getBloomRadius = () => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return Math.max(window.innerWidth, window.innerHeight) * 1.15;
      }

      return Math.hypot(rect.width, rect.height) * 0.78;
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(curtain, { xPercent: -102 });
        gsap.set(lightSweep, { xPercent: 120, autoAlpha: 0 });
        gsap.set(spotlightVeil, { autoAlpha: 0, '--spot-radius': '0px' });
        gsap.set(railLines, { clipPath: MASK_VISIBLE });
        gsap.set(subLines, { clipPath: MASK_VISIBLE, y: 0, opacity: 1, filter: 'blur(0px)' });
        gsap.set(section, { '--stage-tone': 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(curtain, { xPercent: 0 });
        gsap.set(lightSweep, { xPercent: -140, autoAlpha: 0.9 });
        gsap.set(spotlightVeil, { autoAlpha: 0, '--spot-radius': '0px' });
        gsap.set(railLines, { clipPath: MASK_HIDDEN_BOTTOM });
        gsap.set(subLines, { clipPath: MASK_HIDDEN_BOTTOM, y: 14, opacity: 0.35, filter: 'blur(6px)' });
        gsap.set(section, { '--stage-tone': 0 });

        const getPinDistance = () => {
          const revealDistance = window.innerHeight * 0.9;
          const manifestoDistance = window.innerHeight * 0.95;
          const sublineDistance = window.innerHeight * 0.55;
          const spotlightDistance = window.innerHeight * 3.6;
          const holdDistance = window.innerHeight * 0.45;
          const exitDistance = window.innerHeight * 0.85;
          return Math.round(
            revealDistance +
              manifestoDistance +
              sublineDistance +
              spotlightDistance +
              holdDistance +
              exitDistance,
          );
        };

        const curtainEnd = 0.22;
        const headlineStart = 0.24;
        const headlineEnd = 0.42;
        const sublineStart = 0.44;
        const sublineEnd = 0.58;
        const spotlightStart = 0.6;
        const spotlightEnd = 0.9;
        const exitStart = 0.94;
        const spotlightSpan = spotlightEnd - spotlightStart;
        const spotlightOpenShare = 0.12;
        const spotlightPathShare = 0.66;
        const spotlightBloomShare = 0.22;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getPinDistance()}`,
            pin: true,
            scrub: 0.95,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            curtain,
            {
              xPercent: -102,
              duration: curtainEnd,
              ease: 'power2.inOut',
            },
            0,
          )
          .to(
            lightSweep,
            {
              xPercent: 160,
              autoAlpha: 0.35,
              duration: curtainEnd,
              ease: 'power2.inOut',
            },
            0,
          )
          .to(
            lightSweep,
            {
              autoAlpha: 0,
              duration: 0.1,
              ease: 'none',
            },
            curtainEnd - 0.02,
          )
          .to(
            railLines,
            {
              clipPath: MASK_VISIBLE,
              duration: headlineEnd - headlineStart,
              ease: 'power3.out',
              stagger: 0.12,
            },
            headlineStart,
          )
          .to(
            subLines,
            {
              clipPath: MASK_VISIBLE,
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: sublineEnd - sublineStart,
              ease: 'power3.out',
              stagger: 0.07,
            },
            sublineStart,
          )
          .set(subLines, { opacity: 1, filter: 'none' }, sublineEnd)
          .to(
            section,
            {
              '--stage-tone': 1,
              duration: spotlightEnd - spotlightStart,
              ease: 'power2.inOut',
            },
            spotlightStart,
          )
          .set(subLines, { opacity: 1, filter: 'none' }, spotlightStart)
          .set(spotlightVeil, { autoAlpha: 1 }, spotlightStart)
          .set(
            spotlightVeil,
            {
              '--spot-x': () => getSpotPath()[0]?.x ?? 50,
              '--spot-y': () => getSpotPath()[0]?.y ?? 65,
            },
            spotlightStart,
          )
          .fromTo(
            spotlightVeil,
            { '--spot-radius': '0px', '--spot-feather': '44%' },
            {
              '--spot-radius': () => `${getSpotRadius(0)}px`,
              duration: spotlightSpan * spotlightOpenShare,
              ease: 'power2.out',
            },
            spotlightStart,
          );

        const spotPath = getSpotPath();
        const pathEndTime = spotlightStart + spotlightSpan * (spotlightOpenShare + spotlightPathShare);
        const moveStep =
          spotPath.length > 1
            ? (spotlightSpan * spotlightPathShare) / (spotPath.length - 1)
            : spotlightSpan * spotlightPathShare;

        spotPath.slice(1).forEach((_, index) => {
          const pointIndex = index + 1;
          timeline.to(
            spotlightVeil,
            {
              '--spot-x': () => getSpotPath()[pointIndex]?.x ?? spotPath[pointIndex].x,
              '--spot-y': () => getSpotPath()[pointIndex]?.y ?? spotPath[pointIndex].y,
              '--spot-radius': () => `${getSpotRadius(pointIndex)}px`,
              duration: moveStep,
              ease: 'power3.inOut',
            },
            spotlightStart + spotlightSpan * spotlightOpenShare + moveStep * index,
          );
        });

        const bloomCenter = getBloomCenter();
        timeline.to(
          spotlightVeil,
          {
            '--spot-x': bloomCenter.x,
            '--spot-y': bloomCenter.y,
            '--spot-radius': () => `${getBloomRadius()}px`,
            '--spot-feather': '62%',
            duration: spotlightSpan * spotlightBloomShare,
            ease: 'power4.out',
          },
          pathEndTime,
        );

        timeline
          .to(
            railLines,
            {
              clipPath: MASK_HIDDEN_BOTTOM,
              duration: 0.24,
              ease: 'power2.in',
              stagger: 0.05,
            },
            exitStart,
          )
          .to(
            subLines,
            {
              clipPath: MASK_HIDDEN_BOTTOM,
              opacity: 0,
              duration: 0.24,
              ease: 'power2.in',
              stagger: 0.04,
            },
            exitStart,
          )
          .to(
            spotlightVeil,
            {
              autoAlpha: 0,
              duration: 0.2,
              ease: 'power2.in',
            },
            exitStart,
          );
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
      id="chapter-transition"
      data-chapter="transition"
      data-scene="manifesto"
      ref={sectionRef}
      className={styles.transition}
      aria-label="Manifesto"
    >
      <ScrollOrnament variant="glyph-light" position="tl" />
      <div className={styles.stage} data-logo-invert="0">
        <div ref={curtainRef} className={styles.blackCurtain} data-logo-invert="1" aria-hidden>
          <div ref={lightSweepRef} className={styles.lightSweep} />
        </div>
        <div className={styles.headlineStack}>
          <div className={styles.textRail} aria-label={MANIFESTO_LINES.join(' ')}>
            {MANIFESTO_LINES.map((line) => (
              <div key={line} className={styles.manifestoLine} data-rail-line>
                <span className={styles.railWordInner} data-rail-word>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div ref={spotlightVeilRef} className={styles.spotlightVeil} aria-hidden />
        <div className={styles.subheading}>
          {SUBHEADING_LINES.map((line) => (
            <p key={line} className={styles.subLine} data-subline>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
