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

function buildSpotPath(stage: HTMLElement, subLines: NodeListOf<Element>): SpotPoint[] {
  const stageRect = stage.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) {
    return FALLBACK_SPOT_PATH;
  }

  const toPct = (clientX: number, clientY: number): SpotPoint => ({
    x: ((clientX - stageRect.left) / stageRect.width) * 100,
    y: ((clientY - stageRect.top) / stageRect.height) * 100,
  });

  const path: SpotPoint[] = [];

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

    const getSpotPath = () => buildSpotPath(stage, subLines);

    const getSpotRadius = () => {
      const subheading = stage.querySelector(`.${styles.subheading}`) as HTMLElement | null;
      if (subheading) {
        const rect = subheading.getBoundingClientRect();
        if (rect.width && rect.height) {
          return Math.min(Math.max(rect.width * 0.52, rect.height * 0.72), 320);
        }
      }
      return Math.min(window.innerWidth * 0.24, 280);
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
        document.documentElement.style.setProperty('--logo-invert', '0');
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(curtain, { xPercent: 0 });
        gsap.set(lightSweep, { xPercent: -140, autoAlpha: 0.9 });
        gsap.set(spotlightVeil, { autoAlpha: 0, '--spot-radius': '0px' });
        gsap.set(railLines, { clipPath: MASK_HIDDEN_BOTTOM });
        gsap.set(subLines, { clipPath: MASK_HIDDEN_BOTTOM, y: 14, opacity: 0.35, filter: 'blur(6px)' });
        gsap.set(section, { '--stage-tone': 0 });
        gsap.set(document.documentElement, { '--logo-invert': 1 });

        const getPinDistance = () => {
          const revealDistance = window.innerHeight * 0.9;
          const manifestoDistance = window.innerHeight * 0.95;
          const sublineDistance = window.innerHeight * 0.55;
          const spotlightDistance = window.innerHeight * 1.05;
          const holdDistance = window.innerHeight * 0.35;
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
        const spotlightEnd = 0.82;
        const exitStart = 0.88;
        const spotlightSpan = spotlightEnd - spotlightStart;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getPinDistance()}`,
            pin: true,
            scrub: 0.72,
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
            document.documentElement,
            {
              '--logo-invert': 0,
              duration: curtainEnd,
              ease: 'none',
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
            { '--spot-radius': '0px' },
            {
              '--spot-radius': () => `${getSpotRadius()}px`,
              duration: spotlightSpan,
              ease: 'power2.out',
            },
            spotlightStart,
          );

        const spotPath = getSpotPath();
        const moveStep =
          spotPath.length > 1 ? spotlightSpan / (spotPath.length - 1) : spotlightSpan;

        spotPath.slice(1).forEach((_, index) => {
          timeline.to(
            spotlightVeil,
            {
              '--spot-x': () => getSpotPath()[index + 1]?.x ?? spotPath[index + 1].x,
              '--spot-y': () => getSpotPath()[index + 1]?.y ?? spotPath[index + 1].y,
              duration: moveStep,
              ease: 'sine.inOut',
            },
            spotlightStart + moveStep * index,
          );
        });

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
              '--spot-radius': '0px',
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
      document.documentElement.style.setProperty('--logo-invert', '1');
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="chapter-transition"
      data-chapter="transition"
      data-scene="manifesto"
      ref={sectionRef}
      data-logo-control="manual"
      className={styles.transition}
      aria-label="Manifesto"
    >
      <ScrollOrnament variant="glyph-light" position="tl" />
      <div className={styles.stage}>
        <div ref={curtainRef} className={styles.blackCurtain} aria-hidden>
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
