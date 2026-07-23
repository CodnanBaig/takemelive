'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { TRANSITION_BURST } from '@/lib/transitionShrapnel';
import ScrollOrnament from './ScrollOrnament';
import TransitionLogoBurst from './TransitionLogoBurst';
import styles from './Transition.module.scss';

const BURST_EASE = 'power4.out';

const SUBHEADING_LINES = [
  'We create experiences designed to be seen, felt, and remembered.',
  'Bold ideas. Immersive worlds. Flawless execution.',
  'From first concept to final cue, we bring creativity, technology, and production together.',
  'Then we take it live.',
];

export default function Transition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gateLeftRef = useRef<HTMLDivElement | null>(null);
  const gateRightRef = useRef<HTMLDivElement | null>(null);
  const scopeRef = useRef<HTMLDivElement | null>(null);
  const scopeCoordRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gateLeft = gateLeftRef.current;
    const gateRight = gateRightRef.current;
    const timecode = timecodeRef.current;
    const shardNodes = gsap.utils.toArray<SVGGElement>('[data-shrapnel]', section);

    if (!section || !gateLeft || !gateRight || shardNodes.length === 0) {
      return;
    }

    const shardById = new Map(
      TRANSITION_BURST.map((shard) => [shard.id, shard] as const),
    );

    const getPinDistance = () => {
      const revealDistance = window.innerHeight * 0.9;
      const manifestoDistance = window.innerHeight * 1.25;
      const sublineDistance = window.innerHeight * 0.65;
      const holdDistance = window.innerHeight * 0.5;
      const exitDistance = window.innerHeight * 0.85;
      return Math.round(
        revealDistance +
          manifestoDistance +
          sublineDistance +
          holdDistance +
          exitDistance,
      );
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(gateLeft, { xPercent: -101 });
        gsap.set(gateRight, { xPercent: 101 });

        shardNodes.forEach((node) => {
          const shard = shardById.get(node.dataset.shardId ?? '');
          if (!shard) {
            return;
          }

          gsap.set(node, {
            x: `${shard.end.x}vw`,
            y: `${shard.end.y}vh`,
            scale: shard.end.scale,
            rotation: shard.end.rotate,
            opacity: 0,
            transformOrigin: '50% 50%',
            force3D: true,
          });
        });

        const gridLines = section.querySelectorAll('[data-grid-line]');
        const brackets = section.querySelectorAll('[data-hud-bracket]');
        const telemetries = section.querySelectorAll('[data-telemetry]');
        const manifestoRows = section.querySelectorAll('[data-manifesto-row]');
        const subLines = section.querySelectorAll('[data-subline]');

        gsap.set(gridLines, { scaleX: 1, scaleY: 1 });
        gsap.set(brackets, { opacity: 1, scale: 1 });
        gsap.set(telemetries, { opacity: 1, y: 0 });
        gsap.set(manifestoRows, { opacity: 1, y: 0, filter: 'none' });
        gsap.set(subLines, { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const gridLines = section.querySelectorAll('[data-grid-line]');
        const brackets = section.querySelectorAll('[data-hud-bracket]');
        const telemetries = section.querySelectorAll('[data-telemetry]');
        const manifestoRows = section.querySelectorAll('[data-manifesto-row]');
        const subLines = section.querySelectorAll('[data-subline]');

        gsap.set(gateLeft, { xPercent: 0 });
        gsap.set(gateRight, { xPercent: 0 });
        shardNodes.forEach((node) => {
          gsap.set(node, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            transformOrigin: '50% 50%',
            force3D: true,
          });
        });
        gsap.set(gridLines, { scaleX: 0, scaleY: 0 });
        gsap.set(brackets, { opacity: 0, scale: 1.3 });
        gsap.set(telemetries, { opacity: 0, y: 10 });
        gsap.set(manifestoRows, { opacity: 0, y: 30, filter: 'blur(8px)' });
        gsap.set(subLines, { opacity: 0, y: 15 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getPinDistance()}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (timecode) {
                const totalFrames = Math.floor(self.progress * 240);
                const sec = Math.floor(totalFrames / 60);
                const frame = totalFrames % 60;
                timecode.innerText = `TC: 00:00:0${sec}:${frame.toString().padStart(2, '0')}`;
              }
            },
          },
        });

        timeline
          .to(gateLeft, { xPercent: -101, duration: 0.3, ease: 'power3.inOut' }, 0)
          .to(gateRight, { xPercent: 101, duration: 0.3, ease: 'power3.inOut' }, 0);

        shardNodes.forEach((node) => {
          const shard = shardById.get(node.dataset.shardId ?? '');
          if (!shard) {
            return;
          }

          timeline.to(
            node,
            {
              x: `${shard.end.x}vw`,
              y: `${shard.end.y}vh`,
              scale: shard.end.scale,
              rotation: shard.end.rotate,
              opacity: shard.end.opacity,
              duration: shard.duration,
              ease: BURST_EASE,
            },
            0,
          );
        });

        timeline
          .to(gridLines, { scaleX: 1, scaleY: 1, duration: 0.2, ease: 'power2.out', stagger: 0.05 }, 0.12)
          .to(brackets, { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out', stagger: 0.03 }, 0.16)
          .to(telemetries, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out', stagger: 0.03 }, 0.18)
          .to(manifestoRows[0], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power3.out' }, 0.28)
          .to(manifestoRows[1], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power3.out' }, 0.36)
          .to(manifestoRows[2], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power3.out' }, 0.44)
          .to(manifestoRows[3], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power3.out' }, 0.52)
          .to(subLines, { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out', stagger: 0.06 }, 0.62)
          .to(manifestoRows, { opacity: 0, y: -40, filter: 'blur(8px)', duration: 0.15, ease: 'power2.in', stagger: 0.03 }, 0.9)
          .to(subLines, { opacity: 0, y: -20, duration: 0.15, ease: 'power2.in', stagger: 0.02 }, 0.92)
          .to(brackets, { opacity: 0, scale: 0.8, duration: 0.15, ease: 'power2.in' }, 0.94)
          .to(telemetries, { opacity: 0, y: -10, duration: 0.15, ease: 'power2.in' }, 0.94)
          .to(gridLines, { scaleX: 0, scaleY: 0, duration: 0.15, ease: 'power2.in' }, 0.95);
      });

      mm.add('(pointer:fine) and (prefers-reduced-motion: no-preference)', () => {
        const scope = scopeRef.current;
        const coordText = scopeCoordRef.current;
        if (!scope || !coordText) return;

        const xTo = gsap.quickTo(scope, '--scope-x', { duration: 0.15, ease: 'power2.out' });
        const yTo = gsap.quickTo(scope, '--scope-y', { duration: 0.15, ease: 'power2.out' });
        const opacityTo = gsap.quickTo(scope, 'opacity', { duration: 0.3, ease: 'power2.out' });

        gsap.set(scope, { opacity: 0 });

        const handlePointerMove = (e: PointerEvent) => {
          const rect = section.getBoundingClientRect();
          const xPct = ((e.clientX - rect.left) / rect.width) * 100;
          const yPct = ((e.clientY - rect.top) / rect.height) * 100;
          xTo(xPct);
          yTo(yPct);
          coordText.innerText = `X: ${xPct.toFixed(1)}% | Y: ${yPct.toFixed(1)}%`;
        };

        const handlePointerEnter = () => {
          opacityTo(1);
        };

        const handlePointerLeave = () => {
          opacityTo(0);
        };

        section.addEventListener('pointermove', handlePointerMove);
        section.addEventListener('pointerenter', handlePointerEnter);
        section.addEventListener('pointerleave', handlePointerLeave);

        return () => {
          section.removeEventListener('pointermove', handlePointerMove);
          section.removeEventListener('pointerenter', handlePointerEnter);
          section.removeEventListener('pointerleave', handlePointerLeave);
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
      id="chapter-transition"
      data-chapter="transition"
      data-scene="manifesto"
      data-logo-invert="1"
      ref={sectionRef}
      className={styles.transition}
      aria-label="Manifesto"
    >
      <ScrollOrnament variant="glyph-light" position="tl" />
      <div className={styles.stage}>
        <div ref={gateLeftRef} className={styles.gateLeft} aria-hidden />
        <div ref={gateRightRef} className={styles.gateRight} aria-hidden />
        <TransitionLogoBurst />

        <div className={styles.hudGridLines}>
          <div data-grid-line className={`${styles.gridLine} ${styles.gridLineH1}`} />
          <div data-grid-line className={`${styles.gridLine} ${styles.gridLineH2}`} />
          <div data-grid-line className={`${styles.gridLine} ${styles.gridLineV1}`} />
          <div data-grid-line className={`${styles.gridLine} ${styles.gridLineV2}`} />
        </div>

        <div data-hud-bracket className={`${styles.bracket} ${styles.tl}`} />
        <div data-hud-bracket className={`${styles.bracket} ${styles.tr}`} />
        <div data-hud-bracket className={`${styles.bracket} ${styles.bl}`} />
        <div data-hud-bracket className={`${styles.bracket} ${styles.br}`} />

        <div className={styles.centerCrosshair}>+</div>

        <div data-telemetry className={styles.telemetryTL}>
          <span>LIVE PRODUCTION FLOW // CAM_02</span>
        </div>

        <div data-telemetry className={styles.telemetryTR}>
          <span className={styles.recDot}>●</span>
          <span>REC [60FPS]</span>
        </div>

        <div data-telemetry className={styles.telemetryBR} ref={timecodeRef}>
          TC: 00:00:00:00
        </div>

        <div ref={scopeRef} className={styles.cursorScope} aria-hidden>
          <div className={styles.scopeReticle} />
          <div className={styles.scopeHLine} />
          <div className={styles.scopeVLine} />
          <div className={styles.scopeCoords} ref={scopeCoordRef}>
            X: 00.0% | Y: 00.0%
          </div>
        </div>

        <div className={styles.headlineStack}>
          <div className={styles.textRail} aria-label="NOT EVERYTHING NEEDS ATTENTION. YOUR EVENT DOES.">
            <div data-manifesto-row className={`${styles.manifestoRow} ${styles.stencil}`}>
              NOT EVERYTHING
            </div>
            <div data-manifesto-row className={`${styles.manifestoRow} ${styles.solid}`}>
              NEEDS ATTENTION.
            </div>
            <div data-manifesto-row className={`${styles.manifestoRow} ${styles.stencil}`}>
              YOUR EVENT
            </div>
            <div data-manifesto-row className={`${styles.manifestoRow} ${styles.inverted}`}>
              <span className={styles.invertedText}>DOES.</span>
            </div>
          </div>
        </div>

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
